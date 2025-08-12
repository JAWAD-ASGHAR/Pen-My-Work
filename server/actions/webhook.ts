import { configureLemonSqueezy } from "@/src/config/lemonsqueezy"
import { plans, subscriptions } from "@/src/db/schema"
import { eq } from "drizzle-orm"
import { db } from "@/src/db"

// Add the missing getPrice function
async function getPrice(priceId: string) {
  console.log(`💰 Fetching price data for priceId: ${priceId}`)
  // This should be implemented to fetch price data from Lemon Squeezy
  // For now, returning a placeholder
  try {
    console.log(`🔍 Price lookup for: ${priceId}`)
    // You'll need to implement this based on your Lemon Squeezy setup
    // This is just a placeholder structure
    return { error: null, data: { data: { attributes: { unit_price: '0', unit_price_decimal: '0' } } } }
  } catch (error) {
    console.error(`❌ Failed to fetch price data for ${priceId}:`, error)
    return { error: 'Failed to fetch price data' }
  }
}

export async function processWebhookEvent(webhookEvent: {
  eventName: string
  body: any
}) {
  console.log(` Processing webhook event: ${webhookEvent.eventName}`)
  console.log(` Event body:`, JSON.stringify(webhookEvent.body, null, 2))
  
  configureLemonSqueezy()

  const eventBody = webhookEvent.body

  if (eventBody.meta) {
    console.log(` Event meta data:`, JSON.stringify(eventBody.meta, null, 2))
    
    if (webhookEvent.eventName.startsWith('subscription_payment_')) {
      console.log('💳 Subscription payment event detected - not implemented')
      // Save subscription invoices; eventBody is a SubscriptionInvoice
      // Not implemented.
    } else if (webhookEvent.eventName.startsWith('subscription_')) {
      console.log(' Subscription event detected - processing...')
      // Save subscription events; obj is a Subscription
      const attributes = eventBody.data.attributes
      const variantId = attributes.variant_id as string
      
      console.log(`🔍 Looking up plan with variantId: ${variantId}`)

      // We assume that the Plan table is up to date.
      const plan = await db
        .select()
        .from(plans)
        .where(eq(plans.variantId, parseInt(variantId, 10)))

      if (plan.length < 1) {
        console.error(`❌ Plan with variantId ${variantId} not found.`)
        return
      }

      console.log(`✅ Found plan:`, JSON.stringify(plan[0], null, 2))

      // Update the subscription in the database.
      const priceId = attributes.first_subscription_item.price_id
      console.log(`💰 Price ID from subscription: ${priceId}`)

      // Get the price data from Lemon Squeezy.
      const priceData = await getPrice(priceId)
      if (priceData.error) {
        console.error(`❌ Failed to get the price data for the subscription ${eventBody.data.id}.`)
        return
      }

      const isUsageBased = attributes.first_subscription_item.is_usage_based
      const price = isUsageBased
        ? priceData.data?.data.attributes.unit_price_decimal
        : priceData.data?.data.attributes.unit_price

      console.log(`💵 Price calculated: ${price} (usage-based: ${isUsageBased})`)

      const updateData: any = {
        lemonSqueezyId: eventBody.data.id,
        orderId: attributes.order_id as number,
        name: attributes.user_name as string,
        email: attributes.user_email as string,
        status: attributes.status as string,
        statusFormatted: attributes.status_formatted as string,
        renewsAt: attributes.renews_at as string,
        endsAt: attributes.ends_at as string,
        trialEndsAt: attributes.trial_ends_at as string,
        price: price?.toString() ?? '',
        isPaused: false,
        subscriptionItemId: attributes.first_subscription_item.subscription_item_id,
        isUsageBased: attributes.first_subscription_item.is_usage_based,
        userId: eventBody.meta.custom_data.user_id,
        planId: plan[0].planId,
      }

      console.log(`📝 Subscription data to upsert:`, JSON.stringify(updateData, null, 2))

      // Create/update subscription in the database.
      try {
        await db.insert(subscriptions).values(updateData).onConflictDoUpdate({
          target: subscriptions.lemonSqueezyId,
          set: updateData,
        })
        console.log(`✅ Successfully processed subscription ${updateData.lemonSqueezyId}`)
      } catch (error) {
        console.error(`❌ Failed to upsert Subscription #${updateData.lemonSqueezyId} to the database.`, error)
      }
    } else if (webhookEvent.eventName.startsWith('order_')) {
      console.log('📦 Order event detected - not implemented')
      // Save orders; eventBody is a "Order"
      /* Not implemented */
    } else if (webhookEvent.eventName.startsWith('license_')) {
      console.log('🔑 License event detected - not implemented')
      // Save license keys; eventBody is a "License key"
      /* Not implemented */
    } else {
      console.log(`⚠️ Unknown event type: ${webhookEvent.eventName}`)
    }
  } else {
    console.error('❌ No meta data found in webhook event')
  }
  
  console.log(`🏁 Finished processing webhook event: ${webhookEvent.eventName}`)
}
  