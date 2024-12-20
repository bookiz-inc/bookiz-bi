'use client';

import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  Award,
  ArrowLeft,
  Instagram,
  Facebook,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  DollarSign,
  TrendingUp,
  Link,
  Copy
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import ReferredBusinessesTable from './ReferredBusinessesTable';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import type { AffiliateStats } from '@/types/affiliate-stats';
import toast from 'react-hot-toast';

interface AffiliateDetailProps {
  stats: AffiliateStats;
}

export default function AffiliateDetail({ stats }: AffiliateDetailProps) {
  const router = useRouter();
  const { affiliate, referred_businesses_count, referred_transaction } = stats;

  // Calculate estimated value (example calculation)
  const estimatedValue = referred_transaction.reduce((total, transaction) => {
    const baseValue = transaction.wanted_plan === 'monthly' ? 139 : 828;
    return total + (transaction.is_payment_verified ? baseValue : 0);
  }, 0);

  // Prepare chart data
  const chartData = referred_transaction.reduce((acc: any[], transaction) => {
    const date = new Date(transaction.created_at).toLocaleDateString();
    const existingDay = acc.find(item => item.date === date);
    
    if (existingDay) {
      existingDay.referrals += 1;
      existingDay.value += transaction.wanted_plan === 'monthly' ? 139 : 828;
    } else {
      acc.push({
        date,
        referrals: 1,
        value: transaction.wanted_plan === 'monthly' ? 139 : 828
      });
    }
    return acc;
  }, []);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'PLATINUM': return 'bg-gray-100 text-gray-800';
      case 'GOLD': return 'bg-yellow-100 text-yellow-800';
      case 'SILVER': return 'bg-blue-100 text-blue-800';
      default: return 'bg-orange-100 text-orange-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Affiliates
        </button>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-2xl font-medium text-primary-600">
                {affiliate.first_name[0]}{affiliate.last_name[0]}
              </span>
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {affiliate.first_name} {affiliate.last_name}
              </h1>
              <div className="flex items-center mt-1">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTierColor(affiliate.tier)}`}>
                  <Award className="h-4 w-4 mr-1" />
                  {affiliate.tier} Tier
                </span>
                <span className="ml-2 text-sm text-gray-500">({affiliate.alias})</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            {affiliate.instagram && (
              <a href={affiliate.instagram} target="_blank" rel="noopener noreferrer"
                 className="text-pink-600 hover:text-pink-700">
                <Instagram className="h-6 w-6" />
              </a>
            )}
            {affiliate.facebook && (
              <a href={affiliate.facebook} target="_blank" rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-700">
                <Facebook className="h-6 w-6" />
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-sm font-medium text-gray-900">{affiliate.email}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-sm font-medium text-gray-900">{affiliate.phone_number}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Joined</p>
              <p className="text-sm font-medium text-gray-900">
                {new Date(affiliate.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-primary-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Referred Businesses</p>
              <p className="text-2xl font-bold text-gray-900">{referred_businesses_count}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Estimated Value</p>
              <p className="text-2xl font-bold text-gray-900">₪{estimatedValue}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.link_data.clicks > 0 
                  ? Math.round((referred_transaction.length / stats.link_data.clicks) * 100)
                  : 0}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-500">Link Clicks</p>
                <p className="text-2xl font-bold text-gray-900">{stats.link_data.clicks}</p>
              </div>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(stats.link_data.link);
                toast.success('Link copied to clipboard!', {
                  position: 'bottom-center',
                  duration: 2000
                });
              }}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Copy className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <h2 className="text-lg font-medium text-gray-900 mb-4">Performance Overview</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#4F46E5" 
                fill="#4F46E5" 
                fillOpacity={0.1} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Transactions Table */}
      <ReferredBusinessesTable transactions={referred_transaction} />
    </div>
  );
}