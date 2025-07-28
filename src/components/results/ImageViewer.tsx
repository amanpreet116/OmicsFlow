// src/components/results/ImageViewer.tsx
'use client';

import { useState } from 'react';
import { X, ZoomIn, ZoomOut, Download, Maximize2, Minimize2 } from 'lucide-react';
import { DiagramData } from '../../app/results/page';

interface ImageViewerProps {
  diagrams: DiagramData[];
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageViewer({ diagrams, isOpen, onClose }: ImageViewerProps) {
  const [selectedType, setSelectedType] = useState<'flowchart' | 'state' | 'timeline' | 'sequence'>('flowchart');
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!isOpen) return null;

  const currentDiagram = diagrams.find(d => d.type === selectedType);

  const diagramTypes = [
    { type: 'flowchart' as const, label: 'Flowchart', icon: '📊' },
    { type: 'state' as const, label: 'State', icon: '🔄' },
    { type: 'timeline' as const, label: 'Timeline', icon: '📅' },
    { type: 'sequence' as const, label: 'Sequence', icon: '🔗' }
  ];

  const handleDownload = () => {
    if (!currentDiagram) return;
    
    const link = document.createElement('a');
    link.href = currentDiagram.imageUrl;
    link.download = `${currentDiagram.title}_${currentDiagram.type}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className={`relative h-full flex flex-col ${isFullscreen ? 'p-0' : 'p-4'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-black/60 border-b border-yellow-400/20">
          <h3 className="text-lg font-semibold text-yellow-300">Visual Summary</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 bg-black/30 border border-yellow-400/20 rounded text-yellow-400 hover:bg-yellow-400/10 transition-all"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={handleDownload}
              className="p-2 bg-black/30 border border-yellow-400/20 rounded text-yellow-400 hover:bg-yellow-400/10 transition-all"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-black/30 border border-yellow-400/20 rounded text-yellow-400 hover:bg-yellow-400/10 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Diagram Type Selector */}
        <div className="flex items-center justify-center gap-2 p-4 bg-black/40 border-b border-yellow-400/20">
          {diagramTypes.map(({ type, label, icon }) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedType === type
                  ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/40'
                  : 'bg-black/30 text-gray-300 border border-gray-600/30 hover:bg-yellow-400/10 hover:text-yellow-400'
              }`}
            >
              <span>{icon}</span>
              {label}
            </button>
          ))}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center justify-center gap-2 p-2 bg-black/40">
          <button
            onClick={() => setZoom(Math.max(25, zoom - 25))}
            className="p-2 bg-black/30 border border-yellow-400/20 rounded text-yellow-400 hover:bg-yellow-400/10 transition-all"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-sm text-gray-400 px-4 min-w-[80px] text-center">{zoom}%</span>
          <button
            onClick={() => setZoom(Math.min(200, zoom + 25))}
            className="p-2 bg-black/30 border border-yellow-400/20 rounded text-yellow-400 hover:bg-yellow-400/10 transition-all"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        {/* Image Display Area */}
        <div className="flex-1 overflow-auto bg-black/20 p-4">
          {currentDiagram ? (
            <div className="flex items-center justify-center min-h-full">
              <div
                className="max-w-full max-h-full bg-white rounded-lg shadow-2xl p-4"
                style={{ transform: `scale(${zoom / 100})` }}
              >
                <img
                  src={currentDiagram.imageUrl}
                  alt={currentDiagram.title}
                  className="max-w-full max-h-full object-contain"
                  style={{ maxWidth: '800px', maxHeight: '600px' }}
                />
                {currentDiagram.description && (
                  <p className="text-center text-gray-600 text-sm mt-2">
                    {currentDiagram.description}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <div className="text-4xl mb-4">📊</div>
                <p>No {selectedType} diagram available</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
