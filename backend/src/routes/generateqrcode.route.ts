import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import QRCode from "qrcode";

interface RequestBody {
  text: string;
}

export async function generateQRCode(app: FastifyInstance) {
  app.post(
    "/api/generate-qrcode",
    async (
      request: FastifyRequest<{ Body: RequestBody }>,
      reply: FastifyReply,
    ) => {
      const data = request.body;

      if (!data) {
        return reply.status(400).send({ error: "Missing data parameter" });
      }

      try {
        const qrCodeDataUrl = QRCode.toDataURL(data.text);
        return reply
          .header("Content-Type", "application/json")
          .status(200)
          .send({ qrCode: qrCodeDataUrl });
      } catch (error) {
        console.error("QR Code generation error:", error);
        reply.status(500).send({ error: "Error generating QR code" });
      }
    },
  );
}
