"use client";

import { useState, useEffect } from "react";
import { useQueryState, useQueryStates, parseAsString, parseAsStringLiteral } from 'nuqs'
import { Search, RotateCcw, Check } from "lucide-react";
import UsersTable from "@/components/users/UsersTable";
import UserFilters, { FilterOptions, SortOptions } from "@/components/users/UserFilters";
import type { User } from "@/types/user";
import MobileFilters from "@/components/users/MobileFilters";
import { useFilteredUsers } from '@/hooks/useFilteredUsers';

// Define parsers for the filter and sort states
const filterParsers = {
  status: parseAsString.withDefault(''),
  subscriptionPlan: parseAsString.withDefault(''),
  hasAffiliation: parseAsString.withDefault(''),
  hasPaymentToken: parseAsString.withDefault(''),
  subscriptionStatus: parseAsString.withDefault(''),
  futureAppointments: parseAsString.withDefault(''),
};

const sortParsers = {
  field: parseAsString.withDefault('date_joined'),
  direction: parseAsStringLiteral(['asc', 'desc'] as const).withDefault('desc'),
};

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useQueryState('q', parseAsString.withDefault(''));
  const [filters, setFilters] = useQueryStates(filterParsers);
  const [sort, setSort] = useQueryStates(sortParsers);

  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleReset = () => {
    setSearchQuery(null);
    setFilters({
      status: '',
      subscriptionPlan: '',
      hasAffiliation: '',
      hasPaymentToken: '',
      subscriptionStatus: '',
      futureAppointments: '',
    });
    setSort({
      field: 'date_joined',
      direction: 'desc',
    });
  };

  const filteredUsers = useFilteredUsers(users, searchQuery ?? '', filters);

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
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-lg font-medium bg-primary-100 text-primary-800">
            {filteredUsers.length}
            {filteredUsers.length !== users.length && (
              <span className="ml-1 text-sm text-primary-600">/ {users.length}</span>
            )}
          </span>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-2.5 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-gray-600"
            disabled={Object.values(filters).every(value => value === '')}
          >
            {Object.values(filters).some(value => value !== '') ? (
              <>
                <RotateCcw className="w-4 h-4" />
                <span>Reset Filters</span>
              </>
            ) : (
              <>
                <RotateCcw className="w-4 h-4" />
                <span>No Filters</span>
              </>
            )}
          </button>
        </div>
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
              value={searchQuery ?? ''}
              onChange={(e) => setSearchQuery(e.target.value || null)}
              className="block w-full rounded-md border border-gray-200 py-2 pl-10 pr-3 text-sm
                       placeholder:text-gray-500 focus:border-primary-500 focus:outline-none
                       focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>

        <MobileFilters
          onFilterChange={(newFilters) => {
            setFilters(newFilters);
          }}
          onSortChange={(newSort) => {
            setSort(newSort);
          }}
          onReset={handleReset}
        />

        <div className="hidden md:block">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <UserFilters
                onFilterChange={(newFilters) => {
                  setFilters(newFilters);
                }}
                onSortChange={(newSort) => {
                  setSort(newSort);
                }}
              />
            </div>
            <button
              onClick={handleReset}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg"
              title="Reset all filters"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <UsersTable
        users={filteredUsers}
        searchQuery={searchQuery ?? ''}
        filters={filters}
        sort={sort}
        onSortChange={setSort}
      />
    </div>
  );
}
