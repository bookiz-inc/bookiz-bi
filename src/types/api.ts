export interface DashboardData {
    general_counts: {
      user_count: number;
      staff_count: number;
      business_user_count: number;
      customers_users_count: number;
      total_services_count: number;
      total_appointments_count: number;
    };
    average_metrics: {
      average_appointments_per_service: number;
      average_services_per_business: number;
      average_customers_per_business: number;
      average_staff_members_per_business: number;
    };
    affiliate_metrics: {
      business_users_with_affiliates: number;
      users_per_affiliate: {
        affiliate: string | null;
        total_users: number;
      }[];
    };
  }