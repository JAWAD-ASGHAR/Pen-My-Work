"use server"
import { db } from "@/src/db"
import { plans } from "@/src/db/schema"
import { eq } from "drizzle-orm"
import { auth } from "@/auth"
import { headers } from "next/headers"
import { billingData } from "@/src/config/billing-data"

export const getPlans = async () => {
    return await db.select().from(plans)
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
