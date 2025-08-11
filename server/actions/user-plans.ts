"use server"
import { db } from "@/src/db"
import { plans, userPlans } from "@/src/db/schema"
import { eq } from "drizzle-orm"
import { auth } from "@/auth"
import { headers } from "next/headers"

export async function ensureUserPlan() {
    try {
      const session = await auth.api.getSession({ headers: await headers() })
      
      if (!session?.user) {
        return { error: "No authenticated user" }
      }
  
      // Check if user plan already exists
      const existingUserPlan = await db.select().from(userPlans).where(eq(userPlans.userId, session.user.id))
      
      if (existingUserPlan.length > 0) {
        console.log("User plan already exists for user:", session.user.id)
        return { success: true, message: "User plan already exists" }
      }
  
      // Create the user plan
      const result = await db.insert(userPlans).values({
        userId: session.user.id,
        planId: "@free",
      }).returning()
  
      console.log("User plan created successfully:", result)
      return { success: true, message: "User plan created", data: result }
    } catch (error) {
      console.error("Error ensuring user plan:", error)
      return { error: "Failed to create user plan" }
    }
  } 

export const getPlans = async () => {
    return await db.select().from(plans)
}

export const getUserPlan = async (userId: string) => {
    return await db.select().from(userPlans).where(eq(userPlans.userId, userId)).then(result => result[0])
}