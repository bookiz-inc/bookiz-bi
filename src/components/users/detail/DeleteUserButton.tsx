'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface DeleteUserButtonProps {
    userId: string;
    className?: string;
}

export default function DeleteUserButton({ userId, className }: DeleteUserButtonProps) {
    const [isConfirming, setIsConfirming] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (!isConfirming) {
            setIsConfirming(true);
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch(
                `https://bookiz-back-pk3wl.ondigitalocean.app/api/v1/auth/users/delete/?user_id=${userId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'accept': 'application/json',
                        'X-CSRFToken': 'OI4g2G2n3VqB0ivDFkoQMFlwt7KuFufDR0g0PR7ExRLEuimWL9vaUrdvncmtNAUr',
                        'X-Frontend-Token' :'0suV43CiTkrrzk3Q'
                    }
                }
            );

            if (response.status === 204) {
                toast.success('User deleted successfully');
                router.push('/users');
            } else {
                throw new Error(`Failed to delete user. Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Failed to delete user');
            setIsConfirming(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.button
            onClick={handleDelete}
            disabled={isLoading}
            className={className}
            whileTap={{ scale: 0.95 }}
        >
            <Trash2 className="h-4 w-4" />
            <span className="ml-2">
                {isLoading ? 'Deleting...' : isConfirming ? 'Click again to confirm' : 'Delete User'}
            </span>
        </motion.button>
    );
}
