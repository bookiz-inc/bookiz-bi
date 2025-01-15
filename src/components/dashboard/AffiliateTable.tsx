'use client';

import { motion } from "framer-motion";
import { Users } from "lucide-react";

interface AffiliateTableProps {
  data: {
    affiliate: string | null;
    total_users: number;
  }[];
  totalAffiliates: number;
}

export default function AffiliateTable({ data, totalAffiliates }: AffiliateTableProps) {
  // Calculate the maximum users for percentage calculation
  const maxUsers = Math.max(...data.map(d => d.total_users));
  const totalUsers = data.reduce((sum, item) => sum + item.total_users, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
    >
      {/* Header Section */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Affiliate Distribution
            </h3>
            <p className="mt-1 text-sm text-gray-500 flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {totalAffiliates} businesses with affiliates
            </p>
          </div>
          <div className="hidden sm:block text-right">
            <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
            <p className="text-sm text-gray-500">Total Users</p>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="sm:hidden">
        {data.map((item, index) => {
          const percentage = (item.total_users / maxUsers) * 100;
          const userPercentage = ((item.total_users / totalUsers) * 100).toFixed(1);
          return (
            <motion.div
              key={`mobile-${item.affiliate || 'none'}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-4 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-gray-900">
                    {item.affiliate === null ? 'No Affiliate' : 
                     item.affiliate === '' ? 'Empty' : 
                     item.affiliate}
                  </p>
                  <p className="text-sm text-gray-500">{item.total_users} users ({userPercentage}%)</p>
                </div>
              </div>
              <div className="mt-2">
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <motion.div
                    className="bg-primary-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Desktop View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Affiliate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Users
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">
                Distribution
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {data.map((item, index) => {
              const percentage = (item.total_users / maxUsers) * 100;
              const userPercentage = ((item.total_users / totalUsers) * 100).toFixed(1);
              return (
                <motion.tr
                  key={`desktop-${item.affiliate || 'none'}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-primary-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {item.affiliate === null ? 'No Affiliate' : 
                           item.affiliate === '' ? 'Empty' : 
                           item.affiliate}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.total_users}</p>
                      <p className="text-sm text-gray-500">{userPercentage}% of total</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-grow">
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <motion.div
                            className="bg-primary-600 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          />
                        </div>
                      </div>
                      <div className="ml-4 w-16 text-right">
                        <span className="text-sm font-medium text-gray-900">
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}