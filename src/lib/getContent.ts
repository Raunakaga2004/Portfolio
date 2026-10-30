import { prisma } from "./prisma";
import { DEFAULT_CONTENT, SECTION_KEYS, sectionSchemas, type Content } from "./content";

// DB content per section, falling back to defaults for missing/invalid rows (or if the DB is unreachable).
export async function getContent(): Promise<Content> {
  const content = structuredClone(DEFAULT_CONTENT);
  try {
    const rows = await prisma.section.findMany();
    for (const row of rows) {
      const key = row.key as keyof Content;
      if (!SECTION_KEYS.includes(key)) continue;
      const parsed = sectionSchemas[key].safeParse(row.data);
      if (parsed.success) (content[key] as unknown) = parsed.data;
      else console.error(`Invalid content for section "${key}", using default`, parsed.error.issues);
    }
  } catch (e) {
    if ((e as { code?: string }).code === "P2021") {
      console.warn("Section table missing — run `npm run db:migrate && npm run db:seed`. Using defaults.");
    } else {
      console.error("Failed to load content, using defaults", e);
    }
  }
  return content;
}
