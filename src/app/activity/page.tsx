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
    <div className="min-h-screen bg-gradient-to-br from-[#131417] via-[#191919] to-[#0e0e11] px-6 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header matching other pages */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-100 bg-clip-text text-transparent tracking-wide">
              Recent Activity
            </h1>
            <p className="text-yellow-100/60 text-sm mt-1">
              Track your research progress and latest updates
            </p>
          </div>
          <button className="text-sm px-4 py-2 bg-black/30 border border-yellow-400/30 text-yellow-200 rounded-lg hover:bg-yellow-400/10 hover:border-yellow-400/50 transition-all">
            View All Activities
          </button>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activity List - Takes 2/3 of the space */}
          <div className="lg:col-span-2">
            <div className="backdrop-blur-xl bg-black/40 border border-[#FFD600]/20 rounded-xl p-6 shadow-2xl">
              <h3 className="text-lg font-semibold text-yellow-300 mb-6">Latest Activities</h3>
              
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="p-4 bg-black/30 border border-[#FFD600]/10 rounded-lg hover:border-[#FFD600]/30 hover:bg-black/40 transition-all duration-200 cursor-pointer">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#FFD600]/20 to-[#FFA800]/20 border border-[#FFD600]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">{activity.icon}</span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-base font-semibold text-[#e5e5e5] truncate">
                            {activity.title}
                          </h4>
                          <span className="text-sm text-[#ffe066]/60 ml-4">
                            {activity.timestamp}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(activity.status)}`}>
                            {getStatusText(activity.status)}
                          </span>
                          <span className="text-xs text-[#ffe066]/50 capitalize">
                            {activity.type} task
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar - Stats and Actions */}
          <div className="space-y-6">
            {/* Activity Summary */}
            <div className="backdrop-blur-xl bg-black/40 border border-[#FFD600]/20 rounded-xl p-6 shadow-2xl">
              <h3 className="text-lg font-semibold text-yellow-300 mb-4">Activity Summary</h3>
              <div className="space-y-4">
                <div className="text-center p-4 bg-black/30 rounded-lg border border-[#FFD600]/10">
                  <div className="text-2xl font-bold text-[#FFD600]">12</div>
                  <div className="text-sm text-[#ffe066]/70">This Week</div>
                </div>
                <div className="text-center p-4 bg-black/30 rounded-lg border border-[#FFD600]/10">
                  <div className="text-2xl font-bold text-[#FFD600]">48</div>
                  <div className="text-sm text-[#ffe066]/70">This Month</div>
                </div>
                <div className="text-center p-4 bg-black/30 rounded-lg border border-[#FFD600]/10">
                  <div className="text-2xl font-bold text-[#FFD600]">156</div>
                  <div className="text-sm text-[#ffe066]/70">Total Activities</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="backdrop-blur-xl bg-black/40 border border-[#FFD600]/20 rounded-xl p-6 shadow-2xl">
              <h3 className="text-lg font-semibold text-yellow-300 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full py-3 px-4 bg-gradient-to-r from-[#FFD600]/10 to-[#FFA800]/10 border border-[#FFD600]/20 text-[#FFD600] text-sm font-medium rounded-lg hover:bg-[#FFD600]/20 hover:border-[#FFD600]/40 transition-all duration-200">
                  Start New Research
                </button>
                <button className="w-full py-3 px-4 bg-black/30 border border-[#FFD600]/10 text-[#e5e5e5] text-sm font-medium rounded-lg hover:border-[#FFD600]/30 hover:bg-black/40 transition-all duration-200">
                  Export Results
                </button>
                <button className="w-full py-3 px-4 bg-black/30 border border-[#FFD600]/10 text-[#e5e5e5] text-sm font-medium rounded-lg hover:border-[#FFD600]/30 hover:bg-black/40 transition-all duration-200">
                  Generate Report
                </button>
              </div>
            </div>

            {/* Status Distribution */}
            <div className="backdrop-blur-xl bg-black/40 border border-[#FFD600]/20 rounded-xl p-6 shadow-2xl">
              <h3 className="text-lg font-semibold text-yellow-300 mb-4">Status Overview</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#e5e5e5]">Completed</span>
                  <span className="text-sm font-semibold text-green-400">75%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#e5e5e5]">In Progress</span>
                  <span className="text-sm font-semibold text-[#FFD600]">20%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#e5e5e5]">Pending</span>
                  <span className="text-sm font-semibold text-orange-400">5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
