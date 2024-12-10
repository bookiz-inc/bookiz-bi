'use client';

import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Calendar, CreditCard } from 'lucide-react';

interface RevenueMetricsProps {
  metrics: {
    mrr: number;
    arr: number;
    monthly_revenue: number;
    yearly_revenue: number;
  };
}

export default function RevenueMetricsCard({ metrics }: RevenueMetricsProps) {
  const formatValue = (value: number | null) => {
    if (value === null || value === undefined) return '₪0';
    return `₪${value.toLocaleString()}`;
  };

  const revenueMetrics = [
    {
      label: 'Monthly Recurring Revenue',
      value: formatValue(metrics?.mrr),
      icon: DollarSign,
      color: 'blue',
      description: 'MRR'
    },
    {
      label: 'Annual Recurring Revenue',
      value: formatValue(metrics?.arr),
      icon: TrendingUp,
      color: 'green',
      description: 'ARR'
    },
    {
      label: 'Monthly Revenue',
      value: formatValue(metrics?.monthly_revenue),
      icon: Calendar,
      color: 'purple',
      description: 'Current month'
    },
    {
      label: 'Yearly Revenue',
      value: formatValue(metrics?.yearly_revenue),
      icon: CreditCard,
      color: 'pink',
      description: 'Current year'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h3 className="text-lg font-medium text-gray-900 mb-6">Revenue Metrics</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {revenueMetrics.map((metric, index) => (
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
