'use client';

import { motion } from 'framer-motion';
import {
    Users,
    Calendar,
    Briefcase,
    Clock,
    MessageSquare,
    CheckCircle,
    XCircle,
    UserCog,
    CalendarClock,
    Link
} from 'lucide-react';
import type { UserUsage } from '@/types/userUsage';

interface UserMetricsProps {
    usage: UserUsage;
}

export default function UserMetrics({ usage }: UserMetricsProps) {
    // Numeric metrics
    const countMetrics = [
        {
            label: 'Total Customers',
            value: usage.customer_count,
            icon: Users,
            color: 'blue',
        },
        {
            label: 'Total Appointments',
            value: usage.total_appointments,
            icon: Calendar,
            color: 'purple',
        },
        {
            label: 'Total Services',
            value: usage.total_services,
            icon: Briefcase,
            color: 'green',
        },
        {
            label: 'Future Appointments',
            value: usage.future_appointments,
            icon: CalendarClock,
            color: 'orange',
        },
        {
            label: 'SMS Sent',
            value: usage.total_sms_sent,
            icon: MessageSquare,
            color: 'pink',
        },
    ];

    // Boolean metrics
    const checkMetrics = [
        {
            label: 'Has Appointments',
            value: usage.has_appointments,
            icon: Calendar,
        },
        {
            label: 'Has Services',
            value: usage.has_services,
            icon: Briefcase,
        },
        {
            label: 'Has Work Hours',
            value: usage.has_work_hours,
            icon: Clock,
        },
        {
            label: 'From Affiliate',
            value: usage.from_affiliate,
            icon: Link,
        },
    ];

    return (
        <div className="space-y-6">
            {/* Numeric Metrics */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4"
            >
                {countMetrics.map((metric, index) => (
                    <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-white rounded-lg shadow p-6 border-l-4 border-${metric.color}-500`}
                    >
                        <div className="flex items-center">
                            <metric.icon className={`h-8 w-8 text-${metric.color}-500`} />
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">{metric.label}</p>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.1 + 0.2 }}
                                    className="text-2xl font-bold text-gray-900"
                                >
                                    {metric.value.toLocaleString()}
                                </motion.p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Status Checks */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-lg shadow-lg p-6"
            >
                <h3 className="text-lg font-medium text-gray-900 mb-6">Setup Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {checkMetrics.map((metric, index) => (
                        <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.5 }}
                            className="flex items-center space-x-3 p-4 rounded-lg bg-gray-50"
                        >
                            {metric.value ? (
                                <div className="flex items-center text-green-600">
                                    <CheckCircle className="h-5 w-5" />
                                </div>
                            ) : (
                                <div className="flex items-center text-red-600">
                                    <XCircle className="h-5 w-5" />
                                </div>
                            )}
                            <div>
                                <p className="text-sm font-medium text-gray-900">{metric.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Last Login */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-lg shadow p-4 flex items-center justify-between"
            >
                <div className="flex items-center">
                    <UserCog className="h-5 w-5 text-gray-400" />
                    <span className="ml-2 text-sm text-gray-500">Last Login:</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
          {new Date(usage.last_login).toLocaleString()}
        </span>
            </motion.div>
        </div>
    );
}
