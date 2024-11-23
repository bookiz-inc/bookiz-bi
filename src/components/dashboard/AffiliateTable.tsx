'use client';

import { motion } from "framer-motion";

interface AffiliateTableProps {
  data: {
    affiliate: string | null;
    total_users: number;
  }[];
  totalAffiliates: number;
}

export default function AffiliateTable({ data, totalAffiliates }: AffiliateTableProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">
          Affiliate Distribution
          <span className="ml-2 text-sm text-gray-500">
            ({totalAffiliates} businesses with affiliates)
          </span>
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Affiliate ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Users
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Distribution
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <motion.tr
                key={item.affiliate || 'none'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.affiliate || 'No Affiliate'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.total_users}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <motion.div
                      className="bg-primary-600 h-2.5 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.total_users / Math.max(...data.map(d => d.total_users))) * 100}%` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    />
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}