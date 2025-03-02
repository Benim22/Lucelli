import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"
import { signIn } from "next-auth/react"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Use NextAuth's signIn function instead of manual authentication
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Find user to return user data
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    })

    return NextResponse.json({
      success: true,
      user: {
        id: user?.id,
        email: user?.email,
        name: user?.name,
      },
    })
  } catch (error) {
    console.error("Sign-in error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}

