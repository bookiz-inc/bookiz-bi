export interface Business {
  id: string;
  name: string | null;
  subscription_plan: 'Free' | 'Beta' | 'Premium';
  pre_launch_user: boolean;
  is_payment_verified: boolean;
  trial_days: number;
  wanted_plan: string | null;
  future_appointments: number;
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