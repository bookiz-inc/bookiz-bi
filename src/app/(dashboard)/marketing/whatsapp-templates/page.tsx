'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, AlertCircle } from 'lucide-react';
import WhatsAppTemplates from '@/components/marketing/WhatsAppTemplates';

interface WhatsAppTemplateResponse {
  result: string;
  messageTemplates: any[];
  link: {
    prevPage: null | string;
    nextPage: null | string;
    pageNumber: number;
    pageSize: number;
    total: number;
  };
}

export default function WhatsAppTemplatesPage() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchTemplates = async () => {
    try {
      setError(null);
      const response = await fetch(`/api/whatsapp/templates`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch templates');
      }

      const data: WhatsAppTemplateResponse = await response.json();
      setTemplates(data.messageTemplates);
    } catch (err) {
      setError('Failed to load WhatsApp templates. Please try again.');
      console.error('Error fetching templates:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchTemplates();
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <RefreshCw className="h-8 w-8 text-primary-600 animate-spin" />
          <p className="text-gray-600">Loading templates...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <AlertCircle className="h-8 w-8 text-red-600" />
          <p className="text-gray-600">{error}</p>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-8"
    >
      <WhatsAppTemplates templates={templates} />
    </motion.div>
  );
} 