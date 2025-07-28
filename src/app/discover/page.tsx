"use client"

import { useState } from 'react';
import { Sparkles, Search, Filter, ArrowRight } from 'lucide-react'; // Example icon set

const discoveries = [
  {
    id: 1,
    title: "Alzheimer's Multi-Omics Biomarkers",
    summary: "Pathway and biomarker discoveries using genomics, proteomics and metabolomics.",
    type: "Genomics",
    tags: ["Biomarkers", "Pathways", "Alzheimer's"],
    date: "2025-07-10",
    featured: true,
    image: "/images/alzheimers.jpg",
    aiAgents: ["Omics Expert", "Gene Analyst"],
  },
  {
    id: 2,
    title: "Novel COVID-19 Drug Target",
    summary: "AI-predicted protein targets for antiviral therapy, validated across multiple datasets.",
    type: "Drug Discovery",
    tags: ["COVID-19", "Proteins", "Drug Target"],
    date: "2025-07-05",
    featured: false,
    image: "/images/covid19.jpg",
    aiAgents: ["Chemist", "Target Discovery"],
  },
  {
    id: 3,
    title: "BRCA1 Variant Clinical Insights",
    summary: "Interpretation of BRCA1 gene variants linked to cancer susceptibility.",
    type: "Clinical Genomics",
    tags: ["BRCA1", "Cancer", "Variants"],
    date: "2025-07-01",
    featured: false,
    image: "/images/brca1.jpg",
    aiAgents: ["Gene Analyst", "Clinical Expert"],
  },
  {
    id: 4,
    title: "CRISPR Review: Cancer Therapy",
    summary: "Synthesis of 127 latest papers on CRISPR applications in oncology.",
    type: "Literature Review",
    tags: ["CRISPR", "Oncology", "Review"],
    date: "2025-06-29",
    featured: false,
    image: "/images/crispr.jpg",
    aiAgents: ["Literature Reviewer", "Scientific Writer"],
  },
  // ... more discovery data
];

export default function DiscoverPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredDiscoveries = discoveries.filter(
    disc =>
      (filter === 'All' || disc.type === filter) &&
      (disc.title.toLowerCase().includes(search.toLowerCase()) ||
       disc.summary.toLowerCase().includes(search.toLowerCase()) ||
       disc.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase())))
  );

  // Safely extract the featured discovery once
  const featuredDiscovery = filteredDiscoveries.find(d => d.featured);

  const categories = ['All', ...Array.from(new Set(discoveries.map(d => d.type)))];

  return (
    <div className="min-h-screen bg-black/95 text-white px-0 py-0 relative overflow-hidden ml-8">
      {/* Header */}
      <header className="py-10 px-8 flex flex-col md:flex-row gap-3 items-center justify-between border-b border-yellow-400/20 bg-black/30">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-white bg-clip-text text-transparent">
            Discover Research
          </h1>
          <p className="text-yellow-100/70 text-lg mt-2">
            Explore groundbreaking insights, AI-driven analyses, and top papers across domains
          </p>
        </div>

        <form
          onSubmit={e => e.preventDefault()}
          className="flex items-center gap-2 mt-4 md:mt-0"
        >
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search discoveries, agents, tags..."
            className="px-4 py-2 rounded-lg bg-black/40 border border-yellow-400/20 text-yellow-100 placeholder-yellow-100/50 focus:outline-none focus:border-yellow-400"
          />
          <button type="submit" className="p-2 bg-yellow-400/20 rounded-lg">
            <Search className="w-5 h-5 text-yellow-400" />
          </button>
        </form>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors
              ${filter === cat 
                ? 'bg-yellow-400 text-black' 
                : 'border border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10'}
              `}
            >
              <Filter className="inline w-4 h-4 mr-2" /> {cat}
            </button>
          ))}
        </div>

        {/* Featured Discovery */}
        {featuredDiscovery && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-yellow-300 mb-4">Featured Discovery</h2>
            <div className="flex flex-col md:flex-row gap-6 bg-black/60 border border-yellow-400/20 rounded-xl p-6">
              <img
                src={featuredDiscovery.image}
                alt={featuredDiscovery.title}
                className="w-full md:w-60 h-40 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">{featuredDiscovery.title}</h3>
                <p className="text-yellow-100/80 mb-3">{featuredDiscovery.summary}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {featuredDiscovery.tags.map(tag => (
                    <span key={tag} className="bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs rounded-full px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-yellow-100/40 mb-2">
                  {featuredDiscovery.date}
                </div>
                <div className="flex flex-wrap gap-2">
                  {featuredDiscovery.aiAgents.map(agent => (
                    <span key={agent} className="bg-black/60 border border-yellow-400/30 text-yellow-200 text-xs rounded-full px-3 py-1">
                      {agent}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Discoveries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDiscoveries
            .filter(d => !d.featured)
            .map(discovery => (
              <div
                key={discovery.id}
                className="bg-black/40 border border-yellow-400/10 rounded-xl p-5 hover:border-yellow-400/30 transition-colors flex flex-col"
              >
                <img
                  src={discovery.image}
                  alt={discovery.title}
                  className="h-32 w-full object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-white mb-1">{discovery.title}</h3>
                <p className="text-yellow-100/70 text-sm mb-2">{discovery.summary}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {discovery.tags.map(tag => (
                    <span key={tag} className="bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs rounded-full px-2 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {discovery.aiAgents.map(agent => (
                    <span key={agent} className="bg-black/60 border border-yellow-400/30 text-yellow-200 text-xs rounded-full px-2 py-1">
                      {agent}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-yellow-100/40 mt-auto">{discovery.date}</div>
                <button className="mt-3 px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 via-yellow-400/80 to-yellow-300 text-black font-semibold flex items-center gap-2 hover:scale-105 transition-transform">
                  Explore <ArrowRight className="w-4 h-4" />
                </button>
              </div>
          ))}
        </div>

        {/* No Results State */}
        {filteredDiscoveries.length === 0 && (
          <div className="text-center text-yellow-200 py-12 text-xl">
            No discoveries found. Try changing your search or filters.
          </div>
        )}
      </main>
    </div>
  );
}
