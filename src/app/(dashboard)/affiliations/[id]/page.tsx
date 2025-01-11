'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import AffiliateDetail from '@/components/affiliations/AffiliateDetail';
import type { AffiliateStats } from '@/types/affiliate-stats';

export default function AffiliateDetailPage() {
  const params = useParams();
  const [stats, setStats] = useState<AffiliateStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAffiliateStats = async () => {
      try {
        const response = await fetch(`https://bookiz-back-pk3wl.ondigitalocean.app/api/v1/affiliates/stats/id/${params.id}/`, {
          headers: {
            'accept': 'application/json',
            'X-CSRFToken': 'B685MGPC42wmfgWYTxVWKqFkqZTkNqqdnIQtZFiA40NBaU241uWpFR7s1Bf17JSa'
          }
        });
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching affiliate stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAffiliateStats();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">Affiliate not found</h2>
        <p className="mt-2 text-gray-500">The requested affiliate could not be found.</p>
      </div>
    );
  }

  return <AffiliateDetail stats={stats} />;
}
