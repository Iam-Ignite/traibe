import { PrismaClient } from "@prisma/client";

// Hardcoded DATABASE_URL - fallback if env var is not set
const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://postgres:jWaanlnE6Vi42J6u@db.qzvazvvpjzcspxohcgqz.supabase.co:5432/postgres";

let prisma: PrismaClient;

declare global {
  var __db__: PrismaClient;
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
// in production we'll have a single connection to the DB.
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: DATABASE_URL,
      },
    },
  });
} else {
  if (!global.__db__) {
    global.__db__ = new PrismaClient({
      datasources: {
        db: {
          url: DATABASE_URL,
        },
      },
    });
  }
  prisma = global.__db__;
  prisma.$connect();
}

export { prisma };
