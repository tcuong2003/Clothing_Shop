// hooks/useFavorite.ts
import { useState, useEffect, useCallback } from "react";

export interface FavoriteProduct {
  id: string | number;
  title: string;
  price: number;
  discountPercentage?: number;
  thumbnail?: string;
  images?: string[];
}

export function useFavorite(productId: string | number) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Check if user is logged in and get user ID (Giữ nguyên)
  useEffect(() => {
    const token = localStorage.getItem("console_token");
    const user = localStorage.getItem("user");

    if (token && user && user !== "undefined") {
      try {
        const userData = JSON.parse(user);
        setIsLoggedIn(true);
        setUserId(userData.id?.toString() || null);
      } catch (error) {
        console.error("Error parsing user:", error);
        setIsLoggedIn(false);
        setUserId(null);
      }
    } else {
      setIsLoggedIn(false);
      setUserId(null);
    }
  }, []);

  const getFavorites = useCallback((): FavoriteProduct[] => {
    try {
      if (!userId) return [];
      
      const favoritesKey = `favorites_${userId}`;
      const favoritesStr = localStorage.getItem(favoritesKey);
      return favoritesStr ? JSON.parse(favoritesStr) : [];
    } catch (error) {
      console.error("Error parsing favorites:", error);
      return [];
    }
  }, [userId]);

  // Tách logic kiểm tra ra một hàm để tái sử dụng
  const updateFavoriteStatus = useCallback(() => {
    if (!isLoggedIn || !userId) return;

    const favorites = getFavorites();
    const exists = favorites.some(
      (fav) => fav.id.toString() === productId.toString()
    );
    setIsFavorite(exists);
  }, [productId, isLoggedIn, userId, getFavorites]);

  // Check if product is already favorited (Giữ nguyên logic, chỉ gọi hàm mới)
  useEffect(() => {
    updateFavoriteStatus();
  }, [updateFavoriteStatus]);

  // >>> THÊM MỚI: Lắng nghe sự kiện từ bên ngoài <<<
  // Hook này sẽ tự cập nhật nếu một nơi khác thay đổi danh sách yêu thích
  useEffect(() => {
    window.addEventListener("favorites_updated", updateFavoriteStatus);

    return () => {
      window.removeEventListener("favorites_updated", updateFavoriteStatus);
    };
  }, [updateFavoriteStatus]);
  // >>> KẾT THÚC PHẦN THÊM MỚI <<<


  // Hàm toggleFavorite giữ nguyên hoàn toàn API và logic cũ
  const toggleFavorite = (product: FavoriteProduct): { success: boolean; isFavorited: boolean } => {
    if (!isLoggedIn || !userId) {
      return { success: false, isFavorited: false };
    }

    const favorites = getFavorites();
    const existingIndex = favorites.findIndex(
      (fav) => fav.id.toString() === productId.toString()
    );

    let newFavorites: FavoriteProduct[];
    let isFavoritedNow: boolean;

    if (existingIndex !== -1) {
      // Remove from favorites
      newFavorites = favorites.filter((_, index) => index !== existingIndex);
      isFavoritedNow = false;
      setIsFavorite(false);
    } else {
      // Add to favorites
      newFavorites = [...favorites, product];
      isFavoritedNow = true;
      setIsFavorite(true);
    }

    const favoritesKey = `favorites_${userId}`;
    localStorage.setItem(favoritesKey, JSON.stringify(newFavorites));
    
    // >>> THÊM MỚI: Phát ra sự kiện sau khi cập nhật localStorage <<<
    window.dispatchEvent(new Event("favorites_updated"));
    // >>> KẾT THÚC PHẦN THÊM MỚI <<<

    return { success: true, isFavorited: isFavoritedNow };
  };

  return {
    isFavorite,
    isLoggedIn,
    userId, // Bạn có thể giữ hoặc bỏ userId tùy nhu cầu
    toggleFavorite,
  };
}