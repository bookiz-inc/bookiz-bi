"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { UserDetail } from "@/types/userDetail";
import { Clock, Users, DollarSign, Calendar } from "lucide-react";
import {UserUsage} from "@/types/userUsage";

export default function UserStats({ user }: { user: UserUsage }) {
    const [daysActive, setDaysActive] = useState<number>(0);

    useEffect(() => {
        // Calculate days active on the client side only
        const days = Math.floor(
            (new Date().getTime() - new Date(user.date_joined).getTime()) /
            (1000 * 60 * 60 * 24)
        );
        setDaysActive(days);
    }, [user.date_joined]);

    const stats = [
        {
            label: "Days Active",
            value: daysActive,
            icon: Clock,
            color: "text-blue-500",
            bgColor: "bg-blue-100",
        },
        {
            label: "Total Bookings",
            value: "---",
            icon: Calendar,
            color: "text-green-500",
            bgColor: "bg-green-100",
        },
        {
            label: "Estimated Revenue (₪)",
            value: user.total_revenue,
            icon: DollarSign,
            color: "text-yellow-500",
            bgColor: "bg-yellow-100",
        },
        {
            label: "Total Customers",
            value: "---",
            icon: Users,
            color: "text-purple-500",
            bgColor: "bg-purple-100",
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-sm p-6"
        >
            <h2 className="text-lg font-semibold text-gray-900 mb-6">User Statistics</h2>

            <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="bg-gray-50 rounded-lg p-4"
                    >
                        <div className={`${stat.bgColor} rounded-full p-2 w-fit mb-2`}>
                            <stat.icon className={`h-5 w-5 ${stat.color}`} />
                        </div>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                        <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
