import crypto from 'node:crypto'
import { processWebhookEvent } from '@/server/actions/webhook'

// Type guard to check if the object has a 'meta' property
function webhookHasMeta(data: unknown): data is { meta: { event_name: string; custom_data?: { user_id: string } } } {
  return typeof data === 'object' && data !== null && 'meta' in data
}

export async function POST(request: Request) {
  if (!process.env.LEMONSQUEEZY_WEBHOOK_SECRET) {
    return new Response('Lemon Squeezy Webhook Secret not set in .env', {
      status: 500,
    })
  }

  // First, make sure the request is from Lemon Squeezy.
  const rawBody = await request.text()
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET

  const hmac = crypto.createHmac('sha256', secret)
  const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8')
  const signature = Buffer.from(
    request.headers.get('X-Signature') || '',
    'utf8'
  )

  if (!crypto.timingSafeEqual(digest, signature)) {
    throw new Error('Invalid signature.')
  }

  const data = JSON.parse(rawBody) as unknown

  // Type guard to check if the object has a 'meta' property.
  if (webhookHasMeta(data)) {
    // Process the webhook event directly without storing it
    void processWebhookEvent({
      eventName: data.meta.event_name,
      body: data
    })

    return new Response('OK', { status: 200 })
  }

  return new Response('Data invalid', { status: 400 })
}
