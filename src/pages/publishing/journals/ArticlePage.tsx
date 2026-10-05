import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Download, CheckCircle, Clock, Archive, Award, Eye } from "lucide-react";
import { urlFactory } from '@/lib/urls/UrlFactory';
import { buildApiUrl } from '@/lib/urls';
import Button from '@/components/Button';
import PageHero from '@/components/PageHero';
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
    journalSlug: "investment-management",
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
    journalSlug: "investment-management",
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
    journalSlug: "investment-management",
    status: "published" as const,
    views: 0,
    downloads: 0,
    featured: true,
    category: "journal" as const
  },
  {
    id: "compartment-insolvency-18625",
    title: "Compartment Insolvency in Luxembourg Investment Funds - Ruling 18625 and the Boundary Between Bankruptcy and Judicial Liquidation After the 2023 Reform",
    author: "Ezechiel Havrenne",
    date: "2026-01-15",
    doi: "10.1234/newtifi.2026.001",
    keywords: [
      "COMPARTMENT INSOLVENCY",
      "LUXEMBOURG FUNDS",
      "RULING 18625",
      "JUDICIAL LIQUIDATION"
    ],
    abstract: "This article analyzes compartment insolvency in Luxembourg investment funds after the 2023 reform, focusing on Ruling 18625 and the boundary between bankruptcy and judicial liquidation.",
    filename: "2026.1_NewTIFI Restructuring & Insolvency Journal - Compartment Insolvency in Luxembourg Investment Funds - Ruling 18625 and the Boundary Between Bankruptcy and Judicial Liquidation After the 2023 Reform.docx",
    url: "/publishing/restructuring-insolvency-journal/article/compartment-insolvency-18625",
    pdfUrl: `/files/restructuring-insolvency-journal/${encodeURIComponent("2026.1_NewTIFI Restructuring & Insolvency Journal - Compartment Insolvency in Luxembourg Investment Funds - Ruling 18625 and the Boundary Between Bankruptcy and Judicial Liquidation After the 2023 Reform.docx")}`,
    status: "published" as const,
    views: 0,
    downloads: 0,
    featured: true,
    category: "journal" as const,
    journalSlug: "restructuring-insolvency-journal",
    allowDownload: false
  },
  {
    id: "ipso-jure-dissolution-liquidation",
    title: "Ipso Jure Dissolution and Liquidation in Luxembourg Investment Funds - A Doctrinal Analysis of Civil Code and Product Fund Law Triggers",
    author: "Ezechiel Havrenne",
    date: "2026-02-01",
    doi: "10.1234/newtifi.2026.002",
    keywords: [
      "IPSO JURE DISSOLUTION",
      "LUXEMBOURG FUNDS",
      "CIVIL CODE",
      "PRODUCT FUND LAW"
    ],
    abstract: "This article studies ipso jure dissolution and liquidation triggers across Luxembourg fund regimes, comparing civil code doctrine with product fund law mechanisms.",
    filename: "2026.2_NewTIFI Restructuring & Bankruptcy Journal - Ipso Jure Dissolution and Liquidation in Luxembourg Investment Funds - A Doctrinal Analysis of Civil Code and Product Fund Law Triggers.docx",
    url: "/publishing/restructuring-insolvency-journal/article/ipso-jure-dissolution-liquidation",
    pdfUrl: `/files/restructuring-insolvency-journal/${encodeURIComponent("2026.2_NewTIFI Restructuring & Bankruptcy Journal - Ipso Jure Dissolution and Liquidation in Luxembourg Investment Funds - A Doctrinal Analysis of Civil Code and Product Fund Law Triggers.docx")}`,
    status: "published" as const,
    views: 0,
    downloads: 0,
    featured: true,
    category: "journal" as const,
    journalSlug: "restructuring-insolvency-journal",
    allowDownload: false
  },
  {
    id: "ruling-1019-architecture-liquidation",
    title: "Ruling 1019 and the Architecture of Liquidation in Luxembourg Investment Funds - CSSF Gatekeeping, General Company Law, and the RAIF Counter-Model",
    author: "Ezechiel Havrenne",
    date: "2026-03-01",
    doi: "10.1234/newtifi.2026.003",
    keywords: [
      "RULING 1019",
      "LIQUIDATION ARCHITECTURE",
      "CSSF GATEKEEPING",
      "RAIF COUNTER-MODEL"
    ],
    abstract: "This article examines Ruling 1019 and the liquidation architecture for Luxembourg investment funds, focusing on CSSF gatekeeping, general company law, and the RAIF counter-model.",
    filename: "2026.3_NewTIFI Restructuring & Insolvency Journal - Ruling 1019 and the Architecture of Liquidation in Luxembourg Investment Funds - CSSF Gatekeeping, General Company Law, and the RAIF Counter-Model.docx",
    url: "/publishing/restructuring-insolvency-journal/article/ruling-1019-architecture-liquidation",
    pdfUrl: `/files/restructuring-insolvency-journal/${encodeURIComponent("2026.3_NewTIFI Restructuring & Insolvency Journal - Ruling 1019 and the Architecture of Liquidation in Luxembourg Investment Funds - CSSF Gatekeeping, General Company Law, and the RAIF Counter-Model.docx")}`,
    status: "published" as const,
    views: 0,
    downloads: 0,
    featured: true,
    category: "journal" as const,
    journalSlug: "restructuring-insolvency-journal",
    allowDownload: false
  },
];

