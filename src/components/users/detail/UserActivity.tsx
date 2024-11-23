"use client";

import { motion } from "framer-motion";
import { UserDetail } from "@/types/userDetail";
import { Activity } from "lucide-react";

export default function UserActivity({ user }: { user: UserDetail }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm p-6"
        >
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>

            <div className="flex items-center justify-center h-32">
                <div className="text-center text-gray-500">
                    <Activity className="h-8 w-8 mx-auto mb-2" />
                    <p>Activity tracking coming soon</p>
                </div>
            </div>
        </motion.div>
    );
}
