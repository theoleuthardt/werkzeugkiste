import Fastify from "fastify";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";
import { libreConvert } from "./src/routes/libreconvert.route";
import { colorConvert } from "./src/routes/colorconvert.route";
import { passwordGenerate } from "./src/routes/passwordgenerate.route";
import { regexTest } from "./src/routes/regextest.route";
import { tmzConvert } from "./src/routes/tmzconvert.route";
import { wordCounter } from "./src/routes/wordcounter.route";

const app = Fastify({ logger: true });

app.register(cors, {
  origin: "*",
  exposedHeaders: "Content-Disposition",
  methods: "POST",
  allowedHeaders: "Content-Type",
});
app.register(multipart);
app.register(libreConvert);
app.register(colorConvert);
app.register(passwordGenerate);
app.register(regexTest);
app.register(tmzConvert);
app.register(wordCounter);

const PORT = process.env.PORT || 4000;
app.listen({ port: Number(PORT), host: "0.0.0.0" }, () => {
  console.log(`🚀Fastify is live on http://localhost:${PORT}`);
});
