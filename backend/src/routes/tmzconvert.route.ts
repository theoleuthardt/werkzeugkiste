import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { DateTime } from "luxon";

interface RequestBody {
  time: string;
  fromZone: string;
  toZone: string;
}

export async function tmzConvert(app: FastifyInstance) {
  app.post(
    "/api/tmz-convert",
    async (
      request: FastifyRequest<{ Body: RequestBody }>,
      reply: FastifyReply,
    ) => {
      const data = request.body;
      const time = data.time;
      const fromZone = data.fromZone;
      const toZone = data.toZone;

      try {
        if (!time || !fromZone || !toZone) {
          return reply.status(400).send({ error: "Missing parameters" });
        }

        const dateTime = DateTime.fromISO(time, { zone: fromZone });

        if (!dateTime.isValid) {
          return reply.status(400).send({ error: "Invalid date or time zone" });
        }

        const convertedTime = dateTime.setZone(toZone).toISO();

        return reply
          .header("Content-Type", "text/plain")
          .status(200)
          .send(convertedTime);
      } catch (error) {
        console.error("Conversion error:", error);
        reply.status(500).send({ error: "Error converting time" });
      }
    },
  );
}
