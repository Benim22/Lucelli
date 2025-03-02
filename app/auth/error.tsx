"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    toast({
      title: "Authentication Error",
      description: error.message,
      variant: "destructive",
    })
  }, [error, toast])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Authentication Failed</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {error.message || "An unexpected error occurred during authentication."}
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => router.push("/auth/signin")}>Try Again</Button>
          <Button variant="outline" onClick={() => router.push("/")}>
            Go Home
          </Button>
        </div>
      </div>
    </div>
  )
}

