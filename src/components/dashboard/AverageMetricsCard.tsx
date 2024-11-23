'use client';

import { motion } from "framer-motion";
import { 
  Calendar, 
  Briefcase, 
  Users, 
  UserCircle,
} from "lucide-react";

interface AverageMetricsProps {
  metrics: {
    average_appointments_per_service: number;
    average_services_per_business: number;
    average_customers_per_business: number;
    average_staff_members_per_business: number;
  };
}

export default function AverageMetricsCard({ metrics }: AverageMetricsProps) {
  const metricsData = [
    {
      label: "Appointments per Service",
      value: metrics.average_appointments_per_service,
      icon: Calendar,
      color: "bg-blue-50 text-blue-600",
      valueColor: "text-blue-600",
    },
    {
      label: "Services per Business",
      value: metrics.average_services_per_business,
      icon: Briefcase,
      color: "bg-purple-50 text-purple-600",
      valueColor: "text-purple-600",
    },
    {
      label: "Customers per Business",
      value: metrics.average_customers_per_business,
      icon: Users,
      color: "bg-green-50 text-green-600",
      valueColor: "text-green-600",
    },
    {
      label: "Staff Members per Business",
      value: metrics.average_staff_members_per_business,
      icon: UserCircle,
      color: "bg-orange-50 text-orange-600",
      valueColor: "text-orange-600",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Average Metrics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metricsData.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex items-center space-x-4 p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors duration-200 group">
                <div className={`p-3 rounded-lg ${metric.color} transition-colors duration-200`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
                    {metric.label}
                  </h4>
                  <div className="flex items-center mt-1">
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`text-2xl font-bold ${metric.valueColor}`}
                    >
                      {metric.value.toFixed(1)}
                    </motion.span>
                  </div>
                </div>
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  style={{
                    backgroundImage: `linear-gradient(to right, transparent, ${metric.valueColor.includes('blue') ? '#2563eb' : 
                      metric.valueColor.includes('purple') ? '#9333ea' : 
                      metric.valueColor.includes('green') ? '#16a34a' : 
                      '#ea580c'})`,
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}