'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Clock, User, Crown, Calendar, AlertCircle } from 'lucide-react';
import type { TrialSubscription } from '@/types/subscriptionTrials';

interface TrialExpirationSectionProps {
  title: string;
  trials: TrialSubscription[];
  urgency: 'high' | 'medium' | 'low';
}

export default function TrialExpirationSection({ 
  title, 
  trials, 
  urgency 
}: TrialExpirationSectionProps) {
  const router = useRouter();

  const getUrgencyStyles = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-50 border-red-200';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200';
      case 'low':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (trials.length === 0) {
    return (
      <div className={`rounded-lg border p-6 ${getUrgencyStyles(urgency)}`}>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
        <div className="flex items-center justify-center py-8 text-gray-500">
          <Clock className="h-5 w-5 mr-2" />
          <span>No trials expiring during this period</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-lg border p-6 ${getUrgencyStyles(urgency)}`}>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
      <div className="space-y-4">
        {trials.map((trial, index) => (
          <motion.div
            key={trial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => router.push(`/users/${trial.user_id}`)}
            className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* User and Plan Info */}
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    User ID: {trial.user_id}
                  </p>
                  <div className="flex items-center mt-1">
                    <Crown className="h-4 w-4 text-yellow-400 mr-1" />
                    <p className="text-sm text-gray-500">{trial.plan_name}</p>
                  </div>
                </div>
              </div>

              {/* Trial Period */}
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Trial Ends
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(trial.trial_end_date)}
                  </p>
                </div>
              </div>

              {/* Payment Status */}
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <AlertCircle className={`h-5 w-5 ${trial.payment_tokens.length ? 'text-green-500' : 'text-red-500'}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Payment Method
                  </p>
                  <p className="text-sm text-gray-500">
                    {trial.payment_tokens.length ? 'Added' : 'Not Added'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Plan Price</span>
                <span className="font-medium text-gray-900">₪{trial.plan_price}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 