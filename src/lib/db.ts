import { Pool } from "pg";
import { attachDatabasePool } from "@vercel/functions";

// Pooled DATABASE_URL for app traffic; use DATABASE_URL_UNPOOLED for migrations.
// pg already treats sslmode=require as verify-full; spelling it out silences its deprecation warning.
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL?.replace("sslmode=require", "sslmode=verify-full"),
});
attachDatabasePool(pool);
