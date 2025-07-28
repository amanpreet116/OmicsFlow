'use client';

import { useState } from 'react';
import { FileText, Search, Filter, Calendar } from 'lucide-react';
import { Document } from '../../app/results/page';

interface DocumentListProps {
  selectedDocument: Document | null;
  onSelectDocument: (document: Document) => void;
  documents: Document[]; // Add documents prop
}

export default function DocumentList({ selectedDocument, onSelectDocument, documents }: DocumentListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'processing' | 'draft'>('all');

  // Use documents from props instead of hardcoded mockDocuments
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || doc.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 bg-green-400/20';
      case 'processing':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'draft':
        return 'text-orange-400 bg-orange-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getTypeIcon = (type: string) => {
    return <FileText className="w-4 h-4 text-yellow-400" />; // Added color for better visibility
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-yellow-400/20">
        <h2 className="text-lg font-semibold bg-gradient-to-r from-yellow-400 to-yellow-100 bg-clip-text text-transparent mb-4">
          Created Documents
        </h2>
        
        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400/60 w-4 h-4" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-black/30 border border-yellow-400/20 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:border-yellow-400/40"
          />
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-yellow-400/60" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="bg-black/30 border border-yellow-400/20 rounded text-white text-xs px-2 py-1 focus:outline-none focus:border-yellow-400/40"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="processing">Processing</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Document List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-2">
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                onClick={() => onSelectDocument(doc)}
                className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:border-yellow-400/40 ${
                  selectedDocument?.id === doc.id
                    ? 'border-yellow-400/60 bg-yellow-400/10'
                    : 'border-yellow-400/20 bg-black/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getTypeIcon(doc.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-white truncate mb-1">
                      {doc.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(doc.status)}`}>
                        {doc.status}
                      </span>
                      <span className="text-xs text-gray-400 uppercase">
                        {doc.type}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(doc.createdAt).toLocaleDateString()}
                      </span>
                      <span>{doc.size}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-400">
              <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No documents found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
