import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import * as libre from "libreoffice-convert";
import { promisify } from "util";

const libreConvertAsync = promisify(libre.convert);

export async function libreConvert(app: FastifyInstance) {
  app.post(
    "/api/libre-convert",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const data = await request.file();
        if (!data) {
          return reply.status(400).send({ error: "No file uploaded!" });
        }

        const ext = ".pdf";
        const format = ext.substring(1);
        const fileBuffer = await data.toBuffer();

        const pdfBuffer = await libreConvertAsync(fileBuffer, ext, undefined);

        reply
          .header("Content-Type", "application/" + format)
          .header("Content-Disposition", "attachment; filename=converted" + ext)
          .send(pdfBuffer);
      } catch (error) {
        console.error("Convert error:", error);
        reply.status(500).send({ error: "Error while converting!" });
      }
    },
  );
}
