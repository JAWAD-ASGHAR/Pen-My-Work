"use client"
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import React from 'react'

const theme = extendTheme({
  // Your theme customizations here
  colors: {
    brand: {
      50: '#f7fafc',
      500: '#718096',
      900: '#171923',
    },
  },
  fonts: {
    heading: 'var(--font-geist-sans)',
    body: 'var(--font-geist-sans)',
  },
})

const Providers = ({children}: {children: React.ReactNode}) => {
  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  )
}

export default Providers 