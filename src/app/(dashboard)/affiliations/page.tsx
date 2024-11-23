'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import AffiliationsTable from '@/components/affiliations/AffiliationsTable';
import CreateAffiliationModal from '@/components/affiliations/CreateAffiliationModal';
import { mockAffiliations } from '@/data/mockAffiliations';

export default function AffiliationsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Affiliations</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Affiliation
        </button>
      </div>

      <AffiliationsTable affiliations={mockAffiliations} />
      
      <CreateAffiliationModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}