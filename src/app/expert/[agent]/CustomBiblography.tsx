import React, { useState } from 'react';

const CustomBibliographySection = () => {
  const [dragActive, setDragActive] = useState(false);

interface DragEventWithFiles extends React.DragEvent<HTMLDivElement> {}

const handleDrag = (e: DragEventWithFiles) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
    } else if (e.type === "dragleave") {
        setDragActive(false);
    }
};

  const handleDrop = (e: { preventDefault: () => void; stopPropagation: () => void; }) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file drop logic here
  };

  return (
    <div className="backdrop-blur-xl bg-black/40 border border-[#FFD600]/20 rounded-xl p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-[13px] font-medium text-[#e5e5e5]">Custom Bibliography</h3>
          <span className="text-[11px] text-[#ffe066]/60">(Optional)</span>
          <div className="w-4 h-4 rounded-full bg-[#FFD600]/20 flex items-center justify-center">
            <span className="text-[8px] text-[#FFD600]">?</span>
          </div>
        </div>
        <button className="px-3 py-1 bg-[#00C851]/20 border border-[#00C851]/40 rounded-md text-[11px] text-[#00C851]">
          + Previously uploaded
        </button>
      </div>
      
      <div 
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
          dragActive 
            ? 'border-[#FFD600]/60 bg-[#FFD600]/5' 
            : 'border-[#FFD600]/20 bg-[#1a1a1a]/20'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="space-y-2">
          <p className="text-[11px] text-[#ffe066]/80">
            Drop file here, or <button className="text-[#FFD600] underline">Browse</button>
          </p>
          <p className="text-[11px] text-[#ffe066]/60">
            Upload up to 20 PDFs, max 20MB each
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomBibliographySection;
