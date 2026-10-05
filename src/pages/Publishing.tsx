import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import Button from '@/components/Button';
import PageHero from '@/components/PageHero';
import PublishingTabs from '@/components/PublishingTabs';
import { urlFactory } from '@/lib/urls/UrlFactory';

const publishingTabs = [
  { id: 'journals', label: 'Journals' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'articles', label: 'Articles' },
  { id: 'books', label: 'Books' },
  { id: 'interviews', label: 'Interviews' },
  { id: 'podcasts', label: 'Podcasts' },
];

const comingSoon: Record<string, { title: string; subtitle: string; body: string }> = {
  reviews: { title: 'Reviews', subtitle: 'Reviews by NewTIFI Publishing', body: 'Reviews content coming soon.' },
  books: { title: 'Books', subtitle: 'Books by NewTIFI Publishing', body: 'Books content coming soon.' },
  interviews: { title: 'Interviews', subtitle: 'Interviews by NewTIFI Publishing', body: 'Interviews content coming soon.' },
  podcasts: { title: 'Podcasts', subtitle: 'Podcasts by NewTIFI Publishing', body: 'Podcasts content coming soon.' },
};

const officialDocuments = [
  { label: 'Rules for Submission – Investment Management Journal', filename: '2025.08.01_Rules for Submission – Investment Management Journal (1).docx' },
  { label: 'Title Page Template – NewTIFI Investment Management Journal', filename: '2025.08.07_Title Page Template – NewTIFI Investment Management Journal.docx' },
  { label: 'Manuscript Template – NewTIFI Investment Management Journal', filename: '2025.08.07_Manuscript Template – NewTIFI Investment Management Journal.docx' },
  { label: 'Co‑Author Submission Approval Form – NewTIFI Investment Management Journal', filename: '2025.08.07_Co-Author Submission Approval Form – NewTIFI Investment Management Journal.docx' }
];

