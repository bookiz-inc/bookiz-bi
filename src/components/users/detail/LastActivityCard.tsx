'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, UserPlus, LogIn } from 'lucide-react';
import type { ActivityEvent } from '@/types/userActivity';
import { format } from 'date-fns';

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

interface LastActivityCardProps {
  userId: string;
}

export default function LastActivityCard({ userId }: LastActivityCardProps) {
  const [lastActivities, setLastActivities] = useState<ActivityEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLastActivities = async () => {
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

        if (!response.ok) throw new Error('Failed to fetch activities');

        const data = await response.json();
        const sortedActivities = data.results.events
          .sort((a: { properties: { time: number; }; }, b: { properties: { time: number; }; }) => b.properties.time - a.properties.time)
          .slice(0, 5);

        setLastActivities(sortedActivities);
      } catch (error) {
        console.error('Failed to fetch last activities:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLastActivities();
  }, [userId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-6"
    >
      <div className="flex items-center space-x-2 mb-6">
        <Clock className="h-6 w-6 text-primary-500" />
        <h2 className="text-lg font-medium text-gray-900">Recent Activities</h2>
      </div>

      <div className="space-y-4">
        {lastActivities.map((activity, index) => {
          const Icon = getEventIcon(activity.event);
          const date = new Date(activity.properties.time * 1000);

          return (
            <motion.div
              key={`${activity.event}-${activity.properties.time}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0">
                <Icon className="h-5 w-5 text-gray-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {activity.event}
                </p>
                <p className="text-xs text-gray-500">
                  {format(date, 'dd/MM/yyyy HH:mm')}
                </p>
              </div>
            </motion.div>
          );
        })}

        {isLoading && (
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-5 w-5 bg-gray-200 rounded" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
