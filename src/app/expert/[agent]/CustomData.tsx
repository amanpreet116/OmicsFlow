import React, { useState, ChangeEvent } from 'react';

interface CustomDataSectionProps {
  customData: string; // or a more specific type if needed
  setCustomData: (value: string) => void; // update if your setter differs
}

const CustomDataSection: React.FC<CustomDataSectionProps> = ({
  customData,
  setCustomData,
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="backdrop-blur-xl bg-black/40 border border-[#FFD600]/20 rounded-xl p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-[13px] font-medium text-[#e5e5e5]">Custom Data</h3>
          <span className="text-[11px] text-[#ffe066]/60">(Optional)</span>
          <div className="w-4 h-4 rounded-full bg-[#FFD600]/20 flex items-center justify-center">
            <span className="text-[8px] text-[#FFD600]">?</span>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <p className="text-[11px] text-[#ffe066]/80">
          Enrich template section by your draft or textual results
        </p>
        <label className="flex items-center space-x-2 px-4 py-2 bg-[#00C851]/20 border border-[#00C851]/40 rounded-lg text-[11px] text-[#00C851] hover:bg-[#00C851]/30 transition-all duration-200 cursor-pointer">
          <span>+</span>
          <span>Add Data</span>
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            accept=".pdf,.doc,.docx,.txt"
          />
        </label>
        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={file.name + index} className="flex items-center justify-between p-2 bg-[#1a1a1a]/50 border border-[#FFD600]/10 rounded-lg">
                <span className="text-[11px] text-[#e5e5e5] truncate">{file.name}</span>
                <button 
                  onClick={() => removeFile(index)}
                  className="text-[11px] text-red-400 hover:text-red-300"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDataSection;
