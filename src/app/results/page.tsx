// src/app/results/page.tsx
'use client';

import { useState, useEffect } from 'react';
import DocumentList from '../../components/results/DocumentList';
import DocumentViewer from '../../components/results/DocumentViewer';
import Bibliography from '../../components/results/Bibliography';
import ReviewInsights from '../../components/results/ReviewInsights';
import { getDocumentContent, documentMetadata, pdfDocuments } from '../../data/document'; // Fixed import path
import { useRouter } from 'next/navigation'; // ✅ Fixed: Changed from 'next/router' to 'next/navigation'
import { ArrowLeft } from 'lucide-react';

export interface Document {
  id: string;
  title: string;
  type: 'pdf' | 'docx' | 'txt';
  createdAt: string;
  size: string;
  status: 'completed' | 'processing' | 'draft';
  content: string;          
  fullContent?: string;     
  url?: string;
  pdfData?: Uint8Array;
  diagrams?: DiagramData[];
}

export interface DiagramData {
  id: string;
  title: string;
  type: 'flowchart' | 'state' | 'timeline' | 'sequence';
  imageUrl: string;
  description?: string;
}

export default function ResultsPage() {
  const router = useRouter(); // ✅ This will now work correctly
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  // Load documents from data file on component mount
  useEffect(() => {
    const loadDocuments = async () => {
      try {
        setLoading(true);
        
        // Create documents array from your data file
        const documentsFromFile: Document[] = [
          {
            id: '1',
            title: documentMetadata.alzheimersParkinsonsPDF.title,
            type: documentMetadata.alzheimersParkinsonsPDF.type,
            createdAt: documentMetadata.alzheimersParkinsonsPDF.createdDate,
            size: documentMetadata.alzheimersParkinsonsPDF.size,
            status: 'completed',
            content: getDocumentContent('alzheimersParkinsonsPDF').substring(0, 200) + '...',
            fullContent: getDocumentContent('alzheimersParkinsonsPDF'),
            diagrams: [ // ✅ Added sample diagrams for the first document
              {
                id: 'alzheimers-flowchart',
                title: 'Gut-Brain Axis Flowchart',
                type: 'flowchart',
                imageUrl: '/images/diagrams/Flowchat.svg',
                description: 'Multi-omics integration workflow for Alzheimer\'s research'
              },
              {
                id: 'alzheimers-state',
                title: 'Disease State Diagram',
                type: 'state',
                imageUrl: '/images/diagrams/State.svg',
                description: 'Progressive states in neurodegenerative diseases'
              },
              {
                id: 'alzheimers-timeline',
                title: 'Research Timeline',
                type: 'timeline',
                imageUrl: '/images/diagrams/alzheimers-timeline.png',
                description: 'Timeline of gut microbiota research developments'
              },
              {
                id: 'alzheimers-sequence',
                title: 'Molecular Sequence',
                type: 'sequence',
                imageUrl: '/images/diagrams/Flowchart.svg',
                description: 'Sequence of molecular interactions in gut-brain axis'
              }
            ]
          },
          {
            id: '2',
            title: documentMetadata.crisprGenePDF.title,
            type: documentMetadata.crisprGenePDF.type,
            createdAt: documentMetadata.crisprGenePDF.createdDate,
            size: documentMetadata.crisprGenePDF.size,
            status: 'completed',
            content: getDocumentContent('crisprGenePDF').substring(0, 200) + '...',
            fullContent: getDocumentContent('crisprGenePDF'),
            diagrams: [ // ✅ Added sample diagrams for the second document
              {
                id: 'crispr-flowchart',
                title: 'CRISPR Process Flowchart',
                type: 'flowchart',
                imageUrl: '/images/diagrams/crispr-flowchart.png',
                description: 'CRISPR-Cas9 gene editing process workflow'
              },
              {
                id: 'crispr-state',
                title: 'CRISPR State Diagram',
                type: 'state',
                imageUrl: '/images/diagrams/crispr-state.png',
                description: 'State transitions in CRISPR gene editing'
              },
              {
                id: 'crispr-timeline',
                title: 'CRISPR Development Timeline',
                type: 'timeline',
                imageUrl: '/images/diagrams/crispr-timeline.png',
                description: 'Historical timeline of CRISPR technology development'
              },
              {
                id: 'crispr-sequence',
                title: 'CRISPR Sequence Diagram',
                type: 'sequence',
                imageUrl: '/images/diagrams/crispr-sequence.png',
                description: 'Sequence of molecular interactions in CRISPR'
              }
            ]
          },
          {
            id: '3',
            title: documentMetadata.proteinFoldingPDF.title,
            type: documentMetadata.proteinFoldingPDF.type,
            createdAt: documentMetadata.proteinFoldingPDF.createdDate,
            size: documentMetadata.proteinFoldingPDF.size,
            status: 'processing',
            content: getDocumentContent('proteinFoldingPDF').substring(0, 200) + '...',
            fullContent: getDocumentContent('proteinFoldingPDF'),
            diagrams: [ // ✅ Added sample diagrams for the third document
              {
                id: 'protein-flowchart',
                title: 'Protein Folding Process',
                type: 'flowchart',
                imageUrl: '/images/diagrams/protein-flowchart.png',
                description: 'Protein folding mechanism workflow'
              },
              {
                id: 'protein-state',
                title: 'Folding States',
                type: 'state',
                imageUrl: '/images/diagrams/protein-state.png',
                description: 'Different states in protein folding process'
              },
              {
                id: 'protein-timeline',
                title: 'Folding Timeline',
                type: 'timeline',
                imageUrl: '/images/diagrams/protein-timeline.png',
                description: 'Timeline of protein folding research milestones'
              },
              {
                id: 'protein-sequence',
                title: 'Amino Acid Sequence',
                type: 'sequence',
                imageUrl: '/images/diagrams/protein-sequence.png',
                description: 'Sequence of amino acid interactions in folding'
              }
            ]
          }
        ];

        setDocuments(documentsFromFile);
        
        // Auto-select first document if available
        if (documentsFromFile.length > 0) {
          setSelectedDocument(documentsFromFile[0]);
        }
      } catch (error) {
        console.error('Error loading documents:', error);
        setDocuments([]);
      } finally {
        setLoading(false);
      }
    };

    loadDocuments();
  }, []);

  // Handle back navigation
  const handleBackToExpert = () => {
    try {
      router.push('/expert'); // Navigate to expert page
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback navigation
      if (typeof window !== 'undefined') {
        window.location.href = '/expert';
      }
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-br from-[#131417] via-[#191919] to-[#0e0e11] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-yellow-100 text-lg">Loading documents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-[#131417] via-[#191919] to-[#0e0e11] overflow-hidden">
      {/* Full screen 3-section layout */}
      <div className="flex h-full">
        {/* Section 1: Document List with Back Button (Left - 25%) */}
        <div className="w-1/4 border-r border-yellow-400/20 bg-black/20 backdrop-blur-sm flex flex-col">
          {/* Back Button Header */}
          <div className="p-4 border-b border-yellow-400/20 bg-black/30">
            <button
              onClick={handleBackToExpert}
              className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-yellow-400/10 to-yellow-500/10 border border-yellow-400/30 rounded-lg text-yellow-400 hover:bg-yellow-400/20 hover:border-yellow-400/50 transition-all duration-200 text-sm font-medium w-full justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Expert
            </button>
          </div>
          
          {/* Document List - takes remaining space */}
          <div className="flex-1 overflow-hidden">
            <DocumentList 
              selectedDocument={selectedDocument}
              onSelectDocument={setSelectedDocument}
              documents={documents}
            />
          </div>
        </div>
        
        {/* Section 2: Document Viewer (Center - 50%) */}
        <div className="w-1/2 border-r border-yellow-400/20 bg-black/10 backdrop-blur-sm">
          <DocumentViewer document={selectedDocument} />
        </div>
        
        {/* Section 3: Bibliography & Insights (Right - 25%) */}
        <div className="w-1/4 flex flex-col bg-black/20 backdrop-blur-sm">
          <div className="h-1/2 border-b border-yellow-400/20">
            <Bibliography />
          </div>
          <div className="h-1/2">
            <ReviewInsights />
          </div>
        </div>
      </div>
    </div>
  );
}
