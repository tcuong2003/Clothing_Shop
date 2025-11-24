// hooks/useCart.ts
import { useState, useEffect, useCallback } from "react";

export interface CartItem {
  id: string | number;
  title: string;
  price: number;
  discountPercentage?: number;
  thumbnail?: string;
  images?: string[];
  quantity: number;
}

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("console_token");
    const user = localStorage.getItem("user");
    
    if (token && user) {
      try {
        const userData = JSON.parse(user);
        setIsLoggedIn(true);
        const currentUserId = userData.id?.toString() || null;
        setUserId(currentUserId);
        const items = getCartItems(currentUserId);
        setCartItems(items);
      } catch (error) {
        console.error("Error parsing user:", error);
      }
    } else {
      setIsLoggedIn(false);
      setUserId(null);
    }
  }, []);

  const getCartItems = (userIdParam?: string | null): CartItem[] => {
    try {
      const effectiveUserId = userIdParam || userId;
      if (!effectiveUserId) return [];
      
      const cartKey = `cart_${effectiveUserId}`;
      const cartStr = localStorage.getItem(cartKey);
      return cartStr ? JSON.parse(cartStr) : [];
    } catch (error) {
      console.error("Error parsing cart:", error);
      return [];
    }
  };

  // Hàm helper để lưu giỏ hàng và phát đi tín hiệu
  const saveCartAndNotify = useCallback((newItems: CartItem[]) => {
      if (!userId) return;
      const cartKey = `cart_${userId}`;
      localStorage.setItem(cartKey, JSON.stringify(newItems));
      setCartItems(newItems);
      
      // Bắn ra sự kiện để các hook khác (như useHeader) có thể lắng nghe
      window.dispatchEvent(new Event("cart_updated"));
    }, [userId]);


  const addToCart = (product: Omit<CartItem, "quantity">, quantity: number = 1) => {
    if (!isLoggedIn || !userId) return null;

    const items = getCartItems();
    const existingIndex = items.findIndex((item) => item.id.toString() === product.id.toString());

    let newItems: CartItem[];
    if (existingIndex !== -1) {
      newItems = items.map((item, index) =>
        index === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
      );
    } else {
      newItems = [...items, { ...product, quantity }];
    }
    
    saveCartAndNotify(newItems); // Sử dụng hàm mới
    return newItems;
  };

  const removeFromCart = (productId: string | number) => {
    const items = getCartItems();
    const newItems = items.filter((item) => item.id.toString() !== productId.toString());
    saveCartAndNotify(newItems); // Sử dụng hàm mới
  };

  const updateQuantity = (productId: string | number, quantity: number) => {
    const items = getCartItems();
    const newItems = items.map((item) =>
      item.id.toString() === productId.toString()
        ? { ...item, quantity: Math.max(1, quantity) }
        : item
    );
    saveCartAndNotify(newItems); // Sử dụng hàm mới
  };

  const clearCart = () => {
    saveCartAndNotify([]); // Sử dụng hàm mới
  };

  const getCartItemCount = (): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = (): number => {
    return cartItems.reduce((total, item) => {
      const price = item.price * (1 - (item.discountPercentage || 0) / 100);
      return total + price * item.quantity;
    }, 0);
  };

  return {
    cartItems,
    isLoggedIn,
    userId,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemCount,
    getCartTotal,
  };
}