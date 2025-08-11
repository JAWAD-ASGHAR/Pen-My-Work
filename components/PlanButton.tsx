'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@chakra-ui/react'
import { getCheckoutURL } from '@/server/actions/checkout'
import { ensureUserPlan } from '@/server/actions/user-plans'

interface PlanButtonProps {
  plan: {
    planId: string
    name: string
    price: string
    variantId?: number
  }
}

export function PlanButton({ plan }: PlanButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)

    try {
      if (plan.price === "0") {
        // Free plan - ensure user plan and redirect to dashboard
        const result = await ensureUserPlan()
        if (result.success) {
          router.push('/home')
        } else {
          // If not authenticated, redirect to sign-in
          router.push('/sign-in')
        }
      } else {
        // Paid plan - try to create checkout
        if (!plan.variantId) {
          throw new Error('Variant ID is required for paid plans')
        }

        try {
          const checkoutUrl = await getCheckoutURL(plan.variantId, true)
          if (checkoutUrl) {
            // Open Lemon Squeezy modal
            if (typeof window !== 'undefined' && window.LemonSqueezy?.Url?.Open) {
              window.LemonSqueezy.Url.Open(checkoutUrl)
            } else {
              // Fallback to redirect
              router.push(checkoutUrl)
            }
          }
        } catch (checkoutError) {
          // If checkout fails due to authentication, redirect to sign-in
          if (checkoutError instanceof Error && checkoutError.message.includes('not authenticated')) {
            router.push('/sign-in')
          } else {
            console.error('Checkout error:', checkoutError)
            // Handle other checkout errors
          }
        }
      }
    } catch (error) {
      console.error('Error handling plan selection:', error)
      // Redirect to sign-in for any other errors
      router.push('/sign-in')
    } finally {
      setLoading(false)
    }
  }

  const buttonText = plan.price === "0" ? "Get Started Free" : "Start Pro Trial"

  return (
    <Button
      isLoading={loading}
      loadingText="Processing..."
      onClick={handleClick}
      bg={plan.price === "0" ? "transparent" : "#FF6A00"}
      color={plan.price === "0" ? "#FF6A00" : "white"}
      border={plan.price === "0" ? "2px solid #FF6A00" : "none"}
      _hover={{
        bg: plan.price === "0" ? "orange.50" : "#FF8A33",
      }}
      h={14}
      borderRadius="full"
      fontWeight="semibold"
      fontSize="lg"
      w="full"
    >
      {buttonText}
    </Button>
  )
}
