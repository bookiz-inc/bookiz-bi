'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, AlertCircle } from 'lucide-react';
import type { UpcomingTrials } from '@/types/subscriptionTrials';
import TrialExpirationSection from '@/components/subscriptions/trials/TrialExpirationSection';

const API_URL = 'https://api.bookiz.co.il/api/v1/subscriptions/trials/upcoming/'

export default function TrialsPage() {
  const [data, setData] = useState<UpcomingTrials | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchTrials = async () => {
    try {
      setIsRefreshing(true);
      const response = await fetch(API_URL, {
        headers: {
          'accept': 'application/json',
          'X-CSRFToken': 'NMQbDUuz0tAvYnlmykOKqFZsHECmkQH9KRZWQipBsA3NdBs4X67IQoanG3y2fmcU'
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch trials');
      
      const jsonData = await response.json();
      setData(jsonData);
      setError(null);
    } catch (error) {
      setError('Failed to load trial data');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTrials();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <RefreshCw className="h-8 w-8 text-primary-600 animate-spin" />
          <p className="text-sm text-gray-500">Loading trial data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <AlertCircle className="h-8 w-8 text-red-600" />
          <p className="text-gray-600">{error}</p>
          <button
            onClick={fetchTrials}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const totalTrials = data.next_24_hours.length + data.next_48_hours.length + data.next_week.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Upcoming Trial Expirations</h1>
          <p className="mt-1 text-sm text-gray-500">
            {totalTrials} {totalTrials === 1 ? 'trial' : 'trials'} expiring soon
          </p>
        </div>
        <button
          onClick={fetchTrials}
          className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      <div className="space-y-6">
        <TrialExpirationSection
          title="Expiring in 24 Hours"
          trials={data.next_24_hours}
          urgency="high"
        />
        <TrialExpirationSection
          title="Expiring in 48 Hours"
          trials={data.next_48_hours}
          urgency="medium"
        />
        <TrialExpirationSection
          title="Expiring Next Week"
          trials={data.next_week}
          urgency="low"
        />
      </div>
    </motion.div>
  );
}