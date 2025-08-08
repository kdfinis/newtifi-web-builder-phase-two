import React, { useState } from 'react';

interface ChartData {
  name: string;
  value: number;
  color?: string;
}

interface AnalyticsData {
  totalArticles: number;
  totalViews: number;
  totalDownloads: number;
  monthlyStats: ChartData[];
  categoryStats: ChartData[];
}

interface AnalyticsDashboardProps {
  data?: AnalyticsData;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ data }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [selectedContentType, setSelectedContentType] = useState<'all' | 'journal' | 'scholarship' | 'legal'>('all');

  const timeframes: Array<{ value: '7d' | '30d' | '90d' | '1y'; label: string }> = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' }
  ];

  const contentTypes: Array<{ value: 'all' | 'journal' | 'scholarship' | 'legal'; label: string }> = [
    { value: 'all', label: 'All Content' },
    { value: 'journal', label: 'Journal Articles' },
    { value: 'scholarship', label: 'Scholarships' },
    { value: 'legal', label: 'Legal Commentary' }
  ];

  const exportCSV = () => {
    // In real implementation, this would generate and download CSV
    console.log('Exporting CSV...');
  };

  const handleChartClick = (data: ChartData) => {
    console.log('Chart clicked:', data);
  };

  const formatChartData = (data: AnalyticsData) => {
    return data.monthlyStats.map(item => ({
      ...item,
      color: item.color || '#0ea5e9'
    }));
  };

  return (
    <div className="flex space-x-6">
      {/* Left Navigation/Filter Pane */}
      <div className="w-64 bg-white border rounded-lg p-4 h-fit">
        <h3 className="font-semibold mb-4">Filters</h3>
        
        {/* Timeframe Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Timeframe</label>
          <div className="space-y-2">
            {timeframes.map((tf) => (
              <button
                key={tf.value}
                onClick={() => setSelectedTimeframe(tf.value)}
                className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
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
          <label className="block text-sm font-medium mb-2">Content Type</label>
          <div className="space-y-2">
            {contentTypes.map((ct) => (
              <button
                key={ct.value}
                onClick={() => setSelectedContentType(ct.value)}
                className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
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
          <h2 className="text-xl font-bold">Analytics Dashboard</h2>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">
              {data?.totalDownloads || 0}
            </div>
            <div className="text-sm text-gray-600">Journal Downloads</div>
          </div>
          <div className="bg-white border rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">
              {data?.totalViews || 0}
            </div>
            <div className="text-sm text-gray-600">Page Views</div>
          </div>
          <div className="bg-white border rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600">
              {data?.totalArticles || 0}
            </div>
            <div className="text-sm text-gray-600">Applications</div>
          </div>
          <div className="bg-white border rounded-lg p-4">
            <div className="text-2xl font-bold text-orange-600">
              {data?.totalViews || 0}
            </div>
            <div className="text-sm text-gray-600">Commentary Views</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Journal Downloads Chart */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-semibold mb-4">Journal PDF Downloads</h3>
            {data?.monthlyStats && data.monthlyStats.length > 0 ? (
              <div className="space-y-2">
                {data.monthlyStats.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-20 text-sm text-gray-600">{item.name}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${Math.min(100, (item.value / Math.max(...data.monthlyStats.map(d => d.value))) * 100)}%` }}
                      ></div>
                    </div>
                    <div className="w-12 text-sm text-right">{item.value}</div>
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
            {data?.categoryStats && data.categoryStats.length > 0 ? (
              <div className="space-y-3">
                {data.categoryStats.slice(0, 5).map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="text-sm truncate flex-1">{item.name}</div>
                    <div className="text-sm font-medium text-gray-600">{item.value}</div>
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
            {data?.categoryStats && data.categoryStats.length > 0 ? (
              <div className="space-y-3">
                {data.categoryStats.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="text-sm">{item.name}</div>
                    <div className="text-sm font-medium text-gray-600">{item.value}</div>
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
            {data?.categoryStats && data.categoryStats.length > 0 ? (
              <div className="space-y-3">
                {data.categoryStats.slice(0, 5).map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="text-sm truncate flex-1">{item.name}</div>
                    <div className="text-sm font-medium text-gray-600">{item.value}</div>
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