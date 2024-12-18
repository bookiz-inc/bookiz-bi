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
    LinkIcon,
    Building2,
    Activity,
    Users,
    Trash2
} from "lucide-react";
import { UserDetail } from "@/types/userDetail";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DeleteUserButton from './DeleteUserButton';

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
        <div className="space-y-6">
            {/* Back button and page title with glassmorphism */}
            <div className="flex items-center justify-between bg-white/30 backdrop-blur-md p-4 rounded-xl shadow-sm">
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-gray-600 hover:text-gray-900 transition-all hover:scale-105"
                >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    <span>Back to Users</span>
                </button>

                <button
                    onClick={onRefresh}
                    disabled={isRefreshing}
                    className={`flex text-black items-center px-4 py-2 rounded-xl bg-white/50 hover:bg-white/80 transition-all hover:scale-105 ${
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
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-8 border border-gray-100"
            >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    {/* User Info */}
                    <div className="flex items-start space-x-6">
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="relative"
                        >
                            <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg">
                                {user.profile_image ? (
                                    <img
                                        src={user.profile_image}
                                        alt={`${user.first_name} ${user.last_name}`}
                                        className="h-24 w-24 rounded-2xl object-cover"
                                    />
                                ) : (
                                    <span className="text-3xl font-bold text-white">
                                        {user.first_name[0]}{user.last_name[0]}
                                    </span>
                                )}
                            </div>
                            <div className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-green-400 border-2 border-white"></div>
                        </motion.div>
                        
                        <div className="rtl">
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                                {user.first_name} {user.last_name}
                            </h1>
                            <p className="text-gray-500 mt-1">{user.business.name}</p>
                            <div className="flex items-center mt-3 space-x-3">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all hover:scale-105 ${
                                    user.is_active
                                        ? "bg-green-100 text-green-800 border border-green-200"
                                        : "bg-red-100 text-red-800 border border-red-200"
                                }`}>
                                    {user.is_active ? "Active" : "Inactive"}
                                </span>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200 transition-all hover:scale-105">
                                    {user.user_type}
                                </span>
                                {user.is_staff && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 border border-purple-200 transition-all hover:scale-105">
                                        <Shield className="w-4 h-4 mr-1" />
                                        Staff
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            target="_blank"
                            href={`https://app.bookiz.co.il/b/${user.business.id}`}
                            className="inline-flex items-center bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-2 rounded-xl shadow-sm text-sm font-medium text-white hover:from-primary-700 hover:to-primary-800 transition-all"
                        >
                            <LinkIcon className="h-4 w-4 mr-2"/>
                            דף עסק
                        </motion.a>
                        
                        {/* Convert other buttons to motion buttons with similar styling */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleWhatsAppClick}
                            className="inline-flex items-center px-4 py-2 rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all"
                        >
                            <MessageCircle className="h-4 w-4 mr-2"/>
                            WhatsApp
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleEmailClick}
                            className="inline-flex items-center px-4 py-2 rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all"
                        >
                            <Mail className="h-4 w-4 mr-2"/>
                            Email
                        </motion.button>

                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={`tel:${user.phone_number}`}
                            className="inline-flex items-center px-4 py-2 rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-all"
                        >
                            <Phone className="h-4 w-4 mr-2"/>
                            Call
                        </motion.a>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100"
                    >
                        <Mail className="h-10 w-10 text-blue-500 mr-4"/>
                        <div dir="rtl">
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="text-sm font-medium text-gray-900">{user.email}</p>
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100"
                    >
                        <Phone className="h-10 w-10 text-green-500 mr-4" />
                        <div dir="rtl">
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="text-sm font-medium text-gray-900">{user.phone_number}</p>
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100"
                    >
                        <Calendar className="h-10 w-10 text-purple-500 mr-4" />
                        <div dir="rtl">
                            <p className="text-sm text-gray-500">Joined</p>
                            <p className="text-sm font-medium text-gray-900">{formattedDate}</p>
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100"
                    >
                        <Building2 className="h-10 w-10 text-primary-500 mr-4" />
                        <div dir="rtl">
                            <p className="text-sm text-gray-500">Business ID</p>
                            <p className="text-sm font-medium text-gray-900">#{user.business.id}</p>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-8 border-t border-gray-100 pt-6">
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                                <Trash2 className="h-6 w-6 text-red-500" />
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-red-700">Danger Zone</h3>
                                <p className="text-sm text-red-600">
                                    Permanently delete this user and all associated data
                                </p>
                            </div>
                        </div>
                        <DeleteUserButton 
                            userId={user.id.toString()} 
                            className="px-4 py-2 bg-white text-red-600 rounded-xl border border-red-200 
                                      hover:bg-red-600 hover:text-white transition-all duration-200 
                                      flex items-center space-x-2 font-medium"
                        />
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
