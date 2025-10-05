// Simple Professor Dashboard for Testing

import React from 'react';
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
  Plus
} from 'lucide-react';

const SimpleProfessorDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateArticle = () => {
    alert('Article creation would open here');
  };

  const handleViewAnalytics = () => {
    alert('Analytics would open here');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Professor Dashboard</h1>
              <p className="text-gray-600">Welcome to your academic dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <img 
                src="/placeholder-avatar.png" 
                alt="Professor"
                className="h-10 w-10 rounded-full bg-gray-300"
              />
              <div>
                <p className="font-medium text-gray-900">Professor Name</p>
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
                <p className="text-2xl font-bold text-gray-900">12</p>
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
                <p className="text-2xl font-bold text-gray-900">8</p>
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
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">1,250</p>
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
                <Plus className="h-6 w-6 text-teal-600 mr-3" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Submit Article</p>
                  <p className="text-sm text-gray-500">Create new research</p>
                </div>
              </button>

              <button
                onClick={() => alert('Reviews would open here')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <CheckCircle className="h-6 w-6 text-teal-600 mr-3" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Review Articles</p>
                  <p className="text-sm text-gray-500">Pending reviews</p>
                </div>
              </button>

              <button
                onClick={() => alert('Documents would open here')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Folder className="h-6 w-6 text-teal-600 mr-3" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Documents</p>
                  <p className="text-sm text-gray-500">Manage files</p>
                </div>
              </button>

              <button
                onClick={handleViewAnalytics}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <BarChart className="h-6 w-6 text-teal-600 mr-3" />
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
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Article
            </button>
          </div>
          <div className="p-6">
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No articles yet</h3>
              <p className="text-gray-500 mb-4">Get started by creating your first article</p>
              <button
                onClick={handleCreateArticle}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Article
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleProfessorDashboard;
