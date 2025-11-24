"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { useRelatedProducts } from "../hooks/useRelatedProducts"
import { RelatedProductCard } from "./RelatedProductCard"
import { Skeleton } from "@/components/ui/skeleton"

interface RelatedProductsProps {
  category: string
  currentProductId: number
}

export function RelatedProducts({ category, currentProductId }: RelatedProductsProps) {
  const { products, loading, error } = useRelatedProducts(category, currentProductId, 10)

  if (loading) {
    return <RelatedProductsSkeleton />
  }

  if (error || products.length === 0) {
    return null
  }

  return (
    <section className="mt-16 space-y-6">
      <h2 className="text-3xl font-serif font-semibold text-foreground">
        Related Products
      </h2>

      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-4 gap-6">
        {products.map((product) => (
          <RelatedProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Mobile Slider */}
      <div className="md:hidden">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={16}
          slidesPerView={1.5}
          pagination={{ clickable: true }}
          breakpoints={{
            480: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 2.5,
            },
          }}
          className="related-products-swiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <RelatedProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

function RelatedProductsSkeleton() {
  return (
    <section className="mt-16 space-y-6">
      <Skeleton className="h-9 w-48" />
      
      {/* Desktop Grid Skeleton */}
      <div className="hidden md:grid md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-square rounded-lg" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-5 w-24" />
          </div>
        ))}
      </div>

      {/* Mobile Slider Skeleton */}
      <div className="md:hidden flex gap-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex-shrink-0 w-[calc(50%-8px)] space-y-3">
            <Skeleton className="aspect-square rounded-lg" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-5 w-24" />
          </div>
        ))}
      </div>
    </section>
  )
}
