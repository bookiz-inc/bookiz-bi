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
  TrendingUp
} from "lucide-react";
import type { User } from "@/types/user";
import { FilterOptions, SortOptions } from "./UserFilters";

interface UsersTableProps {
  users: User[];
  searchQuery: string;
  filters: FilterOptions;
  sort: SortOptions;
}

export default function UsersTable({ users, searchQuery, filters, sort }: UsersTableProps) {
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
        (filters.status === 'active' ? user.is_active : !user.is_active);

      const matchesPlan = !filters.subscriptionPlan || 
        user.business?.wanted_plan === filters.subscriptionPlan;

      // const matchesAffiliation = !filters.hasAffiliation || 
      //   (filters.hasAffiliation === 'true' ? user.business?.from_affiliate : !user.business?.from_affiliate);

      return matchesSearch && matchesStatus && matchesPlan ;
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
    });

  const getSubscriptionBadgeColor = (plan: string) => {
    switch (plan) {
      case 'monthly':
        return 'bg-purple-100 text-purple-800';
      case 'annual':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getFutureAppointmentsBadge = (count: number) => {
    if (count === 0) {
      return {
        color: 'bg-red-100 text-red-800',
        icon: AlertCircle,
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

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Business
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Future Appointments
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
              <th className="relative px-6 py-3">
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
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => router.push(`/users/${user.id}`)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-primary-700 font-medium">
                          {user.first_name[0]}{user.last_name[0]}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.first_name} {user.last_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {user.id}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-900">
                      {user.business.name || 'No Business Name'}
                    </div>
                    <div className="flex items-center mt-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        getSubscriptionBadgeColor(user.business.wanted_plan || user.business.subscription_plan)
                      }`}>
                        <Crown className="w-3 h-3 mr-1" />
                        {user.business.wanted_plan || user.business.subscription_plan}
                      </span>
                      {user.business.pre_launch_user && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Pre-launch
                        </span>
                      )}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center text-sm text-gray-500">
                      <Mail className="mr-2 h-4 w-4" />
                      {user.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone className="mr-2 h-4 w-4" />
                      {user.phone_number}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
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
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="mr-2 h-4 w-4" />
                    {new Date(user.date_joined).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {user.is_active ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <XCircle className="w-3 h-3 mr-1" />
                      Inactive
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <ChevronRight className="h-5 w-5 text-gray-400" />
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
