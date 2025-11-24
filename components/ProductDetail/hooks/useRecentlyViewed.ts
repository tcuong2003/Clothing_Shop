import { useState, useEffect } from "react"
import { getRecentlyViewedProducts, RecentlyViewedProduct } from "@/lib/recentlyViewed"

export function useRecentlyViewed() {
  const [products, setProducts] = useState<RecentlyViewedProduct[]>([])

  useEffect(() => {
    const loadProducts = () => {
      const recentProducts = getRecentlyViewedProducts()
      setProducts(recentProducts)
    }

    loadProducts()

    // Listen for storage changes from other tabs/windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "recently_viewed_products") {
        loadProducts()
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  return { products }
}
