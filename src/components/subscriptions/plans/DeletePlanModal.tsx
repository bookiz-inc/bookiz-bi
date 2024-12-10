'use client';

import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import type { SubscriptionPlan } from '@/types/subscriptionPlans';
import {useState} from "react";

interface DeletePlanModalProps {
  plan: SubscriptionPlan;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function DeletePlanModal({ plan, isOpen, onClose, onSuccess }: DeletePlanModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`https://api.bookiz.co.il/api/v1/subscriptions/subscription-plans/${plan.id}/`, {
        method: 'DELETE',
        headers: {
          'accept': 'application/json',
          'X-CSRFToken': 'fOXn6wI2EkeCJ5xlRP1zyBrzAp668UE1RKb5iKZAHN1ZLJY6YvIPkNidGSnnI9x9'
        }
      });

      if (!response.ok) throw new Error('Failed to delete plan');

      onSuccess();
    } catch (error) {
      setError('Failed to delete subscription plan');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center">
              <Dialog.Title className="text-lg font-medium text-gray-900">Delete Plan</Dialog.Title>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-5">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete the plan <strong>{plan.name}</strong>? This action cannot be undone.
              </p>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <div className="mt-5 flex justify-end">
                <button
                  onClick={handleDelete}
                  disabled={isSubmitting}
                  className="inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  {isSubmitting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
