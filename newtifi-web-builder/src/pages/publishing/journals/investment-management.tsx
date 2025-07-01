import React, { useState, useEffect } from "react";
import { Download, ArrowLeft, ChevronDown, ChevronUp, CheckCircle, Clock, Users, Archive, ExternalLink } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { getArticleById } from '../../../lib/urlMapping';

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

export default function InvestmentManagementJournal() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState<'journal' | 'articles' | 'editorial' | 'archiving'>('journal');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [expandedOverview, setExpandedOverview] = useState(null);
  const [expandedCriterion, setExpandedCriterion] = useState(null);
  const navigate = useNavigate();

  // Fetch articles from API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/articles');
        if (response.ok) {
          const data = await response.json();
          // Transform API data to match expected format
          const transformedArticles = data.map(article => ({
            filename: article.filename || article.pdfUrl?.split('/').pop() || '',
            url: article.pdfUrl || article.url || '',
            doi: article.doi || '',
            author: article.author || '',
            abstract: article.abstract || '',
            keywords: article.keywords || [],
            date: article.date || '',
            title: article.title || '',
            status: article.status || 'published'
          }));
          setArticles(transformedArticles);
        } else {
          console.warn('Failed to fetch articles, using fallback data');
          // Use fallback data if API fails
          const fallbackArticles = [
            {
              filename: "2025.06.28_NewTIFI Investment Management Journal - Closed-Ended Luxembourg ELTIFs- Compulsory Redemptions and Compartment Termination & Amalgamation Provisions_Final.pdf",
              url: "/articles/investment-management-journal/2025.06.28_NewTIFI Investment Management Journal - Closed-Ended Luxembourg ELTIFs- Compulsory Redemptions and Compartment Termination & Amalgamation Provisions_Final.pdf",
              doi: "10.1234/newtifi.2025.001",
              author: "Ezechiel Havrenne",
              abstract: "This article examines the legal and regulatory framework governing compulsory redemptions and compartment terminations in Luxembourg closed-ended ELTIFs.",
              keywords: ["ELTIFs", "Luxembourg", "Compulsory Redemptions", "Compartment Termination"]
            },
            {
              filename: "2025.06.28_NewTIFI Investment Management Journal - Investor Oversight or Undue Influence Reassessing BaFin's Stance on AIFM Portfolio Control_Final.pdf",
              url: "/articles/investment-management-journal/2025.06.28_NewTIFI Investment Management Journal - Investor Oversight or Undue Influence Reassessing BaFin's Stance on AIFM Portfolio Control_Final.pdf",
              doi: "10.1234/newtifi.2025.002",
              author: "Ezechiel Havrenne",
              abstract: "This article critically examines the March 2025 Draft Position Letter issued by BaFin on investor involvement in AIF portfolio decisions.",
              keywords: ["BaFin", "AIFM", "Portfolio Control", "Investor Oversight"]
            },
            {
              filename: "2025.06.28_NewTIFI Investment Management Journal - Luxembourg SICARs, SIFs and RAIFs - A 20-year Perspective on the Well-Informed Investor notion_Final.pdf",
              url: "/articles/investment-management-journal/2025.06.28_NewTIFI Investment Management Journal - Luxembourg SICARs, SIFs and RAIFs - A 20-year Perspective on the Well-Informed Investor notion_Final.pdf",
              doi: "10.1234/newtifi.2025.003",
              author: "Ezechiel Havrenne",
              abstract: "This article provides a comprehensive analysis of Luxembourg's Well-Informed Investor regime as applied to SICARs, SIFs, and RAIFs.",
              keywords: ["SICARs", "SIFs", "RAIFs", "Well-Informed Investor", "Luxembourg"]
            }
          ];
          setArticles(fallbackArticles);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError('Failed to load articles');
        // Use fallback data on error
        const fallbackArticles = [
          {
            filename: "2025.06.28_NewTIFI Investment Management Journal - Closed-Ended Luxembourg ELTIFs- Compulsory Redemptions and Compartment Termination & Amalgamation Provisions_Final.pdf",
            url: "/articles/investment-management-journal/2025.06.28_NewTIFI Investment Management Journal - Closed-Ended Luxembourg ELTIFs- Compulsory Redemptions and Compartment Termination & Amalgamation Provisions_Final.pdf",
            doi: "10.1234/newtifi.2025.001",
            author: "Ezechiel Havrenne",
            abstract: "This article examines the legal and regulatory framework governing compulsory redemptions and compartment terminations in Luxembourg closed-ended ELTIFs.",
            keywords: ["ELTIFs", "Luxembourg", "Compulsory Redemptions", "Compartment Termination"]
          },
          {
            filename: "2025.06.28_NewTIFI Investment Management Journal - Investor Oversight or Undue Influence Reassessing BaFin's Stance on AIFM Portfolio Control_Final.pdf",
            url: "/articles/investment-management-journal/2025.06.28_NewTIFI Investment Management Journal - Investor Oversight or Undue Influence Reassessing BaFin's Stance on AIFM Portfolio Control_Final.pdf",
            doi: "10.1234/newtifi.2025.002",
            author: "Ezechiel Havrenne",
            abstract: "This article critically examines the March 2025 Draft Position Letter issued by BaFin on investor involvement in AIF portfolio decisions.",
            keywords: ["BaFin", "AIFM", "Portfolio Control", "Investor Oversight"]
          },
          {
            filename: "2025.06.28_NewTIFI Investment Management Journal - Luxembourg SICARs, SIFs and RAIFs - A 20-year Perspective on the Well-Informed Investor notion_Final.pdf",
            url: "/articles/investment-management-journal/2025.06.28_NewTIFI Investment Management Journal - Luxembourg SICARs, SIFs and RAIFs - A 20-year Perspective on the Well-Informed Investor notion_Final.pdf",
            doi: "10.1234/newtifi.2025.003",
            author: "Ezechiel Havrenne",
            abstract: "This article provides a comprehensive analysis of Luxembourg's Well-Informed Investor regime as applied to SICARs, SIFs, and RAIFs.",
            keywords: ["SICARs", "SIFs", "RAIFs", "Well-Informed Investor", "Luxembourg"]
          }
        ];
        setArticles(fallbackArticles);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Sort articles by date descending (most recent first)
  const sortedArticles = articles
    .map(file => {
      const meta = parseArticleMeta(file.filename);
      // Custom overview for the specified article
      if (meta.title === "Investor Oversight or Undue Influence Reassessing BaFin's Stance on AIFM Portfolio Control") {
        meta.overview = '40';
      }
      return { ...meta, ...file, url: file.url, filename: file.filename };
    })
    .sort((a, b) => (b.date > a.date ? 1 : -1));

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
              <h1 className="text-3xl md:text-5xl font-extrabold text-newtifi-navy mb-2 leading-tight">New Technologies and Investment Fund Institute Publishing</h1>
              <p className="text-lg text-gray-700 mb-4">The NewTiFi Publishing platform curates peer-reviewed research, original articles, and thought leadership in investment management, financial technology, and sustainable finance. Our mission is to advance academic discourse and provide actionable insights for professionals, scholars, and policymakers worldwide.</p>
              <div className="text-base text-gray-600 mb-2">Featured Journal: <span className="font-semibold text-newtifi-navy">{journalMetadata.title}</span></div>
              <div className="text-base text-newtifi-navy font-semibold mb-2">Editor-in-Chief: <span className="font-bold">Ezechiel Havrenne</span></div>
              <div className="text-sm text-gray-500 mb-2">Volume 1, Issue 1 &mdash; June 2025</div>
              {/* ISSN Display */}
              <div className="text-sm text-newtifi-teal font-mono bg-gray-50 px-3 py-1 rounded inline-block mb-2">
                ISSN: {journalMetadata.issn}
              </div>
              <div className="text-base text-gray-700 mt-4">Explore our latest issues, in-depth articles, and expert perspectives below.</div>
            </div>
          </div>
        </div>
      </header>
      {/* Modern Tab Navigation */}
      <nav className="w-full border-b border-gray-200 bg-[#F5F7FA] py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-2 bg-white rounded-full shadow px-1 py-1 w-fit mx-auto overflow-x-auto">
            <button
              className={`px-4 py-2 rounded-full font-semibold transition-all text-sm md:text-base whitespace-nowrap ${selectedTab === 'journal' ? 'bg-newtifi-navy text-white shadow-md' : 'bg-transparent text-newtifi-navy hover:bg-newtifi-teal/10'}`}
              onClick={() => { setSelectedTab('journal'); setSelectedArticle(null); }}
              aria-current={selectedTab === 'journal' ? 'page' : undefined}
            >
              Journal Info
            </button>
            <button
              className={`px-4 py-2 rounded-full font-semibold transition-all text-sm md:text-base whitespace-nowrap ${selectedTab === 'articles' ? 'bg-newtifi-navy text-white shadow-md' : 'bg-transparent text-newtifi-navy hover:bg-newtifi-teal/10'}`}
              onClick={() => { setSelectedTab('articles'); setSelectedArticle(null); }}
              aria-current={selectedTab === 'articles' ? 'page' : undefined}
            >
              Articles
            </button>
            <button
              className={`px-4 py-2 rounded-full font-semibold transition-all text-sm md:text-base whitespace-nowrap ${selectedTab === 'editorial' ? 'bg-newtifi-navy text-white shadow-md' : 'bg-transparent text-newtifi-navy hover:bg-newtifi-teal/10'}`}
              onClick={() => { setSelectedTab('editorial'); setSelectedArticle(null); }}
              aria-current={selectedTab === 'editorial' ? 'page' : undefined}
            >
              Editorial Board
            </button>
            <button
              className={`px-4 py-2 rounded-full font-semibold transition-all text-sm md:text-base whitespace-nowrap ${selectedTab === 'archiving' ? 'bg-newtifi-navy text-white shadow-md' : 'bg-transparent text-newtifi-navy hover:bg-newtifi-teal/10'}`}
              onClick={() => { setSelectedTab('archiving'); setSelectedArticle(null); }}
              aria-current={selectedTab === 'archiving' ? 'page' : undefined}
            >
              Archiving
            </button>
          </div>
        </div>
      </nav>

      {/* Tab Content */}
      {selectedTab === 'journal' && (
        <section className="w-full bg-white py-8">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-semibold text-newtifi-navy mb-6">About the Journal</h2>
            
            {/* ISSN and Basic Info */}
            <div className="bg-gradient-to-r from-newtifi-teal/5 to-white rounded-xl p-6 border border-newtifi-teal/20 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-newtifi-navy mb-3">Journal Information</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-semibold">Title:</span> {journalMetadata.title}</div>
                    <div><span className="font-semibold">ISSN:</span> <span className="font-mono text-newtifi-teal">{journalMetadata.issn}</span></div>
                    <div><span className="font-semibold">Publisher:</span> {journalMetadata.publisher}</div>
                    <div><span className="font-semibold">Frequency:</span> {journalMetadata.frequency}</div>
                    <div><span className="font-semibold">Peer Review:</span> {journalMetadata.peerReviewStatus}</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-newtifi-navy mb-3">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-semibold">Editor-in-Chief:</span> Ezechiel Havrenne</div>
                    <div><span className="font-semibold">Email:</span> <a href="mailto:info@newtifi.com" className="text-newtifi-teal hover:underline">info@newtifi.com</a></div>
                    <div><span className="font-semibold">Location:</span> Luxembourg</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-newtifi-navy mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-newtifi-teal" />
                  Aims & Scope
                </h3>
                <p className="text-gray-700 text-sm">
                  Investment management, financial technology, sustainable finance, portfolio theory, fintech innovation, regulatory compliance, and European financial markets.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-newtifi-navy mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-newtifi-teal" />
                  Review Process
                </h3>
                <div className="text-sm text-gray-700 space-y-1">
                  <div><span className="font-semibold">Average Review Time:</span> {journalMetadata.reviewProcess.averageTime}</div>
                  <div><span className="font-semibold">Acceptance Rate:</span> {journalMetadata.reviewProcess.acceptanceRate}</div>
                  <div><span className="font-semibold">Review Type:</span> Double-blind</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-6">
              <h3 className="text-lg font-semibold text-newtifi-navy mb-3">Indexing & Abstracting</h3>
              <div className="flex flex-wrap gap-2">
                {journalMetadata.indexing.map((index, idx) => (
                  <span key={idx} className="bg-newtifi-teal/10 text-newtifi-navy px-3 py-1 rounded-full text-sm font-medium">
                    {index}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-center">
              <a href="mailto:info@newtifi.com" className="inline-block bg-newtifi-teal text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-newtifi-navy hover:text-white transition">
                Submit Request for Publication
              </a>
            </div>
          </div>
        </section>
      )}

      {selectedTab === 'editorial' && (
        <section className="w-full bg-white py-8">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-semibold text-newtifi-navy mb-6">Editorial Board</h2>
            
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

      {selectedTab === 'archiving' && (
        <section className="w-full bg-white py-8">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-semibold text-newtifi-navy mb-6">Digital Preservation & Archiving</h2>
            
            <div className="bg-gradient-to-r from-newtifi-teal/5 to-white rounded-xl p-6 border border-newtifi-teal/20 mb-6">
              <h3 className="text-lg font-semibold text-newtifi-navy mb-3">ISSN Compliance Statement</h3>
              <p className="text-gray-700 text-sm mb-4">
                As part of our commitment to ISSN compliance and academic publishing standards, NewTiFi implements comprehensive digital preservation strategies to ensure long-term accessibility and citation stability of all published content.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-newtifi-navy mb-3 flex items-center gap-2">
                  <Archive className="h-5 w-5 text-newtifi-teal" />
                  Archiving Policy
                </h3>
                <p className="text-gray-700 text-sm mb-4">
                  {journalMetadata.archivingPolicy}
                </p>
                <div className="space-y-2 text-sm">
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
                    <span>Institutional Repository</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-newtifi-navy mb-3 flex items-center gap-2">
                  <ExternalLink className="h-5 w-5 text-newtifi-teal" />
                  DOI Assignment
                </h3>
                <p className="text-gray-700 text-sm mb-4">
                  All articles are assigned Digital Object Identifiers (DOIs) for permanent citation and accessibility, meeting ISSN compliance requirements for persistent identification.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-newtifi-teal" />
                    <span>Permanent URLs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-newtifi-teal" />
                    <span>Version Control</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-newtifi-teal" />
                    <span>Citation Tracking</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-newtifi-teal/5 to-white rounded-xl p-6 border border-newtifi-teal/20">
              <h3 className="text-lg font-semibold text-newtifi-navy mb-4">ISSN Compliance: Long-term Preservation Strategy</h3>
              <p className="text-gray-700 text-sm mb-6">
                Our preservation strategy is designed to meet and exceed ISSN compliance requirements, ensuring that all published content remains accessible and citable for future generations of researchers and practitioners.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="w-12 h-12 bg-newtifi-navy rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h4 className="font-semibold text-newtifi-navy mb-1">Multiple Archives</h4>
                  <p className="text-gray-600">Redundant storage across multiple preservation systems to meet ISSN compliance standards</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-newtifi-navy rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h4 className="font-semibold text-newtifi-navy mb-1">Format Migration</h4>
                  <p className="text-gray-600">Regular format updates to ensure long-term accessibility per ISSN guidelines</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-newtifi-navy rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h4 className="font-semibold text-newtifi-navy mb-1">Access Control</h4>
                  <p className="text-gray-600">Maintained access rights and usage statistics for ISSN compliance reporting</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {selectedTab === 'articles' && !selectedArticle && (
        <section id="articles" className="max-w-4xl mx-auto px-4 pt-8">
          {sortedArticles.map((article, idx) => (
            <div key={idx} className="mb-6">
              <div
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 cursor-pointer hover:border-newtifi-teal transition"
                tabIndex={0}
                role="button"
                aria-label={`Read article: ${article.title}`}
                onClick={() => {
                  const mapping = getArticleById(article.id);
                  if (mapping) {
                    navigate(`/publishing/journals/investment-management/article/${mapping.slug}`);
                  } else {
                    navigate(`/publishing/journals/investment-management/article/${encodeURIComponent(article.filename)}`);
                  }
                }}
                onKeyDown={e => { 
                  if (e.key === 'Enter' || e.key === ' ') { 
                    const mapping = getArticleById(article.id);
                    if (mapping) {
                      navigate(`/publishing/journals/investment-management/article/${mapping.slug}`);
                    } else {
                      navigate(`/publishing/journals/investment-management/article/${encodeURIComponent(article.filename)}`);
                    }
                  } 
                }}
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
                      <iframe
                        src={article.url}
                        title={article.title}
                        className="w-full h-full border-0 rounded"
                        style={{ minHeight: '320px', height: '90%' }}
                      />
                    </div>
                  </div>
                )}
                <div className="mt-2 text-xs text-newtifi-teal truncate">Click to read full article</div>
              </div>
            </div>
          ))}
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
                {sortedArticles.map((article, idx) => (
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
              <a href={selectedArticle.url} target="_blank" rel="noopener noreferrer" download className="text-newtifi-teal hover:underline text-sm font-medium">Download PDF</a>
            </div>
            <iframe
              src={selectedArticle.url}
              title={selectedArticle.title}
              className="w-full min-h-[60vh] h-[70vh] border rounded"
            />
          </div>
        </section>
      )}

      {/* Latest Publications Preview */}
      <section className="max-w-6xl mx-auto px-4 pt-8">
        <h3 className="text-2xl font-bold text-newtifi-navy mb-6">Latest Publications</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedArticles.slice(0, 10).map((article, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 flex flex-col justify-between cursor-pointer hover:border-newtifi-teal hover:shadow-xl transition-all duration-300"
              onClick={() => {
                const mapping = getArticleById(article.id);
                if (mapping) {
                  navigate(`/publishing/journals/investment-management/article/${mapping.slug}`);
                } else {
                  navigate(`/publishing/journals/investment-management/article/${encodeURIComponent(article.filename)}`);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Read article: ${article.title}`}
              onKeyDown={e => { 
                if (e.key === 'Enter' || e.key === ' ') { 
                  const mapping = getArticleById(article.id);
                  if (mapping) {
                    navigate(`/publishing/journals/investment-management/article/${mapping.slug}`);
                  } else {
                    navigate(`/publishing/journals/investment-management/article/${encodeURIComponent(article.filename)}`);
                  }
                } 
              }}
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
                      {article.overview || article.abstract} This is a detailed preview. The article explores the subject in depth, providing comprehensive analysis and key findings. For the complete content, please see the full PDF.
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
        {sortedArticles.length > 10 && (
          <div className="text-center mt-8">
            <button
              className="bg-newtifi-navy text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-newtifi-teal transition-colors duration-300"
              onClick={() => setSelectedTab('articles')}
            >
              View All {sortedArticles.length} Articles
            </button>
          </div>
        )}
      </section>
    </main>
  );
} 