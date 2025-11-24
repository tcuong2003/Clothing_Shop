import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ProductData } from "../hooks/useProductData"
import { saveProductView } from "@/lib/recentlyViewed"

interface RelatedProductCardProps {
  product: ProductData
}

export function RelatedProductCard({ product }: RelatedProductCardProps) {
  const discountedPrice = product.price * (1 - product.discountPercentage / 100)

  const handleClick = () => {
    saveProductView({
      id: product.id,
      title: product.title,
      price: product.price,
      discountPercentage: product.discountPercentage,
      thumbnail: product.thumbnail,
      rating: product.rating,
    })
  }

  return (
    <Link href={`/products/${product.id}`} onClick={handleClick} className="group block">
      <div className="space-y-3">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.discountPercentage > 0 && (
            <Badge
              variant="destructive"
              className="absolute top-2 right-2 text-xs"
            >
              -{product.discountPercentage.toFixed(0)}%
            </Badge>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
            <span className="text-xs text-muted-foreground">
              {product.rating.toFixed(1)}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">
              ${discountedPrice.toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
