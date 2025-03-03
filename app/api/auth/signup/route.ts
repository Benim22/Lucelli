import { db } from "@/lib/db"
import { users, oauthAccounts, sessions } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()

    console.log("Attempting signup for:", email)

    if (!email || !password) {
      return new NextResponse(JSON.stringify({ error: "Email and password are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    })

    if (existingUser) {
      return new NextResponse(JSON.stringify({ error: "Email already exists" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const [user] = await db
      .insert(users)
      .values({
        email,
        name: name || email.split("@")[0],
      })
      .returning()

    // Create OAuth account for email/password
    await db.insert(oauthAccounts).values({
      userId: user.id,
      provider: "credentials",
      providerAccountId: email,
      accessToken: hashedPassword, // Store hashed password as access token
    })

    // Create session
    const [session] = await db
      .insert(sessions)
      .values({
        userId: user.id,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      })
      .returning()

    return new NextResponse(
      JSON.stringify({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": `session_id=${session.id}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60}`,
        },
      },
    )
  } catch (error) {
    console.error("Signup error:", error)
    return new NextResponse(JSON.stringify({ error: "Failed to create account" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

