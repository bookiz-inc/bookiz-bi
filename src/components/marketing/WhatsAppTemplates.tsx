'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, ChevronDown, ExternalLink, CheckCircle2, XCircle, Image as ImageIcon, FileText, AlertCircle } from 'lucide-react';

interface WhatsAppTemplate {
  id: string;
  elementName: string;
  category: string;
  status: string;
  language: {
    key: string;
    value: string;
    text: string;
  };
  header: {
    type: number;
    headerTypeString: string;
    text: string | null;
    link: string | null;
  };
  body: string;
  buttons: Array<{
    type: string;
    parameter: {
      text: string;
      url?: string;
    };
  }>;
}

interface WhatsAppTemplatesProps {
  templates: WhatsAppTemplate[];
}

export default function WhatsAppTemplates({ templates }: WhatsAppTemplatesProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...new Set(templates.map(t => t.category.toLowerCase()))];
  
  const filteredTemplates = templates.filter(t => 
    selectedCategory === 'all' || t.category.toLowerCase() === selectedCategory
  );

  const getHeaderIcon = (type: number) => {
    switch (type) {
      case 2: return <ImageIcon className="h-5 w-5" />;
      case 4: return <FileText className="h-5 w-5" />;
      default: return <MessageSquare className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'text-green-600';
      case 'deleted': return 'text-red-600';
      default: return 'text-yellow-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved': return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'deleted': return <XCircle className="h-5 w-5 text-red-600" />;
      default: return <AlertCircle className="h-5 w-5 text-yellow-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">WhatsApp Templates</h2>
          <p className="mt-1 text-sm text-gray-500">Manage and view your WhatsApp message templates</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <motion.div
            key={template.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Template Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  {getHeaderIcon(template.header?.type || 0)}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {template.elementName.split('_').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </h3>
                    <p className="text-xs text-gray-500">{template.language.text}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(template.status)}
                  <span className={`text-xs font-medium ${getStatusColor(template.status)}`}>
                    {template.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Template Preview */}
            <div className="p-4">
              <div 
                className={`relative ${
                  expandedId === template.id ? '' : 'max-h-24 overflow-hidden'
                }`}
              >
                <p className="text-sm text-gray-600 whitespace-pre-line">
                  {template.body}
                </p>
                {expandedId !== template.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
                )}
              </div>
              
              <button
                onClick={() => setExpandedId(expandedId === template.id ? null : template.id)}
                className="mt-2 text-sm text-primary-600 hover:text-primary-700 flex items-center"
              >
                {expandedId === template.id ? 'Show less' : 'Show more'}
                <ChevronDown 
                  className={`ml-1 h-4 w-4 transform transition-transform ${
                    expandedId === template.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            {/* Template Actions */}
            {template.buttons && template.buttons.length > 0 && (
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {template.buttons.map((button, index) => (
                    button.parameter.url ? (
                      <a
                        key={index}
                        href={button.parameter.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                      >
                        {button.parameter.text}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    ) : (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white border border-gray-200 text-gray-700"
                      >
                        {button.parameter.text}
                      </span>
                    )
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
} 