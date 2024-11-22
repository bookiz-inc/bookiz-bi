"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import UsersTable from "@/components/users/UsersTable";
import UserFilters from "@/components/users/UserFilters";

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Users</h1>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="flex w-full max-w-lg">
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="search"
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-md border border-gray-200 py-2 pl-10 pr-3 text-sm 
                       placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <UserFilters />
      </div>

      <UsersTable searchQuery={searchQuery} />
    </div>
  );
}