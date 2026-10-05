import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import Button from '@/components/Button';
import PageHero from '@/components/PageHero';
import PublishingTabs from '@/components/PublishingTabs';
import { cn } from '@/lib/utils';
import { urlFactory } from '@/lib/urls/UrlFactory';

type JournalArticle = {
  id: string;
  title: string;
  author: string;
  date: string;
  abstract?: string;
};

type JournalMetadata = {
  reviewProcess: { reviewCriteria: string[] };
};

export type JournalLandingProps = {
  title: string;
  tagline: string;
  image: { src: string; alt: string };
  introParagraphs: string[];
  aboutHeading: string;
  aboutParagraphs: string[];
  submissionLede: string;
  publicationTitle: string;
  metadata: JournalMetadata;
  reviewCriteriaExplanations: Record<string, string>;
  documentationPlan: string[];
  articles: JournalArticle[];
  getArticleUrl: (article: JournalArticle) => string;
};

const SUBMISSION_RULES_FILE = '2025.08.01_Rules for Submission – Investment Management Journal (1).docx';

const tabs = [
  { id: 'journals', label: 'Journals' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'articles', label: 'Articles' },
  { id: 'books', label: 'Books' },
  { id: 'interviews', label: 'Interviews' },
  { id: 'podcasts', label: 'Podcasts' },
];

const comingSoon: Record<string, { title: string; subtitle: string; body: string }> = {
  books: { title: 'Books', subtitle: 'Books by NewTIFI Publishing', body: 'Books content coming soon.' },
  interviews: { title: 'Interviews', subtitle: 'Interviews by NewTIFI Publishing', body: 'Interviews content coming soon.' },
  podcasts: { title: 'Podcasts', subtitle: 'Podcasts by NewTIFI Publishing', body: 'Podcasts content coming soon.' },
};

