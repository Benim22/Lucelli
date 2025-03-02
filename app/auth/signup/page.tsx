"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Github, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"

const providers = [
  {
    name: "Google",
    id: "google",
    icon: "/google.svg",
  },
  {
    name: "GitHub",
    id: "github",
    icon: Github,
  },
] as const

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading("email")

    try {
      // Validate password length
      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long")
      }

      // Make the API request
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      // Check content type before parsing JSON
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid response from server")
      }

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Registration failed")
      }

      if (data.success) {
        toast({
          title: "Success",
          description: data.message || "Your account has been created successfully",
        })

        // Redirect to sign in page after successful registration
        router.push("/auth/signin")
      } else {
        throw new Error(data.error || "Registration failed")
      }
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Registration Error",
        description: error instanceof Error ? error.message : "Failed to create account",
        variant: "destructive",
      })
    } finally {
      setIsLoading(null)
    }
  }

  const handleOAuthSignUp = async (providerId: string) => {
    try {
      setIsLoading(providerId)

      const response = await fetch(`/api/auth/${providerId}`)

      // Check content type before parsing JSON
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid response from server")
      }

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed")
      }

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error("Authentication failed")
      }
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
          <CardTitle className="text-2xl">Skapa konto</CardTitle>
          <CardDescription>Välkommen till Lucelli. Skapa ditt konto nedan.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Namn</Label>
              <Input id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
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
                minLength={8}
              />
            </div>
            <Button type="submit" className="w-full" disabled={!!isLoading}>
              {isLoading === "email" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Skapa konto"}
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
                onClick={() => handleOAuthSignUp(provider.id)}
                disabled={!!isLoading}
              >
                {isLoading === provider.id ? (
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
                Fortsätt med {provider.name}
              </Button>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Har du redan ett konto?{" "}
            <Link href="/auth/signin" className="text-primary underline-offset-4 hover:underline">
              Logga in
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}

