export interface Plan {
  name: string;
  price: string;
  billing_cycle: 'YEARLY' | 'MONTHLY';
}

export interface Subscription {
  status: 'ACTIVE' | 'CANCELLED' | 'PENDING' | 'TRIAL' | 'EXPIRED';
  start_date: string;
  end_date: string;
  trial_end_date: string;
  is_trial: boolean;
  is_active: boolean;
  days_left_for_trial: number;
  has_token: boolean;
  plan: Plan;
}

export interface ReferredBy {
  name: string;
}

export interface Business {
  id: string;
  name: string | null;
  subscription: Subscription;
  is_payment_verified: boolean;
  trial_days: number;
  future_appointments: number;
  referred_by?: ReferredBy;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  user_type: 'business' | 'customer' | 'staff';
  is_active: boolean;
  last_login: string | null;
  date_joined: string;
  business: Business;
}