const JournalLanding: React.FC<JournalLandingProps> = ({
  title,
  tagline,
  image,
  introParagraphs,
  aboutHeading,
  aboutParagraphs,
  submissionLede,
  publicationTitle,
  metadata,
  reviewCriteriaExplanations,
  documentationPlan,
  articles,
  getArticleUrl,
}) => {
  const [selectedTab, setSelectedTab] = useState('journals');
  const [expandedCriterion, setExpandedCriterion] = useState<number | null>(null);
  const placeholder = comingSoon[selectedTab];

  const metadataRows: Array<[string, string]> = [
    ['Publication title', publicationTitle],
    ['e-ISSN', 'TBD'],
    ['Issues per year', '4'],
    ['Frequency', 'Quarterly'],
    ['Pages per issue', '10-15'],
    ['Format', 'A4'],
  ];

  return (
    <div className="bg-white pb-20">
      <PageHero
        title={title}
        lede={tagline}
        crumbs={[{ label: 'Publishing', to: urlFactory.getPublishingPath() }, { label: title }]}
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 grid items-start gap-10 md:grid-cols-[14rem_minmax(0,1fr)] lg:gap-14">
          <img
            src={image.src}
            alt={image.alt}
            className="photo hidden aspect-[1/2] w-full rounded-2xl object-cover shadow-card md:block"
          />
          <div className="max-w-3xl space-y-4 text-base leading-relaxed text-gray-700">
            {introParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-pretty">{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6">
        <PublishingTabs label="Journal sections" tabs={tabs} active={selectedTab} onChange={setSelectedTab} />
      </div>

      <section className="py-12 md:py-16" role="tabpanel" aria-labelledby={`tab-${selectedTab}`}>
        <div className="container mx-auto px-6">
          {selectedTab === 'journals' && (
            <>
              <h2 className="text-2xl md:text-3xl text-newtifi-navy">{aboutHeading}</h2>
              <p className="mt-2 text-base text-[#008f96]">A Journal by NewTIFI Publishing</p>
              <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-gray-700">
                {aboutParagraphs.map((paragraph) => (
                  <p key={paragraph} className="text-pretty">{paragraph}</p>
                ))}
              </div>

              <div className="mt-12 flex flex-col gap-6 rounded-2xl bg-newtifi-navy p-6 text-white md:flex-row md:items-center md:justify-between md:p-10">
                <div>
                  <h3 className="text-xl md:text-2xl">Submission guidelines</h3>
                  <p className="mt-2 text-base text-white/80 text-pretty">{submissionLede}</p>
                </div>
                <Button variant="inverse" href={`${urlFactory.getPublishingPath()}#submission-guidelines`} target="_self">
                  View guidelines
                </Button>
              </div>

              <div className="mt-12 grid items-start gap-6 lg:grid-cols-2">
                <div className="surface-card overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <caption className="sr-only">Journal metadata</caption>
                    <tbody className="divide-y divide-gray-100">
                      {metadataRows.map(([label, value]) => (
                        <tr key={label}>
                          <th scope="row" className="w-2/5 bg-gray-50 px-5 py-3 font-bold text-newtifi-navy">{label}</th>
                          <td className="px-5 py-3 text-gray-700">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="rounded-2xl bg-gray-50 p-6">
                  <h3 className="mb-4 text-base font-bold text-newtifi-navy">Documentation roadmap</h3>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700 marker:text-newtifi-teal">
                    {documentationPlan.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Button
                      variant="secondary"
                      size="sm"
                      href={`/files/research-submissions/${encodeURIComponent(SUBMISSION_RULES_FILE)}`}
                      target="_self"
                    >
                      Download rules for submission
                    </Button>
                    <span className="text-sm text-gray-500">DOCX</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {selectedTab === 'reviews' && (
            <>
              <h2 className="text-2xl md:text-3xl text-newtifi-navy">Reviews</h2>
              <p className="mt-2 mb-8 text-base text-[#008f96]">A Review Series by NewTIFI Publishing</p>

              <div className="rounded-2xl bg-gray-50 p-6 md:p-8">
                <h3 className="mb-6 text-lg font-bold text-newtifi-navy">Peer review process</h3>
                <div className="max-w-2xl">
                  <div>
                    <h4 className="mb-3 text-sm font-bold text-newtifi-navy">Review criteria</h4>
                    <ul className="space-y-2">
                      {metadata.reviewProcess.reviewCriteria.map((criterion, idx) => {
                        const expanded = expandedCriterion === idx;
                        return (
                          <li key={criterion}>
                            <button
                              type="button"
                              className="flex min-h-[40px] w-full items-center gap-2 text-left text-base text-gray-800 transition-colors duration-150 ease-out-strong fine:hover:text-newtifi-navy"
                              onClick={() => setExpandedCriterion(expanded ? null : idx)}
                              aria-expanded={expanded}
                            >
                              <ChevronDown
                                className={cn(
                                  'h-4 w-4 shrink-0 text-[#008f96] transition-transform duration-200 ease-out-strong motion-reduce:transition-none',
                                  expanded && 'rotate-180'
                                )}
                                aria-hidden="true"
                              />
                              <span>{criterion}</span>
                            </button>
                            {expanded && (
                              <div
                                className="mt-2 ml-6 rounded-lg bg-white p-4 text-sm leading-relaxed text-gray-700"
                                dangerouslySetInnerHTML={{ __html: reviewCriteriaExplanations[criterion] }}
                              />
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}

          {selectedTab === 'articles' && (
            <>
              <h2 className="text-2xl md:text-3xl text-newtifi-navy">Articles</h2>
              <p className="mt-2 mb-8 text-base text-[#008f96]">Featured Articles from NewTIFI Publishing</p>
              <ul className="surface-card divide-y divide-gray-100 overflow-hidden">
                {articles.map((article) => (
                  <li key={article.id}>
                    <Link
                      to={getArticleUrl(article)}
                      className="group block px-6 py-6 transition-colors duration-150 ease-out-strong fine:hover:bg-gray-50 md:px-8"
                    >
                      <h3 className="text-lg leading-snug text-newtifi-navy text-pretty fine:group-hover:underline fine:group-hover:decoration-newtifi-teal fine:group-hover:underline-offset-4">
                        {article.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-500">
                        {article.author} · {article.date}
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
    </div>
  );
};

export default JournalLanding;
