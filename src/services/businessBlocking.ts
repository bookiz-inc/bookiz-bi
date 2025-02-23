const API_BASE_URL = 'https://leo.bookiz.com/api/v1/business';

export interface BlockBusinessRequest {
    business_id: string;
    reason?: string;
}

export const BusinessBlockingService = {
    async blockBusiness(data: BlockBusinessRequest): Promise<{ message: string }> {
        const response = await fetch(`${API_BASE_URL}/business/block/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Frontend-Token': '0suV43CiTkrrzk3Q'
            },
            body: JSON.stringify(data),
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to block business');
        }
        
        return response.json();
    },

    async unblockBusiness(businessId: string): Promise<{ message: string }> {
        const response = await fetch(`${API_BASE_URL}/business/unblock/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Frontend-Token': '0suV43CiTkrrzk3Q'
            },
            body: JSON.stringify({ business_id: businessId }),
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to unblock business');
        }
        
        return response.json();
    },
}; 