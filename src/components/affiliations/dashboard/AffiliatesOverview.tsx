'use client';

import { motion } from 'framer-motion';
import { Users, Building2, DollarSign, TrendingUp } from 'lucide-react';
import type { AffiliationsDashboard } from '@/types/affiliationsDashboard';

interface AffiliatesOverviewProps {
  data: AffiliationsDashboard;
}

export default function AffiliatesOverview({ data }: AffiliatesOverviewProps) {
  const stats = [
    {
      title: 'Total Affiliates',
      value: data.count_affiliates,
      icon: Users,
      color: 'blue',
      description: 'Active affiliate partners'
    },
    {
      title: 'Referred Businesses',
      value: data.count_referred_businesses,
      icon: Building2,
      color: 'green',
      description: 'Total businesses referred'
    },
    {
      title: 'Total Value',
      value: `₪${data.total_value_referred_businesses.toLocaleString()}`,
      icon: DollarSign,
      color: 'purple',
      description: 'Value of referrals'
    },
    {
      title: 'Conversion Rate',
      value: `${Math.round((data.count_referred_businesses / data.count_affiliates) * 100)}%`,
      icon: TrendingUp,
      color: 'pink',
      description: 'Avg. referrals per affiliate'
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-lg p-6 relative overflow-hidden"
        >
          <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 bg-${stat.color}-500`} />
          
          <stat.icon className={`h-8 w-8 text-${stat.color}-500 mb-4`} />
          
          <p className="text-sm font-medium text-gray-500">{stat.title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
          <p className="mt-1 text-sm text-gray-500">{stat.description}</p>
        </motion.div>
      ))}
    </div>
  );
} 