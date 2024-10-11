// src/app/api/extractCvText/route.ts

import { NextResponse } from "next/server";
import { cvToJSON } from "../../../../actions/cv";

export async function POST(request: Request) {
  try {
    const { fileBuffer } = await request.json();

    if (!fileBuffer) {
      return NextResponse.json(
        { error: "File buffer is required" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(fileBuffer.data);
    const extractedText = await cvToJSON(buffer);
    return NextResponse.json({ extractedText }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to extract text from CV" },
      { status: 500 }
    );
  }
}
