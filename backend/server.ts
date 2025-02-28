import Fastify from "fastify";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";
import { libreConvert } from "./src/routes/libreconvert.route";
import { colorConvert } from "./src/routes/colorconvert.route";
import { passwordGenerate } from "./src/routes/passwordgenerate.route";
import { regexTest } from "./src/routes/regextest.route";
import { tmzConvert } from "./src/routes/tmzconvert.route";
import { generateQRCode } from "./src/routes/generateqrcode.route";
import { wordCounter } from "./src/routes/wordcounter.route";
import { videoToAudio } from "./src/routes/videotoaudio.route";
import { removeBG } from "./src/routes/removebg.route";
import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = Fastify({ logger: true });

app.register(cors, {
  origin: process.env.CORS_ALLOWED_ORIGIN || "*",
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
app.register(generateQRCode);
app.register(wordCounter);
app.register(videoToAudio);
app.register(removeBG);

console.log("Starting Fastify server...");
const PORT = process.env.BACKEND_PORT;
app.listen({ port: Number(PORT), host: "0.0.0.0" }, () => {
  console.log(`🚀Fastify is live on http://localhost:${PORT}`);
  console.log(`Allowed origin: ${process.env.CORS_ALLOWED_ORIGIN}`);
});
