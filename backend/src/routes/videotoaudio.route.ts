import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { MultipartValue } from "@fastify/multipart";
import { spawn } from "child_process";
import { promises as fs } from "fs";
import * as path from "path";
import { randomUUID } from "crypto";

interface ConversionOptions {
  format: string;
  bitrate?: string;
  channels?: number;
  sampleRate?: number;
}

let options: ConversionOptions;

export async function videoToAudio(app: FastifyInstance) {
  app.post(
    "/api/video-to-audio",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const tmpDir = path.join(process.cwd(), "tmp");
      const sessionId = randomUUID();
      const inputPath = path.join(tmpDir, `input-${sessionId}`);
      const outputPath = path.join(tmpDir, `output-${sessionId}`);

      try {
        await fs.mkdir(tmpDir, { recursive: true });

        const parts = request.parts();

        let fileBuffer: Buffer | null = null;
        options = {
          format: "mp3",
          bitrate: "192k",
          channels: 2,
          sampleRate: 44100,
        };

        for await (const part of parts) {
          if (part.type === "file") {
            fileBuffer = await part.toBuffer();
          } else if (part.type === "field") {
            const field = part as MultipartValue<string>;
            switch (field.fieldname) {
              case "format":
                const format = field.value.toLowerCase();
                options.format = format;
                break;
              case "bitrate":
                options.bitrate = field.value;
                break;
              case "channels":
                options.channels = parseInt(field.value, 10);
                break;
              case "sampleRate":
                options.sampleRate = parseInt(field.value, 10);
                break;
            }
          }
        }

        if (!fileBuffer) {
          return reply.status(400).send({ error: "No file uploaded!" });
        }

        await fs.writeFile(inputPath, fileBuffer);

        await new Promise<void>((resolve, reject) => {
          const args = [
            "-i",
            inputPath,
            "-vn",
            "-acodec",
            options.format === "mp3" ? "libmp3lame" : options.format,
            "-ab",
            options.bitrate || "192k",
            "-ac",
            String(options.channels || 2),
            "-ar",
            String(options.sampleRate || 44100),
            outputPath + "." + options.format,
          ];

          const ffmpeg = spawn("ffmpeg", args);

          ffmpeg.stderr.on("data", (data) => {
            console.log(`ffmpeg stderr: ${data}`);
          });

          ffmpeg.on("close", (code) => {
            if (code === 0) {
              resolve();
            } else {
              reject(new Error(`ffmpeg process exited with code ${code}`));
            }
          });

          ffmpeg.on("error", (err) => {
            reject(err);
          });
        });

        const outputFile = await fs.readFile(outputPath + "." + options.format);

        await Promise.all([
          fs.unlink(inputPath),
          fs.unlink(outputPath + "." + options.format),
        ]);

        reply
          .header("Content-Type", `audio/${options.format}`)
          .header(
            "Content-Disposition",
            `attachment; filename="converted.${options.format}"`,
          )
          .send(outputFile);
      } catch (error) {
        try {
          await Promise.all([
            fs.unlink(inputPath).catch(() => {}),
            fs
              .unlink(outputPath + "." + (options?.format || "mp3"))
              .catch(() => {}),
          ]);
        } catch (cleanupError) {
          console.error("Cleanup error:", cleanupError);
        }

        console.error("Conversion error:", error);
        reply.status(500).send({
          error: "Error during conversion process",
          details: error instanceof Error ? error.message : "Unknown error",
        });
      }
    },
  );
}
