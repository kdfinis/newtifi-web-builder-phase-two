import React, { useState, useEffect } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { BookOpen, FileText, Download, Upload, AlertCircle, CheckCircle, ChevronRight, ExternalLink, ArrowLeft, ChevronDown, ChevronUp, Clock, Users, Archive, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { submissionRulesData, downloadSubmissionRulesPDF } from '@/data/submissionRules';
import { urlFactory } from '@/lib/urls/UrlFactory';

const Publishing: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('journals');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [expandedOverview, setExpandedOverview] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerLoading, setRegisterLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [dbArticles, setDbArticles] = useState([]);
  const [loadingDbArticles, setLoadingDbArticles] = useState(true);

  const navigate = useNavigate();

  // Load database articles
  useEffect(() => {
    fetch('/api/articles?status=published', { credentials: 'include' })
      .then(r => r.json())
      .then(data => {
        // Transform database articles to match the expected format
        const transformedArticles = data.map(article => ({
          id: article.slug,
          title: article.title,
          author: article.author.name || article.author.email,
          date: new Date(article.publishedAt || article.createdAt).toISOString().split('T')[0],
          doi: `10.1234/newtifi.${article.id.slice(-6)}`,
          keywords: [article.category, article.journal],
          abstract: article.summary,
          filename: `${article.slug}.pdf`,
          url: urlFactory.getJournalArticlePath(article.journal.toLowerCase().replace(/\s+/g, '-'), article.slug),
          pdfUrl: `/articles/${article.slug}.pdf`,
          status: article.status,
          views: 0,
          downloads: 0,
          featured: false,
          category: "journal",
          source: "contributor",
          journal: article.journal,
          articleCategory: article.category
        }));
        setDbArticles(transformedArticles);
        setLoadingDbArticles(false);
      })
      .catch(err => {
        console.error('Failed to load database articles:', err);
        setLoadingDbArticles(false);
      });
  }, []);

  // Static articles data
  const articles = [
    {
      id: "eltifs-compulsory-redemptions",
      title: "Closed-Ended Luxembourg ELTIFs: Compulsory Redemptions and Compartment Termination & Amalgamation Provisions",
      author: "Ezechiel Havrenne",
      date: "2025-06-28",
      doi: "10.1234/newtifi.2025.001",
      keywords: ["ELTIFs", "Luxembourg", "Compulsory Redemptions", "Compartment Termination"],
      abstract: "This article examines the legal and regulatory framework governing compulsory redemptions and compartment terminations in Luxembourg closed-ended ELTIFs.",
      filename: "eltifs-compulsory-redemptions.pdf",
      url: urlFactory.getJournalArticlePath('investment-management', 'eltifs-compulsory-redemptions'),
      pdfUrl: "/articles/eltifs-compulsory-redemptions.pdf",
      status: "published",
      views: 0,
      downloads: 0,
      featured: true,
      category: "journal"
    },
    {
      id: "bafin-portfolio-control",
      title: "Investor Oversight or Undue Influence? Reassessing BaFin's Stance on AIFM Portfolio Control",
      author: "Ezechiel Havrenne",
      date: "2025-06-28",
      doi: "10.1234/newtifi.2025.002",
      keywords: ["BaFin", "AIFM", "Portfolio Control", "Investor Oversight"],
      abstract: "This article critically examines the March 2025 Draft Position Letter issued by BaFin on investor involvement in AIF portfolio decisions.",
      filename: "bafin-portfolio-control.pdf",
      url: urlFactory.getJournalArticlePath('investment-management', 'bafin-portfolio-control'),
      pdfUrl: "/articles/bafin-portfolio-control.pdf",
      status: "published",
      views: 0,
      downloads: 0,
      featured: true,
      category: "journal"
    },
    {
      id: "luxembourg-well-informed-investor",
      title: "Luxembourg SICARs, SIFs, and RAIFs: A 20-year Perspective on the Well-Informed Investor Notion",
      author: "Ezechiel Havrenne",
      date: "2025-06-28",
      doi: "10.1234/newtifi.2025.003",
      keywords: ["SICARs", "SIFs", "RAIFs", "Well-Informed Investor", "Luxembourg"],
      abstract: "This article provides a comprehensive analysis of Luxembourg's 'Well-Informed Investor' regime as applied to SICARs, SIFs, and RAIFs.",
      filename: "luxembourg-well-informed-investor.pdf",
      url: urlFactory.getJournalArticlePath('investment-management', 'luxembourg-well-informed-investor'),
      pdfUrl: "/articles/luxembourg-well-informed-investor.pdf",
      status: "published",
      views: 0,
      downloads: 0,
      featured: true,
      category: "journal"
    }
  ];

  const getArticleUrl = (article) => {
    return urlFactory.getJournalArticlePath('investment-management', article.id);
  };

  const handleDownload = (pdfUrl) => {
    window.open(pdfUrl, '_blank');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterLoading(true);
    setRegisterError('');
    
    if (registerForm.password !== registerForm.confirmPassword) {
      setRegisterError('Passwords do not match');
      setRegisterLoading(false);
      return;
    }
    
    // Simulate registration
    setTimeout(() => {
      setRegisterLoading(false);
      setShowRegisterModal(false);
      // In real app, handle actual registration
    }, 1000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    
    // Simulate login
    setTimeout(() => {
      setLoginLoading(false);
      setShowRegisterModal(false);
      // In real app, handle actual login
    }, 1000);
  };

  const handleRegisterInput = (e) => {
    setRegisterForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLoginInput = (e) => {
    setLoginForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSocialAuth = (provider: 'google' | 'linkedin') => {
    // Handle social authentication - redirect to OAuth endpoint
    if (provider === 'google') {
      window.location.href = '/auth/google';
    } else if (provider === 'linkedin') {
      window.location.href = '/auth/linkedin';
    }
  };

  const journalCards = [
    {
      slug: 'investment-management',
      title: 'NewTIFI Investment Management Journal',
      subtitle: 'Peer-reviewed scholarship for investment funds and regulation.',
      description:
        'Focuses on fund structuring, fiduciary duty, regulatory change, tax policy, and operational governance.',
      plan: [
        'Finalize editorial governance and review policies.',
        'Publish full author guidelines and templates.',
        'Release metadata, archiving, and indexing roadmap.'
      ]
    },
    {
      slug: 'restructuring-insolvency-journal',
      title: 'NewTIFI Restructuring & Insolvency Journal',
      subtitle: 'Insolvency, restructuring, and recovery frameworks.',
      description:
        'Explores cross-border insolvency, creditor rights, restructurings, and recovery strategies in capital markets.',
      plan: [
        'Define scope, ISSN registration, and visual identity.',
        'Document review workflow and decision timelines.',
        'Prepare production, licensing, and preservation policy.'
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section with Value Proposition */}
      <section className="relative px-6 py-32 bg-gradient-to-br from-newtifi-navy via-newtifi-navy/95 to-newtifi-teal/20 text-white overflow-hidden">
        {/* Background Graphics */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-white/10 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-newtifi-teal/10 rounded-full"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 border border-white/10 transform rotate-45"></div>
        
        {/* Stencil-style decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path d="M20,20 L180,20 L180,180 L20,180 Z" stroke="white" strokeWidth="2" fill="none"/>
            <circle cx="100" cy="100" r="40" stroke="white" strokeWidth="2" fill="none"/>
            <path d="M60,100 L140,100 M100,60 L100,140" stroke="white" strokeWidth="2"/>
          </svg>
        </div>

        <div className="container mx-auto relative">
          <div className="w-full">
            <ScrollReveal>
              <h1 className="text-2xl md:text-2xl font-light mb-10">Publishing</h1>
              <div className="mb-10">
                <h2 className="text-2xl md:text-4xl lg:text-4xl font-extralight tracking-wider leading-tight uppercase">
                  Share Your <span className="text-newtifi-teal">Research</span>
                </h2>
              </div>
              <p className="text-base md:text-base leading-relaxed text-white/90 font-light">
                Submit your research to our peer-reviewed journals and contribute to advancing knowledge in technology and investment management.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* NewTIFI Publishing Overview */}
      <section className="w-full px-4 pt-6 pb-6 border-b border-gray-200">
        <div className="w-full mx-auto">
          <div className="bg-gradient-to-br from-newtifi-teal/10 to-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-4 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <div className="hidden md:block flex-shrink-0">
              <img
                src="/assets/images/Lux-Philharmonie.jpeg"
                alt="Luxembourg Philharmonie"
                className="w-48 h-96 object-cover rounded-2xl shadow-lg border border-gray-200"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-4xl font-extrabold text-newtifi-navy mb-2 leading-tight">NewTIFI Publishing</h1>
              <h2 className="text-base text-newtifi-teal font-semibold mb-4">Empowering knowledge & education for a sustainable future</h2>
              <p className="text-base text-gray-700 mb-3">
                NewTIFI Publishing is the scientific and editorial arm of the New Technologies & Investment Funds Institute, dedicated to advancing accessible, high-quality research and thought leadership across the fields of new technologies and finance.
              </p>
              <p className="text-base text-gray-700 mb-3">
                We publish peer-reviewed journals, practitioner-oriented reviews, academic articles, books, and interviews that explore the intersections of innovation, sustainability, and public policy.
              </p>
              <p className="text-base text-gray-700 mb-3">
                Our mission is to foster informed dialogue and bridge the gap between cutting-edge research and real-world decision-making. All publications are produced with academic integrity, intellectual independence, and an emphasis on clarity and impact.
              </p>
              <p className="text-base text-gray-700">
                Contrary to many publishing houses, NewTIFI operates as a non-profit. All profits realised by NewTIFI are used to fund Doctoral Scholarships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Tab Navigation */}
      <nav className="w-full max-w-6xl mx-auto flex flex-wrap gap-2 md:gap-4 px-4 pt-2 pb-2 mb-4" aria-label="Publishing Navigation">
        <button
          className={`px-6 py-3 rounded-xl font-semibold transition-all text-sm md:text-base whitespace-nowrap shadow-lg border ${
            selectedTab === 'journals' 
              ? 'bg-gradient-to-r from-newtifi-navy to-newtifi-teal text-white border-newtifi-navy shadow-xl' 
              : 'bg-white text-newtifi-navy border-gray-200 hover:border-newtifi-teal hover:shadow-xl hover:bg-gradient-to-r hover:from-newtifi-teal/5 hover:to-newtifi-navy/5'
          }`}
          onClick={() => { setSelectedTab('journals'); setSelectedArticle(null); }}
          aria-current={selectedTab === 'journals' ? 'page' : undefined}
        >
          Journals
        </button>
        <button
          className={`px-6 py-3 rounded-xl font-semibold transition-all text-sm md:text-base whitespace-nowrap shadow-lg border ${
            selectedTab === 'reviews' 
              ? 'bg-gradient-to-r from-newtifi-navy to-newtifi-teal text-white border-newtifi-navy shadow-xl' 
              : 'bg-white text-newtifi-navy border-gray-200 hover:border-newtifi-teal hover:shadow-xl hover:bg-gradient-to-r hover:from-newtifi-teal/5 hover:to-newtifi-navy/5'
          }`}
          onClick={() => { setSelectedTab('reviews'); setSelectedArticle(null); }}
          aria-current={selectedTab === 'reviews' ? 'page' : undefined}
        >
          Reviews
        </button>
        <button
          className={`px-6 py-3 rounded-xl font-semibold transition-all text-sm md:text-base whitespace-nowrap shadow-lg border ${
            selectedTab === 'articles' 
              ? 'bg-gradient-to-r from-newtifi-navy to-newtifi-teal text-white border-newtifi-navy shadow-xl' 
              : 'bg-white text-newtifi-navy border-gray-200 hover:border-newtifi-teal hover:shadow-xl hover:bg-gradient-to-r hover:from-newtifi-teal/5 hover:to-newtifi-navy/5'
          }`}
          onClick={() => { setSelectedTab('articles'); setSelectedArticle(null); }}
          aria-current={selectedTab === 'articles' ? 'page' : undefined}
        >
          Articles
        </button>
        <button
          className={`px-6 py-3 rounded-xl font-semibold transition-all text-sm md:text-base whitespace-nowrap shadow-lg border ${
            selectedTab === 'books' 
              ? 'bg-gradient-to-r from-newtifi-navy to-newtifi-teal text-white border-newtifi-navy shadow-xl' 
              : 'bg-white text-newtifi-navy border-gray-200 hover:border-newtifi-teal hover:shadow-xl hover:bg-gradient-to-r hover:from-newtifi-teal/5 hover:to-newtifi-navy/5'
          }`}
          onClick={() => { setSelectedTab('books'); setSelectedArticle(null); }}
          aria-current={selectedTab === 'books' ? 'page' : undefined}
        >
          Books
        </button>
        <button
          className={`px-6 py-3 rounded-xl font-semibold transition-all text-sm md:text-base whitespace-nowrap shadow-lg border ${
            selectedTab === 'interviews' 
              ? 'bg-gradient-to-r from-newtifi-navy to-newtifi-teal text-white border-newtifi-navy shadow-xl' 
              : 'bg-white text-newtifi-navy border-gray-200 hover:border-newtifi-teal hover:shadow-xl hover:bg-gradient-to-r hover:from-newtifi-teal/5 hover:to-newtifi-navy/5'
          }`}
          onClick={() => { setSelectedTab('interviews'); setSelectedArticle(null); }}
          aria-current={selectedTab === 'interviews' ? 'page' : undefined}
        >
          Interviews
        </button>
        <button
          className={`px-6 py-3 rounded-xl font-semibold transition-all text-sm md:text-base whitespace-nowrap shadow-lg border ${
            selectedTab === 'podcasts' 
              ? 'bg-gradient-to-r from-newtifi-navy to-newtifi-teal text-white border-newtifi-navy shadow-xl' 
              : 'bg-white text-newtifi-navy border-gray-200 hover:border-newtifi-teal hover:shadow-xl hover:bg-gradient-to-r hover:from-newtifi-teal/5 hover:to-newtifi-navy/5'
          }`}
          onClick={() => { setSelectedTab('podcasts'); setSelectedArticle(null); }}
          aria-current={selectedTab === 'podcasts' ? 'page' : undefined}
        >
          Podcasts
        </button>
      </nav>

      {/* Tab Content */}
      {selectedTab === 'journals' && (
        <section className="w-full bg-white py-8">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <h2 className="text-2xl md:text-4xl font-bold text-newtifi-navy mb-2">Journals Directory</h2>
              <div className="w-full h-1 bg-newtifi-navy rounded mb-4" />
              <h3 className="text-lg text-newtifi-teal font-semibold mb-6">Publishing programs and documentation roadmaps</h3>
              <p className="text-lg text-gray-800 mb-10 max-w-4xl">
                Explore each journal’s focus area and the planned documentation packages. Each journal
                will ship with complete submission rules, editorial policies, review workflow, and visual
                identity assets, aligned with NewTIFI Publishing standards.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {journalCards.map((journal) => (
                <div key={journal.slug} className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <BookOpen className="h-6 w-6 text-newtifi-teal" />
                    <h4 className="text-xl font-bold text-newtifi-navy">{journal.title}</h4>
                  </div>
                  <p className="text-sm text-newtifi-teal font-semibold mb-2">{journal.subtitle}</p>
                  <p className="text-sm text-gray-700 mb-4">{journal.description}</p>
                  <div className="mt-auto">
                    <h5 className="text-sm font-semibold text-newtifi-navy mb-3">Documentation Plan</h5>
                    <ul className="space-y-2 mb-6">
                      {journal.plan.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-newtifi-teal mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      className="w-full px-4 py-2 rounded-xl bg-newtifi-navy text-white hover:bg-newtifi-teal transition font-medium"
                      onClick={() => navigate(urlFactory.getJournalPath(journal.slug))}
                    >
                      View Journal
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {selectedTab === 'reviews' && (
        <section className="w-full bg-white py-8">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-newtifi-navy mb-2">Reviews</h2>
            <div className="w-full h-1 bg-newtifi-navy rounded mb-4" />
            <h3 className="text-lg text-newtifi-teal font-semibold mb-6">Reviews by NewTIFI Publishing</h3>
            <p className="text-lg text-gray-600">Reviews content coming soon.</p>
          </div>
        </section>
      )}

      {selectedTab === 'articles' && !selectedArticle && (
        <section className="w-full bg-white py-8">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-newtifi-navy mb-2">Articles</h2>
            <div className="w-full h-1 bg-newtifi-navy rounded mb-4" />
            <h3 className="text-lg text-newtifi-teal font-semibold mb-6">Featured Articles from NewTIFI Publishing</h3>
            
            {/* Combine static and database articles */}
            {loadingDbArticles ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-newtifi-navy mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading articles...</p>
              </div>
            ) : (
              [...articles, ...dbArticles].map((article, idx) => (
              <div key={idx} className="mb-8">
                <div
                  className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 cursor-pointer hover:border-newtifi-teal hover:shadow-3xl transition-all duration-300"
                  tabIndex={0}
                  role="button"
                  aria-label={`Read article: ${article.title}`}
                  onClick={() => navigate(getArticleUrl(article))}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(getArticleUrl(article)); }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-newtifi-navy mb-2 hover:underline cursor-pointer">{article.title}</h2>
                    <button
                      className="ml-4 p-2 rounded-xl hover:bg-newtifi-teal/10 transition-colors"
                      onClick={e => { e.stopPropagation(); setExpandedOverview(expandedOverview === idx ? null : idx); }}
                      aria-label={expandedOverview === idx ? 'Collapse preview' : 'Expand preview'}
                    >
                      {expandedOverview === idx ? <ChevronUp className="h-6 w-6 text-newtifi-teal" /> : <ChevronDown className="h-6 w-6 text-newtifi-teal" />}
                    </button>
                  </div>
                  
                  {/* Article Metadata */}
                  <div className="flex flex-wrap gap-6 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-newtifi-teal">DOI: {article.doi}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span>By {article.author}</span>
                    </div>
                    {article.source && (
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          article.source === 'contributor' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {article.source === 'contributor' ? 'Contributor' : 'Legacy'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Keywords */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.keywords?.map((keyword, kIdx) => (
                      <span key={kIdx} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>

                  {/* Abstract */}
                  <p className="text-gray-700 text-base mb-4 italic leading-relaxed">
                    {article.abstract}
                  </p>

                  <div className="mt-4 text-sm text-newtifi-teal font-medium">Click to read full article</div>
                </div>
              </div>
            ))
            )}
          </div>
        </section>
      )}

      {selectedTab === 'books' && (
        <section className="w-full bg-white py-8">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-newtifi-navy mb-2">Books</h2>
            <div className="w-full h-1 bg-newtifi-navy rounded mb-4" />
            <h3 className="text-lg text-newtifi-teal font-semibold mb-6">Books by NewTIFI Publishing</h3>
            <p className="text-lg text-gray-600">Books content coming soon.</p>
          </div>
        </section>
      )}

      {selectedTab === 'interviews' && (
        <section className="w-full bg-white py-8">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-newtifi-navy mb-2">Interviews</h2>
            <div className="w-full h-1 bg-newtifi-navy rounded mb-4" />
            <h3 className="text-lg text-newtifi-teal font-semibold mb-6">Interviews by NewTIFI Publishing</h3>
            <p className="text-lg text-gray-600">Interviews content coming soon.</p>
          </div>
        </section>
      )}

      {selectedTab === 'podcasts' && (
        <section className="w-full bg-white py-8">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-newtifi-navy mb-2">Podcasts</h2>
            <div className="w-full h-1 bg-newtifi-navy rounded mb-4" />
            <h3 className="text-lg text-newtifi-teal font-semibold mb-6">Podcasts by NewTIFI Publishing</h3>
            <p className="text-lg text-gray-600">Podcasts content coming soon.</p>
          </div>
        </section>
      )}

      {/* Latest Publications Preview - removed as requested */}

      {/* Submission Guidelines Section - At Bottom as Requested */}
      <section className="px-6 py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto w-full">
          <div className="w-full">
            <ScrollReveal>
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-4xl font-bold text-newtifi-navy mb-4">
                  How to Submit Your Research
                </h2>
                <p className="text-base text-gray-600 w-full">
                  Follow our comprehensive guidelines to ensure your submission meets our standards for quality and academic rigor.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-newtifi-navy to-newtifi-teal text-white p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Submission Guidelines</h3>
                      <p className="text-white/90">Complete guidelines for authors and contributors</p>
                    </div>
                    <button
                      onClick={downloadSubmissionRulesPDF}
                      className="flex items-center gap-2 px-6 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors font-medium"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </button>
                  </div>
                </div>

                {/* Official Documents */}
                <div className="p-6 space-y-6">
                  <div className="bg-white rounded-2xl shadow border border-gray-100 p-5">
                    <h4 className="text-base font-bold text-newtifi-navy mb-3">Official Documents</h4>
                    <ul className="divide-y divide-gray-100">
                      {[
                        { label: 'Rules for Submission – Investment Management Journal', filename: '2025.08.01_Rules for Submission – Investment Management Journal (1).docx' },
                        { label: 'Title Page Template – NewTIFI Investment Management Journal', filename: '2025.08.07_Title Page Template – NewTIFI Investment Management Journal.docx' },
                        { label: 'Manuscript Template – NewTIFI Investment Management Journal', filename: '2025.08.07_Manuscript Template – NewTIFI Investment Management Journal.docx' },
                        { label: 'Co‑Author Submission Approval Form – NewTIFI Investment Management Journal', filename: '2025.08.07_Co-Author Submission Approval Form – NewTIFI Investment Management Journal.docx' }
                      ].map((doc) => {
                        const encoded = encodeURIComponent(doc.filename);
                        const url = `/files/research-submissions/${encoded}`;
                        return (
                          <li key={doc.filename} className="py-3 flex items-center justify-between gap-3">
                            <div className="text-base text-gray-800">{doc.label}</div>
                            <a href={url} download className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-newtifi-navy text-white hover:bg-newtifi-teal hover:text-newtifi-navy transition font-medium">
                              <Download className="w-4 h-4"/> Download
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Submission Guidelines Summary */}
                  <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 space-y-4">
                    <h4 className="text-base font-bold text-newtifi-navy">Submission Guidelines Summary</h4>
                    <p className="text-base text-gray-800">Use English and choose either American or British conventions consistently across the Title Page and Manuscript. Ensure strict double‑blind compliance by removing all identifying information and embedded metadata from the Manuscript. Follow the official template for structure, headings, footnotes, defined terms and cross‑references, and include a concise abstract (150–250 words) with 3–12 ALL‑CAPS keywords separated by a dot.</p>
                    <p className="text-base text-gray-800">Prepare files separately: Title Page (PDF/Word) and Manuscript (PDF/Word, anonymised). Optional files include CV and Cover Letter. Where there are multiple authors, upload a signed Co‑Author Submission Approval for each co‑author using the provided template. File names must follow the convention YYYY.MM.DD_&lt;DocType&gt;_&lt;Article Title&gt; (for example: 2025.12.31_Title Page_My Article).</p>
                    <p className="text-base text-gray-800">Formatting rules: use the numbering table with single‑column rows and sequential paragraph numbers in parentheses, preserve page numbering layout, and apply Format Painter for consistency. Citations must follow OSCOLA or Bluebook with footnotes, including "last accessed" dates for URLs. Italicize Latin, and apply the specified rules for numbers, dates, units and currencies. Provide clear captions and correct formats for figures, tables and equations.</p>
                    <p className="text-base text-gray-800">Before submission, confirm the four required statements: the Manuscript is not under consideration elsewhere; you have read, accepted and complied with the Rules for Submission; you accept the Privacy Policy; and you accept the Rights and Licensing terms. A Manuscript ID will be generated on submit and a confirmation sent to your account email. For technical issues, contact imj.editorial@newtifi.com.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Anchor (kept to not break existing links) */}
      <div id="submission-guidelines" className="h-0" />
    </main>
  );
};

export default Publishing; 