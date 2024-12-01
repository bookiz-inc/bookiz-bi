"use client";

import { useState } from 'react';
import { Filter, SortAsc, SortDesc } from 'lucide-react';

interface UserFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  onSortChange: (sort: SortOptions) => void;
}

export interface FilterOptions {
  status: string;
  subscriptionPlan: string;
  hasAffiliation: string;
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

export default function UserFilters({ onFilterChange, onSortChange }: UserFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    status: '',
    subscriptionPlan: '',
    hasAffiliation: '',
  });

  const [sort, setSort] = useState<SortOptions>({
    field: 'date_joined',
    direction: 'desc',
  });

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (field: string) => {
    const newSort: SortOptions = {
      field,
      direction: sort.field === field && sort.direction === 'asc' ? 'desc' : 'asc'
    };
    setSort(newSort);
    onSortChange(newSort);
  };

  return (
    <div className="flex flex-wrap gap-3 items-center text-black">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-gray-500" />
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="rounded-md border border-gray-200 py-2 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <select
          value={filters.subscriptionPlan}
          onChange={(e) => handleFilterChange('subscriptionPlan', e.target.value)}
          className="rounded-md border border-gray-200 py-2 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          <option value="">All Plans</option>
          <option value="monthly">Monthly</option>
          <option value="annual">Annual</option>
          {/* <option value="trial">Trial</option> */}
        </select>

        <select
          value={filters.hasAffiliation}
          onChange={(e) => handleFilterChange('hasAffiliation', e.target.value)}
          className="rounded-md border border-gray-200 py-2 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          <option value="">All Affiliations</option>
          <option value="true">With Affiliate</option>
          <option value="false">No Affiliate</option>
        </select>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <button
          onClick={() => handleSortChange('date_joined')}
          className="inline-flex items-center px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50"
        >
          {sort.field === 'date_joined' ? (
            sort.direction === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
          ) : (
            <SortAsc className="h-4 w-4" />
          )}
          <span className="ml-2">Join Date</span>
        </button>

        <button
          onClick={() => handleSortChange('future_appointments')}
          className="inline-flex items-center px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50"
        >
          {sort.field === 'future_appointments' ? (
            sort.direction === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
          ) : (
            <SortAsc className="h-4 w-4" />
          )}
          <span className="ml-2">Appointments</span>
        </button>
      </div>
    </div>
  );
}