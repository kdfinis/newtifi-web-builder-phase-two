import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Linkedin, Mail } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { urlFactory } from '@/lib/urls/UrlFactory';

// Team member detailed data
const teamMembersData = [
  {
    name: 'Ezechiel Havrenne, L.L.M.',
    urlName: 'ezechiel-havrenne-llm',
    title: 'Chairman',
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
    title: 'COO & General Secretary',
    shortBio: 'Overseeing operational excellence and strategic initiatives across NewTIFI\'s programs and partnerships.',
    fullBio: `Karlo Definis is a senior executive with a strong record of operational leadership, strategic execution, and client-focused program delivery. As Chief Operating Officer and General Secretary of NewTIFI, he is responsible for managing internal operations, coordinating institutional initiatives, and ensuring effective execution across research, policy, and education programs. His approach is defined by accountability, clear systems thinking, and an ability to implement institutional priorities with discipline and integrity.

Prior to this role, Karlo served as Director of the Executive Master in Financial Services Innovation at Luxembourg School of Business, where he led one of the institution’s flagship programs for industry professionals. His work spanned program design, marketing strategy, and corporate outreach, with direct responsibility for relationship management and business development across key institutional clients. He has successfully translated academic objectives into commercially viable solutions and built long-term partnerships based on trust and value delivery.

Karlo also led the full digital transformation of the business school, overseeing the design and implementation of enterprise-level cloud systems, online learning environments, and digital infrastructure for both faculty and administrative teams. As a certified IT professional, he continues to advise on technology integration and automation, with a particular focus on operational efficiency, compliance workflows, and contributed to the development of AI tools and solutions.

Throughout his career, he has taken on key roles in accreditation and audit readiness, managing complex documentation processes aligned with European quality standards and national frameworks. He is known for his attention to detail, clarity in communication, and ability to align strategic goals with measurable execution.`,
    expertise: [
      'Executive operations and institutional management',
      'Client relationship development and stakeholder engagement',
      'Sales strategy, B2B marketing, and corporate outreach',
      'Digital transformation, cloud systems, and IT integration',
      'AI tools and applied innovation in organizational settings',
      'Program design and professional learning delivery',
      'Accreditation management and audit preparation under European standards'
    ],
    achievements: [
      'Directed the Executive Master in Financial Services Innovation, aligning business education with the needs of the financial industry',
      'Led full-scale digital transformation of academic operations at LSB, including cloud infrastructure and virtual delivery models',
      'Contributed to the development of AI tools and solutions for internal and external institutional use',
      'Designed and delivered client-facing education programs with lasting institutional partnerships',
      'Managed accreditation documentation and audits across multiple quality frameworks, ensuring full compliance and institutional readiness'
    ],
    imageSrc: '/assets/images/team/karlo-definis.jpg',
    linkedin: 'https://linkedin.com/in/karlo-definis'
  },
  {
    name: 'Vlado Sutlovic, FICP',
    urlName: 'vlado-sutlovic-ficp',
    title: 'Treasurer',
    shortBio: 'MSc in Business Economics with expertise in AML Compliance and Risk Management, attained through multi-year tenures in global fintech and investment banks.',
    fullBio: `Vlado Sutlovic is a MSc in Business Economics with expertise in AML Compliance and Risk Management, attained through multi-year tenures in global fintech and investment banks.

He is serving as treasurer and member of the Board of NewTIFI. Over the past years, Vlado has researched interdependencies between the banking and funds sectors in the EU, focusing on German and Luxembourg markets and future regulation implementations.`,
    expertise: [
      'AML Compliance',
      'Risk Management',
      'Financial Operations',
      'Regulatory Compliance'
    ],
    achievements: [
      'Established robust financial control systems',
      'Implemented comprehensive AML framework',
      'Secured sustainable funding streams',
      'Developed strategic financial partnerships'
    ],
    imageSrc: '/assets/images/team/vlado-sutlovic.jpeg',
    linkedin: 'https://linkedin.com/in/vlado-sutlovic'
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

const Person = () => {
  const { name } = useParams();
  const member = teamMembersData.find(m => m.urlName === name);

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-extralight uppercase tracking-[0.12em] text-gray-800 mb-4">Person not found</h1>
          <Link to="/" className="text-newtifi-teal hover:underline">
            Return to Team
          </Link>
        </div>
      </div>
    );
  }

  if (
    member.urlName === 'ezechiel-havrenne-llm' ||
    member.urlName === 'karlo-definis-ficp' ||
    member.urlName === 'vlado-sutlovic-ficp' ||
    member.urlName === 'delphine-filsack'
  ) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#e6f7fa] to-[#fafdff] flex items-center justify-center pb-8 px-2" style={{ paddingTop: '112px' }}>
    <div className="w-full bg-white rounded-2xl shadow-2xl p-0 md:p-0 overflow-hidden">
          {/* Header with color and social */}
          <div className="bg-[#00C2CB] px-12 py-8 flex flex-col md:flex-row items-center md:items-end gap-4">
            <div className="flex-1">
              <h1 className="text-4xl md:text-4xl font-extralight uppercase tracking-[0.12em] text-white mb-1">{member.name}</h1>
              <h2 className="text-2xl text-white font-medium">{member.title}</h2>
            </div>
            <div className="flex gap-4 mt-2 md:mt-0">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white text-[#0077B5] hover:bg-[#e6f7fa] transition-colors shadow flex items-center justify-center"
                  style={{ minWidth: 44, minHeight: 44 }}
                  aria-label="LinkedIn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="currentColor">
                    <path d="M29 0H3C1.343 0 0 1.343 0 3v26c0 1.657 1.343 3 3 3h26c1.657 0 3-1.343 3-3V3c0-1.657-1.343-3-3-3zM9.339 27.339H4.661V12.661h4.678v14.678zM7 10.661c-1.5 0-2.661-1.161-2.661-2.661S5.5 5.339 7 5.339s2.661 1.161 2.661 2.661-1.161 2.661-2.661 2.661zm20.339 16.678h-4.678v-7.339c0-1.75-.032-4-2.438-4-2.438 0-2.812 1.903-2.812 3.872v7.467h-4.678V12.661h4.489v2.003h.064c.625-1.183 2.151-2.438 4.428-2.438 4.736 0 5.611 3.118 5.611 7.176v7.937z"/>
                  </svg>
                </a>
              )}
              <a
                href={urlFactory.getEmailUrl(`${member.urlName.split('-')[0]}.${member.urlName.split('-')[1]}@newtifi.com`)}
                className="p-3 rounded-full bg-white text-[#00C2CB] hover:bg-[#e6f7fa] transition-colors shadow flex items-center justify-center"
                style={{ minWidth: 44, minHeight: 44 }}
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
          {/* Main content with image float and text wrap */}
          <div className="px-12 md:px-20 py-12 bg-white">
            <div className="relative">
              <img
                src={member.imageSrc}
                alt={member.name}
                className="w-52 h-64 object-cover rounded-2xl shadow-sm border-2 border-newtifi-teal float-left mr-12 mb-6"
                style={{ maxWidth: 220 }}
              />
              <div className="overflow-hidden">
                {member.fullBio.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-[#0A0A23] text-justify">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            {/* Expertise & Achievements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
              {member.expertise && member.expertise.length > 0 && (
                <div className="bg-newtifi-teal rounded-2xl p-8 shadow-sm border border-newtifi-teal/20">
                  <h3 className="text-base font-extralight uppercase tracking-[0.12em] mb-4 text-white">Areas of Expertise</h3>
                  <ul className="list-disc list-inside space-y-2 text-white">
                    {member.expertise.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {member.achievements && member.achievements.length > 0 && (
                <div className="bg-[#0A0A23] rounded-xl p-8 shadow-lg">
                  <h3 className="text-base font-extralight uppercase tracking-[0.12em] mb-4 text-[#00C2CB]">Key Achievements</h3>
                  <ul className="list-disc list-inside space-y-2 text-white">
                    {member.achievements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header with back button */}
      <header className="bg-newtifi-navy text-white">
        <div className="container mx-auto px-6 py-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Team
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-32 bg-gradient-to-br from-newtifi-navy via-newtifi-navy/95 to-newtifi-teal/20 text-white overflow-hidden">
        {/* Background Graphics */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-white/10 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-newtifi-teal/10 rounded-full"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 border border-white/10 transform rotate-45"></div>
        
        {/* Stencil-style decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path d="M20,20 L180,20 L180,180 L20,180 Z" stroke="white" strokeWidth="2" fill="none"/>
            <circle cx="100" cy="100" r="40" stroke="white" strokeWidth="2" fill="none"/>
            <path d="M60,100 L140,100 M100,60 L100,140" stroke="white" strokeWidth="2"/>
          </svg>
        </div>

        <div className="container mx-auto relative">
          <div className="w-full">
            <ScrollReveal>
              <h1 className="text-2xl md:text-2xl font-light mb-10">Team Member</h1>
              <div className="mb-10">
                <h2 className="text-2xl md:text-4xl lg:text-4xl font-extralight tracking-wider leading-tight uppercase">
                  Meet <span className="text-newtifi-teal">{member.name}</span>
                </h2>
              </div>
              <p className="text-base md:text-base leading-relaxed text-white/90 font-light">
                Learn more about our team member and their contributions to NewTIFI's mission.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="container mx-auto px-6 py-12">
    <div className="w-full mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 flex flex-col md:flex-row gap-12">
          {/* Left: Profile Photo */}
          <div className="flex-shrink-0 flex flex-col items-center w-full md:w-1/3">
            <img
              src={member.imageSrc}
              alt={member.name}
              className="w-56 h-56 md:w-64 md:h-64 rounded-xl object-cover border border-gray-200 shadow mb-6"
              style={{ objectPosition: member.name === 'Delphine Filsack' ? 'center 30%' : 'center 40%' }}
            />
            <div className="flex gap-4 mt-2">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-full bg-white text-[#0077B5] hover:bg-[#e6f7fa] transition-colors shadow flex items-center justify-center"
                  style={{ minWidth: 56, minHeight: 56 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
                    <path d="M29 0H3C1.343 0 0 1.343 0 3v26c0 1.657 1.343 3 3 3h26c1.657 0 3-1.343 3-3V3c0-1.657-1.343-3-3-3zM9.339 27.339H4.661V12.661h4.678v14.678zM7 10.661c-1.5 0-2.661-1.161-2.661-2.661S5.5 5.339 7 5.339s2.661 1.161 2.661 2.661-1.161 2.661-2.661 2.661zm20.339 16.678h-4.678v-7.339c0-1.75-.032-4-2.438-4-2.438 0-2.812 1.903-2.812 3.872v7.467h-4.678V12.661h4.489v2.003h.064c.625-1.183 2.151-2.438 4.428-2.438 4.736 0 5.611 3.118 5.611 7.176v7.937z"/>
                  </svg>
                </a>
              )}
              <a
                href={urlFactory.getEmailUrl(`${member.urlName.split('-')[0]}.${member.urlName.split('-')[1]}@newtifi.com`)}
                className="p-4 rounded-full bg-white text-[#00C2CB] hover:bg-[#e6f7fa] transition-colors shadow flex items-center justify-center"
                style={{ minWidth: 56, minHeight: 56 }}
              >
                <Mail className="h-8 w-8" />
              </a>
            </div>
          </div>
          {/* Right: Content */}
          <div className="flex-1 flex flex-col gap-8">
            <div>
              <h1 className="text-4xl font-extralight uppercase tracking-[0.12em] text-newtifi-navy mb-1">{member.name}</h1>
              <p className="text-base text-gray-600 mb-4">{member.title}</p>
              <div className="prose prose max-w-none">
                {member.fullBio.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-600 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            {/* Expertise & Achievements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {member.expertise && member.expertise.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 shadow-sm">
                  <h2 className="text-base font-semibold text-newtifi-navy mb-4">Areas of Expertise</h2>
                  <ul className="space-y-3">
                    {member.expertise.map((item, index) => (
                      <li key={index} className="flex items-center gap-3 text-base">
                        <div className="w-2 h-2 bg-newtifi-teal rounded-full mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 align-middle">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {member.achievements && member.achievements.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 shadow-sm">
                  <h2 className="text-base font-semibold text-newtifi-navy mb-4">Key Achievements</h2>
                  <ul className="space-y-3">
                    {member.achievements.map((item, index) => (
                      <li key={index} className="flex items-center gap-3 text-base">
                        <div className="w-2 h-2 bg-newtifi-teal rounded-full mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 align-middle">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Person; 