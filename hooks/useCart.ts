import { useCallback, useEffect, useState } from 'react';
import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

const CART_STORAGE_KEY = 'lumina-market-cart-v1';

type PersistedCartItem = {
  productId: string;
  quantity: number;
};

const getStoredCart = (): PersistedCartItem[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as PersistedCartItem[];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(
      (entry) =>
        typeof entry === 'object' &&
        typeof entry.productId === 'string' &&
        typeof entry.quantity === 'number' &&
        entry.quantity > 0
    );
  } catch (error) {
    console.warn('Unable to read cart from localStorage, resetting cart.', error);
    return [];
  }
};

const persistCart = (items: CartItem[]) => {
  if (typeof window === 'undefined') {
    return;
  }
  const serializable = items.map((item) => ({
    productId: item.product.id,
    quantity: item.quantity
  }));
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(serializable));
};

const reconcileItems = (persisted: PersistedCartItem[]): CartItem[] => {
  const productMap = new Map<string, Product>();
  for (const product of require('../data/products').products as Product[]) {
    productMap.set(product.id, product);
  }
  const hydrated: CartItem[] = [];
  for (const entry of persisted) {
    const product = productMap.get(entry.productId);
    if (product && entry.quantity > 0) {
      const quantity = Math.min(entry.quantity, product.stock);
      if (quantity > 0) {
        hydrated.push({ product, quantity });
      }
    }
  }
  return hydrated;
};

const useCart = () => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const stored = getStoredCart();
    return reconcileItems(stored);
  });

  useEffect(() => {
    persistCart(items);
  }, [items]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    if (product.stock === 0) {
      return;
    }
    setItems((previous) => {
      const existing = previous.find((item) => item.product.id === product.id);
      if (existing) {
        const desiredQuantity = Math.min(existing.quantity + quantity, product.stock);
        if (desiredQuantity === existing.quantity) {
          return previous;
        }
        return previous.map((item) =>
          item.product.id === product.id ? { ...item, quantity: desiredQuantity } : item
        );
      }
      const initialQuantity = Math.min(quantity, product.stock);
      return [...previous, { product, quantity: initialQuantity }];
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((previous) => {
      if (quantity <= 0) {
        return previous.filter((item) => item.product.id !== productId);
      }
      return previous
        .map((item) => {
          if (item.product.id !== productId) {
            return item;
          }
          const safeQuantity = Math.min(quantity, item.product.stock);
          return { ...item, quantity: safeQuantity };
        })
        .filter((item) => item.quantity > 0);
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((previous) => previous.filter((item) => item.product.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  return {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clearCart
  };
};

export default useCart;