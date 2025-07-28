'use client';

import { useState } from 'react';
import { Download, ZoomIn, ZoomOut, FileText, Share2, Eye, EyeOff, Image as ImageIcon } from 'lucide-react';
import { Document } from '../../app/results/page';
import ImageViewer from './ImageViewer';

interface DocumentViewerProps {
  document: Document | null;
}

export default function DocumentViewer({ document }: DocumentViewerProps) {
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showImageViewer, setShowImageViewer] = useState(false);

  // Generate PDF using jsPDF
  const generatePDF = async (content: string, title: string) => {
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      
      // Configure PDF settings
      doc.setFontSize(12);
      const pageHeight = doc.internal.pageSize.height;
      const pageWidth = doc.internal.pageSize.width;
      const margin = 20;
      const lineHeight = 7;
      const maxLineWidth = pageWidth - (margin * 2);
      
      let yPosition = margin;

      // Add title
      doc.setFontSize(16);
      doc.setFont( 'bold');
      const titleLines = doc.splitTextToSize(title, maxLineWidth);
      titleLines.forEach((line: string) => {
        if (yPosition > pageHeight - margin) {
          doc.addPage();
          yPosition = margin;
        }
        doc.text(line, margin, yPosition);
        yPosition += lineHeight + 2;
      });
      
      yPosition += 10; // Extra space after title

      // Add content
      doc.setFontSize(12);
      doc.setFont( 'normal');
      const contentLines = doc.splitTextToSize(content, maxLineWidth);
      
      contentLines.forEach((line: string) => {
        if (yPosition > pageHeight - margin) {
          doc.addPage();
          yPosition = margin;
        }
        doc.text(line, margin, yPosition);
        yPosition += lineHeight;
      });

      return doc;
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error('Failed to generate PDF');
    }
  };

  const handleDownload = async (format: 'pdf' | 'docx' | 'txt') => {
    if (!document) return;
    
    // Use fullContent if available, otherwise fall back to content
    const content = document.fullContent || document.content || 'No content available';
    const filename = document.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    
    try {
      if (format === 'pdf') {
        const pdfDoc = await generatePDF(content, document.title);
        pdfDoc.save(`${filename}.pdf`);
      } else if (format === 'txt') {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        // Fix: Use global document object explicitly
        const anchorElement = globalThis.document.createElement('a');
        anchorElement.href = url;
        anchorElement.download = `${filename}.txt`;
        globalThis.document.body.appendChild(anchorElement);
        anchorElement.click();
        globalThis.document.body.removeChild(anchorElement);
        URL.revokeObjectURL(url);
      } else if (format === 'docx') {
        const blob = new Blob([content], { 
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
        });
        const url = URL.createObjectURL(blob);
        
        // Fix: Use global document object explicitly
        const anchorElement = globalThis.document.createElement('a');
        anchorElement.href = url;
        anchorElement.download = `${filename}.docx`;
        globalThis.document.body.appendChild(anchorElement);
        anchorElement.click();
        globalThis.document.body.removeChild(anchorElement);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error(`Error downloading ${format}:`, error);
      alert(`Error downloading ${format}. Please try again.`);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (!document) {
    return (
      <div className="h-full flex items-center justify-center bg-black/10 backdrop-blur-sm">
        <div className="text-center text-gray-400">
          <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">Select a document to view</p>
          <p className="text-sm">Choose from the list to see the content here</p>
        </div>
      </div>
    );
  }

  // Use fullContent if available, otherwise fall back to content
  const displayContent = document.fullContent || document.content || 'No content available for this document.';

  return (
    <>
      <div className="h-full flex flex-col">
        {/* Header with Download Options */}
        <div className="p-4 border-b border-yellow-400/20 bg-black/20">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-white truncate">
              {document.title}
            </h2>
            <div className="flex items-center gap-2">
              {/* Image Viewer Button - Add this for diagram viewing */}
              {document.diagrams && document.diagrams.length > 0 && (
                <button
                  onClick={() => setShowImageViewer(true)}
                  className="p-2 bg-purple-500/20 border border-purple-400/30 rounded text-purple-400 hover:bg-purple-400/10 transition-all"
                  title="View diagrams"
                >
                  <ImageIcon className="w-4 h-4" />
                </button>
              )}
              
              <button
                onClick={toggleFullscreen}
                className="p-2 bg-black/30 border border-yellow-400/20 rounded text-yellow-400 hover:bg-yellow-400/10 transition-all"
                title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              >
                {isFullscreen ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setZoom(Math.max(50, zoom - 10))}
                className="p-2 bg-black/30 border border-yellow-400/20 rounded text-yellow-400 hover:bg-yellow-400/10 transition-all"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-sm text-gray-400 px-2 min-w-[50px] text-center">{zoom}%</span>
              <button
                onClick={() => setZoom(Math.min(200, zoom + 10))}
                className="p-2 bg-black/30 border border-yellow-400/20 rounded text-yellow-400 hover:bg-yellow-400/10 transition-all"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Download Options */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-400">Download as:</span>
            <button
              onClick={() => handleDownload('pdf')}
              className="px-3 py-1.5 bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 text-red-400 rounded text-xs font-medium hover:bg-red-500/30 transition-all flex items-center gap-1"
            >
              <Download className="w-3 h-3" />
              PDF
            </button>
            <button
              onClick={() => handleDownload('txt')}
              className="px-3 py-1.5 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 text-green-400 rounded text-xs font-medium hover:bg-green-500/30 transition-all flex items-center gap-1"
            >
              <Download className="w-3 h-3" />
              TXT
            </button>
            <button
              onClick={() => handleDownload('docx')}
              className="px-3 py-1.5 bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 text-blue-400 rounded text-xs font-medium hover:bg-blue-500/30 transition-all flex items-center gap-1"
            >
              <Download className="w-3 h-3" />
              DOCX
            </button>
            <button 
              className="px-3 py-1.5 bg-black/30 border border-yellow-400/20 text-yellow-400 rounded text-xs font-medium hover:bg-yellow-400/10 transition-all flex items-center gap-1"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ 
                    title: document.title, 
                    text: displayContent.substring(0, 200) + '...' 
                  });
                } else {
                  // Fallback for browsers that don't support Web Share API
                  navigator.clipboard.writeText(`${document.title}\n\n${displayContent.substring(0, 200)}...`);
                  alert('Content copied to clipboard!');
                }
              }}
            >
              <Share2 className="w-3 h-3" />
              Share
            </button>
          </div>

          {/* Document Info */}
          <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
            <span>Type: {document.type.toUpperCase()}</span>
            <span>Size: {document.size}</span>
            <span>Created: {new Date(document.createdAt).toLocaleDateString()}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              document.status === 'completed' ? 'bg-green-400/20 text-green-400' :
              document.status === 'processing' ? 'bg-yellow-400/20 text-yellow-400' :
              'bg-orange-400/20 text-orange-400'
            }`}>
              {document.status}
            </span>
            {/* Show diagram count if available */}
            {document.diagrams && document.diagrams.length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs bg-purple-400/20 text-purple-400">
                {document.diagrams.length} diagrams
              </span>
            )}
          </div>
        </div>

        {/* Document Content */}
        <div className={`flex-1 overflow-y-auto p-6 ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}`}>
          <div 
            className="bg-white rounded-lg shadow-2xl p-8 mx-auto"
            style={{ 
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top center',
              minHeight: '100%',
              maxWidth: '210mm', // A4 width
            }}
          >
            <div className="prose prose-sm max-w-none text-gray-800">
              <div className="whitespace-pre-wrap font-serif text-sm leading-relaxed">
                {displayContent}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Viewer Modal */}
      {document.diagrams && (
        <ImageViewer
          diagrams={document.diagrams}
          isOpen={showImageViewer}
          onClose={() => setShowImageViewer(false)}
        />
      )}
    </>
  );
}
