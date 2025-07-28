"use client";

import React, { useState } from 'react';
import AgentInfoCard from './AgentInfoCard';
import AgentStatsWidget from './AgentStatsWidget';
import ResourceSelector from './Resource';
import CustomBibliographySection from './CustomBiblography';
import CustomDataSection from './CustomData';
import DescriptionSection from './Description';
import AIDescriptionPopup from '@/components/AiDescription';
import { Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation'; 

export default function AgentPage() {
  // Resource selection state
  const [description, setDescription] = useState('');
  const [customData, setCustomData] = useState('');
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]); 
  const [showAIPopup, setShowAIPopup] = useState(false);
  const router = useRouter(); 

  // Available agents from the image
 const availableAgents = [
    { id: 'scientific-writer', name: 'Scientific Writer', icon: '✍️' },
    { id: 'reference-validator', name: 'Reference Validator', icon: '🔍' },
    { id: 'web-searcher', name: 'Web Searcher', icon: '🌐' },
    { id: 'scientific-reference-finder', name: 'Scientific Reference Finder', icon: '📖' },
    { id: 'omics-expert', name: 'Omics Expert', icon: '🧬' },
    { id: 'target-discovery-scientist', name: 'Target Discovery Scientist', icon: '🎯' },
    { id: 'clinical-expert', name: 'Clinical Expert', icon: '🏥' },
    { id: 'precious3gpt-assistant', name: 'Precious3GPT Assistant', icon: '💎' },
    { id: 'knowledge-graph-assistant', name: 'Knowledge Graph Assistant', icon: '🕸️' },
    { id: 'gene-analyst', name: 'Gene Analyst', icon: '📊' },
    { id: 'chemists', name: 'Chemists', icon: '⚗️' },
    { id: 'clinical-pharmaceutical-scientist', name: 'Clinical Pharmaceutical Scientist', icon: '💊' },
    { id: 'chemical-engineer', name: 'Chemical Engineer', icon: '🔧' },
    { id: 'computational-scientist', name: 'Computational Scientist', icon: '💻' }
];


  const handleAgentToggle = (agentId: string) => {
    setSelectedAgents(prev => 
      prev.includes(agentId) 
        ? prev.filter(id => id !== agentId)
        : [...prev, agentId]
    );
  };

  const handleGenerateReport = () => {
    // You can add validation here if needed
    if (!description.trim()) {
      alert('Please provide a report description before generating.');
      return;
    }

    // Optional: Save form data to localStorage or send to API
    const reportData = {
      description,
      customData,
      selectedResources,
      selectedAgents, // Include selected agents
      timestamp: new Date().toISOString()
    };
    
    // Save to localStorage for access on results page
    localStorage.setItem('reportData', JSON.stringify(reportData));
    
    // Navigate to results page
    router.push('/results');
  };
  const handleUseAIDescription = (aiDescription: string) => {

    setDescription(aiDescription);

  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e0e11] via-[#131417] to-[#232313] py-6">
      {/* Constrained width container */}
      <div className="max-w-4xl mx-auto px-6 space-y-4">
        {/* Compact Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#FFD600] to-[#FFA800] rounded-lg flex items-center justify-center">
              <span className="text-sm">📊</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-100 bg-clip-text text-transparent">
                Agent Report Generator
              </h1>
              <p className="text-yellow-100/60 text-xs">Create comprehensive research reports with AI</p>
            </div>
          </div>
          <button 
            onClick={handleGenerateReport}
            className="px-4 py-2 bg-gradient-to-r from-[#FFD600] to-[#FFA800] text-black text-sm font-medium rounded-lg hover:shadow-lg transition-all hover:scale-105"
          >
            Generate Report
          </button>
        </div>

        {/* Minimalistic Sections */}
        <div className="space-y-4">

           {/* Description Section with AI Button */}

          <div className="bg-black/30 border border-[#FFD600]/15 rounded-lg p-4">

            <div className="flex items-center justify-between mb-3">

              <h3 className="text-sm font-medium text-yellow-300">Report Description</h3>

              <button

                onClick={() => setShowAIPopup(true)}

                className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-400/30 text-purple-400 rounded-lg text-xs font-medium hover:bg-purple-500/30 hover:border-purple-400/50 transition-all duration-200"

              >

                <Sparkles className="w-3 h-3" />

                AI Enhance

              </button>

            </div>

            <DescriptionSection 

              description={description}

              setDescription={setDescription}

            />

          </div>
          
          {/* Agent Selection Section - New Addition */}
          <div className="bg-black/30 border border-[#FFD600]/15 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-yellow-300">Team Members for Research</h3>
              <span className="text-xs text-yellow-100/60">
                {selectedAgents.length} selected
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {availableAgents.map((agent) => (
                <div
                  key={agent.id}
                  onClick={() => handleAgentToggle(agent.id)}
                  className={`relative p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedAgents.includes(agent.id)
                      ? 'border-[#FFD600]/60 bg-[#FFD600]/10 shadow-lg'
                      : 'border-[#FFD600]/20 bg-black/20 hover:border-[#FFD600]/40 hover:bg-black/30'
                  }`}
                >
                  {/* Selection Indicator */}
                  <div className={`absolute top-2 right-2 w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                    selectedAgents.includes(agent.id)
                      ? 'border-[#FFD600] bg-[#FFD600]'
                      : 'border-[#FFD600]/40 bg-transparent'
                  }`}>
                    {selectedAgents.includes(agent.id) && (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-2 h-2 text-black" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Agent Icon */}
                  <div className="mb-2">
                    <span className="text-lg">{agent.icon}</span>
                  </div>

                  {/* Agent Info */}
                  <div>
                    <h4 className="text-xs font-medium text-[#e5e5e5] leading-tight">
                      {agent.name}
                    </h4>
                   
                  </div>
                </div>
              ))}
            </div>
            

            {/* Selected Agents Summary */}
            {selectedAgents.length > 0 && (
              <div className="mt-4 pt-4 border-t border-[#FFD600]/20">
                <div className="flex flex-wrap gap-2">
                  {selectedAgents.map((agentId) => {
                    const agent = availableAgents.find(a => a.id === agentId);
                    return agent ? (
                      <span
                        key={agentId}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-[#FFD600]/20 border border-[#FFD600]/30 rounded-full text-xs text-[#FFD600]"
                      >
                        <span>{agent.icon}</span>
                        <span>{agent.name}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAgentToggle(agentId);
                          }}
                          className="ml-1 hover:bg-[#FFD600]/30 rounded-full p-0.5 transition-colors"
                        >
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>

           
         

          {/* Custom Data Section - Simplified */}
          <div className="bg-black/30 border border-[#FFD600]/15 rounded-lg p-4">
            <h3 className="text-sm font-medium text-yellow-300 mb-3">Custom Data Input</h3>
            <CustomDataSection 
              customData={customData}
              setCustomData={setCustomData}
            />
          </div>

          {/* Resources Section - Simplified */}
          <div className="bg-black/30 border border-[#FFD600]/15 rounded-lg p-4">
            <h3 className="text-sm font-medium text-yellow-300 mb-3">Resource Selection</h3>
            <ResourceSelector
              selectedResources={selectedResources}
              setSelectedResources={setSelectedResources}
            />
          </div>

          {/* Compact Search Settings */}
          <div className="bg-black/30 border border-[#FFD600]/15 rounded-lg p-4">
            <h3 className="text-sm font-medium text-yellow-300 mb-4">Search Settings</h3>
            
            {/* Publication Date - Compact */}
            <div className="mb-4">
              <label className="block text-xs text-[#e5e5e5] mb-2 font-medium">Publication Date</label>
              <div className="flex gap-4">
                {[
                  { label: 'All (Since 2010)', checked: true },
                  { label: 'Last 5 Years', checked: false },
                  { label: 'Last 10 Years', checked: false }
                ].map((option) => (
                  <label key={option.label} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="publication_date"
                      className="w-3 h-3 text-[#FFD600] bg-transparent border-[#FFD600]/40"
                      defaultChecked={option.checked}
                    />
                    <span className="text-xs text-[#e5e5e5]">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Article Type - Compact */}
            <div className="mb-4">
              <label className="block text-xs text-[#e5e5e5] mb-2 font-medium">Article Type</label>
              <div className="flex gap-4">
                {[
                  'Research Articles',
                  'Reviews & Systematic Reviews'
                ].map((type) => (
                  <label key={type} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-3 h-3 text-[#FFD600] bg-transparent border-[#FFD600]/40 rounded"
                    />
                    <span className="text-xs text-[#e5e5e5]">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Top-cited Toggle - Compact */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-[#e5e5e5]">Prioritize Top-Cited</span>
                <div className="text-xs text-[#ffe066]/60">Focus on highly cited publications</div>
              </div>
              <div className="relative">
                <input type="checkbox" className="sr-only" defaultChecked />
                <div className="w-10 h-5 bg-gradient-to-r from-[#FFD600] to-[#FFA800] rounded-full">
                  <div className="w-4 h-4 bg-black rounded-full transform translate-x-5 translate-y-0.5"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bibliography Section - Simplified */}
          <div className="bg-black/30 border border-[#FFD600]/15 rounded-lg p-4">
            <h3 className="text-sm font-medium text-yellow-300 mb-3">Bibliography Management</h3>
            <CustomBibliographySection />
          </div>
        </div>
      </div>

        {/* AI Description Popup - Now as a separate component */}

      <AIDescriptionPopup

        isOpen={showAIPopup}

        onClose={() => setShowAIPopup(false)}

        onUseDescription={handleUseAIDescription}

        customData={customData}

        selectedResources={selectedResources}

        selectedAgents={selectedAgents}

      />
    </div>
  );
};
