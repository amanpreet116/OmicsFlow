"use client";

import React, { useState } from 'react';

export default function AgentStatsWidget() {
  const [autoFillEnabled, setAutoFillEnabled] = useState(false);

  return (
    <div className="backdrop-blur-xl bg-black/40 border border-[#FFD600]/20 rounded-xl p-4 shadow-2xl">
      <h3 className="text-[15px] font-medium text-[#e5e5e5] mb-2">Research Tasks</h3>
      <p className="text-[11px] text-[#ffe066]/60 mb-4">
        Outline research tasks or generate one based on your inputs
      </p>
      
      {/* Auto Fill Plan Toggle */}
      <div className="mb-4">
        <div className="flex items-center justify-between p-2 bg-black/30 border border-[#FFD600]/10 rounded-lg">
          <span className="text-[13px] text-[#e5e5e5]">Auto Fill Plan</span>
          <div 
            className="relative cursor-pointer"
            onClick={() => setAutoFillEnabled(!autoFillEnabled)}
          >
            <div className={`w-8 h-4 rounded-full transition-all duration-200 ${
              autoFillEnabled 
                ? 'bg-gradient-to-r from-[#FFD600] to-[#FFA800]' 
                : 'bg-[#FFD600]/20'
            }`}>
              <div className={`w-3 h-3 bg-white rounded-full shadow transform transition-all duration-200 ${
                autoFillEnabled ? 'translate-x-4 translate-y-0.5' : 'translate-x-0.5 translate-y-0.5'
              }`}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Task Input Area */}
      <div className="space-y-3">
        <textarea
          placeholder="List key topics, propose research goals, or use the automated outline to tailor your research needs."
          className="w-full h-24 px-3 py-2 bg-black/30 border border-[#FFD600]/20 rounded-lg text-[12px] text-[#e5e5e5] placeholder-[#ffe066]/40 focus:outline-none focus:border-[#FFD600]/60 focus:bg-black/50 transition-all duration-200 backdrop-blur-sm resize-none"
        />
        
        {/* Task Statistics */}
        <div className="grid grid-cols-3 gap-2">
          <div className="p-2 bg-black/30 border border-[#FFD600]/10 rounded-lg text-center">
            <div className="text-[16px] font-semibold text-[#FFD600]">0</div>
            <div className="text-[10px] text-[#ffe066]/60">Active</div>
          </div>
          <div className="p-2 bg-black/30 border border-[#FFD600]/10 rounded-lg text-center">
            <div className="text-[16px] font-semibold text-[#FFD600]">0</div>
            <div className="text-[10px] text-[#ffe066]/60">Pending</div>
          </div>
          <div className="p-2 bg-black/30 border border-[#FFD600]/10 rounded-lg text-center">
            <div className="text-[16px] font-semibold text-[#FFD600]">0</div>
            <div className="text-[10px] text-[#ffe066]/60">Complete</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button className="w-full px-3 py-2 bg-gradient-to-r from-[#FFD600] to-[#FFA800] text-black text-[13px] font-medium rounded-lg hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-200">
            Generate Research Plan
          </button>
          <button className="w-full px-3 py-2 bg-black/30 border border-[#FFD600]/20 text-[#e5e5e5] text-[13px] rounded-lg hover:border-[#FFD600]/40 hover:bg-[#FFD600]/5 transition-all duration-200">
            Save Draft
          </button>
        </div>

        {/* Progress Indicators */}
        <div className="pt-3 border-t border-[#FFD600]/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] text-[#e5e5e5]">Research Progress</span>
            <span className="text-[12px] text-[#FFD600]">0%</span>
          </div>
          <div className="w-full bg-black/30 rounded-full h-1.5">
            <div className="bg-gradient-to-r from-[#FFD600] to-[#FFA800] h-1.5 rounded-full" style={{width: '0%'}}></div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <div className="p-2 bg-black/20 border border-[#FFD600]/10 rounded-lg">
            <div className="text-[11px] text-[#ffe066]/60">Sources Found</div>
            <div className="text-[14px] font-semibold text-[#FFD600]">0</div>
          </div>
          <div className="p-2 bg-black/20 border border-[#FFD600]/10 rounded-lg">
            <div className="text-[11px] text-[#ffe066]/60">Citations</div>
            <div className="text-[14px] font-semibold text-[#FFD600]">0</div>
          </div>
        </div>
      </div>
    </div>
  );
}