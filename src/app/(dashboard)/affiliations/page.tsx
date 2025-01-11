'use client';

import { useEffect, useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import AffiliatesTable from '@/components/affiliations/AffiliationsTable';
import AffiliatesFilters, { SortField, SortOrder, TierFilter } from '@/components/affiliations/AffiliatesFilters';
import type { Affiliation } from '@/types/affiliation';

interface FilterState {
  search: string;
  tier: TierFilter;
  sortBy: SortField;
  sortOrder: SortOrder;
  hasLink: boolean | null;
  hasSocial: boolean | null;
}

export default function AffiliationsPage() {
  const [affiliates, setAffiliates] = useState<Affiliation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    tier: 'ALL',
    sortBy: 'name',
    sortOrder: 'asc',
    hasLink: null,
    hasSocial: null,
  });

  useEffect(() => {
    const fetchAffiliates = async () => {
      try {
        const response = await fetch('https://bookiz-back-pk3wl.ondigitalocean.app/api/v1/affiliates/bi/table', {
          headers: {
            'accept': 'application/json',
            'X-CSRFToken': 'd0m3ye1Dr4TiX9awJjfpJkwpCpbBBZLGZC4rLduBr2axSNgCRggSELYxd1xiVidD'
          }
        });
        const data = await response.json();
        setAffiliates(data);
      } catch (error) {
        console.error('Error fetching affiliates:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAffiliates();
  }, []);

  const filteredAffiliates = useMemo(() => {
    let result = [...affiliates];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(affiliate =>
        affiliate.first_name.toLowerCase().includes(searchLower) ||
        affiliate.last_name.toLowerCase().includes(searchLower) ||
        affiliate.alias.toLowerCase().includes(searchLower) ||
        affiliate.email.toLowerCase().includes(searchLower)
      );
    }

    // Apply tier filter
    if (filters.tier !== 'ALL') {
      result = result.filter(affiliate => affiliate.tier === filters.tier);
    }

    // Apply link filter
    if (filters.hasLink !== null) {
      result = result.filter(affiliate =>
        filters.hasLink ? affiliate.link_data?.link : !affiliate.link_data?.link
      );
    }

    // Apply social media filter
    if (filters.hasSocial !== null) {
      result = result.filter(affiliate =>
        filters.hasSocial ? (affiliate.instagram || affiliate.facebook) : (!affiliate.instagram && !affiliate.facebook)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;

      switch (filters.sortBy) {
        case 'name':
          comparison = `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`);
          break;
        case 'clicks':
          comparison = (a.link_data?.clicks || 0) - (b.link_data?.clicks || 0);
          break;
        case 'joined':
          comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          break;
        case 'tier':
          const tierOrder = { PLATINUM: 4, GOLD: 3, SILVER: 2, BRONZE: 1 };
          comparison = (tierOrder[a.tier as keyof typeof tierOrder] || 0) -
                      (tierOrder[b.tier as keyof typeof tierOrder] || 0);
          break;
      }

      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [affiliates, filters]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Affiliates</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700">
          <Plus className="h-5 w-5 mr-2" />
          New Affiliate
        </button>
      </div>

      <AffiliatesFilters
        onFiltersChange={setFilters}
        totalAffiliates={filteredAffiliates.length}
      />

      <AffiliatesTable affiliates={filteredAffiliates} />
    </div>
  );
}
