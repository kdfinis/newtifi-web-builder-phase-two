import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/Button';
import PageHero from '@/components/PageHero';
import SegmentedPanels from '@/components/SegmentedPanels';
import { urlFactory } from '@/lib/urls/UrlFactory';

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

const journalNames: Record<string, string> = {
  'investment-management': 'Investment Management Journal',
  'restructuring-insolvency-journal': 'Restructuring & Insolvency Journal',
};

const technologyPillars = [
  {
    title: "HealthTech",
    description: "Enhancing personal care, diagnostics, and healthcare delivery through innovative technological solutions.",
    image: "/images/health-tech.jpg"
  },
  {
    title: "FoodTech",
    description: "Transforming food systems to increase efficiency, sustainability, and nutritional outcomes.",
    image: "/images/food-tech.jpg"
  },
  {
    title: "EnergyTech",
    description: "Advancing technologies for smarter resource management, energy efficiency, and environmental conservation.",
    image: "/images/energy-tech.jpg"
  },
  {
    title: "FinTech",
    description: "Revolutionising financial services with cutting-edge technologies that improve access, transparency, and efficiency.",
    image: "/images/fin-tech.jpg"
  }
];

const financialPillars = [
  {
    title: "Investment Funds",
    description: "Strategic vehicles aimed at investing to optimise returns while managing risk including through diversification.",
    image: "/images/Investment-funds.jpg"
  },
  {
    title: "Securitisation Vehicles",
    description: "Special-purpose entities that assume risks linked to assets or third-party obligations and finance them through instruments or loans with returns tied to those.",
    image: "/images/Securitisation-vehicles.jpeg"
  },
  {
    title: "Pension Funds",
    description: "Long-term investment solutions focused on financial security and sustainable retirement planning.",
    image: "/images/Pension-funds.jpg"
  },
  {
    title: "Life Insurance Products",
    description: "Comprehensive risk management and wealth protection solutions tailored to life events and financial contingencies.",
    image: "/images/life-insurance.jpg"
  }
];

const doctoralExtra =
  'NewTIFI believes the future of investment innovation depends on courageous minds unafraid to ask the big questions – so we fund doctoral scholars in promising technological fields who dare to challenge convention and push their field forward';

