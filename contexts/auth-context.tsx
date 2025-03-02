"use client"

import { SessionProvider, useSession } from "next-auth/react"
import { type ReactNode, createContext, useContext } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  user: any | null
  isLoading: boolean
  error: Error | null
  signIn: (provider: string) => Promise<void>
  signOut: () => Promise<void>
}

const defaultContext: AuthContextType = {
  isAuthenticated: false,
  user: null,
  isLoading: true,
  error: null,
  signIn: async () => {},
  signOut: async () => {},
}

export const AuthContext = createContext<AuthContextType>(defaultContext)

export function AuthProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}

export const useAuthContext = () => useContext(AuthContext)

export function useAuth() {
  const session = useSession()

  const signIn = async (provider: string) => {
    window.location.href = `/api/auth/${provider}`
  }

  const signOut = async () => {
    await fetch("/api/auth/signout", { method: "POST" })
    window.location.reload()
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

