import { useSimpleAuth } from '@/hooks/useSimpleAuth';
import ScrollReveal from '@/components/ScrollReveal';
import { User, Save, ArrowLeft, Home, Settings, FileText, Users, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Profile() {
  const { user, isAuthenticated } = useSimpleAuth();
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    organization: ''
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        bio: user.bio || '',
        organization: user.organization || ''
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const response = await fetch('/api/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        console.error('Failed to save profile');
      }
    } catch (err) {
      console.error('Error saving profile:', err);
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
              <h1 className="text-2xl md:text-2xl font-light">Profile Settings</h1>
            </div>
            <div className="mb-10">
              <h2 className="text-2xl md:text-4xl lg:text-4xl font-extralight tracking-wider leading-tight uppercase">
                Manage Your <span className="text-newtifi-teal">Profile</span>
              </h2>
            </div>
            <p className="text-base md:text-base leading-relaxed text-white/90 font-light">
              Update your personal information and preferences
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
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-newtifi-navy bg-newtifi-teal/10 rounded-lg"
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>
            <Link
              to="/apply-contributor"
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-newtifi-navy hover:bg-gray-50 rounded-lg transition-all"
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
            <h2 className="text-3xl md:text-4xl font-bold text-newtifi-navy mb-2">Profile Information</h2>
            <div className="w-full h-1 bg-newtifi-navy rounded mb-4" />
            <h3 className="text-lg text-newtifi-teal font-semibold mb-6">Update your account details</h3>
            
            <div className="max-w-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Profile Avatar Placeholder */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 bg-newtifi-teal/10 rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-newtifi-teal" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Profile Picture</h3>
                    <p className="text-sm text-gray-500">Avatar upload coming soon</p>
                  </div>
                </div>

                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border border-gray-300 rounded-2xl bg-white focus:ring-2 focus:ring-newtifi-teal focus:border-transparent transition-all text-newtifi-navy placeholder:text-gray-500"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Bio Field */}
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-5 py-4 border border-gray-300 rounded-2xl bg-white focus:ring-2 focus:ring-newtifi-teal focus:border-transparent min-h-[150px] transition-all text-newtifi-navy placeholder:text-gray-500"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                {/* Organization Field */}
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                    Organization
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border border-gray-300 rounded-2xl bg-white focus:ring-2 focus:ring-newtifi-teal focus:border-transparent transition-all text-newtifi-navy placeholder:text-gray-500"
                    placeholder="Your company or institution"
                  />
                </div>

                {/* Email (Read-only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full px-5 py-4 border border-gray-300 rounded-2xl bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                {/* Role (Read-only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Type
                  </label>
                  <input
                    type="text"
                    value={user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1).toLowerCase() || ''}
                    disabled
                    className="w-full px-5 py-4 border border-gray-300 rounded-2xl bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>

                {/* Save Button */}
                <div className="flex gap-4 pt-6">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-8 py-3 bg-gradient-to-r from-newtifi-navy to-newtifi-teal text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                  
                  {saved && (
                    <div className="flex items-center gap-2 text-green-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-sm font-medium">Saved successfully!</span>
                    </div>
                  )}
                </div>
              </form>

              {/* Coming Soon Section */}
              <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">More Features Coming Soon</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Profile picture upload</p>
                  <p>• Social media links</p>
                  <p>• Notification preferences</p>
                  <p>• Password change</p>
                  <p>• Two-factor authentication</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
