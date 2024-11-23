'use client';

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  description?: string;
  color: string;
}

export default function StatsCard({ title, value, icon: Icon, description, color }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow p-6"
    >
      <div className="flex items-center">
        <div className={`p-3 rounded-lg bg-${color}-50`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
      </div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="mt-4"
      >
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl font-bold text-gray-900 mt-2"
        >
          {value.toLocaleString()}
        </motion.p>
        {description && (
          <p className="mt-2 text-sm text-gray-500">{description}</p>
        )}
      </motion.div>
    </motion.div>
  );
}