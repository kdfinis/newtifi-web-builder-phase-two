import React, { useEffect, useRef, useState } from 'react';
import { Check, ArrowUpRight, X } from 'lucide-react';
import Button from '@/components/Button';
import PageHero from '@/components/PageHero';
import PublishingTabs from '@/components/PublishingTabs';
import { cn } from '@/lib/utils';

type Tier = 'institutional' | 'individual' | 'open';
type ContentView = 'overview' | 'individual' | 'institutional';

const benefits = [
  { feature: "Access to Research Library", institutional: true, individual: true, open: false },
  { feature: "Exclusive Events & Webinars", institutional: true, individual: true, open: true },
  { feature: "Networking Opportunities", institutional: true, individual: true, open: true },
  { feature: "Policy Advocacy Participation", institutional: true, individual: true, open: false },
  { feature: "Internal Content Distribution", institutional: true, individual: false, open: false },
  { feature: "Priority Support", institutional: true, individual: true, open: false },
  { feature: "Member Directory Access", institutional: true, individual: true, open: false },
  { feature: "Research Collaboration", institutional: true, individual: true, open: false }
];

const tiers: Array<{
  id: Tier;
  title: string;
  subtitle: string;
  features: string[];
  cta: string;
  view: ContentView;
}> = [
  {
    id: 'open',
    title: 'Open Member',
    subtitle: 'Perfect for getting started',
    features: ['Limited research access', 'Public events & webinars', 'Newsletter updates', 'Community access'],
    cta: 'Get started free',
    view: 'overview',
  },
  {
    id: 'individual',
    title: 'Individual Member',
    subtitle: 'Premium access',
    features: [
      'Full research library access',
      'All events & networking',
      'Policy advocacy participation',
      'Priority support',
      'Member directory access',
    ],
    cta: 'Join now',
    view: 'individual',
  },
  {
    id: 'institutional',
    title: 'Institutional',
    subtitle: 'Enterprise solutions',
    features: [
      'Everything in Individual',
      'Internal content distribution',
      'Custom training programs',
      'Dedicated account manager',
      'Custom research projects',
    ],
    cta: 'Contact sales',
    view: 'institutional',
  },
];

const formTitles: Record<Tier, string> = {
  institutional: 'Institutional Membership Request',
  individual: 'Individual Membership Application',
  open: 'Open Membership Registration',
};

const submitLabels: Record<Tier, string> = {
  institutional: 'Submit request',
  individual: 'Submit application',
  open: 'Complete registration',
};

const messagePlaceholders: Record<Tier, string> = {
  institutional: 'Tell us about your institution and goals',
  individual: 'Tell us about your interests and goals',
  open: 'Tell us about your interests',
};

const luxembourgStats = [
  {
    value: '€6.2T',
    label: 'Financial Assets',
    note: 'Under management in Luxembourg',
    source: 'CSSF Annual Report, 2023',
    detailLabel: 'Scope',
    detail: 'UCITS, AIFs, and other investment vehicles',
  },
  {
    value: '500+',
    label: 'FinTech Companies',
    note: 'Leading European ecosystem',
    source: 'Luxembourg House of Financial Technology, 2023',
    detailLabel: 'Includes',
    detail: 'Startups, scale-ups, and established companies',
  },
];

const researchInstitutions = [
  { href: 'https://wwwen.uni.lu', name: 'University of Luxembourg', note: '6,700+ students, leading research university' },
  { href: 'https://www.list.lu', name: 'Luxembourg Institute of Science and Technology (LIST)', note: 'Applied research and innovation center' },
  { href: 'https://www.fnr.lu', name: 'Luxembourg National Research Fund (FNR)', note: '€100M+ annual research funding' },
];

const inputClasses =
  'w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-base text-newtifi-navy transition-[border-color,box-shadow] duration-150 ease-out-strong focus:border-newtifi-navy focus:outline-none focus:ring-2 focus:ring-newtifi-navy/20';

const labelClasses = 'mb-1.5 block text-sm text-gray-700';

