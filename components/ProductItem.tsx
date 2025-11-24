"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState } from "react";
import { saveProductView } from "@/lib/recentlyViewed";
import { useRouter } from "next/navigation";
import { useFavorite } from "@/hooks/useFavorite";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import { CartToast } from "@/components/ui/cart-toast";
import { FavoriteToast } from "@/components/ui/favorite-toast";
import LoginModal from "./LoginModal";

interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  discountPercentage?: number;
  thumbnail?: string;
  rating?: number;
}

interface ProductItemProps {
  product: Product;
  selectedIndexes: { [key: string]: number };
  setSelectedIndexes: React.Dispatch<
    React.SetStateAction<{ [key: string]: number }>
  >;
  swipers: { [key: string]: any };
  setSwipers: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
}

export default function ProductItem({
  product,
  selectedIndexes,
  setSelectedIndexes,
  swipers,
  setSwipers,
}: ProductItemProps) {
  const [hovered, setHovered] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const router = useRouter();
  const { isFavorite, isLoggedIn, toggleFavorite } = useFavorite(product.id);
  const { addToCart, isLoggedIn: isCartLoggedIn } = useCart();
  const { toast } = useToast();

  const hasMultipleImages = product.images.length > 1;

  const handleDotClick = (index: number) => {
    setSelectedIndexes((prev) => ({ ...prev, [product.id]: index }));
    swipers[product.id]?.slideTo(index);
  };

  const handleProductClick = () => {
    saveProductView({
      id: Number(product.id),
      title: product.title,
      price: product.price,
      discountPercentage: product.discountPercentage || 0,
      thumbnail: product.thumbnail || product.images[0],
      rating: product.rating || 0,
    });
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const productData = {
      id: product.id,
      title: product.title,
      price: product.price,
      discountPercentage: product.discountPercentage,
      thumbnail: product.thumbnail || product.images[0],
      images: product.images,
    };
    
    const result = toggleFavorite(productData);
    
    if (result.success) {
      toast({
        variant: "success",
        description: <FavoriteToast product={productData} isFavorited={result.isFavorited} />,
        duration: 3000,
      });
    }
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isCartLoggedIn) {
      setOpenLogin(true);
      return;
    }
    
    const productData = {
      id: product.id,
      title: product.title,
      price: product.price,
      discountPercentage: product.discountPercentage,
      thumbnail: product.thumbnail || product.images[0],
      images: product.images,
    };
    
    addToCart(productData, 1);
    
    // Show professional toast notification
    toast({
      variant: "success",
      description: <CartToast product={productData} quantity={1} />,
      duration: 3000,
    });
  };

  return (
    <>
      <Link href={`/products/${product.id}`} onClick={handleProductClick}>
        <div
        className="mx-auto relative space-y-2 group w-full max-w-xs"
        onMouseEnter={() => hasMultipleImages && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative w-full aspect-[262/382] mb-1">
          {hasMultipleImages ? (
            hovered ? (
              <Swiper
                loop={false}
                onSwiper={(swiperInstance) =>
                  setSwipers((prev) => ({
                    ...prev,
                    [product.id]: swiperInstance,
                  }))
                }
                onSlideChange={(s) =>
                  setSelectedIndexes((prev) => ({
                    ...prev,
                    [product.id]: s.realIndex,
                  }))
                }
                className="w-full h-full"
              >
                {product.images.map((src, i) => (
                  <SwiperSlide key={i}>
                    <Image
                      src={src}
                      alt={`product-${i}`}
                      fill
                      className="object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Image
                src={
                  selectedIndexes[product.id] !== undefined
                    ? product.images[selectedIndexes[product.id]]
                    : product.images[product.images.length - 1]
                }
                alt={product.title}
                fill
                className="object-cover transition-opacity duration-500"
              />
            )
          ) : (
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover"
            />
          )}
          {isLoggedIn && (
            <Heart
              className={`cursor-pointer absolute top-5 right-5 z-10 transition-colors ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"
              }`}
              onClick={handleFavoriteClick}
            />
          )}
        </div>
        <div className="text-sm text-gray-800 font-semibold truncate w-[200px]">
          {product.title}
        </div>

        <div className="flex items-center">
          {(product?.discountPercentage ?? 0) > 0 && (
            <div className="text-base text-gray-500 font-semibold mr-2 line-through">
              {product.price.toLocaleString("vi-VN")} VND
            </div>
          )}
          <div className="text-xs font-semibold">
            {(
              product.price *
              (1 - (product?.discountPercentage ?? 0) / 100)
            ).toLocaleString("vi-VN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            VND
          </div>
        </div>

        <div className="flex items-center justify-between">
          {hasMultipleImages && (
            <ul className="flex items-center space-x-1">
              {product.images.map((_, i) => (
                <li
                  key={i}
                  className={`cursor-pointer ${i === 0 ? "hidden" : ""}`}
                  onClick={() => handleDotClick(i)}
                >
                  <span
                    className={`flex w-2 h-2 rounded-full transition-colors ${
                      selectedIndexes[product.id] === i
                        ? "bg-blue-500"
                        : "bg-gray-300"
                    }`}
                  ></span>
                </li>
              ))}
            </ul>
          )}
          {product.discountPercentage && (
            <div className="px-5 py-1 text-xs font-semibold bg-[#DD0D0D] text-white">
              {product.discountPercentage}%
            </div>
          )}
        </div>

        <div className="absolute bottom-[20%] left-1/2 transform -translate-x-1/2 hidden md:flex space-x-2 items-center justify-center opacity-0 translate-y-5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 z-50">
          <div
            className="w-[100px] text-center text-xs font-semibold bg-white shadow-sm p-2 rounded-sm cursor-pointer hover:bg-gray-100"
            onClick={handleBuyNow}
          >
            MUA NGAY
          </div>
          <div
            className="w-[110px] text-center text-xs font-semibold bg-white shadow-sm p-2 rounded-sm cursor-pointer hover:bg-gray-100"
            onClick={() => router.push(`/product/${product.id}`)}
          >
            XEM CHI TIẾT
          </div>
        </div>
      </div>
    </Link>
    
    {openLogin && (
      <LoginModal
        setOpenLogin={setOpenLogin}
        setOpenRegister={() => {}}
      />
    )}
    </>
  );
}
