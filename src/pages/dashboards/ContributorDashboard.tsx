import { useSimpleAuth } from '@/hooks/useSimpleAuth';
import { Link } from 'react-router-dom';
import ScrollReveal from '@/components/ScrollReveal';
import { FileText, Plus, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ContributorDashboard() {
  const { user } = useSimpleAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('/api/articles/my', { credentials: 'include' })
      .then(r => r.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load articles:', err);
        setLoading(false);
      });
  }, []);

  const filteredArticles = filter === 'all' 
    ? articles 
    : articles.filter(article => article.status === filter);

  const getStatusBadge = (status) => {
    const badges = {
      draft: 'bg-gray-200 text-gray-700',
      pending: 'bg-yellow-200 text-yellow-800',
      published: 'bg-green-200 text-green-800',
      rejected: 'bg-red-200 text-red-800'
    };
    return badges[status] || 'bg-gray-200 text-gray-700';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'draft': return <FileText className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'published': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <AlertCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative px-6 py-32 bg-gradient-to-br from-newtifi-navy via-newtifi-navy/95 to-newtifi-teal/20 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        {/* Floating decorative shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-white/10 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-newtifi-teal/10 rounded-full"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 border border-white/10 transform rotate-45"></div>
        
        <div className="container mx-auto relative">
          <ScrollReveal>
            <h1 className="text-2xl md:text-2xl font-light mb-10">Contributor Dashboard</h1>
            <div className="mb-10">
              <h2 className="text-2xl md:text-4xl lg:text-4xl font-extralight tracking-wider leading-tight uppercase">
                Your <span className="text-newtifi-teal">Articles</span>
              </h2>
            </div>
            <p className="text-base md:text-base leading-relaxed text-white/90 font-light">
              Create, manage, and track your article submissions
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full bg-white py-8">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-newtifi-navy mb-2">Article Management</h2>
            <div className="w-full h-1 bg-newtifi-navy rounded mb-4" />
            <h3 className="text-lg text-newtifi-teal font-semibold mb-6">Create and manage your contributions</h3>
            
            {/* Action Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <Link 
                to="/articles"
                className="px-8 py-3 bg-gradient-to-r from-newtifi-teal to-newtifi-navy text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium flex items-center gap-2"
              >
                <FileText className="h-5 w-5" />
                Browse Articles
              </Link>
              <Link 
                to="/articles/new"
                className="px-8 py-3 bg-gradient-to-r from-newtifi-navy to-newtifi-teal text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium flex items-center gap-2"
              >
                <Plus className="h-5 w-5" />
                New Article
              </Link>
              
              {/* Status Filters */}
              <div className="flex gap-2">
                {['all', 'draft', 'pending', 'published', 'rejected'].map(status => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-4 py-2 rounded-xl font-semibold transition-all text-sm ${
                      filter === status
                        ? 'bg-newtifi-navy text-white shadow-lg'
                        : 'bg-white text-newtifi-navy border border-gray-200 hover:border-newtifi-teal'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles Grid */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-newtifi-navy mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading articles...</p>
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-300">
                <div className="text-newtifi-teal mb-4">
                  <FileText className="w-16 h-16 mx-auto" />
                </div>
                <p className="text-gray-600 font-medium text-lg mb-2">
                  {filter === 'all' ? 'No articles yet' : `No ${filter} articles`}
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  {filter === 'all' 
                    ? 'Create your first article to get started'
                    : `You don't have any ${filter} articles`
                  }
                </p>
                {filter === 'all' && (
                  <Link 
                    to="/articles/new"
                    className="px-6 py-3 bg-newtifi-navy text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    Create Article
                  </Link>
                )}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map(article => (
                  <div key={article.id} className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 hover:border-newtifi-teal hover:shadow-3xl transition-all duration-300">
                    {/* Title */}
                    <h3 className="text-xl font-semibold text-newtifi-navy mb-2 hover:underline line-clamp-2">
                      {article.title}
                    </h3>
                    
                    {/* Metadata row */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{new Date(article.updatedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <span>{article.journal}</span>
                      </div>
                    </div>
                    
                    {/* Status badge */}
                    <div className="mb-4">
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1 w-fit ${getStatusBadge(article.status)}`}>
                        {getStatusIcon(article.status)}
                        {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                      </span>
                    </div>
                    
                    {/* Summary/preview */}
                    <p className="text-gray-600 line-clamp-3 mb-6 leading-relaxed">
                      {article.summary}
                    </p>
                    
                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link 
                        to={`/articles/edit/${article.id}`}
                        className="px-4 py-2 bg-gradient-to-r from-newtifi-navy to-newtifi-teal text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-medium text-sm"
                      >
                        Edit
                      </Link>
                      {article.status === 'draft' && (
                        <button className="px-4 py-2 bg-yellow-600 text-white rounded-xl shadow-lg hover:bg-yellow-700 transition-all font-medium text-sm">
                          Submit
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Article Reading Section */}
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-newtifi-navy mb-2">Latest Articles</h2>
              <div className="w-full h-1 bg-newtifi-navy rounded mb-4" />
              <h3 className="text-lg text-newtifi-teal font-semibold mb-6">Discover and read the latest research</h3>
              
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                  <h3 className="text-xl font-semibold text-newtifi-navy">Featured Articles</h3>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <input
                      type="text"
                      placeholder="Search articles..."
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-newtifi-teal focus:border-transparent text-sm bg-white text-gray-900"
                    />
                    <Link 
                      to="/articles"
                      className="px-4 py-2 bg-newtifi-teal text-white rounded-lg hover:bg-newtifi-teal/90 transition-colors text-sm font-medium text-center"
                    >
                      View All Articles
                    </Link>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {/* Sample Article Cards */}
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:border-newtifi-teal hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs font-medium text-green-600 uppercase tracking-wide">Published</span>
                    </div>
                    <h4 className="text-lg font-semibold text-newtifi-navy mb-2 line-clamp-2">
                      Closed-Ended Luxembourg ELTIFs: Compulsory Redemptions and Compartment Termination & Amalgamation Provisions
                    </h4>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      This article examines the legal and regulatory framework governing compulsory redemptions and compartment terminations in Luxembourg closed-ended ELTIFs.
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>Ezechiel Havrenne</span>
                      <span>Jun 28, 2025</span>
                    </div>
                    <Link 
                      to="/publishing/investment-management/article/eltifs-compulsory-redemptions"
                      className="block w-full text-center py-2 px-4 bg-newtifi-teal text-white rounded-lg hover:bg-newtifi-teal/90 transition-colors text-sm font-medium"
                    >
                      Read Article
                    </Link>
                  </div>


                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:border-newtifi-teal hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs font-medium text-green-600 uppercase tracking-wide">Published</span>
                    </div>
                    <h4 className="text-lg font-semibold text-newtifi-navy mb-2 line-clamp-2">
                      Investor Oversight or Undue Influence? Reassessing BaFin's Stance on AIFM Portfolio Control
                    </h4>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      This article critically examines the March 2025 Draft Position Letter issued by BaFin on investor involvement in AIF portfolio decisions.
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>Ezechiel Havrenne</span>
                      <span>Jun 28, 2025</span>
                    </div>
                    <Link 
                      to="/publishing/investment-management/article/bafin-portfolio-control"
                      className="block w-full text-center py-2 px-4 bg-newtifi-teal text-white rounded-lg hover:bg-newtifi-teal/90 transition-colors text-sm font-medium"
                    >
                      Read Article
                    </Link>
                  </div>

                  {/* Article 3: Sustainable Finance */}
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:border-newtifi-teal hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs font-medium text-green-600 uppercase tracking-wide">Published</span>
                    </div>
                    <h4 className="text-lg font-semibold text-newtifi-navy mb-2 line-clamp-2">
                      Luxembourg SICARs, SIFs, and RAIFs: A 20-year Perspective on the Well-Informed Investor Notion
                    </h4>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      This article provides a comprehensive analysis of Luxembourg's "Well-Informed Investor" regime as applied to SICARs, SIFs, and RAIFs.
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>Ezechiel Havrenne</span>
                      <span>Jun 28, 2025</span>
                    </div>
                    <Link 
                      to="/publishing/investment-management/article/luxembourg-well-informed-investor"
                      className="block w-full text-center py-2 px-4 bg-newtifi-teal text-white rounded-lg hover:bg-newtifi-teal/90 transition-colors text-sm font-medium"
                    >
                      Read Article
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
