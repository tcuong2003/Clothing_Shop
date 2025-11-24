// hooks/useHeader.ts
import { useState, useEffect, useCallback } from "react";
import { CartItem } from "./useCart"; // Chỉ cần import type
import { FavoriteProduct } from "./useFavorite"; // Chỉ cần import type

// Định nghĩa kiểu dữ liệu cho user
interface User {
  id: number;
  firstName: string;
  image: string;
}

export function useHeader() {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Hàm để tải TẤT CẢ dữ liệu liên quan từ localStorage.
  // Dùng useCallback để đảm bảo hàm không bị tạo lại mỗi lần render.
  const loadDataFromStorage = useCallback(() => {
    const storedUserStr = localStorage.getItem("user");
    if (storedUserStr && storedUserStr !== "undefined") {
      try {
        const parsedUser: User = JSON.parse(storedUserStr);
        setUser(parsedUser);

        // Tải danh sách yêu thích
        const favoritesKey = `favorites_${parsedUser.id}`;
        const storedFavorites = localStorage.getItem(favoritesKey);
        setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);

        // Tải giỏ hàng
        const cartKey = `cart_${parsedUser.id}`;
        const storedCart = localStorage.getItem(cartKey);
        setCartItems(storedCart ? JSON.parse(storedCart) : []);

      } catch (err) {
        console.error("Lỗi khi đọc dữ liệu từ localStorage trong useHeader:", err);
        setUser(null);
        setFavorites([]);
        setCartItems([]);
      }
    } else {
        // Nếu không có user, xóa hết dữ liệu
        setUser(null);
        setFavorites([]);
        setCartItems([]);
    }
  }, []);

  // Effect chạy 1 lần khi hook được mount
  useEffect(() => {
    // Tải dữ liệu lần đầu tiên
    loadDataFromStorage();

    // Đăng ký lắng nghe các sự kiện. Khi sự kiện được phát, gọi hàm loadDataFromStorage
    window.addEventListener("cart_updated", loadDataFromStorage);
    window.addEventListener("favorites_updated", loadDataFromStorage);
    window.addEventListener("user_logged_in", loadDataFromStorage); // Bonus: Lắng nghe cả sự kiện đăng nhập

    // QUAN TRỌNG: Dọn dẹp listener khi component/hook unmount để tránh rò rỉ bộ nhớ
    return () => {
      window.removeEventListener("cart_updated", loadDataFromStorage);
      window.removeEventListener("favorites_updated", loadDataFromStorage);
      window.removeEventListener("user_logged_in", loadDataFromStorage);
    };
  }, [loadDataFromStorage]); // Dependency là hàm loadDataFromStorage

  // Hàm đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("console_token");
    localStorage.removeItem("user");
    // Sau khi logout, gọi hàm load lại để xóa dữ liệu trên UI ngay lập tức
    loadDataFromStorage(); 
    window.location.href = "/";
  };

  // Các hàm này được định nghĩa lại ở đây để Header có thể tự xóa item
  // và phát tín hiệu cho chính nó và các hook khác.
  const handleRemoveFavorite = (productId: string | number) => {
    if (!user) return;
    const updatedFavorites = favorites.filter((item) => item.id !== productId);
    const favoritesKey = `favorites_${user.id}`;
    localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
    // Phát tín hiệu
    window.dispatchEvent(new Event("favorites_updated"));
  };
  
  const handleRemoveFromCart = (productId: string | number) => {
    if (!user) return;
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    const cartKey = `cart_${user.id}`;
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    // Phát tín hiệu
    window.dispatchEvent(new Event("cart_updated"));
  };

  return {
    user,
    cartItems,
    favorites,
    handleLogout,
    handleRemoveFavorite,
    handleRemoveFromCart,
  };
}