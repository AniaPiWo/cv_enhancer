import { NextResponse } from "next/server";
import { enhanceCv } from "../../../../actions/cv";

export async function POST(request: Request) {
  try {
    const { extractedCV } = await request.json();

    if (!extractedCV) {
      return NextResponse.json(
        { error: "No CV data provided" },
        { status: 400 }
      );
    }

    // Call the enhanceCv function with the extracted CV data
    const enhancedCv = await enhanceCv(extractedCV);

    // Return the enhanced CV
    return NextResponse.json({ enhancedCv }, { status: 200 });
  } catch (error) {
    console.error("Error enhancing CV:", error);
    return NextResponse.json(
      { error: "Failed to enhance the CV" },
      { status: 500 }
    );
  }
}
