export interface UserMetadata {
    url: string;
    source_ip: string;
    user_agent: string;
    signup_timestamp: string | "N/A";
    platform?: string | null;
}

export interface BusinessProfile {
    id: string;
    created_at: string;
    updated_at: string;
    phone_number: string;
    profession: string;
    name: string;
    address: string;
    city: string;
    country: string;
    zip_code: string | null;
    logo: string | null;
    favorite_color: string;
    banner: string | null;
    short_description: string | null;
    long_description: string;
    business: string;
}

export interface BusinessDetail {
    id: string;
    profile: BusinessProfile;
    name: string;
    subscription_plan: string;
    tax_id: string | null;
    is_payment_verified: boolean;
    pre_launch_user: boolean;
    trial_days: number;
    wanted_plan: string | null;
}

export interface UserDetail {
    id: number;
    business: BusinessDetail;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    is_active: boolean;
    date_joined: string;
    user_type: string;
    profile_image: string | null;
    business_size: string;
    is_staff: boolean;
    is_superuser: boolean;
    gender?: string;
    birth_date?: string;
    business_category?: string;
    old_calender_method?: string;
    has_affiliate: boolean;
    metadata?: UserMetadata;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
    selected_plan_id?: number;
}