// Journal metadata for ISSN compliance
const journalProfiles = {
  'investment-management': {
    title: "NewTIFI Investment Management Journal",
    scope: "Investment management, fund structuring, regulatory change, and fiduciary governance.",
    expertiseTag: "Luxembourg Investment Fund Regulation Expert",
    metadata: {
      issn: "TBD",
      publisher: "New Technologies & Investment Funds Institute",
      publisherLocation: "Luxembourg",
      frequency: "Quarterly",
      peerReviewStatus: "Double-blind peer review",
      archivingPolicy: "Digital preservation through CLOCKSS and Portico"
    }
  },
  'restructuring-insolvency-journal': {
    title: "NewTIFI Restructuring & Insolvency Journal",
    scope: "Insolvency, restructuring, liquidation architecture, and recovery frameworks.",
    expertiseTag: "Insolvency & Restructuring Research",
    metadata: {
      issn: "TBD",
      publisher: "New Technologies & Investment Funds Institute",
      publisherLocation: "Luxembourg",
      frequency: "Quarterly",
      peerReviewStatus: "Double-blind peer review",
      archivingPolicy: "Digital preservation through CLOCKSS and Portico"
    }
  }
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
  journalSlug?: string;
  allowDownload?: boolean;
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
  const { slug, journalSlug } = useParams();
  const [articles, setArticles] = useState(staticArticles);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPdfPreview, setShowPdfPreview] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Helper to convert article ID to slug
  const idToSlug = (id: string): string => {
    const slugMap: Record<string, string> = {
      'IMJ-2025-001': 'eltifs-compulsory-redemptions',
      'IMJ-2025-002': 'bafin-portfolio-control',
      'IMJ-2025-003': 'luxembourg-well-informed-investor'
    };
    return slugMap[id] || id.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  };

  // Helper to convert slug to article ID
  const slugToId = (slug: string): string => {
    const idMap: Record<string, string> = {
      'eltifs-compulsory-redemptions': 'IMJ-2025-001',
      'bafin-portfolio-control': 'IMJ-2025-002',
      'luxembourg-well-informed-investor': 'IMJ-2025-003'
    };
    return idMap[slug] || slug;
  };

  // Helper to get correct PDF URL from article ID (paths must exist under public/articles/)
  const getPdfUrl = (articleId: string, apiPdfUrl?: string): string => {
    const pdfMap: Record<string, string> = {
      'IMJ-2025-001': '/articles/eltifs-compulsory-redemptions.pdf',
      'IMJ-2025-002': '/articles/bafin-aifm-portfolio-control.pdf',
      'IMJ-2025-003': '/articles/luxembourg-well-informed-investor.pdf'
    };
    if (pdfMap[articleId]) return pdfMap[articleId];
    if (apiPdfUrl && (apiPdfUrl.startsWith('/articles/') || apiPdfUrl.startsWith('/storage/'))) return apiPdfUrl;
    return `/articles/${idToSlug(articleId)}.pdf`;
  };

  // Load articles from API on mount, with static articles as fallback
  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        // Start with static articles immediately
        setArticles(staticArticles);
        
        // Try to load from API (non-blocking)
        try {
          const response = await fetch(buildApiUrl('/articles'), {
            method: 'GET',
            credentials: 'include',
            // Add timeout for production
            signal: AbortSignal.timeout(5000)
          });
          
          if (response.ok) {
            const apiArticles = await response.json();
            // Convert API format to ArticlePage format
            const convertedArticles = apiArticles.map((a: any) => ({
              id: idToSlug(a.id), // Use slug as ID for compatibility
              originalId: a.id, // Keep original ID
              title: a.title,
              author: a.author || 'Unknown Author',
              date: a.date || new Date().toISOString().split('T')[0],
              doi: a.doi || `10.1234/newtifi.${a.id}`,
              keywords: a.keywords || [],
              abstract: a.abstract || '',
              filename: a.filename || `${a.id}.pdf`,
              url: `/publishing/article/${idToSlug(a.id)}`,
              pdfUrl: getPdfUrl(a.id, a.pdfUrl || a.url), // Use correct PDF path
              status: a.status === 'published' ? 'published' as const : 'draft' as const,
              views: a.views || 0,
              downloads: a.downloads || 0,
              featured: a.featured || false,
              category: (a.category || 'journal') as 'journal' | 'news'
            }));
            
            // Merge with static articles (avoid duplicates by ID)
            const mergedArticles = [...staticArticles];
            convertedArticles.forEach(converted => {
              if (!mergedArticles.find(a => a.id === converted.id || a.id === converted.originalId)) {
                mergedArticles.push(converted);
              }
            });
            setArticles(mergedArticles);
          }
        } catch (apiErr) {
          // API failed, but we already have static articles loaded
          // This is fine - static articles will be used
        }
      } catch (err) {
        // If everything fails, at least we have static articles
        setArticles(staticArticles);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const oauthUser = localStorage.getItem('newtifi_user');
      const oauthAuth = localStorage.getItem('newtifi_auth');
      
      if (oauthUser && oauthAuth === 'true') {
        try {
          const userData = JSON.parse(oauthUser);
          setCurrentUser({
            id: userData.id || userData.email,
            email: userData.email,
            name: userData.name
          });
          setIsAuthenticated(true);
        } catch (err) {
          // Failed to parse user data - user not authenticated
          setIsAuthenticated(false);
        }
      }
    };

    checkAuth();
    
    // Listen for auth changes
    const handleAuthEvent = () => checkAuth();
    window.addEventListener('authStateChanged', handleAuthEvent);
    
    return () => {
      window.removeEventListener('authStateChanged', handleAuthEvent);
    };
  }, []);

  // Find the article by slug - try multiple methods
  let article = undefined;
  if (slug && articles.length > 0) {
    const decodedSlug = decodeURIComponent(slug);
    
    // Method 1: Find by ID/slug (most common) - check both id and originalId
    article = articles.find(a => 
      a.id === slug || 
      a.id === decodedSlug ||
      (a as any).originalId === slug ||
      (a as any).originalId === decodedSlug
    );
    
    // Method 2: Try slug to ID mapping
    if (!article) {
      const mappedId = slugToId(slug);
      article = articles.find(a => 
        a.id === mappedId || 
        (a as any).originalId === mappedId ||
        a.id === slug ||
        a.id === decodedSlug
      );
    }
    
    // Method 3: Find by filename (without extension)
    if (!article) {
      const slugWithoutExt = slug.replace(/\.pdf$/i, '');
      article = articles.find(a => {
        const filenameWithoutExt = a.filename?.replace(/\.pdf$/i, '');
        return filenameWithoutExt === slug || 
               filenameWithoutExt === decodedSlug ||
               filenameWithoutExt === slugWithoutExt;
      });
    }
    
    // Method 4: Find by URL path
    if (!article) {
      article = articles.find(a => 
        a.url === slug || 
        a.url === decodedSlug ||
        a.url?.includes(slug) ||
        a.url?.includes(decodedSlug)
      );
    }
    
    // Method 5: Fallback - check if slug matches any part of the article
    if (!article && slug) {
      article = articles.find(a => 
        a.id?.toLowerCase().includes(slug.toLowerCase()) ||
        a.title?.toLowerCase().includes(slug.toLowerCase())
      );
    }
  }

  const resolvedJournalSlug = journalSlug || article?.journalSlug || 'investment-management';
  const journalProfile = (journalProfiles as any)[resolvedJournalSlug] || journalProfiles['investment-management'];
  const journalMetadata = journalProfile.metadata;
  const isPdfAsset = article?.pdfUrl?.toLowerCase().endsWith('.pdf');
  const hasDownloadAsset = Boolean(article?.pdfUrl) && article?.allowDownload !== false;

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-white">
        <p className="text-sm text-gray-500">Loading</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <PageHero
        title="Article not found"
        lede="The article you're looking for doesn't exist or may have been moved."
        crumbs={[{ label: 'Publishing', to: urlFactory.getPublishingPath() }, { label: 'Article not found' }]}
      >
        <Button variant="inverse" to={urlFactory.getPublishingPath()}>
          Browse all articles
        </Button>
        <Link
          to="/"
          className="inline-flex h-11 items-center text-sm text-white underline decoration-newtifi-teal underline-offset-4 transition-colors duration-150 ease-out-strong fine:hover:decoration-white"
        >
          Go home
        </Link>
      </PageHero>
    );
  }

  const meta = { ...parseArticleMeta(article), authors: article.author };

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
    if (!article.pdfUrl || article.allowDownload === false) {
      return;
    }
    window.open(article.pdfUrl, '_blank');
  };

  const handlePdfPreview = () => {
    if (!isPdfAsset) {
      return;
    }
    setShowPdfPreview(true);
  };

  const sidebarLabel = 'text-sm text-gray-500';

  return (
    <div className="bg-white">
      <PageHero
        compact
        kicker={journalProfile.title}
        title={meta.title}
        titleClassName="text-2xl md:text-3xl lg:text-4xl"
        crumbs={[
          { label: 'Publishing', to: urlFactory.getPublishingPath() },
          { label: journalProfile.title, to: urlFactory.getJournalPath(resolvedJournalSlug) },
          { label: 'Article' },
        ]}
        lede={
          <>
            By {article.author} · Published {meta.date} · DOI {article.doi}
          </>
        }
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 grid gap-12 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <div>
              <h2 className="text-xl md:text-2xl text-newtifi-navy">Abstract</h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-700 text-pretty">{article.abstract}</p>
              <p className="mt-4 text-sm text-[#008f96]">{journalProfile.expertiseTag}</p>
            </div>

            {article.keywords && article.keywords.length > 0 && (
              <div>
                <h2 className="mb-4 text-base font-bold text-newtifi-navy">Keywords</h2>
                <ul className="flex flex-wrap gap-2">
                  {article.keywords.map((keyword) => (
                    <li key={keyword} className="rounded-md bg-gray-100 px-2.5 py-1 text-sm text-gray-700">
                      {keyword}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col gap-6 rounded-2xl bg-newtifi-navy p-6 text-white md:flex-row md:items-center md:justify-between md:p-8">
              <div>
                <h2 className="text-xl md:text-2xl">Access full article</h2>
                <p className="mt-2 text-sm text-white/80 text-pretty">
                  {isAuthenticated
                    ? `Access the complete research ${isPdfAsset ? 'paper in PDF format' : 'document'}`
                    : `Sign in to download or preview the complete research ${isPdfAsset ? 'paper' : 'document'}`}
                </p>
                {isAuthenticated && (
                  <p className="mt-2 text-sm text-white/60">Welcome back, {currentUser?.name || 'User'}!</p>
                )}
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handlePdfPreview}
                  disabled={!isPdfAsset}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-bold text-white ring-1 ring-inset ring-white/30 transition-[box-shadow,transform] duration-150 ease-out-strong active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100 motion-reduce:transition-none fine:hover:ring-white/60"
                >
                  <Eye className="h-4 w-4" aria-hidden="true" />
                  Preview PDF
                </button>
                <Button variant="inverse" onClick={handleDownload} disabled={!hasDownloadAsset}>
                  <Download className="h-4 w-4" aria-hidden="true" />
                  {isAuthenticated ? (isPdfAsset ? 'Download PDF' : 'Download document') : 'Sign in to download'}
                </Button>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="surface-card p-6">
              <h2 className="mb-4 text-base font-bold text-newtifi-navy">Journal information</h2>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className={sidebarLabel}>Title</dt>
                  <dd className="text-gray-800">{journalMetadata.title}</dd>
                </div>
                <div>
                  <dt className={sidebarLabel}>ISSN</dt>
                  <dd className="text-gray-800">{journalMetadata.issn}</dd>
                </div>
                <div>
                  <dt className={sidebarLabel}>Publisher</dt>
                  <dd className="text-gray-800">{journalMetadata.publisher}</dd>
                </div>
                <div>
                  <dt className={sidebarLabel}>Frequency</dt>
                  <dd className="text-gray-800">{journalMetadata.frequency}</dd>
                </div>
              </dl>
            </div>

            <div className="surface-card p-6">
              <h2 className="mb-4 text-base font-bold text-newtifi-navy">Peer review status</h2>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 shrink-0 text-[#008f96]" aria-hidden="true" />
                  Double-blind peer review
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />
                  Review completed
                </li>
                <li className="flex items-center gap-2">
                  <Award className="h-4 w-4 shrink-0 text-[#008f96]" aria-hidden="true" />
                  Accepted for publication
                </li>
              </ul>
            </div>

            <div className="surface-card p-6">
              <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-newtifi-navy">
                <Archive className="h-4 w-4 text-[#008f96]" aria-hidden="true" />
                Archiving and preservation
              </h2>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 shrink-0 text-[#008f96]" aria-hidden="true" />
                  CLOCKSS Archive
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 shrink-0 text-[#008f96]" aria-hidden="true" />
                  Portico Digital Archive
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 shrink-0 text-[#008f96]" aria-hidden="true" />
                  Permanent DOI
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

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

      <AuthModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleAuthSuccess}
        mode="login"
      />
    </div>
  );
}
