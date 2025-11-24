import { useState, useEffect } from "react"
import { ProductData } from "./useProductData"

interface UseRelatedProductsReturn {
  products: ProductData[]
  loading: boolean
  error: string | null
}

export function useRelatedProducts(
  category: string | undefined,
  currentProductId: number | undefined,
  limit: number = 10
): UseRelatedProductsReturn {
  const [products, setProducts] = useState<ProductData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!category) {
      setLoading(false)
      return
    }

    const fetchRelatedProducts = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`https://dummyjson.com/products/category/${category}`)

        if (!response.ok) {
          throw new Error("Failed to fetch related products")
        }

        const data = await response.json()
        
        // Filter out current product and limit results
        const filteredProducts = data.products
          .filter((product: ProductData) => product.id !== currentProductId)
          .slice(0, limit)

        setProducts(filteredProducts)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedProducts()
  }, [category, currentProductId, limit])

  return { products, loading, error }
}
