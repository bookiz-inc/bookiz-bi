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
}
