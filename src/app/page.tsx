// app/page.tsx - New landing page with home button
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowRight, 
  Sparkles, 
  Dna, 
  Beaker, 
  Microscope, 
  BookOpen,
  BarChart3,
  Target,
  Users,
  Clock,
  CheckCircle,
  Star,
  Play,
  Download,
  TrendingUp,
  Home // ✅ Added Home icon
} from 'lucide-react';
import Link from 'next/link';
import MovingGradientBackground from '@/components/MovingBackground';

export default function LandingPage() {
  const router = useRouter();
  const [activeAgent, setActiveAgent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const agents = [
    {
      id: 'omics',
      name: 'Omics Expert',
      description: 'Multi-omics data integration for biomarker discovery',
      icon: Dna,
      color: '#00758a',
      capabilities: ['GWAS Analysis', 'Pathway Enrichment', 'Biomarker Discovery', 'Multi-omics Integration']
    },
    {
      id: 'chemist',
      name: 'Chemist',
      description: 'Molecular analysis and drug discovery',
      icon: Beaker,
      color: '#8B5CF6',
      capabilities: ['ADMET Properties', 'Drug Design', 'Molecular Docking', 'Structure-Activity Analysis']
    },
    {
      id: 'gene-analyst',
      name: 'Gene Analyst',
      description: 'Advanced genetic analysis and variant interpretation',
      icon: Target,
      color: '#10B981',
      capabilities: ['Variant Analysis', 'Gene Expression', 'CRISPR Design', 'Clinical Significance']
    },
    // {
    //   id: 'report-generation',
    //   name: 'Report Generation',
    //   description: 'Comprehensive research synthesis and analysis',
    //   icon: BookOpen,
    //   color: '#8B5CF6',
    //   capabilities: ['Systematic Reviews', 'Meta-Analysis', 'Evidence Synthesis', 'Research Gaps']
    // }
  ];

  const features = [
    {
      icon: Users,
      title: '14+ Specialized AI Agents',
      description: 'Deploy expert AI agents for comprehensive scientific analysis across multiple domains'
    },
    {
      icon: Clock,
      title: '10x Faster Research',
      description: 'Transform weeks of analysis into minutes with automated workflows and intelligent processing'
    },
    {
      icon: BarChart3,
      title: '20+ Research Resources',
      description: 'Access cutting-edge databases, tools, and platforms in one integrated environment'
    },
    {
      icon: Sparkles,
      title: 'AI-Powered Insights',
      description: 'Generate actionable insights with proprietary models designed for scientific research'
    }
  ];

  const useCases = [
    {
      category: 'Academic Research',
      title: 'Accelerate Discovery',
      description: 'Streamline research workflows from hypothesis generation to manuscript preparation',
      examples: ['Multi-omics Analysis', 'Pathway Studies', 'Biomarker Discovery']
    },
    {
      category: 'Drug Development',
      title: 'Optimize Pipeline',
      description: 'Enhance drug discovery with comprehensive molecular analysis and target validation',
      examples: ['Target Feasibility', 'ADMET Prediction', 'Lead Optimization']
    },
    {
      category: 'Clinical Research',
      title: 'Evidence Generation',
      description: 'Generate robust evidence through systematic analysis and literature synthesis',
      examples: ['Clinical Trials', 'Evidence Synthesis', 'Regulatory Support']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e0e11] via-[#131417] to-[#232313] text-white">
      <MovingGradientBackground />

      {/* ✅ Header with Home Button */}
      <div className="fixed inset-0 -z-10">
  <div className="w-full h-full animate-gradient-move bg-[linear-gradient(120deg,#0e0e11_0%,#232313_35%,#ffe066_100%)] opacity-90"></div>
</div>

      <header className="absolute top-0 left-0 right-0 z-50 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
            OmicsFlow
          </div> */}
          
          {/* ✅ Navigation with Home Button */}
          {/* <nav className="flex items-center gap-4">
            <Link 
              href="/home"
              className="flex items-center gap-2 px-4 py-2 bg-black/30 border border-yellow-400/20 text-yellow-400 rounded-lg hover:bg-yellow-400/10 transition-all duration-300"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            
            <Link 
              href="/expert"
              className="px-4 py-2 bg-yellow-400/20 border border-yellow-400/30 text-yellow-400 rounded-lg hover:bg-yellow-400/30 transition-all duration-300"
            >
              Expert Panel
            </Link>
          </nav> */}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-transparent to-yellow-400/5" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Main Headlines */}
            <div className="mb-8">
              <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-white bg-clip-text text-transparent">
                  ResearchIQ
                </span>
              </h1>
              <h2 className="text-2xl lg:text-4xl font-semibold mb-4 text-yellow-100">
                AI-Powered Scientific Research Platform
              </h2>
              <p className="text-xl lg:text-2xl text-yellow-100/70 max-w-4xl mx-auto leading-relaxed">
                Transform your research with <strong className="text-yellow-400">14+ specialized AI agents</strong> that 
                analyze complex scientific data, generate insights, and accelerate discovery from 
                <strong className="text-yellow-400"> idea to publication</strong>
              </p>
            </div>

            {/* Key Value Props */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              <div className="bg-black/30 border border-yellow-400/20 rounded-xl p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold text-yellow-400 mb-2">10x</div>
                <div className="text-sm text-yellow-100/80">Faster Analysis</div>
              </div>
              <div className="bg-black/30 border border-yellow-400/20 rounded-xl p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold text-yellow-400 mb-2">20+</div>
                <div className="text-sm text-yellow-100/80">Research Resources</div>
              </div>
              <div className="bg-black/30 border border-yellow-400/20 rounded-xl p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold text-yellow-400 mb-2">14+</div>
                <div className="text-sm text-yellow-100/80">AI Agents</div>
              </div>
            </div>

            {/* ✅ Enhanced CTA Buttons with Home Option */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link 
                href="/expert"
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-xl hover:shadow-2xl hover:shadow-yellow-400/25 transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Start Free Analysis
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link 
                href="/home"
                className="px-8 py-4 bg-black/40 border border-yellow-400/30 text-yellow-400 font-semibold rounded-xl hover:bg-yellow-400/10 transition-all duration-300 flex items-center gap-2"
              >
                <Home className="w-5 h-5" />
                Chat with us
              </Link>
              
              {/* <button className="px-8 py-4 bg-black/40 border border-yellow-400/30 text-yellow-400 font-semibold rounded-xl hover:bg-yellow-400/10 transition-all duration-300 flex items-center gap-2">
                <Play className="w-5 h-5" />
                Watch Demo
              </button> */}
            </div>

            {/* Trust Indicators */}
            <div className="text-center text-yellow-100/60 text-sm">
              <p className="mb-4">Trusted by researchers worldwide</p>
              <div className="flex justify-center items-center gap-8 opacity-60">
                <div className="text-xs">✨ No Credit Card Required</div>
                <div className="text-xs">🔒 Enterprise-Grade Security</div>
                <div className="text-xs">⚡ Instant Results</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Agents Showcase */}
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                Meet Your AI Research Team
              </span>
            </h2>
            <p className="text-xl text-yellow-100/70 max-w-3xl mx-auto">
              Deploy specialized AI agents that understand your research domain and deliver expert-level analysis
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Agent Cards */}
            <div className="space-y-4">
              {agents.map((agent, index) => (
                <div
                  key={agent.id}
                  className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
                    activeAgent === index
                      ? 'bg-black/40 border-yellow-400/40 shadow-lg shadow-yellow-400/10'
                      : 'bg-black/20 border-yellow-400/20 hover:border-yellow-400/30'
                  }`}
                  onClick={() => setActiveAgent(index)}
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: `${agent.color}20`, border: `1px solid ${agent.color}40` }}
                    >
                      <agent.icon className="w-6 h-6" style={{ color: agent.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">{agent.name}</h3>
                      <p className="text-yellow-100/70 text-sm mb-3">{agent.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {agent.capabilities.map((cap, idx) => (
                          <span key={idx} className="px-2 py-1 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs rounded-full">
                            {cap}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-yellow-400/60" />
                  </div>
                </div>
              ))}
            </div>

            {/* Active Agent Demo */}
            <div className="bg-black/40 border border-yellow-400/20 rounded-xl p-8 backdrop-blur-sm">
              <div className="text-center mb-6">
                <div 
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${agents[activeAgent].color}20`, border: `2px solid ${agents[activeAgent].color}40` }}
                >
                  {React.createElement(agents[activeAgent].icon, { 
                    className: "w-8 h-8", 
                    style: { color: agents[activeAgent].color } 
                  })}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{agents[activeAgent].name}</h3>
                <p className="text-yellow-100/70">{agents[activeAgent].description}</p>
              </div>

              <div className="space-y-4">
                <div className="bg-black/60 rounded-lg p-4">
                  <div className="text-sm text-yellow-400 mb-2">Sample Analysis:</div>
                  <div className="text-white text-sm">
                    {activeAgent === 0 && "Analyzing multi-omics data for Alzheimer's biomarker discovery..."}
                    {activeAgent === 1 && "Predicting ADMET properties for novel drug compounds..."}
                    {activeAgent === 2 && "Interpreting BRCA1 genetic variants for clinical significance..."}
                    {activeAgent === 3 && "Synthesizing literature on CRISPR applications in cancer therapy..."}
                  </div>
                </div>

                <Link 
                  href={`/search/${agents[activeAgent].id}`}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 border border-yellow-400/30 text-yellow-400 rounded-lg hover:bg-yellow-400/30 transition-all"
                >
                  Try {agents[activeAgent].name}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Report Generation Feature Section - Add after AI Agents Showcase */}
<section className="py-20">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="text-4xl lg:text-5xl font-bold mb-6">
        <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
          Generate Comprehensive Research Reports
        </span>
      </h2>
      <p className="text-xl text-yellow-100/70 max-w-3xl mx-auto">
        Transform complex research questions into publication-ready reports with our AI-powered report generation system
      </p>
    </div>

    {/* Report Generation Process */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
      {/* Left: Process Steps */}
      <div className="space-y-6">
        <div className="bg-black/30 border border-yellow-400/20 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-2xl font-semibold text-yellow-300 mb-6">How It Works</h3>
          
          <div className="space-y-4">
            {[
              {
                step: "01",
                title: "Select Your Research Team",
                description: "Choose from 14+ specialized AI agents including Omics Expert, Chemist, Gene Analyst, and Literature Reviewer",
                icon: "👥"
              },
              {
                step: "02", 
                title: "AI-Enhanced Description",
                description: "Let our AI generate comprehensive project descriptions with research objectives, methodology, and expected outcomes",
                icon: "✨"
              },
              {
                step: "03",
                title: "Multi-Source Analysis",
                description: "Agents analyze data from 20+ scientific databases including PubMed, ChEMBL, GWAS Catalog, and ClinVar",
                icon: "🔬"
              },
              {
                step: "04",
                title: "Publication-Ready Report",
                description: "Generate comprehensive reports with statistical analysis, visualizations, and proper citations",
                icon: "📊"
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm shrink-0">
                  {item.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{item.icon}</span>
                    <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                  </div>
                  <p className="text-yellow-100/70 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Sample Report Preview */}
      <div className="bg-black/40 border border-yellow-400/20 rounded-xl overflow-hidden backdrop-blur-sm">
        <div className="p-6 border-b border-yellow-400/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 rounded-lg flex items-center justify-center">
              <span className="text-yellow-400">📋</span>
            </div>
            <h3 className="text-lg font-semibold text-white">Sample Report Preview</h3>
          </div>
          <p className="text-sm text-yellow-100/60">Multi-Omics Analysis for Alzheimer's Disease</p>
        </div>

        <div className="p-6 space-y-4">
          {/* Report Sections */}
          <div className="space-y-3">
            <div className="bg-black/60 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-yellow-400">Executive Summary</span>
                <span className="text-xs text-green-400">✓ Generated</span>
              </div>
              <p className="text-xs text-yellow-100/70">Research objectives and key findings overview...</p>
            </div>

            <div className="bg-black/60 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-yellow-400">Statistical Analysis</span>
                <span className="text-xs text-green-400">✓ Generated</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center">
                  <div className="text-white font-bold">2,847</div>
                  <div className="text-yellow-100/60">Samples</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-bold">15,432</div>
                  <div className="text-yellow-100/60">Genes</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-bold">156</div>
                  <div className="text-yellow-100/60">Pathways</div>
                </div>
              </div>
            </div>

            <div className="bg-black/60 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-yellow-400">Key Findings</span>
                <span className="text-xs text-yellow-400">Processing...</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-xs text-yellow-100/70">APOE4 variant association (p=1.2e-15)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-xs text-yellow-100/70">Neuroinflammation pathways identified</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-yellow-400/20">
            <div className="flex items-center justify-between text-xs">
              <span className="text-yellow-100/60">Generated in 2.3 minutes</span>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-yellow-400/10 text-yellow-400 rounded">PDF</span>
                <span className="px-2 py-1 bg-yellow-400/10 text-yellow-400 rounded">CSV</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Report Features Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {[
        {
          icon: "🤖",
          title: "14+ AI Agents",
          description: "Specialized agents for comprehensive analysis across multiple domains"
        },
        {
          icon: "📚",
          title: "20+ Databases",
          description: "Access to PubMed, ChEMBL, GWAS Catalog, ClinVar, and more scientific resources"
        },
        {
          icon: "⚡",
          title: "10x Faster",
          description: "Transform weeks of research into minutes with automated workflows"
        },
        {
          icon: "📊",
          title: "Publication Ready",
          description: "Professional reports with citations, statistics, and visualizations"
        }
      ].map((feature, index) => (
        <div key={index} className="bg-black/30 border border-yellow-400/20 rounded-xl p-6 text-center hover:border-yellow-400/40 transition-all group">
          <div className="text-3xl mb-3">{feature.icon}</div>
          <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors">
            {feature.title}
          </h4>
          <p className="text-yellow-100/70 text-sm">{feature.description}</p>
        </div>
      ))}
    </div>

    {/* Available Agent Teams */}
    <div className="bg-gradient-to-r from-yellow-400/10 via-yellow-400/5 to-yellow-400/10 rounded-2xl p-8 mb-12">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-yellow-300 mb-3">Choose Your Research Team</h3>
        <p className="text-yellow-100/70">Mix and match specialized AI agents for comprehensive analysis</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {[
          { name: "Scientific Writer", icon: "✍️" },
          { name: "Reference Validator", icon: "🔍" },
          { name: "Web Searcher", icon: "🌐" },
          { name: "Omics Expert", icon: "🧬" },
          { name: "Chemist", icon: "⚗️" },
          { name: "Gene Analyst", icon: "📊" },
          { name: "Clinical Expert", icon: "🏥" },
          { name: "Target Discovery", icon: "🎯" },
          { name: "Literature Reviewer", icon: "📖" },
          { name: "Knowledge Graph", icon: "🕸️" },
          { name: "Computational Scientist", icon: "💻" },
          { name: "Chemical Engineer", icon: "🔧" },
          { name: "Pharmaceutical Scientist", icon: "💊" },
          { name: "Precious3GPT", icon: "💎" }
        ].map((agent, index) => (
          <div key={index} className="bg-black/40 border border-yellow-400/20 rounded-lg p-3 text-center hover:border-yellow-400/40 transition-all group cursor-pointer">
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{agent.icon}</div>
            <div className="text-xs text-yellow-100/80 group-hover:text-yellow-400 transition-colors font-medium">
              {agent.name}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Sample Use Cases */}
    <div className="bg-black/30 border border-yellow-400/20 rounded-xl p-8">
      <h3 className="text-2xl font-bold text-yellow-300 mb-6 text-center">Sample Research Reports</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            category: "Genomics Research",
            title: "Multi-Omics Alzheimer's Analysis",
            agents: ["Omics Expert", "Gene Analyst", "Literature Reviewer"],
            duration: "3.2 minutes",
            outputs: ["156 pathways analyzed", "23 biomarkers identified", "47 genes validated"]
          },
          {
            category: "Drug Discovery",
            title: "ADMET Properties Analysis",
            agents: ["Chemist", "Target Discovery", "Clinical Expert"],
            duration: "2.8 minutes", 
            outputs: ["Drug-likeness: 78%", "5 ADMET properties", "Clinical feasibility assessed"]
          },
          {
            category: "Literature Review",
            title: "CRISPR Cancer Applications",
            agents: ["Literature Reviewer", "Gene Analyst", "Scientific Writer"],
            duration: "4.1 minutes",
            outputs: ["127 papers reviewed", "Evidence synthesis", "Research gaps identified"]
          }
        ].map((useCase, index) => (
          <div key={index} className="bg-black/40 border border-yellow-400/10 rounded-xl p-6 hover:border-yellow-400/30 transition-all">
            <div className="mb-4">
              <div className="text-yellow-400 text-xs font-medium mb-1">{useCase.category}</div>
              <h4 className="text-lg font-semibold text-white mb-3">{useCase.title}</h4>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {useCase.agents.map((agent, idx) => (
                  <span key={idx} className="px-2 py-1 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs rounded-full">
                    {agent}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {useCase.outputs.map((output, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span className="text-xs text-yellow-100/70">{output}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-yellow-400/10">
              <span className="text-xs text-yellow-100/60">Generated in {useCase.duration}</span>
              <button className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors">
                View Sample →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* CTA for Report Generation */}
    <div className="text-center mt-12">
      <Link 
        href="/expert/literature-reviewer"
        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-xl hover:shadow-2xl hover:shadow-yellow-400/25 transition-all duration-300 hover:scale-105"
      >
        <span className="text-xl">📊</span>
        Generate Your Research Report
        <ArrowRight className="w-5 h-5" />
      </Link>
      
      <p className="text-sm text-yellow-100/60 mt-4">
        ✨ No setup required • 🚀 Results in minutes • 📝 Publication ready
      </p>
    </div>
  </div>
</section>


      {/* ✅ Enhanced CTA Section with Home Button */}
      <section className="py-20 bg-gradient-to-r from-yellow-400/10 via-yellow-400/5 to-yellow-400/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
              Ready to Accelerate Your Research?
            </span>
          </h2>
          <p className="text-xl text-yellow-100/70 mb-8 max-w-2xl mx-auto">
            Join researchers worldwide who are transforming their workflows with AI-powered analysis
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link 
              href="/expert"
              className="px-10 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-xl hover:shadow-2xl hover:shadow-yellow-400/25 transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <Sparkles className="w-6 h-6" />
              Start Free Analysis
              <ArrowRight className="w-6 h-6" />
            </Link>
            
            {/* ✅ Home Button in CTA */}
            <Link 
              href="/home"
              className="px-10 py-4 bg-black/40 border border-yellow-400/30 text-yellow-400 font-semibold rounded-xl hover:bg-yellow-400/10 transition-all duration-300 flex items-center gap-2"
            >
              <Home className="w-6 h-6" />
              Go to Home
            </Link>
          </div>

          <div className="text-sm text-yellow-100/60">
            ✨ No setup required • 🚀 Instant results • 🔒 Secure & private
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-yellow-400/20 bg-black/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent mb-4">
              ResearchIQ
            </div>
            <p className="text-yellow-100/60 text-sm mb-6">
              Empowering scientific discovery through AI-powered research analysis
            </p>
            
            <div className="flex justify-center gap-8 text-sm text-yellow-100/60">
              <Link href="/home" className="hover:text-yellow-400 transition-colors">Home</Link>
              <Link href="/expert" className="hover:text-yellow-400 transition-colors">Expert Panel</Link>
              <Link href="/privacy" className="hover:text-yellow-400 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-yellow-400 transition-colors">Terms of Service</Link>
              <Link href="/contact" className="hover:text-yellow-400 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
