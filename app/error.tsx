"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Application Error:", error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        <Button onClick={reset}>Try Again</Button>
      </div>
    </div>
  )
}

