"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
    href: string;
    label: string;
    icon: React.ElementType;
}

interface MenuGroup {
    group?: string;
    children: MenuItem[];
}

interface AdminSidebarProps {
    menuGroups: MenuGroup[];
}

export function AdminSidebar({ menuGroups }: AdminSidebarProps) {
    const pathname = usePathname();

    return (
        <>
            <div className="fixed left-0 top-0 h-screen w-[25%] bg-[#F8F8F8] p-2 overflow-y-auto border-r border-gray-300 md:w-[15%]">
                <div className="mb-2">
                    <Image
                        src="/logo-giay.jpg"
                        alt="Admin logo"
                        width={60}
                        height={60}
                        className="rounded-full"
                    />
                </div>
                <div className="">
                    <ul className="space-y-4 text-sm">
                        {menuGroups.map(({ group, children }) => (
                            <li key={group || Math.random()}>
                                {group && (
                                    <div className="font-semibold text-gray-600">{group}</div>
                                )}
                                <ul className="mt-2 space-y-1 text-base">
                                    {children.map(({ href, label, icon: Icon }) => {
                                        const isActive = pathname === href;
                                        return (
                                            <li key={href}>
                                                <Link
                                                    href={href}
                                                    className={`flex items-center p-2 rounded-xl transition-colors hover:bg-[#E6EAED]
                                                     ${isActive ? "bg-[#E6EAED]" : ""}`}
                                                >
                                                    <Icon className="mr-2 h-5 w-5" />
                                                    {label}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}