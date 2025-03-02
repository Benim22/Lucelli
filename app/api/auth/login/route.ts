import { loginWithCredentials } from "@/lib/auth/db-auth"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 })
    }

    const result = await loginWithCredentials({ email, password })

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 401 })
    }

    // Create a session cookie
    const sessionExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days

    return NextResponse.json(
      { success: true, user: result.user },
      {
        status: 200,
        headers: {
          "Set-Cookie": `session=${result.user.id}; Path=/; HttpOnly; SameSite=Lax; Expires=${sessionExpiry.toUTCString()}`,
        },
      },
    )
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, error: "Authentication failed" }, { status: 500 })
  }
}

