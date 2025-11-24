"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { useRecentlyViewed } from "../hooks/useRecentlyViewed"
import { RecentlyViewedCard } from "./RecentlyViewedCard"

export function RecentlyViewedProducts() {
  const { products } = useRecentlyViewed()

  if (products.length === 0) {
    return null
  }

  return (
    <section className="mt-16 space-y-6">
      <h2 className="text-3xl font-serif font-semibold text-foreground">
        Recently Viewed Products
      </h2>

      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-4 gap-6">
        {products.map((product) => (
          <RecentlyViewedCard key={product.id} product={product} />
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
          className="recently-viewed-swiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <RecentlyViewedCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
