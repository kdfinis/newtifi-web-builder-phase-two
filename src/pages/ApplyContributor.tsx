import { useSimpleAuth } from '@/hooks/useSimpleAuth';
import ScrollReveal from '@/components/ScrollReveal';
import { FileText, ArrowLeft, Send, CheckCircle, Home, User, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { buildApiUrl } from '@/lib/urls';

export default function ApplyContributor() {
  const { user, isAuthenticated } = useSimpleAuth();
  const [formData, setFormData] = useState({
    bio: '',
    motivation: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [existingApplication, setExistingApplication] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      // Check if user already has an application
      fetch(buildApiUrl('/applications/me'), { credentials: 'include' })
        .then(r => {
          if (r.ok) {
            return r.json();
          }
          return null;
        })
        .then(data => {
          if (data && !data.error) {
            setExistingApplication(data);
          }
        })
        .catch(err => {
          // Silently fail - user may not have an application yet
        });
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    
    try {
      const response = await fetch(buildApiUrl('/applications'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit application');
      }
      
      const data = await response.json();
      setSubmitted(true);
      setExistingApplication(data);
      setError('');
    } catch (err) {
      console.error('Error submitting application:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit application. Please try again.';
      setError(errorMessage);
      setSubmitted(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
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

  if (existingApplication) {
    const getStatusColor = (status) => {
      switch (status) {
        case 'pending': return 'bg-yellow-200 text-yellow-800';
        case 'approved': return 'bg-green-200 text-green-800';
        case 'rejected': return 'bg-red-200 text-red-800';
        default: return 'bg-gray-200 text-gray-700';
      }
    };

    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative px-6 py-32 bg-gradient-to-br from-newtifi-navy via-newtifi-navy/95 to-newtifi-teal/20 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
          
          <div className="container mx-auto relative">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-10">
                <Link 
                  to="/dashboard"
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                >
                  <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-2xl md:text-2xl font-light">Application Status</h1>
              </div>
              <h2 className="text-2xl md:text-4xl lg:text-4xl font-extralight tracking-wider leading-tight uppercase">
                Your <span className="text-newtifi-teal">Application</span>
              </h2>
            </ScrollReveal>
          </div>
        </section>

        {/* Status Section */}
        <section className="w-full bg-white py-8">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-newtifi-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="h-8 w-8 text-newtifi-teal" />
                    </div>
                    <h3 className="text-2xl font-bold text-newtifi-navy mb-2">Application Status</h3>
                    <span className={`px-4 py-2 rounded-lg text-sm font-medium ${getStatusColor(existingApplication.status)}`}>
                      {existingApplication.status.charAt(0).toUpperCase() + existingApplication.status.slice(1)}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Your Bio</label>
                      <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{existingApplication.bio}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Motivation</label>
                      <p className="text-gray-900 bg-gray-50 p-3 rounded-lg italic">"{existingApplication.motivation}"</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Submitted</label>
                      <p className="text-gray-900">
                        {new Date(existingApplication.createdAt).toLocaleDateString()} at {new Date(existingApplication.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>

                  {existingApplication.status === 'pending' && (
                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-yellow-800 text-sm">
                        Your application is under review. We'll notify you once a decision has been made.
                      </p>
                    </div>
                  )}

                  {existingApplication.status === 'approved' && (
                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <p className="text-green-800 font-light uppercase tracking-wide">Congratulations!</p>
                      </div>
                      <p className="text-green-700 text-sm">
                        Your application has been approved. You can now create and manage articles in your dashboard.
                      </p>
                      <Link 
                        to="/dashboard"
                        className="inline-block mt-3 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                      >
                        Go to Dashboard
                      </Link>
                    </div>
                  )}

                  {existingApplication.status === 'rejected' && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 text-sm">
                        Unfortunately, your application was not approved at this time. You can apply again in the future.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
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
              <h1 className="text-2xl md:text-2xl font-light">Become a Contributor</h1>
            </div>
            <div className="mb-10">
              <h2 className="text-2xl md:text-4xl lg:text-4xl font-extralight tracking-wider leading-tight uppercase">
                Join Our <span className="text-newtifi-teal">Writing Team</span>
              </h2>
            </div>
            <p className="text-base md:text-base leading-relaxed text-white/90 font-light">
              Apply to become a contributor and share your expertise with the NewTIFI community
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Secondary Navigation */}
      <section className="w-full bg-white border-b border-gray-200">
        <div className="container mx-auto px-6">
          <nav className="flex items-center space-x-1 py-3">
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-newtifi-navy hover:bg-gray-50 rounded-lg transition-all"
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <div className="w-px h-6 bg-gray-300"></div>
            <Link
              to="/profile"
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-newtifi-navy hover:bg-gray-50 rounded-lg transition-all"
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>
            <Link
              to="/apply-contributor"
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-newtifi-navy bg-newtifi-teal/10 rounded-lg"
            >
              <FileText className="h-4 w-4" />
              <span>Apply Contributor</span>
            </Link>
            <Link
              to="/articles/new"
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-newtifi-navy hover:bg-gray-50 rounded-lg transition-all"
            >
              <FileText className="h-4 w-4" />
              <span>New Article</span>
            </Link>
            {user?.role === 'ADMIN' && (
              <>
                <div className="w-px h-6 bg-gray-300"></div>
                <Link
                  to="/admin"
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-newtifi-navy hover:bg-gray-50 rounded-lg transition-all"
                >
                  <Settings className="h-4 w-4" />
                  <span>Admin</span>
                </Link>
              </>
            )}
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full bg-white py-8">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-newtifi-navy mb-2">Contributor Application</h2>
            <div className="w-full h-1 bg-newtifi-navy rounded mb-4" />
            <h3 className="text-lg text-newtifi-teal font-light uppercase tracking-wide mb-6">Tell us about yourself and your expertise</h3>
            
            <div className="max-w-2xl mx-auto">
              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for your interest in becoming a NewTIFI contributor. We'll review your application and get back to you soon.
                  </p>
                  <Link 
                    to="/dashboard"
                    className="px-6 py-3 bg-newtifi-teal text-white rounded-lg font-light uppercase tracking-wide hover:bg-newtifi-teal/90 transition-all"
                  >
                    Back to Dashboard
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Bio Field */}
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                      Professional Bio *
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={6}
                      required
                      className="w-full px-5 py-4 border border-gray-300 rounded-2xl bg-white focus:ring-2 focus:ring-newtifi-teal focus:border-transparent min-h-[150px] transition-all text-newtifi-navy placeholder:text-gray-500"
                      placeholder="Tell us about your professional background, expertise, and experience in your field..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      This will be used to evaluate your application and may be displayed on your contributor profile.
                    </p>
                  </div>

                  {/* Motivation Field */}
                  <div>
                    <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-2">
                      Why do you want to contribute? *
                    </label>
                    <textarea
                      id="motivation"
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleChange}
                      rows={4}
                      required
                      className="w-full px-5 py-4 border border-gray-300 rounded-2xl bg-white focus:ring-2 focus:ring-newtifi-teal focus:border-transparent min-h-[120px] transition-all text-newtifi-navy placeholder:text-gray-500"
                      placeholder="What motivates you to write for NewTIFI? What topics are you passionate about? How do you hope to contribute to our community?"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Help us understand your goals and interests as a potential contributor.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4 pt-6">
                    <button
                      type="submit"
                      disabled={submitting || !formData.bio.trim() || !formData.motivation.trim()}
                      className="px-8 py-3 bg-newtifi-teal text-white rounded-lg font-light uppercase tracking-wide hover:bg-newtifi-teal/90 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Submit Application
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* Information Section */}
              <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <h3 className="text-lg font-light uppercase tracking-wide text-gray-900 mb-3">What happens next?</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-newtifi-teal/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-newtifi-teal">1</span>
                    </div>
                    <p>We'll review your application within 3-5 business days</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-newtifi-teal/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-newtifi-teal">2</span>
                    </div>
                    <p>If approved, you'll receive contributor access to create and manage articles</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-newtifi-teal/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-newtifi-teal">3</span>
                    </div>
                    <p>You can start writing articles for our Investment Management, Bankruptcy, or Legal journals</p>
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
