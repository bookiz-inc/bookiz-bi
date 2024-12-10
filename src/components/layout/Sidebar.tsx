"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {useUser, useClerk} from "@clerk/nextjs";
import {useState} from "react";
import Image from 'next/image';
import {
    LayoutDashboard,
    Users,
    BarChart3,
    Settings,
    LogOut,
    Menu,
    X,
    LinkIcon,
    ChevronDown,
    ChevronRight,
    File,
    CreditCard,
    Table
} from "lucide-react";

const navigation = [
    {
        name: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
    },
    {
        name: "Users",
        href: "/users",
        icon: Users,
    },
    {
        name: "Subscriptions",
        icon: CreditCard,
        subItems: [
            {name: "Dashboard", href: "/subscriptions/dashboard" , icon: BarChart3},
            {name: "Plans Manager", href: "/subscriptions/plans" , icon: Table}
        ]
    },
    {
        name: "Affiliations",
        href: "/affiliations/dashboard",
        icon: LinkIcon,
        subItems: [
            {
                name: "Overview",
                href: "/affiliations/dashboard",
                icon: BarChart3,
            },
            {
                name: "All Affiliates",
                href: "/affiliations",
                icon: Users,
            },
            {
                name: "Affiliate Signup",
                href: "/affiliate-signup",
                icon: File,
            }
        ]
    },
    {
        name: "Analytics",
        href: "/analytics",
        icon: BarChart3,
    },
    {
        name: "Settings",
        href: "/settings",
        icon: Settings,
    },
];

export default function Sidebar() {
    const pathname = usePathname();
    const {user} = useUser();
    const {signOut} = useClerk();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    const toggleExpanded = (itemName: string) => {
        setExpandedItems(prev =>
            prev.includes(itemName)
                ? prev.filter(item => item !== itemName)
                : [...prev, itemName]
        );
    };

    const renderNavItem = (item: any, isMobile: boolean = false) => {
        const isActive = pathname === item.href ||
            (item.subItems?.some((subItem: any) => pathname === subItem.href));
        const isExpanded = expandedItems.includes(item.name);
        const hasSubItems = item.subItems && item.subItems.length > 0;
        const Icon = item.icon;

        return (
            <div key={item.name} className="space-y-1">
                {hasSubItems ? (
                    <button
                        onClick={() => toggleExpanded(item.name)}
                        className={`
              w-full group flex items-center justify-between px-4 py-2 text-sm font-medium rounded-md
              transition-colors duration-150 ease-in-out
              ${isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
            `}
                    >
                        <div className="flex items-center">
                            <Icon
                                className={`
                  mr-3 h-5 w-5 flex-shrink-0
                  transition-colors duration-150 ease-in-out
                  ${isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'}
                `}
                            />
                            <span>{item.name}</span>
                        </div>
                        {isExpanded ? (
                            <ChevronDown className="h-4 w-4 text-gray-400"/>
                        ) : (
                            <ChevronRight className="h-4 w-4 text-gray-400"/>
                        )}
                    </button>
                ) : (
                    <Link
                        href={item.href}
                        onClick={() => isMobile && setIsMobileMenuOpen(false)}
                        className={`
              group flex items-center px-4 py-2 text-sm font-medium rounded-md
              transition-colors duration-150 ease-in-out
              ${isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
            `}
                    >
                        <Icon
                            className={`
                mr-3 h-5 w-5 flex-shrink-0
                transition-colors duration-150 ease-in-out
                ${isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'}
              `}
                        />
                        {item.name}
                    </Link>
                )}

                {/* Sub-items */}
                {hasSubItems && isExpanded && (
                    <div className="ml-4 space-y-1">
                        {item.subItems.map((subItem: any) => {
                            const isSubItemActive = pathname === subItem.href;
                            return (
                                <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    onClick={() => isMobile && setIsMobileMenuOpen(false)}
                                    className={`
                    group flex items-center pl-9 pr-4 py-2 text-sm font-medium rounded-md
                    ${isSubItemActive
                                        ? 'bg-primary-50 text-primary-600'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                  `}
                                >
                                    <subItem.icon
                                        className={`
                      mr-3 h-4 w-4
                      ${isSubItemActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'}
                    `}
                                    />
                                    {subItem.name}
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            {/* Mobile menu button */}
            <div className="lg:hidden fixed top-0 left-0 w-full bg-white border-b border-gray-200 px-4 py-3 z-50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center flex-shrink-0 px-4">
                        <Image
                            src="/images/bookiz-logo.png"
                            alt="Bookiz Logo"
                            width={32}
                            height={32}
                        />
                        <span className="ml-3 text-xl font-bold text-black">Bookiz</span>
                    </div>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6"/>
                        ) : (
                            <Menu className="h-6 w-6"/>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile menu overlay */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-gray-600 bg-opacity-75 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile menu */}
            <div className={`
        lg:hidden fixed inset-y-0 left-0 w-72 bg-white transform 
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        transition-transform duration-300 ease-in-out z-50
      `}>
                <div className="flex flex-col h-full">
                    <div className="flex-1 overflow-y-auto pt-16">
                        <nav className="px-4 space-y-1">
                            {navigation.map(item => renderNavItem(item, true))}
                        </nav>
                    </div>

                    {/* Mobile user profile */}
                    <div className="border-t border-gray-200 p-4">
                        <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-primary-200 overflow-hidden">
                                {user?.imageUrl && (
                                    <img
                                        src={user.imageUrl}
                                        alt="Profile"
                                        className="h-full w-full object-cover"
                                    />
                                )}
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-700">{user?.fullName}</p>
                                <p className="text-xs text-gray-500">{user?.primaryEmailAddress?.emailAddress}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => signOut()}
                            className="mt-4 w-full flex items-center px-4 py-2 text-sm font-medium text-gray-600
                   hover:bg-gray-50 hover:text-gray-900 rounded-md"
                        >
                            <LogOut className="mr-3 h-5 w-5 text-gray-400"/>
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>

            {/* Desktop sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
                <div className="flex flex-col flex-grow border-r border-gray-200 bg-white pt-5">
                    {/* Logo */}
                    <div className="flex items-center flex-shrink-0 px-4">
                        <Image
                            src="/images/bookiz-logo.png"
                            alt="Bookiz Logo"
                            width={32}
                            height={32}
                        />
                        <span className="ml-3 text-xl font-bold text-black">Bookiz</span>
                    </div>

                    {/* Navigation */}
                    <div className="mt-8 flex-grow flex flex-col">
                        <nav className="flex-1 space-y-1 px-2">
                            {navigation.map(item => renderNavItem(item))}
                        </nav>
                    </div>

                    {/* Desktop user profile */}
                    <div className="flex-shrink-0 border-t border-gray-200">

                        <div className="flex items-center p-4">
                            <div className="h-8 w-8 rounded-full bg-primary-200 overflow-hidden">
                                {user?.imageUrl && (
                                    <img
                                        src={user.imageUrl}
                                        alt="Profile"
                                        className="h-full w-full object-cover"
                                    />
                                )}
                            </div>
                            <div className="ml-3 min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-700 truncate">
                                    {user?.fullName || 'Loading...'}
                                </p>
                                <p className="text-xs font-medium text-gray-500 truncate">
                                    {user?.primaryEmailAddress?.emailAddress || 'Loading...'}
                                </p>
                            </div>
                        </div>

                        {/* Sign Out Button */}
                        <button
                            onClick={() => signOut()}
                            className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-600
                   hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150 ease-in-out"
                        >
                            <LogOut className="mr-3 h-5 w-5 text-gray-400"/>
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
