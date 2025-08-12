import crypto from 'node:crypto'
import { processWebhookEvent } from '@/server/actions/webhook'

// Type guard to check if the object has a 'meta' property
function webhookHasMeta(data: unknown): data is { meta: { event_name: string; custom_data?: { user_id: string } } } {
  return typeof data === 'object' && data !== null && 'meta' in data
}

export async function POST(request: Request) {
  console.log('🔗 Webhook received - Starting processing...')
  
  if (!process.env.LEMONSQUEEZY_WEBHOOK_SECRET) {
    console.error('❌ Lemon Squeezy Webhook Secret not set in .env')
    return new Response('Lemon Squeezy Webhook Secret not set in .env', {
      status: 500,
    })
  }

  // First, make sure the request is from Lemon Squeezy.
  const rawBody = await request.text()
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET

  console.log('🔐 Verifying webhook signature...')

  const hmac = crypto.createHmac('sha256', secret)
  const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8')
  const signature = Buffer.from(
    request.headers.get('X-Signature') || '',
    'utf8'
  )

  if (!crypto.timingSafeEqual(digest, signature)) {
    console.error('❌ Invalid webhook signature - rejecting request')
    throw new Error('Invalid signature.')
  }

  console.log('✅ Webhook signature verified successfully')

  const data = JSON.parse(rawBody) as unknown
  console.log('📦 Parsed webhook data:', JSON.stringify(data, null, 2))

  // Type guard to check if the object has a 'meta' property.
  if (webhookHasMeta(data)) {
    console.log(`🔄 Processing webhook event: ${data.meta.event_name}`)
    
    // Process the webhook event directly without storing it
    try {
      await processWebhookEvent({
        eventName: data.meta.event_name,
        body: data
      })
      console.log('✅ Webhook event processed successfully')
    } catch (error) {
      console.error('❌ Error processing webhook event:', error)
      return new Response('Internal Server Error', { status: 500 })
    }

    return new Response('OK', { status: 200 })
  }

  console.error('❌ Invalid webhook data structure - missing meta property')
  return new Response('Data invalid', { status: 400 })
}
