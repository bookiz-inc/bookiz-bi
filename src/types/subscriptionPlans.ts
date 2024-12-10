export type BillingCycle = 'MONTHLY' | 'YEARLY';

export interface SubscriptionPlan {
  id: number;
  name: string;
  description: string;
  price: string;
  billing_cycle: BillingCycle;
  features: Record<string, any>;
  is_active: boolean;
  trial_days: number;
  price_include_vat: boolean;
  created_at: string;
  updated_at: string;
  payplus_product_uid: string | null;
}

export interface CreateSubscriptionPlanInput {
  name: string;
  description: string;
  price: string;
  billing_cycle: BillingCycle;
  features: Record<string, any>;
  is_active: boolean;
  trial_days: number;
  price_include_vat: boolean;
} 