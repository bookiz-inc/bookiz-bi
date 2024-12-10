export interface SubscriptionMetrics {
    active_count: number;
    trial_count: number;
    users_with_token: number;
}

export interface PaymentMetrics {
    total_success: number;
    total_failed: number;
    revenue: string;
}

export interface RevenueMetrics {
    mrr: number;
    arr: number;
    monthly_revenue: number;
    yearly_revenue: number;
}

export interface SubscriptionAnalytics {
    subscription_metrics: SubscriptionMetrics;
    payment_metrics: PaymentMetrics;
    revenue_metrics: RevenueMetrics;
}
