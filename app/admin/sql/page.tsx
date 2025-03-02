import { Suspense } from "react"
import { SqlEditorSkeleton } from "./loading"
import { SqlEditorClient } from "./sql-editor-client"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth/next-auth"
import { redirect } from "next/navigation"

// Prevent static generation
export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export default async function SqlEditorPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/auth/signin")
  }

  // Check for admin role (you can adjust this based on your user roles)
  if (session.user.role !== "admin") {
    redirect("/")
  }

  return (
    <Suspense fallback={<SqlEditorSkeleton />}>
      <SqlEditorClient />
    </Suspense>
  )
}

