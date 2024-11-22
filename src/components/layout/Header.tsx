import { Bell, Search } from "lucide-react";

import UserMenu from "./UserMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
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
                         placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative rounded-full p-2 hover:bg-gray-100">
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
            <Bell className="h-5 w-5 text-gray-500" />
          </button>

          <UserMenu />
        </div>
      </div>
    </header>
  );
}