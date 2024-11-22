"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Settings,
  BookOpen,
  LogOut
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
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
      <div className="flex flex-col flex-grow border-r border-gray-200 bg-white pt-5">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 px-4">
          <BookOpen className="h-8 w-8 text-primary-600" />
          <span className="ml-3 text-xl font-bold text-gray-900">Bookiz</span>
        </div>

        {/* Navigation */}
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
                    transition-colors duration-150 ease-in-out
                    ${isActive 
                      ? 'bg-primary-50 text-primary-600' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                  `}
                >
                  <Icon
                    className={`
                      mr-3 h-5 w-5 flex-shrink-0
                      transition-colors duration-150 ease-in-out
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

        {/* User Profile and Sign Out */}
        <div className="flex-shrink-0 border-t border-gray-200">
          <div className="flex items-center p-4">
            <div className="h-8 w-8 rounded-full bg-primary-200 overflow-hidden">
              {user?.profileImageUrl && (
                <img 
                  src={user.profileImageUrl} 
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
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150 ease-in-out"
          >
            <LogOut className="mr-3 h-5 w-5 text-gray-400" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}