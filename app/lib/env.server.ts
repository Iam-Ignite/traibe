// Server-side environment configuration
// This file is only imported on the server, never sent to the client

export const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://postgres:jWaanlnE6Vi42J6u@db.qzvazvvpjzcspxohcgqz.supabase.co:5432/postgres";
