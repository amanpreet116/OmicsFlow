'use client';

import { useState } from 'react';
import { TrendingUp, AlertTriangle, CheckCircle, Clock, BarChart3, PieChart } from 'lucide-react';

interface Insight {
  id: string;
  type: 'trend' | 'warning' | 'success' | 'info';
  title: string;
  description: string;
  value?: string;
  priority: 'high' | 'medium' | 'low';
}

const mockInsights: Insight[] = [
  {
    id: '1',
    type: 'success',
    title: 'High-Quality Sources',
    description: '89% of references are from peer-reviewed journals with impact factor > 5.0',
    value: '89%',
    priority: 'high'
  },
  {
    id: '2',
    type: 'trend',
    title: 'Recent Research Focus',
    description: 'Increasing trend in CRISPR safety studies (2020-2024)',
    value: '+45%',
    priority: 'medium'
  },
  {
    id: '3',
    type: 'warning',
    title: 'Limited Long-term Data',
    description: 'Only 23% of studies include follow-up periods >2 years',
    value: '23%',
    priority: 'high'
  },
  {
    id: '4',
    type: 'info',
    title: 'Geographic Distribution',
    description: 'Research primarily from US (45%), EU (32%), and Asia (23%)',
    priority: 'low'
  },
  {
    id: '5',
    type: 'success',
    title: 'Clinical Translation',
    description: '67% of cited studies have moved to clinical trials',
    value: '67%',
    priority: 'medium'
  }
];

const stats = [
  { label: 'Total References', value: '156', change: '+12%' },
  { label: 'Avg Impact Factor', value: '8.4', change: '+0.8' },
  { label: 'Recent Papers (<2 years)', value: '78', change: '+23%' },
  { label: 'Review Articles', value: '34', change: '+5%' }
];

export default function ReviewInsights() {
  const [activeTab, setActiveTab] = useState<'insights' | 'stats'>('insights');

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'trend':
        return <TrendingUp className="w-4 h-4" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />;
      case 'success':
        return <CheckCircle className="w-4 h-4" />;
      case 'info':
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'trend':
        return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
      case 'warning':
        return 'text-orange-400 bg-orange-400/20 border-orange-400/30';
      case 'success':
        return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'info':
      default:
        return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400';
      case 'medium':
        return 'text-yellow-400';
      case 'low':
      default:
        return 'text-green-400';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header with Tabs */}
      <div className="p-4 border-b border-yellow-400/20">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-yellow-400 to-yellow-100 bg-clip-text text-transparent mb-3">
          Review Insights
        </h3>
        
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab('insights')}
            className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
              activeTab === 'insights'
                ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30'
                : 'bg-black/30 text-gray-400 border border-yellow-400/10 hover:bg-yellow-400/10'
            }`}
          >
            Insights
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
              activeTab === 'stats'
                ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30'
                : 'bg-black/30 text-gray-400 border border-yellow-400/10 hover:bg-yellow-400/10'
            }`}
          >
            Statistics
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'insights' ? (
          <div className="p-3 space-y-3">
            {mockInsights.map((insight) => (
              <div
                key={insight.id}
                className={`p-3 rounded-lg border ${getInsightColor(insight.type)}`}
              >
                <div className="flex items-start gap-2 mb-2">
                  {getInsightIcon(insight.type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium text-white">
                        {insight.title}
                      </h4>
                      {insight.value && (
                        <span className="text-sm font-bold">
                          {insight.value}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {insight.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${getPriorityColor(insight.priority)}`}>
                    Priority: {insight.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-3">
            {/* Statistics Grid */}
            <div className="grid grid-cols-1 gap-3 mb-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="p-3 bg-black/30 border border-yellow-400/10 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">{stat.label}</span>
                    <span className="text-xs text-green-400">{stat.change}</span>
                  </div>
                  <div className="text-lg font-bold text-white">{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Quality Metrics */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-yellow-300">Quality Metrics</h4>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Peer Review Rate</span>
                  <span className="text-green-400">94%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <div className="bg-green-400 h-1.5 rounded-full" style={{ width: '94%' }}></div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Citation Diversity</span>
                  <span className="text-blue-400">87%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: '87%' }}></div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Methodological Rigor</span>
                  <span className="text-yellow-400">76%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: '76%' }}></div>
                </div>
              </div>
            </div>

            {/* Research Gaps */}
            <div className="mt-4 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
              <h4 className="text-sm font-medium text-orange-400 mb-2">Research Gaps Identified</h4>
              <ul className="text-xs text-orange-300 space-y-1">
                <li>• Limited pediatric population studies</li>
                <li>• Insufficient long-term safety data</li>
                <li>• Lack of standardized outcome measures</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
