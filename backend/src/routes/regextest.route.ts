import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

interface RequestBody {
  input: string;
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
        const regexPattern = data.input;

        // Überprüfe, ob der Regex-Pattern korrekt ist
        let regex: RegExp;
        try {
          regex = new RegExp(regexPattern);
        } catch (e) {
          return reply.status(400).send({ error: "Invalid regular expression!" });
        }

        // Teste den Regex
        const result = regex.test(data.input);

        // Erstelle eine Ausgabe basierend auf dem Test-Ergebnis
        let output = "";

        if (result) {
          output = `The input matches the regular expression!`;
        } else {
          output = `The input does not match the regular expression.`;
        }

        reply.header("Content-Type", "text/plain").status(200).send(output);
      } catch (error) {
        console.error("Convert error:", error);
        reply.status(500).send({ error: "Error while converting!" });
      }
    },
  );
}
