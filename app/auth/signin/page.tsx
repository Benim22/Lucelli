"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { Github, Loader2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const providers = [
  {
    name: "Google",
    id: "google",
    icon: "/google.svg",
    action: "signInWithGoogle",
  },
  {
    name: "GitHub",
    id: "github",
    icon: Github,
    action: "signInWithGithub",
  },
  {
    name: "Discord",
    id: "discord",
    icon: "/discord.svg",
    action: "signInWithDiscord",
  },
] as const

export default function SignInPage() {
  const { isAuthenticated, isLoading, signInWithGoogle, signInWithGithub, signInWithDiscord } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  const handleSignIn = (providerId: string) => {
    switch (providerId) {
      case "google":
        return signInWithGoogle()
      case "github":
        return signInWithGithub()
      case "discord":
        return signInWithDiscord()
      default:
        console.error("Unknown provider:", providerId)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to Lucelli</CardTitle>
          <CardDescription>Choose a provider to sign in</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {providers.map((provider) => (
            <Button
              key={provider.id}
              variant="outline"
              className="w-full"
              onClick={() => handleSignIn(provider.id)}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : typeof provider.icon === "string" ? (
                <Image
                  src={provider.icon || "/placeholder.svg"}
                  alt={provider.name}
                  width={20}
                  height={20}
                  className="mr-2"
                />
              ) : (
                <provider.icon className="mr-2 h-4 w-4" />
              )}
              Sign in with {provider.name}
            </Button>
          ))}
        </CardContent>
      </Card>
    </main>
  )
}

