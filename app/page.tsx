"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import "@/styles/swiper-custom.scss";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductItem from "@/components/ProductItem";
import Header from "@/components/Header/Header";
import ProductItemSkeleton from "@/components/ProductItemSkeleton";
import CategorySkeleton from "@/components/CategorySkeleton";

type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

type CategoryWithThumbnail = {
  name: string;
  thumbnail: string;
};

export default function Home() {
  const [swipers, setSwipers] = useState<{ [key: string]: any }>({});
  const [products, setProducts] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryWithThumbnail[]>([]);

  const [selectedIndexes, setSelectedIndexes] = useState<{
    [key: string]: number;
  }>({});

  const categories = [
    "mens-shirts",
    "womens-shoes",
    "mens-shoes",
    "womens-dresses",
    "tops",
    "womens-bags",
    "womens-jewellery",
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const promises = categories.map(async (cat) => {
          const res = await fetch(
            `https://dummyjson.com/products/category/${cat}`
          );
          const data = await res.json();

          return {
            name: cat,
            thumbnail: data.products[0]?.thumbnail || "",
            products: data.products,
          };
        });

        const results = await Promise.all(promises);

        setCategoryData(
          results.map(({ name, thumbnail }) => ({ name, thumbnail }))
        );
        setProducts(results.flatMap((r) => r.products));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchData();
  }, []);

  const newProducts = products
    .sort(
      (a, b) =>
        new Date(b.meta.createdAt).getTime() -
        new Date(a.meta.createdAt).getTime()
    )
    .slice(0, 8);

  const featuredProducts = products.filter((item) => {
    if (!item.reviews || item.reviews.length === 0) return false;

    const avg =
      item.reviews.reduce(
        (total: number, review: Review) => total + review.rating,
        0
      ) / item.reviews.length;

    return avg > 4.5;
  });

  return (
    <>
      <Header />
      <div className="px-2 w-full h-auto">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop={true}
          navigation={true}
          className="mySwiper"
        >
          <SwiperSlide>
            <Image
              src="/bg.jpg"
              alt="bg-1"
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/bg-1.jpg"
              alt="bg-1"
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="px-2 py-0 md:py-20">
        <Swiper
          spaceBetween={2}
          slidesPerView={3}
          slidesPerGroup={1}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Autoplay, Navigation]}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 5,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 1,
            },
          }}
          className="mySwiper"
        >
          {categoryData.length > 0 ? (
            categoryData.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="relative">
                  <Image
                    src={item.thumbnail}
                    alt="bg-1"
                    width={600}
                    height={180}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute left-[10%] bottom-[10%] flex flex-col space-y-1">
                    <Link href="/" className="text-lg font-semibold uppercase">
                      {item.name}
                    </Link>
                    <Link href="/" className="text-base underline">
                      Khám phá thêm
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2  lg:grid-cols-4 gap-4 py-5">
              {Array.from({ length: 4 }).map((_, index) => (
                <CategorySkeleton key={index} />
              ))}
            </div>
          )}
        </Swiper>
      </div>
      <div className="xl:px-40 md:px-5 md:py-5 px-5 py-10">
        <div className="text-2xl text-gray-600 uppercase text-center font-semibold">
          SẢN PHẨM NỔI BẬT
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2  lg:grid-cols-4 gap-4 py-5">
          {featuredProducts.length > 0
            ? featuredProducts.map((product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  selectedIndexes={selectedIndexes}
                  setSelectedIndexes={setSelectedIndexes}
                  swipers={swipers}
                  setSwipers={setSwipers}
                />
              ))
            : Array.from({ length: 4 }).map((_, index) => (
                <ProductItemSkeleton key={index} />
              ))}
        </div>
      </div>

      <div className="xl:px-10 md:px-5 md:py-5 px-5 py-10">
        <div className="text-2xl text-gray-600 uppercase text-center font-semibold">
          Mới có ở cửa hàng
        </div>

        <Swiper
          spaceBetween={0}
          slidesPerView={4}
          slidesPerGroup={1}
          loop={true}
          navigation={true}
          modules={[Navigation]}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 0 },
            640: { slidesPerView: 2, spaceBetween: 2 },
            1024: { slidesPerView: 4, spaceBetween: 0 },
          }}
          className="mySwiper mt-5"
        >
          {newProducts.length > 0
            ? newProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductItem
                    product={product}
                    selectedIndexes={selectedIndexes}
                    setSelectedIndexes={setSelectedIndexes}
                    swipers={swipers}
                    setSwipers={setSwipers}
                  />
                </SwiperSlide>
              ))
            : Array.from({ length: 4 }).map((_, index) => (
                <SwiperSlide key={index}>
                  <ProductItemSkeleton />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </>
  );
}
