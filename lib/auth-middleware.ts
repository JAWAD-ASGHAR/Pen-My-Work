import { auth } from "@/auth"
import { headers } from "next/headers"

export type AuthenticatedUser = {
  id: string
  email: string
}

export async function getAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user) {
      return null
    }
    return {
      id: session.user.id,
      email: session.user.email || '',
    }
  } catch (error) {
    console.error('Auth error:', error)
    return null
  }
}

export function withAuth<TArgs extends unknown[], TReturn>(
  handler: (user: AuthenticatedUser, ...args: TArgs) => Promise<TReturn>
) {
  return async (...args: TArgs): Promise<TReturn | { error: string }> => {
    const user = await getAuthenticatedUser()
    if (!user) {
      return { error: "Unauthorized" }
    }
    return handler(user, ...args)
  }
}

export function protectedAction<TArgs extends unknown[], TReturn>(
  action: (user: AuthenticatedUser, ...args: TArgs) => Promise<TReturn>
) {
  return withAuth(action)
} 