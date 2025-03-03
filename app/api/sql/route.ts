import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const { sql } = await request.json()

    if (!sql) {
      return NextResponse.json({ error: "SQL query is required" }, { status: 400 })
    }

    const startTime = performance.now()
    const result = await db.execute(sql)
    const duration = Math.round(performance.now() - startTime)

    // Extract column names from the first row
    const columns = result.rows.length > 0 ? Object.keys(result.rows[0]) : []

    return NextResponse.json({
      columns,
      rows: result.rows,
      rowCount: result.rowCount,
      duration,
    })
  } catch (error) {
    console.error("SQL execution error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to execute query" },
      { status: 500 },
    )
  }
}

