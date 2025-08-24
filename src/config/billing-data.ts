export const billingData = {
  plans: [
    {
      planId: "free",
      name: "Free Plan",
      description: "Perfect for getting started with handwritten content.",
      price: "0",
      productId: null,
      productName: "Free Plan",
      variantId: null,
      interval: null,
      intervalCount: null,
      isUsageBased: false,
      trialInterval: null,
      trialIntervalCount: null,
      sort: 1,
      features: [
        "10 handwritten pages trial",
        "Basic handwriting styles",
        "Standard paper types",
        "Email support",
        "720p image quality"
      ],
      limitations: [
        "Limited to 100 words per page",
        // "Watermark on downloads",
        "No priority support"
      ],
      metadata: {
        tier: "free",
        is_active: true
      }
    },
    {
      planId: "pro",
      name: "Pro Plan", 
      description: "Unlimited handwritten pages with premium features.",
      price: "500",
      productId: 615795,
      productName: "Pro Plan",
      variantId: 962430,
      interval: "month",
      intervalCount: 1,
      isUsageBased: false,
      trialInterval: null,
      trialIntervalCount: null,
      sort: 2,
      features: [
        "Unlimited handwritten pages",
        "All handwriting styles",
        "All paper types",
        "Priority email support",
        "1080p HD image quality",
        "Bulk processing (up to 10 pages)",
        "Custom ink colors",
        "No watermarks"
      ],
      limitations: [],
      metadata: {
        tier: "pro",
        is_active: true
      }
    }
  ]
}