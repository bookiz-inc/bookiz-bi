"use client";

import { motion } from "framer-motion";
import { Building2, MapPin, Crown } from "lucide-react";
import { BusinessDetail } from "@/types/userDetail";

export default function BusinessInfo({ business }: { business: BusinessDetail }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm p-6"
        >
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Business Information</h2>

            <div className="space-y-6">
                <div className="flex items-start">
                    <Building2 className="h-5 w-5 text-gray-400 mt-1" />
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-900">{business.name}</h3>
                        <p className="text-sm text-gray-500">{business.profile.profession}</p>
                    </div>
                </div>

                <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                    <div className="ml-3">
                        <p className="text-sm text-gray-900">{business.profile.address}</p>
                        <p className="text-sm text-gray-500">
                            {business.profile.city}, {business.profile.country}
                            {business.profile.zip_code && ` ${business.profile.zip_code}`}
                        </p>
                    </div>
                </div>

                <div className="border-t pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <p className="text-sm text-gray-500">Subscription Plan</p>
                            <div className="flex items-center mt-1">
                                <Crown className="h-4 w-4 text-yellow-400 mr-1" />
                                <p className="text-sm font-medium text-gray-900">
                                    {business.wanted_plan}
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Trial Days</p>
                            <p className="text-sm font-medium text-gray-900">{business.trial_days} days</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Payment Status</p>
                            <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    business.is_payment_verified
                                        ? "bg-green-100 text-green-800"
                                        : "bg-yellow-100 text-yellow-800"
                                }`}
                            >
                {business.is_payment_verified ? "Verified" : "Pending"}
              </span>
                        </div>
                    </div>
                </div>

                {business.profile.long_description && (
                    <div className="border-t pt-6">
                        <p className="text-sm text-gray-500 mb-2">Business Description</p>
                        <p className="text-sm text-gray-900">{business.profile.long_description}</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
