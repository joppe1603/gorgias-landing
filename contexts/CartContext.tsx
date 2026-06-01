'use client'

import { createContext, useContext, useReducer, useEffect, useState, ReactNode } from 'react'
import { createShopifyCheckout } from '@/lib/shopify'

export type CartItem = {
  slug: string
  name: string
  price: number
  image: string
  size: string
  quantity: number
  shopifyVariantId?: string
  subscription?: boolean
}

type CartState = {
  items: CartItem[]
  isOpen: boolean
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QTY'; payload: { slug: string; qty: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'RESTORE'; payload: CartItem[] }
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'TOGGLE' }

const initialState: CartState = { items: [], isOpen: false }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.slug === action.payload.slug)
      if (existing) {
        return {
          ...state,
          isOpen: true,
          items: state.items.map((i) =>
            i.slug === action.payload.slug ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }
      }
      return {
        ...state,
        isOpen: true,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.slug !== action.payload) }
    case 'UPDATE_QTY':
      if (action.payload.qty <= 0) {
        return { ...state, items: state.items.filter((i) => i.slug !== action.payload.slug) }
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.slug === action.payload.slug ? { ...i, quantity: action.payload.qty } : i
        ),
      }
    case 'CLEAR_CART':
      return { ...state, items: [], isOpen: false }
    case 'RESTORE':
      return { ...state, items: action.payload }
    case 'OPEN':
      return { ...state, isOpen: true }
    case 'CLOSE':
      return { ...state, isOpen: false }
    case 'TOGGLE':
      return { ...state, isOpen: !state.isOpen }
    default:
      return state
  }
}

type CartContextType = {
  state: CartState
  dispatch: React.Dispatch<CartAction>
  total: number
  itemCount: number
  initiateCheckout: () => Promise<void>
  isCheckingOut: boolean
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  // Restore cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('mauyi-cart')
      if (saved) {
        const items = JSON.parse(saved) as CartItem[]
        if (Array.isArray(items) && items.length > 0) {
          // Drop stale items that predate Shopify integration (no variantId)
          const valid = items.filter((i) => i.shopifyVariantId)
          if (valid.length > 0) {
            dispatch({ type: 'RESTORE', payload: valid })
          } else {
            localStorage.removeItem('mauyi-cart')
          }
        }
      }
    } catch {}
  }, [])

  // Persist cart to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('mauyi-cart', JSON.stringify(state.items))
    } catch {}
  }, [state.items])

  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)

  async function initiateCheckout() {
    const lines = state.items
      .filter((item) => item.shopifyVariantId)
      .map((item) => ({
        merchandiseId: item.shopifyVariantId!,
        quantity: item.quantity,
      }))

    if (lines.length === 0) {
      // Cart items missing variantId — likely stale localStorage. Clear and reload.
      localStorage.removeItem('mauyi-cart')
      window.location.reload()
      return
    }

    setIsCheckingOut(true)
    try {
      const checkoutUrl = await createShopifyCheckout(lines)
      // Use anchor click for reliable navigation on iOS Safari
      const a = document.createElement('a')
      a.href = checkoutUrl
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch (err) {
      console.error('Shopify checkout error:', err)
      setIsCheckingOut(false)
    }
  }

  return (
    <CartContext.Provider value={{ state, dispatch, total, itemCount, initiateCheckout, isCheckingOut }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
