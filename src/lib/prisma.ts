import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import { pool } from "./db";

export const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });
