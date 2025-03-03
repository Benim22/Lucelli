import { z } from "zod"

const authConfigSchema = z.object({
  google: z.object({
    clientId: z.string(),
    clientSecret: z.string(),
    redirectUri: z.string().url(),
  }),
  github: z.object({
    clientId: z.string(),
    clientSecret: z.string(),
    redirectUri: z.string().url(),
  }),
  stackProjectId: z.string(),
  stackPublishableKey: z.string(),
  stackSecretKey: z.string(),
  realmAppId: z.string(),
})

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : undefined

export const authConfig = {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    redirectUri: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`,
  },
  github: {
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    redirectUri: `${process.env.NEXTAUTH_URL}/api/auth/callback/github`,
  },
}

export const CALLBACK_URL = process.env.NEXT_PUBLIC_CALLBACK_URL || "http://localhost:3000/api/auth/callback"

// Validate config
const result = authConfigSchema.safeParse(authConfig)
if (!result.success) {
  throw new Error(`Invalid auth configuration: ${result.error.message}`)
}

