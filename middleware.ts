import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { db } from "@/lib/db"
import { sessions } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function middleware(request: NextRequest) {
  try {
    // Add security headers
    const headers = new Headers(request.headers)
    const response = NextResponse.next({ request: { headers } })

    // Add security headers
    response.headers.set("X-Content-Type-Options", "nosniff")
    response.headers.set("X-Frame-Options", "DENY")
    response.headers.set("X-XSS-Protection", "1; mode=block")
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")

    // Check session for protected routes
    if (request.nextUrl.pathname.startsWith("/api/auth") || request.nextUrl.pathname.startsWith("/auth")) {
      return response
    }

    const sessionId = request.cookies.get("session_id")?.value

    if (sessionId) {
      const session = await db.query.sessions.findFirst({
        where: eq(sessions.id, sessionId),
      })

      if (!session || session.expiresAt < new Date()) {
        request.cookies.delete("session_id")
        return NextResponse.redirect(new URL("/auth/signin", request.url))
      }
    }

    return response
  } catch (error) {
    console.error("Middleware error:", error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
}

