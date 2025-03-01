"use client";

import { useState } from "react";
import { Bell, Search, ChevronDown, Settings, LogOut, File } from "lucide-react";
import { UserButton, useUser, useClerk } from "@clerk/nextjs";
import Image from 'next/image';

export default function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <header className="sticky top-0 lg:top-0 z-20 bg-white border-b border-gray-200 mt-14 lg:mt-0">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Search */}
        <div className="flex flex-1">
          <div className="flex w-full max-w-lg">
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                placeholder="Search..."
                className="block w-full rounded-md border border-gray-200 py-2 pl-10 pr-3 text-sm
                     placeholder:text-gray-500 focus:border-primary-500 focus:outline-none
                     focus:ring-1 focus:ring-primary-500"
              />
            </div>
          </div>
          
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
         

          {/* Bookiz App Link */}
          <a
            href="https://app.bookiz.co.il"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
          >
            <div className="relative w-8 h-8">
              <Image
                src="/images/bookiz-purple.png"
                alt="Bookiz"
                width={32}
                height={32}
              />
            </div>
            <span className="hidden sm:inline text-sm font-medium text-gray-700">
              Open Bookiz
            </span>
          </a>
          {/* Notifications */}
          <button className="relative rounded-full p-2 hover:bg-primary-50">
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary-600" />
            <Bell className="h-5 w-5 text-gray-500" />
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded-md"
            >
              <div className="h-8 w-8 rounded-full bg-primary-200 overflow-hidden relative">
                {user?.imageUrl && (
                  <Image
                    src={user.imageUrl}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                  }}
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Settings className="mr-3 h-4 w-4" />
                  Settings
                </button>
                <button
                  onClick={() => signOut()}
                  className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}