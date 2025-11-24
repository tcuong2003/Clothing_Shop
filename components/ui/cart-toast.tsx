"use client"

import { CheckCircle2, ShoppingCart } from "lucide-react"
import Image from "next/image"

interface CartToastProps {
  product: {
    title: string
    price: number
    discountPercentage?: number
    thumbnail?: string
    images?: string[]
  }
  quantity: number
}

export function CartToast({ product, quantity }: CartToastProps) {
  const discountedPrice = product.price * (1 - (product.discountPercentage || 0) / 100)
  const thumbnail = product.thumbnail || product.images?.[0]

  return (
    <div className="flex items-start gap-3 w-full">
      <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle2 className="w-6 h-6 text-green-600" />
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
              Đã thêm vào giỏ hàng!
            </p>
            <p className="text-sm text-gray-600 truncate mb-1">
              {product.title}
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500">Số lượng: {quantity}</span>
              <span className="text-gray-300">•</span>
              <span className="font-semibold text-green-600">
                {discountedPrice.toFixed(2)} $
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
