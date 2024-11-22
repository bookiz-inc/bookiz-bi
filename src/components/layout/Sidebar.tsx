"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import Image from 'next/image';
import {
    LayoutDashboard,
    Users,
    BarChart3,
    Settings,
} from "lucide-react";
import React from "react";

// Define navigation items type
type NavItem = {
    name: string;
    href: string;
    icon: React.ComponentType;
}

// Navigation items array
const navigation: NavItem[] = [
    {name: "Dashboard", href: "/", icon: LayoutDashboard},
    {name: "Users", href: "/users", icon: Users},
    {name: "Analytics", href: "/analytics", icon: BarChart3},
    {name: "Settings", href: "/settings", icon: Settings},
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
            <div className="flex flex-col flex-grow border-r border-gray-200 bg-white pt-5 pb-4">
                <div className="flex items-center flex-shrink-0 px-4">
                    <Image
                        src="/images/bookiz-logo.png"  // Put your logo in the public/images folder
                        alt="Bookiz Logo"
                        width={32}
                        height={32}
                    />
                    <span className="ml-3 text-xl font-bold">Bookiz</span>
                </div>

                <div className="mt-8 flex-grow flex flex-col">
                    <nav className="flex-1 space-y-1 px-2" aria-label="Sidebar">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`
                      group flex items-center px-4 py-2 text-sm font-medium rounded-md
                      ${isActive
                                        ? 'bg-primary-50 text-primary-600'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                    `}
                                >
                                    <Icon
                                        className={`
                        mr-3 h-5 w-5 flex-shrink-0
                        ${isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'}
                      `}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* User profile section */}
                <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                    <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary-200"/>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700">Admin User</p>
                            <p className="text-xs font-medium text-gray-500">admin@bookiz.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
