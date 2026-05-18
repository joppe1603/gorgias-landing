'use client'

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'

export type CartItem = {
  slug: string
  name: string
  price: number
  image: string
  size: string
  quantity: number
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
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Restore cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lume-cart')
      if (saved) {
        const items = JSON.parse(saved) as CartItem[]
        if (Array.isArray(items) && items.length > 0) {
          dispatch({ type: 'RESTORE', payload: items })
        }
      }
    } catch {}
  }, [])

  // Persist cart to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('lume-cart', JSON.stringify(state.items))
    } catch {}
  }, [state.items])

  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{ state, dispatch, total, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
