import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import fs from "fs";

type RouteParams = { params: Promise<{ filename: string }> };

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { filename } = await params;

  // Search in persistent storage first, then fallback to local public directory
  const persistentPath = path.join("/data", "uploads", filename);
  const localPath = path.join(process.cwd(), "public", "uploads", filename);

  let filePath = "";
  if (fs.existsSync(persistentPath)) {
    filePath = persistentPath;
  } else if (fs.existsSync(localPath)) {
    filePath = localPath;
  } else {
    return new NextResponse("File not found", { status: 404 });
  }

  try {
    const fileBuffer = await readFile(filePath);
    
    // Determine content type based on extension
    const ext = filename.split(".").pop()?.toLowerCase();
    let contentType = "application/octet-stream";
    if (ext === "jpg" || ext === "jpeg") contentType = "image/jpeg";
    else if (ext === "png") contentType = "image/png";
    else if (ext === "gif") contentType = "image/gif";
    else if (ext === "svg") contentType = "image/svg+xml";
    else if (ext === "webp") contentType = "image/webp";
    else if (ext === "mp4") contentType = "video/mp4";
    else if (ext === "webm") contentType = "video/webm";

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving file:", error);
    return new NextResponse("Error serving file", { status: 500 });
  }
}
