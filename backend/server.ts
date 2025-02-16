import Fastify from "fastify";
import cors from "@fastify/cors";
import multipart from '@fastify/multipart';
import { libreConvert } from "./src/routes/libreconvert.route";

const app = Fastify({ logger: true });

app.register(cors, { origin: "*", exposedHeaders: 'Content-Disposition' });
app.register(multipart);
app.register(libreConvert);

const PORT = process.env.PORT || 4000;
app.listen({ port: Number(PORT), host: "0.0.0.0" }, () => {
    console.log(`🚀Fastify is live on http://localhost:${PORT}`);
});