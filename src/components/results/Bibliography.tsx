'use client';

import { useState } from 'react';
import { Book, ExternalLink, Copy, Search, Filter } from 'lucide-react';

interface BibliographyEntry {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  volume?: string;
  pages?: string;
  doi?: string;
  pmid?: string;
  type: 'journal' | 'book' | 'conference' | 'preprint';
  abstract?: string;
}

const mockBibliography: BibliographyEntry[] = [
  {
    id: '1',
    title: 'CRISPR-Cas9 genome editing: A comprehensive review of mechanisms and applications',
    authors: ['Zhang, F.', 'Wen, Y.', 'Guo, X.'],
    journal: 'Nature Biotechnology',
    year: 2023,
    volume: '41',
    pages: '123-145',
    doi: '10.1038/nbt.2023.123',
    pmid: '37234567',
    type: 'journal',
    abstract: 'CRISPR-Cas9 has revolutionized genome editing with unprecedented precision and efficiency...'
  },
  {
    id: '2',
    title: 'Prime editing for precise genome modifications',
    authors: ['Anzalone, A.V.', 'Randolph, P.B.', 'Davis, J.R.', 'Sousa, A.A.', 'Koblan, L.W.'],
    journal: 'Nature',
    year: 2019,
    volume: '576',
    pages: '149-157',
    doi: '10.1038/s41586-019-1711-4',
    pmid: '31634902',
    type: 'journal',
    abstract: 'Prime editing is a versatile and precise genome editing method that directly writes new genetic information...'
  },
  {
    id: '3',
    title: 'Base editing: precision chemistry on the genome and transcriptome of living cells',
    authors: ['Rees, H.A.', 'Liu, D.R.'],
    journal: 'Nature Reviews Genetics',
    year: 2018,
    volume: '19',
    pages: '770-788',
    doi: '10.1038/s41576-018-0059-1',
    pmid: '30323312',
    type: 'journal',
    abstract: 'Base editors enable the precise, irreversible conversion of one target DNA base into another...'
  },
  {
    id: '4',
    title: 'Therapeutic applications of CRISPR gene editing',
    authors: ['Doudna, J.A.', 'Charpentier, E.'],
    journal: 'Science',
    year: 2022,
    volume: '378',
    pages: '1234-1245',
    doi: '10.1126/science.abm1234',
    pmid: '36789012',
    type: 'journal',
    abstract: 'CRISPR technology has moved from laboratory tool to clinical reality...'
  },
  {
    id: '5',
    title: 'Safety considerations for CRISPR-based therapeutics',
    authors: ['Smith, J.K.', 'Johnson, M.L.', 'Brown, A.R.'],
    journal: 'Cell',
    year: 2023,
    volume: '186',
    pages: '456-470',
    doi: '10.1016/j.cell.2023.01.023',
    pmid: '37123456',
    type: 'journal',
    abstract: 'As CRISPR moves toward clinical applications, comprehensive safety evaluation is crucial...'
  }
];

export default function Bibliography() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'journal' | 'book' | 'conference' | 'preprint'>('all');
  const [selectedEntry, setSelectedEntry] = useState<BibliographyEntry | null>(null);

  const filteredBibliography = mockBibliography.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterType === 'all' || entry.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const copyReference = (entry: BibliographyEntry, format: 'apa' | 'mla' | 'chicago') => {
    let citation = '';
    const authorsStr = entry.authors.join(', ');
    
    switch (format) {
      case 'apa':
        citation = `${authorsStr} (${entry.year}). ${entry.title}. ${entry.journal}, ${entry.volume}, ${entry.pages}. https://doi.org/${entry.doi}`;
        break;
      case 'mla':
        citation = `${authorsStr}. "${entry.title}." ${entry.journal}, vol. ${entry.volume}, ${entry.year}, pp. ${entry.pages}.`;
        break;
      case 'chicago':
        citation = `${authorsStr}. "${entry.title}." ${entry.journal} ${entry.volume} (${entry.year}): ${entry.pages}.`;
        break;
    }
    
    navigator.clipboard.writeText(citation);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'journal':
        return 'text-blue-400 bg-blue-400/20';
      case 'book':
        return 'text-green-400 bg-green-400/20';
      case 'conference':
        return 'text-purple-400 bg-purple-400/20';
      case 'preprint':
        return 'text-orange-400 bg-orange-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-yellow-400/20">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-yellow-400 to-yellow-100 bg-clip-text text-transparent mb-3">
          Bibliography
        </h3>
        
        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400/60 w-4 h-4" />
          <input
            type="text"
            placeholder="Search references..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-black/30 border border-yellow-400/20 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:border-yellow-400/40"
          />
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-yellow-400/60" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="bg-black/30 border border-yellow-400/20 rounded text-white text-xs px-2 py-1 focus:outline-none focus:border-yellow-400/40"
          >
            <option value="all">All Types</option>
            <option value="journal">Journal</option>
            <option value="book">Book</option>
            <option value="conference">Conference</option>
            <option value="preprint">Preprint</option>
          </select>
        </div>
      </div>

      {/* Bibliography List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-3">
          {filteredBibliography.map((entry) => (
            <div
              key={entry.id}
              className="p-3 bg-black/30 border border-yellow-400/10 rounded-lg hover:border-yellow-400/30 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <span className={`px-2 py-0.5 text-xs rounded-full ${getTypeColor(entry.type)}`}>
                  {entry.type}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => copyReference(entry, 'apa')}
                    className="p-1 text-yellow-400/60 hover:text-yellow-400 transition-colors"
                    title="Copy APA citation"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                  {entry.doi && (
                    <button
                      onClick={() => window.open(`https://doi.org/${entry.doi}`, '_blank')}
                      className="p-1 text-yellow-400/60 hover:text-yellow-400 transition-colors"
                      title="Open DOI link"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
              
              <h4 className="text-sm font-medium text-white mb-2 leading-tight">
                {entry.title}
              </h4>
              
              <div className="text-xs text-gray-400 mb-2">
                <div className="mb-1">
                  {entry.authors.join(', ')}
                </div>
                <div>
                  <span className="font-medium">{entry.journal}</span>
                  {entry.volume && ` ${entry.volume}`}
                  {entry.pages && `, ${entry.pages}`}
                  {` (${entry.year})`}
                </div>
              </div>

              {entry.abstract && (
                <div className="text-xs text-gray-500 mt-2 line-clamp-2">
                  {entry.abstract}
                </div>
              )}

              <div className="flex gap-2 mt-2">
                {entry.pmid && (
                  <span className="text-xs text-blue-400">PMID: {entry.pmid}</span>
                )}
                {entry.doi && (
                  <span className="text-xs text-green-400 truncate">DOI: {entry.doi}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Citation Format Buttons */}
      <div className="p-3 border-t border-yellow-400/20">
        <div className="text-xs text-gray-400 mb-2">Copy citation format:</div>
        <div className="flex gap-2">
          <button className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded border border-blue-500/30 hover:bg-blue-500/30 transition-all">
            APA
          </button>
          <button className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded border border-green-500/30 hover:bg-green-500/30 transition-all">
            MLA
          </button>
          <button className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded border border-purple-500/30 hover:bg-purple-500/30 transition-all">
            Chicago
          </button>
        </div>
      </div>
    </div>
  );
}
