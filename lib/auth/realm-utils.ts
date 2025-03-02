import { app } from "./stack-auth"
import type { User as RealmUser } from "realm-web"
import type { AuthUser } from "@/types/auth"

export async function getRealmUser(): Promise<RealmUser | null> {
  try {
    // Get current user
    const user = app.currentUser

    if (!user) {
      return null
    }

    // Refresh custom data if needed
    if (user.customData) {
      await user.refreshCustomData()
    }

    return user
  } catch (error) {
    console.error("Error getting Realm user:", error)
    return null
  }
}

export function mapRealmUserToAuthUser(realmUser: RealmUser): AuthUser {
  return {
    id: realmUser.id,
    email: realmUser.profile.email,
    name: realmUser.profile.name || realmUser.profile.email?.split("@")[0],
    pictureUrl: realmUser.profile.pictureUrl,
    provider: realmUser.providerType,
  }
}

