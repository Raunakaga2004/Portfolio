import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { files } from "@/lib/storage";

// Dev-only smoke test for Postgres + object storage.
export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return new NextResponse(null, { status: 404 });
  }

  const { rows } = await pool.query("select now() as now, version() as version");

  const key = `health/${crypto.randomUUID()}.txt`;
  await files.upload(key, "ok", { contentType: "text/plain" });
  const roundTrip = await (await files.download(key)).text();
  await files.delete(key);

  return NextResponse.json({
    postgres: rows[0],
    storage: { key, roundTrip, ok: roundTrip === "ok" },
  });
}
