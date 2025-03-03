import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { provider: string } }) {
  try {
    const provider = params.provider

    if (!provider) {
      throw new Error("Provider is required")
    }

    // Get OAuth configuration based on provider
    const config = {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback/google`,
      },
      github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback/github`,
      },
    }[provider]

    if (!config) {
      throw new Error(`Provider ${provider} not supported`)
    }

    // Generate OAuth URL
    const oauthUrl =
      provider === "google"
        ? `https://accounts.google.com/o/oauth2/v2/auth?` +
          `client_id=${config.clientId}&` +
          `redirect_uri=${config.redirectUri}&` +
          `response_type=code&` +
          `scope=email profile&` +
          `access_type=offline`
        : `https://github.com/login/oauth/authorize?` +
          `client_id=${config.clientId}&` +
          `redirect_uri=${config.redirectUri}&` +
          `scope=user:email`

    return new NextResponse(JSON.stringify({ url: oauthUrl }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error(`OAuth error:`, error)
    return new NextResponse(JSON.stringify({ error: "Failed to initialize OAuth flow" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

