export interface ActivityEvent {
    event: string;
    properties: {
      time: number;
      appointment_date?: string;
      service_name?: string;
      login_time?: string;
      login_method?: string;
    };
  }
  
  export interface UserActivityResponse {
    status: string;
    results: {
      events: ActivityEvent[];
    };
  }