'use client';

import { motion } from 'framer-motion';
import { CreditCard, AlertCircle, DollarSign, CheckCircle } from 'lucide-react';

interface PaymentMetricsProps {
  metrics: {
    total_success: number;
    total_failed: number;
    revenue: string;
  };
}

export default function PaymentMetricsCard({ metrics }: PaymentMetricsProps) {
  const totalTransactions = metrics.total_success + metrics.total_failed;
  const successRate = totalTransactions > 0
    ? Math.round((metrics.total_success / totalTransactions) * 100)
    : 0;

  const paymentMetrics = [
    {
      label: 'Successful Payments',
      value: metrics.total_success,
      icon: CheckCircle,
      color: 'green',
      description: `${successRate}% success rate`
    },
    {
      label: 'Failed Payments',
      value: metrics.total_failed,
      icon: AlertCircle,
      color: 'red',
      description: 'Need attention'
    },
    {
      label: 'Total Revenue',
      value: `₪${parseFloat(metrics.revenue).toLocaleString() || 0}`,
      icon: DollarSign,
      color: 'blue',
      description: 'From payments'
    },
    {
      label: 'Total Transactions',
      value: totalTransactions,
      icon: CreditCard,
      color: 'purple',
      description: 'All transactions'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h3 className="text-lg font-medium text-gray-900 mb-6">Payment Metrics</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {paymentMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg bg-${metric.color}-50`}
          >
            <div className="flex items-center">
              <metric.icon className={`h-8 w-8 text-${metric.color}-500`} />
              <div className="ml-4">
                <p className="text-sm text-gray-500">{metric.label}</p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="text-2xl font-bold text-gray-900"
                >
                  {metric.value}
                </motion.p>
                <p className="text-sm text-gray-500 mt-1">{metric.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
