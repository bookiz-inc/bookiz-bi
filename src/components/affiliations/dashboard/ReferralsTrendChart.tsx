'use client';

import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import type { ReferredBusiness } from '@/types/affiliationsDashboard';

interface ReferralsTrendChartProps {
  referredBusinesses: ReferredBusiness[];
  totalValue: number;
}

export default function ReferralsTrendChart({ referredBusinesses, totalValue }: ReferralsTrendChartProps) {
  // Prepare chart data
  const chartData = referredBusinesses.reduce((acc: any[], referral) => {
    const date = new Date(referral.created_at).toLocaleDateString();
    const existingDay = acc.find(item => item.date === date);
    
    if (existingDay) {
      existingDay.referrals += 1;
      existingDay.value += totalValue / referredBusinesses.length;
    } else {
      acc.push({
        date,
        referrals: 1,
        value: totalValue / referredBusinesses.length
      });
    }
    return acc;
  }, []).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="h-6 w-6 text-primary-600" />
        <h2 className="text-lg font-medium text-gray-900">Referrals Trend</h2>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#4F46E5" 
              fill="#4F46E5" 
              fillOpacity={0.1} 
            />
            <Area 
              type="monotone" 
              dataKey="referrals" 
              stroke="#10B981" 
              fill="#10B981" 
              fillOpacity={0.1} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
} 