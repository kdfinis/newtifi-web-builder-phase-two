import React, { useEffect, useState } from 'react';
import { Heart, Zap, Leaf, DollarSign } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import Button from '@/components/Button';
import TechCard from '@/components/TechCard';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { getArticleById } from '@/lib/urlMapping';
import { urlFactory } from '@/lib/urls/UrlFactory';

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
  journalSlug?: string;
  status: 'draft' | 'published';
  views: number;
  downloads: number;
  featured: boolean;
  category: 'journal' | 'news';
}

const articlePreviewImages = [
  "/images/Investment-funds.jpg",
  "/images/Securitisation-vehicles.jpeg",
  "/images/fin-tech.jpg",
  "/images/network-meeting.jpg",
  "/images/health-tech.jpg",
  "/images/food-tech.jpg"
];

const scholarshipContent = [
  {
    title: 'Doctoral Scholarships',
    description: 'Supporting the next generation of innovators and researchers.',
    details: [
      'Secure funding for pioneering PhD research aligned with NewTIFI’s strategic focus in HealthTech, FoodTech, EnergyTech, and FinTech',
      'Connect with NewTIFI’s global network of leading experts, mentors, and industry practitioners',
      'Showcase their work at major international research and innovation conferences',
      'Disseminate findings through high-impact academic and professional publications',
      'Participate in the peer review process for articles submitted to leading journals'
    ]
  },
  {
    title: 'Mentorship Programs',
    description: 'Fostering growth through expert guidance and support.',
    details: [
      'One-on-one mentorship with accomplished leaders across NewTIFI’s focus areas',
      'Workshops and training sessions designed to build both soft and technical skills',
      'Strategic career guidance and access to a global professional network',
      'Full access to NewTIFI’s resource library, research tools, and expert content',
      'Pathways to continued collaboration with mentors and peers beyond the formal program'
    ]
  },
  {
    title: 'Internships',
    description: 'Providing for immersive and hands-on internships at NewTIFI allowing aspiring professionals to:',
    details: [
      'Contribute meaningfully to cutting-edge projects in HealthTech, FoodTech, EnergyTech, and FinTech',
      'Gain real-world experience alongside leading experts, innovators, and policy thinkers',
      'Develop professional and technical skills through structured mentorship and training',
      'Assist meaningfully in cross-disciplinary research and strategic initiatives that advance NewTIFI’s mission',
      'Build lasting connections and explore career paths within innovation, regulation, and impact-driven technology'
    ]
  },
];

const legalInsightContent = [
  {
    title: 'Expert Analysis',
    description: 'Comprehensive legal insights for technology and innovation.',
    details: [
      'In-depth analysis of emerging technology regulations',
      'Regular updates on legal frameworks affecting innovation',
      'Expert commentary on regulatory developments',
      'Case studies of successful regulatory navigation',
      'Practical guidance for compliance and risk management',
      'Strategic insights for technology implementation'
    ]
  },
  {
    title: 'Regulatory Support',
    description: 'Navigate complex regulatory landscapes with confidence.',
    details: [
      'Guidance on regulatory compliance in multiple jurisdictions',
      'Support for regulatory filings and applications',
      'Risk assessment and mitigation strategies',
      'Updates on changing regulatory requirements',
      'Access to regulatory expertise and resources',
      'Assistance with regulatory documentation'
    ]
  },
  {
    title: 'Policy Advocacy',
    description: 'Shaping the future of technology regulation.',
    details: [
      'Engagement with policymakers and regulators',
      'Participation in public consultations',
      'Development of position papers and recommendations',
      'Collaboration with industry stakeholders',
      'Advocacy for innovation-friendly policies',
      'Research on regulatory best practices'
    ]
  }
];

