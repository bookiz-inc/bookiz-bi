'use client';

import { motion } from 'framer-motion';
import { Trophy, Users, Award } from 'lucide-react';
import type { Affiliation } from '@/types/affiliation';
import type { ReferredBusiness } from '@/types/affiliationsDashboard';

interface TopAffiliatesCardProps {
  affiliates: Affiliation[];
  referredBusinesses: ReferredBusiness[];
}

export default function TopAffiliatesCard({ affiliates, referredBusinesses }: TopAffiliatesCardProps) {
  // Calculate referral counts for each affiliate
  const referralCounts = affiliates.map(affiliate => ({
    ...affiliate,
    referralCount: referredBusinesses.filter(rb => String(rb.affiliate) === affiliate.id).length
  })).sort((a, b) => b.referralCount - a.referralCount).slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center space-x-2 mb-6">
        <Trophy className="h-6 w-6 text-yellow-500" />
        <h2 className="text-lg font-medium text-gray-900">Top Affiliates</h2>
      </div>

      <div className="space-y-4">
        {referralCounts.map((affiliate, index) => (
          <motion.div
            key={affiliate.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index === 0 ? 'bg-yellow-100' : 
                index === 1 ? 'bg-gray-100' : 
                index === 2 ? 'bg-orange-100' : 'bg-blue-100'
              }`}>
                {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : <Users className="h-4 w-4" />}
              </div>
              <div>
                <p className="font-medium text-gray-900">{affiliate.first_name} {affiliate.last_name}</p>
                <p className="text-sm text-gray-500">{affiliate.alias}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">{affiliate.referralCount}</p>
                <p className="text-sm text-gray-500">referrals</p>
              </div>
              <Award className={`h-5 w-5 ${
                index === 0 ? 'text-yellow-500' : 
                index === 1 ? 'text-gray-500' : 
                index === 2 ? 'text-orange-500' : 'text-blue-500'
              }`} />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 
