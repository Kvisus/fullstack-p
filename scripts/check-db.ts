import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  console.error("\n DATABASE_URL is not set in .env\n");
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 5000,
});

async function main() {
  try {
    const client = await pool.connect();
    await client.query("SELECT 1");
    client.release();
    console.log("✓ Database connection OK");
    process.exit(0);
  } catch (err: unknown) {
    const isConnectionError =
      (err as NodeJS.ErrnoException)?.code === "ECONNREFUSED" ||
      String((err as Error)?.message).includes("ECONNREFUSED") ||
      String((err as Error)?.message).toLowerCase().includes("connect");

    if (isConnectionError) {
      console.error("\n Database is not available.");
      console.error("   Make sure the PostgreSQL container is running:");
      console.error("   docker compose up -d\n");
    } else {
      console.error("\nDatabase error:", (err as Error)?.message ?? err);
    }
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
