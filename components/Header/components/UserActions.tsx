// components/header/UserActions.tsx
"use client";

import { ChevronRight, Heart, ShoppingCart, UserRound } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import PopoverWrapper from "./PopoverWrapper";
import FavoritePopover from "./FavoritePopover";
import CartPopover from "./CartPopover";
import { CartItem } from "@/hooks/useCart";
import { FavoriteProduct } from "@/hooks/useFavorite";

interface UserActionsProps {
  user: { id: number; firstName: string; image: string } | null;
  cartItems: CartItem[];
  favorites: FavoriteProduct[];
  handleLogout: () => void;
  handleRemoveFavorite: (id: string | number) => void;
  handleRemoveFromCart: (id: string | number) => void;
  openLoginModal: () => void;
}

const NotLoggedInPopover = ({
  message,
  onLoginClick,
}: {
  message: string;
  onLoginClick: () => void;
}) => (
  <div className="p-3 w-[220px] text-center text-sm text-gray-700">
    <p>
      {message}{" "}
      <span
        className="text-blue-600 cursor-pointer hover:underline"
        onClick={onLoginClick}
      >
        đăng nhập
      </span>
      .
    </p>
  </div>
);

export default function UserActions({
  user,
  cartItems,
  favorites,
  handleLogout,
  handleRemoveFavorite,
  handleRemoveFromCart,
  openLoginModal,
}: UserActionsProps) {
  return (
    <div className="hidden md:flex items-center space-x-5">
      {/* User Account */}
      {user ? (
        <PopoverWrapper
          className="w-40"
          trigger={
            <div className="flex items-center space-x-2 text-gray-700 hover:text-black transition-all hover:scale-110">
              <Image
                src={user.image || "/default-avatar.png"}
                alt="avatar"
                width={24}
                height={24}
                className="rounded-full object-cover"
              />
              <span className="text-xs font-semibold">{user.firstName}</span>
              <ChevronRight size={14} />
            </div>
          }
        >
          <div className="flex flex-col">
            <Link
              href="/user-profile"
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Hồ sơ cá nhân
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-red-600 hover:bg-red-100 text-left"
            >
              Đăng xuất
            </button>
          </div>
        </PopoverWrapper>
      ) : (
        <UserRound
          size={20}
          className="cursor-pointer text-gray-700 hover:text-black hover:scale-110"
          onClick={openLoginModal}
        />
      )}

      {/* Wishlist */}
      <PopoverWrapper
        trigger={
          <div className="flex items-center space-x-1 text-gray-700 hover:text-red-600 hover:scale-110">
            <Heart size={18} />
            <span className="text-xs font-semibold">({favorites.length})</span>
          </div>
        }
      >
        {user ? (
          <FavoritePopover items={favorites} onRemove={handleRemoveFavorite} />
        ) : (
          <NotLoggedInPopover
            message="🧭 Vui lòng"
            onLoginClick={openLoginModal}
          />
        )}
      </PopoverWrapper>

      {/* Cart */}
      <PopoverWrapper
        trigger={
          <div className="flex items-center space-x-1 text-gray-700 hover:text-black hover:scale-110">
            <ShoppingCart size={18} />
            <span className="text-xs font-semibold text-red-600">
              ({cartItems.length})
            </span>
          </div>
        }
      >
        {user ? (
          <CartPopover items={cartItems} onRemove={handleRemoveFromCart} />
        ) : (
          <NotLoggedInPopover
            message="🔐 Vui lòng"
            onLoginClick={openLoginModal}
          />
        )}
      </PopoverWrapper>
    </div>
  );
}