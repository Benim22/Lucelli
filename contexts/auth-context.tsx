"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { AuthContextType, AuthState } from "@/types/auth"
import { authService } from "@/lib/auth-service"
import { useToast } from "@/components/ui/use-toast"

const initialState: AuthState = {
  isLoading: true,
  isAuthenticated: false,
  user: null,
  error: null,
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(initialState)
  const { toast } = useToast()

  useEffect(() => {
    const user = authService.getCurrentUser()
    setState({
      isLoading: false,
      isAuthenticated: !!user,
      user,
      error: null,
    })
  }, [])

  const handleAuthError = (error: Error) => {
    setState((prev) => ({ ...prev, error, isLoading: false }))
    toast({
      title: "Authentication Error",
      description: error.message,
      variant: "destructive",
    })
  }

  const signInWithProvider = async (provider: "google" | "github" | "discord") => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }))
      const user = await authService.loginWithProvider(provider)
      setState({
        isLoading: false,
        isAuthenticated: true,
        user,
        error: null,
      })
      toast({
        title: "Welcome!",
        description: "You have successfully signed in.",
      })
    } catch (error) {
      handleAuthError(error as Error)
    }
  }

  const signOut = async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }))
      await authService.logout()
      setState({
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: null,
      })
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      })
    } catch (error) {
      handleAuthError(error as Error)
    }
  }

  const value: AuthContextType = {
    ...state,
    signInWithGoogle: () => signInWithProvider("google"),
    signInWithGithub: () => signInWithProvider("github"),
    signInWithDiscord: () => signInWithProvider("discord"),
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

