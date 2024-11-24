import type { Affiliation } from './affiliation';

export interface ReferredTransaction {
  business: string;
  created_at: string;
  business_id: string;
  is_payment_verified: boolean;
  pre_launch_user: boolean;
  wanted_plan: 'monthly' | 'yearly';
  first_name: string;
  last_name: string;
}

export interface AffiliateStats {
  referred_businesses_count: number;
  affiliate: Affiliation;
  referred_transaction: ReferredTransaction[];
}