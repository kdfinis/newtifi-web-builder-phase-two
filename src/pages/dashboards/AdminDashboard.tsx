import { useSimpleAuth } from '@/hooks/useSimpleAuth';
import ScrollReveal from '@/components/ScrollReveal';
import { Users, FileText, CheckCircle, AlertCircle, Clock, Database, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import { buildApiUrl } from '@/lib/urls';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { user } = useSimpleAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      fetch(buildApiUrl('/admin/applications'), { credentials: 'include' })
        .then(r => {
          if (!r.ok) {
            if (r.status === 403) throw new Error('Access denied. Admin privileges required.');
            if (r.status === 401) throw new Error('Please log in to continue.');
            throw new Error('Failed to load applications');
          }
          return r.json();
        }),
      fetch(buildApiUrl('/admin/articles'), { credentials: 'include' })
        .then(r => {
          if (!r.ok) {
            if (r.status === 403) throw new Error('Access denied. Admin privileges required.');
            if (r.status === 401) throw new Error('Please log in to continue.');
            throw new Error('Failed to load articles');
          }
          return r.json();
        })
    ]).then(([apps, arts]) => {
      setApplications(Array.isArray(apps) ? apps : []);
      setArticles(Array.isArray(arts) ? arts : []);
      setError('');
      setLoading(false);
    }).catch(err => {
      setError(err instanceof Error ? err.message : 'Failed to load data');
      setApplications([]);
      setArticles([]);
      setLoading(false);
    });
  }, []);

  const handleApproveApplication = async (id) => {
    try {
      const response = await fetch(buildApiUrl(`/admin/applications/${id}/approve`), {
        method: 'POST',
        credentials: 'include'
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to approve application');
      }
      const data = await response.json();
      setApplications(prev => prev.map(app => 
        app.id === id ? { ...app, ...data } : app
      ));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to approve application');
    }
  };

  const handleRejectApplication = async (id) => {
    try {
      const response = await fetch(buildApiUrl(`/admin/applications/${id}/reject`), {
        method: 'POST',
        credentials: 'include'
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to reject application');
      }
      const data = await response.json();
      setApplications(prev => prev.map(app => 
        app.id === id ? { ...app, ...data } : app
      ));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to reject application');
    }
  };

  const handlePublishArticle = async (id) => {
    try {
      const response = await fetch(buildApiUrl(`/admin/articles/${id}/publish`), {
        method: 'POST',
        credentials: 'include'
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to publish article');
      }
      const data = await response.json();
      setArticles(prev => prev.map(art => 
        art.id === id ? { ...art, ...data } : art
      ));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to publish article');
    }
  };

  const pendingApplications = applications.filter(app => app.status === 'pending');
  const pendingArticles = articles.filter(art => art.status === 'draft' || art.status === 'pending');

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
            <h1 className="text-2xl md:text-2xl font-light mb-10">Admin Dashboard</h1>
            <div className="mb-10">
              <h2 className="text-2xl md:text-4xl lg:text-4xl font-extralight tracking-wider leading-tight uppercase">
                Content <span className="text-newtifi-teal">Management</span>
              </h2>
            </div>
            <p className="text-base md:text-base leading-relaxed text-white/90 font-light">
              Manage contributor applications and article submissions
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full bg-white py-8">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-newtifi-navy mb-2">Admin Console</h2>
                <div className="w-full h-1 bg-newtifi-navy rounded mb-4" />
                <h3 className="text-lg text-newtifi-teal font-light uppercase tracking-wide mb-6">Review and approve content</h3>
              </div>
              <button
                onClick={() => navigate('/admin/articles')}
                className="px-6 py-3 bg-newtifi-navy text-white rounded-full text-xs uppercase tracking-[0.2em] hover:bg-newtifi-teal transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
              >
                <Database className="h-5 w-5" />
                <span>View All Articles</span>
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
            
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
            
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Pending Applications</span>
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Users className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-newtifi-navy">{pendingApplications.length}</div>
                <p className="text-xs text-gray-500 mt-1">Awaiting review</p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Pending Articles</span>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-newtifi-navy">{pendingArticles.length}</div>
                <p className="text-xs text-gray-500 mt-1">Awaiting review</p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Total Articles</span>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FileText className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-newtifi-navy">{articles.length}</div>
                <p className="text-xs text-gray-500 mt-1">All articles</p>
              </div>
            </div>

            {/* Pending Applications */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-newtifi-navy mb-4">Contributor Applications</h3>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-newtifi-navy mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading applications...</p>
                </div>
              ) : pendingApplications.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-2xl">
                  <p className="text-gray-600">No pending applications</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingApplications.map(app => (
                    <div key={app.id} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="text-lg font-light uppercase tracking-wide text-newtifi-navy mb-2">
                            {app.user.name || app.user.email}
                          </h4>
                          <p className="text-gray-600 mb-2">{app.user.email}</p>
                          <p className="text-sm text-gray-700 mb-3">{app.bio}</p>
                          <p className="text-sm text-gray-600 italic">"{app.motivation}"</p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleApproveApplication(app.id)}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center gap-2"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectApplication(app.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all flex items-center gap-2"
                          >
                            <AlertCircle className="h-4 w-4" />
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pending Articles */}
            <div>
              <h3 className="text-2xl font-bold text-newtifi-navy mb-4">Article Submissions</h3>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-newtifi-navy mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading articles...</p>
                </div>
              ) : pendingArticles.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-2xl">
                  <p className="text-gray-600">No pending articles</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingArticles.map(article => (
                    <div key={article.id} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="text-lg font-light uppercase tracking-wide text-newtifi-navy mb-2">
                            {article.title || 'Untitled Article'}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            By {article.author || article.authorId || 'Unknown'} • {article.journal || article.category || 'Uncategorized'}
                            {article.status && (
                              <span className={`ml-2 px-2 py-1 rounded text-xs ${
                                article.status === 'draft' ? 'bg-gray-200 text-gray-700' :
                                article.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                                'bg-blue-200 text-blue-800'
                              }`}>
                                {article.status}
                              </span>
                            )}
                          </p>
                          {(article.summary || article.abstract) && (
                            <p className="text-sm text-gray-700 line-clamp-2 mb-2">
                              {article.summary || article.abstract}
                            </p>
                          )}
                          {article.createdAt && (
                            <p className="text-xs text-gray-500">
                              Created: {new Date(article.createdAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handlePublishArticle(article.id)}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center gap-2"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Publish
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
