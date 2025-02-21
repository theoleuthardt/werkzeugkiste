import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import * as QRCode from "qrcode";

interface RequestBody {
  qrcodeContent: string;
}

export async function generateQRCode(app: FastifyInstance) {
  app.post(
    "/api/generate-qrcode",
    async (
      request: FastifyRequest<{ Body: RequestBody }>,
      reply: FastifyReply,
    ) => {
      const data = request.body;

      if (!data.qrcodeContent) {
        return reply.status(400).send({ error: "Missing text parameter" });
      } else if (data.qrcodeContent === "") {
        return reply
          .status(400)
          .send({ error: "Text parameter cannot be empty" });
      } else if (data.qrcodeContent.length > 1000) {
        return reply.status(400).send({ error: "Text parameter too long" });
      }

      try {
        const qrCodeUrl = await QRCode.toDataURL(data.qrcodeContent);
        console.log("QR Code generated:", qrCodeUrl);
        return reply
          .header("Content-Type", "application/json")
          .status(200)
          .send({ qrCode: qrCodeUrl });
      } catch (error) {
        console.error("QR Code generation error:", error);
        return reply.status(500).send({ error: "Error generating QR code!" });
      }
    },
  );
}
