import { files } from "@/lib/storage";

// Serves uploaded images from the private bucket. Keys are unique per upload, so cache forever.
export async function GET(_req: Request, { params }: { params: Promise<{ key: string[] }> }) {
  const key = (await params).key.join("/");
  if (!/^images\/[\w-]+\.\w+$/.test(key)) return new Response(null, { status: 404 });

  try {
    const file = await files.download(key);
    return new Response(file.stream(), {
      headers: {
        "Content-Type": file.contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response(null, { status: 404 });
  }
}
