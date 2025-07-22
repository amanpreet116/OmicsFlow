import React, { useState } from 'react';

interface DescriptionSectionProps {
  description: string;
  setDescription: (value: string) => void;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({ description, setDescription }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="backdrop-blur-xl bg-black/40 border border-[#FFD600]/20 rounded-xl p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-[13px] font-medium text-[#e5e5e5]">Input</h3>
          <div className="w-4 h-4 rounded-full bg-[#FFD600]/20 flex items-center justify-center">
            <span className="text-[8px] text-[#FFD600]">?</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-[11px] font-medium text-[#e5e5e5] mb-2">
            Describe your research
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. The role of AI in drug discovery for aging and longevity"
            className="w-full h-20 bg-[#1a1a1a]/50 border border-[#FFD600]/20 rounded-lg px-3 py-2 text-[11px] text-[#e5e5e5] placeholder-[#ffe066]/40 focus:outline-none focus:border-[#FFD600]/40 focus:ring-1 focus:ring-[#FFD600]/20 resize-none"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
};

export default DescriptionSection;
