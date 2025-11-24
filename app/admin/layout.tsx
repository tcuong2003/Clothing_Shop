"use client";

import {
    ChevronDown,
    CreditCard,
    FileText,
    Heart,
    Settings,
    Tags,
    UserRound,
} from 'lucide-react';
import Image from "next/image";

import {
    PackageSearch,
    ChartBarStacked,
    Container,
    ShoppingCart,
    Truck,
    Ban,
    CircleGauge,
    Info,
    LogOut,
    Megaphone
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Toaster } from 'sonner';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import "../../styles/index.scss";

const menuGroups = [
    // {
    //     children: [
    //         { href: "/admin", label: "Tổng quan", icon: CircleGauge },
    //     ],
    // },
    {
        group: "Quản lý sản phẩm",
        children: [
            { href: "/admin/products", label: "Sản phẩm", icon: PackageSearch },
            { href: "/admin/categories", label: "Danh mục", icon: ChartBarStacked },
            // { href: "/admin/brands", label: "Thương hiệu", icon: Tags },
            // { href: "/admin/stock", label: "Kho tồn", icon: Container },
        ],
    },
    // {
    //     group: "Quản lý đơn hàng",
    //     children: [
    //         { href: "/admin/carts", label: "Giỏ hàng", icon: ShoppingCart },
    //         { href: "/admin/shipping", label: "Vận chuyển", icon: Truck },
    //         { href: "/admin/cancel", label: "Hủy đơn", icon: Ban },
    //     ],
    // },
    {
        group: "Quản lý người dùng",
        children: [
            { href: "/admin/users", label: "Khách hàng", icon: UserRound },
            // { href: "/admin/wishlist", label: "Wishlist", icon: Heart },
        ],
    },
    {
        group: "Nội dung & Marketing",
        children: [
            { href: "/admin/posts", label: "Bài viết", icon: FileText },
            // { href: "/admin/banner", label: "Banner / Quảng cáo", icon: Megaphone },
        ],
    },
    // {
    //     group: "Cấu hình hệ thống",
    //     children: [
    //         { href: "/admin/settings", label: "Cài đặt", icon: Settings },
    //         { href: "/admin/payment", label: "Thanh toán", icon: CreditCard },
    //     ],
    // },
];


export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [openMenu, setOpenMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    let currentLabel = "Tổng quan";
    menuGroups.forEach(group => {
        group.children.forEach(item => {
            if (item.href === pathname) {
                currentLabel = item.label;
            }
        });
    });

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="flex">
            <AdminSidebar menuGroups={menuGroups} />
            <div className="ml-[25%] flex-col flex-1 md:ml-[15%] p-2">
                <header className="flex items-center justify-between py-2 border-b border-gray-200 bg-white">
                    <div className="text-lg font-semibold text-gray-800">
                        {currentLabel}
                    </div>
                    <div className="relative" ref={menuRef}>
                        <div onClick={() => setOpenMenu((prev) => !prev)}
                            className="flex items-center cursor-pointer hover:bg-gray-100 rounded-full px-2 py-1 transition">
                            <div className="text-sm font-medium text-gray-700 mr-2">
                                Đinh Quỳnh
                            </div>
                            <Image
                                src="/logo-giay.jpg"
                                alt="Admin logo"
                                width={35}
                                height={35}
                                className="rounded-full"
                            />
                            <ChevronDown className="ml-1 w-4 h-4 text-gray-500" />
                        </div>
                        {openMenu && (
                            <div className="absolute right-0 w-50 rounded-md bg-white border border-gray-200 shadow-lg z-50">
                                <ul className="py-1 text-sm text-gray-700">
                                    <li>
                                        <button
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
                                        >
                                            <Info className="w-4 h-4 mr-2 text-gray-600" />
                                            <span className="text-sm">Xem thông tin cá nhân</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
                                            onClick={() => alert("Đăng xuất")}
                                        >
                                            <LogOut className="w-4 h-4 mr-2 text-red-600" />
                                            <span className="text-sm text-red-600">Đăng xuất</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </header>

                <main className="flex-1">
                    {children}
                    <Toaster richColors position="top-right" />
                </main>
            </div>
        </div>
    );
}
