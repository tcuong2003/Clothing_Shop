"use client"

import { Star, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ProductData } from "../hooks/useProductData"
import { useFavorite } from "@/hooks/useFavorite"
import { useToast } from "@/hooks/use-toast"
import { FavoriteToast } from "@/components/ui/favorite-toast"

interface ProductInfoProps {
  product: ProductData
  averageRating: number
}

export function ProductInfo({ product, averageRating }: ProductInfoProps) {
  const discountedPrice = product.price * (1 - product.discountPercentage / 100)
  const { isFavorite, isLoggedIn, toggleFavorite } = useFavorite(product.id)
  const { toast } = useToast()

  const handleFavoriteClick = () => {
    const productData = {
      id: product.id,
      title: product.title,
      price: product.price,
      discountPercentage: product.discountPercentage,
      thumbnail: product.thumbnail,
      images: product.images,
    }
    
    const result = toggleFavorite(productData)
    
    if (result.success) {
      toast({
        variant: "success",
        description: <FavoriteToast product={productData} isFavorited={result.isFavorited} />,
        duration: 3000,
      })
    }
  }

  return (
    <>
      {/* Title & Brand */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs uppercase tracking-wide">
            {product.brand}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
        </div>
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-4xl lg:text-5xl font-serif font-medium tracking-tight text-balance">
            {product.title}
          </h1>
          {isLoggedIn && (
            <Heart
              className={`cursor-pointer h-8 w-8 flex-shrink-0 transition-colors ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"
              }`}
              onClick={handleFavoriteClick}
            />
          )}
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < Math.floor(averageRating) ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          {averageRating.toFixed(1)} ({product.reviews.length} reviews)
        </span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-4xl font-serif font-semibold text-foreground">${discountedPrice.toFixed(2)}</span>
        <span className="text-xl text-muted-foreground line-through">${product.price.toFixed(2)}</span>
        <Badge variant="destructive" className="text-sm">
          Save {product.discountPercentage.toFixed(0)}%
        </Badge>
      </div>

      {/* Description */}
      <p className="text-base leading-relaxed text-muted-foreground">{product.description}</p>
    </>
  )
}
