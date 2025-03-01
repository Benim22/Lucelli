"use client"

import { useEffect } from "react"
import { Button } from "./ui/button"

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Något gick fel</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {error.message || "Ett oväntat fel uppstod. Försök igen senare."}
        </p>
        <Button onClick={reset}>Försök igen</Button>
      </div>
    </div>
  )
}

