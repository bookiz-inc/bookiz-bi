'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal, X, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type SortField = 'name' | 'clicks' | 'joined' | 'tier';
export type SortOrder = 'asc' | 'desc';
export type TierFilter = 'ALL' | 'PLATINUM' | 'GOLD' | 'SILVER' | 'BRONZE';

interface FiltersState {
  search: string;
  tier: TierFilter;
  sortBy: SortField;
  sortOrder: SortOrder;
  hasLink: boolean | null;
  hasSocial: boolean | null;
}

interface AffiliatesFiltersProps {
  onFiltersChange: (filters: FiltersState) => void;
  totalAffiliates: number;
}

export default function AffiliatesFilters({ onFiltersChange, totalAffiliates }: AffiliatesFiltersProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FiltersState>({
    search: '',
    tier: 'ALL',
    sortBy: 'name',
    sortOrder: 'asc',
    hasLink: null,
    hasSocial: null,
  });

  const handleFilterChange = (updates: Partial<FiltersState>) => {
    const newFilters = { ...filters, ...updates };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters: FiltersState = {
      search: '',
      tier: 'ALL',
      sortBy: 'name',
      sortOrder: 'asc',
      hasLink: null,
      hasSocial: null,
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const toggleSort = (field: SortField) => {
    if (filters.sortBy === field) {
      handleFilterChange({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' });
    } else {
      handleFilterChange({ sortBy: field, sortOrder: 'asc' });
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters Toggle */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleFilterChange({ search: e.target.value })}
            placeholder="Search affiliates..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className={`flex items-center px-4 py-2 rounded-lg border ${
              isFiltersOpen ? 'bg-primary-50 border-primary-200 text-primary-700' : 'border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <SlidersHorizontal className="h-5 w-5 mr-2" />
            Filters
          </button>
          {Object.values(filters).some(value => 
            value !== null && value !== '' && value !== 'ALL' && value !== 'name' && value !== 'asc'
          ) && (
            <button
              onClick={clearFilters}
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-200"
            >
              <X className="h-5 w-5 mr-2" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {isFiltersOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-white rounded-lg border border-gray-200 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Tier Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tier</label>
                  <select
                    value={filters.tier}
                    onChange={(e) => handleFilterChange({ tier: e.target.value as TierFilter })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="ALL">All Tiers</option>
                    <option value="PLATINUM">Platinum</option>
                    <option value="GOLD">Gold</option>
                    <option value="SILVER">Silver</option>
                    <option value="BRONZE">Bronze</option>
                  </select>
                </div>

                {/* Link Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link Status</label>
                  <select
                    value={filters.hasLink === null ? '' : filters.hasLink.toString()}
                    onChange={(e) => handleFilterChange({ 
                      hasLink: e.target.value === '' ? null : e.target.value === 'true'
                    })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Any</option>
                    <option value="true">Has Link</option>
                    <option value="false">No Link</option>
                  </select>
                </div>

                {/* Social Media Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Social Media</label>
                  <select
                    value={filters.hasSocial === null ? '' : filters.hasSocial.toString()}
                    onChange={(e) => handleFilterChange({ 
                      hasSocial: e.target.value === '' ? null : e.target.value === 'true'
                    })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Any</option>
                    <option value="true">Has Social Media</option>
                    <option value="false">No Social Media</option>
                  </select>
                </div>
              </div>

              {/* Sort Options */}
              <div className="border-t pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { field: 'name' as SortField, label: 'Name' },
                    { field: 'clicks' as SortField, label: 'Clicks' },
                    { field: 'joined' as SortField, label: 'Join Date' },
                    { field: 'tier' as SortField, label: 'Tier' },
                  ].map(({ field, label }) => (
                    <button
                      key={field}
                      onClick={() => toggleSort(field)}
                      className={`flex items-center px-3 py-1.5 rounded-md text-sm ${
                        filters.sortBy === field
                          ? 'bg-primary-50 text-primary-700 border border-primary-200'
                          : 'text-gray-600 hover:bg-gray-50 border border-gray-200'
                      }`}
                    >
                      {label}
                      {filters.sortBy === field && (
                        <ArrowUpDown className={`ml-1.5 h-4 w-4 ${
                          filters.sortOrder === 'asc' ? 'transform rotate-180' : ''
                        }`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Count */}
      <div className="text-sm text-gray-500">
        Showing {totalAffiliates} affiliate{totalAffiliates !== 1 ? 's' : ''}
      </div>
    </div>
  );
} 