'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@chakra-ui/react'
import { getCheckoutURL } from '@/server/actions/checkout'

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
        router.push('/home')
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
      mt={3}
      isLoading={loading}
      loadingText="Processing..."
      onClick={handleClick}
      bg={plan.price === "0" ? "black" : "#FF6A00"}
      color={"white"}
      _hover={{
        opacity: 0.8,
      }}
      h={12}
      borderRadius="xl"
      fontWeight="semibold"
      fontSize="lg"
      w="full"
    >
      {buttonText}
    </Button>
  )
}
