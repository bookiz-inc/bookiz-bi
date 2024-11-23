'use client';

import { motion } from "framer-motion";
import { MessageSquare, AlertTriangle } from "lucide-react";

interface SMSBalanceCardProps {
  balance: string;
  internationalBalance: number;
}

export default function SMSBalanceCard({ balance, internationalBalance }: SMSBalanceCardProps) {
  const balanceNumber = parseInt(balance, 10);
  const isLowBalance = balanceNumber < 300;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`p-3 rounded-lg ${isLowBalance ? 'bg-red-50' : 'bg-primary-50'}`}>
            <MessageSquare className={`h-6 w-6 ${isLowBalance ? 'text-red-600' : 'text-primary-600'}`} />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500">SMS Balance</h3>
            <div className="flex items-center mt-1">
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`text-2xl font-bold ${isLowBalance ? 'text-red-600' : 'text-gray-900'}`}
              >
                {balanceNumber.toLocaleString()}
              </motion.p>
              <span className="ml-2 text-sm text-gray-500">credits</span>
            </div>
          </div>
        </div>
        {isLowBalance && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center bg-red-50 px-3 py-2 rounded-md"
          >
            <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-sm text-red-600 font-medium">Low Balance</span>
          </motion.div>
        )}
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">International Balance</span>
          <span className="font-medium">{internationalBalance} NIS</span>
        </div>
      </div>
    </div>
  );
}
