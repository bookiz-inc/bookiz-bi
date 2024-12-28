'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Award, ExternalLink, Mail, Phone, Link2, MousePointerClick } from 'lucide-react';
import type { Affiliation } from '@/types/affiliation';

interface AffiliatesTableProps {
  affiliates: Affiliation[];
}

export default function AffiliatesTable({ affiliates }: AffiliatesTableProps) {
  const router = useRouter();

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'PLATINUM': return 'bg-gray-100 text-gray-800';
      case 'GOLD': return 'bg-yellow-100 text-yellow-800';
      case 'SILVER': return 'bg-blue-100 text-blue-800';
      default: return 'bg-orange-100 text-orange-800';
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Affiliate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Social Media
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Affiliate Link
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tier
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">View</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {affiliates.map((affiliate, index) => (
              <motion.tr
                key={affiliate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => router.push(`/affiliations/${affiliate.id}`)}
                className="hover:bg-gray-50 cursor-pointer group"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-primary-600 font-medium">
                          {affiliate.first_name[0]}{affiliate.last_name[0]}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {affiliate.first_name} {affiliate.last_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {affiliate.alias}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center text-sm text-gray-500">
                      <Mail className="h-4 w-4 mr-2" />
                      {affiliate.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone className="h-4 w-4 mr-2" />
                      {affiliate.phone_number}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-3">
                    {affiliate.instagram && (
                      <a
                        href={affiliate.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-pink-600 hover:text-pink-700"
                      >
                        <Instagram className="h-5 w-5" />
                      </a>
                    )}
                    {affiliate.facebook && (
                      <a
                        href={affiliate.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Facebook className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Link2 className="h-4 w-4 text-gray-400" />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(affiliate.link_data.link);
                        }}
                        className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
                      >
                        {affiliate.link_data.link.replace('https://', '')}
                      </button>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MousePointerClick className="h-4 w-4 mr-2" />
                      <span>{affiliate.link_data.clicks} clicks</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTierColor(affiliate.tier)}`}>
                    <Award className="h-4 w-4 mr-1" />
                    {affiliate.tier}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(affiliate.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <ExternalLink className="h-5 w-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}