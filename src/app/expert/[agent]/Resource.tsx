import React, { useState } from "react";

const RESOURCE_LIST = [
  "Google", "Wiki", "Ensembl", "PDB",
  "Protein Atlas", "GEO database", "STRING", "Reactome",
  "HMDB", "EU Clinical Trials Register", "BioRxiv", "Arxiv",
  "MedRxiv", "DOAJ", "IOPscience", "PMC", "Pubmed", "Custom bibliography",
  "PandaOmics", "Clinical trials database"
];

type ResourceSelectorProps = {
  selectedResources: string[];
  setSelectedResources: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function ResourceSelector({
  selectedResources,
  setSelectedResources,
}: ResourceSelectorProps) {
  const handleToggle = (resource: string) => {
    setSelectedResources(prev =>
      prev.includes(resource)
        ? prev.filter(r => r !== resource)
        : [...prev, resource]
    );
  };

  return (
    <div className="backdrop-blur-xl bg-black/40 border border-[#FFD600]/20 rounded-xl p-4 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[11px] font-medium text-[#e5e5e5]">Resources</h3>
        <button className="text-[11px] text-[#ffe066] hover:text-[#FFD600] transition-colors">
          Suggest resource
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {RESOURCE_LIST.map((resource) => {
          const isActive = selectedResources.includes(resource);
          return (
            <button
  key={resource}
  type="button"
  onClick={() => handleToggle(resource)}
  className={`px-3 py-1.5 text-[11px] rounded-lg border transition-all duration-200
    ${
     isActive
  ? "bg-bg-[#FFD600]/5 border-[#FFD600]/70 text-[#4b4000] font-medium shadow"
  : "bg-black/20 border-[#FFD600]/10 text-[#e5e5e5] hover:border-[#FFD600]/30 hover:bg-[#FFD600]/5"

    }
  `}
>
  {resource}
</button>

          );
        })}
      </div>
    </div>
  );
}



 {/* <div className="backdrop-blur-xl bg-black/40 border border-[#FFD600]/20 rounded-xl p-4 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[11px] font-medium text-[#e5e5e5]">Resources</h3>
                <button className="text-[11px] text-[#ffe066] hover:text-[#FFD600] transition-colors">
                  Suggest resource
                </button>
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {[
                  'Google', 'Wiki', 'Ensembl', 'PDB',
                  'Protein Atlas', 'GEO database', 'STRING', 'Reactome',
                  'HMDB', 'EU Clinical Trials Register', 'BioRxiv', 'Arxiv',
                  'MedRxiv', 'DOAJ', 'IOPscience', 'PMC', 'Pubmed', 'Custom bibliography',
                  'PandaOmics', 'Clinical trials database'
                ].map((resource, index) => (
                  <button
                    key={resource}
                    className={`px-3 py-1.5 text-[11px] rounded-lg border transition-all duration-200 ${
                      ['Google', 'PMC', 'Pubmed'].includes(resource)
                        ? 'bg-gradient-to-r from-[#FFD600]/20 to-[#FFA800]/20 border-[#FFD600]/60 text-[#FFD600]'
                        : 'bg-black/20 border-[#FFD600]/10 text-[#e5e5e5] hover:border-[#FFD600]/30 hover:bg-[#FFD600]/5'
                    }`}
                  >
                    {resource}
                  </button>
                ))}
              </div>
            </div> */}