// KPI Tracking Dashboard

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  Download, 
  Star, 
  Clock, 
  FileText,
  Users,
  Calendar,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { articleService } from '@/lib/articles/ArticleService';
import { Article, ArticleKPI } from '@/lib/articles/types';

interface KPIData {
  totalArticles: number;
  publishedArticles: number;
  totalViews: number;
  totalDownloads: number;
  averageScore: number;
  totalCitations: number;
  socialShares: number;
  responseTime: number;
  collaborationScore: number;
}

interface TrendData {
  period: string;
  views: number;
  downloads: number;
  articles: number;
}

const KPIDashboard: React.FC = () => {
  const { user, isProfessor, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [kpiData, setKpiData] = useState<KPIData | null>(null);
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  useEffect(() => {
    if (!isProfessor() && !isAdmin()) {
      navigate('/');
      return;
    }

    loadKPIData();
  }, [isProfessor, isAdmin, navigate, timeRange]);

  const loadKPIData = async () => {
    try {
      setLoading(true);
      const allArticles = await articleService.getArticles();
      setArticles(allArticles);

      // Calculate KPI data
      const totalArticles = allArticles.length;
      const publishedArticles = allArticles.filter(a => a.status === 'published').length;
      const totalViews = allArticles.reduce((sum, a) => sum + a.kpis.views, 0);
      const totalDownloads = allArticles.reduce((sum, a) => sum + a.kpis.downloads, 0);
      const totalCitations = allArticles.reduce((sum, a) => sum + a.kpis.citations, 0);
      const socialShares = allArticles.reduce((sum, a) => sum + a.kpis.socialShares, 0);
      
      const scores = allArticles.filter(a => a.kpis.reviewScore > 0).map(a => a.kpis.reviewScore);
      const averageScore = scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;
      
      const responseTimes = allArticles.map(a => a.kpis.publicationTime).filter(time => time > 0);
      const responseTime = responseTimes.length > 0 ? responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length : 0;

      setKpiData({
        totalArticles,
        publishedArticles,
        totalViews,
        totalDownloads,
        averageScore: Math.round(averageScore * 10) / 10,
        totalCitations,
        socialShares,
        responseTime: Math.round(responseTime),
        collaborationScore: 85 // Mock data
      });

      // Generate trend data (mock)
      generateTrendData();
    } catch (error) {
      console.error('❌ Error loading KPI data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateTrendData = () => {
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : timeRange === '90d' ? 90 : 365;
    const data: TrendData[] = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      data.push({
        period: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        views: Math.floor(Math.random() * 100) + 50,
        downloads: Math.floor(Math.random() * 20) + 10,
        articles: Math.floor(Math.random() * 3)
      });
    }
    
    setTrendData(data);
  };

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (current < previous) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Activity className="h-4 w-4 text-gray-500" />;
  };

  const getTrendPercentage = (current: number, previous: number) => {
    if (previous === 0) return '+100%';
    const change = ((current - previous) / previous) * 100;
    return `${change >= 0 ? '+' : ''}${Math.round(change)}%`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-newtifi-teal mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading KPI dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/professor')}
                className="mr-4 p-2 text-gray-400 hover:text-gray-600"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Performance Dashboard</h1>
                <p className="text-gray-600">Track your academic performance and impact</p>
              </div>
            </div>
            
            {/* Time Range Selector */}
            <div className="flex space-x-2">
              {[
                { value: '7d', label: '7 Days' },
                { value: '30d', label: '30 Days' },
                { value: '90d', label: '90 Days' },
                { value: '1y', label: '1 Year' }
              ].map((range) => (
                <button
                  key={range.value}
                  onClick={() => setTimeRange(range.value as any)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    timeRange === range.value
                      ? 'bg-newtifi-teal text-white'
                      : 'text-gray-700 bg-white hover:bg-gray-50'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Articles</p>
                <p className="text-2xl font-bold text-gray-900">{kpiData?.totalArticles || 0}</p>
                <div className="flex items-center mt-1">
                  {getTrendIcon(kpiData?.totalArticles || 0, (kpiData?.totalArticles || 0) - 1)}
                  <span className="text-sm text-gray-500 ml-1">
                    {getTrendPercentage(kpiData?.totalArticles || 0, (kpiData?.totalArticles || 0) - 1)}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{kpiData?.totalViews || 0}</p>
                <div className="flex items-center mt-1">
                  {getTrendIcon(kpiData?.totalViews || 0, (kpiData?.totalViews || 0) - 50)}
                  <span className="text-sm text-gray-500 ml-1">
                    {getTrendPercentage(kpiData?.totalViews || 0, (kpiData?.totalViews || 0) - 50)}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Downloads</p>
                <p className="text-2xl font-bold text-gray-900">{kpiData?.totalDownloads || 0}</p>
                <div className="flex items-center mt-1">
                  {getTrendIcon(kpiData?.totalDownloads || 0, (kpiData?.totalDownloads || 0) - 10)}
                  <span className="text-sm text-gray-500 ml-1">
                    {getTrendPercentage(kpiData?.totalDownloads || 0, (kpiData?.totalDownloads || 0) - 10)}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Download className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-gray-900">{kpiData?.averageScore || 0}</p>
                <div className="flex items-center mt-1">
                  {getTrendIcon(kpiData?.averageScore || 0, (kpiData?.averageScore || 0) - 0.5)}
                  <span className="text-sm text-gray-500 ml-1">
                    {getTrendPercentage(kpiData?.averageScore || 0, (kpiData?.averageScore || 0) - 0.5)}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Views Trend Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Views Over Time</h3>
            <div className="h-64 flex items-end space-x-2">
              {trendData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="bg-newtifi-teal rounded-t w-full transition-all duration-300 hover:bg-newtifi-teal-dark"
                    style={{ height: `${(data.views / 150) * 200}px` }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">{data.period}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Downloads Trend Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Downloads Over Time</h3>
            <div className="h-64 flex items-end space-x-2">
              {trendData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="bg-purple-500 rounded-t w-full transition-all duration-300 hover:bg-purple-600"
                    style={{ height: `${(data.downloads / 30) * 200}px` }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">{data.period}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Citations</p>
                <p className="text-2xl font-bold text-gray-900">{kpiData?.totalCitations || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-pink-100 rounded-lg">
                <Users className="h-6 w-6 text-pink-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Social Shares</p>
                <p className="text-2xl font-bold text-gray-900">{kpiData?.socialShares || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Response Time</p>
                <p className="text-2xl font-bold text-gray-900">{kpiData?.responseTime || 0}d</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performing Articles */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Top Performing Articles</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Article
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Downloads
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Citations
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {articles
                  .sort((a, b) => b.kpis.views - a.kpis.views)
                  .slice(0, 10)
                  .map((article) => (
                    <tr key={article.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{article.title}</div>
                        <div className="text-sm text-gray-500">{article.journal}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {article.kpis.views}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {article.kpis.downloads}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {article.kpis.reviewScore > 0 ? article.kpis.reviewScore.toFixed(1) : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {article.kpis.citations}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPIDashboard;
