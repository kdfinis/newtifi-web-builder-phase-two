// Member Dashboard for Article Browsing

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Eye, 
  Download, 
  Star, 
  Tag,
  BookOpen,
  TrendingUp,
  Clock
} from 'lucide-react';
import { UrlFactory } from '@/lib/urls/UrlFactory';
import { useSimpleAuth } from '@/hooks/useSimpleAuth';
import { unlinkProvider } from '@/lib/auth';
// import { toast } from 'sonner';
import { articleService } from '@/lib/articles/ArticleService';
import { Article, ArticleFilters, ArticleSearchParams } from '@/lib/articles/types';

const MemberDashboard: React.FC = () => {
  const { user, isMember, isContributor } = useSimpleAuth();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<ArticleFilters>({});
  const [sortBy, setSortBy] = useState<'title' | 'createdAt' | 'publishedAt' | 'views'>('publishedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!isMember && !isContributor) {
      navigate('/');
      return;
    }

    loadArticles();
  }, [isMember, isContributor, navigate]);

  useEffect(() => {
    applyFilters();
  }, [articles, searchQuery, filters, sortBy, sortOrder]);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const allArticles = await articleService.getArticles();
      // Only show published articles to members
      const publishedArticles = allArticles.filter(article => article.status === 'published');
      setArticles(publishedArticles);
    } catch (error) {
      console.error('❌ Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...articles];

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.abstract.toLowerCase().includes(query) ||
        article.authors.some(author => author.name.toLowerCase().includes(query)) ||
        article.metadata.keywords.some(keyword => keyword.toLowerCase().includes(query))
      );
    }

    // Apply filters
    if (filters.type && filters.type.length > 0) {
      filtered = filtered.filter(article => filters.type!.includes(article.type));
    }

    if (filters.journal && filters.journal.length > 0) {
      filtered = filtered.filter(article => filters.journal!.includes(article.journal));
    }

    if (filters.author) {
      filtered = filtered.filter(article =>
        article.authors.some(author =>
          author.name.toLowerCase().includes(filters.author!.toLowerCase())
        )
      );
    }

    if (filters.dateRange) {
      filtered = filtered.filter(article =>
        article.publishedAt &&
        article.publishedAt >= filters.dateRange!.start &&
        article.publishedAt <= filters.dateRange!.end
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: string | number | Date;
      let bValue: string | number | Date;

      switch (sortBy) {
        case 'title':
          aValue = a.title;
          bValue = b.title;
          break;
        case 'createdAt':
          aValue = a.createdAt;
          bValue = b.createdAt;
          break;
        case 'publishedAt':
          aValue = a.publishedAt || new Date(0);
          bValue = b.publishedAt || new Date(0);
          break;
        case 'views':
          aValue = a.kpis.views;
          bValue = b.kpis.views;
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        if (aValue instanceof Date && bValue instanceof Date) {
          return aValue.getTime() - bValue.getTime();
        }
        return aValue > bValue ? 1 : -1;
      } else {
        if (aValue instanceof Date && bValue instanceof Date) {
          return bValue.getTime() - aValue.getTime();
        }
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredArticles(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filterType: keyof ArticleFilters, value: string | string[] | Date | undefined) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchQuery('');
  };

  const getJournalName = (journalId: string) => {
    const journals: { [key: string]: string } = {
      'investment-management': 'Investment Management Journal',
      'fintech-innovation': 'FinTech Innovation Journal'
    };
    return journals[journalId] || journalId;
  };

  const getTypeName = (type: string) => {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-newtifi-teal mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading articles...</p>
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
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Research Articles</h1>
              <p className="text-gray-600">Explore the latest research and insights</p>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href={UrlFactory.getPrjAssistantUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium text-newtifi-navy border border-gray-300 hover:bg-gray-50"
              >
                Open PRJ Assistant
              </a>
              <img 
                src={user?.avatarUrl || '/placeholder-avatar.png'} 
                alt={user?.name}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="font-medium text-gray-900">{user?.name}</p>
                <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Search */}
              <div className="flex-1 max-w-lg">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-newtifi-teal focus:border-newtifi-teal"
                    placeholder="Search articles, authors, keywords..."
                  />
                </div>
              </div>

              {/* Sort and Filter Controls */}
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-newtifi-teal focus:border-newtifi-teal"
                >
                  <option value="publishedAt">Sort by Date</option>
                  <option value="title">Sort by Title</option>
                  <option value="views">Sort by Views</option>
                </select>

                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-newtifi-teal focus:border-newtifi-teal"
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Article Type
                    </label>
                    <select
                      multiple
                      value={filters.type || []}
                      onChange={(e) => {
                        const values = Array.from(e.target.selectedOptions, option => option.value);
                        handleFilterChange('type', values);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-newtifi-teal focus:border-newtifi-teal"
                    >
                      <option value="research">Research Article</option>
                      <option value="review">Review Article</option>
                      <option value="case_study">Case Study</option>
                      <option value="commentary">Commentary</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Journal
                    </label>
                    <select
                      multiple
                      value={filters.journal || []}
                      onChange={(e) => {
                        const values = Array.from(e.target.selectedOptions, option => option.value);
                        handleFilterChange('journal', values);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-newtifi-teal focus:border-newtifi-teal"
                    >
                      <option value="investment-management">Investment Management Journal</option>
                      <option value="fintech-innovation">FinTech Innovation Journal</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Author
                    </label>
                    <input
                      type="text"
                      value={filters.author || ''}
                      onChange={(e) => handleFilterChange('author', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-newtifi-teal focus:border-newtifi-teal"
                      placeholder="Search by author name"
                    />
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Showing {filteredArticles.length} of {articles.length} articles
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <User className="h-4 w-4 mr-1" />
                      <span>{article.authors.map(a => a.name).join(', ')}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <BookOpen className="h-4 w-4 mr-1" />
                      <span>{getJournalName(article.journal)}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(article.publishedAt || article.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {article.abstract}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {getTypeName(article.type)}
                  </span>
                  {article.metadata.keywords.slice(0, 3).map((keyword, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      <Tag className="h-3 w-3 mr-1" />
                      {keyword}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      <span>{article.kpis.views}</span>
                    </div>
                    <div className="flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      <span>{article.kpis.downloads}</span>
                    </div>
                    {article.kpis.reviewScore > 0 && (
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        <span>{article.kpis.reviewScore.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/publishing/articles/${article.id}`)}
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-newtifi-teal hover:bg-newtifi-teal-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-newtifi-teal"
                >
                  Read Article
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Connected Accounts Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-newtifi-navy mb-6">Connected Accounts</h2>
          
          <div className="space-y-4">
            {/* Google Account */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#EA4335" d="M12 10.2v3.6h5.1c-.2 1.2-1.5 3.6-5.1 3.6-3.1 0-5.7-2.6-5.7-5.7S8.9 6 12 6c1.8 0 3 .8 3.7 1.5l2.5-2.5C16.8 3.8 14.7 3 12 3 6.9 3 2.7 7.2 2.7 12.3S6.9 21.6 12 21.6c6.9 0 9.3-4.8 9.3-7.2 0-.5 0-1-.1-1.2H12z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-newtifi-navy">Google Account</p>
                  <p className="text-sm text-gray-500">
                    {user?.hasGoogleAuth ? 'Connected' : 'Not connected'}
                  </p>
                </div>
              </div>
              {user?.hasGoogleAuth ? (
                <button
                  onClick={async () => {
                    if (confirm('Are you sure you want to disconnect your Google account?')) {
                      try {
                        await unlinkProvider('google');
                        window.location.reload();
                      } catch (err) {
                        alert('Failed to disconnect Google account. Please try again.');
                      }
                    }
                  }}
                  className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                >
                  Disconnect
                </button>
              ) : (
                <a
                  href="/auth/google"
                  className="px-4 py-2 text-sm text-newtifi-navy hover:bg-gray-50 rounded-lg border border-gray-200"
                >
                  Connect
                </a>
              )}
            </div>

            {/* LinkedIn Account */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.036-1.85-3.036-1.853 0-2.136 1.446-2.136 2.941v5.664H9.354V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.368-1.85 3.602 0 4.268 2.37 4.268 5.455v6.286zM5.337 7.433a2.062 2.062 0 11.001-4.124 2.062 2.062 0 01-.001 4.124zM7.114 20.452H3.56V9h3.554v11.452z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-newtifi-navy">LinkedIn Account</p>
                  <p className="text-sm text-gray-500">
                    {user?.hasLinkedInAuth ? 'Connected' : 'Not connected'}
                  </p>
                </div>
              </div>
              {user?.hasLinkedInAuth ? (
                <button
                  onClick={async () => {
                    if (confirm('Are you sure you want to disconnect your LinkedIn account?')) {
                      try {
                        await unlinkProvider('linkedin');
                        window.location.reload();
                      } catch (err) {
                        alert('Failed to disconnect LinkedIn account. Please try again.');
                      }
                    }
                  }}
                  className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                >
                  Disconnect
                </button>
              ) : (
                <a
                  href="/auth/linkedin"
                  className="px-4 py-2 text-sm text-newtifi-navy hover:bg-gray-50 rounded-lg border border-gray-200"
                >
                  Connect
                </a>
              )}
            </div>

            {/* Password Authentication */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-newtifi-navy">Password</p>
                  <p className="text-sm text-gray-500">
                    {user?.hasPasswordAuth ? 'Set' : 'Not set'}
                  </p>
                </div>
              </div>
              <a
                href="/forgot-password"
                className="px-4 py-2 text-sm text-newtifi-navy hover:bg-gray-50 rounded-lg border border-gray-200"
              >
                {user?.hasPasswordAuth ? 'Change' : 'Set Password'}
              </a>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Tip:</strong> Connect multiple accounts for easier sign-in options. You can disconnect any account as long as you have at least one authentication method remaining.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MemberDashboard;
