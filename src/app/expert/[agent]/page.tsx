"use client";

import React, { useState } from 'react';
import AgentInfoCard from './AgentInfoCard';
import AgentStatsWidget from './AgentStatsWidget';
import ResourceSelector from './Resource';
import CustomBibliographySection from './CustomBiblography';
import CustomDataSection from './CustomData';
import DescriptionSection from './Description';

export default function AgentPage() {
  // Resource selection state
  const [description, setDescription] = useState('');
  const [customData, setCustomData] = useState('');
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e0e11] via-[#131417] to-[#232313] ml-8">
      <div className="p-4 space-y-4 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-gradient-to-br from-[#FFD600] to-[#FFA800] rounded-sm flex items-center justify-center">
              <span className="text-[10px] font-bold text-black">📊</span>
            </div>
            <h1 className="text-[20px] font-semibold text-[#e5e5e5]">Agent report</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-1.5 bg-gradient-to-r from-[#FFD600] to-[#FFA800] text-black text-[11px] font-medium rounded-md hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-200">
              Generate
            </button>
          </div>
        </div>

        {/* Description Section */}
        <DescriptionSection 
          description={description}
          setDescription={setDescription}
        />

        {/* Custom Data Section */}
        <CustomDataSection 
          customData={customData}
          setCustomData={setCustomData}
        />

        {/* Custom Bibliography Section */}
        <CustomBibliographySection />

        {/* Resources Section */}
        <ResourceSelector
          selectedResources={selectedResources}
          setSelectedResources={setSelectedResources}
        />

        {/* PMC/PubMed Search Settings */}
        <div className="backdrop-blur-xl bg-black/40 border border-[#FFD600]/20 rounded-xl p-6 shadow-2xl">
          <h3 className="text-[13px] font-medium text-[#e5e5e5] mb-4">
            PMC/PubMed search settings (Optional)
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] text-[#e5e5e5] mb-2">
                Publication date
              </label>
              <div className="flex space-x-4">
                {[
                  { label: 'All', sublabel: 'Since 2010', checked: true },
                  { label: 'Last 5 years', checked: false },
                  { label: 'Last 10 years', checked: false }
                ].map((option) => (
                  <label key={option.label} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="publication_date"
                      className="w-3 h-3 text-[#FFD600] bg-transparent border-[#FFD600]/40 focus:ring-[#FFD600]/20"
                      defaultChecked={option.checked}
                    />
                    <div>
                      <span className="text-[11px] text-[#e5e5e5]">{option.label}</span>
                      {option.sublabel && (
                        <div className="text-[11px] text-[#ffe066]/60">{option.sublabel}</div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-[#e5e5e5] mb-2">
                Article type
              </label>
              <div className="space-y-2">
                {[
                  'Research article and Journal article',
                  'Review and Systematic review'
                ].map((type) => (
                  <label key={type} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="w-3 h-3 text-[#FFD600] bg-transparent border-[#FFD600]/40 rounded focus:ring-[#FFD600]/20"
                    />
                    <span className="text-[11px] text-[#e5e5e5]">{type}</span>
                  </label>
                ))}
              </div>
              <div className="mt-2 p-2 bg-[#FFD600]/10 border border-[#FFD600]/20 rounded-lg">
                <p className="text-[11px] text-[#ffe066]">
                  If nothing is selected in this filter, all existing types (over 50) will be used.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-[11px] text-[#e5e5e5]">
                  Top-cited
                </label>
                <div className="text-[11px] text-[#ffe066]/60">
                  Prioritizing top-cited articles for generation
                </div>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  defaultChecked
                />
                <div className="w-10 h-5 bg-gradient-to-r from-[#FFD600] to-[#FFA800] rounded-full shadow-inner">
                  <div className="w-4 h-4 bg-black rounded-full shadow transform translate-x-5 translate-y-0.5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Stats and Recent Activity - stacked for single column */}
        <AgentStatsWidget />
      </div>
    </div>
  );
};