const insightsContent = [
  {
    title: 'Journals',
    subtext: 'Peer-reviewed academic publications featuring cutting-edge research and applied scholarship in both new technologies central to NewTIFI’s missions (i.e., FinTech, HealthTech, FoodTech, and EnergyTech) and finance (including investment funds, securitisation vehicles, pension funds and insurance products)',
    description: 'Advancing knowledge through rigorous, peer-reviewed academic publishing at the crossroads of innovation and finance. NewTIFI’s journals provide contributors and readers with opportunities to:',
    details: [
      'Publish original research in high-quality, peer-reviewed journals focused on new technologies and finance',
      'Engage in interdisciplinary dialogue across academia, policy, and industry',
      'Contribute to shaping emerging fields by addressing complex regulatory, technological, and market challenges',
      'Collaborate with leading researchers and experts through special issues and editorial initiatives',
      'Access and participate in the peer review process to uphold academic excellence and scholarly impact'
    ]
  },
  {
    title: 'Reviews',
    subtext: 'Practitioner-oriented insights delivered in an accessible format, modelled on leading thought-leadership platforms, translating research, case studies, and expert commentary into actionable perspectives for professionals, policymakers, and entrepreneurs',
    description: 'Bridging research and real-world application through practitioner-focused publications. NewTIFI’s reviews transform expert insights into actionable knowledge by enabling contributors and readers to:',
    details: [
      'Share applied perspectives on innovation and finance grounded in professional experience and case-based learning',
      'Translate academic research into practical strategies for entrepreneurs, investors, policymakers, and corporate leaders',
      'Contribute to a platform inspired by leading review-style publications, blending clarity with intellectual rigour',
      'Engage with cross-sector voices to explore how technology and finance intersect in shaping the future',
      'Access a curated body of thought leadership that informs decision-making and inspires responsible innovation'
    ]
  },
  {
    title: 'Advocacy',
    subtext: 'NewTIFI engages in non-partisan advocacy to support innovation-friendly regulation, sustainability, and responsible technology adoption, through position papers, regulatory consultations, and dialogue with public and private institutions',
    description: 'Promoting responsible innovation through constructive engagement with public and private stakeholders. NewTIFI’s advocacy efforts empower the ecosystem by enabling participants to:',
    details: [
      'Contribute to non-partisan policy dialogue on new technologies and financial innovation',
      'Participate in the development of position papers, consultation responses, and regulatory insights',
      'Engage with institutional partners to support innovation-friendly, transparent, and sustainable frameworks',
      'Help shape the ethical adoption of new technologies',
      'Join a collaborative platform that amplifies expert voices in service of long-term public interest'
    ]
  }
];

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
    filename: "eltifs-compulsory-redemptions.pdf",
    url: urlFactory.getJournalArticlePath('investment-management', 'eltifs-compulsory-redemptions'),
    journalSlug: "investment-management",
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
    keywords: ["BaFin", "AIFM", "Portfolio Control", "Investor Oversight"],
    abstract: "This article critically examines the March 2025 Draft Position Letter issued by BaFin on investor involvement in AIF portfolio decisions.",
    filename: "bafin-portfolio-control.pdf",
    url: urlFactory.getJournalArticlePath('investment-management', 'bafin-portfolio-control'),
    journalSlug: "investment-management",
    pdfUrl: "/articles/bafin-portfolio-control.pdf",
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
    filename: "luxembourg-well-informed-investor.pdf",
    url: urlFactory.getJournalArticlePath('investment-management', 'luxembourg-well-informed-investor'),
    journalSlug: "investment-management",
    pdfUrl: "/articles/luxembourg-well-informed-investor.pdf",
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
    keywords: ["Compartment Insolvency", "Ruling 18625", "Judicial Liquidation", "Luxembourg Funds"],
    abstract: "This article analyzes compartment insolvency in Luxembourg investment funds after the 2023 reform, focusing on Ruling 18625 and the boundary between bankruptcy and judicial liquidation.",
    filename: "2026.1_NewTIFI Restructuring & Insolvency Journal - Compartment Insolvency in Luxembourg Investment Funds - Ruling 18625 and the Boundary Between Bankruptcy and Judicial Liquidation After the 2023 Reform.docx",
    url: urlFactory.getJournalArticlePath('restructuring-insolvency-journal', 'compartment-insolvency-18625'),
    journalSlug: "restructuring-insolvency-journal",
    pdfUrl: `/files/restructuring-insolvency-journal/${encodeURIComponent("2026.1_NewTIFI Restructuring & Insolvency Journal - Compartment Insolvency in Luxembourg Investment Funds - Ruling 18625 and the Boundary Between Bankruptcy and Judicial Liquidation After the 2023 Reform.docx")}`,
    status: "published" as const,
    views: 0,
    downloads: 0,
    featured: true,
    category: "journal" as const
  },
  {
    id: "ipso-jure-dissolution-liquidation",
    title: "Ipso Jure Dissolution and Liquidation in Luxembourg Investment Funds - A Doctrinal Analysis of Civil Code and Product Fund Law Triggers",
    author: "Ezechiel Havrenne",
    date: "2026-02-01",
    doi: "10.1234/newtifi.2026.002",
    keywords: ["Ipso Jure Dissolution", "Civil Code", "Product Fund Law", "Luxembourg Funds"],
    abstract: "This article studies ipso jure dissolution and liquidation triggers across Luxembourg fund regimes, comparing civil code doctrine with product fund law mechanisms.",
    filename: "2026.2_NewTIFI Restructuring & Bankruptcy Journal - Ipso Jure Dissolution and Liquidation in Luxembourg Investment Funds - A Doctrinal Analysis of Civil Code and Product Fund Law Triggers.docx",
    url: urlFactory.getJournalArticlePath('restructuring-insolvency-journal', 'ipso-jure-dissolution-liquidation'),
    journalSlug: "restructuring-insolvency-journal",
    pdfUrl: `/files/restructuring-insolvency-journal/${encodeURIComponent("2026.2_NewTIFI Restructuring & Bankruptcy Journal - Ipso Jure Dissolution and Liquidation in Luxembourg Investment Funds - A Doctrinal Analysis of Civil Code and Product Fund Law Triggers.docx")}`,
    status: "published" as const,
    views: 0,
    downloads: 0,
    featured: true,
    category: "journal" as const
  },
  {
    id: "ruling-1019-architecture-liquidation",
    title: "Ruling 1019 and the Architecture of Liquidation in Luxembourg Investment Funds - CSSF Gatekeeping, General Company Law, and the RAIF Counter-Model",
    author: "Ezechiel Havrenne",
    date: "2026-03-01",
    doi: "10.1234/newtifi.2026.003",
    keywords: ["Ruling 1019", "CSSF Gatekeeping", "RAIF", "Liquidation Architecture"],
    abstract: "This article examines Ruling 1019 and the liquidation architecture for Luxembourg investment funds, focusing on CSSF gatekeeping, company law, and the RAIF counter-model.",
    filename: "2026.3_NewTIFI Restructuring & Insolvency Journal - Ruling 1019 and the Architecture of Liquidation in Luxembourg Investment Funds - CSSF Gatekeeping, General Company Law, and the RAIF Counter-Model.docx",
    url: urlFactory.getJournalArticlePath('restructuring-insolvency-journal', 'ruling-1019-architecture-liquidation'),
    journalSlug: "restructuring-insolvency-journal",
    pdfUrl: `/files/restructuring-insolvency-journal/${encodeURIComponent("2026.3_NewTIFI Restructuring & Insolvency Journal - Ruling 1019 and the Architecture of Liquidation in Luxembourg Investment Funds - CSSF Gatekeeping, General Company Law, and the RAIF Counter-Model.docx")}`,
    status: "published" as const,
    views: 0,
    downloads: 0,
    featured: true,
    category: "journal" as const
  }
];

