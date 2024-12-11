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
  payment_tokens: any[];
  business_id: string;
  user_id: string;
}

export interface UpcomingTrials {
  next_24_hours: TrialSubscription[];
  next_48_hours: TrialSubscription[];
  next_week: TrialSubscription[];
} 