import { defineConfig } from "prisma/config";

// Locally env lives in .env.local (written by `neon deploy`); in CI it's already in process.env.
try {
  process.loadEnvFile(".env.local");
} catch {}

export default defineConfig({
  schema: "prisma/schema.prisma",
  // Direct (unpooled) connection for migrations.
  datasource: { url: process.env.DATABASE_URL_UNPOOLED ?? "" },
});
