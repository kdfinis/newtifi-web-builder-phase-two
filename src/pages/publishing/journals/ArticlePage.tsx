import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, CheckCircle, Clock, ExternalLink, Archive, ChevronDown, ChevronUp, User, Calendar, FileText, Award, Globe, BookOpen, Mail, Phone, MapPin, Sparkles, Target, Rocket, Users, Shield, Zap, Star, Quote, Eye, FileText as FileTextIcon, ArrowUpRight } from "lucide-react";
import ScrollReveal from '@/components/ScrollReveal';
import PDFPreview from '@/components/PDFPreview';
import AuthModal from '@/components/AuthModal';


// Static articles data - replace API calls
const staticArticles = [
  {
    id: "eltifs-compulsory-redemptions",
    title: "Closed-Ended Luxembourg ELTIFs: Compulsory Redemptions and Compartment Termination & Amalgamation Provisions",
    author: "Ezechiel Havrenne",
    date: "2025-06-28",
    doi: "10.1234/newtifi.2025.001",
    keywords: [
      "LUXEMBOURG CLOSED-ENDED ELTIFs",
      "COMPULSORY REDEMPTION",
      "INVESTOR PROTECTION",
      "DISTRIBUTION MECHANISMS",
      "FUND LIQUIDITY MANAGEMENT",
      "TERMINATION & AMALGAMATION OF COMPARTMENTS",
      "CAPITAL REDUCTION",
      "REDEMPTION CLAUSES",
      "FUND DOCUMENTATION",
      "CSSF PRACTICE"
    ],
    abstract: "This article examines the legal and regulatory framework governing compulsory redemptions and compartment terminations in Luxembourg closed-ended ELTIFs. Focusing on the interplay between EU law, Luxembourg product regimes, and CSSF practice, it analyses how these mechanisms enhance capital efficiency, support fund liquidity management, and ensure investor protection. The study clarifies the compatibility of redemption provisions with the closed-ended ELTIF model and outlines best practices for implementing termination and amalgamation clauses within fund documentation. It concludes that Luxembourg offers a coherent and operationally flexible platform for ELTIF structuring aligned with the evolving European regulatory landscape.",
    filename: "eltifs-compulsory-redemptions.pdf",
    url: "/articles/investment-management-journal/eltifs-compulsory-redemptions",
    pdfUrl: "/articles/eltifs-compulsory-redemptions.pdf",
    status: "published" as const,
    views: 0,
    downloads: 0,
    featured: true,
    category: "journal" as const
  },
  {
    id: "bafin-portfolio-control",
    title: "Investor Oversight or Undue Influence? Reassessing BaFin's Stance on AIFM Portfolio Control",
    author: "Ezechiel Havrenne",
    date: "2025-06-28",
    doi: "10.1234/newtifi.2025.002",
    keywords: [
      "AIFM DIRECTIVE",
      "REGULATORY DIVERGENCE",
      "AIFM DISCRETION",
      "INVESTOR INFLUENCE",
      "INVESTOR PROTECTION",
      "LPAC RIGHTS",
      "VETO MECHANISMS",
      "PORTFOLIO MANAGEMENT OVERSIGHT",
      "FIDUCIARY DUTIES",
      "RECORD-KEEPING OBLIGATIONS",
      "JOINT VENTURE VS AIF QUALIFICATION",
      "CAPTIVE FUNDS",
      "DAY-TO-DAY DISCRETION",
      "GOVERNANCE RIGHTS IN AIFS"
    ],
    abstract: "This article critically examines the March 2025 Draft Position Letter issued by BaFin on investor involvement in AIF portfolio decisions. While reaffirming the AIFM's exclusive mandate under the AIFMD, BaFin's strict stance on veto rights, LPAC involvement, and investor oversight diverges from more pragmatic regulatory approaches in other EU jurisdictions. Drawing on legal obligations under Articles 12 and 57 of the AIFMD and AIFMR, and contrasting interpretations by regulators such as the CSSF, this paper argues for a proportionate balance between investor protection and fund manager autonomy. The analysis underscores the need for regulatory alignment that recognises legitimate governance rights without undermining the structural integrity of the AIFM model.",
    filename: "bafin-aifm-portfolio-control.pdf",
    url: "/articles/investment-management-journal/bafin-portfolio-control",
    pdfUrl: "/articles/bafin-aifm-portfolio-control.pdf",
    status: "published" as const,
    views: 0,
    downloads: 0,
    featured: true,
    category: "journal" as const
  },
  {
    id: "luxembourg-well-informed-investor",
    title: "Luxembourg SICARs, SIFs, and RAIFs: A 20-year Perspective on the Well-Informed Investor Notion",
    author: "Ezechiel Havrenne",
    date: "2025-06-28",
    doi: "10.1234/newtifi.2025.003",
    keywords: [
      "SICAR",
      "SIF",
      "RAIF",
      "WELL-INFORMED INVESTOR",
      "INVESTOR CATEGORISATION",
      "INSTITUTIONAL INVESTORS",
      "PROFESSIONAL INVESTORS",
      "OPT-IN INVESTORS",
      "NOMINEE STRUCTURES",
      "SUBSCRIPTION ELIGIBILITY",
      "MINIMUM INVESTMENT THRESHOLD",
      "INVESTOR VERIFICATION",
      "AIFMD COMPLIANCE",
      "DPMA TEST",
      "REGULATORY RISK",
      "INVESTOR PROTECTION",
      "FUND GOVERNANCE",
      "LEGAL REMEDIES",
      "ASSESSMENT PROCEDURES",
      "CONTRACTUAL & CRIMINAL LIABILITY"
    ],
    abstract: "This article provides a comprehensive analysis of Luxembourg's \"Well-Informed Investor\" regime as applied to SICARs, SIFs, and RAIFs, tracing its legislative and regulatory evolution over the past two decades. It examines the classification criteria for eligible investors, including institutional, professional, and opt-in categories, and assesses the legal and operational implications of miscategorisation. Particular focus is given to the 2023 legislative reforms aligning Luxembourg with EU thresholds and verification standards. The article also explores the compliance duties of AIFMs, nominee structures, and the consequences of non-compliance under civil, regulatory, and criminal law, offering practitioners and academics a detailed guide to navigating investor eligibility in Luxembourg's private fund landscape.",
    filename: "luxembourg-well-informed-investor.pdf",
    url: "/articles/investment-management-journal/luxembourg-well-informed-investor",
    pdfUrl: "/articles/luxembourg-well-informed-investor.pdf",
    status: "published" as const,
    views: 0,
    downloads: 0,
    featured: true,
    category: "journal" as const
  }
];

