'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, UserPlus, LogIn } from 'lucide-react';
import type { ActivityEvent, UserActivityResponse } from '@/types/userActivity';

interface UserActivityProps {
  userId: string;
}

export default function UserActivity({ userId }: UserActivityProps) {
  const [activities, setActivities] = useState<ActivityEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        const response = await fetch(
          `https://eu.mixpanel.com/api/query/stream/query?project_id=3395811&distinct_ids=%5B%22${userId}%22%5D&from_date=${sevenDaysAgo.toISOString().split('T')[0]}&to_date=${new Date().toISOString().split('T')[0]}`,
          {
            headers: {
              'accept': 'application/json',
              'authorization': 'Basic cHl0aG9uX3NlcnZpY2UuYTgwNDFjLm1wLXNlcnZpY2UtYWNjb3VudDo0NGczRXlpWHBVbXVkYUFWd2xjMFp6Z1U3THE5MUpRWg=='
            }
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch activity data');
        }

        const data: UserActivityResponse = await response.json();
        setActivities(data.results.events);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch activity');
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivity();
  }, [userId]);

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'Business Add Appointment':
        return Calendar;
      case 'Add Manual Customer':
        return UserPlus;
      case 'User Login':
        return LogIn;
      default:
        return Clock;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-6"
    >
      <h3 className="text-lg font-medium text-gray-900 mb-6">Recent Activity</h3>
      <div className="space-y-6">
        {activities.map((activity, index) => {
          const Icon = getEventIcon(activity.event);
          const date = new Date(activity.properties.time * 1000);

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-4"
            >
              <div className="bg-gray-100 rounded-full p-2">
                <Icon className="h-5 w-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.event}</p>
                <p className="text-sm text-gray-500">
                  {activity.properties.service_name && `Service: ${activity.properties.service_name}`}
                  {activity.properties.login_method && `Method: ${activity.properties.login_method}`}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {date.toLocaleString()}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}