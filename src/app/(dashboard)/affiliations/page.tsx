'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import AffiliatesTable from '@/components/affiliations/AffiliationsTable';
import type { Affiliation } from '@/types/affiliation';

export default function AffiliationsPage() {
  const [affiliates, setAffiliates] = useState<Affiliation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAffiliates = async () => {
      try {
        const response = await fetch('https://api.bookiz.co.il/api/v1/affiliates/bi/table', {
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
      <AffiliatesTable affiliates={affiliates} />
    </div>
  );
}