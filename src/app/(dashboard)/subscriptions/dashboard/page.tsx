'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, CreditCard, DollarSign, TrendingUp, RefreshCw, AlertCircle } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import RevenueMetricsCard from '@/components/subscriptions/RevenueMetricsCard';
import PaymentMetricsCard from '@/components/subscriptions/PaymentMetricsCard';
import type { SubscriptionAnalytics } from '@/types/subscriptionAnalytics';

export default function SubscriptionsDashboardPage() {
  const [data, setData] = useState<SubscriptionAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchAnalytics = async () => {
    try {
      setIsRefreshing(true);
      const response = await fetch('https://api.bookiz.co.il/api/v1/subscriptions/analytics/', {
        headers: {
          'accept': 'application/json',
          'X-CSRFToken': 'FyiDzYhXY91aqIBcVQuBrhjsufirmwnrhuwlLcyv1COxsm2X2wbRdta6AIzIWLgz'
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch analytics');
      
      const jsonData = await response.json();
      setData(jsonData);
      setError(null);
    } catch (error) {
      setError('Failed to load subscription analytics');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <RefreshCw className="h-8 w-8 text-primary-600 animate-spin" />
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
            onClick={fetchAnalytics}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Subscriptions</h1>
          <p className="mt-1 text-sm text-gray-500">
            Overview of subscription metrics and revenue
          </p>
        </div>
        <button
          onClick={fetchAnalytics}
          className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Active Subscriptions"
          value={data.subscription_metrics.active_count}
          icon={Users}
          description="Current active subscribers"
          color="blue"
        />
        <StatsCard
          title="Trial Users"
          value={data.subscription_metrics.trial_count}
          icon={Users}
          description="Users in trial period"
          color="yellow"
        />
        <StatsCard
          title="Payment Methods"
          value={data.subscription_metrics.users_with_token}
          icon={CreditCard}
          description="Users with saved payment"
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueMetricsCard metrics={data.revenue_metrics} />
        <PaymentMetricsCard metrics={data.payment_metrics} />
      </div>
    </motion.div>
  );
} 