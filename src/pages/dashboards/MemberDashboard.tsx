import { useSimpleAuth } from '@/hooks/useSimpleAuth';
import { Link, useNavigate } from 'react-router-dom';
import ScrollReveal from '@/components/ScrollReveal';
import { FileText, User, Bookmark, Home, Settings, ArrowLeft } from 'lucide-react';

export default function MemberDashboard() {
  const { user } = useSimpleAuth();
  const navigate = useNavigate();

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
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="text-sm">Back</span>
              </button>
            </div>
            <h1 className="text-2xl md:text-2xl font-light mb-10">Member Dashboard</h1>
            <div className="mb-10">
              <h2 className="text-2xl md:text-4xl lg:text-4xl font-extralight tracking-wider leading-tight uppercase">
                Welcome <span className="text-newtifi-teal">Back</span>
              </h2>
            </div>
            <p className="text-base md:text-base leading-relaxed text-white/90 font-light">
              Manage your profile, bookmarks, and apply to become a contributor
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Secondary Navigation */}
      <section className="w-full bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6">
          <nav className="flex items-center space-x-1 py-3 overflow-x-auto">
            <Link
              to="/dashboard"
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium text-newtifi-navy bg-newtifi-teal/10 rounded-lg whitespace-nowrap"
            >
              <Home className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
            <div className="w-px h-6 bg-gray-300 hidden sm:block"></div>
            <Link
              to="/profile"
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-600 hover:text-newtifi-navy hover:bg-gray-50 rounded-lg transition-all whitespace-nowrap"
            >
              <User className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Profile</span>
            </Link>
            <Link
              to="/apply-contributor"
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-600 hover:text-newtifi-navy hover:bg-gray-50 rounded-lg transition-all whitespace-nowrap"
            >
              <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Apply Contributor</span>
            </Link>
            <Link
              to="/articles"
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-600 hover:text-newtifi-navy hover:bg-gray-50 rounded-lg transition-all whitespace-nowrap"
            >
              <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Articles</span>
            </Link>
            <Link
              to="/articles/new"
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-600 hover:text-newtifi-navy hover:bg-gray-50 rounded-lg transition-all whitespace-nowrap"
            >
              <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">New Article</span>
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
      <section className="w-full bg-white py-4 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-newtifi-navy mb-2">Your Account</h2>
            <div className="w-full h-1 bg-newtifi-navy rounded mb-4" />
            <h3 className="text-lg text-newtifi-teal font-semibold mb-6">Manage your NewTIFI experience</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {/* Profile Card */}
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-gray-100 hover:border-newtifi-teal hover:shadow-3xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-newtifi-teal/10 rounded-2xl">
                    <User className="h-8 w-8 text-newtifi-teal" />
                  </div>
                  <h3 className="text-xl font-semibold text-newtifi-navy">Profile</h3>
                </div>
                <p className="text-gray-600 mb-6">Update your personal information and preferences</p>
                <Link 
                  to="/profile"
                  className="px-6 py-3 bg-gradient-to-r from-newtifi-navy to-newtifi-teal text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-medium"
                >
                  Edit Profile
                </Link>
              </div>

              {/* Apply to Contribute Card */}
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-gray-100 hover:border-newtifi-teal hover:shadow-3xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-newtifi-navy/10 rounded-2xl">
                    <FileText className="h-8 w-8 text-newtifi-navy" />
                  </div>
                  <h3 className="text-xl font-semibold text-newtifi-navy">Become a Contributor</h3>
                </div>
                <p className="text-gray-600 mb-6">Apply to write articles for NewTIFI journals</p>
                <Link 
                  to="/apply-contributor"
                  className="px-6 py-3 bg-gradient-to-r from-newtifi-navy to-newtifi-teal text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-medium"
                >
                  Apply Now
                </Link>
              </div>

              {/* Bookmarks Card */}
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-gray-100 hover:border-newtifi-teal hover:shadow-3xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-yellow-100 rounded-2xl">
                    <Bookmark className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-newtifi-navy">Bookmarks</h3>
                </div>
                <p className="text-gray-600 mb-6">Your saved articles and resources</p>
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">No bookmarks yet</p>
                  <p className="text-xs text-gray-400 mt-1">Save articles to see them here</p>
                </div>
              </div>
            </div>

            {/* Article Reading Section */}
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-newtifi-navy mb-2">Latest Articles</h2>
              <div className="w-full h-1 bg-newtifi-navy rounded mb-4" />
              <h3 className="text-lg text-newtifi-teal font-semibold mb-6">Discover and read the latest research</h3>
              
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-gray-100">
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
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 hover:border-newtifi-teal hover:shadow-lg transition-all duration-300">
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


                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 hover:border-newtifi-teal hover:shadow-lg transition-all duration-300">
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
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 hover:border-newtifi-teal hover:shadow-lg transition-all duration-300">
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

            {/* User Info */}
            <div className="bg-gray-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8">
              <h3 className="text-xl font-semibold text-newtifi-navy mb-4">Account Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Name</label>
                  <p className="text-lg font-medium text-gray-900">{user?.name || 'Not set'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <p className="text-lg font-medium text-gray-900">{user?.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Role</label>
                  <p className="text-lg font-medium text-gray-900 capitalize">{user?.role?.toLowerCase()}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Member Since</label>
                  <p className="text-lg font-medium text-gray-900">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
