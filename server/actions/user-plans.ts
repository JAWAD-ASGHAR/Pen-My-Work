"use server"
import { db } from "@/src/db"
import { plans, subscriptions } from "@/src/db/schema"
import { eq } from "drizzle-orm"
import { auth } from "@/auth"
import { headers } from "next/headers"
import { billingData } from "@/src/config/billing-data"
import { cancelSub, pauseUserSubscription, unpauseUserSubscription, getSubscriptionURLs } from "./subscription"

export const getPlans = async () => {
    return await db.select().from(plans)
}

// Get current user's subscription
export async function getCurrentUserSubscription() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user?.id) {
    throw new Error('User not authenticated')
  }

  const userSubscription = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, session.user.id))
    .limit(1)

  return userSubscription[0] || null
}

// Get current user's plan details
export async function getCurrentUserPlanAndSubscription() {
  const subscription = await getCurrentUserSubscription()
  
  if (!subscription) {
    // Return free plan if no subscription
    return { plan: billingData.plans.find(plan => plan.planId === "free"), subscription: null }
  }

  // Check if subscription is active
  const isActive = subscription.status === "active" && 
                   (!subscription.endsAt || new Date(subscription.endsAt) > new Date())

  if (!isActive) {
    // Treat cancelled/expired subscriptions as free plan
    return { plan: billingData.plans.find(plan => plan.planId === "free"), subscription: subscription }
  }

  // Get plan details from database for active subscription
  const plan = await db
    .select()
    .from(plans)
    .where(eq(plans.planId, subscription.planId))
    .limit(1)

  return { plan: plan[0] || billingData.plans.find(plan => plan.planId === "free"), subscription: subscription }
}

// Cancel user subscription
export async function cancelUserSubscription() {
  const subscription = await getCurrentUserSubscription()
  if (!subscription) {
    throw new Error('No active subscription found')
  }

  return await cancelSub(subscription.lemonSqueezyId)
}

// Pause user subscription
export async function pauseSubscription() {
  const subscription = await getCurrentUserSubscription()
  if (!subscription) {
    throw new Error('No active subscription found')
  }

  return await pauseUserSubscription(subscription.lemonSqueezyId)
}

// Unpause user subscription
export async function unpauseSubscription() {
  const subscription = await getCurrentUserSubscription()
  if (!subscription) {
    throw new Error('No active subscription found')
  }

  return await unpauseUserSubscription(subscription.lemonSqueezyId)
}

// Get subscription management URLs
export async function getSubscriptionManagementURLs() {
  const subscription = await getCurrentUserSubscription()
  if (!subscription) {
    throw new Error('No active subscription found')
  }

  return await getSubscriptionURLs(subscription.lemonSqueezyId)
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
