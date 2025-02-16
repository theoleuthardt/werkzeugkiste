import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import * as libre from "libreoffice-convert";
import { promisify } from "util";
import { MultipartValue } from "@fastify/multipart";

const libreConvertAsync = promisify(libre.convert);

const mimeTypes: { [key: string]: string } = {
  'pdf': 'application/pdf',
  'html': 'text/html',
  'doc': 'application/msword',
  'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'txt': 'text/plain',
  'rtf': 'application/rtf',
  'odt': 'application/vnd.oasis.opendocument.text',
  'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'xls': 'application/vnd.ms-excel',
  'ods': 'application/vnd.oasis.opendocument.spreadsheet',
  'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'ppt': 'application/vnd.ms-powerpoint',
  'odp': 'application/vnd.oasis.opendocument.presentation'
};

export async function libreConvert(app: FastifyInstance) {
  app.post("/api/libre-convert", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const parts = request.parts();

      let fileBuffer: Buffer | null = null;
      let outputFileExt = "";

      for await (const part of parts) {
        if (part.type === "file") {
          fileBuffer = await part.toBuffer();
        } else if (part.fieldname === "outputFormat" && part.type === "field") {
          outputFileExt = (part as MultipartValue<string>).value;
          console.log("Output format:", outputFileExt);
        }
      }

      if (!fileBuffer) {
        return reply.status(400).send({ error: "No file uploaded!" });
      }
      if (!outputFileExt) {
        return reply.status(400).send({ error: "No output format provided!" });
      }
      if (!outputFileExt.startsWith(".")) {
        outputFileExt = "." + outputFileExt;
      }

      const format = outputFileExt.substring(1);
      const mimeType = mimeTypes[format] || 'application/octet-stream';

      const convertedBuffer = await libreConvertAsync(fileBuffer, outputFileExt, undefined);

      reply
          .header("Content-Type", mimeType)
          .header("Content-Disposition", `attachment; filename="converted${outputFileExt}"`)
          .send(convertedBuffer);
    } catch (error) {
      console.error("Convert error:", error);
      reply.status(500).send({ error: "Error while converting!" });
    }
  });
}