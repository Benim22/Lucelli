import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    cookies().delete("session_id")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Sign out error:", error)
    return NextResponse.json({ error: "Failed to sign out" }, { status: 500 })
  }
}

