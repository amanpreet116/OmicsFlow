'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Copy, Share, RefreshCw, Clock, User, Search } from 'lucide-react';
import Link from 'next/link';
import AgentBackground from '../../components/AgentBackground';

// Define interfaces for type safety
interface SearchData {
  query: string;
  agent: string;
  agentType: string;
  timestamp: string;
  primaryColor: string;
  secondaryColor: string;
}

interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  relevance: number;
}

interface AnalysisSection {
  title: string;
  content: string;
  confidence: number;
}

export default function AgentResultsPage() {
  const router = useRouter();
  const [searchData, setSearchData] = useState<SearchData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Mock data for demonstration
  const [searchResults] = useState<SearchResult[]>([
    {
      title: "Advanced GWAS Analysis Methods for Complex Traits",
      url: "https://example.com/gwas-analysis",
      snippet: "Comprehensive guide to genome-wide association studies covering statistical methods, population stratification, and effect size estimation...",
      relevance: 0.95
    },
    {
      title: "Multi-omics Integration in Precision Medicine",
      url: "https://example.com/multi-omics",
      snippet: "Recent advances in integrating genomics, transcriptomics, proteomics, and metabolomics data for personalized treatment approaches...",
      relevance: 0.88
    },
    {
      title: "Diabetes Susceptibility Genes: Current Understanding",
      url: "https://example.com/diabetes-genes",
      snippet: "Overview of genetic factors contributing to type 1 and type 2 diabetes, including recent discoveries from large-scale genomic studies...",
      relevance: 0.82
    }
  ]);

  const [analysisResults] = useState<AnalysisSection[]>([
    {
      title: "Key Findings",
      content: "Based on current research, GWAS analysis for diabetes susceptibility requires careful consideration of population ancestry, linkage disequilibrium patterns, and polygenic risk scores. The most significant associations have been found in the HLA region for type 1 diabetes and TCF7L2 for type 2 diabetes.",
      confidence: 0.92
    },
    {
      title: "Methodology Recommendations",
      content: "For robust GWAS analysis, implement quality control measures including MAF filtering (>0.01), HWE testing (p>1e-6), and population stratification correction using principal components. Consider using mixed linear models for related individuals and meta-analysis approaches for increased power.",
      confidence: 0.89
    },
    {
      title: "Clinical Implications",
      content: "Current polygenic risk scores for diabetes can explain approximately 10-15% of disease heritability. Integration with clinical risk factors improves prediction accuracy significantly. Consider pharmacogenomic variants when prescribing metformin or sulfonylureas.",
      confidence: 0.85
    }
  ]);

  useEffect(() => {
    // Retrieve search data from localStorage
    const storedData = localStorage.getItem('searchData');
    if (storedData) {
      const data = JSON.parse(storedData);
      setSearchData(data);
      
      // Simulate analysis completion
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => setAnalysisComplete(true), 500);
      }, 2000);
    } else {
      router.push('/');
    }
  }, [router]);

  const handleCopyResults = async () => {
    const resultsText = analysisResults
      .map(section => `${section.title}:\n${section.content}\n`)
      .join('\n');
    
    try {
      await navigator.clipboard.writeText(resultsText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleNewSearch = () => {
    if (searchData) {
      router.push(`/agent/${searchData.agentType}`);
    }
  };

  if (!searchData) {
    return (
      <div className="flex h-screen bg-gradient-to-br from-[#161618] via-[#29291f] to-[#232313] items-center justify-center">
        <div className="text-yellow-100 text-lg">Loading...</div>
      </div>
    );
  }

  const bgType = searchData.agentType === 'omics' ? 'dna' : 
                searchData.agentType === 'chemist' ? 'molecules' : 'network';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#161618] via-[#29291f] to-[#232313] overflow-hidden relative">
      <AgentBackground 
        type={bgType as 'dna' | 'molecules' | 'network'} 
        colors={[searchData.primaryColor, searchData.secondaryColor]} 
      />
      
      {/* Header */}
      <div className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-yellow-100" />
              </button>
              
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: searchData.primaryColor }}
                />
                <div>
                  <h1 className="text-xl font-semibold text-yellow-100">
                    {searchData.agent} Analysis
                  </h1>
                  <p className="text-sm text-yellow-100/60">
                    Query: {searchData.query}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyResults}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-yellow-100 text-sm flex items-center gap-2 transition-colors"
              >
                <Copy className="w-4 h-4" />
                {copySuccess ? 'Copied!' : 'Copy Results'}
              </button>
              
              <button
                onClick={handleNewSearch}
                className="px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 rounded-lg text-black font-medium text-sm flex items-center gap-2 transition-all"
              >
                <Search className="w-4 h-4" />
                New Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="relative z-10 flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mx-auto mb-6"></div>
            <h2 className="text-2xl font-semibold text-yellow-100 mb-2">
              Analyzing Your Query
            </h2>
            <p className="text-yellow-100/60">
              {searchData.agent} is processing your request and gathering insights...
            </p>
            <div className="mt-4 flex justify-center">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Content */}
      {!isLoading && (
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Analysis Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* Analysis Summary */}
              <div className={`bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 transform transition-all duration-700 ${analysisComplete ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <User 
                    className="w-6 h-6" 
                    style={{ color: searchData.primaryColor }}
                  />
                  <h2 className="text-xl font-semibold text-yellow-100">
                    {searchData.agent} Analysis Results
                  </h2>
                </div>
                
                <div className="space-y-6">
                  {analysisResults.map((section, index) => (
                    <div 
                      key={index}
                      className={`transform transition-all duration-500 ${analysisComplete ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
                      style={{ transitionDelay: `${index * 200}ms` }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-medium text-yellow-100">
                          {section.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <div className="text-xs text-yellow-100/60">
                            Confidence
                          </div>
                          <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-1000"
                              style={{ width: `${section.confidence * 100}%` }}
                            />
                          </div>
                          <div className="text-xs text-yellow-100/80 w-10">
                            {Math.round(section.confidence * 100)}%
                          </div>
                        </div>
                      </div>
                      <p className="text-yellow-100/80 leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sources Section */}
              <div className={`bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 transform transition-all duration-700 ${analysisComplete ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
                <h3 className="text-lg font-semibold text-yellow-100 mb-4">
                  Key Sources & References
                </h3>
                <div className="space-y-4">
                  {searchResults.map((result, index) => (
                    <div 
                      key={index}
                      className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-yellow-100 font-medium text-sm">
                          {result.title}
                        </h4>
                        <div className="flex items-center gap-1 text-xs text-yellow-100/60">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          {Math.round(result.relevance * 100)}% relevant
                        </div>
                      </div>
                      <p className="text-yellow-100/70 text-sm leading-relaxed mb-2">
                        {result.snippet}
                      </p>
                      <a 
                        href={result.url}
                        className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {result.url}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Query Info */}
              <div className={`bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 transform transition-all duration-700 ${analysisComplete ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
                <h3 className="text-lg font-semibold text-yellow-100 mb-4">
                  Search Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-yellow-100/60" />
                    <div>
                      <div className="text-sm text-yellow-100/60">Analyzed</div>
                      <div className="text-sm text-yellow-100">
                        {new Date(searchData.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-yellow-100/60" />
                    <div>
                      <div className="text-sm text-yellow-100/60">Agent</div>
                      <div className="text-sm text-yellow-100">
                        {searchData.agent}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Search className="w-4 h-4 text-yellow-100/60 mt-0.5" />
                    <div>
                      <div className="text-sm text-yellow-100/60">Query</div>
                      <div className="text-sm text-yellow-100 leading-relaxed">
                        {searchData.query}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className={`bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 transform transition-all duration-700 ${analysisComplete ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '500ms' }}>
                <h3 className="text-lg font-semibold text-yellow-100 mb-4">
                  Actions
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={handleNewSearch}
                    className="w-full px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 rounded-lg text-black font-medium text-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <RefreshCw className="w-4 h-4" />
                    New Search
                  </button>
                  
                  <button
                    onClick={() => router.push('/')}
                    className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-yellow-100 text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                  </button>
                </div>
              </div>

              {/* Performance Stats */}
              <div className={`bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 transform transition-all duration-700 ${analysisComplete ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
                <h3 className="text-lg font-semibold text-yellow-100 mb-4">
                  Analysis Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-yellow-100/60">Sources Analyzed</span>
                    <span className="text-sm text-yellow-100">{searchResults.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-yellow-100/60">Processing Time</span>
                    <span className="text-sm text-yellow-100">2.3s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-yellow-100/60">Confidence Score</span>
                    <span className="text-sm text-yellow-100">89%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
