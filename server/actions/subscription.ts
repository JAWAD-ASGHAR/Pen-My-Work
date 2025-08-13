import { configureLemonSqueezy } from "@/src/config/lemonsqueezy"
import { cancelSubscription, getSubscription, updateSubscription } from "@lemonsqueezy/lemonsqueezy.js"
import { db } from "@/src/db"
import { subscriptions } from "@/src/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { headers } from "next/headers"

// Get user subscription (users can only have one subscription)
async function getUserSubscriptions() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user?.id) {
    throw new Error('User not authenticated')
  }
  
  return await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, session.user.id))
}

/**
 * This action will cancel a subscription on Lemon Squeezy.
 */
export async function cancelSub(id: string) {
    configureLemonSqueezy()
  
    // Get user subscriptions
    const userSubscriptions = await getUserSubscriptions()
  
    // Check if the subscription exists
    const subscription = userSubscriptions.find(
      (sub) => sub.lemonSqueezyId === id
    )
  
    if (!subscription) {
      throw new Error(`Subscription #${id} not found.`)
    }
  
    const cancelledSub = await cancelSubscription(id)
  
    if (cancelledSub.error) {
      throw new Error(cancelledSub.error.message)
    }
  
    // Update the db
    try {
      await db
        .update(subscriptions)
        .set({
          status: cancelledSub.data?.data.attributes.status,
          statusFormatted: cancelledSub.data?.data.attributes.status_formatted,
          endsAt: cancelledSub.data?.data.attributes.ends_at,
        })
        .where(eq(subscriptions.lemonSqueezyId, id))
    } catch (error) {
      throw new Error(`Failed to cancel Subscription #${id} in the database.`)
    }
  
    revalidatePath('/')
  
    return cancelledSub
  }
  
  /**
   * This action will pause a subscription on Lemon Squeezy.
   */
  export async function pauseUserSubscription(id: string) {
    configureLemonSqueezy()
  
    // Get user subscriptions
    const userSubscriptions = await getUserSubscriptions()
  
    // Check if the subscription exists
    const subscription = userSubscriptions.find(
      (sub) => sub.lemonSqueezyId === id
    )
  
    if (!subscription) {
      throw new Error(`Subscription #${id} not found.`)
    }
  
    const returnedSub = await updateSubscription(id, {
      pause: {
        mode: 'void',
      },
    })
  
    // Update the db
    try {
      await db
        .update(subscriptions)
        .set({
          status: returnedSub.data?.data.attributes.status,
          statusFormatted: returnedSub.data?.data.attributes.status_formatted,
          endsAt: returnedSub.data?.data.attributes.ends_at,
          isPaused: returnedSub.data?.data.attributes.pause !== null,
        })
        .where(eq(subscriptions.lemonSqueezyId, id))
    } catch (error) {
      throw new Error(`Failed to pause Subscription #${id} in the database.`)
    }
  
    revalidatePath('/')
  
    return returnedSub
  }
  
  /**
   * This action will unpause a subscription on Lemon Squeezy.
   */
  export async function unpauseUserSubscription(id: string) {
    configureLemonSqueezy()
  
    // Get user subscriptions
    const userSubscriptions = await getUserSubscriptions()
  
    // Check if the subscription exists
    const subscription = userSubscriptions.find(
      (sub) => sub.lemonSqueezyId === id
    )
  
    if (!subscription) {
      throw new Error(`Subscription #${id} not found.`)
    }
  
    const returnedSub = await updateSubscription(id, {
      pause: null,
    })
  
    // Update the db
    try {
      await db
        .update(subscriptions)
        .set({
          status: returnedSub.data?.data.attributes.status,
          statusFormatted: returnedSub.data?.data.attributes.status_formatted,
          endsAt: returnedSub.data?.data.attributes.ends_at,
          isPaused: returnedSub.data?.data.attributes.pause !== null,
        })
        .where(eq(subscriptions.lemonSqueezyId, id))
    } catch (error) {
      throw new Error(`Failed to pause Subscription #${id} in the database.`)
    }
  
    revalidatePath('/')
  
    return returnedSub
  }
  
  /**
   * This action will get the subscription URLs (including `update_payment_method` for the given subscription ID.)
   *
   */
  export async function getSubscriptionURLs(id: string) {
    configureLemonSqueezy()
    const subscription = await getSubscription(id)
  
    if (subscription.error) {
      throw new Error(subscription.error.message)
    }
  
    return subscription.data?.data.attributes.urls
  }
  