// Journal metadata for ISSN compliance
const journalMetadata = {
  title: "NewTiFi Investment Management Journal",
  issn: "XXXX-XXXX", // Placeholder - needs to be registered with ISSN International Centre
  publisher: "New Technologies and Investment Fund Institute",
  publisherLocation: "Luxembourg",
  frequency: "Quarterly",
  peerReviewStatus: "Double-blind peer review",
  archivingPolicy: "Digital preservation through CLOCKSS and Portico"
};

// Submission rules and guidelines
const submissionRules = {
  generalGuidelines: [
    "Articles must be original, unpublished work not submitted elsewhere",
    "Manuscripts should be between 5,000-12,000 words",
    "All submissions must be in English",
    "Authors must follow the journal's citation and formatting guidelines",
    "Submissions must include an abstract (150-250 words) and keywords (5-10 terms)"
  ],
  formattingRequirements: [
    "Use Times New Roman, 12pt font, double-spaced",
    "Include page numbers and line numbers",
    "Use footnotes for citations (not endnotes)",
    "Include a title page with author information",
    "Provide separate files for main text, figures, and tables"
  ],
  peerReviewProcess: [
    "All submissions undergo double-blind peer review",
    "Review process typically takes 6-8 weeks",
    "Reviewers are selected based on expertise in the field",
    "Authors receive detailed feedback and revision suggestions",
    "Final acceptance is subject to editorial approval"
  ],
  ethicalGuidelines: [
    "Authors must disclose any conflicts of interest",
    "All sources must be properly cited and referenced",
    "Data and methodology must be transparent and reproducible",
    "Authors must obtain necessary permissions for copyrighted material",
    "Plagiarism and self-plagiarism are strictly prohibited"
  ],
  publicationTimeline: [
    "Initial submission review: 2-3 weeks",
    "Peer review process: 6-8 weeks",
    "Revision period: 4-6 weeks",
    "Final acceptance to publication: 2-4 weeks",
    "Total timeline: 4-6 months from submission to publication"
  ]
};

interface User {
  id: string;
  email: string;
  name?: string;
}

