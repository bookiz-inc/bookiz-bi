'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Gift, Calendar, Tag, AlertCircle, RefreshCcw } from 'lucide-react';
import type { UserAffiliation } from '@/types/userAffiliation';

interface UserAffiliationProps {
  userId: string;
}

export default function UserAffiliation({ userId }: UserAffiliationProps) {
  const [affiliation, setAffiliation] = useState<UserAffiliation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  const fetchAffiliation = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      setIsRetrying(false);

      const response = await fetch(
        `https://bookiz-back-pk3wl.ondigitalocean.app/api/v1/data/analytics/users/${userId}/affiliate`,
        {
          headers: {
            'accept': 'application/json',
            'X-CSRFToken': 'hKPQVdOvNOrxzzVxW9wMvRVIf25cb3KIqfShekjjfg0JX8O5m7iG3zCAR0bKza9X'
          }
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          setAffiliation(null);
          return;
        }
        throw new Error(`Failed to fetch affiliation data: ${response.statusText}`);
      }

      const data = await response.json();
      setAffiliation(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch affiliation data');
      console.error('Error fetching affiliation:', err);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchAffiliation();
  }, [fetchAffiliation]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to Load Affiliation Data</h3>
          <p className="text-sm text-gray-500 mb-4">{error}</p>
          <button
            onClick={() => {
              setIsRetrying(true);
              fetchAffiliation();
            }}
            disabled={isRetrying}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCcw className={`mr-2 h-4 w-4 ${isRetrying ? 'animate-spin' : ''}`} />
            {isRetrying ? 'Retrying...' : 'Try Again'}
          </button>
        </div>
      </motion.div>
    );
  }

  if (!affiliation) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            className="text-5xl mb-4"
          >
            🌟
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Direct Registration
            </h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              This user discovered Bookiz directly and registered without a referral code.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6"
          >

          </motion.div>
        </div>
      </motion.div>
    );
  }

  // ... rest of the component for displaying affiliation data ...
  const formattedDate = new Date(affiliation.referral_date).toLocaleDateString('he-IL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-6"
    >
      <div className="flex items-center space-x-2 mb-6">
        <Gift className="h-5 w-5 text-purple-500" />
        <h3 className="text-lg font-medium text-gray-900">Referral Information</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-start space-x-3"
        >
          <div className="bg-purple-100 rounded-full p-2">
            <UserCheck className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Referred By</p>
            <p className="text-sm font-medium text-gray-900">{affiliation.referred_by_name}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-start space-x-3"
        >
          <div className="bg-blue-100 rounded-full p-2">
            <Tag className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Referral Code</p>
            <p className="text-sm font-medium text-gray-900">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {affiliation.referral_code}
              </span>
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-start space-x-3 md:col-span-2"
        >
          <div className="bg-green-100 rounded-full p-2">
            <Calendar className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Referral Date</p>
            <p className="text-sm font-medium text-gray-900" dir="rtl">{formattedDate}</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 pt-6 border-t border-gray-100"
      >
        <a
          href={`/affiliations/${affiliation.referred_by}`}
          className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700"
        >
          View Affiliate Details
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </motion.div>
    </motion.div>
  );
}
