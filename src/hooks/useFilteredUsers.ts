'use client';

import { useQueryState, parseAsInteger } from 'nuqs';
import type { User } from "@/types/user";
import type { FilterOptions } from "@/components/users/UserFilters";

export function useFilteredUsers(
  users: User[],
  searchQuery: string,
  filters: FilterOptions
) {
  const [filteredCount, setFilteredCount] = useQueryState(
    'filtered',
    parseAsInteger.withDefault(0)
  );

  const filteredUsers = users.filter((user) => {
    const searchLower = searchQuery?.toLowerCase() || '';
    const matchesSearch =
      user.first_name.toLowerCase().includes(searchLower) ||
      user.last_name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.phone_number.includes(searchQuery || '') ||
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

    const matchesAppointments = !filters.futureAppointments ||
      (filters.futureAppointments === 'true' 
        ? user.business.future_appointments > 0 
        : user.business.future_appointments === 0);

    return matchesSearch && matchesStatus && matchesPlan && matchesSubscriptionStatus &&
      matchesAffiliation && matchesPaymentToken && matchesAppointments;
  });

  // Update filtered count in URL
  if (filteredCount !== filteredUsers.length) {
    setFilteredCount(filteredUsers.length);
  }

  return filteredUsers;
} 