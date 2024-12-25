export interface BroadcastSMSRequest {
    message: string;
    all_business_users?: boolean;
    only_trial_users?: boolean;
    joined_within_days?: number;
    joined_within_months?: number;
    subscription_status?: SubscriptionStatus;
    is_test_mode?: boolean;
    phone_numbers?: string[];
}

export interface Recipient {
    id: string;
    phone_number: string;
    first_name: string;
    last_name: string;
    business_name: string;
    joined_date: string;
    subscription_status: SubscriptionStatus;
}

export interface BroadcastSMSResponse {
    success_count: number;
    failed_count: number;
    total_recipients: number;
    estimated_segments: number;
    recipients: Recipient[];
}

export interface PreviewResponse {
    total_count: number;
    recipients: Recipient[];
}

export type SubscriptionStatus = 'TRIAL' | 'ACTIVE' | 'CANCELLED' | 'EXPIRED' | 'PAYMENT_FAILED' | 'BETA';

export type BroadcastMode = 'filter' | 'manual'; 