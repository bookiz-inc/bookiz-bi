export interface TrialSubscription {
  id: string;
  status: string;
  start_date: string;
  end_date: string;
  trial_end_date: string;
  next_payment_date: string;
  plan_name: string;
  plan_price: string;
  billing_cycle: string;
  payment_tokens: {
    last_4_digits: string;
    card_brand: string;
    expiry_month: number;
    expiry_year: number;
    is_default: boolean;
  }[];
  business_id: string;
  user_id: string;
  days_left_for_trial: number;
  plan_id: number;
  business_name: string;
  user_phone: string;
}

export interface UpcomingTrials {
  next_24_hours: TrialSubscription[];
  next_48_hours: TrialSubscription[];
  next_week: TrialSubscription[];
} 