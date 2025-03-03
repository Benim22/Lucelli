"use client"

import { SessionProvider } from "next-auth/react"
import { type ReactNode, createContext, useContext, useState, useEffect } from "react"
import { useSession } from "next-auth/react"

export function AuthProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}

export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  error: null,
  signIn: (provider: string) => Promise.resolve(),
  signOut: () => Promise.resolve(),
})

export const useAuthContext = () => useContext(AuthContext)

export const useAuth = () => {
  const [mounted, setMounted] = useState(false)
  const session = useSession()

  useEffect(() => {
    setMounted(true)
  }, [])

  const signIn = async (provider: string) => {
    window.location.href = `/api/auth/${provider}`
  }

  const signOut = async () => {
    await fetch("/api/auth/signout", { method: "POST" })
    window.location.reload()
  }

  // During SSR or before mounting, return default values
  if (!mounted) {
    return {
      isAuthenticated: false,
      user: null,
      isLoading: true,
      error: null,
      signIn,
      signOut,
    }
  }

  return {
    isAuthenticated: !!session.data?.user,
    user: session.data?.user || null,
    isLoading: session.status === "loading",
    error: null,
    signIn,
    signOut,
  }
}

