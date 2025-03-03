"use client"

import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, UserIcon } from "lucide-react"
import { useEffect, useState } from "react"

// Tell Next.js this is a dynamic page that should not be pre-rendered
export const dynamic = "force-dynamic"

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false)
  const { user } = useAuth()

  // Only run client-side
  useEffect(() => {
    setMounted(true)
  }, [])

  // Show a simple loading state during SSR
  if (!mounted) {
    return (
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Min Profil</h1>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-64 animate-pulse"></div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-64 animate-pulse"></div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Min Profil</h1>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Profile Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Profilinformation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user?.pictureUrl} alt={user?.name || ""} />
                  <AvatarFallback className="text-lg">{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{user?.name || "Inte inloggad"}</h2>
                  <p className="text-sm text-muted-foreground">
                    {user?.provider ? `Inloggad via ${user.provider}` : "Inte inloggad"}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user?.email || "Inte inloggad"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4 text-muted-foreground" />
                  <span>Medlem sedan {new Date().toLocaleDateString("sv-SE")}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Aktivitet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Senaste inloggning</span>
                  <span>{new Date().toLocaleDateString("sv-SE")}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Bokade möten</span>
                  <span>0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Meddelanden</span>
                  <span>0</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

