import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // Sökväg till din CV-fil (lägg den i public/cv/)
    const filePath = path.join(process.cwd(), "public", "cv", "your-cv.pdf");
    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Cecilia_Wiklund_CV.pdf"',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "CV not found" }, { status: 404 });
  }
}
