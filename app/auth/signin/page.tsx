"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Github, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { GoogleIcon } from "@/components/icons/google"
import { useToast } from "@/components/ui/use-toast"

const providers = [
  {
    name: "Google",
    id: "google",
    icon: GoogleIcon,
  },
  {
    name: "GitHub",
    id: "github",
    icon: Github,
  },
] as const

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  // Show error message if there was an error
  const error = searchParams.get("error")
  if (error) {
    toast({
      title: "Authentication Error",
      description: error,
      variant: "destructive",
    })
  }

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading("email")

    try {
      const response = await fetch("/api/auth/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed")
      }

      toast({
        title: "Success",
        description: "You have been signed in successfully",
      })

      // Redirect to home page after a short delay
      setTimeout(() => {
        router.push("/")
      }, 1000)
    } catch (error) {
      console.error("Email sign-in error:", error)
      toast({
        title: "Authentication Error",
        description: error instanceof Error ? error.message : "Failed to sign in",
        variant: "destructive",
      })
    } finally {
      setIsLoading(null)
    }
  }

  const handleSignIn = async (providerId: string) => {
    try {
      setIsLoading(providerId)

      const response = await fetch(`/api/auth/${providerId}`)

      if (!response.ok) {
        const error = await response.text()
        throw new Error(error || "Failed to initialize authentication")
      }

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid response from server")
      }

      const data = await response.json()

      if (!data.url) {
        throw new Error("No authentication URL received")
      }

      // Redirect to provider's OAuth page
      window.location.href = data.url
    } catch (error) {
      console.error("Authentication error:", error)
      toast({
        title: "Authentication Error",
        description: error instanceof Error ? error.message : "Failed to authenticate",
        variant: "destructive",
      })
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Välkommen tillbaka</CardTitle>
          <CardDescription>Logga in på ditt konto</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-post</Label>
              <Input
                id="email"
                type="email"
                placeholder="namn@exempel.se"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Lösenord</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={!!isLoading}>
              {isLoading === "email" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Logga in"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Eller fortsätt med</span>
            </div>
          </div>

          <div className="grid gap-4">
            {providers.map((provider) => (
              <Button
                key={provider.id}
                variant="outline"
                className="w-full"
                onClick={() => handleSignIn(provider.id)}
                disabled={!!isLoading}
              >
                {isLoading === provider.id ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <provider.icon className="mr-2 h-4 w-4" />
                )}
                Fortsätt med {provider.name}
              </Button>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Har du inget konto?{" "}
            <Link href="/auth/signup" className="text-primary underline-offset-4 hover:underline">
              Skapa konto
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}

