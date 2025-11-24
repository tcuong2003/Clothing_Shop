const STORAGE_KEY = "recently_viewed_products"
const MAX_ITEMS = 8

export interface RecentlyViewedProduct {
  id: number
  title: string
  price: number
  discountPercentage: number
  thumbnail: string
  rating: number
}

export function saveProductView(product: RecentlyViewedProduct): void {
  if (typeof window === "undefined") return

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    let products: RecentlyViewedProduct[] = stored ? JSON.parse(stored) : []

    // Remove if already exists
    products = products.filter((p) => p.id !== product.id)

    // Add to beginning (most recent)
    products.unshift(product)

    // Keep only MAX_ITEMS
    if (products.length > MAX_ITEMS) {
      products = products.slice(0, MAX_ITEMS)
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  } catch (error) {
    console.error("Error saving recently viewed product:", error)
  }
}

export function getRecentlyViewedProducts(): RecentlyViewedProduct[] {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Error loading recently viewed products:", error)
    return []
  }
}
