import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

type CartState = {
  isOpen: boolean
  items: CartItem[]
}

const initialState: CartState = {
  isOpen: false,
  items: []
}

export const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart(state) {
      state.isOpen = !state.isOpen
    },
    addToCart(state, action: PayloadAction<CartItem>) {
      const existing = state.items.find((item) => item.id === action.payload.id)
      if (existing) {
        existing.quantity += action.payload.quantity
      } else {
        state.items.push(action.payload)
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    clearCart(state) {
      state.items = []
    }
  }
})

export const { toggleCart, addToCart, removeFromCart, clearCart } =
  cartReducer.actions
export default cartReducer.reducer
