"use server"
import { db } from "@/src/db"
import { plans, userPlans } from "@/src/db/schema"
import { eq } from "drizzle-orm"
import { auth } from "@/auth"
import { headers } from "next/headers"
import { billingData } from "@/src/config/billing-data"

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
  
      // Create the user plan with correct plan ID
      const result = await db.insert(userPlans).values({
        userId: session.user.id,
        planId: "free", // Use "free" instead of "@free"
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

export async function syncPlans() {
  console.log("Starting plan sync from billing data...")

  try {
    // Clear existing plans
    await db.delete(plans)
    console.log("Cleared existing plans")

    // Insert plans from billing data
    for (const plan of billingData.plans) {
      await db.insert(plans).values({
        planId: plan.planId,
        name: plan.name,
        description: plan.description,
        price: plan.price,
        productId: plan.productId,
        productName: plan.productName,
        variantId: plan.variantId, 
        interval: plan.interval,
        intervalCount: plan.intervalCount,
        isUsageBased: plan.isUsageBased,
        trialInterval: plan.trialInterval,
        trialIntervalCount: plan.trialIntervalCount,
        sort: plan.sort,
        features: plan.features,
        limitations: plan.limitations,
      })
      console.log(`Synced plan: ${plan.name}`)
    }

    console.log("All plans synced successfully")
    return billingData.plans
  } catch (error) {
    console.error("Error syncing plans:", error)
    throw error
  }
}
