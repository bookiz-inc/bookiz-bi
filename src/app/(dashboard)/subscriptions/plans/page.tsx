'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, RefreshCw, AlertCircle } from 'lucide-react';
import type { SubscriptionPlan } from '@/types/subscriptionPlans';
import SubscriptionPlansTable from '@/components/subscriptions/plans/SubscriptionPlansTable';
import CreatePlanModal from '@/components/subscriptions/plans/CreatePlanModal';

export default function SubscriptionPlansPage() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchPlans = async () => {
    try {
      setIsRefreshing(true);
      const response = await fetch('https://bookiz-back-pk3wl.ondigitalocean.app/api/v1/subscriptions/subscription-plans/?is_active=true', {
        headers: {
          'accept': 'application/json',
          'X-CSRFToken': 'fOXn6wI2EkeCJ5xlRP1zyBrzAp668UE1RKb5iKZAHN1ZLJY6YvIPkNidGSnnI9x9'
        }
      });

      if (!response.ok) throw new Error('Failed to fetch plans');

      const data = await response.json();
      setPlans(data);
      setError(null);
    } catch (error) {
      setError('Failed to load subscription plans');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPlans();
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
            onClick={fetchPlans}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Subscription Plans</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your subscription plans and pricing
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Plan
        </button>
      </div>

      <SubscriptionPlansTable
        plans={plans}
        onPlanUpdated={fetchPlans}
        onPlanDeleted={fetchPlans}
      />

      <CreatePlanModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={fetchPlans}
      />
    </motion.div>
  );
}
