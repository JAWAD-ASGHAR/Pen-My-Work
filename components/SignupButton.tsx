'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@chakra-ui/react'
import { getCheckoutURL } from '@/server/actions/checkout'

interface Plan {
  planId: string
  name: string
  price: string
  variantId?: number
}

interface SignupButtonProps {
  plan: Plan
  currentPlan?: Plan
  embed?: boolean
}

export function SignupButton({ plan, currentPlan, embed = true }: SignupButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const isCurrent = plan.planId === currentPlan?.planId

  const label = isCurrent ? 'Your plan' : plan.price === "0" ? 'Get Started Free' : 'Start Pro Trial'

  // Make sure Lemon.js is loaded
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.createLemonSqueezy === 'function') {
      window.createLemonSqueezy()
    }
  }, [])

  const handleClick = async () => {
    if (isCurrent) return

    setLoading(true)

    try {
      if (plan.price === "0") {
        router.push('/home')
      } else {
        // Handle pro plan - create checkout
        if (!plan.variantId) {
          throw new Error('Variant ID is required for paid plans')
        }

        const checkoutUrl = await getCheckoutURL(plan.variantId, embed)
        
        if (embed && checkoutUrl) {
          // Open Lemon Squeezy modal
          if (typeof window !== 'undefined' && window.LemonSqueezy?.Url?.Open) {
            window.LemonSqueezy.Url.Open(checkoutUrl)
          } else {
            // Fallback to redirect
            router.push(checkoutUrl)
          }
        } else if (checkoutUrl) {
          // Redirect to checkout
          router.push(checkoutUrl)
        }
      }
    } catch (error) {
      console.error('Error handling plan selection:', error)
      // You might want to show a toast notification here
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      isLoading={loading}
      loadingText="Processing..."
      disabled={loading || isCurrent}
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
      {label}
    </Button>
  )
}
