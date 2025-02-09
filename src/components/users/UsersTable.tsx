"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Calendar,
  Building2,
  Crown,
  CheckCircle2,
  XCircle,
  ChevronRight,
  AlertCircle,
  TrendingUp,
  SortAsc,
  SortDesc,
  PlusCircle
} from "lucide-react";
import type { User, Subscription } from "@/types/user";
import { FilterOptions, SortOptions } from "./UserFilters";

interface UsersTableProps {
  users: User[];
  searchQuery: string;
  filters: FilterOptions;
  sort: SortOptions;
  onSortChange: (newSort: SortOptions) => void;
}

export default function UsersTable({ users, searchQuery, filters, sort, onSortChange }: UsersTableProps) {
  const router = useRouter();

  const filteredAndSortedUsers = users
    .filter((user) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        user.first_name.toLowerCase().includes(searchLower) ||
        user.last_name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.phone_number.includes(searchQuery) ||
        user.business?.name?.toLowerCase().includes(searchLower);

      const matchesStatus = !filters.status ||
        (filters.status === 'verified' ? user.business.is_payment_verified : !user.business.is_payment_verified);

      const matchesPlan = !filters.subscriptionPlan ||
        user.business?.subscription?.plan?.billing_cycle === filters.subscriptionPlan;

      const matchesSubscriptionStatus = !filters.subscriptionStatus ||
        user.business?.subscription?.status === filters.subscriptionStatus;

      const matchesAffiliation = !filters.hasAffiliation ||
        (filters.hasAffiliation === 'true' ? !!user.business?.referred_by : !user.business?.referred_by);

      const matchesPaymentToken = !filters.hasPaymentToken ||
        (filters.hasPaymentToken === 'true' ? user.business?.subscription?.has_token : !user.business?.subscription?.has_token);

      return matchesSearch && matchesStatus && matchesPlan && matchesSubscriptionStatus &&
        matchesAffiliation && matchesPaymentToken;
    })
    .sort((a, b) => {
      const direction = sort.direction === 'asc' ? 1 : -1;

      switch (sort.field) {
        case 'date_joined':
          return (new Date(a.date_joined).getTime() - new Date(b.date_joined).getTime()) * direction;
        case 'future_appointments':
          return (a.business.future_appointments - b.business.future_appointments) * direction;
        default:
          return 0;
      }
    })

  const getSubscriptionBadgeColor = (subscription: Subscription) => {
    switch (subscription.status) {
      case 'ACTIVE':
        return subscription.plan.billing_cycle === 'YEARLY'
          ? 'bg-yellow-100 text-yellow-800'
          : 'bg-purple-100 text-purple-800';
      case 'TRIAL':
        return 'bg-blue-100 text-blue-800';
      case 'EXPIRED':
        return 'bg-red-100 text-red-800';
      case 'CANCELLED':
        return 'bg-gray-100 text-gray-800';
      case 'PENDING':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSubscriptionStatusText = (subscription: Subscription) => {
    switch (subscription.status) {
      case 'ACTIVE':
        return subscription.plan.name;
      case 'TRIAL':
        return `Trial (${subscription.days_left_for_trial} days left)`;
      case 'EXPIRED':
        return 'Subscription Expired';
      case 'CANCELLED':
        return 'Subscription Cancelled';
      case 'PENDING':
        return 'Pending Activation';
      default:
        return subscription.plan.name;
    }
  };

  const getFutureAppointmentsBadge = (count: number) => {
    if (count === 0) {
      return {
        color: 'bg-red-100 text-red-800',
        icon: Calendar,
        text: 'No Appointments'
      };
    } else if (count > 10) {
      return {
        color: 'bg-green-100 text-green-800',
        icon: TrendingUp,
        text: `${count} Appointments`
      };
    } else if (count > 5) {
      return {
        color: 'bg-blue-100 text-blue-800',
        icon: Calendar,
        text: `${count} Appointments`
      };
    } else {
      return {
        color: 'bg-yellow-100 text-yellow-800',
        icon: Calendar,
        text: `${count} Appointments`
      };
    }
  };

  const handleSortChange = (field: string) => {
    if (sort.field === field) {
      // Toggle direction if clicking the same field
      onSortChange({
        ...sort,
        direction: sort.direction === 'asc' ? 'desc' : 'asc'
      });
    } else {
      // Set new field with default desc direction
      onSortChange({
        field,
        direction: 'desc'
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-2 py-4  sm:p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  <span>User Details</span>
                  <button onClick={() => handleSortChange('name')} className="hover:bg-gray-100 rounded">
                    {sort.field === 'name' ? (
                      sort.direction === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />
                    ) : null}
                  </button>
                </div>
              </th>
              <th scope="col" className="md:table-cell px-2 py-4  sm:p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  <span>Subscription Status</span>
                </div>
              </th>
              <th scope="col" className="hidden sm:table-cell px-2 py-4  sm:p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  <span>Appointments</span>
                  <button onClick={() => handleSortChange('future_appointments')} className="ml-1 p-1 hover:bg-gray-100 rounded">
                    {sort.field === 'future_appointments' ? (
                      sort.direction === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />
                    ) : null}
                  </button>
                </div>
              </th>
              <th scope="col" className="hidden md:table-cell px-2 py-4  sm:p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  <span>Join Date</span>
                  <button onClick={() => handleSortChange('date_joined')} className="ml-1 p-1 hover:bg-gray-100 rounded">
                    {sort.field === 'date_joined' ? (
                      sort.direction === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />
                    ) : null}
                  </button>
                </div>
              </th>
              <th scope="col" className="hidden md:table-cell px-2 py-4  sm:p-4 uppercase tracking-wider">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedUsers.map((user, index) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="hover:bg-gray-50 cursor-pointer group"
                onClick={() => router.push(`/users/${user.id}`)}
              >
                <td className="px-2 py-4  sm:p-4">
                  <div className="flex items-center">
                    {/* <div className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                      <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-primary-700 text-sm sm:text-base font-medium">
                          {user.first_name[0]}{user.last_name[0]}
                        </span>
                      </div>
                    </div> */}
                    <div className="ml-3 sm:ml-4">
                      <div className="flex flex-col sm:flex-row sm:items-center">
                        <div className="text-sm font-medium text-gray-900">
                          {user.first_name} {user.last_name}
                        </div>
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 mt-1">
                        <div className="flex items-center space-x-2 mt-1">
                          <Phone className="h-3 w-3" />
                          <span>{user.phone_number}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          {user.business.is_payment_verified ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              <XCircle className="w-3 h-3 mr-1" />
                              Inactive
                            </span>
                          )}
                        </div>
                      </div>
                      {/* Mobile-only subscription status */}
                      <div className="md:hidden mt-1">
                        {/* <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSubscriptionBadgeColor(user.business.subscription)
                          }`}>
                          <Crown className="w-3 h-3" />
                          {getSubscriptionStatusText(user.business.subscription)}
                        </span> */}

                        {(() => {
                          const { color, icon: Icon } = getFutureAppointmentsBadge(user.business.future_appointments);
                          return (
                            <motion.span
                              initial={{ scale: 0.9 }}
                              animate={{ scale: 1 }}
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${color}`}
                            >
                              <Icon className="w-3 h-3 mr-1" />
                              Appointments
                            </motion.span>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="md:table-cell px-2 py-4  sm:p-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium w-fit ${getSubscriptionBadgeColor(user.business.subscription)
                      }`}>
                      <Crown className="w-3 h-3 mr-1" />
                      {getSubscriptionStatusText(user.business.subscription)}
                    </span>
                    {!user.business.subscription.has_token && (
                      <span className="mt-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium w-fit bg-red-50 text-red-700">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        No Payment Method
                      </span>
                    )}
                    {user.business.referred_by && (
                      <div className="flex items-center mt-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium w-fit bg-indigo-50 text-indigo-700">
                          <Building2 className="w-3 h-3 mr-1" />
                          Referred by: {user.business.referred_by.name}
                        </span>
                      </div>
                    )}
                    {user.date_joined && (
                      <div className="md:hidden flex items-center mt-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium w-fit bg-gray-100 text-gray-700">
                          <PlusCircle className="w-3 h-3 mr-1" />
                          Joined: {new Date(user.date_joined).toLocaleDateString("he-IL").replace(/\./g, "/")}
                        </span>
                      </div>
                    )}
                  </div>
                </td>

                <td className="hidden sm:table-cell px-2 py-4  sm:p-4 whitespace-nowrap">
                  {(() => {
                    const { color, icon: Icon, text } = getFutureAppointmentsBadge(user.business.future_appointments);
                    return (
                      <motion.span
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}
                      >
                        <Icon className="w-3 h-3 mr-1" />
                        {text}
                      </motion.span>
                    );
                  })()}
                </td>

                <td className="hidden md:table-cell px-2 py-4  sm:p-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <div className="text-sm text-gray-900">
                      {new Date(user.date_joined).toLocaleDateString("he-IL").replace(/\./g, "/")}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(user.date_joined).toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </td>

                <td className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <ChevronRight className="h-5 w-5 text-gray-400 opacity-70 group-hover:opacity-100 transition-opacity" />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAndSortedUsers.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No users found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
}