function getArticleUrl(article: (typeof staticArticles)[number]) {
  if (article.journalSlug) {
    return urlFactory.getJournalArticlePath(article.journalSlug, article.id);
  }
  return urlFactory.getArticlePermanentPath(article.id);
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

type Pillar = { title: string; description: string; image: string };

const PillarGrid: React.FC<{ title: string; pillars: Pillar[] }> = ({ title, pillars }) => (
  <div>
    <h2 className="mb-8 text-2xl md:text-3xl text-white">{title}</h2>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {pillars.map((pillar) => (
        <article key={pillar.title} className="surface-card flex h-full flex-col overflow-hidden">
          <div className="aspect-[4/3] w-full bg-gray-100">
            <img src={pillar.image} alt="" loading="lazy" className="photo h-full w-full object-cover" />
          </div>
          <div className="flex flex-1 flex-col p-6">
            <h3 className="mb-2 text-base font-bold text-newtifi-navy">{pillar.title}</h3>
            <p className="text-sm leading-relaxed text-gray-700 text-pretty">{pillar.description}</p>
          </div>
        </article>
      ))}
    </div>
  </div>
);

const Home = () => {
  const latestArticles = staticArticles
    .filter((article) => article.status === 'published')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const scholarshipItems = scholarshipContent.map((item) => ({
    title: item.title,
    summary: item.description,
    intro: item.title === 'Doctoral Scholarships' ? doctoralExtra : undefined,
    bullets: item.details,
  }));

  const insightItems = insightsContent.map((item) => ({
    title: item.title,
    summary: item.subtext,
    intro: item.description,
    bullets: item.details,
  }));

  return (
    <div className="pb-20">
      <PageHero
        title="Focus. Research. Innovate. Implement."
        lede="Welcome to the hub where scientific, tech and finance professionals meet"
      />

      <section className="bg-white">
        <div className="container mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl text-newtifi-navy">New Technologies & Investment Funds Institute</h2>
              <p className="text-lg leading-relaxed text-gray-700 text-pretty">
                An institute dedicated to advancing technology innovation and fostering sustainable development through interdisciplinary collaboration.
              </p>
              <ul className="list-disc space-y-3 pl-5 text-base text-gray-700 marker:text-newtifi-teal">
                <li>Bridging technology and finance to drive sustainable, meaningful impact</li>
                <li>Connecting researchers, innovators, policymakers, academics, and industry leaders</li>
                <li>Supporting future talent through scholarships, internships, and mentorships</li>
                <li>Delivering accessible education and insights to professionals and communities</li>
                <li>Shaping policy through thought leadership and a shared vision of inclusion, well-being, and sustainability</li>
              </ul>
              <img
                src="/images/uploads/adolphe-bridge-luxembourg.jpg"
                alt="Adolphe Bridge, Luxembourg"
                className="photo aspect-video w-full rounded-2xl object-cover shadow-card"
              />
            </div>

            <div className="flex flex-col gap-8">
              <Link
                to={urlFactory.getJournalPath('investment-management')}
                className="surface-card-interactive group block p-6 md:p-8"
              >
                <h3 className="text-xl md:text-2xl text-newtifi-navy">NewTIFI Investment Management Journal</h3>
                <p className="mt-3 text-base text-gray-600 text-pretty">
                  Peer-reviewed research and insights in investment management and financial technology
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-newtifi-navy">
                  Visit the journal
                  <ArrowRight
                    className="h-4 w-4 text-newtifi-teal transition-transform duration-200 ease-out-strong motion-reduce:transition-none fine:group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>

              <div>
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h2 className="text-xl md:text-2xl text-newtifi-navy">Featured articles</h2>
                  <Link
                    to={urlFactory.getPublishingPath()}
                    className="text-sm text-newtifi-navy underline decoration-newtifi-teal underline-offset-4 transition-colors duration-150 ease-out-strong fine:hover:decoration-newtifi-navy"
                  >
                    View all
                  </Link>
                </div>
                <ul className="surface-card divide-y divide-gray-100 overflow-hidden">
                  {latestArticles.map((article) => (
                    <li key={article.id}>
                      <Link
                        to={getArticleUrl(article)}
                        className="group block px-6 py-5 transition-colors duration-150 ease-out-strong fine:hover:bg-gray-50"
                      >
                        <p className="text-base leading-snug text-newtifi-navy text-pretty line-clamp-2 fine:group-hover:underline fine:group-hover:decoration-newtifi-teal fine:group-hover:underline-offset-4">
                          {article.title}
                        </p>
                        <p className="mt-2 text-sm text-gray-500">
                          {article.author} · {formatDate(article.date)}
                          {article.journalSlug && journalNames[article.journalSlug] && (
                            <> · {journalNames[article.journalSlug]}</>
                          )}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-4">
        <div className="container mx-auto px-6">
          <div className="space-y-16 rounded-2xl bg-newtifi-navy p-8 md:p-12">
            <PillarGrid title="Technology pillars" pillars={technologyPillars} />
            <PillarGrid title="Financial pillars" pillars={financialPillars} />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-2xl md:text-3xl text-newtifi-navy">Supporting the next generation</h2>
            <p className="mt-4 text-base leading-relaxed text-gray-700 text-pretty">
              Our scholarship and education initiatives foster academic excellence and empower the next generation of leaders in technology innovation and finance
            </p>
          </div>
          <SegmentedPanels label="Scholarship and education" items={scholarshipItems} />
        </div>
      </section>

      <section className="bg-gray-50 py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-2xl md:text-3xl text-newtifi-navy">Informed dialogue</h2>
            <p className="mt-4 text-base leading-relaxed text-gray-700 text-pretty">
              At NewTIFI, we are committed to shaping informed dialogue at the intersection of innovation and finance. While we do not offer legal or tax advice, our publications and advocacy initiatives aim to highlight key issues, emerging trends, and expert perspectives across our core focus areas
            </p>
          </div>
          <SegmentedPanels label="Insights" items={insightItems} />
        </div>
      </section>

      <section className="bg-white pt-16">
        <div className="container mx-auto px-6">
          <div className="institute-hero rounded-2xl px-8 py-12 text-white md:px-12 md:py-16">
            <h2 className="text-2xl md:text-3xl">Ready to connect?</h2>
            <p className="mt-4 max-w-2xl text-base text-white/80 text-pretty">
              Join our community of innovators, researchers, and industry leaders.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Button to="/contact" variant="inverse">
                Get in touch
              </Button>
              <Link
                to="/membership"
                className="text-sm text-white underline decoration-newtifi-teal underline-offset-4 transition-colors duration-150 ease-out-strong fine:hover:decoration-white"
              >
                Join our network
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
