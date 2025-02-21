import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

interface RequestBody {
  regex: string;
  test: string;
}

export async function regexTest(app: FastifyInstance) {
  app.post(
    "/api/regex-test",
    async (
      request: FastifyRequest<{ Body: RequestBody }>,
      reply: FastifyReply,
    ) => {
      try {
        const data = request.body;
        if (!data) {
          return reply.status(400).send({ error: "No Regex declared!" });
        }

        if (!data.regex || !data.test) {
          return reply
            .status(400)
            .send({ error: "Regex or test string missing!" });
        }

        let regexPattern;
        try {
          regexPattern = new RegExp(data.regex);
        } catch (e) {
          return reply
            .status(400)
            .send({ error: "Invalid regular expression!" });
        }

        const result = regexPattern.test(data.test);

        let output = "";
        if (result) {
          output = "the input matches the regular expression!";
        } else {
          output = "the input does not match the regular expression.";
        }

        reply.header("Content-Type", "text/plain").status(200).send(output);
      } catch (error) {
        console.error("Convert error:", error);
        reply.status(500).send({ error: "Error while converting!" });
      }
    },
  );
}
