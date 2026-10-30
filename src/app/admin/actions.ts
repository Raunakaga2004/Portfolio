"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { files } from "@/lib/storage";
import { SECTION_KEYS, sectionSchemas, type SectionKey } from "@/lib/content";

async function requireAdmin() {
  if (!(await getServerSession(authOptions))) throw new Error("Unauthorized");
}

export type SaveResult = { ok: true } | { ok: false; errors: string[] };

export async function saveSection(key: SectionKey, data: unknown): Promise<SaveResult> {
  await requireAdmin();
  if (!SECTION_KEYS.includes(key)) return { ok: false, errors: ["Unknown section"] };

  const parsed = sectionSchemas[key].safeParse(data);
  if (!parsed.success) {
    return {
      ok: false,
      errors: parsed.error.issues.map((i) => `${i.path.join(" › ") || key}: ${i.message}`),
    };
  }

  await prisma.section.upsert({
    where: { key },
    create: { key, data: parsed.data },
    update: { data: parsed.data },
  });
  revalidatePath("/");
  return { ok: true };
}

const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const IMAGE_TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};

export async function uploadImage(formData: FormData): Promise<{ key: string } | { error: string }> {
  await requireAdmin();
  const file = z.instanceof(File).safeParse(formData.get("file"));
  if (!file.success) return { error: "No file" };

  const ext = IMAGE_TYPES[file.data.type];
  if (!ext) return { error: "Only PNG, JPEG, WebP, GIF or AVIF images" };
  if (file.data.size > MAX_IMAGE_BYTES) return { error: "Image must be 4 MB or smaller" };

  const key = `images/${crypto.randomUUID()}.${ext}`;
  await files.upload(key, file.data, { contentType: file.data.type });
  return { key };
}
