import React, { useEffect, useState } from 'react';
import { Heart, Zap, Leaf, DollarSign } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import Button from '@/components/Button';
import TechCard from '@/components/TechCard';
import { cn } from '@/lib/utils';

const scholarshipContent = [
  {
    title: 'Doctoral Scholarships',
    description: 'Supporting the next generation of innovators and researchers.',
    details: [
      'Full funding for innovative PhD research projects aligned with NewTIFI\'s focus areas',
      'Access to NewTIFI\'s global network of experts and mentors',
      'Opportunities to present research at international conferences',
      'Support for publishing and commercialization of research findings',
      'Annual stipend and research budget allocation',
      'Integration into NewTIFI\'s research community'
    ]
  },
  {
    title: 'Mentorship Programs',
    description: 'Fostering growth through expert guidance and support.',
    details: [
      'One-on-one mentoring with industry leaders and experts',
      'Regular workshops and skill development sessions',
      'Career development and networking opportunities',
      'Access to NewTIFI\'s resource library and tools',
      'Participation in innovation challenges and hackathons',
      'Opportunities for collaborative research projects'
    ]
  },
  {
    title: 'Research Support',
    description: 'Providing resources for groundbreaking research initiatives.',
    details: [
      'State-of-the-art research facilities and equipment',
      'Access to comprehensive databases and research tools',
      'Funding for conference attendance and publication fees',
      'Collaboration opportunities with partner institutions',
      'Support for patent applications and IP protection',
      'Regular research symposiums and knowledge sharing sessions'
    ]
  }
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

const Home = () => {
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

  return (
    <main className="min-h-screen pb-20">
      {/* Our Journey Section */}
      <section className="px-6 py-32 bg-newtifi-navy text-white">
        <div className="container mx-auto">
          <ScrollReveal direction="right" delay={100} className="max-w-2xl">
            <h1 className="text-2xl md:text-3xl font-light mb-10">Our Journey to a Better Tomorrow</h1>
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-wider leading-tight">
                FOCUS FUND RESEARCH<br />INNOVATE IMPLEMENT
              </h2>
            </div>
            <p className="text-lg md:text-xl leading-relaxed text-white/90 font-light">
              Welcome to the hub of innovation in Food Tech, FinTech, Energy Tech and Health Tech. New Technologies and Investment Fund Institute is your gateway to the future, where funded and applicable technology transforms the way we live.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative bg-white py-16">
        <div className="container mx-auto max-w-7xl px-6">
          <ScrollReveal direction="right" delay={100}>
            <div className="bg-newtifi-teal rounded-2xl p-8 md:p-12 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Left side - Main content */}
                <div className="space-y-12">
                  <ScrollReveal direction="right" delay={200}>
                    <h2 className="text-2xl md:text-3xl font-light text-white mb-6">
                      Why NewTIFI
                    </h2>
                    <p className="text-base text-white/90 font-light italic mb-8">
                      We harness the power of researchers, technology, and finance to create meaningful, lasting impact.
                    </p>
                    <h3 className="text-xl font-light text-white mb-4">
                      How We Work
                    </h3>
                    <p className="text-base text-white/90 font-light mb-8">
                      NewTIFI is a global think tank & innovation hub where technology meets finance to shape a better world. We bring together bold thinkers—academics, startups, and investors—to transform breakthrough ideas into real-world impact.
                    </p>
                    <h3 className="text-xl font-light text-white mb-4">
                      What We Do
                    </h3>
                    <p className="text-base text-white/90 font-light mb-6">
                      Through strategic partnerships and high-impact committees, we promote advances in healthcare, food security, sustainable resources, and financial innovation. We foster collaboration, research, and the implementation of breakthrough ideas.
                    </p>
                    <p className="text-base text-white/90 font-light">
                      Become a member—let's build the future together!
                    </p>
            </ScrollReveal>
                </div>

                {/* Right side - Benefits card */}
                <div className="relative">
                  <ScrollReveal direction="right" delay={300}>
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full" />
                    <div className="bg-white rounded-xl shadow-xl p-8 relative">
                      <h2 className="text-xl font-medium text-newtifi-navy mb-4">
                        Join NewTIFI's Global Network
                      </h2>
                      <p className="text-gray-700 mb-6">
                        Connect with industry leaders, access exclusive technology insights, and shape the future of innovation. As a member, you'll gain:
                      </p>
                      <ul className="space-y-4 mb-8">
                        <li className="flex items-center gap-3">
                          <svg className="w-6 h-6 text-newtifi-teal flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="text-gray-700">Exclusive access to technology insights and analysis</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <svg className="w-6 h-6 text-newtifi-teal flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 7.2c0 3.64-6 8.8-6 8.8s-6-5.16-6-8.8a6 6 0 1112 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 9a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="text-gray-700">Direct collaboration with industry innovators</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <svg className="w-6 h-6 text-newtifi-teal flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="text-gray-700">Priority access to our legal and regulatory guidance</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <svg className="w-6 h-6 text-newtifi-teal flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="text-gray-700">Invitations to member-only events and conferences</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <svg className="w-6 h-6 text-newtifi-teal flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="text-gray-700">Opportunities to fund and mentor promising innovators</span>
                        </li>
                      </ul>
                      <div className="aspect-w-16 aspect-h-9 mb-8">
                        <img
                          src="/images/network-meeting.jpg"
                          alt="Global Network Meeting"
                          className="rounded-lg object-cover shadow-lg"
                        />
                      </div>
                      <Button 
                        variant="primary"
                        className="w-full bg-newtifi-navy text-white hover:bg-newtifi-navy/90"
                      >
                        Become a Member
                      </Button>
                    </div>
            </ScrollReveal>
          </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
      
      <div className="h-16"></div>
      
      {/* NewTIFI Pillars */}
      <section className="py-16 px-6 bg-newtifi-grey">
        <div className="container mx-auto max-w-7xl">
          <ScrollReveal direction="right" delay={100} className="mb-12 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl uppercase mb-4 text-newtifi-navy">NewTIFI Pillars</h2>
            <p className="text-xl text-gray-700 font-light">
              Our core focus areas where technology and innovation drive meaningful change.
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ScrollReveal direction="right" delay={200}>
              <div className="bg-white p-8 rounded-lg shadow-lg h-full flex flex-col">
                <div className="text-newtifi-teal mb-6">
                  <Heart className="h-10 w-10" />
                </div>
                <h3 className="text-base font-medium uppercase tracking-wider text-newtifi-navy mb-4">HealthTech</h3>
                <p className="text-gray-700 text-base font-light flex-grow">
                  Empowering and facilitating HealthTech, MedTech, and BioTech innovations that enhance personal care, improve diagnostics, and push the boundaries of treatment for healthier, longer lives for all.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="right" delay={300}>
              <div className="bg-white p-8 rounded-lg shadow-lg h-full flex flex-col">
                <div className="text-newtifi-teal mb-6">
                  <Leaf className="h-10 w-10" />
                </div>
                <h3 className="text-base font-medium uppercase tracking-wider text-newtifi-navy mb-4">FoodTech</h3>
                <p className="text-gray-700 text-base font-light flex-grow">
                  Revolutionizing the food system through technology to make it safer, more efficient, and sustainable for all—enhancing nutrition, reducing waste, and ensuring access to high-quality food for a healthier and more food-secure world.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="right" delay={400}>
              <div className="bg-white p-8 rounded-lg shadow-lg h-full flex flex-col">
                <div className="text-newtifi-teal mb-6">
                  <Zap className="h-10 w-10" />
                </div>
                <h3 className="text-base font-medium uppercase tracking-wider text-newtifi-navy mb-4">EnergyTech</h3>
                <p className="text-gray-700 text-base font-light flex-grow">
                  Advancing technology that improves how we produce energy, manage water, reduce waste, enhance efficiency, and protect ecosystems—driving the sustainable use and conservation of natural resources for a better future.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="right" delay={500}>
              <div className="bg-white p-8 rounded-lg shadow-lg h-full flex flex-col">
                <div className="text-newtifi-teal mb-6">
                  <DollarSign className="h-10 w-10" />
                </div>
                <h3 className="text-base font-medium uppercase tracking-wider text-newtifi-navy mb-4">FinTech</h3>
                <p className="text-gray-700 text-base font-light flex-grow">
                  Transforming financial services through technology to make them more efficient, accessible, and transparent for all—reinventing the way people and businesses interact with money, mitigate risk, and unlock new economic opportunities in a rapidly evolving world.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* What We Do Section */}
      <section className="py-12 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <ScrollReveal direction="right" delay={100} className="mb-8 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl uppercase mb-3 text-newtifi-navy">What We Do</h2>
            <p className="text-xl text-gray-700 font-light">
              We support innovation across four key areas, providing the tools and expertise needed to turn ideas into impact.
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal direction="right" delay={200}>
              <div className="bg-[#F5F7FA] p-8 rounded-lg border border-gray-100 h-full flex flex-col">
                <div className="text-newtifi-teal mb-4">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
          </div>
                <h3 className="text-lg font-medium uppercase tracking-wider text-newtifi-navy mb-3">Research Support</h3>
                <p className="text-base text-gray-700 font-light flex-grow">
                  We provide funding, resources, and expertise to help researchers develop and validate breakthrough technologies.
                </p>
        </div>
          </ScrollReveal>
          
            <ScrollReveal direction="right" delay={300}>
              <div className="bg-[#F5F7FA] p-8 rounded-lg border border-gray-100 h-full flex flex-col">
                <div className="text-newtifi-teal mb-4">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium uppercase tracking-wider text-newtifi-navy mb-3">Network Building</h3>
                <p className="text-base text-gray-700 font-light flex-grow">
                  We connect innovators with industry leaders, investors, and other stakeholders to accelerate development and adoption.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="right" delay={400}>
              <div className="bg-[#F5F7FA] p-8 rounded-lg border border-gray-100 h-full flex flex-col">
                <div className="text-newtifi-teal mb-4">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium uppercase tracking-wider text-newtifi-navy mb-3">Validation & Testing</h3>
                <p className="text-base text-gray-700 font-light flex-grow">
                  We help validate technologies through rigorous testing and real-world pilots to ensure effectiveness and scalability.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="right" delay={500}>
              <div className="bg-[#F5F7FA] p-8 rounded-lg border border-gray-100 h-full flex flex-col">
                <div className="text-newtifi-teal mb-4">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium uppercase tracking-wider text-newtifi-navy mb-3">Impact Scaling</h3>
                <p className="text-base text-gray-700 font-light flex-grow">
                  We provide strategic guidance and resources to help proven technologies achieve widespread adoption and impact.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* Scholarship & Education */}
      <section className="px-6 pb-20 bg-white">
        <div className="container mx-auto max-w-7xl">
          <ScrollReveal direction="right" delay={100}>
            <div className="bg-newtifi-navy rounded-2xl p-8 md:p-12">
              <ScrollReveal direction="right" delay={200} className="mb-12 text-center">
                <h2 className="text-3xl md:text-4xl uppercase mb-4 text-white">Scholarship & Education</h2>
                <p className="text-xl text-white/80 font-light">
                  Empowering the next generation of innovators through education and research support.
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
                        "px-8 py-4 rounded-lg text-lg font-light transition-all duration-300",
                        "border border-white/20 backdrop-blur-sm",
                        activeScholarship === item.title
                          ? "bg-[#6F8FBF] text-white"
                          : "bg-transparent hover:bg-white/10 text-white"
                      )}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              </ScrollReveal>

              {/* Content */}
              <ScrollReveal direction="right" delay={400}>
                <div className="mt-12">
                  <h3 className="text-2xl font-light italic mb-6 text-white">
                    {scholarshipContent.find(s => s.title === activeScholarship)?.description}
                  </h3>
                  <p className="text-lg text-white/80 leading-relaxed">
                    Our comprehensive education and research support programs are designed to nurture talent and drive innovation. 
                    Through structured mentorship, funding, and resources, we help researchers and scholars transform their ideas into impactful solutions.
                  </p>
                  <div className="mt-8">
                    <ul className="space-y-3">
                      {scholarshipContent.find(s => s.title === activeScholarship)?.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2 text-base text-white/80">
                          <span className="text-newtifi-teal mt-1">•</span>
                          {detail}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
              </ScrollReveal>
              </div>
            </ScrollReveal>
        </div>
      </section>
      
      {/* Trusted Legal Insight */}
      <section className="px-6 pb-20 bg-white">
        <div className="container mx-auto max-w-7xl">
          <ScrollReveal direction="right" delay={100}>
            <div className="bg-[#F5F7FA] rounded-2xl p-8 md:p-12">
              <ScrollReveal direction="right" delay={200} className="mb-12 text-center">
                <h2 className="text-3xl md:text-4xl uppercase mb-4 text-newtifi-navy">Trusted Legal Insight</h2>
                <p className="text-xl text-gray-700 font-light">
                  Our legal expertise helps organizations navigate the evolving landscape of technology regulation. We provide comprehensive guidance on compliance, risk management, and strategic implementation of innovative solutions while ensuring alignment with legal and regulatory requirements.
                </p>
              </ScrollReveal>
              
              {/* Menu Buttons */}
              <ScrollReveal direction="right" delay={300}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                  {legalInsightContent.map((item, index) => (
                    <button
                      key={item.title}
                      onClick={() => setActiveLegalInsight(item.title)}
                      className={cn(
                        "px-8 py-4 rounded-lg text-lg font-light transition-all duration-300",
                        "border border-newtifi-navy/20 backdrop-blur-sm",
                        activeLegalInsight === item.title
                          ? "bg-newtifi-navy text-white"
                          : "bg-transparent hover:bg-newtifi-navy/10 text-newtifi-navy"
                      )}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              </ScrollReveal>

              {/* Content */}
              <ScrollReveal direction="right" delay={400}>
                <div className="mt-12">
                  <h3 className="text-2xl font-light italic mb-6 text-newtifi-navy">
                    {legalInsightContent.find(l => l.title === activeLegalInsight)?.description}
                  </h3>
                  <div className="mt-8">
                    <ul className="space-y-3">
                      {legalInsightContent.find(l => l.title === activeLegalInsight)?.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2 text-base text-gray-700">
                          <span className="text-newtifi-teal mt-1">•</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
              </div>
              </div>
              </ScrollReveal>
            </div>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Join the Institute */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-7xl">
          <ScrollReveal direction="right" delay={100}>
            <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 relative overflow-hidden max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center relative">
                {/* Left side - Content */}
                <div className="space-y-6 flex-1">
                  <ScrollReveal direction="right" delay={200}>
                    <h2 className="text-2xl md:text-3xl uppercase text-newtifi-navy">
                      Join Our Global Network
              </h2>
                    <p className="text-lg text-gray-700 font-light">
                      Connect with innovators, researchers, and industry leaders shaping the future of technology.
                    </p>
                  </ScrollReveal>

                  <ScrollReveal direction="right" delay={300}>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-newtifi-teal rounded-full" />
                        <span className="text-gray-700">Access to exclusive research and insights</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-newtifi-teal rounded-full" />
                        <span className="text-gray-700">Collaboration opportunities with industry leaders</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-newtifi-teal rounded-full" />
                        <span className="text-gray-700">Priority access to events and workshops</span>
                      </div>
                    </div>
            </ScrollReveal>
            
                  <ScrollReveal direction="right" delay={400}>
                    <Button 
                      to="/membership" 
                      className="bg-newtifi-navy text-white hover:bg-newtifi-teal transition-colors duration-300"
                    >
                      Become a Member
                    </Button>
                  </ScrollReveal>
                </div>

                {/* Right side - Image with overlay */}
                <ScrollReveal direction="left" delay={300}>
                  <div className="relative w-32 lg:w-40 aspect-[3/4] rounded-xl overflow-hidden group">
                    <img
                      src="https://newtifi.com/wp-content/uploads/2024/08/009ea3ac2018c459ce84161d1b88796f.png"
                      alt="NewTIFI Global Network"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-newtifi-navy/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-xs font-light">
                        Join our community of innovators and shape the future of technology.
                      </p>
                    </div>
                  </div>
            </ScrollReveal>
          </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default Home;
