'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';

const mockHistory = [
  {
    id: "1",
    title: "Discussed gene analysis results for BRCA1 mutations",
    preview: "Let's look deeper into the omics pathway data and understand the correlation with breast cancer risk factors...",
    date: "2024-07-25 10:15",
  },
  {
    id: "2",
    title: "Pharma literature summary for Alzheimer's treatments",
    preview: "Can you summarize key drug trials for condition X and compare efficacy rates across different patient populations...",
    date: "2024-07-24 16:42",
  },
  {
    id: "3",
    title: "Molecular structure analysis of novel compounds",
    preview: "Analyze the binding affinity of these synthetic molecules to target proteins and predict their therapeutic potential...",
    date: "2024-07-24 14:28",
  },
  {
    id: "4",
    title: "COVID-19 variant genomic sequencing interpretation",
    preview: "Help me understand the spike protein mutations in the latest variants and their impact on vaccine effectiveness...",
    date: "2024-07-23 09:33",
  },
  {
    id: "5",
    title: "Cancer biomarker discovery in proteomics data",
    preview: "Identify potential biomarkers from this mass spectrometry data that could indicate early-stage pancreatic cancer...",
    date: "2024-07-22 13:56",
  },
  {
    id: "6",
    title: "Drug-drug interaction analysis for polypharmacy",
    preview: "Evaluate potential interactions between these five medications and suggest safer alternatives for elderly patients...",
    date: "2024-07-22 11:18",
  },
  {
    id: "7",
    title: "Metabolomics pathway enrichment analysis",
    preview: "Perform pathway analysis on these metabolite profiles and identify dysregulated metabolic networks in diabetes...",
    date: "2024-07-21 15:44",
  },
  {
    id: "8",
    title: "CRISPR gene editing target validation",
    preview: "Help validate these CRISPR targets for treating sickle cell disease and assess off-target effects...",
    date: "2024-07-21 08:22",
  },
  {
    id: "9",
    title: "Immunotherapy response prediction modeling",
    preview: "Build a predictive model for immunotherapy response using patient genomic and clinical data...",
    date: "2024-07-20 17:31",
  },
  {
    id: "10",
    title: "Structural biology of membrane proteins",
    preview: "Analyze the crystal structure of this GPCR and predict conformational changes upon ligand binding...",
    date: "2024-07-20 12:07",
  },
  {
    id: "11",
    title: "Pharmacokinetic modeling for pediatric dosing",
    preview: "Calculate appropriate drug dosing for pediatric patients based on adult pharmacokinetic parameters...",
    date: "2024-07-19 16:15",
  },
  {
    id: "12",
    title: "Epigenetic modifications in cancer progression",
    preview: "Examine DNA methylation patterns in tumor samples and correlate with gene expression changes...",
    date: "2024-07-19 10:52",
  }
 
];

export default function HistoryPage() {
  const [history, setHistory] = useState(mockHistory);

  const handleDelete = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRead = (id: string) => {
    // e.g., route to `/chat/${id}` or open modal
    alert("Read chat: " + id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e0e11] via-[#131417] to-[#232313] px-4 py-6 md:px-6 lg:px-8 ml-8">
      <div className="w-full max-w-none mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-100 bg-clip-text text-transparent tracking-wide">
              Chat History
            </h1>
            <p className="text-yellow-100/60 text-sm mt-1">
              {history.length} conversations found
            </p>
          </div>
          <button
            className="text-sm px-4 py-2 bg-black/30 border border-yellow-400/30 text-yellow-200 rounded-lg hover:bg-yellow-400/10 hover:border-yellow-400/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={history.length === 0}
            onClick={() => setHistory([])}
          >
            Clear All History
          </button>
        </div>

        {/* History Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {history.length > 0 ? (
            history.map((item) => (
              <div
                key={item.id}
                className="group p-5 rounded-xl border border-yellow-400/15 bg-[rgba(30,30,35,0.68)] backdrop-blur-md hover:border-yellow-400/30 hover:bg-[rgba(30,30,35,0.8)] transition-all duration-300 cursor-pointer"
                onClick={() => handleRead(item.id)}
              >
                <div className="flex flex-col h-full">
                  {/* Content */}
                  <div className="flex-1 mb-4">
                    <h3 className="text-yellow-100 text-sm font-semibold mb-2 line-clamp-2 group-hover:text-yellow-200 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-yellow-100/70 text-xs line-clamp-3 leading-relaxed">
                      {item.preview}
                    </p>
                  </div>
                  
                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-yellow-400/10">
                    <span className="text-yellow-100/40 text-xs">
                      {new Date(item.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    <button
                      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-red-500/20 transition-all"
                      aria-label="Delete conversation"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.id);
                      }}
                    >
                      <Trash2 size={12} className="text-red-400 hover:text-red-300" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="text-yellow-100/40 text-lg mb-2">No conversations yet</div>
              <p className="text-yellow-100/30 text-sm">
                Start a conversation with one of our AI agents to see your history here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
