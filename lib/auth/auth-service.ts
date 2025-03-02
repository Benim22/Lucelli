import { getServerSession } from "next-auth/next"
import { authOptions } from "./next-auth"

export async function handleAuthCallback(code: string) {
  // Using NextAuth session instead
  const session = await getServerSession(authOptions)

  return {
    profile: session?.user || null,
  }
}

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  return session?.user || null
}

