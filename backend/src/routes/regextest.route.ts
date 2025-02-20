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

        // Überprüfe, ob die Felder regex und test vorhanden sind
        if (!data.regex || !data.test) {
          return reply.status(400).send({ error: "Regex or test string missing!" });
        }

        // Versuche, den regulären Ausdruck zu erstellen
        let regexPattern;
        try {
          regexPattern = new RegExp(data.regex);
        } catch (e) {
          return reply.status(400).send({ error: "Invalid regular expression!" });
        }

        // Teste den Eingabestring gegen das Regex
        const result = regexPattern.test(data.test);

        // Erstelle die Antwort basierend auf dem Testergebnis
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
