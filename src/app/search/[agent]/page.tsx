'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Add useRouter
import { Settings } from 'lucide-react';
import Link from 'next/link';
import Sidebar from '../../../components/Sidebar';
import SearchBox from '../../../components/SearchBox';
import AgentBackground from '../../../components/AgentBackground';

// Define the agent type
type AgentType = 'omics' | 'chemist' | 'gene-analyst' | 'literature-reviewer';

// Define the agent configuration interface
interface AgentConfig {
  name: string;
  tagline: string;
  bgType: 'dna' | 'molecules' | 'network';
  primaryColor: string;
  secondaryColor: string;
}

// Type the agents object properly
const agents: Record<AgentType, AgentConfig> = {
  omics: {
    name: 'Omics',
    tagline: 'Your genomic journey begins here.',
    bgType: 'dna',
    primaryColor: '#00758aff',
    secondaryColor: '#0844b2ff'
  },
  chemist: {
    name: 'Chemist',
    tagline: 'Molecular discoveries at your fingertips.',
    bgType: 'molecules',
    primaryColor: '#8B5CF6',
    secondaryColor: '#7C3AED'
  },
  'gene-analyst': {
    name: 'Gene Analyst',
    tagline: 'Advanced genetic analysis made simple.',
    bgType: 'network',
    primaryColor: '#10B981',
    secondaryColor: '#059669'
  },
  'literature-reviewer': {
    name: 'Literature Reviewer',
    tagline: 'Comprehensive research insights at your fingertips.',
    bgType: 'network',
    primaryColor: '#8B5CF6',
    secondaryColor: '#7C3AED'
  }
};

// Hardcoded sample searches for each agent
const sampleSearches: Record<AgentType, string[]> = {
  omics: [
    'Analyze GWAS data for diabetes susceptibility',
    'Multi-omics integration for cancer research',
    'Pharmacogenomics biomarkers analysis'
  ],
  chemist: [
    'Molecular docking of novel compounds',
    'ADMET properties prediction',
    'Structure-activity relationship analysis'
  ],
  'gene-analyst': [
    'CRISPR target validation for sickle cell',
    'Gene expression profiling in Alzheimer\'s',
    'Mutation impact analysis'
  ],
  'literature-reviewer': [
    'Gut microbiota role in neurodegeneration',
    'CRISPR gene editing comprehensive review',
    'Protein folding mechanisms analysis'
  ]
};

export default function SearchPage() {
  const params = useParams();
  const router = useRouter(); // Add router for navigation
  const agent = params?.agent as string;
  const [currentAgent, setCurrentAgent] = useState<AgentConfig | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false); // Add loading state

  useEffect(() => {
    if (agent && typeof agent === 'string' && agent in agents) {
      setCurrentAgent(agents[agent as AgentType]);
    }
  }, [agent]);

  // Handle search submission with redirect to results
 const handleSendMessage = async (message: string) => {
  if (!message.trim() || !currentAgent) return;

  console.log('Sending message:', message);
  setIsSearching(true);

  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Store search data in localStorage for the results page
    const searchData = {
      query: message,
      agent: currentAgent.name,
      agentType: agent,
      timestamp: new Date().toISOString(),
      primaryColor: currentAgent.primaryColor,
      secondaryColor: currentAgent.secondaryColor
    };

    localStorage.setItem('searchData', JSON.stringify(searchData));

    // Redirect to results page
    router.push('/agent-results');
  } catch (error) {
    console.error('Search error:', error);
    setIsSearching(false);
  }
};


  // Handle sample search button clicks
  const handleSampleSearch = (sampleQuery: string) => {
    setSearchValue(sampleQuery);
    handleSendMessage(sampleQuery);
  };

  if (!currentAgent) {
    return (
      <div className="flex h-screen bg-gradient-to-br from-[#161618] via-[#29291f] to-[#232313] items-center justify-center">
        <div className="text-yellow-100 text-lg">Loading...</div>
      </div>
    );
  }

  // Get sample searches for current agent
  const currentSamples = sampleSearches[agent as AgentType] || [];

  return (
    <div>
      <div className="relative flex flex-col h-screen bg-gradient-to-br from-[#161618] via-[#29291f] to-[#232313] overflow-hidden">
        <AgentBackground 
          type={currentAgent.bgType} 
          colors={[currentAgent.primaryColor, currentAgent.secondaryColor]} 
        />
        
        <div className="absolute top-4 right-4 z-10">
          <Link href="/settings">
            <Settings className="w-5 h-5 text-yellow-400 opacity-80 hover:opacity-100 cursor-pointer transition-opacity" />
          </Link>
        </div>

        {/* Loading Overlay */}
        {isSearching && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-20 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
              <p className="text-yellow-100 text-lg">Analyzing your query...</p>
              <p className="text-yellow-100/60 text-sm mt-2">Generating comprehensive report</p>
            </div>
          </div>
        )}

        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <div className="w-full max-w-4xl mx-auto text-center space-y-6 px-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-tr from-yellow-400 via-yellow-300 to-white bg-clip-text text-transparent drop-shadow tracking-tight">
              {currentAgent.tagline}
            </h2>
            
            <div className="flex items-center justify-center gap-2">
              <div 
                className="w-2 h-2 rounded-full shadow-lg"
                style={{ backgroundColor: currentAgent.primaryColor }}
              />
              <span className="text-yellow-100/70 text-sm font-medium">
                {currentAgent.name} Agent
              </span>
            </div>

            <div className="w-full max-w-3xl mx-auto">
              <SearchBox
                value={searchValue}
                onChange={setSearchValue}
                onSubmit={handleSendMessage}
                placeholder={`Ask ${currentAgent.name} anything...`}
                agentColor={currentAgent.primaryColor}
                agentName={currentAgent.name}
                disabled={isSearching} // Disable during search
              />
            </div>

            {/* Dynamic Sample Searches based on current agent */}
            <div className="flex flex-wrap justify-center gap-2 mt-6 opacity-60">
              {currentSamples.map((sample, index) => (
                <button
                  key={index}
                  onClick={() => handleSampleSearch(sample)}
                  disabled={isSearching}
                  className="px-3 py-1.5 bg-white/10 rounded-full text-xs text-yellow-100/70 hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  title={`Search: ${sample}`}
                >
                  {sample.length > 40 ? `${sample.substring(0, 40)}...` : sample}
                </button>
              ))}
            </div>

            {/* Search Tips */}
            <div className="mt-8 text-yellow-100/40 text-xs max-w-2xl mx-auto">
              <p>💡 Try asking about specific analyses, methodologies, or research topics related to {currentAgent.name.toLowerCase()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
