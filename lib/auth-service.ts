import * as Realm from "realm-web"
import type { AuthUser } from "@/types/auth"

class AuthService {
  private app: Realm.App
  private credentials: {
    google: () => Realm.Credentials
    github: () => Realm.Credentials
    discord: () => Realm.Credentials
  }

  constructor() {
    if (!process.env.NEXT_PUBLIC_REALM_APP_ID) {
      throw new Error("Missing REALM_APP_ID environment variable")
    }

    this.app = new Realm.App(process.env.NEXT_PUBLIC_REALM_APP_ID)

    this.credentials = {
      google: () => Realm.Credentials.google(),
      github: () => Realm.Credentials.github(),
      discord: () => Realm.Credentials.oauth2("discord"),
    }
  }

  private mapUserData(user: Realm.User): AuthUser {
    return {
      id: user.id,
      email: user.profile.email,
      name: user.profile.name,
      pictureUrl: user.profile.pictureUrl,
      provider: user.providerType,
    }
  }

  async loginWithProvider(provider: keyof typeof this.credentials): Promise<AuthUser> {
    try {
      const credentials = this.credentials[provider]()
      const user = await this.app.logIn(credentials)
      return this.mapUserData(user)
    } catch (error) {
      console.error(`Error logging in with ${provider}:`, error)
      throw error
    }
  }

  async logout(): Promise<void> {
    try {
      if (this.app.currentUser) {
        await this.app.currentUser.logOut()
      }
    } catch (error) {
      console.error("Error logging out:", error)
      throw error
    }
  }

  getCurrentUser(): AuthUser | null {
    const user = this.app.currentUser
    return user ? this.mapUserData(user) : null
  }
}

export const authService = new AuthService()

