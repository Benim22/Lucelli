import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth/next-auth"

export default async function AuthCallbackPage({
  searchParams,
}: {
  searchParams: { code?: string; error?: string }
}) {
  // Handle OAuth errors
  if (searchParams.error) {
    redirect(`/auth/signin?error=${searchParams.error}`)
  }

  // Check if we already have a session
  const session = await getServerSession(authOptions)
  if (session) {
    redirect("/dashboard")
  }

  // If no session and no error, redirect to sign in
  redirect("/auth/signin")
}

