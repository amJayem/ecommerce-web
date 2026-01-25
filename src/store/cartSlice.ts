// store/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadCartFromStorage } from "@/lib/storage";

type CartItem = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  coverImage?: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
};

// Load initial state from localStorage if available and not expired
const loadInitialState = (): CartState => {
  const stored = loadCartFromStorage();
  if (stored) {
    return {
      items: (stored.items as CartItem[]) || [],
      isOpen: false, // Always start with cart closed
    };
  }
  return {
    items: [],
    isOpen: false,
  };
};

const initialState: CartState = loadInitialState();

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    addToCart: (
      state,
      action: PayloadAction<
        Omit<CartItem, "quantity"> & { coverImage?: string }
      >
    ) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        // Map product data to cart item format
        const cartItem: Omit<CartItem, "quantity"> = {
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
          imageUrl: action.payload.imageUrl,
          coverImage: action.payload.coverImage || action.payload.imageUrl, // Use coverImage if available, fallback to imageUrl
        };
        state.items.push({ ...cartItem, quantity: 1 });
      }
      // Auto-open cart drawer when item is added
      state.isOpen = true;
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  toggleCart,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
