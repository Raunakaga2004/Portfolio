import { prisma } from "../src/lib/prisma";
import { DEFAULT_CONTENT, SECTION_KEYS } from "../src/lib/content";

// Idempotent: resets every section to the original hardcoded content.
async function main() {
  for (const key of SECTION_KEYS) {
    const data = DEFAULT_CONTENT[key];
    await prisma.section.upsert({ where: { key }, create: { key, data }, update: { data } });
    console.log(`seeded ${key}`);
  }
}

main().finally(() => prisma.$disconnect());
