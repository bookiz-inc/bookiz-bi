export interface BlockedNumber {
    phone_number: string;
    reason: string;
    blocked_at: string;
    blocked_by: string;
    is_active: boolean;
}

export interface BlockNumberRequest {
    phone_number: string;
    reason?: string;
}

const API_BASE_URL = 'http://localhost:8000/api/v1/auth';

export const PhoneBlockingService = {
    async listBlockedNumbers(): Promise<BlockedNumber[]> {
        const response = await fetch(`${API_BASE_URL}/blocked-numbers/`);
        if (!response.ok) {
            throw new Error('Failed to fetch blocked numbers');
        }
        return response.json();
    },

    async blockNumber(data: BlockNumberRequest): Promise<{ message: string }> {
        const response = await fetch(`${API_BASE_URL}/block-number/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to block number');
        }
        
        return response.json();
    },

    async unblockNumber(phoneNumber: string): Promise<{ message: string }> {
        const response = await fetch(`${API_BASE_URL}/unblock-number/?phone_number=${encodeURIComponent(phoneNumber)}`, {
            method: 'DELETE',
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to unblock number');
        }
        
        return response.json();
    },
}; 