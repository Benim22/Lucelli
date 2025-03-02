import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Create a new connection
    const sql = neon(process.env.DATABASE_URL!)

    // Test query to check if we can connect and get the current timestamp
    const result = await sql`
      SELECT 
        current_timestamp as server_time,
        version() as db_version,
        current_database() as db_name;
    `

    // Test query to count tables in our schema
    const tableCount = await sql`
      SELECT count(*) as table_count 
      FROM information_schema.tables 
      WHERE table_schema = 'public';
    `

    return NextResponse.json({
      status: "Connected",
      database: result[0],
      tables: tableCount[0],
      message: "Successfully connected to NeonDB!",
    })
  } catch (error) {
    console.error("Database connection error:", error)
    return NextResponse.json(
      {
        status: "Error",
        message: "Failed to connect to database",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

