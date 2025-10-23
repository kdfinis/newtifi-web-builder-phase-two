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
    organization: '',
    title: '',
    department: '',
    phone: '',
    website: '',
    linkedin: '',
    twitter: '',
    researchInterests: '',
    expertise: '',
    location: '',
    timezone: ''
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        bio: user.bio || '',
        organization: user.organization || '',
        title: user.title || '',
        department: user.department || '',
        phone: user.phone || '',
        website: user.website || '',
        linkedin: user.linkedin || '',
        twitter: user.twitter || '',
        researchInterests: user.researchInterests || '',
        expertise: user.expertise || '',
        location: user.location || '',
        timezone: user.timezone || ''
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

                {/* LinkedIn Profile Information */}
                {user?.hasLinkedInAuth && (
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="#0077B5">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.036-1.85-3.036-1.853 0-2.136 1.446-2.136 2.941v5.664H9.354V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.368-1.85 3.602 0 4.268 2.37 4.268 5.455v6.286zM5.337 7.433a2.062 2.062 0 11.001-4.124 2.062 2.062 0 01-.001 4.124zM7.114 20.452H3.56V9h3.554v11.452z"/>
                      </svg>
                      LinkedIn Profile
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {user.headline && (
                        <div>
                          <label className="block text-sm font-medium text-blue-800 mb-1">Headline</label>
                          <p className="text-blue-700">{user.headline}</p>
                        </div>
                      )}
                      
                      {user.location && (
                        <div>
                          <label className="block text-sm font-medium text-blue-800 mb-1">Location</label>
                          <p className="text-blue-700">{user.location.name}, {user.location.country}</p>
                        </div>
                      )}
                      
                      {user.industry && (
                        <div>
                          <label className="block text-sm font-medium text-blue-800 mb-1">Industry</label>
                          <p className="text-blue-700">{user.industry}</p>
                        </div>
                      )}
                      
                      {user.positions && user.positions.length > 0 && (
                        <div>
                          <label className="block text-sm font-medium text-blue-800 mb-1">Current Position</label>
                          <p className="text-blue-700">{user.positions[0].title} at {user.positions[0].companyName}</p>
                        </div>
                      )}
                      
                      {user.numConnections && (
                        <div>
                          <label className="block text-sm font-medium text-blue-800 mb-1">Connections</label>
                          <p className="text-blue-700">{user.numConnections.toLocaleString()} connections</p>
                        </div>
                      )}
                    </div>

                    {user.skills && user.skills.length > 0 && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-blue-800 mb-2">Skills</label>
                        <div className="flex flex-wrap gap-2">
                          {user.skills.slice(0, 10).map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                              {skill.name} {skill.endorsements && `(${skill.endorsements})`}
                            </span>
                          ))}
                          {user.skills.length > 10 && (
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                              +{user.skills.length - 10} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {user.positions && user.positions.length > 0 && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-blue-800 mb-2">Recent Experience</label>
                        <div className="space-y-2">
                          {user.positions.slice(0, 3).map((position, index) => (
                            <div key={index} className="bg-white p-3 rounded-lg border border-blue-200">
                              <p className="font-medium text-blue-900">{position.title}</p>
                              <p className="text-blue-700">{position.companyName}</p>
                              <p className="text-blue-600 text-sm">
                                {position.startDate && `${position.startDate.year}`}
                                {position.endDate ? ` - ${position.endDate.year}` : ' - Present'}
                              </p>
                              {position.description && (
                                <p className="text-blue-600 text-sm mt-1">{position.description}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {user.educations && user.educations.length > 0 && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-blue-800 mb-2">Education</label>
                        <div className="space-y-2">
                          {user.educations.slice(0, 2).map((education, index) => (
                            <div key={index} className="bg-white p-3 rounded-lg border border-blue-200">
                              <p className="font-medium text-blue-900">
                                {education.degreeName} {education.fieldOfStudy && `in ${education.fieldOfStudy}`}
                              </p>
                              <p className="text-blue-700">{education.schoolName}</p>
                              <p className="text-blue-600 text-sm">
                                {education.startDate && education.endDate 
                                  ? `${education.startDate.year} - ${education.endDate.year}`
                                  : education.startDate ? `${education.startDate.year}` : ''
                                }
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

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

                {/* Title Field */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border border-gray-300 rounded-2xl bg-white focus:ring-2 focus:ring-newtifi-teal focus:border-transparent transition-all text-newtifi-navy placeholder:text-gray-500"
                    placeholder="Your professional title"
                  />
                </div>

                {/* Department Field */}
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border border-gray-300 rounded-2xl bg-white focus:ring-2 focus:ring-newtifi-teal focus:border-transparent transition-all text-newtifi-navy placeholder:text-gray-500"
                    placeholder="Your department or division"
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border border-gray-300 rounded-2xl bg-white focus:ring-2 focus:ring-newtifi-teal focus:border-transparent transition-all text-newtifi-navy placeholder:text-gray-500"
                    placeholder="Your contact number"
                  />
                </div>

                {/* Website Field */}
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border border-gray-300 rounded-2xl bg-white focus:ring-2 focus:ring-newtifi-teal focus:border-transparent transition-all text-newtifi-navy placeholder:text-gray-500"
                    placeholder="https://your-website.com"
                  />
                </div>

                {/* LinkedIn Field */}
                <div>
                  <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border border-gray-300 rounded-2xl bg-white focus:ring-2 focus:ring-newtifi-teal focus:border-transparent transition-all text-newtifi-navy placeholder:text-gray-500"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                {/* Twitter Field */}
                <div>
                  <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-2">
                    Twitter/X Handle
                  </label>
                  <input
                    type="text"
                    id="twitter"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border border-gray-300 rounded-2xl bg-white focus:ring-2 focus:ring-newtifi-teal focus:border-transparent transition-all text-newtifi-navy placeholder:text-gray-500"
                    placeholder="@yourusername"
                  />
                </div>

                {/* Research Interests Field */}
                <div>
                  <label htmlFor="researchInterests" className="block text-sm font-medium text-gray-700 mb-2">
                    Research Interests
                  </label>
                  <textarea
                    id="researchInterests"
                    name="researchInterests"
                    value={formData.researchInterests}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-5 py-4 border border-gray-300 rounded-2xl bg-white focus:ring-2 focus:ring-newtifi-teal focus:border-transparent transition-all text-newtifi-navy placeholder:text-gray-500"
                    placeholder="Your research areas and interests"
                  />
                </div>

                {/* Expertise Field */}
                <div>
                  <label htmlFor="expertise" className="block text-sm font-medium text-gray-700 mb-2">
                    Areas of Expertise
                  </label>
                  <textarea
                    id="expertise"
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-5 py-4 border border-gray-300 rounded-2xl bg-white focus:ring-2 focus:ring-newtifi-teal focus:border-transparent transition-all text-newtifi-navy placeholder:text-gray-500"
                    placeholder="Your professional expertise and specializations"
                  />
                </div>

                {/* Location Field */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border border-gray-300 rounded-2xl bg-white focus:ring-2 focus:ring-newtifi-teal focus:border-transparent transition-all text-newtifi-navy placeholder:text-gray-500"
                    placeholder="City, Country"
                  />
                </div>

                {/* Timezone Field */}
                <div>
                  <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <input
                    type="text"
                    id="timezone"
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border border-gray-300 rounded-2xl bg-white focus:ring-2 focus:ring-newtifi-teal focus:border-transparent transition-all text-newtifi-navy placeholder:text-gray-500"
                    placeholder="e.g., UTC+1, EST, PST"
                  />
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
