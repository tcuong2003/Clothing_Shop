"use client";

import {
  ChevronRight,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  UserRound,
  X,
  LogOut,
  LogIn,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LoginModal from "@/components/LoginModal";
import RegisterModal from "@/components/RegisterModal";
import { useHeader } from "@/hooks/useHeader";
import UserActions from "@/components/Header/components/UserActions";

const navItems = [
  { name: "TRANG CHỦ", path: "/" },
  { name: "SẢN PHẨM", path: "/products" },
  { name: "BLOG", path: "/blogs" },
  { name: "LIÊN HỆ", path: "/contact" },
];

export default function Header() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const pathname = usePathname();

  const {
    user,
    cartItems,
    favorites,
    handleLogout,
    handleRemoveFavorite,
    handleRemoveFromCart,
  } = useHeader();

  return (
    <>
      <header className="sticky top-0 left-0 z-[999] flex items-center justify-between bg-white shadow-sm border-b border-gray-100 w-full px-4 py-3 md:px-8 transition-all">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Menu
            className="mr-2 md:hidden cursor-pointer hover:scale-110 transition-transform"
            onClick={() => setIsOpenMenu(true)}
          />
          <Link
            href="/"
            className="flex items-center space-x-2 transition-all hover:scale-110"
          >
            <Image
              src="/logo-clothes.jpg"
              alt="Clothing Shop Logo"
              width={70}
              height={70}
              className="rounded-md object-contain w-[50px] h-[50px] sm:w-[60px] sm:h-[60px]"
            />
            <span className="hidden sm:inline text-lg sm:text-2xl font-bold tracking-wide text-gray-900 hover:text-blue-600 transition-colors">
              Fashion E-Commerce
            </span>
          </Link>
        </div>

        {/* Search + Icons */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          {/* Search */}
          <div
            className={`flex items-center border rounded-full px-3 py-1 transition-all ${
              openSearch
                ? "border-gray-300 bg-gray-50"
                : "border-transparent hover:bg-gray-50"
            }`}
          >
            <input
              type="text"
              placeholder="Tìm sản phẩm..."
              className={`text-sm focus:outline-none bg-transparent transition-all ${
                openSearch ? "w-32 sm:w-48" : "w-0"
              }`}
            />
            <Search
              size={18}
              className="cursor-pointer text-gray-700 hover:text-black transition-all hover:scale-110"
              onClick={() => setOpenSearch((prev) => !prev)}
            />
          </div>

          {/* === DESKTOP ICONS === */}
          <UserActions
            user={user}
            cartItems={cartItems}
            favorites={favorites}
            handleLogout={handleLogout}
            handleRemoveFavorite={handleRemoveFavorite}
            handleRemoveFromCart={handleRemoveFromCart}
            openLoginModal={() => setOpenLogin(true)}
          />

          {/* === MOBILE ICON === */}
          <button
            className="md:hidden p-2 border rounded-md hover:bg-gray-100"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            {user ? (
              <div className="flex items-center space-x-2 cursor-pointer text-gray-700">
                <Image
                  src={user.image || "/default-avatar.png"}
                  alt="avatar"
                  width={24}
                  height={24}
                  className="rounded-full object-cover"
                />
              </div>
            ) : (
              <UserRound size={22} />
            )}
          </button>
        </div>

        {/* Sidebar menu (mobile) */}
        <ul
          className={`fixed top-0 left-0 bg-white shadow-md w-[220px] h-full flex flex-col p-5 space-y-5 transform transition-transform duration-300 ease-in-out z-[9999]
            ${isOpenMenu ? "translate-x-0" : "-translate-x-full"}
            md:flex md:items-center md:space-x-10 md:space-y-0 md:relative md:flex-row md:bg-transparent md:w-auto md:shadow-none md:p-0 md:translate-x-0`}
        >
          <li className="md:hidden">
            <X
              className="border border-gray-300 rounded-md p-1 cursor-pointer hover:bg-gray-100"
              onClick={() => setIsOpenMenu(false)}
            />
          </li>

          {navItems.map((item) => {
            const isActive =
              item.path === "/"
                ? pathname === "/"
                : pathname.startsWith(item.path);

            return (
              <li
                key={item.path}
                className="font-semibold relative group transition-all hover:scale-110"
              >
                <Link
                  href={item.path}
                  onClick={() => setIsOpenMenu(false)}
                  className={`block px-1 py-1 transition-all duration-200 ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-800 hover:text-blue-600"
                  }`}
                >
                  {item.name}
                </Link>
                <span
                  className={`absolute bottom-0 left-0 h-[2px] w-full bg-blue-600 rounded-full transition-all duration-300 origin-left ${
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                ></span>
              </li>
            );
          })}
        </ul>

        {/* === MOBILE USER SLIDE MENU === */}
        <div
          className={`fixed top-0 right-0 bg-white shadow-md w-[220px] h-full flex flex-col p-5 space-y-5 transform transition-transform duration-300 ease-in-out z-[9999]
            ${isUserMenuOpen ? "translate-x-0" : "translate-x-full"}
            md:hidden`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-semibold text-gray-800">Tài khoản</h2>
            <X
              className="border border-gray-300 rounded-md p-1 cursor-pointer hover:bg-gray-100"
              onClick={() => setIsUserMenuOpen(false)}
            />
          </div>

          {user ? (
            <>
              <Link
                href="/user-profile"
                onClick={() => setIsUserMenuOpen(false)}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
              >
                <UserRound size={18} />
                <span>Hồ sơ cá nhân</span>
              </Link>
              <Link
                href="/user-profile"
                onClick={() => setIsUserMenuOpen(false)}
                className="flex items-center space-x-2 text-gray-700 hover:text-pink-600"
              >
                <Heart size={18} />
                <span>Yêu thích</span>
              </Link>
              <Link
                href="/user-profile"
                onClick={() => setIsUserMenuOpen(false)}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
              >
                <ShoppingCart size={18} />
                <span>Giỏ hàng</span>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsUserMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-red-600 hover:text-red-800"
              >
                <LogOut size={18} />
                <span>Đăng xuất</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setOpenLogin(true);
                  setIsUserMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
              >
                <LogIn size={18} />
                <span>Đăng nhập</span>
              </button>
              {/* <button
                onClick={() => {
                  setOpenRegister(true);
                  setIsUserMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-gray-700 hover:text-green-600"
              >
                <UserRound size={18} />
                <span>Đăng ký</span>
              </button> */}
            </>
          )}
        </div>

        {/* Overlay khi menu mở */}
        {(isOpenMenu || isUserMenuOpen) && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] md:hidden"
            onClick={() => {
              setIsOpenMenu(false);
              setIsUserMenuOpen(false);
            }}
          ></div>
        )}
      </header>

      {/* Modals */}
      {openLogin && (
        <LoginModal
          setOpenLogin={setOpenLogin}
          setOpenRegister={setOpenRegister}
        />
      )}
      {openRegister && (
        <RegisterModal
          setOpenRegister={setOpenRegister}
          setOpenLogin={setOpenLogin}
        />
      )}
    </>
  );
}
