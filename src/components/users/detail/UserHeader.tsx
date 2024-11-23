"use client";

import { motion } from "framer-motion";
import {
    ArrowLeft,
    Mail,
    Phone,
    Calendar,
    Shield,
    RefreshCw,
    MessageCircle,
} from "lucide-react";
import { UserDetail } from "@/types/userDetail";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserHeaderProps {
    user: UserDetail;
    onRefresh: () => void;
    isRefreshing?: boolean;
}

export default function UserHeader({ user, onRefresh, isRefreshing = false }: UserHeaderProps) {
    const router = useRouter();
    const [formattedDate, setFormattedDate] = useState<string>("");

    useEffect(() => {
        setFormattedDate(new Date(user.date_joined).toLocaleDateString());
    }, [user.date_joined]);

    const handleWhatsAppClick = () => {
        // Remove any non-digit characters from phone number
        const cleanPhone = user.phone_number.replace(/\D/g, '');
        // Add country code if not present (assuming Israel)
        const phoneWithCountry = cleanPhone.startsWith('972')
            ? cleanPhone
            : `972${cleanPhone.startsWith('0') ? cleanPhone.slice(1) : cleanPhone}`;
        window.open(`https://wa.me/${phoneWithCountry}`, '_blank');
    };

    const handleEmailClick = () => {
        window.location.href = `mailto:${user.email}`;
    };

    return (
        <div className="space-y-4">
            {/* Back button and page title */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    <span>Back to Users</span>
                </button>

                <button
                    onClick={onRefresh}
                    disabled={isRefreshing}
                    className={`flex items-center px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors ${
                        isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    <RefreshCw className={`h-5 w-5 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                    <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
                </button>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm p-6"
            >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    {/* User Info */}
                    <div className="flex items-center mb-4 md:mb-0">
                        <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
                            {user.profile_image ? (
                                <img
                                    src={user.profile_image}
                                    alt={`${user.first_name} ${user.last_name}`}
                                    className="h-16 w-16 rounded-full object-cover"
                                />
                            ) : (
                                <span className="text-2xl font-semibold text-primary-700 rtl">
                  {user.first_name[0]}
                                    {user.last_name[0]}
                </span>
                            )}
                        </div>
                        <div className="ml-4 rtl">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {user.first_name} {user.last_name}
                            </h1>
                            <div className="flex items-center mt-1 space-x-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.is_active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                }`}>
                  {user.is_active ? "Active" : "Inactive"}
                </span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {user.user_type}
                </span>
                                {user.is_staff && (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    <Shield className="w-3 h-3 mr-1" />
                    Staff
                  </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={handleWhatsAppClick}
                            className="inline-flex items-center px-4 py-2 border border-green-500 rounded-md shadow-sm text-sm font-medium text-green-600 bg-white hover:bg-green-50 transition-colors"
                        >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            WhatsApp
                        </button>

                        <button
                            onClick={handleEmailClick}
                            className="inline-flex items-center px-4 py-2 border border-blue-500 rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 transition-colors"
                        >
                            <Mail className="h-4 w-4 mr-2" />
                            Email
                        </button>

                        <a
                            href={`tel:${user.phone_number}`}
                            className="inline-flex items-center px-4 py-2 border border-primary-500 rounded-md shadow-sm text-sm font-medium text-primary-600 bg-white hover:bg-primary-50 transition-colors"
                        >
                            <Phone className="h-4 w-4 mr-2" />
                            Call
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="flex items-center">
                        <Mail className="h-5 w-5 text-gray-400 mr-2" />
                        <div dir="rtl">
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="text-sm font-medium text-gray-900">{user.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Phone className="h-5 w-5 text-gray-400 mr-2" />
                        <div dir="rtl">
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="text-sm font-medium text-gray-900">{user.phone_number}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                        <div dir="rtl">
                            <p className="text-sm text-gray-500">Joined</p>
                            <p className="text-sm font-medium text-gray-900">
                                {formattedDate}
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
