import { useSimpleAuth } from '@/hooks/useSimpleAuth';
import ScrollReveal from '@/components/ScrollReveal';
import { FileText, ArrowLeft, Save, Send, Eye } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function ArticleEditor() {
  const { user, isAuthenticated, isContributor } = useSimpleAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    body: '',
    journal: 'Investment Management',
    category: 'HealthTech'
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const journals = [
    'Investment Management',
    'Bankruptcy',
    'Legal'
  ];

  const categories = [
    'HealthTech',
    'FinTech',
    'LegalTech',
    'RegTech',
    'InsurTech',
    'PropTech',
    'Other'
  ];

  useEffect(() => {
    if (isEditing && id) {
      // Load existing article
      fetch(`/api/articles/${id}`, { credentials: 'include' })
        .then(r => r.json())
        .then(data => {
          setFormData({
            title: data.title || '',
            summary: data.summary || '',
            body: data.body || '',
            journal: data.journal || 'Investment Management',
            category: data.category || 'HealthTech'
          });
        })
        .catch(err => console.error('Failed to load article:', err));
    }
  }, [isEditing, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const url = isEditing ? `/api/articles/${id}` : '/api/articles';
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        
        if (!isEditing) {
          const article = await response.json();
          navigate(`/articles/edit/${article.id}`);
        }
      } else {
        console.error('Failed to save article');
      }
    } catch (err) {
      console.error('Error saving article:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleSubmitForReview = async () => {
    if (!isEditing || !id) return;
    
    setSaving(true);
    try {
      const response = await fetch(`/api/articles/${id}/submit`, {
        method: 'POST',
        credentials: 'include'
      });
      
      if (response.ok) {
        navigate('/dashboard');
      } else {
        console.error('Failed to submit for review');
      }
    } catch (err) {
      console.error('Error submitting for review:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please log in</h1>
          <Link to="/login" className="text-newtifi-teal hover:underline">
            Go to login page
          </Link>
        </div>
      </div>
    );
  }

  if (!isContributor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Contributor Access Required</h1>
          <p className="text-gray-600 mb-4">You need to be a contributor to create articles.</p>
          <Link to="/apply-contributor" className="text-newtifi-teal hover:underline">
            Apply to become a contributor
          </Link>
        </div>
      </div>
    );
  }

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
            <div className="flex items-center gap-4 mb-10">
              <Link 
                to="/dashboard"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
              >
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-2xl md:text-2xl font-light">
                {isEditing ? 'Edit Article' : 'New Article'}
              </h1>
            </div>
            <div className="mb-10">
              <h2 className="text-2xl md:text-4xl lg:text-4xl font-extralight tracking-wider leading-tight uppercase">
                {isEditing ? 'Edit Your' : 'Create New'} <span className="text-newtifi-teal">Article</span>
              </h2>
            </div>
            <p className="text-base md:text-base leading-relaxed text-white/90 font-light">
              {isEditing ? 'Update your article content and settings' : 'Write and publish your contribution to NewTIFI'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full bg-white py-8">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-newtifi-navy mb-2">Article Editor</h2>
            <div className="w-full h-1 bg-newtifi-navy rounded mb-4" />
            <h3 className="text-lg text-newtifi-teal font-semibold mb-6">Write your article using Markdown</h3>
            
            <div className="max-w-6xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Title Field */}
                  <div className="md:col-span-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                      Article Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-newtifi-teal focus:border-transparent transition-all"
                      placeholder="Enter a compelling title for your article"
                    />
                    {formData.title && (
                      <p className="text-xs text-gray-500 mt-1">
                        URL slug: {generateSlug(formData.title)}
                      </p>
                    )}
                  </div>

                  {/* Journal Selection */}
                  <div>
                    <label htmlFor="journal" className="block text-sm font-medium text-gray-700 mb-2">
                      Journal *
                    </label>
                    <select
                      id="journal"
                      name="journal"
                      value={formData.journal}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-newtifi-teal focus:border-transparent transition-all"
                    >
                      {journals.map(journal => (
                        <option key={journal} value={journal}>{journal}</option>
                      ))}
                    </select>
                  </div>

                  {/* Category Selection */}
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-newtifi-teal focus:border-transparent transition-all"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  {/* Summary Field */}
                  <div className="md:col-span-2">
                    <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
                      Summary *
                    </label>
                    <textarea
                      id="summary"
                      name="summary"
                      value={formData.summary}
                      onChange={handleChange}
                      rows={3}
                      maxLength={300}
                      required
                      className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-newtifi-teal focus:border-transparent transition-all"
                      placeholder="Brief summary of your article (max 300 characters)"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.summary.length}/300 characters
                    </p>
                  </div>
                </div>

                {/* Body Field */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="body" className="block text-sm font-medium text-gray-700">
                      Article Content *
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPreview(!showPreview)}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all flex items-center gap-1"
                    >
                      <Eye className="h-4 w-4" />
                      {showPreview ? 'Edit' : 'Preview'}
                    </button>
                  </div>
                  
                  {showPreview ? (
                    <div className="w-full px-5 py-4 border border-gray-300 rounded-2xl bg-gray-50 min-h-[400px] prose max-w-none">
                      <div dangerouslySetInnerHTML={{ 
                        __html: formData.body.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')
                      }} />
                    </div>
                  ) : (
                    <textarea
                      id="body"
                      name="body"
                      value={formData.body}
                      onChange={handleChange}
                      rows={20}
                      required
                      className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-newtifi-teal focus:border-transparent min-h-[400px] transition-all font-mono text-sm"
                      placeholder="Write your article content here using Markdown..."
                    />
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Use Markdown formatting. **bold**, *italic*, # headings, etc.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6">
                  <button
                    type="submit"
                    disabled={saving || !formData.title.trim() || !formData.summary.trim() || !formData.body.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-newtifi-navy to-newtifi-teal text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Draft
                      </>
                    )}
                  </button>

                  {isEditing && (
                    <button
                      type="button"
                      onClick={handleSubmitForReview}
                      disabled={saving || !formData.title.trim() || !formData.summary.trim() || !formData.body.trim()}
                      className="px-6 py-3 bg-yellow-600 text-white rounded-xl shadow-lg hover:bg-yellow-700 transition-all duration-300 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="h-4 w-4" />
                      Submit for Review
                    </button>
                  )}
                  
                  {saved && (
                    <div className="flex items-center gap-2 text-green-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-sm font-medium">Saved successfully!</span>
                    </div>
                  )}
                </div>
              </form>

              {/* Markdown Help */}
              <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Markdown Formatting Help</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <p><strong>Headers:</strong> # H1, ## H2, ### H3</p>
                    <p><strong>Bold:</strong> **bold text**</p>
                    <p><strong>Italic:</strong> *italic text*</p>
                    <p><strong>Lists:</strong> - item or 1. item</p>
                  </div>
                  <div>
                    <p><strong>Links:</strong> [text](url)</p>
                    <p><strong>Code:</strong> `inline code`</p>
                    <p><strong>Blockquotes:</strong> {'>'} quote</p>
                    <p><strong>Line breaks:</strong> Double space + enter</p>
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
