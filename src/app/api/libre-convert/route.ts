"use strict";
import libre from "libreoffice-convert";
import { promisify } from "util";
import { NextRequest, NextResponse } from "next/server";

const libreConvertAsync = promisify(libre.convert);

export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as Blob;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded!" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);
    const pdfBuffer = await libreConvertAsync(
      fileBuffer,
      ".pdf",
      "writer_pdf_Export",
    );

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=converted.pdf",
      },
    });
  } catch (error: unknown) {
    console.error("Convert error: ", error);
    return NextResponse.json(
      { error: "Error while converting!" },
      { status: 500 },
    );
  }
}
