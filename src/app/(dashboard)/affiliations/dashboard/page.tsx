'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AffiliatesOverview from '@/components/affiliations/dashboard/AffiliatesOverview';
import TopAffiliatesCard from '@/components/affiliations/dashboard/TopAffiliatesCard';
import RecentReferralsCard from '@/components/affiliations/dashboard/RecentReferralsCard';
import ReferralsTrendChart from '@/components/affiliations/dashboard/ReferralsTrendChart';
import type { AffiliationsDashboard } from '@/types/affiliationsDashboard';

export default function AffiliationsDashboardPage() {
  const [data, setData] = useState<AffiliationsDashboard | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('https://bookiz-back-pk3wl.ondigitalocean.app/api/v1/affiliates/bi/dashboard', {
          headers: {
            'accept': 'application/json',
            'X-CSRFToken': 'RbgHX04sWOuRIkldBtuEEXToB0Neu9Me0Gj8g7zgog336TeL1rgycFAgdYTMSgbt'
          }
        });
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-gray-900"
      >
        Affiliations Dashboard
      </motion.h1>

      <AffiliatesOverview data={data} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopAffiliatesCard affiliates={data.affiliates} referredBusinesses={data.referred_businesses} />
        <RecentReferralsCard
          referredBusinesses={data.referred_businesses}
          affiliates={data.affiliates}
        />
      </div>

      <ReferralsTrendChart
        referredBusinesses={data.referred_businesses}
        totalValue={data.total_value_referred_businesses}
      />
    </div>
  );
}
