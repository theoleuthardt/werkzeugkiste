import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { removeBackground } from "@imgly/background-removal-node";
import sharp from "sharp";

export async function removeBG(app: FastifyInstance) {
  app.post(
    "/api/remove-bg",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const parts = request.parts();

        let fileBuffer: Buffer | null = null;

        for await (const part of parts) {
          if (part.type === "file") {
            fileBuffer = await part.toBuffer();
          }
        }

        if (!fileBuffer) {
          return reply.status(400).send({ error: "No file uploaded!" });
        }

        console.log("Received file, buffer length:", fileBuffer.length);

        const rightFileBuffer = await sharp(fileBuffer)
          .toFormat("png")
          .toBuffer();
        console.log("Converted file:", rightFileBuffer);
        const convertedBuffer = await removeBackground(rightFileBuffer);

        reply
          .header("Content-Type", "image/png")
          .header("Content-Disposition", `attachment; filename="converted.png"`)
          .status(200)
          .send(convertedBuffer);
      } catch (error) {
        console.error("Convert error:", error);
        reply.status(500).send({ error: "Error while converting!" });
      }
    },
  );
}
