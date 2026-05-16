'use client'

import { CartProvider } from '@/contexts/CartContext'
import SlideCart from '@/components/SlideCart'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <SlideCart />
    </CartProvider>
  )
}