const FeatureList: React.FC<{ items: string[]; dark?: boolean }> = ({ items, dark }) => (
  <ul className="space-y-3">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-3">
        <Check className="mt-0.5 h-5 w-5 shrink-0 text-newtifi-teal" aria-hidden="true" />
        <span className={cn('text-sm', dark ? 'text-white/90' : 'text-gray-700')}>{item}</span>
      </li>
    ))}
  </ul>
);

const MembershipForm: React.FC<{ tier: Tier; onClose: () => void }> = ({ tier, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = 'membership-form-title';

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.querySelector<HTMLElement>('input')?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const field = (key: string) => String(data.get(key) ?? '').trim();
    const lines = [
      `Membership: ${formTitles[tier]}`,
      `Name: ${field('firstName')} ${field('lastName')}`.trim(),
      `Email: ${field('email')}`,
      `Phone: ${field('phone')}`,
      `Country: ${field('country')}`,
      `Role/Position: ${field('role')}`,
    ];
    if (tier !== 'open') {
      lines.push(`${tier === 'institutional' ? 'Company' : 'Organization'}: ${field('organization')}`);
    }
    lines.push('', field('message'));
    const subject = `${formTitles[tier]} - ${field('firstName')} ${field('lastName')}`.trim();
    window.location.href = `mailto:info@newtifi.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-newtifi-navy/60 p-4 md:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="surface-card max-h-[90vh] w-full max-w-2xl overflow-y-auto"
      >
        <div className="p-6 md:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <h2 id={titleId} className="text-xl md:text-2xl text-newtifi-navy">
              {formTitles[tier]}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-500 transition-[background-color,color,transform] duration-150 ease-out-strong active:scale-[0.97] motion-reduce:transition-none fine:hover:bg-gray-100 fine:hover:text-newtifi-navy"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="m-first" className={labelClasses}>First name</label>
                <input id="m-first" name="firstName" type="text" required autoComplete="given-name" className={inputClasses} />
              </div>
              <div>
                <label htmlFor="m-last" className={labelClasses}>Last name</label>
                <input id="m-last" name="lastName" type="text" required autoComplete="family-name" className={inputClasses} />
              </div>
            </div>
            <div>
              <label htmlFor="m-email" className={labelClasses}>Email address</label>
              <input id="m-email" name="email" type="email" required autoComplete="email" className={inputClasses} />
            </div>
            <div>
              <label htmlFor="m-phone" className={labelClasses}>Phone number</label>
              <input id="m-phone" name="phone" type="tel" autoComplete="tel" className={inputClasses} />
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="m-country" className={labelClasses}>Country</label>
                <input id="m-country" name="country" type="text" autoComplete="country-name" className={inputClasses} />
              </div>
              <div>
                <label htmlFor="m-role" className={labelClasses}>Role/Position</label>
                <input id="m-role" name="role" type="text" autoComplete="organization-title" className={inputClasses} />
              </div>
            </div>
            {tier !== 'open' && (
              <div>
                <label htmlFor="m-org" className={labelClasses}>
                  {tier === 'institutional' ? 'Company name' : 'Organization'}
                </label>
                <input id="m-org" name="organization" type="text" autoComplete="organization" className={inputClasses} />
              </div>
            )}
            <div>
              <label htmlFor="m-message" className={labelClasses}>{messagePlaceholders[tier]}</label>
              <textarea id="m-message" name="message" rows={4} className={inputClasses} />
            </div>
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                required
                className="mt-1 h-4 w-4 rounded border-gray-300 text-newtifi-teal focus:ring-newtifi-navy"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to receive communications and accept the terms of membership
              </label>
            </div>
            <p className="text-sm text-gray-500">Submitting opens your email client with a message to info@newtifi.com.</p>
            <Button type="submit" fullWidth>
              {submitLabels[tier]}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Membership = () => {
  const [activeForm, setActiveForm] = useState<Tier | null>(null);
  const [activeContent, setActiveContent] = useState<ContentView>('overview');

  return (
    <div className="bg-white text-newtifi-navy">
      <PageHero
        title="Membership"
        lede="Shape the future of technology and finance. Connect with world-class researchers, policymakers, and industry leaders. Access verified insights and drive innovation across HealthTech, FoodTech, EnergyTech, and FinTech."
      >
        <Button href="#tiers" variant="inverse">
          Apply for membership
        </Button>
        <a
          href="#compare"
          className="inline-flex h-11 items-center text-sm text-white underline decoration-newtifi-teal underline-offset-4 transition-colors duration-150 ease-out-strong fine:hover:decoration-white"
        >
          Explore benefits
        </a>
      </PageHero>

      <section id="tiers" className="scroll-mt-[var(--nav-h)] bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="mb-12 max-w-3xl">
            <h2 className="text-2xl md:text-3xl text-newtifi-navy">Choose your path to innovation</h2>
            <p className="mt-4 text-base text-gray-600 text-pretty">
              Three distinct membership tiers designed to meet your organization's goals, from open access to enterprise collaboration.
            </p>
          </div>

          <div className="mb-12 grid gap-6 md:grid-cols-3">
            {[
              { label: 'Positioning', title: 'Executive-led research', desc: 'Evidence-backed intelligence for strategic decisions.' },
              { label: 'Network', title: 'Global peer exchange', desc: 'Curated access to policy, finance, and innovation leaders.' },
              { label: 'Impact', title: 'Policy and market influence', desc: 'Structured programs to shape the future of tech and finance.' },
            ].map((item) => (
              <div key={item.label} className="surface-card p-6">
                <p className="text-sm text-[#008f96]">{item.label}</p>
                <p className="mt-3 text-lg text-newtifi-navy">{item.title}</p>
                <p className="mt-2 text-sm text-gray-600 text-pretty">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {tiers.map((tier) => {
              const featured = tier.id === 'individual';
              return (
                <div
                  key={tier.id}
                  className={cn(
                    'flex h-full flex-col rounded-2xl p-8',
                    featured ? 'bg-newtifi-navy text-white shadow-card-hover' : 'surface-card'
                  )}
                >
                  <h3 className={cn('text-xl font-bold', featured ? 'text-white' : 'text-newtifi-navy')}>{tier.title}</h3>
                  <p className={cn('mt-1 text-sm', featured ? 'text-white/70' : 'text-gray-600')}>{tier.subtitle}</p>
                  <div className="mt-8 flex-1">
                    <FeatureList items={tier.features} dark={featured} />
                  </div>
                  <Button
                    className="mt-8"
                    fullWidth
                    variant={featured ? 'primary' : tier.id === 'institutional' ? 'secondary' : 'outline'}
                    onClick={() => {
                      setActiveContent(tier.view);
                      setActiveForm(tier.id);
                    }}
                  >
                    {tier.cta}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="text-2xl md:text-3xl text-newtifi-navy">A structured, transparent process</h2>
              <p className="mt-4 mb-8 text-base text-gray-600 text-pretty">
                Every membership tier is aligned with governance, research access, and collaborative impact. The process is simple, verified, and tailored to your goals.
              </p>
              <div className="rounded-2xl bg-gray-50 p-6">
                <h3 className="mb-4 text-base font-bold text-newtifi-navy">Eligibility</h3>
                <ul className="list-disc space-y-2 pl-5 text-sm text-gray-600 marker:text-newtifi-teal">
                  <li>Demonstrated interest in technology and finance.</li>
                  <li>Commitment to ethical research and policy standards.</li>
                  <li>Alignment with NewTIFI's research priorities.</li>
                </ul>
              </div>
            </div>
            <ol className="grid gap-6 md:grid-cols-2">
              {[
                { title: 'Apply', desc: 'Select a tier and submit your profile.' },
                { title: 'Review', desc: 'We verify eligibility and alignment.' },
                { title: 'Activate', desc: 'Unlock research, events, and tools.' },
                { title: 'Collaborate', desc: 'Join programs and member initiatives.' },
              ].map((step, index) => (
                <li key={step.title} className="surface-card p-6">
                  <p className="text-sm text-[#008f96]">Step {index + 1}</p>
                  <h3 className="mt-2 text-lg font-bold text-newtifi-navy">{step.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{step.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="compare" className="scroll-mt-[var(--nav-h)] bg-white pb-20">
        <div className="container mx-auto px-6">
          <PublishingTabs
            className="mb-10"
            label="Membership details"
            tabs={[
              { id: 'overview', label: 'Compare benefits' },
              { id: 'individual', label: 'Individual' },
              { id: 'institutional', label: 'Institutional' },
            ]}
            active={activeContent}
            onChange={(id) => setActiveContent(id as ContentView)}
          />

          {activeContent === 'overview' && (
            <div role="tabpanel" aria-labelledby="tab-overview">
              <h2 className="text-2xl md:text-3xl text-newtifi-navy">Compare membership benefits</h2>
              <p className="mt-3 mb-8 text-base text-gray-600">See exactly what each membership tier includes.</p>
              <div className="surface-card overflow-x-auto">
                <table className="w-full min-w-[36rem] text-left text-sm">
                  <thead className="bg-gray-50 text-newtifi-navy">
                    <tr>
                      <th scope="col" className="p-4 md:p-5 font-bold">Feature</th>
                      <th scope="col" className="p-4 md:p-5 text-center font-bold">Open</th>
                      <th scope="col" className="p-4 md:p-5 text-center font-bold">Individual</th>
                      <th scope="col" className="p-4 md:p-5 text-center font-bold">Institutional</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {benefits.map((benefit) => (
                      <tr key={benefit.feature}>
                        <th scope="row" className="p-4 md:p-5 font-normal text-gray-700">{benefit.feature}</th>
                        {[benefit.open, benefit.individual, benefit.institutional].map((included, i) => (
                          <td key={i} className="p-4 md:p-5 text-center">
                            {included ? (
                              <Check className="mx-auto h-5 w-5 text-newtifi-teal" aria-label="Included" />
                            ) : (
                              <span className="text-gray-400" aria-label="Not included">—</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeContent === 'individual' && (
            <div role="tabpanel" aria-labelledby="tab-individual" className="grid items-start gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-2xl md:text-3xl text-newtifi-navy">Individual membership</h2>
                <p className="mt-4 mb-8 text-base text-gray-600 text-pretty">
                  Join as an individual professional and gain exclusive access to NewTIFI's comprehensive research library, networking events, and policy advocacy opportunities.
                </p>
                <div className="space-y-5">
                  {[
                    { title: 'Full Research Access', desc: 'Access our complete library of peer-reviewed articles, policy papers, and industry reports.' },
                    { title: 'Exclusive Events', desc: 'Attend member-only webinars, workshops, and networking events with industry leaders.' },
                    { title: 'Policy Participation', desc: 'Contribute to policy discussions and advocacy efforts in technology and finance.' },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-newtifi-teal" aria-hidden="true" />
                      <div>
                        <h3 className="font-bold text-newtifi-navy">{item.title}</h3>
                        <p className="mt-1 text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl bg-gray-50 p-8">
                <h3 className="mb-4 text-lg font-bold text-newtifi-navy">Perfect for</h3>
                <ul className="list-disc space-y-2 pl-5 text-gray-600 marker:text-newtifi-teal">
                  <li>Technology professionals and researchers</li>
                  <li>Financial industry experts</li>
                  <li>Policy analysts and consultants</li>
                  <li>Entrepreneurs and startup founders</li>
                  <li>Academic researchers and professors</li>
                </ul>
              </div>
            </div>
          )}

          {activeContent === 'institutional' && (
            <div role="tabpanel" aria-labelledby="tab-institutional" className="grid items-start gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-2xl md:text-3xl text-newtifi-navy">Institutional membership</h2>
                <p className="mt-4 mb-8 text-base text-gray-600 text-pretty">
                  Empower your entire organization with comprehensive access to NewTIFI's resources, custom training programs, and dedicated support for enterprise-level innovation initiatives.
                </p>
                <div className="space-y-5">
                  {[
                    { title: 'Enterprise Access', desc: 'Provide unlimited access to all NewTIFI resources for your entire team.' },
                    { title: 'Custom Training', desc: "Tailored training programs and workshops designed for your organization's specific needs." },
                    { title: 'Dedicated Support', desc: 'Direct access to our team of experts and dedicated account management.' },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-newtifi-navy" aria-hidden="true" />
                      <div>
                        <h3 className="font-bold text-newtifi-navy">{item.title}</h3>
                        <p className="mt-1 text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl bg-gray-50 p-8">
                <h3 className="mb-4 text-lg font-bold text-newtifi-navy">Perfect for</h3>
                <ul className="list-disc space-y-2 pl-5 text-gray-600 marker:text-newtifi-teal">
                  <li>Financial institutions and banks</li>
                  <li>Technology companies and startups</li>
                  <li>Consulting firms and advisory services</li>
                  <li>Research institutions and universities</li>
                  <li>Government agencies and regulators</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      {activeForm && <MembershipForm tier={activeForm} onClose={() => setActiveForm(null)} />}

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="mb-12 max-w-3xl">
            <h2 className="text-2xl md:text-3xl text-newtifi-navy">Luxembourg: innovation powerhouse</h2>
            <p className="mt-4 text-base text-gray-600 text-pretty">
              NewTIFI leverages Luxembourg's strategic advantages and research capabilities in Europe's most dynamic innovation ecosystem.
            </p>
          </div>

          <div className="mb-12 grid gap-6 lg:grid-cols-3">
            {luxembourgStats.map((stat) => (
              <div key={stat.label} className="surface-card flex flex-col p-6">
                <span className="text-3xl text-newtifi-navy tabular-nums">{stat.value}</span>
                <p className="mt-2 font-bold text-newtifi-navy">{stat.label}</p>
                <p className="mt-1 text-sm text-gray-600">{stat.note}</p>
                <div className="mt-4 border-t border-gray-100 pt-4 text-sm text-gray-500">
                  <p>Source: {stat.source}</p>
                  <p className="mt-1">{stat.detailLabel}: {stat.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'FinTech', desc: 'Payments, digital assets, and RegTech programs.' },
              { title: 'HealthTech', desc: 'Clinical innovation and compliant data research.' },
              { title: 'EnergyTech', desc: 'Sustainable finance and grid transformation.' },
              { title: 'FoodTech', desc: 'Supply chain intelligence and resilience.' },
            ].map((pillar) => (
              <div key={pillar.title} className="surface-card p-5">
                <p className="font-bold text-newtifi-navy">{pillar.title}</p>
                <p className="mt-2 text-sm text-gray-600">{pillar.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl bg-newtifi-navy p-6 md:p-8 text-white">
              <h3 className="mb-5 text-lg font-bold">Key advantages</h3>
              <ul className="space-y-4 text-sm">
                {[
                  { title: 'Strategic EU Location', desc: 'Direct access to EU policymakers' },
                  { title: 'Multilingual Expertise', desc: '70% speak 3+ languages' },
                  { title: 'Innovation-Friendly Regulations', desc: 'Progressive technology policies' },
                ].map((item) => (
                  <li key={item.title} className="border-l-2 border-newtifi-teal pl-4">
                    <p className="font-bold">{item.title}</p>
                    <p className="mt-0.5 text-white/75">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="surface-card p-6 md:p-8">
              <h3 className="mb-5 text-lg font-bold text-newtifi-navy">Research institutions</h3>
              <ul className="space-y-2">
                {researchInstitutions.map((inst) => (
                  <li key={inst.href}>
                    <a
                      href={inst.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-lg p-3 transition-colors duration-150 ease-out-strong fine:hover:bg-gray-50"
                    >
                      <div className="flex-1">
                        <p className="font-bold text-newtifi-navy">{inst.name}</p>
                        <p className="mt-0.5 text-sm text-gray-600">{inst.note}</p>
                      </div>
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-gray-400 transition-colors duration-150 ease-out-strong fine:group-hover:text-newtifi-navy"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Membership;
