import { NextResponse } from "next/server"
import { signIn } from "next-auth/react"

export async function GET(request: Request, { params }: { params: { provider: string } }) {
  try {
    const provider = params.provider?.toLowerCase()
    const callbackUrl = new URL(request.url).searchParams.get("callbackUrl") || "/"

    if (!provider) {
      throw new Error("Provider is required")
    }

    // Validate provider is supported
    if (!["google", "github"].includes(provider)) {
      throw new Error(`Provider ${provider} not supported`)
    }

    // Get OAuth configuration based on provider
    const config = {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUrl: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`,
      },
      github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        redirectUrl: `${process.env.NEXTAUTH_URL}/api/auth/callback/github`,
      },
    }[provider]

    if (!config?.clientId || !config?.clientSecret) {
      throw new Error(`Missing configuration for provider ${provider}`)
    }

    // Generate OAuth URL
    const oauthUrl = provider === "google"
      ? `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${config.clientId}&` +
        `redirect_uri=${config.redirectUrl}&` +
        `response_type=code&` +
        `scope=email profile&` +
        `access_type=offline&` +
        `state=${encodeURIComponent(callbackUrl)}`
      : `https://github.com/login/oauth/authorize?` +
        `client_id=${config.clientId}&` +
        `redirect_uri=${config.redirectUrl}&` +
        `scope=user:email&` +
        `state=${encodeURIComponent(callbackUrl)}`

    return NextResponse.json({ url: oauthUrl })
  } catch (error) {
    console.error(`OAuth error:`, error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to initialize OAuth flow" },
      { status: 400 }
    )
  }
}

