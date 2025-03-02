"use client"

import { create } from "zustand"

interface User {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  isLoading: boolean
  error: Error | null
  signIn: (provider: string) => Promise<void>
  signOut: () => Promise<void>
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  error: null,
  signIn: async (provider: string) => {
    try {
      set({ isLoading: true, error: null })
      const response = await fetch(`/api/auth/${provider}`)

      if (!response.ok) {
        throw new Error("Authentication failed")
      }

      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      set({ error: error as Error, isLoading: false })
    }
  },
  signOut: async () => {
    try {
      set({ isLoading: true, error: null })
      await fetch("/api/auth/signout", { method: "POST" })
      set({ isAuthenticated: false, user: null, isLoading: false })
    } catch (error) {
      set({ error: error as Error, isLoading: false })
    }
  },
}))