interface Article {
  id: string;
  title: string;
  author: string;
  authorPhoto?: string;
  authorBio?: string;
  authorCredentials?: string;
  authorEmail?: string;
  authorCompany?: string;
  authorCompanyLogo?: string;
  authorCompanyUrl?: string;
  date: string;
  doi: string;
  keywords: string[];
  abstract: string;
  filename: string;
  url: string;
  pdfUrl: string;
  status: 'draft' | 'published';
  views: number;
  downloads: number;
  featured: boolean;
  category: 'journal' | 'news';
  acceptanceDate?: string;
  reviewDate?: string;
  peerReviewStatus?: string;
}

// Parse article metadata from the article object
function parseArticleMeta(article) {
  return { 
    date: article.date, 
    title: article.title 
  };
}

export default function ArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [pdfOpen, setPdfOpen] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [form, setForm] = React.useState({ name: '', email: '' });
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [showDescription, setShowDescription] = React.useState(false);
  const [articles] = useState(staticArticles);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPdfPreview, setShowPdfPreview] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Find the article by slug or filename
  let article = undefined;
  if (slug && articles.length > 0) {
    console.log('Looking for article with slug:', slug);
    console.log('Available articles:', articles.map(a => ({ id: a.id, filename: a.filename })));
    
    // Try to find by ID first (slug might be the article ID)
    article = articles.find(a => a.id === slug);
    console.log('Article found by ID:', article ? 'YES' : 'NO');
    
    // Fallback: try to find by filename (backward compatibility)
    if (!article) {
      console.log('Trying filename fallback...');
      const decodedSlug = decodeURIComponent(slug);
      console.log('Decoded slug:', decodedSlug);
      
      article = articles.find(a => {
        const match = a.filename === decodedSlug || 
                     a.filename === slug ||
                     encodeURIComponent(a.filename) === slug ||
                     a.pdfUrl === decodedSlug ||
                     a.pdfUrl === slug ||
                     encodeURIComponent(a.pdfUrl) === slug;
        console.log(`Checking ${a.filename}: ${match ? 'MATCH' : 'no match'}`);
        return match;
      });
      console.log('Article found by filename fallback:', article ? 'YES' : 'NO');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-newtifi-teal mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-base mb-4">Article not found</p>
          <p className="text-gray-600 text-base mb-4">Slug: {slug}</p>
          <p className="text-gray-600 text-base mb-4">Decoded: {slug ? decodeURIComponent(slug) : 'undefined'}</p>
          
          {/* Debug info */}
          <div className="bg-gray-100 p-4 rounded mb-4 text-left max-w-2xl">
            <h3 className="font-bold mb-2">Debug Info:</h3>
            <p className="text-base mb-2">Available articles:</p>
            {articles.map((a, idx) => (
              <div key={idx} className="text-xs mb-2 p-2 bg-white rounded">
                <div><strong>ID:</strong> {a.id}</div>
                <div><strong>Filename:</strong> {a.filename}</div>
                <div><strong>Encoded filename:</strong> {encodeURIComponent(a.filename)}</div>
                <div><strong>URL:</strong> {a.url}</div>
              </div>
            ))}
          </div>
          
          <button
            onClick={() => navigate('/publishing')}
            className="bg-newtifi-navy text-white px-4 py-2 rounded hover:bg-newtifi-teal transition"
          >
            Back to Articles
          </button>
        </div>
      </div>
    );
  }

  const meta = { ...parseArticleMeta(article), authors: article.author };

  // Academic-style preview and description for each article
  const academicPreviews = {
    "2025.06.28_NewTIFI Investment Management Journal - Closed-Ended Luxembourg ELTIFs- Compulsory Redemptions and Compartment Termination & Amalgamation Provisions_Final.pdf": {
      preview: "This article offers a rigorous examination of the legal and operational frameworks governing compulsory redemptions and compartment terminations within Luxembourg ELTIFs. The authors contextualize these mechanisms within the broader European regulatory landscape, providing a nuanced critique of their implications for fund structure, investor protection, and market stability.",
      description: "Through a methodical analysis of statutory provisions and case studies, the article elucidates the practical challenges and strategic considerations faced by fund managers. The discussion is anchored in contemporary academic discourse, drawing parallels with analogous structures in alternative investment vehicles. The authors conclude by proposing best practices for aligning regulatory compliance with investor interests, thereby contributing to the ongoing evolution of Luxembourg's investment fund sector."
    },
    "2025.06.28_NewTIFI Investment Management Journal - Investor Oversight or Undue Influence Reassessing BaFin's Stance on AIFM Portfolio Control_Final.pdf": {
      preview: "This scholarly work interrogates BaFin's evolving position on AIFM portfolio control, dissecting the delicate balance between legitimate investor oversight and the risk of undue influence. The article situates the debate within the context of European financial governance, offering a critical perspective on regulatory intent and market practice.",
      description: "Employing a comparative methodology, the authors analyze regulatory pronouncements, enforcement actions, and market responses. The article advances the academic conversation by highlighting the tension between investor empowerment and the preservation of independent portfolio management. Recommendations are articulated for policymakers and practitioners seeking to navigate this complex regulatory terrain."
    },
    "2025.06.28_NewTIFI Investment Management Journal - Luxembourg SICARs, SIFs and RAIFs - A 20-year Perspective on the Well-Informed Investor notion_Final.pdf": {
      preview: "Marking two decades of the 'well-informed investor' concept, this article provides a critical retrospective on its evolution within Luxembourg SICARs, SIFs, and RAIFs. The authors employ an interdisciplinary lens, blending legal analysis with market data to assess the efficacy and limitations of the notion in contemporary fund governance.",
      description: "The article synthesizes regulatory developments, jurisprudence, and empirical evidence to chart the trajectory of the well-informed investor standard. Through a scholarly critique, the authors identify persistent ambiguities and propose refinements to enhance investor protection and market efficiency. The work stands as a significant contribution to the literature on alternative investment fund regulation in Luxembourg."
    }
  };
  const academic = academicPreviews[article.filename];

  // Authentication handlers
  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    setShowLoginModal(false);
  };

  const handleDownload = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    window.open(article.pdfUrl, '_blank');
  };

  const handlePdfPreview = () => {
    setShowPdfPreview(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section with Background Graphics */}
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
          <div className="w-full mx-auto">
      {/* Breadcrumb navigation */}
            <nav className="mb-8 text-base text-white/80 flex items-center gap-2" aria-label="Breadcrumb">
              <a href="/" className="hover:text-white transition-colors">Home</a>
        <span className="mx-1">&gt;</span>
              <a href="/publishing" className="hover:text-white transition-colors">Articles</a>
        <span className="mx-1">&gt;</span>
              <span className="text-white font-semibold truncate" title={meta.title}>{meta.title}</span>
      </nav>

            <ScrollReveal>
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-newtifi-teal/20 text-newtifi-teal rounded-full text-base font-medium">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Investment Management Journal
                </div>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  {meta.title}
                </h1>
                <p className="text-base text-white/90 leading-relaxed w-full">
                  {article.abstract}
                </p>
                
                {/* Quick Stats */}
                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-newtifi-teal" />
                    <span className="text-white/80">Author: {article.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-newtifi-teal" />
                    <span className="text-white/80">Published: {meta.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-5 h-5 text-newtifi-teal" />
                    <span className="text-white/80">DOI: {article.doi}</span>
                  </div>
                </div>
            </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="px-6 py-20 bg-white">
        <div className="container mx-auto w-full">
          <div className="w-full mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content - 2 columns */}
              <div className="lg:col-span-2 space-y-12">
                {/* Article Header with Logo */}
                <ScrollReveal>
                  <div className="bg-gradient-to-br from-newtifi-teal/5 to-newtifi-navy/5 rounded-3xl p-8 border border-newtifi-teal/20">
                    <h2 className="text-2xl font-bold text-newtifi-navy mb-4">{article.title}</h2>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-newtifi-teal font-semibold text-base">By {article.author}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-600 text-base">{article.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-newtifi-teal font-medium">Luxembourg Investment Fund Regulation Expert</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-white/50 rounded-xl border border-newtifi-teal/20">
                      <p className="text-gray-700 leading-relaxed">
                        This research examines the legal and regulatory framework governing compulsory redemptions and compartment terminations in Luxembourg closed-ended ELTIFs, providing comprehensive analysis for practitioners and policymakers in the European investment fund landscape.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>



                {/* Keywords Section */}
                <ScrollReveal delay={200}>
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                    <h3 className="text-base font-bold text-newtifi-navy mb-6">Keywords</h3>
                    <div className="flex flex-wrap gap-2">
                {article.keywords?.map((keyword, kIdx) => (
                        <span key={kIdx} className="bg-newtifi-teal/10 text-newtifi-navy px-3 py-2 rounded-xl text-base font-medium border border-newtifi-teal/20">
                    {keyword}
                  </span>
                ))}
              </div>
                  </div>
                </ScrollReveal>

                {/* Academic Description */}
                <ScrollReveal delay={400}>
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-lg border border-gray-100">
                    <h3 className="text-2xl font-bold text-newtifi-navy mb-6">Academic Context</h3>
                    <div className="prose prose max-w-none">
                      <p className="text-gray-800 leading-relaxed mb-6 text-base">
                        {article.abstract}
                      </p>
                      <p className="text-gray-700 leading-relaxed text-base">
                        This research contributes to the broader academic discourse on {article.keywords?.slice(0, 3).join(', ').toLowerCase()} by providing comprehensive analysis and practical insights for practitioners and policymakers. The study addresses critical gaps in current understanding and offers evidence-based recommendations for regulatory compliance and operational best practices in the Luxembourg financial services sector.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Download Section */}
                <ScrollReveal delay={600}>
                  <div className="bg-gradient-to-br from-newtifi-navy to-newtifi-teal text-white rounded-3xl p-8 shadow-2xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Access Full Article</h3>
                        <p className="text-white/90">
                          {isAuthenticated 
                            ? 'Access the complete research paper in PDF format' 
                            : 'Sign in to download or preview the complete research paper'
                          }
                        </p>
                        {isAuthenticated && (
                          <p className="text-white/70 text-base mt-2">
                            Welcome back, {currentUser?.name || 'User'}!
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={handlePdfPreview}
                          className="bg-white/10 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center gap-2 border border-white/20"
                        >
                          <Eye className="w-4 h-4" />
                          Preview PDF
                        </button>
                        <button
                          onClick={handleDownload}
                          className="bg-white text-newtifi-navy px-6 py-3 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          {isAuthenticated ? 'Download PDF' : 'Sign In to Download'}
                        </button>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Sidebar - 1 column */}
              <div className="space-y-8">
                {/* Journal Info */}
                <ScrollReveal delay={200}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-base font-bold text-newtifi-navy mb-4">Journal Information</h3>
                    <div className="space-y-3 text-base">
                      <div>
                        <span className="font-semibold text-gray-700">Title:</span>
                        <p className="text-gray-600">{journalMetadata.title}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">ISSN:</span>
                        <p className="font-mono text-newtifi-teal">{journalMetadata.issn}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Publisher:</span>
                        <p className="text-gray-600">{journalMetadata.publisher}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Frequency:</span>
                        <p className="text-gray-600">{journalMetadata.frequency}</p>
            </div>
          </div>
        </div>
                </ScrollReveal>

                {/* Peer Review Info */}
                <ScrollReveal delay={400}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-base font-bold text-newtifi-navy mb-4">Peer Review Status</h3>
                    <div className="space-y-3 text-base">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-newtifi-teal" />
                        <span className="text-gray-700">Double-blind peer review</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-600">Review completed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-newtifi-teal" />
                        <span className="text-gray-700">Accepted for publication</span>
                      </div>
            </div>
          </div>
                </ScrollReveal>

                {/* Archiving Info */}
                <ScrollReveal delay={600}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-base font-bold text-newtifi-navy mb-4">
                      <Archive className="w-5 h-5 text-newtifi-teal inline mr-2" />
              Archiving & Preservation
            </h3>
                    <div className="space-y-3 text-base">
              <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-newtifi-teal" />
                        <span className="text-gray-700">CLOCKSS Archive</span>
              </div>
              <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-newtifi-teal" />
                        <span className="text-gray-700">Portico Digital Archive</span>
              </div>
              <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-newtifi-teal" />
                        <span className="text-gray-700">Permanent DOI</span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>


              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PDF Preview Modal */}
      {showPdfPreview && (
        <PDFPreview
          pdfUrl={article.pdfUrl}
          title={article.title}
          onClose={() => setShowPdfPreview(false)}
          onDownload={handleDownload}
          requireAuth={false}
          isAuthenticated={isAuthenticated}
          onLoginRequired={() => setShowLoginModal(true)}
        />
      )}

      {/* Authentication Modal */}
      <AuthModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleAuthSuccess}
        mode="login"
      />
    </main>
  );
} 