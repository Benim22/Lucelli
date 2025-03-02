import type { User as RealmUser } from "realm-web"

export interface AuthUser {
  id: string
  email?: string
  name?: string
  pictureUrl?: string
  provider?: string
}

export interface AuthState {
  isLoading: boolean
  isAuthenticated: boolean
  user: AuthUser | null
  error: Error | null
}

export interface AuthContextType extends AuthState {
  signInWithGoogle: () => Promise<void>
  signInWithGithub: () => Promise<void>
  signInWithDiscord: () => Promise<void>
  signOut: () => Promise<void>
}

export interface OAuthProvider {
  name: string
  id: string
  icon: string
}

export type RealmUserProfile = RealmUser["profile"]

export interface User {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
}

