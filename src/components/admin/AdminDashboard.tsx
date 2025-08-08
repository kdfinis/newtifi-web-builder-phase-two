import React from 'react';

interface Analytics {
  totalViews: number;
  totalArticles: number;
  totalJournals: number;
  monthlyViews: number[];
}

interface ActivityItem {
  timestamp: string;
  description: string;
  type?: 'alert' | 'info' | 'upload' | 'download';
}

interface AdminDashboardProps {
  analytics: Analytics;
  activityLog: ActivityItem[];
}

const statusDot = (color: string) => (
  <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: color, marginRight: 6 }} />
);

const AdminDashboard: React.FC<AdminDashboardProps> = ({ analytics, activityLog }) => {
  return (
    <div className="space-y-8">
      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-[#0A0A23] text-white rounded-lg shadow p-4 flex flex-col items-center">
          {statusDot('#00CB6A')}
          <div className="text-2xl font-bold">{analytics.totalArticles ?? 0}</div>
          <div className="text-xs mt-1">Articles Published</div>
        </div>
        <div className="bg-[#0A0A23] text-white rounded-lg shadow p-4 flex flex-col items-center">
          {statusDot('#FFB800')}
          <div className="text-2xl font-bold">0</div>
          <div className="text-xs mt-1">Pending Articles</div>
        </div>
        <div className="bg-[#0A0A23] text-white rounded-lg shadow p-4 flex flex-col items-center">
          {statusDot('#00C2CB')}
          <div className="text-2xl font-bold">0</div>
          <div className="text-xs mt-1">Scholarship Applications</div>
        </div>
        <div className="bg-[#0A0A23] text-white rounded-lg shadow p-4 flex flex-col items-center">
          {statusDot('#FF4D4F')}
          <div className="text-2xl font-bold">0</div>
          <div className="text-xs mt-1">Legal Comments</div>
        </div>
        <div className="bg-[#0A0A23] text-white rounded-lg shadow p-4 flex flex-col items-center">
          {statusDot('#00CB6A')}
          <div className="text-2xl font-bold">{analytics.totalViews ?? 0}</div>
          <div className="text-xs mt-1">Site Visits</div>
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="font-semibold text-lg mb-2">Recent Activity</div>
        {activityLog.length === 0 ? (
          <div className="text-gray-400 text-sm">No recent activity.</div>
        ) : (
          <ul className="space-y-2">
            {activityLog.map((item, idx) => (
              <li key={idx} className="flex items-center text-sm">
                <span className="text-gray-400 mr-2">{item.timestamp}</span>
                <span>{item.description}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 