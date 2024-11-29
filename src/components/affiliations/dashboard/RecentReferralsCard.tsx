'use client';

import { motion } from 'framer-motion';
import { Clock, CheckCircle, XCircle, Crown } from 'lucide-react';
import type { Affiliation } from '@/types/affiliation';
import type { ReferredBusiness } from '@/types/affiliationsDashboard';

interface RecentReferralsCardProps {
  affiliates: Affiliation[];
  referredBusinesses: ReferredBusiness[];
}

export default function RecentReferralsCard({ affiliates, referredBusinesses }: RecentReferralsCardProps) {
  // Get last 5 referrals and match with affiliate data
  const recentReferrals = referredBusinesses
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)
    .map(referral => ({
      ...referral,
      affiliate: affiliates.find(a => a.id === referral.affiliate)
    }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center space-x-2 mb-6">
        <Clock className="h-6 w-6 text-blue-500" />
        <h2 className="text-lg font-medium text-gray-900">Recent Referrals</h2>
      </div>

      <div className="space-y-4">
        {recentReferrals.map((referral, index) => (
          <motion.div
            key={referral.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-lg">
                  {referral.affiliate?.first_name.charAt(0)}
                  {referral.affiliate?.last_name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {referral.affiliate?.first_name} {referral.affiliate?.last_name}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(referral.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                {referral.business.slice(0, 8)}...
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 