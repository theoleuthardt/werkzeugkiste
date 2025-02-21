import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

interface RequestBody {
  input: string;
}

export async function wordCounter(app: FastifyInstance) {
  app.post(
    "/api/word-counter",
    async (
      request: FastifyRequest<{ Body: RequestBody }>,
      reply: FastifyReply,
    ) => {
      try {
        const data = request.body;
        if (!data) {
          return reply.status(400).send({ error: "No text declared!" });
        } else if (data.input == "") {
          return reply.status(400).send({ error: "No text!" });
        }

        const output = data.input.trim().split(/\s+/).length;

        reply
          .header("Content-Type", "text/plain")
          .status(200)
          .send(output.toString());
      } catch (error) {
        console.error("Convert error:", error);
        reply.status(500).send({ error: "Error while converting!" });
      }
    },
  );
}
