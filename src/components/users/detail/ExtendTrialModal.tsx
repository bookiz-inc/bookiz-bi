'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, AlertCircle } from 'lucide-react';

interface ExtendTrialModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
    currentTrialDays: number;
}

export default function ExtendTrialModal({ isOpen, onClose, userId, currentTrialDays }: ExtendTrialModalProps) {
    const [daysToExtend, setDaysToExtend] = useState('30');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:8000/api/v1/subscriptions/trials/extend/`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRFToken': 'UVRHSrP7XtqtBtddEzh1eyVebVZPZMJJz0siebndgXQW6pxu19R2bubOvqYTrs8X'
                },
                body: JSON.stringify({ extra_days: parseInt(daysToExtend), user_id: userId })
            });

            if (!response.ok) {
                throw new Error('Failed to extend trial');
            }

            onClose();
            // You might want to refresh the subscription data here
        } catch (err) {
            setError('Failed to extend trial period');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    <div className="mb-6">
                        <div className="flex items-center mb-4">
                            <Clock className="h-6 w-6 text-primary-600 mr-2" />
                            <h2 className="text-xl font-semibold text-gray-900">Extend Trial Period</h2>
                        </div>
                        <p className="text-sm text-gray-600">
                            Current trial period: {currentTrialDays} days remaining
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 bg-red-50 text-red-700 p-3 rounded-lg flex items-center">
                            <AlertCircle className="h-5 w-5 mr-2" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Extension Period (Days)
                            </label>
                            <select
                                value={daysToExtend}
                                onChange={(e) => setDaysToExtend(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                            >
                                <option value="1">1 day</option>
                                <option value="2">2 days</option>
                                <option value="3">3 days</option>
                                <option value="4">4 days</option>
                                <option value="5">5 days</option>
                                <option value="6">6 days</option>
                                <option value="7">7 days</option>
                                <option value="14">14 days</option>
                                <option value="30">30 days</option>
                                <option value="60">60 days</option>
                                <option value="90">90 days</option>
                            </select>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 
                                    ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? 'Extending...' : 'Extend Trial'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
