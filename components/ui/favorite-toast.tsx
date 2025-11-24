"use client"

import { Heart } from "lucide-react"
import Image from "next/image"

interface FavoriteToastProps {
  product: {
    title: string
    price: number
    discountPercentage?: number
    thumbnail?: string
    images?: string[]
  }
  isFavorited: boolean
}

export function FavoriteToast({ product, isFavorited }: FavoriteToastProps) {
  const thumbnail = product.thumbnail || product.images?.[0]

  return (
    <div className="flex items-start gap-3 w-full">
      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
        isFavorited ? "bg-red-100" : "bg-gray-100"
      }`}>
        <Heart className={`w-6 h-6 ${
          isFavorited ? "fill-red-500 text-red-500" : "text-gray-500"
        }`} />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-3">
          {thumbnail && (
            <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border border-gray-200">
              <Image
                src={thumbnail}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-gray-900 mb-1">
              {isFavorited ? "Đã thêm vào yêu thích!" : "Đã xóa khỏi yêu thích!"}
            </p>
            <p className="text-sm text-gray-600 truncate mb-1">
              {product.title}
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500">
                {isFavorited ? "❤️ Đã lưu" : "💔 Đã xóa"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
