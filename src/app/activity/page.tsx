import React from 'react';

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'research',
      title: 'AI Drug Discovery Report',
      status: 'completed',
      timestamp: '2 hours ago',
      icon: '🔬'
    },
    {
      id: 2,
      type: 'search',
      title: 'Literature Review - Longevity',
      status: 'in_progress',
      timestamp: '4 hours ago',
      icon: '📚'
    },
    {
      id: 3,
      type: 'analysis',
      title: 'Protein Interaction Analysis',
      status: 'pending',
      timestamp: '1 day ago',
      icon: '🧬'
    },
    {
      id: 4,
      type: 'report',
      title: 'Clinical Trial Summary',
      status: 'completed',
      timestamp: '2 days ago',
      icon: '🏥'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 bg-green-400/20';
      case 'in_progress':
        return 'text-[#FFD600] bg-[#FFD600]/20';
      case 'pending':
        return 'text-orange-400 bg-orange-400/20';
      default:
        return 'text-[#ffe066] bg-[#ffe066]/20';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in_progress':
        return 'In Progress';
      case 'pending':
        return 'Pending';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="backdrop-blur-xl bg-black/40 border border-[#FFD600]/20 rounded-xl p-4 shadow-2xl ml-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[15px] font-medium text-yellow-300">Recent Activity</h3>
        <button className="text-[11px] text-[#ffe066] hover:text-[#FFD600] transition-colors">
          View All
        </button>
      </div>
      
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="p-3 bg-black/30 border border-[#FFD600]/10 rounded-lg hover:border-[#FFD600]/30 hover:bg-black/40 transition-all duration-200">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#FFD600]/20 to-[#FFA800]/20 border border-[#FFD600]/30 rounded-lg flex items-center justify-center">
                <span className="text-[11px]">{activity.icon}</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-[13px] font-medium text-[#e5e5e5] truncate">
                    {activity.title}
                  </h4>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 text-[8px] font-medium rounded-full ${getStatusColor(activity.status)}`}>
                    {getStatusText(activity.status)}
                  </span>
                  <span className="text-[10px] text-[#ffe066]/60">
                    {activity.timestamp}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Activity Summary */}
      <div className="mt-4 pt-3 border-t border-[#FFD600]/10">
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center">
            <div className="text-[14px] font-semibold text-[#FFD600]">12</div>
            <div className="text-[10px] text-[#ffe066]/60">This Week</div>
          </div>
          <div className="text-center">
            <div className="text-[14px] font-semibold text-[#FFD600]">48</div>
            <div className="text-[10px] text-[#ffe066]/60">This Month</div>
          </div>
          <div className="text-center">
            <div className="text-[14px] font-semibold text-[#FFD600]">156</div>
            <div className="text-[10px] text-[#ffe066]/60">Total</div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="mt-4 space-y-2">
        <button className="w-full px-3 py-2 bg-gradient-to-r from-[#FFD600]/10 to-[#FFA800]/10 border border-[#FFD600]/20 text-[#FFD600] text-[12px] rounded-lg hover:bg-[#FFD600]/20 hover:border-[#FFD600]/40 transition-all duration-200">
          Start New Research
        </button>
        <button className="w-full px-3 py-2 bg-black/30 border border-[#FFD600]/10 text-[#e5e5e5] text-[12px] rounded-lg hover:border-[#FFD600]/30 hover:bg-black/40 transition-all duration-200">
          Export Results
        </button>
      </div>
    </div>
  );
}