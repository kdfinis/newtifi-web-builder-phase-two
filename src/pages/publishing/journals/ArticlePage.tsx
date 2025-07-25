import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, CheckCircle, Clock, ExternalLink, Archive, ChevronDown } from "lucide-react";

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
    filename: "2025.06.28_NewTIFI Investment Management Journal - Closed-Ended Luxembourg ELTIFs- Compulsory Redemptions and Compartment Termination & Amalgamation Provisions_Final.pdf",
    url: "/articles/investment-management-journal/2025.06.28_NewTIFI Investment Management Journal - Closed-Ended Luxembourg ELTIFs- Compulsory Redemptions and Compartment Termination & Amalgamation Provisions_Final.pdf",
    pdfUrl: "/articles/2025.06.28_NewTIFI%20Investment%20Management%20Journal%20-%20Closed-Ended%20Luxembourg%20ELTIFs-%20Compulsory%20Redemptions%20and%20Compartment%20Termination%20&%20Amalgamation%20Provisions_Final.pdf",
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
    abstract: "This article critically examines the March 2025 Draft Position Letter issued by BaFin on investor involvement in AIF portfolio decisions. While reaffirming the AIFM’s exclusive mandate under the AIFMD, BaFin's strict stance on veto rights, LPAC involvement, and investor oversight diverges from more pragmatic regulatory approaches in other EU jurisdictions. Drawing on legal obligations under Articles 12 and 57 of the AIFMD and AIFMR, and contrasting interpretations by regulators such as the CSSF, this paper argues for a proportionate balance between investor protection and fund manager autonomy. The analysis underscores the need for regulatory alignment that recognises legitimate governance rights without undermining the structural integrity of the AIFM model.",
    filename: "2025.06.28_NewTIFI Investment Management Journal - Investor Oversight or Undue Influence Reassessing BaFin's Stance on AIFM Portfolio Control_Final.pdf",
    url: "/articles/investment-management-journal/2025.06.28_NewTIFI Investment Management Journal - Investor Oversight or Undue Influence Reassessing BaFin's Stance on AIFM Portfolio Control_Final.pdf",
    pdfUrl: "/articles/2025.06.28_NewTIFI%20Investment%20Management%20Journal%20-%20Investor%20Oversight%20or%20Undue%20Influence%20Reassessing%20BaFin's%20Stance%20on%20AIFM%20Portfolio%20Control_Final.pdf",
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
    abstract: "This article provides a comprehensive analysis of Luxembourg’s “Well-Informed Investor” regime as applied to SICARs, SIFs, and RAIFs, tracing its legislative and regulatory evolution over the past two decades. It examines the classification criteria for eligible investors, including institutional, professional, and opt-in categories, and assesses the legal and operational implications of miscategorisation. Particular focus is given to the 2023 legislative reforms aligning Luxembourg with EU thresholds and verification standards. The article also explores the compliance duties of AIFMs, nominee structures, and the consequences of non-compliance under civil, regulatory, and criminal law, offering practitioners and academics a detailed guide to navigating investor eligibility in Luxembourg’s private fund landscape.",
    filename: "2025.06.28_NewTIFI Investment Management Journal - Luxembourg SICARs, SIFs and RAIFs - A 20-year Perspective on the Well-Informed Investor notion_Final.pdf",
    url: "/articles/investment-management-journal/2025.06.28_NewTIFI Investment Management Journal - Luxembourg SICARs, SIFs and RAIFs - A 20-year Perspective on the Well-Informed Investor notion_Final.pdf",
    pdfUrl: "/articles/2025.06.28_NewTIFI%20Investment%20Management%20Journal%20-%20Luxembourg%20SICARs,%20SIFs%20and%20RAIFs%20-%20A%2020-year%20Perspective%20on%20the%20Well-Informed%20Investor%20notion_Final.pdf",
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

