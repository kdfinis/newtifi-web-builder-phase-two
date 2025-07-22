import React, { useState, useEffect } from "react";
import { Download, ArrowLeft, ChevronDown, ChevronUp, CheckCircle, Clock, Users, Archive, ExternalLink } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { getArticleById } from "../../../lib/urlMapping";

// ISSN and Journal Metadata
const journalMetadata = {
  title: "NewTiFi Investment Management Journal",
  issn: "XXXX-XXXX", // Placeholder - needs to be registered with ISSN International Centre
  publisher: "New Technologies and Investment Fund Institute",
  publisherLocation: "Luxembourg",
  frequency: "Quarterly",
  peerReviewStatus: "Double-blind peer review",
  archivingPolicy: "Digital preservation through CLOCKSS and Portico",
  indexing: ["DOAJ", "Google Scholar", "ResearchGate"],
  editorialBoard: [
    { name: "Ezechiel Havrenne", role: "Editor-in-Chief", affiliation: "NewTiFi Institute" },
    { name: "Delphine Filsack", role: "Associate Editor", affiliation: "NewTiFi Institute" },
    { name: "Karlo Definis", role: "Managing Editor", affiliation: "NewTiFi Institute" }
  ],
  reviewProcess: {
    averageTime: "6-8 weeks",
    acceptanceRate: "15-20%",
    reviewCriteria: ["Originality", "Methodology", "Contribution to field", "Clarity of presentation"]
  }
};

// Add a mapping of descriptions for each article
const articleDescriptions = {
  "2025.06.28_NewTIFI Investment Management Journal - Closed-Ended Luxembourg ELTIFs- Compulsory Redemptions and Compartment Termination & Amalgamation Provisions_Final.pdf":
    "Through a methodical analysis of statutory provisions and case studies, the article elucidates the practical challenges and strategic considerations faced by fund managers. The discussion is anchored in contemporary academic discourse, drawing parallels with analogous structures in alternative investment vehicles. The authors conclude by proposing best practices for aligning regulatory compliance with investor interests, thereby contributing to the ongoing evolution of Luxembourg's investment fund sector.",
  // Add more descriptions as needed
};

// Add ISSN-compliant explanations for each review criterion
const reviewCriteriaExplanations = {
  Originality: 'The article must present <strong class="text-newtifi-navy font-medium">new insights, approaches, or findings</strong> that contribute to the advancement of knowledge in the field, in line with <span class="text-newtifi-teal font-medium">ISSN and NewTIFI standards</span> for academic innovation. This includes <strong class="text-newtifi-navy font-medium">novel theoretical frameworks</strong>, innovative methodologies, or unique applications of existing concepts to new contexts. The work should demonstrate a clear departure from previously published research, offering fresh perspectives on established topics or exploring uncharted areas within the <span class="text-newtifi-navy font-medium">investment management and financial regulation domain</span>. Originality is assessed through comprehensive literature reviews, ensuring the contribution is genuinely new rather than a rehash of existing work. The research should challenge conventional wisdom, propose alternative solutions, or provide deeper analysis of emerging trends in <span class="text-newtifi-navy font-medium">Luxembourg\'s financial sector</span>.',
  Methodology: 'The research design, data collection, and analysis methods must be <strong class="text-newtifi-navy font-medium">robust, transparent, and appropriate</strong> for the study objectives, ensuring reproducibility and compliance with <span class="text-newtifi-teal font-medium">international academic norms</span>. This encompasses rigorous research design principles, including clear research questions, appropriate sample selection, and systematic data collection procedures. The methodology should demonstrate <strong class="text-newtifi-navy font-medium">scientific rigor</strong> through proper statistical analysis, qualitative research frameworks, or legal research methodologies as applicable. <span class="text-newtifi-teal font-medium">Transparency is crucial</span>, with detailed descriptions of data sources, analytical techniques, and potential limitations. The approach must be replicable by other researchers, with sufficient detail provided to allow independent verification of findings. Methodological choices should be justified in relation to the research objectives and aligned with <span class="text-newtifi-teal font-medium">best practices in financial and legal research</span>.',
  'Contribution to field': 'The work should clearly articulate its impact on the discipline, addressing gaps in the literature and aligning with the mission of <span class="text-newtifi-teal font-medium">NewTIFI and ISSN requirements</span> for scholarly relevance. This involves demonstrating how the research advances understanding in <strong class="text-newtifi-navy font-medium">investment management, financial regulation, or related fields</strong>. The contribution may take various forms: <span class="text-newtifi-navy font-medium">theoretical development, empirical insights, policy implications, or practical applications</span> for industry professionals. The work should identify and address specific gaps in current knowledge, whether through new empirical evidence, theoretical synthesis, or critical analysis of existing frameworks. The research should have clear implications for <strong class="text-newtifi-navy font-medium">practitioners, policymakers, or academics</strong> working in Luxembourg\'s financial sector. The contribution should be substantial enough to warrant publication in a peer-reviewed journal and should advance the field\'s understanding of <span class="text-newtifi-navy font-medium">complex financial instruments, regulatory frameworks, or market dynamics</span>.',
  'Clarity of presentation': 'The manuscript must be <strong class="text-newtifi-navy font-medium">well-structured, logically organized, and written in clear, professional language</strong>, facilitating understanding and peer evaluation as per <span class="text-newtifi-teal font-medium">ISSN and AOA best practices</span>. This includes coherent argument development, logical flow between sections, and clear articulation of complex concepts. The writing should be accessible to the target audience while maintaining <span class="text-newtifi-teal font-medium">academic rigor and technical accuracy</span>. Visual elements such as tables, figures, and diagrams should be used effectively to enhance understanding. The abstract should provide a clear summary of the research, while the introduction should establish context and research objectives. Each section should build logically on previous sections, with <strong class="text-newtifi-navy font-medium">clear transitions and well-defined conclusions</strong>. Technical terminology should be defined appropriately, and complex legal or financial concepts should be explained in accessible terms. The overall presentation should reflect the <span class="text-newtifi-teal font-medium">professional standards expected in academic publishing</span>.'
};

