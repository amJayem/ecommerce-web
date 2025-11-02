// localStorage utility for cart persistence with expiration

const CART_STORAGE_KEY = "cart";
const CART_EXPIRY_DAYS = 7;

interface StoredCartData {
  items: unknown[];
  isOpen: boolean;
  expiry: number; // timestamp
}

/**
 * Save cart data to localStorage with 7-day expiration
 */
export function saveCartToStorage(cartState: {
  items: unknown[];
  isOpen: boolean;
}): void {
  if (typeof window === "undefined") {
    // Server-side: skip localStorage
    return;
  }

  try {
    const expiry = Date.now() + CART_EXPIRY_DAYS * 24 * 60 * 60 * 1000; // 7 days from now
    const data: StoredCartData = {
      items: cartState.items,
      isOpen: cartState.isOpen,
      expiry,
    };
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
  }
}

/**
 * Load cart data from localStorage if not expired
 */
export function loadCartFromStorage(): {
  items: unknown[];
  isOpen: boolean;
} | null {
  if (typeof window === "undefined") {
    // Server-side: return null
    return null;
  }

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) {
      return null;
    }

    const data: StoredCartData = JSON.parse(stored);

    // Check if expired
    if (Date.now() > data.expiry) {
      // Expired: remove from storage and return null
      localStorage.removeItem(CART_STORAGE_KEY);
      return null;
    }

    // Return valid cart data
    return {
      items: Array.isArray(data.items) ? data.items : [],
      isOpen: data.isOpen ?? false,
    };
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
    // Clear corrupted data
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch {
      // Ignore cleanup errors
    }
    return null;
  }
}

/**
 * Clear cart data from localStorage
 */
export function clearCartFromStorage(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear cart from localStorage:", error);
  }
}
