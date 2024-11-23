'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Building2, 
  Calendar, 
  Briefcase, 
  RefreshCw,
  AlertCircle 
} from 'lucide-react';
import { fetchDashboardData } from '@/services/api';
import type { DashboardData } from '@/types/api';
import StatsCard from '@/components/dashboard/StatsCard';
import AffiliateTable from '@/components/dashboard/AffiliateTable';
import AverageMetricsCard from '@/components/dashboard/AverageMetricsCard';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setError(null);
      const newData = await fetchDashboardData();
      setData(newData);
    } catch (error) {
      setError('Failed to load dashboard data. Please try again.');
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadData();
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <RefreshCw className="h-8 w-8 text-primary-600 animate-spin" />
          <p className="text-gray-600">Loading dashboard data...</p>
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
            onClick={handleRefresh}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-8"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Overview of your business metrics and performance
          </p>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Users"
          value={data.general_counts.user_count}
          icon={Users}
          description="All registered users"
          color="blue"
        />
        <StatsCard
          title="Business Users"
          value={data.general_counts.business_user_count}
          icon={Building2}
          description="Active business accounts"
          color="green"
        />
        <StatsCard
          title="Total Appointments"
          value={data.general_counts.total_appointments_count}
          icon={Calendar}
          description="Scheduled appointments"
          color="purple"
        />
        <StatsCard
          title="Total Services"
          value={data.general_counts.total_services_count}
          icon={Briefcase}
          description="Available services"
          color="indigo"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Staff Members"
          value={data.general_counts.staff_count}
          icon={Users}
          description="Active staff members"
          color="orange"
        />
        <StatsCard
          title="Customer Users"
          value={data.general_counts.customers_users_count}
          icon={Users}
          description="Registered customers"
          color="teal"
        />
        <StatsCard
          title="Businesses with Affiliates"
          value={data.affiliate_metrics.business_users_with_affiliates}
          icon={Building2}
          description="Using affiliate program"
          color="pink"
        />
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AverageMetricsCard metrics={data.average_metrics} />
        <AffiliateTable
          data={data.affiliate_metrics.users_per_affiliate}
          totalAffiliates={data.affiliate_metrics.business_users_with_affiliates}
        />
      </div>

      {/* Footer Stats */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex flex-col space-y-2">
            <span className="text-sm text-gray-500">Services per Business</span>
            <span className="text-2xl font-bold text-primary-600">
              {data.average_metrics.average_services_per_business.toFixed(1)}
            </span>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-sm text-gray-500">Customers per Business</span>
            <span className="text-2xl font-bold text-primary-600">
              {data.average_metrics.average_customers_per_business.toFixed(1)}
            </span>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-sm text-gray-500">Staff per Business</span>
            <span className="text-2xl font-bold text-primary-600">
              {data.average_metrics.average_staff_members_per_business.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}