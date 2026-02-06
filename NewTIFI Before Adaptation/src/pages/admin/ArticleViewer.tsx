/**
 * Admin Article Viewer - Comprehensive view of all articles with all properties
 * Only accessible to admin users
 */

import { useState, useEffect, useCallback } from 'react';
import { useSimpleAuth } from '@/hooks/useSimpleAuth';
import { buildApiUrl } from '@/lib/urls';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  User,
  Calendar,
  Tag,
  File,
  Database,
  Settings,
  RefreshCw
} from 'lucide-react';

interface Article {
  id: string;
  title: string;
  author?: string;
  authors?: Array<{ name: string; order: number; corresponding?: boolean }>;
  status: string;
  publishedDate?: string;
  date?: string;
  journalId?: string;
  journal?: string;
  pdfUrl?: string;
  url?: string;
  filename?: string;
  abstract?: string;
  keywords?: string[];
  doi?: string;
  views?: number;
  downloads?: number;
  featured?: boolean;
  category?: string;
  fileSize?: string;
  lastModified?: string;
  subjectAreas?: string[];
  peerReviewed?: boolean;
  license?: string;
  version?: string;
  currentVersion?: string;
  affiliation?: string;
  requiresLogin?: boolean;
}

export default function ArticleViewer() {
  const { user } = useSimpleAuth();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Check if user is admin
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Check if user is admin (email check or role check)
    const isAdmin = user.email === 'karlodefinis@gmail.com' || user.role === 'ADMIN' || user.role === 'admin';
    if (!isAdmin) {
      setError('Access denied. Admin privileges required.');
      setLoading(false);
      navigate('/dashboard');
      return;
    }
  }, [user, navigate]);

  // Fetch articles function
  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(buildApiUrl('/admin/articles'), { credentials: 'include' });
      if (!response.ok) {
        if (response.status === 403) throw new Error('Access denied. Admin privileges required.');
        if (response.status === 401) throw new Error('Please log in to continue.');
        throw new Error('Failed to load articles');
      }
      const data = await response.json();
      setArticles(Array.isArray(data) ? data : []);
      setFilteredArticles(Array.isArray(data) ? data : []);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load articles');
      setArticles([]);
      setFilteredArticles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load articles
  useEffect(() => {
    if (user) {
      fetchArticles();
    }
  }, [user, fetchArticles]);

  // Filter articles - comprehensive search across all properties
  useEffect(() => {
    let filtered = [...articles];

    // Comprehensive search filter - searches across all text properties
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(article => {
        // Search in all text fields
        const searchableText = [
          article.id,
          article.title,
          article.author,
          article.abstract,
          article.doi,
          article.journal,
          article.journalId,
          article.filename,
          article.category,
          article.affiliation,
          article.license,
          article.version,
          article.currentVersion,
          article.status,
          // Array fields
          ...(article.keywords || []),
          ...(article.subjectAreas || []),
          // Authors array
          ...(article.authors?.map(a => a.name) || []),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        
        return searchableText.includes(query);
      });
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(article => article.status === statusFilter);
    }

    setFilteredArticles(filtered);
  }, [searchQuery, statusFilter, articles]);

  const handleRefresh = () => {
    fetchArticles();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'review':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const viewArticleDetails = (article: Article) => {
    setSelectedArticle(article);
    setShowDetails(true);
  };

  const stats = {
    total: articles.length,
    published: articles.filter(a => a.status === 'published').length,
    draft: articles.filter(a => a.status === 'draft').length,
    pending: articles.filter(a => a.status === 'pending' || a.status === 'review').length,
  };

  if (!user || (user.email !== 'karlodefinis@gmail.com' && user.role !== 'ADMIN' && user.role !== 'admin')) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">Admin privileges required to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-newtifi-navy flex items-center gap-3">
                <Database className="h-8 w-8" />
                Admin Article Viewer
              </h1>
              <p className="text-gray-600 mt-1">Complete database view of all articles and their properties</p>
            </div>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-newtifi-teal text-white rounded-lg hover:bg-newtifi-navy transition-all flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Articles</p>
                <p className="text-3xl font-bold text-newtifi-navy mt-1">{stats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-newtifi-navy opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Published</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{stats.published}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Drafts</p>
                <p className="text-3xl font-bold text-gray-600 mt-1">{stats.draft}</p>
              </div>
              <Clock className="h-8 w-8 text-gray-600 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600 opacity-50" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search across all properties: title, ID, author, abstract, keywords, DOI, journal, filename, category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-newtifi-teal focus:border-transparent appearance-none"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
                <option value="review">Review</option>
              </select>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Showing {filteredArticles.length} of {articles.length} articles
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-newtifi-navy mx-auto mb-4"></div>
            <p className="text-gray-600">Loading articles...</p>
          </div>
        )}

        {/* Articles Browser - Scrollable Grid/List View */}
        {!loading && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Scrollable Container */}
            <div className="overflow-y-auto max-h-[calc(100vh-400px)]">
              {filteredArticles.length === 0 ? (
                <div className="px-6 py-12 text-center text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg">No articles found</p>
                  <p className="text-sm mt-2">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {filteredArticles.map((article) => (
                    <div
                      key={article.id}
                      className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => viewArticleDetails(article)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        {/* Main Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-3 mb-2">
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded text-newtifi-navy flex-shrink-0">
                              {article.id}
                            </code>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(article.status)} flex-shrink-0`}>
                              {article.status || 'unknown'}
                            </span>
                            {article.featured && (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200 flex-shrink-0">
                                Featured
                              </span>
                            )}
                          </div>
                          
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-newtifi-teal transition-colors">
                            {article.title || 'Untitled'}
                          </h3>
                          
                          {article.abstract && (
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                              {article.abstract}
                            </p>
                          )}
                          
                          {/* Property Grid */}
                          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 text-xs">
                            <div className="flex items-center gap-1 text-gray-600">
                              <User className="h-3 w-3" />
                              <span className="truncate">
                                {article.authors?.[0]?.name || article.author || 'Unknown'}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-600">
                              <Calendar className="h-3 w-3" />
                              <span>{article.publishedDate || article.date || 'N/A'}</span>
                            </div>
                            <div className="text-gray-600 truncate">
                              <span className="font-medium">Journal:</span> {article.journalId || article.journal || 'N/A'}
                            </div>
                            {article.doi && (
                              <div className="text-gray-600 truncate">
                                <span className="font-medium">DOI:</span> {article.doi}
                              </div>
                            )}
                            {article.keywords && article.keywords.length > 0 && (
                              <div className="flex items-center gap-1 text-gray-600">
                                <Tag className="h-3 w-3" />
                                <span className="truncate">{article.keywords.slice(0, 2).join(', ')}</span>
                              </div>
                            )}
                            <div className="text-gray-600">
                              <span className="font-medium">Views:</span> {article.views || 0} | <span className="font-medium">Downloads:</span> {article.downloads || 0}
                            </div>
                          </div>
                          
                          {/* Additional Properties Row */}
                          {(article.category || article.fileSize || article.version || article.peerReviewed !== undefined) && (
                            <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
                              {article.category && (
                                <span className="px-2 py-0.5 bg-gray-100 rounded">Category: {article.category}</span>
                              )}
                              {article.fileSize && (
                                <span className="px-2 py-0.5 bg-gray-100 rounded">Size: {article.fileSize}</span>
                              )}
                              {article.version && (
                                <span className="px-2 py-0.5 bg-gray-100 rounded">v{article.version}</span>
                              )}
                              {article.peerReviewed && (
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded">Peer Reviewed</span>
                              )}
                              {article.license && (
                                <span className="px-2 py-0.5 bg-gray-100 rounded">License: {article.license}</span>
                              )}
                            </div>
                          )}
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center gap-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => viewArticleDetails(article)}
                            className="px-3 py-2 bg-newtifi-teal text-white rounded-lg hover:bg-newtifi-navy transition-all flex items-center gap-1 text-sm"
                            title="View all properties"
                          >
                            <Eye className="h-4 w-4" />
                            Details
                          </button>
                          {article.pdfUrl && (
                            <a
                              href={buildApiUrl(article.pdfUrl)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all flex items-center gap-1 text-sm"
                              title="Download PDF"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Download className="h-4 w-4" />
                              PDF
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Article Details Modal - Fully Scrollable */}
      {showDetails && selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[95vh] flex flex-col">
            {/* Sticky Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h2 className="text-2xl font-bold text-newtifi-navy">Article Details</h2>
                <p className="text-sm text-gray-600 mt-1">{selectedArticle.id}</p>
              </div>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                title="Close"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1 p-6">
              <ArticleDetailsView article={selectedArticle} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ArticleDetailsView({ article }: { article: Article }) {
  const sections = [
    {
      title: 'Basic Information',
      icon: FileText,
      fields: [
        { label: 'ID', value: article.id, code: true },
        { label: 'Title', value: article.title, multiline: true },
        { label: 'Status', value: article.status },
        { label: 'Category', value: article.category || 'N/A' },
      ]
    },
    {
      title: 'Publication Data',
      icon: Calendar,
      fields: [
        { label: 'Published Date', value: article.publishedDate || article.date || 'N/A' },
        { label: 'Last Modified', value: article.lastModified || 'N/A' },
        { label: 'Journal', value: article.journal || article.journalId || 'N/A' },
        { label: 'DOI', value: article.doi || 'N/A', code: true },
      ]
    },
    {
      title: 'Author Information',
      icon: User,
      fields: [
        { 
          label: 'Author(s)', 
          value: article.authors 
            ? article.authors.map(a => `${a.name}${a.corresponding ? ' (corresponding)' : ''}`).join(', ')
            : article.author || 'N/A',
          multiline: article.authors && article.authors.length > 1
        },
        { label: 'Affiliation', value: article.affiliation || 'N/A', multiline: true },
      ]
    },
    {
      title: 'Content',
      icon: FileText,
      fields: [
        { label: 'Abstract', value: article.abstract || 'N/A', multiline: true, fullWidth: true },
        { 
          label: 'Keywords', 
          value: article.keywords 
            ? article.keywords.join(', ')
            : 'N/A',
          fullWidth: true
        },
        { label: 'Subject Areas', value: article.subjectAreas?.join(', ') || 'N/A', fullWidth: true },
      ]
    },
    {
      title: 'File Information',
      icon: File,
      fields: [
        { label: 'Filename', value: article.filename || 'N/A', code: true, fullWidth: true },
        { label: 'PDF URL', value: article.pdfUrl || article.url || 'N/A', code: true, fullWidth: true, isLink: true },
        { label: 'File Size', value: article.fileSize || 'N/A' },
        { label: 'Version', value: article.version || article.currentVersion || 'N/A' },
      ]
    },
    {
      title: 'Metadata & Flags',
      icon: Database,
      fields: [
        { label: 'Peer Reviewed', value: article.peerReviewed ? 'Yes' : 'No' },
        { label: 'License', value: article.license || 'N/A' },
        { label: 'Featured', value: article.featured ? 'Yes' : 'No' },
        { label: 'Requires Login', value: article.requiresLogin ? 'Yes' : 'No' },
      ]
    },
    {
      title: 'Statistics',
      icon: Settings,
      fields: [
        { label: 'Views', value: article.views?.toString() || '0' },
        { label: 'Downloads', value: article.downloads?.toString() || '0' },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {sections.map((section, idx) => (
        <div key={idx} className="border border-gray-200 rounded-lg p-5 bg-gray-50">
          <div className="flex items-center gap-2 mb-4">
            <section.icon className="h-5 w-5 text-newtifi-teal" />
            <h3 className="text-lg font-semibold text-newtifi-navy">{section.title}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.fields.map((field, fieldIdx) => (
              <div key={fieldIdx} className={field.fullWidth ? 'md:col-span-2' : ''}>
                <label className="text-sm font-medium text-gray-700 block mb-1">{field.label}</label>
                {field.multiline ? (
                  <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap bg-white p-3 rounded border border-gray-200">
                    {field.value || 'N/A'}
                  </p>
                ) : field.code ? (
                  <code className="mt-1 block text-xs bg-white px-3 py-2 rounded border border-gray-200 text-newtifi-navy break-all">
                    {field.value || 'N/A'}
                  </code>
                ) : field.isLink ? (
                  <a 
                    href={buildApiUrl(field.value as string || '#')} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-1 block text-xs bg-white px-3 py-2 rounded border border-gray-200 text-newtifi-teal hover:underline break-all"
                  >
                    {field.value || 'N/A'}
                  </a>
                ) : (
                  <p className="mt-1 text-sm text-gray-900 bg-white p-2 rounded border border-gray-200">
                    {field.value || 'N/A'}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
