"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import UserHeader from "./UserHeader";
import BusinessInfo from "./BusinessInfo";
import UserStats from "./UserStats";
import UserActivity from "./UserActivity";
import UserMetrics from "./UserMetrics"; // Add this import
import { UserDetail } from "@/types/userDetail";
import { UserUsage } from "@/types/userUsage"; // Add this import
import { AlertCircle } from "lucide-react";
import UserAffiliation from "./UserAffiliation";

export default function UserDetailContent({ userId }: { userId: string }) {
    const [user, setUser] = useState<UserDetail | null>(null);
    const [usage, setUsage] = useState<UserUsage | null>(null); // Add this state
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setError(null);
            const [userResponse, usageResponse] = await Promise.all([
                fetch(
                    `https://api.bookiz.co.il/api/v1/data/analytics/users/${userId}`,
                    {
                        headers: {
                            accept: "application/json",
                            "X-CSRFToken": "DYzFI7skOzNpKxQsMXv8N53V0PYO45UmzhbTkr6ncV8wkDZ7WBzzTi7V4XxjRbfr",
                        },
                    }
                ),
                fetch(
                    `https://api.bookiz.co.il/api/v1/data/analytics/users/${userId}/usage`,
                    {
                        headers: {
                            accept: "application/json",
                            "X-CSRFToken": "7QFk3qgsriFFp25wha1uIIVeVSD2CiOKglILmxLgTKeRNBY4H8NogqC6xQJA0pdZ",
                        },
                    }
                )
            ]);

            if (!userResponse.ok || !usageResponse.ok) {
                throw new Error("Failed to fetch user data");
            }

            const [userData, usageData] = await Promise.all([
                userResponse.json(),
                usageResponse.json()
            ]);

            setUser(userData);
            setUsage(usageData);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to fetch user details");
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [userId]);

    const handleRefresh = () => {
        setIsRefreshing(true);
        fetchData();
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
                    onClick={fetchData}
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

            {usage && <UserMetrics usage={usage} />}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <BusinessInfo business={user.business} />
                    <UserAffiliation userId={userId} />
                    <UserActivity userId={userId} />
                    
                </div>
                <div className="lg:col-span-1">
                {usage && <UserStats user={usage} />}
                </div>
            </div>
        </motion.div>
    );
}
