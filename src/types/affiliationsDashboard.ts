import type { Affiliation } from './affiliation';

export interface ReferredBusiness {
  id: string;
  affiliate: number;
  business: string;
  created_at: string;
}

export interface AffiliationsDashboard {
  count_affiliates: number;
  count_referred_businesses: number;
  total_value_referred_businesses: number;
  affiliates: Affiliation[];
  referred_businesses: ReferredBusiness[];
} 