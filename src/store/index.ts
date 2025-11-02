import { configureStore, Middleware } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import { saveCartToStorage, clearCartFromStorage } from "@/lib/storage";

// Middleware to persist cart to localStorage on every cart action
const cartPersistenceMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  // Type guard: check if action has a type property that is a string
  if (
    action &&
    typeof action === "object" &&
    "type" in action &&
    typeof action.type === "string" &&
    action.type.startsWith("cart/") &&
    action.type !== "cart/toggleCart" // Don't persist toggle actions
  ) {
    const state = store.getState();
    const cartState = state.cart;

    if (action.type === "cart/clearCart") {
      clearCartFromStorage();
    } else {
      saveCartToStorage(cartState);
    }
  }

  return result;
};

export const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartPersistenceMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