const Publishing: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('journals');
  const [dbArticles, setDbArticles] = useState([]);
  const [loadingDbArticles, setLoadingDbArticles] = useState(true);

  useEffect(() => {
    fetch('/api/articles?status=published', { credentials: 'include' })
      .then(r => r.json())
      .then(data => {
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

  const getArticleUrl = (article) => {
    return urlFactory.getJournalArticlePath('investment-management', article.id);
  };

  const placeholder = comingSoon[selectedTab];

  return (
    <div className="bg-white">
      <PageHero
        kicker="Publishing"
        title="Share your research"
        lede="Submit your research to our peer-reviewed journals and contribute to advancing knowledge in technology and investment management."
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 grid items-start gap-10 md:grid-cols-[14rem_minmax(0,1fr)] lg:gap-14">
          <img
            src="/assets/images/Lux-Philharmonie.jpeg"
            alt="Luxembourg Philharmonie"
            className="photo hidden aspect-[1/2] w-full rounded-2xl object-cover shadow-card md:block"
          />
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl text-newtifi-navy">NewTIFI Publishing</h2>
            <p className="mt-2 text-base text-[#008f96]">Empowering knowledge & education for a sustainable future</p>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-700">
              <p className="text-pretty">
                NewTIFI Publishing is the scientific and editorial arm of the New Technologies & Investment Funds Institute, dedicated to advancing accessible, high-quality research and thought leadership across the fields of new technologies and finance.
              </p>
              <p className="text-pretty">
                We publish peer-reviewed journals, practitioner-oriented reviews, academic articles, books, and interviews that explore the intersections of innovation, sustainability, and public policy.
              </p>
              <p className="text-pretty">
                Our mission is to foster informed dialogue and bridge the gap between cutting-edge research and real-world decision-making. All publications are produced with academic integrity, intellectual independence, and an emphasis on clarity and impact.
              </p>
              <p className="text-pretty">
                Contrary to many publishing houses, NewTIFI operates as a non-profit. All profits realised by NewTIFI are used to fund Doctoral Scholarships.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6">
        <PublishingTabs label="Publishing sections" tabs={publishingTabs} active={selectedTab} onChange={setSelectedTab} />
      </div>

      <section className="py-12 md:py-16" role="tabpanel" aria-labelledby={`tab-${selectedTab}`}>
        <div className="container mx-auto px-6">
          {selectedTab === 'journals' && (
            <>
              <h2 className="text-2xl md:text-3xl text-newtifi-navy">Journals directory</h2>
              <p className="mt-2 text-base text-[#008f96]">Publishing programs and documentation roadmaps</p>
              <p className="mt-4 mb-10 max-w-3xl text-base leading-relaxed text-gray-700 text-pretty">
                Explore each journal’s focus area and the planned documentation packages. Each journal
                will ship with complete submission rules, editorial policies, review workflow, and visual
                identity assets, aligned with NewTIFI Publishing standards.
              </p>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {journalCards.map((journal) => (
                  <div key={journal.slug} className="surface-card flex flex-col p-6 md:p-8">
                    <h3 className="text-xl text-newtifi-navy">{journal.title}</h3>
                    <p className="mt-2 text-sm text-[#008f96]">{journal.subtitle}</p>
                    <p className="mt-3 text-sm leading-relaxed text-gray-700 text-pretty">{journal.description}</p>
                    <div className="mt-6 flex-1">
                      <h4 className="mb-3 text-sm font-bold text-newtifi-navy">Documentation plan</h4>
                      <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700 marker:text-newtifi-teal">
                        {journal.plan.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <Button className="mt-8 self-start" variant="secondary" to={urlFactory.getJournalPath(journal.slug)}>
                      View journal
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}

          {selectedTab === 'articles' && (
            <>
              <h2 className="text-2xl md:text-3xl text-newtifi-navy">Articles</h2>
              <p className="mt-2 mb-8 text-base text-[#008f96]">Featured articles from NewTIFI Publishing</p>
              {loadingDbArticles ? (
                <p className="text-sm text-gray-500">Loading articles</p>
              ) : (
                <ul className="surface-card divide-y divide-gray-100 overflow-hidden">
                  {[...articles, ...dbArticles].map((article, idx) => (
                    <li key={`${article.id}-${idx}`}>
                      <Link
                        to={getArticleUrl(article)}
                        className="group block px-6 py-6 transition-colors duration-150 ease-out-strong fine:hover:bg-gray-50 md:px-8"
                      >
                        <h3 className="text-lg leading-snug text-newtifi-navy text-pretty fine:group-hover:underline fine:group-hover:decoration-newtifi-teal fine:group-hover:underline-offset-4">
                          {article.title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                          {article.author} · {article.date}
                          {article.source === 'contributor' && <> · Contributor</>}
                        </p>
                        {article.abstract && (
                          <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-700 text-pretty line-clamp-2">
                            {article.abstract}
                          </p>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {placeholder && (
            <>
              <h2 className="text-2xl md:text-3xl text-newtifi-navy">{placeholder.title}</h2>
              <p className="mt-2 text-base text-[#008f96]">{placeholder.subtitle}</p>
              <p className="mt-6 text-base text-gray-600">{placeholder.body}</p>
            </>
          )}
        </div>
      </section>

      <section id="submission-guidelines" className="scroll-mt-[var(--nav-h)] bg-gray-50 py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-2xl md:text-3xl text-newtifi-navy">How to submit your research</h2>
            <p className="mt-4 text-base text-gray-600 text-pretty">
              Follow our comprehensive guidelines to ensure your submission meets our standards for quality and academic rigor.
            </p>
          </div>

          <div className="surface-card overflow-hidden">
            <div className="flex flex-col gap-4 bg-newtifi-navy p-6 text-white md:flex-row md:items-center md:justify-between md:p-8">
              <div>
                <h3 className="text-xl md:text-2xl">Submission guidelines</h3>
                <p className="mt-1 text-sm text-white/75">Complete guidelines for authors and contributors</p>
              </div>
              <Button
                variant="inverse"
                size="sm"
                href={`/files/research-submissions/${encodeURIComponent(officialDocuments[0].filename)}`}
                target="_self"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download rules
              </Button>
            </div>

            <div className="grid gap-10 p-6 md:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
              <div>
                <h4 className="mb-3 text-base font-bold text-newtifi-navy">Official documents</h4>
                <ul className="divide-y divide-gray-100">
                  {officialDocuments.map((doc) => (
                    <li key={doc.filename}>
                      <a
                        href={`/files/research-submissions/${encodeURIComponent(doc.filename)}`}
                        download
                        className="group flex items-start justify-between gap-4 py-3 text-sm text-gray-800 transition-colors duration-150 ease-out-strong fine:hover:text-newtifi-navy"
                      >
                        <span className="text-pretty">{doc.label}</span>
                        <Download className="mt-0.5 h-4 w-4 shrink-0 text-[#008f96]" aria-label="Download" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-3 text-base font-bold text-newtifi-navy">Submission guidelines summary</h4>
                <div className="space-y-4 text-sm leading-relaxed text-gray-700">
                  <p className="text-pretty">Use English and choose either American or British conventions consistently across the Title Page and Manuscript. Ensure strict double‑blind compliance by removing all identifying information and embedded metadata from the Manuscript. Follow the official template for structure, headings, footnotes, defined terms and cross‑references, and include a concise abstract (150–250 words) with 3–12 ALL‑CAPS keywords separated by a dot.</p>
                  <p className="text-pretty">Prepare files separately: Title Page (PDF/Word) and Manuscript (PDF/Word, anonymised). Optional files include CV and Cover Letter. Where there are multiple authors, upload a signed Co‑Author Submission Approval for each co‑author using the provided template. File names must follow the convention YYYY.MM.DD_&lt;DocType&gt;_&lt;Article Title&gt; (for example: 2025.12.31_Title Page_My Article).</p>
                  <p className="text-pretty">Formatting rules: use the numbering table with single‑column rows and sequential paragraph numbers in parentheses, preserve page numbering layout, and apply Format Painter for consistency. Citations must follow OSCOLA or Bluebook with footnotes, including "last accessed" dates for URLs. Italicize Latin, and apply the specified rules for numbers, dates, units and currencies. Provide clear captions and correct formats for figures, tables and equations.</p>
                  <p className="text-pretty">Before submission, confirm the four required statements: the Manuscript is not under consideration elsewhere; you have read, accepted and complied with the Rules for Submission; you accept the Privacy Policy; and you accept the Rights and Licensing terms. A Manuscript ID will be generated on submit and a confirmation sent to your account email. For technical issues, contact imj.editorial@newtifi.com.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Publishing;
