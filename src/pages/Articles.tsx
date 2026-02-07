import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { buildApiUrl } from '@/lib/urls';
import { Calendar, User, Eye, Download, MessageSquare, Star, Filter, Search } from 'lucide-react';

interface ApiArticle {
  id: string;
  title: string;
  author: string;
  date: string;
  doi: string;
  keywords: string[];
  abstract: string;
  status: string;
  views: number;
  downloads: number;
  featured: boolean;
  category: string;
  journal?: string;
}

export default function Articles() {
  const [articles, setArticles] = useState<ApiArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<ApiArticle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);

  // Helper to convert article ID to slug
  const idToSlug = (id: string): string => {
    const slugMap: Record<string, string> = {
      'IMJ-2025-001': 'eltifs-compulsory-redemptions',
      'IMJ-2025-002': 'bafin-portfolio-control',
      'IMJ-2025-003': 'luxembourg-well-informed-investor'
    };
    return slugMap[id] || id.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  };

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const response = await fetch(buildApiUrl('/articles'), {
          method: 'GET',
          credentials: 'include'
        });
        
        if (!response.ok) {
          throw new Error('Failed to load articles');
        }
        
        const allArticles: ApiArticle[] = await response.json();
        // Only show published articles to the public
        const publishedArticles = allArticles.filter(article => article.status === 'published');
        setArticles(publishedArticles);
        setFilteredArticles(publishedArticles);
      } catch (error) {
        console.error('Error loading articles:', error);
        // Error loading articles - show empty state with helpful message
        setArticles([]);
        setFilteredArticles([]);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  useEffect(() => {
    let filtered = articles;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (selectedStatus !== 'ALL') {
      filtered = filtered.filter(article => article.status === selectedStatus);
    }

    setFilteredArticles(filtered);
  }, [articles, searchTerm, selectedStatus]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'under_review':
      case 'under-review':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-newtifi-teal mx-auto mb-4"></div>
          <p className="text-gray-600">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Research Articles
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Explore the latest research and insights from the NewTIFI community
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles, authors, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-newtifi-teal focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as ArticleStatus | 'ALL')}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-newtifi-teal focus:border-transparent bg-white text-gray-900"
              >
                <option value="ALL">All Articles</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MessageSquare className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-light text-gray-600 mb-2">No articles found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'No articles are currently available'}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-newtifi-teal hover:text-newtifi-navy font-medium transition-colors"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300">
                {/* Article Image/Thumbnail */}
                <div className="h-48 bg-gradient-to-br from-newtifi-teal to-newtifi-navy flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-4xl font-bold mb-2">
                      {article.title.charAt(0)}
                    </div>
                    <div className="text-sm opacity-90">
                      {article.journal?.toUpperCase() || article.category.toUpperCase()}
                    </div>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-4 sm:p-6">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(article.status)}`}>
                      {article.status.replace('_', ' ').replace('-', ' ')}
                    </span>
                    {article.featured && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" />
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {article.title}
                  </h3>

                  {/* Abstract */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.abstract}
                  </p>

                  {/* Authors */}
                  <div className="mb-4">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <User className="w-4 h-4 mr-1" />
                      Author
                    </div>
                    <div className="text-sm text-gray-700">
                      {article.author}
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(article.date)}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {article.views}
                      </div>
                      <div className="flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        {article.downloads}
                      </div>
                    </div>
                  </div>

                  {/* Keywords */}
                  {article.keywords && article.keywords.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {article.keywords.slice(0, 3).map((keyword, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            {keyword}
                          </span>
                        ))}
                        {article.keywords.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{article.keywords.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <Link
                    to={`/publishing/article/${idToSlug(article.id)}`}
                    className="block w-full text-center py-2.5 px-5 bg-newtifi-teal text-white rounded-full text-xs uppercase tracking-[0.2em] hover:bg-newtifi-teal/90 transition-all duration-200 font-light"
                  >
                    Read Article
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results Summary */}
        {filteredArticles.length > 0 && (
          <div className="mt-8 text-center text-gray-600">
            Showing {filteredArticles.length} of {articles.length} articles
          </div>
        )}
      </div>
    </div>
  );
}