interface Article {
  id: string;
  title: string;
  author: string;
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

// This should match the logic in the main journal page
function parseArticleMeta(filename) {
  const match = filename.match(/^\(\d{4}\.\d{2}\.\d{2}\)_(.+?) - (.+?)_Final\.pdf$/);
  if (!match) return { date: '', title: filename };
  let date = match[1] ? match[1].replace(/\./g, '-') : '';
  let title = match[3] || filename;
  return { date, title };
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-newtifi-teal mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Article not found</p>
          <p className="text-gray-600 text-sm mb-4">Slug: {slug}</p>
          <p className="text-gray-600 text-sm mb-4">Decoded: {slug ? decodeURIComponent(slug) : 'undefined'}</p>
          
          {/* Debug info */}
          <div className="bg-gray-100 p-4 rounded mb-4 text-left max-w-2xl">
            <h3 className="font-bold mb-2">Debug Info:</h3>
            <p className="text-sm mb-2">Available articles:</p>
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
            onClick={() => navigate('/publishing/journals/investment-management')}
            className="bg-newtifi-navy text-white px-4 py-2 rounded hover:bg-newtifi-teal transition"
          >
            Back to Articles
          </button>
        </div>
      </div>
    );
  }

  const meta = { ...parseArticleMeta(article.filename), authors: article.author };

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

  return (
    <main className="min-h-screen bg-white pb-20 font-sans">
      <div className="h-20 md:h-24" />
      {/* Breadcrumb navigation */}
      <nav className="max-w-4xl mx-auto px-2 pt-2 pb-2 text-sm text-gray-500 flex items-center gap-2" aria-label="Breadcrumb">
        <a href="/" className="hover:underline text-gray-700">Home</a>
        <span className="mx-1">&gt;</span>
        <a href="/publishing/journals/investment-management" className="hover:underline text-gray-700">Articles</a>
        <span className="mx-1">&gt;</span>
        <span className="text-newtifi-navy font-semibold truncate" title={meta.title}>{meta.title}</span>
      </nav>
      <section className="max-w-4xl mx-auto px-2 pt-4 flex flex-col gap-8">
        <button
          className="flex items-center gap-2 px-3 py-2 mb-2 bg-newtifi-navy text-white rounded shadow hover:bg-newtifi-teal hover:text-newtifi-navy transition font-medium w-fit"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        
        {/* ISSN and Journal Info Banner */}
        <div className="bg-gradient-to-r from-newtifi-teal/5 to-white rounded-xl p-4 border border-newtifi-teal/20">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-newtifi-navy">{journalMetadata.title}</span>
              <span className="font-mono text-newtifi-teal">ISSN: {journalMetadata.issn}</span>
              <span className="text-gray-600">{journalMetadata.publisher}</span>
            </div>
          </div>
        </div>

        {/* Article Preview - Crest square with rounded corners, text wraps, title/author/date beside image, image 20% larger */}
        <div className="w-full bg-white rounded-2xl border border-gray-100 mb-2 shadow-2xl flex flex-col p-0" style={{ boxShadow: '0 0 48px 0 rgba(31, 38, 135, 0.18)' }}>
          <div className="flex flex-row gap-0 items-start p-8">
            {/* Crest/logo, square with rounded corners and navy background, 20% larger */}
            <div className="flex-shrink-0 flex items-start justify-center" style={{ minWidth: '8.4rem', minHeight: '8.4rem' }}>
              <div className="bg-newtifi-navy flex items-center justify-center rounded-xl" style={{ width: '8.4rem', height: '8.4rem', padding: '0.5rem' }}>
                <img src="/assets/images/logo.png" alt="NewTiFi Logo" className="w-full h-full object-contain rounded-xl bg-transparent" />
              </div>
            </div>
            {/* Title, author, date to the right, aligned */}
            <div className="flex-1 flex flex-col justify-start pl-8" style={{ minWidth: 0 }}>
              <h1 className="text-3xl md:text-4xl font-bold text-newtifi-navy mb-1 leading-tight break-words">{meta.title}</h1>
              <div className="text-gray-700 text-lg mb-1 font-serif">by {meta.authors}</div>
              <div className="text-newtifi-teal text-base mb-4 font-serif">Published: <span className="font-medium">{meta.date}</span></div>
              
              {/* DOI and Peer Review Status */}
              <div className="flex flex-wrap gap-4 mb-4 text-sm">
                <div className="flex items-center gap-1">
                  <ExternalLink className="h-4 w-4 text-newtifi-teal" />
                  <span className="font-mono text-newtifi-teal">DOI: {article.doi}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Accepted: {article.acceptanceDate}</span>
                </div>
              </div>

              {/* Keywords */}
              <div className="flex flex-wrap gap-1 mb-4">
                {article.keywords?.map((keyword, kIdx) => (
                  <span key={kIdx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                    {keyword}
                  </span>
                ))}
              </div>

              {/* Article Preview heading and text wraps around crest */}
              <div className="relative">
                <h2 className="text-xl font-semibold text-newtifi-navy mt-2 mb-1 font-serif">Abstract</h2>
                <p className="text-gray-800 text-base italic mb-2 font-serif" style={{ textAlign: 'justify' }}>{article.abstract}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Peer Review and Archiving Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-newtifi-navy mb-3">Peer Review Information</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div><span className="font-semibold">Status:</span> N/A</div>
              <div><span className="font-semibold">Review Date:</span> N/A</div>
              <div><span className="font-semibold">Acceptance Date:</span> N/A</div>
              <div><span className="font-semibold">Review Type:</span> N/A</div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-newtifi-navy mb-3">
              <Archive className="h-5 w-5 text-newtifi-teal" />
              Archiving & Preservation
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-newtifi-teal" />
                <span>CLOCKSS Archive</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-newtifi-teal" />
                <span>Portico Digital Archive</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-newtifi-teal" />
                <span>Permanent DOI: {article.doi}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Description - Academic style, bookish font, shaded and shadowed */}
        <article className="prose prose-lg max-w-none bg-white p-8 rounded-xl border border-gray-100 shadow font-serif" style={{ boxShadow: '0 4px 32px 0 rgba(31, 38, 135, 0.08)', background: 'linear-gradient(180deg, #f5f7fa 0%, #fff 100%)' }}>
          <h2 className="text-2xl text-newtifi-navy font-bold font-serif">Description</h2>
          <p className="text-gray-900 font-serif" style={{ textAlign: 'justify' }}>{academic?.description}</p>
        </article>
      </section>
    </main>
  );
} 