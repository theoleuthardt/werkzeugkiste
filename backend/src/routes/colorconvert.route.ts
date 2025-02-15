import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

interface RequestBody {
  red: string;
  green: string;
  blue: string;
}

export async function colorConvert(app: FastifyInstance) {
  app.post(
    "/api/color-convert",
    async (
      request: FastifyRequest<{ Body: RequestBody }>,
      reply: FastifyReply,
    ) => {
      try {
        const data = request.body;
        if (!data) {
          return reply.status(400).send({ error: "No RGB declared!" });
        }
        const hex = (`#${(+data.red).toString(16).padStart(2, "0")}${(+data.green).toString(16).padStart(2, "0")}${(+data.blue).toString(16).padStart(2, "0")}`).toUpperCase();
        reply.header("Content-Type", "application/json").send({ hex: hex });
      } catch (error) {
        console.error("Convert error:", error);
        reply.status(500).send({ error: "Error while converting!" });
      }
    },
  );
}
