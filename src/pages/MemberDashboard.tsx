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
import { useAuth } from '@/hooks/useAuth';
import { articleService } from '@/lib/articles/ArticleService';
import { Article, ArticleFilters, ArticleSearchParams } from '@/lib/articles/types';

const MemberDashboard: React.FC = () => {
  const { user, isMember, isAuthor, isProfessor } = useAuth();
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
    if (!isMember() && !isAuthor() && !isProfessor()) {
      navigate('/');
      return;
    }

    loadArticles();
  }, [isMember, isAuthor, isProfessor, navigate]);

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
      let aValue: any, bValue: any;

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
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredArticles(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filterType: keyof ArticleFilters, value: any) => {
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
              <img 
                src={user?.profile.avatar || '/placeholder-avatar.png'} 
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
    </div>
  );
};

export default MemberDashboard;
