'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Users, Clock, AlertCircle, Loader2, CheckCircle2, X, Filter, Phone } from 'lucide-react';
import type { BroadcastSMSRequest, BroadcastSMSResponse, PreviewResponse, BroadcastMode } from '@/types/broadcast';

const API_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8000'
  : 'https://api.bookiz.co.il/api/v1';

export default function BroadcastPage() {
  const [message, setMessage] = useState('');
  const [mode, setMode] = useState<BroadcastMode>('filter');
  const [filter, setFilter] = useState<Partial<BroadcastSMSRequest>>({
    is_test_mode: true
  });
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([]);
  const [phoneNumberInput, setPhoneNumberInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<PreviewResponse | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (isTest: boolean = true) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      // Validate inputs
      if (!message.trim()) {
        throw new Error('Message cannot be empty');
      }

      if (mode === 'manual' && phoneNumbers.length === 0) {
        throw new Error('Please add at least one phone number');
      }

      if (mode === 'filter' && Object.keys(filter).length <= 1) {
        throw new Error('Please select at least one filter');
      }

      // Prepare request payload
      const payload = mode === 'filter'
        ? { message, ...filter, is_test_mode: isTest }
        : { message, phone_numbers: phoneNumbers, is_test_mode: isTest };

      // If not in test mode, send the broadcast
      if (!isTest) {
        const broadcastResponse = await fetch(`${API_URL}/notifications/sms/broadcast/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });

        if (!broadcastResponse.ok) {
          const errorData = await broadcastResponse.json();
          throw new Error(errorData.error || 'Failed to send broadcast');
        }

        setSuccess(true);
        setPreview(null);
        return;
      }

      // Get preview of recipients
      const previewResponse = await fetch(`${API_URL}/api/v1/notifications/sms/preview-recipients/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mode === 'filter' ? filter : { phone_numbers: phoneNumbers })
      });

      if (!previewResponse.ok) {
        const errorData = await previewResponse.json();
        throw new Error(errorData.error || 'Failed to fetch preview');
      }

      const previewData: PreviewResponse = await previewResponse.json();
      
      if (previewData.total_count === 0) {
        throw new Error('No recipients match the selected criteria');
      }

      setPreview(previewData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setPreview(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (key: keyof BroadcastSMSRequest, value: any) => {
    setFilter(prev => {
      const newFilter = { ...prev };
      
      if (key === 'only_trial_users' && value) {
        delete newFilter.subscription_status;
      } else if (key === 'subscription_status' && value) {
        delete newFilter.only_trial_users;
      }
      
      if (key === 'joined_within_days' && value) {
        delete newFilter.joined_within_months;
      } else if (key === 'joined_within_months' && value) {
        delete newFilter.joined_within_days;
      }

      if (value === '' || value === false) {
        delete newFilter[key];
      } else {
        newFilter[key] = value;
      }

      return newFilter;
    });
  };

  const handleAddPhoneNumber = () => {
    if (!phoneNumberInput) return;
    
    // Basic Israeli phone number validation
    const formattedNumber = phoneNumberInput.replace(/\D/g, '');
    if (formattedNumber.length !== 10 || !formattedNumber.startsWith('05')) {
      setError('Invalid phone number format');
      return;
    }

    setPhoneNumbers(prev => [...new Set([...prev, formattedNumber])]);
    setPhoneNumberInput('');
    setError(null);
  };

  const handleRemovePhoneNumber = (number: string) => {
    setPhoneNumbers(prev => prev.filter(n => n !== number));
  };

  const handleRemoveRecipient = (id: string) => {
    if (!preview) return;
    setPreview({
      ...preview,
      total_count: preview.total_count - 1,
      recipients: preview.recipients.filter(r => r.id !== id)
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleClearPreview = () => {
    setPreview(null);
    setError(null);
    setSuccess(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Broadcast Messages</h1>
        <p className="mt-1 text-sm text-gray-500">
          Send SMS messages to targeted groups of users
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Mode Selector */}
          <div className="bg-white rounded-lg shadow">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex">
                <button
                  onClick={() => setMode('filter')}
                  className={`w-1/2 py-4 px-1 text-center border-b-2 text-sm font-medium ${
                    mode === 'filter'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Filter className="inline-block h-5 w-5 mr-2" />
                  Filter Mode
                </button>
                <button
                  onClick={() => setMode('manual')}
                  className={`w-1/2 py-4 px-1 text-center border-b-2 text-sm font-medium ${
                    mode === 'manual'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Phone className="inline-block h-5 w-5 mr-2" />
                  Manual Numbers
                </button>
              </nav>
            </div>
          </div>

          {/* Message Composer */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Compose Message</h2>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-32 px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Type your message here..."
            />
            <p className="mt-2 text-sm text-gray-500">
              Characters: {message.length} ({Math.ceil(message.length / 160)} SMS segments)
            </p>
          </div>

          {mode === 'filter' ? (
            /* Filters */
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Target Audience</h2>
              
              {/* User Type */}
              <div className="space-y-4 mb-6">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={filter.all_business_users || false}
                    onChange={(e) => handleFilterChange('all_business_users', e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">All Business Users</span>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={filter.only_trial_users || false}
                    onChange={(e) => handleFilterChange('only_trial_users', e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">Only Trial Users</span>
                </label>
              </div>

              {/* Time Filters */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Joined Within Days
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={filter.joined_within_days || ''}
                    onChange={(e) => handleFilterChange('joined_within_days', e.target.value ? parseInt(e.target.value) : '')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Joined Within Months
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={filter.joined_within_months || ''}
                    onChange={(e) => handleFilterChange('joined_within_months', e.target.value ? parseInt(e.target.value) : '')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Subscription Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subscription Status
                </label>
                <select
                  value={filter.subscription_status || ''}
                  onChange={(e) => handleFilterChange('subscription_status', e.target.value || '')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select status...</option>
                  <option value="TRIAL">Trial</option>
                  <option value="ACTIVE">Active</option>
                  <option value="CANCELLED">Cancelled</option>
                  <option value="EXPIRED">Expired</option>
                  <option value="PAYMENT_FAILED">Payment Failed</option>
                  <option value="BETA">Beta</option>
                </select>
              </div>
            </div>
          ) : (
            /* Manual Phone Numbers */
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Phone Numbers</h2>
              
              <div className="flex space-x-2 mb-4">
                <input
                  type="tel"
                  value={phoneNumberInput}
                  onChange={(e) => setPhoneNumberInput(e.target.value)}
                  placeholder="Enter phone number..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  onClick={handleAddPhoneNumber}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Add
                </button>
              </div>

              {error && (
                <p className="text-sm text-red-600 mb-4">{error}</p>
              )}

              <div className="space-y-2">
                {phoneNumbers.map((number) => (
                  <div
                    key={number}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                  >
                    <span className="text-sm text-gray-600">{number}</span>
                    <button
                      onClick={() => handleRemovePhoneNumber(number)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {phoneNumbers.length > 0 && (
                <p className="mt-4 text-sm text-gray-500">
                  {phoneNumbers.length} number{phoneNumbers.length === 1 ? '' : 's'} added
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={() => handleSubmit(true)}
              disabled={isLoading || !message || (mode === 'filter' ? Object.keys(filter).length === 1 : phoneNumbers.length === 0)}
              className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Preview Recipients
            </button>
            <button
              onClick={() => handleSubmit(false)}
              disabled={isLoading || !message || (mode === 'filter' ? Object.keys(filter).length === 1 : phoneNumbers.length === 0)}
              className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send Broadcast
            </button>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Preview</h2>
              {preview && (
                <button
                  onClick={handleClearPreview}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear All
                </button>
              )}
            </div>
            
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="h-8 w-8 text-primary-600 animate-spin" />
                <p className="mt-2 text-sm text-gray-500">Loading preview...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-8 text-red-600">
                <AlertCircle className="h-8 w-8" />
                <p className="mt-2 text-sm text-center">{error}</p>
              </div>
            ) : success ? (
              <div className="flex flex-col items-center justify-center py-8 text-green-600">
                <CheckCircle2 className="h-8 w-8" />
                <p className="mt-2 text-sm">Broadcast sent successfully!</p>
              </div>
            ) : preview ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Recipients</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{preview.total_count}</span>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-900">Recipients List</h3>
                    <span className="text-xs text-gray-500">
                      {preview.recipients.length} selected
                    </span>
                  </div>
                  <div className="max-h-[calc(100vh-400px)] overflow-y-auto space-y-2">
                    {preview.recipients.map((recipient) => (
                      <div
                        key={recipient.id}
                        className="relative p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                      >
                        <button
                          onClick={() => handleRemoveRecipient(recipient.id)}
                          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <div className="pr-6">
                          <p className="text-sm font-medium text-gray-900">
                            {recipient.first_name} {recipient.last_name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {recipient.business_name}
                          </p>
                          <div className="mt-1 flex items-center text-xs text-gray-500 space-x-2">
                            <span>{recipient.phone_number}</span>
                            <span>•</span>
                            <span>{recipient.subscription_status}</span>
                            <span>•</span>
                            <span>Joined {formatDate(recipient.joined_date)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                <MessageSquare className="h-8 w-8" />
                <p className="mt-2 text-sm">Preview will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
} 