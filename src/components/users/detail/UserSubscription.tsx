'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Calendar, Clock, AlertCircle, ChevronsRight } from 'lucide-react';
import { format } from 'date-fns';

interface PaymentToken {
    last_4_digits: string;
    card_brand: string;
    expiry_month: number;
    expiry_year: number;
    is_default: boolean;
}

interface SubscriptionInfo {
    id: string;
    status: string;
    start_date: string;
    end_date: string;
    trial_end_date: string;
    next_payment_date: string;
    plan_name: string;
    plan_price: string;
    billing_cycle: string;
    payment_tokens: PaymentToken[];
    business_id: string;
    user_id: number;
    days_left_for_trial: number;
    plan_id: number;
}

interface UserSubscriptionProps {
    userId: string;
    onExtendTrial?: () => void;
}

export default function UserSubscription({ userId, onExtendTrial }: UserSubscriptionProps) {
    const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchSubscriptionInfo();
    }, [userId]);

    const fetchSubscriptionInfo = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/subscriptions/user/${userId}/`, {
                headers: {
                    'accept': 'application/json',
                    'X-CSRFToken': 'UVRHSrP7XtqtBtddEzh1eyVebVZPZMJJz0siebndgXQW6pxu19R2bubOvqYTrs8X'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch subscription information');
            }

            const data = await response.json();
            setSubscription(data);
        } catch (err) {
            setError('Failed to load subscription information');
            console.error('Error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-48">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (error || !subscription) {
        return (
            <div className="bg-red-50 rounded-lg p-4 flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
                <span className="text-red-700">{error}</span>
            </div>
        );
    }

    const isTrialUser = subscription.status === 'TRIAL';
    const formatDate = (date: string) => format(new Date(date), 'MMM dd, yyyy');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6 space-y-6"
        >
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Subscription Details</h2>
                {isTrialUser && onExtendTrial && (
                    <button
                        onClick={onExtendTrial}
                        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                        <Clock className="h-4 w-4 mr-2" />
                        Extend Trial
                    </button>
                )}
            </div>

            {/* Plan Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-4">
                        <CreditCard className="h-5 w-5 text-primary-600 mr-2" />
                        <h3 className="text-lg font-medium text-gray-900">Plan Details</h3>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Plan:</span> {subscription.plan_name}
                        </p>
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Price:</span> ₪{subscription.plan_price}/{subscription.billing_cycle.toLowerCase()}
                        </p>
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Status:</span>{' '}
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                subscription.status === 'ACTIVE' 
                                    ? 'bg-green-100 text-green-800' 
                                    : subscription.status === 'TRIAL'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-yellow-100 text-yellow-800'
                            }`}>
                                {subscription.status}
                            </span>
                        </p>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-4">
                        <Calendar className="h-5 w-5 text-primary-600 mr-2" />
                        <h3 className="text-lg font-medium text-gray-900">Important Dates</h3>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Start Date:</span> {formatDate(subscription.start_date)}
                        </p>
                        {subscription.status === 'TRIAL' && (
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Trial Ends:</span> {formatDate(subscription.trial_end_date)}
                                <span className="ml-2 text-primary-600">({subscription.days_left_for_trial} days left)</span>
                            </p>
                        )}
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Next Payment:</span> {formatDate(subscription.next_payment_date)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Payment Methods */}
            {subscription.payment_tokens.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Methods</h3>
                    <div className="space-y-3">
                        {subscription.payment_tokens.map((token, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between bg-gray-50 rounded-lg p-4"
                            >
                                <div className="flex items-center">
                                    <CreditCard className={`h-5 w-5 ${token.is_default ? 'text-primary-600' : 'text-gray-400'} mr-3`} />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">
                                            {token.card_brand} •••• {token.last_4_digits}
                                            {token.is_default && (
                                                <span className="ml-2 text-xs text-primary-600">(Default)</span>
                                            )}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Expires {token.expiry_month}/{token.expiry_year}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
} 