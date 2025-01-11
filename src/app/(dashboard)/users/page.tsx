"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import UsersTable from "@/components/users/UsersTable";
import UserFilters, {FilterOptions, SortOptions} from "@/components/users/UserFilters";
import type { User } from "@/types/user";

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    status: '',
    subscriptionPlan: '',
    hasAffiliation: '',
  });
  const [sort, setSort] = useState<SortOptions>({
    field: 'date_joined',
    direction: 'desc',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://bookiz-back-pk3wl.ondigitalocean.app/api/v1/data/analytics/users', {
        headers: {
          'accept': 'application/json',
          'X-CSRFToken': 'T6FuCE7CQSjFmI0smDwvvvFxNFrH7myjPphIeYLFeeEMWO97whAWBIJxRN0cUsTo'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchUsers}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Users</h1>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex w-full max-w-lg">
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="search"
              placeholder="Search by name, email, or business..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-md border border-gray-200 py-2 pl-10 pr-3 text-sm
                       placeholder:text-gray-500 focus:border-primary-500 focus:outline-none
                       focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>

        <UserFilters
          onFilterChange={setFilters}
          onSortChange={setSort}
        />
      </div>

      <UsersTable
        users={users}
        searchQuery={searchQuery}
        filters={filters}
        sort={sort}
      />
    </div>
  );
}
