'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import type { Affiliation } from '@/types/affiliation';

interface AffiliationsTableProps {
  affiliations: Affiliation[];
}

export default function AffiliationsTable({ affiliations }: AffiliationsTableProps) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Link Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Referrals
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Revenue
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {affiliations.map((affiliation, index) => (
            <motion.tr
              key={affiliation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => router.push(`/affiliations/${affiliation.id}`)}
              className="cursor-pointer hover:bg-gray-50"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {affiliation.firstName} {affiliation.lastName}
                </div>
                <div className="text-sm text-gray-500">ID: {affiliation.id}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {affiliation.linkName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {affiliation.totalReferrals}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${affiliation.revenue.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  affiliation.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {affiliation.status}
                </span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}