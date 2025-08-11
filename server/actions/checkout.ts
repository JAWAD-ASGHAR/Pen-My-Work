'use server'
import { auth } from "@/auth"
import { configureLemonSqueezy } from "@/src/config/lemonsqueezy"
import { createCheckout } from "@lemonsqueezy/lemonsqueezy.js"
import { headers } from "next/headers"



export async function getCheckoutURL(variantId: number, embed = false) {
    configureLemonSqueezy()

    
    const session = await auth.api.getSession({ headers: await headers() })
    console.log(session,variantId,embed)
    if (!session?.user) {
      throw new Error('User is not authenticated.')
    }
    // import { createCheckout } from '@lemonsqueezy/lemonsqueezy.js'
    const checkout = await createCheckout(
      process.env.LEMONSQUEEZY_STORE_ID!,
      variantId,
      {
        checkoutOptions: {
          embed,
          media: false,
          logo: !embed,
        },
        checkoutData: {
          email: session.user.email ?? undefined,
          custom: {
            user_id: session.user.id,
          },
        },
        productOptions: {
          enabledVariants: [variantId],
          redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/home`,
          receiptButtonText: 'Go to Dashboard',
          receiptThankYouNote: 'Thank you for signing up to Lemon Stand!',
        },
      }
    )
  
    return checkout.data?.data.attributes.url
  }
  

// export async function getCheckoutURL(variantId: number, embed = false) {
//     configureLemonSqueezy()


//     try {
//       const checkout = await createCheckout(
//         process.env.LEMONSQUEEZY_STORE_ID!,
//         variantId,
//         {
//           checkoutOptions: {
//             embed,
//             media: false,
//             logo: !embed,
//           },
//           checkoutData: {
//             email: session.user.email ?? undefined,
//             custom: {
//               user_id: session.user.id,
//             },
//           },
//           productOptions: {
//             enabledVariants: [variantId],
//             redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/home`,
//             receiptButtonText: 'Go to Dashboard',
//             receiptThankYouNote: 'Thank you for signing up to Pen My Work!',
//           },
//         }
//       )
//       console.log(checkout.data)
//       if (checkout.data?.data?.attributes?.url) {
//         return checkout.data.data.attributes.url
//       } else {
//         throw new Error('Failed to create checkout URL')
//       }
//     } catch (error) {
//       console.error('Checkout creation error:', error)
//       throw new Error('Failed to create checkout. Please try again.')
//     }
//   }
  