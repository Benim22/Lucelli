import { Suspense } from "react"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth/next-auth"
import { redirect } from "next/navigation"
import { SettingsClient } from "./settings-client"
import { SettingsSkeleton } from "./loading"

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/auth/signin")
  }

  return (
    <Suspense fallback={<SettingsSkeleton />}>
      <SettingsClient user={session.user} />
    </Suspense>
  )
}

