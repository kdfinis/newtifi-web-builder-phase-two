// Professor Dashboard Component

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Eye, 
  Star, 
  Clock, 
  Upload, 
  CheckCircle, 
  Folder, 
  BarChart,
  Plus,
  Edit,
  Trash2,
  Download,
  Users,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { articleService } from '@/lib/articles/ArticleService';
import { Article, ArticleStatus } from '@/lib/articles/types';

const ProfessorDashboard: React.FC = () => {
  const { user, isProfessor } = useAuth();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalArticles: 0,
    publishedArticles: 0,
    underReview: 0,
    totalViews: 0,
    totalDownloads: 0,
    averageScore: 0
  });

  useEffect(() => {
    if (!isProfessor()) {
      navigate('/');
      return;
    }

    loadDashboardData();
  }, [isProfessor, navigate]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const userArticles = await articleService.getArticles();
      setArticles(userArticles);

      // Calculate stats
      const totalArticles = userArticles.length;
      const publishedArticles = userArticles.filter(a => a.status === ArticleStatus.PUBLISHED).length;
      const underReview = userArticles.filter(a => a.status === ArticleStatus.UNDER_REVIEW).length;
      const totalViews = userArticles.reduce((sum, a) => sum + a.kpis.views, 0);
      const totalDownloads = userArticles.reduce((sum, a) => sum + a.kpis.downloads, 0);
      const averageScore = userArticles.length > 0 
        ? userArticles.reduce((sum, a) => sum + a.kpis.reviewScore, 0) / userArticles.length 
        : 0;

      setStats({
        totalArticles,
        publishedArticles,
        underReview,
        totalViews,
        totalDownloads,
        averageScore: Math.round(averageScore * 10) / 10
      });
    } catch (error) {
      console.error('❌ Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateArticle = () => {
    navigate('/articles/submit');
  };

  const handleEditArticle = (articleId: string) => {
    navigate(`/articles/edit/${articleId}`);
  };

  const handleDeleteArticle = async (articleId: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await articleService.deleteArticle(articleId);
        await loadDashboardData();
      } catch (error) {
        console.error('❌ Error deleting article:', error);
      }
    }
  };

  const handleSubmitArticle = async (articleId: string) => {
    try {
      await articleService.submitArticle(articleId);
      await loadDashboardData();
    } catch (error) {
      console.error('❌ Error submitting article:', error);
    }
  };

  const getStatusColor = (status: ArticleStatus) => {
    switch (status) {
      case ArticleStatus.PUBLISHED:
        return 'bg-green-100 text-green-800';
      case ArticleStatus.UNDER_REVIEW:
        return 'bg-yellow-100 text-yellow-800';
      case ArticleStatus.DRAFT:
        return 'bg-gray-100 text-gray-800';
      case ArticleStatus.ACCEPTED:
        return 'bg-blue-100 text-blue-800';
      case ArticleStatus.REJECTED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-newtifi-teal mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Professor Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <img 
                src={user?.profile.avatar || '/placeholder-avatar.png'} 
                alt={user?.name}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="font-medium text-gray-900">{user?.name}</p>
                <p className="text-sm text-gray-500">Professor</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Articles</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalArticles}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-gray-900">{stats.publishedArticles}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Eye className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Under Review</p>
                <p className="text-2xl font-bold text-gray-900">{stats.underReview}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalViews}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={handleCreateArticle}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Plus className="h-6 w-6 text-newtifi-teal mr-3" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Submit Article</p>
                  <p className="text-sm text-gray-500">Create new research</p>
                </div>
              </button>

              <button
                onClick={() => navigate('/reviews')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <CheckCircle className="h-6 w-6 text-newtifi-teal mr-3" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Review Articles</p>
                  <p className="text-sm text-gray-500">Pending reviews</p>
                </div>
              </button>

              <button
                onClick={() => navigate('/documents')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Folder className="h-6 w-6 text-newtifi-teal mr-3" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Documents</p>
                  <p className="text-sm text-gray-500">Manage files</p>
                </div>
              </button>

              <button
                onClick={() => navigate('/analytics')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <BarChart className="h-6 w-6 text-newtifi-teal mr-3" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Analytics</p>
                  <p className="text-sm text-gray-500">View metrics</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Articles */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">My Articles</h2>
            <button
              onClick={handleCreateArticle}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-newtifi-teal hover:bg-newtifi-teal-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-newtifi-teal"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Article
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {articles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{article.title}</div>
                      <div className="text-sm text-gray-500">{article.journal}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(article.status)}`}>
                        {article.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {article.kpis.views}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {article.kpis.reviewScore > 0 ? article.kpis.reviewScore.toFixed(1) : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(article.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEditArticle(article.id)}
                        className="text-newtifi-teal hover:text-newtifi-teal-dark"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      {article.status === ArticleStatus.DRAFT && (
                        <button
                          onClick={() => handleSubmitArticle(article.id)}
                          className="text-green-600 hover:text-green-700"
                          title="Submit for review"
                        >
                          <Upload className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteArticle(article.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
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

export default ProfessorDashboard;
