import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import Button from '@/components/Button';
import PageHero from '@/components/PageHero';
import { urlFactory } from '@/lib/urls/UrlFactory';

// Team member detailed data
const teamMembersData = [
  {
    name: 'Ezechiel Havrenne, L.L.M.',
    urlName: 'ezechiel-havrenne-llm',
    title: 'Chair & President',
    shortBio: 'Leading NewTIFI\'s vision as Chair and President, driving technological innovation and sustainable development.',
    fullBio: `Ezechiel Havrenne is a recognised authority in the fields of investment fund structuring and management, financial regulation, and FinTech. He serves as Chairman of the New Technologies & Investment Funds Institute, which he co-founded to empower scientific breakthroughs that create lasting societal impact through innovation in technology and finance

Ezechiel is a Managing Director, General Counsel, and a member of the Management and Investment Committee at Squircle Capital, a Luxembourg-based private equity firm managing capital for global family offices, sovereign investors, and institutional partners. He has led the structuring and launch of multiple alternative investment funds, and plays a central role in the firm’s investment, divestment, and governance processes

Prior to joining Squircle Capital, Ezechiel had a successful career in private practice as Equity Partner and Head of the Fund Practice at an international law firm. There, he advised alternative fund managers, credit institutions, and professional investors on the design and operation of cross-border investment structures. His work spanned fund formation, investor negotiations, regulatory engagement, and capital deployment across private equity, private debt, real estate, and infrastructure strategies

A prolific author and academic, Ezechiel has written extensively with a focus on European investment fund law and policy. He has been teaching for many years at the Luxembourg School of Business and the University of Luxembourg School of Law on Alternative Investment Funds and Business Law. He also served as Editor-in-Chief of Jurisnews – Investment Management (Larcier) for over a decade and Co-Editor-in-Chief of the European Investment Fund Review (Anthemis), and is a frequent speaker at international fund conferences

Ezechiel holds an LL.M. from the University of Pennsylvania Carey Law School, and law degrees from the Université Catholique de Louvain and the Complutense University of Madrid, including a one-year EU-sponsored Erasmus programme. He is fluent in English and French, and has a good command of Spanish, Dutch and German. A Belgian national, he lives in Luxembourg with his wife and their ten children.
`,
    expertise: [
      'Structuring, formation, and cross-border regulation of investment vehicles',
      'Strategic advisory for fund managers, credit institutions, professional investors, and Tech start-ups',
      'Fundraising strategy, investor onboarding, and negotiation strategies in private capital markets',
      'Editorial leadership and scientific publishing in investment fund law, financial regulation and policy development',
      'Academic teaching and curriculum design in alternative investment funds and Luxembourg tax law'
    ],
    achievements: [
      'Co-founded and chairs the New Technologies & Investment Funds Institute, a non-profit advancing namely scientific publishing, education, and policy at the intersection of technology and finance',
      'Became partner in private practice after just five and a half years in the field, leading the structuring and launch of numerous alternative investment funds across private equity, debt, real estate, and infrastructure',
      'Authored and edited a substantial body of publications on European fund regulation, fund structuring, liquidity management, and financial innovation',
      'Served for over a decade as (co-)editor-in-chief of leading investment fund journals and reviews, helping shape academic and industry dialogue',
      'Has been teaching at the Luxembourg School of Business and the University of Luxembourg, mentoring future professionals in alternative investment funds and business law',
      'Advised FinTechs, EnergyTechs and BioTechs (including start-ups) on legal, regulatory & tax readiness, capital structuring, and growth strategies aligned with sustainable finance'
    ],
    imageSrc: '/assets/images/team/ezechiel-havrenne.jpg',
    linkedin: 'https://lu.linkedin.com/in/ezechiel-havrenne-b3215246'
  },
  {
    name: 'Karlo Definis, FICP',
    urlName: 'karlo-definis-ficp',
    title: 'Head of Operations & Digital Transformation',
    shortBio: 'Karlo leads operations and digital business transformation at NewTIFI from April 2024: process redesign, digital adaptation, and practical AI in workflows with human review.',
    fullBio: `Karlo Definis has led operations and digital transformation at NewTIFI since April 2024. He runs day-to-day delivery across research, policy, and education at a Luxembourg institute working at the intersection of technology and investment funds.

His focus is digitalisation of the institute's operating model: process design and workflow remapping, evaluating tools and providers, comparing alternatives, and adapting how teams work so research and policy delivery stay coherent. He trains colleagues onto the new processes and designs internal automation and AI-supported reporting, always with human review before anything external. He also coordinates a global expert network and cross-border financial-services policy work.

From April 2026 he is also CFO and Commercial Director at TENET Arhitektura. Architecture there sits with the Director of Architecture.`,
    expertise: [
      'Operations and digital business transformation across research, policy, and education',
      'Process design, workflow remapping, and operating-model adaptation',
      'Technology evaluation and provider selection for institute workflows',
      'AI-supported reporting and automation with human review',
      'Expert network coordination and cross-border financial-services policy work'
    ],
    achievements: [
      'Head of Operations & Digital Transformation at NewTIFI since April 2024',
      'Leads digitalisation and operating-model adaptation across institute delivery',
      'Evaluates tools and providers, then remaps workflows for research and policy work',
      'Builds AI-supported reporting and internal automation with mandatory human review'
    ],
    imageSrc: '/assets/images/team/karlo-definis.jpg',
    linkedin: 'https://linkedin.com/in/karlo-definis'
  },
  {
    name: 'Delphine Filsack',
    urlName: 'delphine-filsack',
    title: 'Scientific Advisor',
    shortBio: 'Bridging emerging energy technologies and the financial sector with a focus on sustainable innovation.',
    fullBio: `Delphine brings a unique bridge between emerging energy technologies and the financial sector. With a career rooted in the power supply sector, Delphine leverages deep technical understanding of battery storage and clean power solutions to inform strategic investment research and foster real-world impact.

An out-of-the-box thinker, Delphine excels in crafting sustainable business development strategies that endure, aligning cutting-edge technology with mid- to long-term return objectives. Passionate about accelerating the transition to a cleaner, more resilient energy landscape, Delphine collaborates across disciplines to translate scientific breakthroughs and innovations into investable opportunities.`,
    expertise: [
      'Battery Storage Systems – Technology assessment, integration strategies, lifecycle optimisation',
      'Clean Power Supply – Renewables project feasibility, grid-scale deployment, sustainability metrics',
      'Strategic Innovation – Cross-sector partnerships, go-to-market roadmaps, investment thesis development',
      'Sustainable Business Development – Long-term value creation, impact measurement, stakeholder engagement'
    ],
    achievements: [
      'Clean Energy – Driving adoption of zero-emission power technologies',
      'Water – Exploring WaterTech for water management and purification solutions',
      'Agriculture – Advancing precision AgriTech for sustainable food systems'
    ],
    imageSrc: '/assets/images/team/delphine-filsack.jpg',
    linkedin: 'https://linkedin.com/in/delphine-filsack'
  }
];

