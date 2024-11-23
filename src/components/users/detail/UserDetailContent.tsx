"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import UserHeader from "./UserHeader";
import BusinessInfo from "./BusinessInfo";
import UserStats from "./UserStats";
import UserActivity from "./UserActivity";
import { UserDetail } from "@/types/userDetail";
import { AlertCircle } from "lucide-react";

export default function UserDetailContent({ userId }: { userId: string }) {
    const [user, setUser] = useState<UserDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUserDetails = async () => {
        try {
            setError(null);
            const response = await fetch(
                `https://api.bookiz.co.il/api/v1/data/analytics/users/${userId}`,
                {
                    headers: {
                        accept: "application/json",
                        "X-CSRFToken": "DYzFI7skOzNpKxQsMXv8N53V0PYO45UmzhbTkr6ncV8wkDZ7WBzzTi7V4XxjRbfr",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch user details");
            }

            const data = await response.json();
            setUser(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to fetch user details");
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, [userId]);

    const handleRefresh = () => {
        setIsRefreshing(true);
        fetchUserDetails();
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (error || !user) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center min-h-[400px]"
            >
                <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading User</h3>
                <p className="text-gray-500 mb-4">{error}</p>
                <button
                    onClick={fetchUserDetails}
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                    Try Again
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <UserHeader
                user={user}
                onRefresh={handleRefresh}
                isRefreshing={isRefreshing}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <BusinessInfo business={user.business} />
                    <UserActivity user={user} />
                </div>
                <div className="lg:col-span-1">
                    <UserStats user={user} />
                </div>
            </div>
        </motion.div>
    );
}
