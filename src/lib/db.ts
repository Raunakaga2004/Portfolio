import { Pool } from "pg";
import { attachDatabasePool } from "@vercel/functions";

// Pooled DATABASE_URL for app traffic; use DATABASE_URL_UNPOOLED for migrations.
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
attachDatabasePool(pool);
