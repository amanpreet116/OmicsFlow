// src/components/AIDescriptionPopup.tsx
'use client';

import React, { useState } from 'react';
import { X, Sparkles, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AIDescriptionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onUseDescription: (description: string) => void;
  customData: string;
  selectedResources: string[];
  selectedAgents: string[];
}

export default function AIDescriptionPopup({
  isOpen,
  onClose,
  onUseDescription,
  customData,
  selectedResources,
  selectedAgents
}: AIDescriptionPopupProps) {
  const router = useRouter();
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiGeneratedDescription, setAiGeneratedDescription] = useState('');

  // Dummy AI-generated description
  const dummyAIDescription = `## Comprehensive Multi-Omics Analysis of Neurodegenerative Diseases

### Objective
This comprehensive research report aims to investigate the molecular mechanisms underlying Alzheimer's and Parkinson's diseases through an integrated multi-omics approach, combining genomics, transcriptomics, proteomics, and metabolomics data to identify novel therapeutic targets and biomarkers.

### Research Scope
- **Genomic Analysis**: Whole genome sequencing data from 2,500+ patients
- **Transcriptomic Profiling**: RNA-seq analysis of brain tissue samples
- **Proteomic Investigation**: Mass spectrometry-based protein expression analysis
- **Metabolomic Studies**: LC-MS/MS metabolite profiling
- **Clinical Correlation**: Integration with longitudinal clinical data

### Key Research Questions
1. What are the common molecular pathways disrupted in both Alzheimer's and Parkinson's diseases?
2. How do genetic variants influence disease progression and therapeutic response?
3. What novel biomarkers can be identified for early disease detection?
4. Which molecular targets show the highest potential for therapeutic intervention?

### Expected Outcomes
- Identification of 15-20 novel therapeutic targets
- Development of a multi-biomarker panel for early detection
- Comprehensive pathway analysis revealing disease mechanisms
- Clinical relevance assessment and therapeutic recommendations

### Impact
This research will contribute to personalized medicine approaches for neurodegenerative diseases and accelerate the development of targeted therapies, potentially benefiting millions of patients worldwide.`;

  const handleAIGenerate = async () => {
    setIsGeneratingAI(true);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setAiGeneratedDescription(dummyAIDescription);
    setIsGeneratingAI(false);
  };

  const handleUseAIDescription = () => {
    onUseDescription(aiGeneratedDescription);
    onClose();
  };

  const handleGenerateFromAI = () => {
    // Save form data including AI description
    const reportData = {
      description: aiGeneratedDescription,
      customData,
      selectedResources,
      selectedAgents,
      timestamp: new Date().toISOString(),
      generatedWithAI: true
    };
    
    localStorage.setItem('reportData', JSON.stringify(reportData));
    router.push('/results');
  };

  // Reset state when popup closes
  const handleClose = () => {
    setAiGeneratedDescription('');
    setIsGeneratingAI(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-[#131417] via-[#191919] to-[#0e0e11] border border-[#FFD600]/20 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Popup Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#FFD600]/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg border border-purple-400/30">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent">
                AI-Enhanced Description
              </h2>
              <p className="text-yellow-100/60 text-sm">Generate comprehensive research description</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleGenerateFromAI}
              disabled={!aiGeneratedDescription || isGeneratingAI}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FFD600] to-[#FFA800] text-black text-sm font-medium rounded-lg hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
              Generate Report
            </button>
            <button
              onClick={handleClose}
              className="p-2 bg-black/30 border border-yellow-400/20 rounded-lg text-yellow-400 hover:bg-yellow-400/10 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Popup Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {!aiGeneratedDescription ? (
            <div className="text-center py-12">
              <div className="mb-6">
                <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  AI Description Generator
                </h3>
                <p className="text-yellow-100/60 text-sm max-w-md mx-auto">
                  Our AI will analyze your current description and generate a comprehensive, well-structured research report description.
                </p>
              </div>
              
              <button
                onClick={handleAIGenerate}
                disabled={isGeneratingAI}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed mx-auto"
              >
                {isGeneratingAI ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate AI Description
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-yellow-300">Generated Description</h3>
                <button
                  onClick={handleUseAIDescription}
                  className="px-3 py-1.5 bg-[#FFD600]/20 border border-[#FFD600]/30 text-[#FFD600] rounded-lg text-sm font-medium hover:bg-[#FFD600]/30 transition-all"
                >
                  Use This Description
                </button>
              </div>
              
              <div className="bg-black/40 border border-[#FFD600]/10 rounded-lg p-4 max-h-96 overflow-y-auto">
                <div className="prose prose-sm max-w-none text-white">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {aiGeneratedDescription}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#FFD600]/20">
                <div className="text-xs text-yellow-100/60">
                  ✨ AI-generated content • Review and edit as needed
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAIGenerate}
                    disabled={isGeneratingAI}
                    className="px-3 py-1.5 bg-black/30 border border-purple-400/30 text-purple-400 rounded-lg text-sm font-medium hover:bg-purple-400/10 transition-all disabled:opacity-50"
                  >
                    {isGeneratingAI ? 'Regenerating...' : 'Regenerate'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