// Helper function to get the correct URL for an article (permanent)
function getArticleUrl(article) {
  if (article.journalSlug) {
    return urlFactory.getJournalArticlePath(article.journalSlug, article.id);
  }
  return urlFactory.getArticlePermanentPath(article.id);
}

const Home = () => {
  const [articles] = useState(staticArticles);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Get featured articles
  const featuredArticles = articles.filter(article => article.featured);

  // Get latest published articles
  const latestArticles = articles
    .filter(article => article.status === 'published')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 2);

  // Intersection Observer setup for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.appear-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const [activeScholarship, setActiveScholarship] = useState(scholarshipContent[0].title);
  const [activeLegalInsight, setActiveLegalInsight] = useState(legalInsightContent[0].title);
  const [activeInsight, setActiveInsight] = useState('Journals');

  return (
    <main className="min-h-screen pb-20">
      {/* Our Journey Section */}
      <section className="px-6 py-16 sm:py-24 md:py-32 bg-newtifi-navy text-white">
        <div className="container mx-auto">
          <ScrollReveal direction="right" delay={100}>
            <h1 className="text-xl sm:text-2xl md:text-2xl font-light mb-6 sm:mb-10">For a Journey to a Better Tomorrow</h1>
            <div className="mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-extralight tracking-wider leading-tight">
                FOCUS RESEARCH<br />INNOVATE IMPLEMENT
              </h2>
            </div>
            <p className="text-sm sm:text-base md:text-base leading-relaxed text-white/90 font-light">
              Welcome to the hub where Scientific, Tech and Finance Professionals meet
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Hero Section with Overview and Featured Articles */}
      <section className="relative min-h-[60vh] sm:min-h-[75vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-white pb-0 mb-0">
        <div className="container mx-auto px-6 py-12 sm:py-16 md:py-20 pb-4 mb-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left side - New Technologies & Investment Funds Institute Overview */}
            <ScrollReveal direction="right" delay={100}>
              <div className="space-y-6 sm:space-y-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-newtifi-navy">
                  New Technologies & Investment Funds Institute
                </h1>
                <p className="text-base sm:text-lg md:text-2xl text-gray-700">
                  An institute dedicated to advancing technology innovation and fostering sustainable development through interdisciplinary collaboration.
                </p>
                <ul className="list-disc pl-5 sm:pl-6 space-y-3 text-gray-700 text-sm sm:text-base">
                  <li>Bridging technology and finance to drive sustainable, meaningful impact</li>
                  <li>Connecting researchers, innovators, policymakers, academics, and industry leaders</li>
                  <li>Supporting future talent through scholarships, internships, and mentorships</li>
                  <li>Delivering accessible education and insights to professionals and communities</li>
                  <li>Shaping policy through thought leadership and a shared vision of inclusion, well-being, and sustainability</li>
                </ul>
                {/* Luxembourg photo boxes to balance right column height */}
                <div className="mt-4 grid grid-rows-3 gap-4">
                  <div
                    className="rounded-2xl w-full h-40 sm:h-48 md:h-64 bg-top bg-cover shadow-xl border border-gray-100"
                    style={{ backgroundImage: "url('/images/uploads/adolphe-bridge-luxembourg.jpg')" }}
                    aria-label="Adolphe Bridge, Luxembourg"
                  />
                  <div
                    className="rounded-2xl w-full h-40 sm:h-48 md:h-64 bg-center bg-cover shadow-xl border border-gray-100"
                    style={{ backgroundImage: "url('/images/uploads/kirchberg-fort-thungen.jpg')" }}
                    aria-label="Fort Thüngen, Kirchberg, Luxembourg"
                  />
                  <div
                    className="rounded-2xl w-full h-40 sm:h-48 md:h-64 bg-center bg-cover shadow-xl border border-gray-100"
                    style={{ backgroundImage: "url('/images/uploads/luxembourg-skyline-golden-hour.jpg')" }}
                    aria-label="Luxembourg skyline"
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* Right side - Featured Articles Hero */}
            <div className="flex flex-col gap-4 sm:gap-6 mb-0 pb-0">
              {/* Investment Management Journal - Separate Box */}
              <ScrollReveal direction="left" delay={180}>
                <div className="bg-gradient-to-r from-newtifi-teal/10 to-newtifi-navy/5 border border-newtifi-teal/20 rounded-2xl p-5 sm:p-6 shadow-2xl hover:shadow-2xl transition-all duration-300 cursor-pointer group">
                  <div onClick={() => navigate(urlFactory.getPublishingPath())} className="cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-newtifi-teal/20 rounded-lg">
                        <svg className="w-5 h-5 text-newtifi-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-newtifi-navy group-hover:text-newtifi-teal transition-colors">
                        NewTIFI Investment Management Journal
                      </h3>
                    </div>
                    <p className="text-sm sm:text-base md:text-base text-gray-600 font-light mb-3">
                      Peer-reviewed research and insights in investment management and financial technology
                    </p>
                    <div className="flex items-center justify-end">
                      <svg className="w-4 h-4 text-newtifi-teal group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Featured Articles - Hero Section */}
            <ScrollReveal direction="left" delay={200}>
                <div className="bg-gradient-to-br from-newtifi-navy/5 to-newtifi-teal/5 rounded-2xl p-5 sm:p-6 md:p-8 shadow-2xl border border-newtifi-navy/10">
                <div className="flex justify-between items-center mb-5 sm:mb-8">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-newtifi-navy">Featured Articles</h2>
                  <Button 
                      to={urlFactory.getPublishingPath()} 
                    className="text-newtifi-navy hover:text-newtifi-teal transition-colors duration-300 flex items-center gap-2 text-sm sm:text-base"
                  >
                    View All
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
                <div className="space-y-5 sm:space-y-8">
                    {featuredArticles.length > 0 ? (
                      featuredArticles.map((article, index) => (
                        <div 
                          key={article.id}
                          className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-newtifi-teal/30 group"
                          onClick={() => navigate(getArticleUrl(article))}
                        >
                          <div className="mb-5 overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
                            <div
                              className="h-40 sm:h-48 md:h-56 w-full bg-center bg-cover transition-transform duration-300 group-hover:scale-[1.02]"
                              style={{ backgroundImage: `url('${articlePreviewImages[index % articlePreviewImages.length]}')` }}
                              aria-label={`${article.title} preview`}
                            />
                          </div>
                          {/* Article Header (text only, logo removed) */}
                          <div className="flex items-start mb-4 sm:mb-6">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                                <span className="inline-block bg-newtifi-teal/10 text-newtifi-teal text-xs px-3 py-1 rounded-full font-medium">
                                  Latest Publication
                                </span>
                                <span className="text-xs sm:text-base text-gray-500">{article.date}</span>
                              </div>
                              <h3 className="text-base font-bold text-newtifi-navy mb-2 line-clamp-2 group-hover:text-newtifi-teal transition-colors">
                                {article.title}
                              </h3>
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs sm:text-base text-newtifi-teal font-medium">{article.category === 'journal' ? 'Journal Article' : 'News'}</span>
                                {article.author && (
                                  <>
                                    <span className="text-gray-400">•</span>
                                    <span className="text-xs sm:text-base text-gray-600">By {article.author}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Keywords */}
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              {article.keywords?.slice(0, 3).map((keyword, kIdx) => (
                                <span key={kIdx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-xs font-medium">
                                  {keyword}
                                </span>
                              ))}
                              {article.keywords?.length > 3 && (
                                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs font-medium">
                                  +{article.keywords.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Abstract */}
                          <p className="text-sm sm:text-base text-gray-600 line-clamp-3 mb-6 leading-relaxed">{article.abstract}</p>

                          {/* Footer */}
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="text-xs sm:text-base text-gray-500">
                              DOI: {article.doi}
                            </div>
                            <div className="flex items-center gap-2 text-newtifi-teal group-hover:text-newtifi-navy transition-colors text-xs sm:text-base">
                              <span className="font-medium">Read Article</span>
                              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <div className="text-newtifi-teal mb-4">
                          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <p className="text-gray-600 font-medium text-base">No featured articles available</p>
                        <p className="text-base text-gray-500 mt-2">Check back soon for new publications</p>
                      </div>
                    )}
                    </div>
                </div>
              </ScrollReveal>
              </div>
          </div>
        </div>
      </section>
      
              {/* New Technologies & Investment Funds Institute Pillars & What We Do */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <ScrollReveal direction="right" delay={100}>
            <div className="bg-newtifi-navy rounded-2xl p-8 md:p-12">
              {/* New Technologies & Investment Funds Institute Pillars Section */}
              <ScrollReveal direction="right" delay={200}>
                <h2 className="text-2xl md:text-4xl text-center mb-12 text-white">
                  New Technologies & Investment Funds Institute Pillars
                </h2>
                <h3 className="text-2xl md:text-4xl text-center mb-12 text-white font-light uppercase">
                  Technology Pillars
                </h3>
              </ScrollReveal>

              {/* Wrap the grid in a flex container to center it horizontally: */}
              <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                  {[
                    {
                      title: "HealthTech",
                      description: "Enhancing personal care, diagnostics, and healthcare delivery through innovative technological solutions.",
                      icon: "🏥",
                      image: "/images/health-tech.jpg"
                    },
                    {
                      title: "FoodTech",
                      description: "Transforming food systems to increase efficiency, sustainability, and nutritional outcomes.",
                      icon: "🌱",
                      image: "/images/food-tech.jpg"
                    },
                    {
                      title: "EnergyTech",
                      description: "Advancing technologies for smarter resource management, energy efficiency, and environmental conservation.",
                      icon: "⚡",
                      image: "/images/energy-tech.jpg"
                    },
                    {
                      title: "FinTech",
                      description: "Revolutionising financial services with cutting-edge technologies that improve access, transparency, and efficiency.",
                      icon: "💸",
                      image: "/images/fin-tech.jpg"
                    }
                  ].map((pillar, index: number) => (
                    <ScrollReveal 
                      key={pillar.title} 
                      direction="right" 
                      delay={200 + (index * 100)}
                      className="transform transition-all duration-300 hover:scale-105"
                    >
                      <div className="bg-white rounded-2xl p-8 shadow-lg h-full flex flex-col">
                        <div className="aspect-square w-full mb-6 bg-gray-100 rounded-xl overflow-hidden">
                          {/* Space for photo */}
                          {pillar.image && (
                            <img
                              src={pillar.image}
                              alt={pillar.title + " photo"}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="text-4xl mb-4">{pillar.icon}</div>
                        <h3 className="text-base font-semibold mb-3 text-newtifi-navy">{pillar.title}</h3>
                        <p className="text-gray-700 flex-grow">{pillar.description}</p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>

              {/* Financial Services Section */}
              <ScrollReveal direction="right" delay={200}>
                <h3 className="text-2xl md:text-4xl text-center mb-20 text-white font-light uppercase">
                  Financial Pillars
                </h3>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    title: "Investment Funds",
                    description: "Strategic vehicles aimed at investing to optimise returns while managing risk including through diversification.",
                    icon: "📈",
                    image: "/images/Investment-funds.jpg"
                  },
                  {
                    title: "Securitisation Vehicles",
                    description: "Special-purpose entities that assume risks linked to assets or third-party obligations and finance them through instruments or loans with returns tied to those.",
                    icon: "📊",
                    image: "/images/Securitisation-vehicles.jpeg"
                  },
                  {
                    title: "Pension Funds",
                    description: "Long-term investment solutions focused on financial security and sustainable retirement planning.",
                    icon: "🏦",
                    image: "/images/Pension-funds.jpg"
                  },
                  {
                    title: "Life Insurance Products",
                    description: "Comprehensive risk management and wealth protection solutions tailored to life events and financial contingencies.",
                    icon: "🛡️",
                    image: "/images/life-insurance.jpg"
                  }
                ].map((item, index: number) => (
                  <ScrollReveal 
                    key={item.title} 
                    direction="right" 
                    delay={200 + (index * 100)}
                    className="transform transition-all duration-300 hover:scale-105"
                  >
                    <div className="bg-white rounded-2xl p-8 shadow-lg h-full flex flex-col">
                      <div className="aspect-square w-full mb-6 bg-gray-100 rounded-xl overflow-hidden">
                        {/* Space for photo */}
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.title + " photo"}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="text-4xl mb-4">{item.icon}</div>
                      <h3 className="text-base font-semibold mb-3 text-newtifi-navy">{item.title}</h3>
                      <p className="text-gray-700 flex-grow">{item.description}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Scholarship & Education */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <ScrollReveal direction="right" delay={100}>
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
              <ScrollReveal direction="right" delay={200} className="mb-12 text-center">
                <h2 className="text-2xl md:text-4xl uppercase mb-4 text-newtifi-navy">Scholarship & Education</h2>
                <p className="text-base text-gray-700 font-light">
                  Our scholarship and education initiatives foster academic excellence and empower the next generation of leaders in technology innovation and finance
                </p>
              </ScrollReveal>
              
              {/* Menu Buttons */}
              <ScrollReveal direction="right" delay={300}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                  {scholarshipContent.map((item, index) => (
                    <button
                      key={item.title}
                      onClick={() => setActiveScholarship(item.title)}
                      className={cn(
                        "p-4 rounded-lg text-left transition-all duration-300",
                        activeScholarship === item.title
                          ? "bg-newtifi-navy text-white shadow-lg"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-base opacity-80">{item.description}</p>
                    </button>
                  ))}
                </div>
              </ScrollReveal>

              {/* Content Display */}
              <ScrollReveal direction="right" delay={400}>
                {scholarshipContent.map((item) => (
                  <div
                    key={item.title}
                    className={cn(
                      "transition-all duration-500",
                      activeScholarship === item.title ? "block" : "hidden"
                    )}
                  >
                    <div className="bg-gradient-to-r from-newtifi-teal/10 to-newtifi-navy/5 rounded-xl p-8">
                      <h3 className="text-2xl font-semibold text-newtifi-navy mb-4">{item.title}</h3>
                      <p className="text-base text-gray-700 mb-6">{item.description}</p>
                      {/* Insert extra paragraph for Doctoral Scholarships only */}
                      {item.title === 'Doctoral Scholarships' && (
                        <p className="text-base text-gray-700 mb-6">
                          NewTIFI believes the future of investment innovation depends on courageous minds unafraid to ask the big questions – so we fund doctoral scholars in promising technological fields who dare to challenge convention and push their field forward
                        </p>
                      )}
                      <ul className="space-y-3">
                        {item.details.map((detail, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-newtifi-teal rounded-full mt-3 flex-shrink-0" />
                            <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                ))}
              </ScrollReveal>
            </div>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Legal Insights */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <ScrollReveal direction="right" delay={100}>
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
              <ScrollReveal direction="right" delay={200} className="mb-12 text-center">
                <h2 className="text-2xl md:text-4xl uppercase mb-4 text-newtifi-navy">Insights</h2>
                <p className="text-base text-gray-700 font-light">
                  At NewTIFI, we are committed to shaping informed dialogue at the intersection of innovation and finance. While we do not offer legal or tax advice, our publications and advocacy initiatives aim to highlight key issues, emerging trends, and expert perspectives across our core focus areas
                </p>
              </ScrollReveal>
              {/* Insights Menu Buttons */}
              <ScrollReveal direction="right" delay={300}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                  {insightsContent.map((item, index) => (
                    <button
                      key={item.title}
                      onClick={() => setActiveInsight(item.title)}
                      className={cn(
                        "p-4 rounded-lg text-left transition-all duration-300",
                        activeInsight === item.title
                          ? "bg-newtifi-navy text-white shadow-lg"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      <h3 className="font-semibold mb-2 text-center uppercase w-full">{item.title}</h3>
                      <p className="text-base opacity-80">{item.subtext}</p>
                    </button>
                  ))}
                </div>
              </ScrollReveal>
              {/* Insights Content Display */}
              <ScrollReveal direction="right" delay={400}>
                {insightsContent.map((item) => (
                  <div
                    key={item.title}
                    className={cn(
                      "transition-all duration-500",
                      activeInsight === item.title ? "block" : "hidden"
                    )}
                  >
                    <div className="bg-gradient-to-r from-newtifi-teal/10 to-newtifi-navy/5 rounded-xl p-8">
                      <h3 className="text-2xl font-semibold text-newtifi-navy mb-4">{item.title}</h3>
                      <p className="text-base text-gray-700 mb-6">{item.description}</p>
                      {item.details && (
                        <ul className="space-y-3">
                          {item.details.map((detail, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-base">
                              <div className="w-2 h-2 bg-newtifi-teal rounded-full mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 align-middle">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </ScrollReveal>
            </div>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Connect Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <ScrollReveal direction="right" delay={100}>
            <div className="bg-gradient-to-r from-newtifi-navy to-newtifi-teal rounded-2xl p-8 md:p-12 text-white text-center">
              <ScrollReveal direction="right" delay={200} className="mb-8">
                <h2 className="text-2xl md:text-4xl font-bold mb-4">Ready to Connect?</h2>
                <p className="text-base opacity-90 mb-8">
                  Join our community of innovators, researchers, and industry leaders.
                    </p>
                  </ScrollReveal>

                  <ScrollReveal direction="right" delay={300}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    to="/contact" 
                    className="bg-white text-newtifi-navy hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                  >
                    Get in Touch
                  </Button>
                    <Button 
                      to="/membership" 
                    className="border-2 border-white text-white hover:bg-white hover:text-newtifi-navy transition-all duration-300 transform hover:scale-105"
                    >
                    Join Our Network
                    </Button>
                  </div>
                </ScrollReveal>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default Home;
