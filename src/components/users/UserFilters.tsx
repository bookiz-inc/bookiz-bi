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
  subscriptionStatus: string;
  hasAffiliation: string;
  hasPaymentToken: string;
  futureAppointments: string;
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

export default function UserFilters({ onFilterChange, onSortChange }: UserFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    status: '',
    subscriptionPlan: '',
    subscriptionStatus: '',
    hasAffiliation: '',
    hasPaymentToken: '',
    futureAppointments: '',
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
    <>
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:flex-wrap sm:gap-2 sm:items-center">
        <div className="w-full sm:w-auto flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="h-4 w-4 text-gray-500 hidden sm:block" />
            <select
              value={filters.futureAppointments}
              onChange={(e) => handleFilterChange('futureAppointments', e.target.value)}
              className="w-full sm:w-auto rounded-md border border-gray-200 py-2 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              <option value="">All Appointments</option>
              <option value="true">Has Future Appointments</option>
              <option value="false">No Future Appointments</option>
            </select>
          </div>

          <select
            value={filters.subscriptionStatus}
            onChange={(e) => handleFilterChange('subscriptionStatus', e.target.value)}
            className="w-full sm:w-auto rounded-md border border-gray-200 py-2 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="">All Subscription Status</option>
            <option value="ACTIVE">Active</option>
            <option value="TRIAL">Trial</option>
            <option value="EXPIRED">Expired</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="PENDING">Pending</option>
          </select>

          <select
            value={filters.hasPaymentToken}
            onChange={(e) => handleFilterChange('hasPaymentToken', e.target.value)}
            className="w-full sm:w-auto rounded-md border border-gray-200 py-2 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="">All Payment Methods</option>
            <option value="true">Has Payment Method</option>
            <option value="false">No Payment Method</option>
          </select>

          <select
            value={filters.subscriptionPlan}
            onChange={(e) => handleFilterChange('subscriptionPlan', e.target.value)}
            className="w-full sm:w-auto rounded-md border border-gray-200 py-2 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="">All Plans</option>
            <option value="MONTHLY">Monthly</option>
            <option value="YEARLY">Yearly</option>
          </select>

          <select
            value={filters.hasAffiliation}
            onChange={(e) => handleFilterChange('hasAffiliation', e.target.value)}
            className="w-full sm:w-auto rounded-md border border-gray-200 py-2 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="">All Affiliations</option>
            <option value="true">With Affiliate</option>
            <option value="false">No Affiliate</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full sm:w-auto rounded-md border border-gray-200 py-2 px-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="">All Access Status</option>
            <option value="verified">Has System Access</option>
            <option value="unverified">No System Access</option>
          </select>
        </div>

      </div>
      <div className="flex flex-col pt-2 space-y-4 sm:space-y-0 sm:flex-row sm:flex-wrap sm:gap-2 sm:items-center">
        <div className="w-full sm:w-auto flex items-center gap-2">
          <button
            onClick={() => handleSortChange('date_joined')}
            className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50"
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
            className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50"
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
    </>
  );
}