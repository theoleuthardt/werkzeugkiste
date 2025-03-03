import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { promises as fs } from "fs";
import * as path from "path";
import { randomUUID } from "crypto";
import { spawn } from "child_process";

export async function removeBG(app: FastifyInstance) {
  app.post(
    "/api/remove-bg",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const tmpDir =
        process.env.NODE_ENV === "production"
          ? "/app/tmp"
          : path.join(process.cwd(), "tmp");
      const sessionId = randomUUID();
      const inputPath = path.join(tmpDir, `input-${sessionId}.png`);
      const outputPath = path.join(tmpDir, `output-${sessionId}.png`);

      try {
        const parts = request.parts();
        if (process.env.NODE_ENV === "development") {
          await fs.mkdir(tmpDir, { recursive: true });
        }

        let fileBuffer: Buffer | null = null;

        for await (const part of parts) {
          if (part.type === "file") {
            fileBuffer = await part.toBuffer();
          }
        }

        if (!fileBuffer) {
          return reply.status(400).send({ error: "No file uploaded!" });
        }

        await fs.writeFile(inputPath, fileBuffer);
        console.log("Received file, buffer length:", fileBuffer.length);

        await new Promise<void>((resolve, reject) => {
          const pythonProcess = spawn("rembg", ["i", inputPath, outputPath]);

          pythonProcess.stderr.on("data", (data) => {
            console.log(`ffmpeg stderr: ${data}`);
          });

          pythonProcess.on("close", (code) => {
            if (code === 0) {
              resolve();
            } else {
              reject(new Error(`rembg process exited with code ${code}`));
            }
          });

          pythonProcess.on("error", (err) => {
            reject(err);
          });
        });

        const outputImageBuffer = await fs.readFile(outputPath);
        await Promise.all([
          fs.unlink(inputPath).catch(() => {}),
          fs.unlink(outputPath).catch(() => {}),
        ]);

        reply
          .header("Content-Type", "image/png")
          .header("Content-Disposition", `attachment; filename="converted.png"`)
          .status(200)
          .send(outputImageBuffer);
      } catch (error) {
        try {
          await Promise.all([
            fs.unlink(inputPath).catch(() => {}),
            fs.unlink(outputPath).catch(() => {}),
          ]);
        } catch (cleanupError) {
          console.error("Cleanup error:", cleanupError);
        }

        console.error("Convert error:", error);
        reply.status(500).send({ error: "Error while converting!" });
      }
    },
  );
}
