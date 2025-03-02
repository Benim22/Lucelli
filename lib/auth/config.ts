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
})

// Use NEXTAUTH_URL as the base URL
const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000"

export const authConfig = {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    redirectUri: `${baseUrl}/api/auth/callback/google`,
  },
  github: {
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    redirectUri: `${baseUrl}/api/auth/callback/github`,
  },
}

// Validate config
const result = authConfigSchema.safeParse(authConfig)
if (!result.success) {
  throw new Error(`Invalid auth configuration: ${result.error.message}`)
}

export const CALLBACK_URL = baseUrl

