'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Clock, User, Crown, Calendar, AlertCircle, Phone, CreditCard, Building2 } from 'lucide-react';
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

  const formatPhoneNumber = (phone: string) => {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Business and User Info */}
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Building2 className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {trial.business_name}
                    </p>
                    <div className="flex items-center mt-1">
                      <Crown className="h-4 w-4 text-yellow-400 mr-1" />
                      <p className="text-sm text-gray-500">{trial.plan_name}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <p className="text-sm text-gray-600">{formatPhoneNumber(trial.user_phone)}</p>
                </div>
              </div>

              {/* Trial Info */}
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Trial Ends {trial.days_left_for_trial === 0 ? 'Today' : 
                        trial.days_left_for_trial < 0 ? 'Expired' : 
                        `in ${trial.days_left_for_trial} days`}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(trial.trial_end_date)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">
                      {trial.payment_tokens.length > 0 ? (
                        <span className="text-green-600">
                          {trial.payment_tokens[0].card_brand} ending in {trial.payment_tokens[0].last_4_digits}
                        </span>
                      ) : (
                        <span className="text-red-600">No payment method</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Price Info */}
              <div className="flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Plan Price</span>
                  <span className="font-medium text-gray-900">₪{trial.plan_price}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">Billing</span>
                  <span className="text-sm font-medium text-gray-900 capitalize">
                    {trial.billing_cycle.toLowerCase()}
                  </span>
                </div>
                <div className={`mt-3 py-2 px-3 rounded-md text-sm ${
                  trial.payment_tokens.length ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  {trial.payment_tokens.length ? 'Ready for Renewal' : 'Action Required'}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 