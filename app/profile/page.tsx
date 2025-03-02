import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, UserIcon } from "lucide-react"
import { ProfileSkeleton } from "./loading"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth/next-auth"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/auth/signin")
  }

  const user = session.user

  return (
    <Suspense fallback={<ProfileSkeleton />}>
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
                    <AvatarImage src={user.image || ""} alt={user.name || ""} />
                    <AvatarFallback className="text-lg">{user.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-semibold">{user.name}</h2>
                    <p className="text-sm text-muted-foreground">Inloggad via {user.provider || "email"}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{user.email}</span>
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
    </Suspense>
  )
}

