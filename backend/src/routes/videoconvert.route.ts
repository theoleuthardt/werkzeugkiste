import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import * as libre from "libreoffice-convert";
import { promisify } from "util";
import { MultipartValue } from "@fastify/multipart";

const libreConvertAsync = promisify(libre.convert);

const mimeTypes: { [key: string]: string } = {
  mp4: "video/mp4",
  avi: "video/x-msvideo",
  mkv: "video/x-matroska",
};

export async function videoConvert(app: FastifyInstance) {
  app.post(
    "/api/video-convert",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const parts = request.parts();

        let fileBuffer: Buffer | null = null;
        let outputFileExt = "";

        for await (const part of parts) {
          if (part.type === "file") {
            fileBuffer = await part.toBuffer();
          } else if (
            part.fieldname === "outputFormat" &&
            part.type === "field"
          ) {
            outputFileExt = (part as MultipartValue<string>).value;
          }
        }

        if (!fileBuffer) {
          return reply.status(400).send({ error: "No file uploaded!" });
        }
        if (!outputFileExt) {
          return reply
            .status(400)
            .send({ error: "No output format provided!" });
        }
        if (!outputFileExt.startsWith(".")) {
          outputFileExt = "." + outputFileExt;
        }

        const format = outputFileExt.substring(1);
        const mimeType = mimeTypes[format] || "application/octet-stream";

        const convertedBuffer = await libreConvertAsync(
          fileBuffer,
          outputFileExt,
          undefined,
        );

        reply
          .header("Content-Type", mimeType)
          .header(
            "Content-Disposition",
            `attachment; filename="converted${outputFileExt}"`,
          )
          .status(200)
          .send(convertedBuffer);
      } catch (error) {
        console.error("Convert error:", error);
        reply.status(500).send({ error: "Error while converting!" });
      }
    },
  );
}
