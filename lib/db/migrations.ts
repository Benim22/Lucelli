import { migrate } from "drizzle-orm/neon-serverless/migrator"
import { db } from "."
import path from "path"

export async function runMigrations() {
  try {
    await migrate(db, {
      migrationsFolder: path.join(process.cwd(), "lib/db/migrations"),
    })
    console.log("Migrations completed successfully")
  } catch (error) {
    console.error("Error running migrations:", error)
    throw error
  }
}

