import { readFile } from "fs/promises";
import { join } from "path";

export async function GET() {
  try {
    const filePath = join(process.cwd(), "public", "Driss_Laaziri.pdf");
    const file = await readFile(filePath);

    return new Response(file, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Driss_Laaziri.pdf"',
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new Response("Resume file not found", { status: 404 });
  }
}

