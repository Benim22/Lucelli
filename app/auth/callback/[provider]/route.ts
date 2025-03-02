import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { users, oauthAccounts, sessions } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

async function getOAuthUserInfo(provider: string, code: string) {
  const config = {
    google: {
      tokenUrl: "https://oauth2.googleapis.com/token",
      userInfoUrl: "https://www.googleapis.com/oauth2/v2/userinfo",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback/google`,
    },
    github: {
      tokenUrl: "https://github.com/login/oauth/access_token",
      userInfoUrl: "https://api.github.com/user",
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback/github`,
    },
  }[provider]

  if (!config) {
    throw new Error(`Provider ${provider} not supported`)
  }

  // Exchange code for token
  const tokenResponse = await fetch(config.tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      code,
      redirect_uri: config.redirectUri,
      grant_type: "authorization_code",
    }),
  })

  const tokenData = await tokenResponse.json()

  // Get user info
  const userInfoResponse = await fetch(config.userInfoUrl, {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
      Accept: "application/json",
    },
  })

  return await userInfoResponse.json()
}

export async function GET(request: Request, { params }: { params: { provider: string } }) {
  try {
    const provider = params.provider
    const searchParams = new URL(request.url).searchParams
    const code = searchParams.get("code")

    if (!code) {
      throw new Error("No code provided")
    }

    // Get user info from OAuth provider
    const userInfo = await getOAuthUserInfo(provider, code)

    // Find or create user
    let user = await db.query.users.findFirst({
      where: eq(users.email, userInfo.email),
    })

    if (!user) {
      const [newUser] = await db
        .insert(users)
        .values({
          email: userInfo.email,
          name: userInfo.name,
          image: userInfo.picture || userInfo.avatar_url,
        })
        .returning()
      user = newUser
    }

    // Create or update OAuth account
    await db
      .insert(oauthAccounts)
      .values({
        userId: user.id,
        provider,
        providerAccountId: userInfo.id.toString(),
        accessToken: userInfo.access_token,
      })
      .onConflictDoUpdate({
        target: [oauthAccounts.provider, oauthAccounts.providerAccountId],
        set: { accessToken: userInfo.access_token },
      })

    // Create session
    const [session] = await db
      .insert(sessions)
      .values({
        userId: user.id,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      })
      .returning()

    // Redirect to home page with session cookie
    const response = new NextResponse(null, {
      status: 302,
      headers: {
        Location: "/",
        "Set-Cookie": `session_id=${session.id}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60}`,
      },
    })

    return response
  } catch (error) {
    console.error("OAuth callback error:", error)
    return new NextResponse(null, {
      status: 302,
      headers: {
        Location: "/auth/signin?error=OAuth authentication failed",
      },
    })
  }
}

