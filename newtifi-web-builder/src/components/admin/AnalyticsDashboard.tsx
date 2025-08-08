import React, { useState } from 'react';

interface AnalyticsData {
  journalDownloads: { month: string; count: number }[];
  pageViews: { page: string; views: number }[];
  scholarshipApplications: { source: string; count: number }[];
  legalCommentaryViews: { article: string; views: number }[];
  totalMetrics: {
    totalDownloads: number;
    totalPageViews: number;
    totalApplications: number;
    totalCommentaryViews: number;
  };
}

interface AnalyticsDashboardProps {
  data?: AnalyticsData;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ data }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [selectedContentType, setSelectedContentType] = useState<'all' | 'journal' | 'scholarship' | 'legal'>('all');

  const timeframes = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' }
  ];

  const contentTypes = [
    { value: 'all', label: 'All Content' },
    { value: 'journal', label: 'Journal Articles' },
    { value: 'scholarship', label: 'Scholarships' },
    { value: 'legal', label: 'Legal Commentary' }
  ];

  const exportCSV = () => {
    // In real implementation, this would generate and download CSV
    console.log('Exporting CSV...');
  };

  return (
    <div className="flex space-x-6">
      {/* Left Navigation/Filter Pane */}
      <div className="w-64 bg-white border rounded-lg p-4 h-fit">
        <h3 className="font-semibold mb-4">Filters</h3>
        
        {/* Timeframe Filter */}
        <div className="mb-6">
          <label className="block text-base font-medium mb-2">Timeframe</label>
          <div className="space-y-2">
            {timeframes.map((tf) => (
              <button
                key={tf.value}
                onClick={() => setSelectedTimeframe(tf.value as any)}
                className={`w-full text-left px-3 py-2 rounded text-base transition-colors ${
                  selectedTimeframe === tf.value 
                    ? 'bg-[#0A0A23] text-white' 
                    : 'hover:bg-gray-100'
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Type Filter */}
        <div className="mb-6">
          <label className="block text-base font-medium mb-2">Content Type</label>
          <div className="space-y-2">
            {contentTypes.map((ct) => (
              <button
                key={ct.value}
                onClick={() => setSelectedContentType(ct.value as any)}
                className={`w-full text-left px-3 py-2 rounded text-base transition-colors ${
                  selectedContentType === ct.value 
                    ? 'bg-[#0A0A23] text-white' 
                    : 'hover:bg-gray-100'
                }`}
              >
                {ct.label}
              </button>
            ))}
          </div>
        </div>

        {/* Export Button */}
        <button
          onClick={exportCSV}
          className="w-full bg-[#00C2CB] text-white px-4 py-2 rounded shadow hover:bg-[#00a8b3] transition-colors"
        >
          Export CSV
        </button>
      </div>

      {/* Right Charts Section */}
      <div className="flex-1 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-bold">Analytics Dashboard</h2>
          <div className="text-base text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">
              {data?.totalMetrics.totalDownloads || 0}
            </div>
            <div className="text-base text-gray-600">Journal Downloads</div>
          </div>
          <div className="bg-white border rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">
              {data?.totalMetrics.totalPageViews || 0}
            </div>
            <div className="text-base text-gray-600">Page Views</div>
          </div>
          <div className="bg-white border rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600">
              {data?.totalMetrics.totalApplications || 0}
            </div>
            <div className="text-base text-gray-600">Applications</div>
          </div>
          <div className="bg-white border rounded-lg p-4">
            <div className="text-2xl font-bold text-orange-600">
              {data?.totalMetrics.totalCommentaryViews || 0}
            </div>
            <div className="text-base text-gray-600">Commentary Views</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Journal Downloads Chart */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-semibold mb-4">Journal PDF Downloads</h3>
            {data?.journalDownloads && data.journalDownloads.length > 0 ? (
              <div className="space-y-2">
                {data.journalDownloads.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-20 text-base text-gray-600">{item.month}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${Math.min(100, (item.count / Math.max(...data.journalDownloads.map(d => d.count))) * 100)}%` }}
                      ></div>
                    </div>
                    <div className="w-12 text-base text-right">{item.count}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">No download data available.</div>
            )}
          </div>

          {/* Most Viewed Pages */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-semibold mb-4">Most Viewed Pages</h3>
            {data?.pageViews && data.pageViews.length > 0 ? (
              <div className="space-y-3">
                {data.pageViews.slice(0, 5).map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="text-base truncate flex-1">{item.page}</div>
                    <div className="text-base font-medium text-gray-600">{item.views}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">No page view data available.</div>
            )}
          </div>

          {/* Scholarship Applications by Source */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-semibold mb-4">Scholarship Applications by Source</h3>
            {data?.scholarshipApplications && data.scholarshipApplications.length > 0 ? (
              <div className="space-y-3">
                {data.scholarshipApplications.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="text-base">{item.source}</div>
                    <div className="text-base font-medium text-gray-600">{item.count}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">No application data available.</div>
            )}
          </div>

          {/* Legal Commentary Views */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-semibold mb-4">Legal Commentary View Count</h3>
            {data?.legalCommentaryViews && data.legalCommentaryViews.length > 0 ? (
              <div className="space-y-3">
                {data.legalCommentaryViews.slice(0, 5).map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="text-base truncate flex-1">{item.article}</div>
                    <div className="text-base font-medium text-gray-600">{item.views}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">No commentary view data available.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard; 