function parseArticleMeta(filename) {
  // Example: 2025.06.28_NewTIFI Investment Management Journal - Article Title_Final.pdf
  const match = filename.match(/^(\d{4}\.\d{2}\.\d{2})_(.+?) - (.+?)_Final\.pdf$/);
  if (!match) return { date: '', title: filename };
  let date = match[1] ? match[1].replace(/\./g, '-') : '';
  let title = match[3] || filename;
  // Placeholder overview for now
  let overview = `This article provides an in-depth analysis of the topic: ${title}. For the full abstract, please see the PDF.`;
  return { date, title, overview };
}

// Static articles data - replace API calls
const staticArticles = [
  {
    id: "eltifs-compulsory-redemptions",
    title: "Closed-Ended Luxembourg ELTIFs: Compulsory Redemptions and Compartment Termination & Amalgamation Provisions",
    author: "Ezechiel Havrenne",
    date: "2025-06-28",
    doi: "10.1234/newtifi.2025.001",
    keywords: ["ELTIFs", "Luxembourg", "Compulsory Redemptions", "Compartment Termination"],
    abstract: "This article examines the legal and regulatory framework governing compulsory redemptions and compartment terminations in Luxembourg closed-ended ELTIFs.",
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
    keywords: ["BaFin", "AIFM", "Portfolio Control", "Investor Oversight"],
    abstract: "This article critically examines the March 2025 Draft Position Letter issued by BaFin on investor involvement in AIF portfolio decisions.",
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
    keywords: ["SICARs", "SIFs", "RAIFs", "Well-Informed Investor", "Luxembourg"],
    abstract: "This article provides a comprehensive analysis of Luxembourg's 'Well-Informed Investor' regime as applied to SICARs, SIFs, and RAIFs.",
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

export default function InvestmentManagementJournal() {
  const [articles] = useState(staticArticles);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Update the tab state and navigation labels
  const [selectedTab, setSelectedTab] = useState<'journals' | 'reviews' | 'articles' | 'books' | 'interviews' | 'podcasts'>('journals');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [expandedOverview, setExpandedOverview] = useState(null);
  const [expandedCriterion, setExpandedCriterion] = useState(null);
  const navigate = useNavigate();

  const [journalSubtab, setJournalSubtab] = React.useState<'committee' | 'abstracts' | 'technical'>('committee');
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [showRegisterModal, setShowRegisterModal] = React.useState(false);
  const [registerName, setRegisterName] = React.useState('');
  const [registerEmail, setRegisterEmail] = React.useState('');
  const [expandedAbstractIdx, setExpandedAbstractIdx] = React.useState<number | null>(null);
  const [showLogin, setShowLogin] = React.useState(false);
  const [registerForm, setRegisterForm] = React.useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [registerError, setRegisterError] = React.useState('');
  const [registerLoading, setRegisterLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [loginForm, setLoginForm] = React.useState({ email: '', password: '' });
  const [loginError, setLoginError] = React.useState('');
  const [loginLoading, setLoginLoading] = React.useState(false);

  // Check if user is logged in
  React.useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) setIsRegistered(true);
  }, []);

  const handleRegisterInput = (e) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({ ...prev, [name]: value }));
  };
  const handleLoginInput = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
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
    if (registerForm.password.length < 6) {
      setRegisterError('Password must be at least 6 characters long');
      setRegisterLoading(false);
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 500));
    if (registerForm.name && registerForm.email && registerForm.password) {
      localStorage.setItem('user', JSON.stringify({
        name: registerForm.name,
        email: registerForm.email,
        isLoggedIn: true
      }));
      setIsRegistered(true);
      setShowRegisterModal(false);
      setRegisterForm({ name: '', email: '', password: '', confirmPassword: '' });
    } else {
      setRegisterError('Please fill in all fields');
    }
    setRegisterLoading(false);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    await new Promise(resolve => setTimeout(resolve, 500));
    if (loginForm.email && loginForm.password) {
      // Accept any login for demo
      localStorage.setItem('user', JSON.stringify({
        email: loginForm.email,
        isLoggedIn: true
      }));
      setIsRegistered(true);
      setShowRegisterModal(false);
      setShowLogin(false);
      setLoginForm({ email: '', password: '' });
    } else {
      setLoginError('Please enter both email and password.');
    }
    setLoginLoading(false);
  };

  const handleDownload = (pdfUrl) => {
    if (!isRegistered) {
      setShowRegisterModal(true);
    } else {
      window.open(pdfUrl, '_blank');
    }
  };

  const handleSocialAuth = (provider) => {
    const user = {
      name: provider === 'google' ? 'Google User' : 'LinkedIn User',
      email: provider === 'google' ? 'user@gmail.com' : 'user@linkedin.com',
      isLoggedIn: true,
      provider
    };
    localStorage.setItem('user', JSON.stringify(user));
    setIsRegistered(true);
    setShowRegisterModal(false);
  };

  // Helper function to get the correct URL for an article
  function getArticleUrl(article) {
    return `/publishing/journals/investment-management/article/${article.id}`;
  }

  const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
      <g>
        <path d="M21.805 10.023h-9.765v3.954h5.617c-.242 1.25-1.484 3.672-5.617 3.672-3.375 0-6.125-2.797-6.125-6.25s2.75-6.25 6.125-6.25c1.922 0 3.219.766 3.969 1.422l2.719-2.641c-1.719-1.547-3.953-2.5-6.688-2.5-5.531 0-10 4.469-10 10s4.469 10 10 10c5.75 0 9.563-4.031 9.563-9.719 0-.656-.07-1.156-.156-1.609z" fill="#FBBB00"/>
        <path d="M3.152 7.548l3.25 2.391c.891-1.781 2.531-2.891 4.598-2.891 1.406 0 2.672.484 3.672 1.422l2.75-2.672c-1.719-1.547-3.953-2.5-6.688-2.5-3.906 0-7.188 2.672-8.406 6.25z" fill="#518EF8"/>
        <path d="M12 22c2.719 0 5.031-.891 6.719-2.422l-3.094-2.531c-.844.594-1.922.953-3.625.953-2.797 0-5.156-1.891-6.016-4.453l-3.25 2.516c1.5 3.047 4.719 5.437 9.266 5.437z" fill="#28B446"/>
        <path d="M21.805 10.023h-9.765v3.954h5.617c-.242 1.25-1.484 3.672-5.617 3.672-3.375 0-6.125-2.797-6.125-6.25s2.75-6.25 6.125-6.25c1.922 0 3.219.766 3.969 1.422l2.719-2.641c-1.719-1.547-3.953-2.5-6.688-2.5-5.531 0-10 4.469-10 10s4.469 10 10 10c5.75 0 9.563-4.031 9.563-9.719 0-.656-.07-1.156-.156-1.609z" fill="#F14336"/>
      </g>
    </svg>
  );
  const LinkedInLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#0077B5"/>
      <path d="M7.1 9.5H4.9V19H7.1V9.5ZM6 8.4C6.7 8.4 7.2 7.9 7.2 7.2C7.2 6.5 6.7 6 6 6C5.3 6 4.8 6.5 4.8 7.2C4.8 7.9 5.3 8.4 6 8.4ZM19 19H16.8V14.2C16.8 13.1 16.8 11.7 15.2 11.7C13.6 11.7 13.4 12.9 13.4 14.1V19H11.2V9.5H13.3V10.7H13.3C13.6 10.1 14.4 9.4 15.6 9.4C18.1 9.4 19 10.9 19 13.1V19Z" fill="white"/>
    </svg>
  );

  return (
    <main className="min-h-screen bg-white pb-20 font-sans">
      <div className="h-20 md:h-24" />
      {/* Header & Publishing Info */}
      <header className="w-full px-4 pt-6 pb-6 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-newtifi-teal/10 to-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-4 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            {/* Luxembourg Philharmonie Photo */}
            <div className="hidden md:block flex-shrink-0">
              <img src="/assets/images/Lux-Philharmonie.jpeg" alt="Luxembourg Philharmonie" className="w-48 h-96 object-cover rounded-2xl shadow-lg border border-gray-200" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-5xl font-extrabold text-newtifi-navy mb-2 leading-tight">NewTIFI Publishing</h1>
              <h2 className="text-lg text-newtifi-teal font-semibold mb-4">Empowering knowledge & education for a sustainable future</h2>
              <p className="text-lg text-gray-700 mb-3">
                NewTIFI Publishing is the scientific and editorial arm of the New Technologies & Investment Funds Institute, dedicated to advancing accessible, high-quality research and thought leadership across the fields of new technologies and finance.
              </p>
              <p className="text-lg text-gray-700 mb-3">
                We publish peer-reviewed journals, practitioner-oriented reviews, academic articles, books, and interviews that explore the intersections of innovation, sustainability, and public policy.
              </p>
              <p className="text-lg text-gray-700 mb-3">
                Our mission is to foster informed dialogue and bridge the gap between cutting-edge research and real-world decision-making. All publications are produced with academic integrity, intellectual independence, and an emphasis on clarity and impact.
              </p>
              <p className="text-lg text-gray-700">
                Contrary to many publishing houses, NewTIFI operates as a non-profit. All profits realised by NewTIFI are used to fund Doctoral Scholarships.
              </p>
            </div>
          </div>
        </div>
      </header>
      {/* Modern Tab Navigation */}
      <nav className="w-full max-w-6xl mx-auto flex flex-wrap gap-2 md:gap-4 px-4 pt-2 pb-2 border-b border-gray-200 mb-4" aria-label="Publishing Navigation">
        <button
          className={`px-4 py-2 rounded-full font-semibold transition-all text-sm md:text-base whitespace-nowrap ${selectedTab === 'journals' ? 'bg-newtifi-navy text-white shadow-md' : 'bg-transparent text-newtifi-navy hover:bg-newtifi-teal/10'}`}
          onClick={() => { setSelectedTab('journals'); setSelectedArticle(null); }}
          aria-current={selectedTab === 'journals' ? 'page' : undefined}
        >
          Journals
        </button>
            <button
          className={`px-4 py-2 rounded-full font-semibold transition-all text-sm md:text-base whitespace-nowrap ${selectedTab === 'reviews' ? 'bg-newtifi-navy text-white shadow-md' : 'bg-transparent text-newtifi-navy hover:bg-newtifi-teal/10'}`}
          onClick={() => { setSelectedTab('reviews'); setSelectedArticle(null); }}
          aria-current={selectedTab === 'reviews' ? 'page' : undefined}
        >
          Reviews
            </button>
            <button
              className={`px-4 py-2 rounded-full font-semibold transition-all text-sm md:text-base whitespace-nowrap ${selectedTab === 'articles' ? 'bg-newtifi-navy text-white shadow-md' : 'bg-transparent text-newtifi-navy hover:bg-newtifi-teal/10'}`}
              onClick={() => { setSelectedTab('articles'); setSelectedArticle(null); }}
              aria-current={selectedTab === 'articles' ? 'page' : undefined}
            >
              Articles
            </button>
            <button
          className={`px-4 py-2 rounded-full font-semibold transition-all text-sm md:text-base whitespace-nowrap ${selectedTab === 'books' ? 'bg-newtifi-navy text-white shadow-md' : 'bg-transparent text-newtifi-navy hover:bg-newtifi-teal/10'}`}
          onClick={() => { setSelectedTab('books'); setSelectedArticle(null); }}
          aria-current={selectedTab === 'books' ? 'page' : undefined}
        >
          Books
        </button>
        <button
          className={`px-4 py-2 rounded-full font-semibold transition-all text-sm md:text-base whitespace-nowrap ${selectedTab === 'interviews' ? 'bg-newtifi-navy text-white shadow-md' : 'bg-transparent text-newtifi-navy hover:bg-newtifi-teal/10'}`}
          onClick={() => { setSelectedTab('interviews'); setSelectedArticle(null); }}
          aria-current={selectedTab === 'interviews' ? 'page' : undefined}
        >
          Interviews
            </button>
            <button
          className={`px-4 py-2 rounded-full font-semibold transition-all text-sm md:text-base whitespace-nowrap ${selectedTab === 'podcasts' ? 'bg-newtifi-navy text-white shadow-md' : 'bg-transparent text-newtifi-navy hover:bg-newtifi-teal/10'}`}
          onClick={() => { setSelectedTab('podcasts'); setSelectedArticle(null); }}
          aria-current={selectedTab === 'podcasts' ? 'page' : undefined}
        >
          Podcasts
            </button>
      </nav>

      {/* Tab Content */}
      {selectedTab === 'journals' && (
        <section className="w-full bg-white py-8">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-newtifi-navy mb-2">Investment Management Journal</h2>
            <div className="w-full h-1 bg-newtifi-navy rounded mb-4" />
            <h3 className="text-lg text-newtifi-teal font-semibold mb-6">A Journal by NewTIFI Publishing</h3>
            <p className="text-lg text-gray-800 mb-4">
              The NewTIFI Publishing – Investment Management Journal is a peer-reviewed academic publication, dedicated to advancing rigorous scholarship and high-impact analysis in the field of investment management.
            </p>
            <p className="text-lg text-gray-800 mb-4">
              With a focus on legal, tax, regulatory, and operational dimensions, the journal brings together leading academics, practitioners, and policymakers to explore the evolving landscape of alternative investment funds. It covers topics such as fund structuring, asset management regulation, fiduciary duty, tax policy, compliance and risk management, and financial innovation.
            </p>
            <p className="text-lg text-gray-800 mb-4">
              Our mission is to foster intellectually independent and practically relevant research that informs the decisions of fund managers, investors, depositaries and central administrators, auditors, regulators, and courts worldwide.
            </p>
            <p className="text-lg text-gray-800 mb-4">
              The NewTIFI Publishing – Investment Management Journal welcomes original articles, case studies, and comparative analysis that contribute to a deeper understanding of global investment frameworks and the financial architecture shaping the future of capital markets.
            </p>
            <p className="text-lg text-gray-800 mb-4">
              As part of NewTIFI Publishing, the journal operates under a non-profit model.
            </p>
            <p className="text-lg text-gray-800">
              All profits realised by NewTIFI including through publication efforts are used to fund Doctoral Scholarships.
            </p>
            {/* Subtabs for Committee Members, Abstracts, Technical Information */}
            <div className="mt-10">
              <div className="flex gap-4 mb-6">
                <button
                  className={`px-4 py-2 rounded-full font-semibold transition-all text-sm md:text-base whitespace-nowrap ${journalSubtab === 'committee' ? 'bg-newtifi-navy text-white shadow-md' : 'bg-transparent text-newtifi-navy hover:bg-newtifi-teal/10'}`}
                  onClick={() => setJournalSubtab('committee')}
                >
                  Committee Members
                </button>
                <button
                  className={`px-4 py-2 rounded-full font-semibold transition-all text-sm md:text-base whitespace-nowrap ${journalSubtab === 'abstracts' ? 'bg-newtifi-navy text-white shadow-md' : 'bg-transparent text-newtifi-navy hover:bg-newtifi-teal/10'}`}
                  onClick={() => setJournalSubtab('abstracts')}
                >
                  Abstracts
                </button>
                <button
                  className={`px-4 py-2 rounded-full font-semibold transition-all text-sm md:text-base whitespace-nowrap ${journalSubtab === 'technical' ? 'bg-newtifi-navy text-white shadow-md' : 'bg-transparent text-newtifi-navy hover:bg-newtifi-teal/10'}`}
                  onClick={() => setJournalSubtab('technical')}
                >
                  Technical Information
                </button>
                </div>
                <div>
                {journalSubtab === 'committee' && (
                  <div className="text-gray-700 text-base">Committee Members content coming soon.</div>
                )}
                {journalSubtab === 'abstracts' && (
                  <div className="space-y-8">
                    {articles.slice(0, 3).map((article, idx) => {
                      // Example metadata for demonstration
                      const authorRole = idx === 0 ? 'Lecturer at the Luxembourg School of Business' : idx === 1 ? 'Legal Scholar' : 'Investment Funds Specialist';
                      const readingTime = idx === 0 ? '40 min' : idx === 1 ? '35 min' : '30 min';
                      const keywords = idx === 0
                        ? 'LUXEMBOURG CLOSED-ENDED ELTIFs · COMPULSORY REDEMPTION · INVESTOR PROTECTION · DISTRIBUTION MECHANISMS · FUND LIQUIDITY MANAGEMENT · TERMINATION & AMALGAMATION OF COMPARTMENTS · CAPITAL REDUCTION · REDEMPTION CLAUSES · FUND DOCUMENTATION · CSSF PRACTICE'
                        : idx === 1
                        ? 'WELL-INFORMED INVESTOR · LUXEMBOURG SICAR · SIF · RAIF · ALTERNATIVE FUNDS · INVESTOR PROTECTION · ELIGIBILITY · REGULATORY FRAMEWORK · CSSF PRACTICE'
                        : 'AIFM PORTFOLIO CONTROL · BAFIN · LUXEMBOURG FUNDS · INVESTOR OVERSIGHT · REGULATORY POLICY · PORTFOLIO MANAGEMENT';
                      const citation = idx === 0
                        ? `Ezechiel Havrenne, ‘Closed-Ended Luxembourg ELTIFs: Compulsory Redemption Matters and Compartment Termination & Amalgamation Provisions’, NewTIFI Publishing – Investment Management Journal, Vol. 1, N°4, pp.31-44, The New Technologies & Investment Funds Institute (2025)`
                        : idx === 1
                        ? `Ezechiel Havrenne, ‘Luxembourg SICARs, SIFs and RAIFs – A 20-year Perspective on the Well-Informed Investor notion’, NewTIFI Publishing – Investment Management Journal, Vol. 1, N°3, pp.21-30, The New Technologies & Investment Funds Institute (2025)`
                        : `Ezechiel Havrenne, ‘Investor Oversight or Undue Influence? Reassessing BaFin’s Stance on AIFM Portfolio Control’, NewTIFI Publishing – Investment Management Journal, Vol. 1, N°2, pp.11-20, The New Technologies & Investment Funds Institute (2025)`;
                      const journalInfo = idx === 0
                        ? 'Investment Management Journal | Vol. 1 – N° 4 – pp.31-44\nISSN: XXXX-XXXX – eISSN: XXXX-XXXX\nQuarterly publication'
                        : idx === 1
                        ? 'Investment Management Journal | Vol. 1 – N° 3 – pp.21-30\nISSN: XXXX-XXXX – eISSN: XXXX-XXXX\nQuarterly publication'
                        : 'Investment Management Journal | Vol. 1 – N° 2 – pp.11-20\nISSN: XXXX-XXXX – eISSN: XXXX-XXXX\nQuarterly publication';
                      return (
                        <div key={idx} className="bg-white rounded-xl shadow p-6 border border-gray-100">
                          <button
                            className="w-full text-left focus:outline-none"
                            onClick={() => setExpandedAbstractIdx(expandedAbstractIdx === idx ? null : idx)}
                            aria-expanded={expandedAbstractIdx === idx}
                          >
                            <div className="flex items-center justify-between">
                              <h4 className="text-2xl font-bold text-newtifi-navy mb-1">{article.title}</h4>
                              <span className="ml-4 text-newtifi-teal font-bold text-lg">{expandedAbstractIdx === idx ? '−' : '+'}</span>
                            </div>
                            <div className="text-gray-700 text-base mb-1">| {article.author} | {authorRole} | {readingTime}</div>
                          </button>
                          {expandedAbstractIdx === idx && (
                            <div className="mt-4">
                              <div className="mb-4">
                                <h5 className="text-lg font-semibold text-newtifi-navy mb-1">Abstract</h5>
                                <p className="text-gray-800 text-base italic mb-2" style={{ textAlign: 'justify' }}>{article.abstract}</p>
                              </div>
                              <div className="mb-2">
                                <span className="font-bold uppercase text-newtifi-navy">Key Words:</span>
                                <span className="ml-2 text-gray-700 text-sm">{keywords}</span>
                              </div>
                              <div className="mb-2 text-xs text-gray-600 italic">
                                <span className="font-bold text-newtifi-navy">Quick Citation Reference:</span> {citation}
                              </div>
                              <div className="mb-2 text-xs text-gray-600 whitespace-pre-line">{journalInfo}</div>
                              <button
                                className="mt-4 px-5 py-2 bg-newtifi-navy text-white rounded shadow hover:bg-newtifi-teal hover:text-newtifi-navy transition font-medium"
                                onClick={() => handleDownload(article.pdfUrl)}
                              >
                                Click here to download the PDF
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                    {/* Registration Modal */}
                    {showRegisterModal && (
                      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
                          {!showLogin ? (
                            <>
                              <h3 className="text-xl font-bold text-newtifi-navy mb-4">Create Account</h3>
                              <div className="flex flex-col gap-3 mb-4">
                                <button
                                  type="button"
                                  className="w-full flex items-center justify-center gap-2 border border-newtifi-teal rounded-lg py-2 px-4 text-newtifi-navy hover:bg-newtifi-teal hover:text-white transition-colors font-medium shadow-sm focus:ring-2 focus:ring-newtifi-navy"
                                  style={{ background: '#fff' }}
                                  onClick={() => handleSocialAuth('google')}
                                >
                                  <GoogleIcon /> Continue with Google
                                </button>
                                <button
                                  type="button"
                                  className="w-full flex items-center justify-center gap-2 border border-newtifi-navy rounded-lg py-2 px-4 text-newtifi-navy hover:bg-newtifi-navy hover:text-white transition-colors font-medium shadow-sm focus:ring-2 focus:ring-newtifi-navy"
                                  style={{ background: '#fff' }}
                                  onClick={() => handleSocialAuth('linkedin')}
                                >
                                  <LinkedInLogo /> Continue with LinkedIn
                                </button>
                                {localStorage.getItem('user') && (
                                  <div className="text-green-700 text-center mt-2 font-semibold w-full">Your Account (Logged in)</div>
                                )}
                              </div>
                              <form onSubmit={handleRegister} className="space-y-4">
                                <input
                                  type="text"
                                  name="name"
                                  placeholder="Full Name"
                                  value={registerForm.name}
                                  onChange={handleRegisterInput}
                                  className="w-full border border-gray-300 rounded px-4 py-2"
                                  required
                                />
                                <input
                                  type="email"
                                  name="email"
                                  placeholder="Email Address"
                                  value={registerForm.email}
                                  onChange={handleRegisterInput}
                                  className="w-full border border-gray-300 rounded px-4 py-2"
                                  required
                                />
                                <div className="relative">
                                  <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Password"
                                    value={registerForm.password}
                                    onChange={handleRegisterInput}
                                    className="w-full border border-gray-300 rounded px-4 py-2 pr-10"
                                    required
                                  />
                                  <button
                                    type="button"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                                    onClick={() => setShowPassword(v => !v)}
                                    tabIndex={-1}
                                  >
                                    {showPassword ? '🙈' : '👁️'}
                                  </button>
                                </div>
                                <div className="relative">
                                  <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={registerForm.confirmPassword}
                                    onChange={handleRegisterInput}
                                    className="w-full border border-gray-300 rounded px-4 py-2 pr-10"
                                    required
                                  />
                                  <button
                                    type="button"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                                    onClick={() => setShowConfirmPassword(v => !v)}
                                    tabIndex={-1}
                                  >
                                    {showConfirmPassword ? '🙈' : '👁️'}
                                  </button>
                  </div>
                                {registerError && <div className="text-red-600 text-sm">{registerError}</div>}
                                <button
                                  type="submit"
                                  className="w-full bg-newtifi-navy text-white py-2 rounded font-semibold hover:bg-newtifi-teal hover:text-newtifi-navy transition"
                                  disabled={registerLoading}
                                >
                                  {registerLoading ? 'Creating account...' : 'Create Account'}
                                </button>
                                <div className="text-center text-sm mt-2">
                                  Already have an account?{' '}
                                  <button type="button" className="text-newtifi-teal hover:text-newtifi-navy font-medium" onClick={() => setShowLogin(true)}>
                                    Sign in
                                  </button>
                </div>
                                <div className="text-xs text-gray-400 mt-2 text-center">
                                  By creating an account, you agree to our Terms of Service and Privacy Policy.
              </div>
                                <button
                                  type="button"
                                  className="w-full mt-2 text-sm text-gray-500 hover:text-newtifi-navy"
                                  onClick={() => setShowRegisterModal(false)}
                                >
                                  Cancel
                                </button>
                              </form>
                            </>
                          ) : (
                            <>
                              <h3 className="text-xl font-bold text-newtifi-navy mb-4">Sign In</h3>
                              <form onSubmit={handleLogin} className="space-y-4">
                                <input
                                  type="email"
                                  name="email"
                                  placeholder="Email Address"
                                  value={loginForm.email}
                                  onChange={handleLoginInput}
                                  className="w-full border border-gray-300 rounded px-4 py-2"
                                  required
                                />
                                <div className="relative">
                                  <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Password"
                                    value={loginForm.password}
                                    onChange={handleLoginInput}
                                    className="w-full border border-gray-300 rounded px-4 py-2 pr-10"
                                    required
                                  />
                                  <button
                                    type="button"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                                    onClick={() => setShowPassword(v => !v)}
                                    tabIndex={-1}
                                  >
                                    {showPassword ? '🙈' : '👁️'}
                                  </button>
            </div>
                                {loginError && <div className="text-red-600 text-sm">{loginError}</div>}
                                <button
                                  type="submit"
                                  className="w-full bg-newtifi-navy text-white py-2 rounded font-semibold hover:bg-newtifi-teal hover:text-newtifi-navy transition"
                                  disabled={loginLoading}
                                >
                                  {loginLoading ? 'Signing in...' : 'Sign In'}
                                </button>
                                <div className="text-center text-sm mt-2">
                                  Don&apos;t have an account?{' '}
                                  <button type="button" className="text-newtifi-teal hover:text-newtifi-navy font-medium" onClick={() => setShowLogin(false)}>
                                    Create one
                                  </button>
              </div>
                                <button
                                  type="button"
                                  className="w-full mt-2 text-sm text-gray-500 hover:text-newtifi-navy"
                                  onClick={() => setShowRegisterModal(false)}
                                >
                                  Cancel
                                </button>
                              </form>
                            </>
                          )}
                </div>
              </div>
                    )}
            </div>
                )}
                {journalSubtab === 'technical' && (
                  <div className="max-w-2xl mx-auto mt-6">
                    <table className="w-full border border-blue-200 text-left text-sm">
                      <tbody>
                        <tr className="bg-blue-100">
                          <td className="border border-blue-200 px-3 py-2 font-semibold">Publication Title</td>
                          <td className="border border-blue-200 px-3 py-2">NewTIFI Publishing – Investment Management Journal</td>
                        </tr>
                        <tr>
                          <td className="border border-blue-200 px-3 py-2 font-semibold bg-blue-100">e-ISSN</td>
                          <td className="border border-blue-200 px-3 py-2">XXXX-XXXX</td>
                        </tr>
                        <tr className="bg-blue-100">
                          <td className="border border-blue-200 px-3 py-2 font-semibold">Issues per Year</td>
                          <td className="border border-blue-200 px-3 py-2">4</td>
                        </tr>
                        <tr>
                          <td className="border border-blue-200 px-3 py-2 font-semibold bg-blue-100">Frequency</td>
                          <td className="border border-blue-200 px-3 py-2">Quarterly</td>
                        </tr>
                        <tr className="bg-blue-100">
                          <td className="border border-blue-200 px-3 py-2 font-semibold">Pages per Issue</td>
                          <td className="border border-blue-200 px-3 py-2">10-15</td>
                        </tr>
                        <tr>
                          <td className="border border-blue-200 px-3 py-2 font-semibold bg-blue-100">Format</td>
                          <td className="border border-blue-200 px-3 py-2">A4</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="mt-6 flex items-center gap-4">
                      <a
                        href="/assets/rules-for-submission.pdf"
                        download
                        className="inline-block bg-newtifi-navy text-white px-5 py-2 rounded shadow hover:bg-newtifi-teal hover:text-newtifi-navy transition font-medium"
                      >
                        Download Rules for Submission
                      </a>
                      <span className="text-xs text-gray-500">(PDF)</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {selectedTab === 'reviews' && (
        <section className="w-full bg-white py-8">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-newtifi-navy mb-2">Reviews</h2>
            <div className="w-full h-1 bg-newtifi-navy rounded mb-4" />
            <h3 className="text-lg text-newtifi-teal font-semibold mb-6">A Review Series by NewTIFI Publishing</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {journalMetadata.editorialBoard.map((member, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-newtifi-navy rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-newtifi-navy mb-1">{member.name}</h3>
                    <p className="text-newtifi-teal font-medium text-sm mb-2">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.affiliation}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-newtifi-teal/5 to-white rounded-xl p-6 border border-newtifi-teal/20">
              <h3 className="text-lg font-semibold text-newtifi-navy mb-4">Peer Review Process</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-newtifi-navy mb-2">Review Criteria</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {journalMetadata.reviewProcess.reviewCriteria.map((criterion, idx) => (
                      <li key={idx} className="flex flex-col gap-1">
                        <button
                          className="flex items-center gap-2 text-left w-full hover:text-newtifi-teal focus:outline-none"
                          onClick={() => setExpandedCriterion(expandedCriterion === idx ? null : idx)}
                          aria-expanded={expandedCriterion === idx}
                        >
                          {expandedCriterion === idx ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          <span>{criterion}</span>
                        </button>
                        {expandedCriterion === idx && (
                          <div className="ml-7 mt-2 text-xs text-gray-700 bg-gray-50 rounded-lg p-4 border border-newtifi-teal/30 shadow-sm">
                            <div 
                              dangerouslySetInnerHTML={{ __html: reviewCriteriaExplanations[criterion] }}
                              className="leading-relaxed font-light"
                            />
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-newtifi-navy mb-2">Review Timeline</h4>
                  <div className="text-sm text-gray-700 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-newtifi-teal rounded-full"></div>
                      <span>Initial Review: 2-3 weeks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-newtifi-navy rounded-full"></div>
                      <span>Peer Review: 4-6 weeks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      <span>Final Decision: 1-2 weeks</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {selectedTab === 'books' && (
        <section className="w-full bg-white py-8">
          <div className="max-w-6xl mx-auto px-4 text-gray-500 text-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-newtifi-navy mb-2">Books</h2>
            <div className="w-full h-1 bg-newtifi-navy rounded mb-4" />
            <h3 className="text-lg text-newtifi-teal font-semibold mb-6">Books by NewTIFI Publishing</h3>
            <p>Books content coming soon.</p>
            </div>
        </section>
      )}
      {selectedTab === 'interviews' && (
        <section className="w-full bg-white py-8">
          <div className="max-w-6xl mx-auto px-4 text-gray-500 text-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-newtifi-navy mb-2">Interviews</h2>
            <div className="w-full h-1 bg-newtifi-navy rounded mb-4" />
            <h3 className="text-lg text-newtifi-teal font-semibold mb-6">Interviews by NewTIFI Publishing</h3>
            <p>Interviews content coming soon.</p>
                  </div>
        </section>
      )}
      {selectedTab === 'podcasts' && (
        <section className="w-full bg-white py-8">
          <div className="max-w-6xl mx-auto px-4 text-gray-500 text-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-newtifi-navy mb-2">Podcasts</h2>
            <div className="w-full h-1 bg-newtifi-navy rounded mb-4" />
            <h3 className="text-lg text-newtifi-teal font-semibold mb-6">Podcasts by NewTIFI Publishing</h3>
            <p>Podcasts content coming soon.</p>
          </div>
        </section>
      )}

      {selectedTab === 'articles' && !selectedArticle && (
        <section className="w-full bg-white py-8">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-newtifi-navy mb-2">Articles</h2>
            <div className="w-full h-1 bg-newtifi-navy rounded mb-4" />
            <h3 className="text-lg text-newtifi-teal font-semibold mb-6">Featured Articles from NewTIFI Publishing</h3>
          {articles.map((article, idx) => (
            <div key={idx} className="mb-6">
              <div
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 cursor-pointer hover:border-newtifi-teal transition"
                tabIndex={0}
                role="button"
                aria-label={`Read article: ${article.title}`}
                onClick={() => navigate(getArticleUrl(article))}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(getArticleUrl(article)); }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold text-newtifi-navy mb-1 hover:underline cursor-pointer">{article.title}</h2>
                  <button
                    className="ml-2 p-1 rounded hover:bg-newtifi-teal/10"
                    onClick={e => { e.stopPropagation(); setExpandedOverview(expandedOverview === idx ? null : idx); }}
                    aria-label={expandedOverview === idx ? 'Collapse preview' : 'Expand preview'}
                  >
                    {expandedOverview === idx ? <ChevronUp className="h-5 w-5 text-newtifi-teal" /> : <ChevronDown className="h-5 w-5 text-newtifi-teal" />}
                  </button>
                </div>
                
                {/* Article Metadata */}
                <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-mono text-newtifi-teal">DOI: {article.doi}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <span>By {article.author}</span>
                  </div>
                </div>

                {/* Keywords */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {article.keywords?.map((keyword, kIdx) => (
                    <span key={kIdx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      {keyword}
                    </span>
                  ))}
                </div>

                {/* Abstract */}
                <p className="text-gray-700 text-sm mb-3 italic">
                  {article.abstract}
                </p>

                {expandedOverview === idx && (
                  <div className="mb-2">
                    <div className="w-full rounded border border-gray-200 bg-[#f5f7fa] overflow-hidden" style={{ height: '360px' }}>
                      {/* PDF Viewer */}
                      // Removed PDF viewer and download link
                    </div>
                  </div>
                )}
                <div className="mt-2 text-xs text-newtifi-teal truncate">Click to read full article</div>
              </div>
            </div>
          ))}
          </div>
        </section>
      )}

      {/* Article Reader Page */}
      {selectedTab === 'articles' && selectedArticle && (
        <section className="max-w-4xl mx-auto px-2 pt-8 flex flex-col md:flex-row gap-8">
          {/* Sidebar/Dropdown for navigation */}
          <aside className="md:w-64 w-full mb-4 md:mb-0">
            <div className="bg-white rounded-xl shadow p-4 border border-gray-100 mb-4">
              <div className="font-semibold text-newtifi-navy mb-2">Other Articles</div>
              <ul className="space-y-2">
                {articles.map((article, idx) => (
                  <li key={idx}>
                    <button
                      className={`w-full text-left px-2 py-1 rounded hover:bg-newtifi-teal/10 transition ${selectedArticle.filename === article.filename ? 'bg-newtifi-teal/10 font-bold text-newtifi-navy ring-2 ring-newtifi-teal' : 'text-newtifi-navy'}`}
                      onClick={() => setSelectedArticle(article)}
                      aria-current={selectedArticle.filename === article.filename ? 'page' : undefined}
                    >
                      <div className="truncate text-sm">{article.title}</div>
                      <div className="text-xs text-gray-500">{article.date}</div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <button
              className="w-full flex items-center gap-2 px-3 py-2 mt-2 bg-newtifi-navy text-white rounded shadow hover:bg-newtifi-teal hover:text-newtifi-navy transition font-medium"
              onClick={() => setSelectedArticle(null)}
              aria-label="Back to Articles"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Articles
            </button>
          </aside>
          {/* PDF Viewer */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-4 border border-gray-100 overflow-auto">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-newtifi-navy mb-1">{selectedArticle.title}</h2>
              <div className="text-gray-500 text-xs mb-2">{selectedArticle.date}</div>
            </div>
          </div>
        </section>
      )}

      {/* Latest Publications Preview */}
      <section className="max-w-6xl mx-auto px-4 pt-8">
        <h3 className="text-2xl font-bold text-newtifi-navy mb-6">Latest Publications</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {articles.slice(0, 10).map((article, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 flex flex-col justify-between cursor-pointer hover:border-newtifi-teal hover:shadow-xl transition-all duration-300"
              onClick={() => navigate(getArticleUrl(article))}
              tabIndex={0}
              role="button"
              aria-label={`Read article: ${article.title}`}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { navigate(getArticleUrl(article)); } }}
            >
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-newtifi-navy mb-2 line-clamp-3 leading-tight">{article.title}</h4>
                    <div className="text-xs text-gray-500 mb-2">{article.date}</div>
                    {article.author && (
                      <div className="text-xs text-gray-600 mb-2">By {article.author}</div>
                    )}
                  </div>
                  <button
                    className="ml-2 p-1 rounded hover:bg-newtifi-teal/10 flex-shrink-0"
                    onClick={e => { e.stopPropagation(); setExpandedOverview(expandedOverview === `preview-${idx}` ? null : `preview-${idx}`); }}
                    aria-label={expandedOverview === `preview-${idx}` ? 'Collapse overview' : 'Expand overview'}
                  >
                    {expandedOverview === `preview-${idx}` ? <ChevronUp className="h-4 w-4 text-newtifi-teal" /> : <ChevronDown className="h-4 w-4 text-newtifi-teal" />}
                  </button>
                </div>
                
                {/* Keywords */}
                {article.keywords && article.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {article.keywords.slice(0, 3).map((keyword, kIdx) => (
                      <span key={kIdx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        {keyword}
                      </span>
                    ))}
                    {article.keywords.length > 3 && (
                      <span className="text-xs text-gray-500">+{article.keywords.length - 3} more</span>
                    )}
                  </div>
                )}

                {/* Abstract preview */}
                {article.abstract && (
                  <p className="text-gray-700 text-xs mb-3 line-clamp-2 italic">
                    {article.abstract}
                  </p>
                )}

                {expandedOverview === `preview-${idx}` && (
                  <div className="mb-3">
                    <div className="text-gray-700 text-xs border-l-4 border-newtifi-teal pl-3 py-2 bg-[#f5f7fa] rounded">
                      {article.abstract} This is a detailed preview. The article explores the subject in depth, providing comprehensive analysis and key findings. For the complete content, please see the full PDF.
                    </div>
                  </div>
                )}
              </div>

              {/* Footer with DOI and read more */}
              <div className="mt-auto pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-newtifi-teal font-mono truncate flex-1">
                    {article.doi}
                  </div>
                  <div className="flex items-center gap-1 text-newtifi-teal text-xs font-medium">
                    <span>Read</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Show more articles button if there are more than 10 */}
        {articles.length > 10 && (
          <div className="text-center mt-8">
            <button
              className="bg-newtifi-navy text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-newtifi-teal transition-colors duration-300"
              onClick={() => setSelectedTab('articles')}
            >
              View All {articles.length} Articles
            </button>
          </div>
        )}
      </section>
    </main>
  );
} 