const LinkedinGlyph = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
    <path d="M29 0H3C1.343 0 0 1.343 0 3v26c0 1.657 1.343 3 3 3h26c1.657 0 3-1.343 3-3V3c0-1.657-1.343-3-3-3zM9.339 27.339H4.661V12.661h4.678v14.678zM7 10.661c-1.5 0-2.661-1.161-2.661-2.661S5.5 5.339 7 5.339s2.661 1.161 2.661 2.661-1.161 2.661-2.661 2.661zm20.339 16.678h-4.678v-7.339c0-1.75-.032-4-2.438-4-2.438 0-2.812 1.903-2.812 3.872v7.467h-4.678V12.661h4.489v2.003h.064c.625-1.183 2.151-2.438 4.428-2.438 4.736 0 5.611 3.118 5.611 7.176v7.937z"/>
  </svg>
);

const iconLinkClasses =
  'inline-flex h-11 items-center gap-2 rounded-lg px-4 text-sm text-white ring-1 ring-inset ring-white/25 transition-[box-shadow,transform] duration-150 ease-out-strong active:scale-[0.97] motion-reduce:transition-none fine:hover:ring-white/60';

const Person = () => {
  const { name } = useParams();
  const member = teamMembersData.find(m => m.urlName === name);

  if (!member) {
    return (
      <PageHero
        title="Person not found"
        lede="This profile is not available. Please return to the team page."
      >
        <Button to="/who-we-are" variant="inverse">
          Back to who we are
        </Button>
      </PageHero>
    );
  }

  const email = `${member.urlName.split('-')[0]}.${member.urlName.split('-')[1]}@newtifi.com`;

  return (
    <div className="bg-white pb-20">
      <PageHero
        compact
        title={member.name}
        lede={member.title}
        crumbs={[
          { label: 'Who we are', to: '/who-we-are' },
          { label: member.name },
        ]}
      >
        <Link to="/who-we-are" className={iconLinkClasses}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to team
        </Link>
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className={iconLinkClasses}>
            <LinkedinGlyph />
            LinkedIn
          </a>
        )}
        <a href={urlFactory.getEmailUrl(email)} className={iconLinkClasses}>
          <Mail className="h-4 w-4" aria-hidden="true" />
          Email
        </a>
      </PageHero>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14">
          <img
            src={member.imageSrc}
            alt={member.name}
            className="photo aspect-[4/5] w-full max-w-[16rem] rounded-2xl object-cover shadow-card"
            style={{ objectPosition: member.name === 'Delphine Filsack' ? 'center 30%' : 'center 40%' }}
          />
          <div className="max-w-3xl space-y-4">
            {member.fullBio.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-base leading-relaxed text-gray-700 text-pretty">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {member.expertise && member.expertise.length > 0 && (
            <div className="rounded-2xl bg-gray-50 p-6 md:p-8">
              <h2 className="mb-4 text-lg font-bold text-newtifi-navy">Areas of expertise</h2>
              <ul className="list-disc space-y-2 pl-5 text-gray-700 marker:text-newtifi-teal">
                {member.expertise.map((item, index) => (
                  <li key={index} className="leading-relaxed text-pretty">{item}</li>
                ))}
              </ul>
            </div>
          )}
          {member.achievements && member.achievements.length > 0 && (
            <div className="rounded-2xl bg-gray-50 p-6 md:p-8">
              <h2 className="mb-4 text-lg font-bold text-newtifi-navy">Key achievements</h2>
              <ul className="list-disc space-y-2 pl-5 text-gray-700 marker:text-newtifi-teal">
                {member.achievements.map((item, index) => (
                  <li key={index} className="leading-relaxed text-pretty">{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Person;
