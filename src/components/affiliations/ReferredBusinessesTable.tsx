'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { CheckCircle, XCircle, ArrowRight, Crown, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { ReferredTransaction } from '@/types/affiliate-stats';

interface ReferredBusinessesTableProps {
  transactions: ReferredTransaction[];
}

export default function ReferredBusinessesTable({ transactions }: ReferredBusinessesTableProps) {
  const router = useRouter();
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const handleRowClick = (userId: number, businessId: string) => {
    // Trigger confetti effect on row click
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    router.push(`/users/${userId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          <h2 className="text-lg font-medium text-gray-900">Referred Businesses</h2>
        </div>
        <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {transactions.length} businesses
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Business
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Owner
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plan
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <AnimatePresence>
              {transactions.map((transaction, index) => (
                <motion.tr
                  key={transaction.business_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleRowClick(transaction.user_id, transaction.business_id)}
                  onMouseEnter={() => setHoveredRow(transaction.business_id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`cursor-pointer transition-colors duration-200 ${
                    hoveredRow === transaction.business_id ? 'bg-purple-50' : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold">
                          {transaction.business.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{transaction.business}</div>
                        <div className="text-sm text-gray-500">ID: {transaction.business_id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {transaction.first_name} {transaction.last_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(transaction.created_at).toLocaleDateString('he-IL', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaction.is_payment_verified ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <XCircle className="h-4 w-4 mr-1" />
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Crown className={`h-4 w-4 ${
                        transaction.wanted_plan === 'yearly' ? 'text-yellow-400' : 'text-blue-400'
                      }`} />
                      <span className="capitalize text-sm text-gray-900">
                        {transaction.wanted_plan}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{
                        opacity: hoveredRow === transaction.business_id ? 1 : 0,
                        x: hoveredRow === transaction.business_id ? 0 : -10
                      }}
                    >
                      <ArrowRight className="h-5 w-5 text-purple-500" />
                    </motion.div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
