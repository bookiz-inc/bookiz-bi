import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface OnboardingStep {
    id: string;
    hours_from_start: number;
    time_display: string;
    wati_template_name: string;
    description: string;
    is_active: boolean;
}

interface OnboardingTemplate {
    id: string;
    name: string;
    description: string;
    is_active: boolean;
    steps: OnboardingStep[];
}

interface UserProgress {
    id: string;
    user: {
        id: string;
        email: string;
        phone_number: string;
    };
    template: {
        id: string;
        name: string;
    };
    current_step: {
        id: string;
        hours_from_start: number;
        time_display: string;
        wati_template_name: string;
    } | null;
    status: "IN_PROGRESS" | "COMPLETED" | "STOPPED";
    start_date: string;
    completed_date: string | null;
    completed_steps: Array<{
        id: string;
        step: {
            id: string;
            hours_from_start: number;
            time_display: string;
            wati_template_name: string;
        };
        completed_at: string;
        was_successful: boolean;
    }>;
    next_step: {
        id: string;
        hours_from_start: number;
        time_display: string;
        wati_template_name: string;
    } | null;
    time_in_onboarding: {
        hours: number;
        days: number;
        display: string;
    };
}

interface AnalyticsData {
    total_users: number;
    active_users: number;
    completed_users: number;
    stopped_users: number;
    completion_rate: number;
    step_completion_rates: Array<{
        time: string;
        hours_from_start: number;
        description: string;
        total: number;
        successful: number;
        success_rate: number;
    }>;
    average_completion_time: {
        hours: number;
        days: number;
        display: string;
    };
    completion_trend: {
        labels: string[];
        completed: number[];
        stopped: number[];
    };
}

interface FailedStep {
    id: string;
    user: {
        email: string;
        phone_number: string;
    };
    step: {
        hours_from_start: number;
        time_display: string;
        wati_template_name: string;
    };
    completed_at: string;
    error_message: string;
}

export const onboardingService = {
    // Templates
    async getTemplates(params: {
        is_active?: boolean;
        search?: string;
        page?: number;
        page_size?: number;
    }) {
        const response = await axios.get(`${API_URL}/api/onboarding/templates/`, {
            params,
        });
        return response.data;
    },

    async getTemplate(id: string) {
        const response = await axios.get(`${API_URL}/api/onboarding/templates/${id}/`);
        return response.data;
    },

    async createTemplate(data: {
        name: string;
        description: string;
        is_active: boolean;
    }) {
        const response = await axios.post(`${API_URL}/api/onboarding/templates/`, data);
        return response.data;
    },

    async updateTemplate(id: string, data: Partial<OnboardingTemplate>) {
        const response = await axios.patch(
            `${API_URL}/api/onboarding/templates/${id}/`,
            data
        );
        return response.data;
    },

    async cloneTemplate(id: string) {
        const response = await axios.post(
            `${API_URL}/api/onboarding/templates/${id}/clone/`
        );
        return response.data;
    },

    async deleteTemplate(id: string) {
        await axios.delete(`${API_URL}/api/onboarding/templates/${id}/`);
    },

    // Steps
    async createStep(data: {
        template: string;
        hours_from_start: number;
        wati_template_name: string;
        description: string;
        is_active: boolean;
    }) {
        const response = await axios.post(`${API_URL}/api/onboarding/steps/`, data);
        return response.data;
    },

    async reorderSteps(data: { steps: Array<{ id: string; hours_from_start: number }> }) {
        const response = await axios.post(
            `${API_URL}/api/onboarding/steps/reorder/`,
            data
        );
        return response.data;
    },

    // User Progress
    async getUserProgress(params: {
        status?: "IN_PROGRESS" | "COMPLETED" | "STOPPED";
        template?: string;
        search?: string;
        start_date_after?: string;
        start_date_before?: string;
        page?: number;
        page_size?: number;
    }) {
        const response = await axios.get(`${API_URL}/api/onboarding/progress/`, {
            params,
        });
        return response.data;
    },

    async forceNextStep(progressId: string) {
        const response = await axios.post(
            `${API_URL}/api/onboarding/progress/${progressId}/force_next_step/`
        );
        return response.data;
    },

    async stopProgress(progressId: string) {
        const response = await axios.post(
            `${API_URL}/api/onboarding/progress/${progressId}/stop/`
        );
        return response.data;
    },

    async restartProgress(progressId: string) {
        const response = await axios.post(
            `${API_URL}/api/onboarding/progress/${progressId}/restart/`
        );
        return response.data;
    },

    // Analytics
    async getAnalytics(params: {
        template?: string;
        start_date?: string;
        end_date?: string;
    }) {
        const response = await axios.get(
            `${API_URL}/api/onboarding/progress/analytics/`,
            { params }
        );
        return response.data;
    },

    async getFailedSteps() {
        const response = await axios.get(
            `${API_URL}/api/onboarding/completions/failed_steps/`
        );
        return response.data;
    },
}; 