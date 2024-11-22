"use client";

import { use } from 'react';
import { ArrowLeft, DollarSign, Calendar, ShoppingCart, Clock } from "lucide-react";
import Link from "next/link";
import { Card } from "@tremor/react";
import UserActivityChart from "@/components/users/UserActivityChart";
import UserTransactions from "@/components/users/UserTransactions";

// Mock user data - replace with API call
const userData = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  phone: "+1234567890",
  joinedDate: "2023-01-15",
  status: "active",
  metrics: {
    totalSpent: 1234.56,
    averageOrderValue: 123.45,
    totalOrders: 10,
    lastPurchase: "2024-02-15"
  }
};

export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap the params using React.use()
  const { id } = use(params);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link 
          href="/users" 
          className="rounded-full p-2 hover:bg-gray-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-3xl font-bold">User Profile</h1>
      </div>

      {/* User Info Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gray-200" />
          <div>
            <h2 className="text-2xl font-semibold">{userData.name}</h2>
            <p className="text-gray-500">{userData.email}</p>
          </div>
          <span className={`ml-auto inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
            userData.status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {userData.status}
          </span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-blue-500" />
            <h3 className="text-sm font-medium text-gray-500">Total Spent</h3>
          </div>
          <p className="mt-2 text-2xl font-semibold">${userData.metrics.totalSpent}</p>
        </Card>

        <Card>
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-blue-500" />
            <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
          </div>
          <p className="mt-2 text-2xl font-semibold">{userData.metrics.totalOrders}</p>
        </Card>

        <Card>
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-blue-500" />
            <h3 className="text-sm font-medium text-gray-500">Average Order Value</h3>
          </div>
          <p className="mt-2 text-2xl font-semibold">${userData.metrics.averageOrderValue}</p>
        </Card>

        <Card>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-500" />
            <h3 className="text-sm font-medium text-gray-500">Last Purchase</h3>
          </div>
          <p className="mt-2 text-2xl font-semibold">{userData.metrics.lastPurchase}</p>
        </Card>
      </div>

      {/* Activity Chart */}
      <Card>
        <h3 className="text-lg font-semibold mb-4">Activity Overview</h3>
        <UserActivityChart userId={id} />
      </Card>

      {/* Transactions Table */}
      <Card>
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <UserTransactions userId={id} />
      </Card>
    </div>
  );
}