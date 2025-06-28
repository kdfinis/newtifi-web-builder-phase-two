import React, { useEffect, useState } from 'react';
import { Heart, Zap, Leaf, DollarSign } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import Button from '@/components/Button';
import TechCard from '@/components/TechCard';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const scholarshipContent = [
  {
    title: 'Doctoral Scholarships',
    description: 'Supporting the next generation of innovators and researchers.',
    details: [
      'Full funding for innovative PhD research projects aligned with New Technologies and Investment Funds Institute\'s focus areas',
      'Access to New Technologies and Investment Funds Institute\'s global network of experts and mentors',
      'Opportunities to present research at international conferences',
      'Support for publishing and commercialization of research findings',
      'Annual stipend and research budget allocation',
      'Integration into New Technologies and Investment Funds Institute\'s research community'
    ]
  },
  {
    title: 'Mentorship Programs',
    description: 'Fostering growth through expert guidance and support.',
    details: [
      'One-on-one mentoring with industry leaders and experts',
      'Regular workshops and skill development sessions',
      'Career development and networking opportunities',
      'Access to New Technologies and Investment Funds Institute\'s resource library and tools',
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

const articleFiles = [
  {
    filename: "2025.06.28_NewTIFI Investment Management Journal - Closed-Ended Luxembourg ELTIFs- Compulsory Redemptions and Compartment Termination & Amalgamation Provisions_Final.pdf",
    url: "/articles/investment-management-journal/2025.06.28_NewTIFI Investment Management Journal - Closed-Ended Luxembourg ELTIFs- Compulsory Redemptions and Compartment Termination & Amalgamation Provisions_Final.pdf"
  },
  {
    filename: "2025.06.28_NewTIFI Investment Management Journal - Investor Oversight or Undue Influence Reassessing BaFin's Stance on AIFM Portfolio Control_Final.pdf",
    url: "/articles/investment-management-journal/2025.06.28_NewTIFI Investment Management Journal - Investor Oversight or Undue Influence Reassessing BaFin's Stance on AIFM Portfolio Control_Final.pdf"
  },
  {
    filename: "2025.06.28_NewTIFI Investment Management Journal - Luxembourg SICARs, SIFs and RAIFs - A 20-year Perspective on the Well-Informed Investor notion_Final.pdf",
    url: "/articles/investment-management-journal/2025.06.28_NewTIFI Investment Management Journal - Luxembourg SICARs, SIFs and RAIFs - A 20-year Perspective on the Well-Informed Investor notion_Final.pdf"
  }
];

function parseArticleMeta(filename) {
  const match = filename.match(/^\d{4}\.\d{2}\.\d{2}_(.+?) - (.+?)_Final\.pdf$/);
  if (!match) return { date: '', title: filename, authors: '' };
  let date = filename.substring(0, 10).replace(/\./g, '-');
  let title = match[2] || filename;
  let authors = '';
  if (title.includes("Closed-Ended Luxembourg ELTIFs")) authors = "Ezechiel Havrenne";
  return { date, title, authors };
}

const Home = () => {
  const navigate = useNavigate();

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
            <h1 className="text-2xl md:text-3xl font-light mb-10">For a Journey to a Better Tomorrow</h1>
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-wider leading-tight">
                FOCUS RESEARCH<br />INNOVATE IMPLEMENT
              </h2>
            </div>
            <p className="text-lg md:text-xl leading-relaxed text-white/90 font-light">
              Welcome to the hub where Scientific, Tech and Finance Professionals meet
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Hero Section with Overview and Latest News */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pb-0 mb-0">
        <div className="container mx-auto px-6 py-20 pb-4 mb-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left side - New Technologies and Investment Funds Institute Overview */}
            <ScrollReveal direction="right" delay={100}>
              <div className="space-y-8">
                <h1 className="text-4xl md:text-5xl font-light text-newtifi-navy">
                  New Technologies and Investment Funds Institute
                </h1>
                <p className="text-xl text-gray-700">
                  A global research institute dedicated to advancing technology innovation and fostering sustainable development through interdisciplinary collaboration.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-newtifi-teal rounded-full mt-3" />
                    <p className="text-gray-700">Bridging technology and finance for meaningful impact</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-newtifi-teal rounded-full mt-3" />
                    <p className="text-gray-700">Connecting researchers, innovators, academics and industry leaders</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-newtifi-teal rounded-full mt-3" />
                    <p className="text-gray-700">Driving sustainable technological advancement</p>
                  </div>
                </div>
                <Button 
                  to="/about" 
                  className="bg-newtifi-navy text-white hover:bg-newtifi-teal transition-all duration-300 transform hover:scale-105"
                >
                  Learn More About Us
                </Button>
              </div>
            </ScrollReveal>

            {/* Right side - Journal and News Column */}
            <div className="flex flex-col gap-6 mb-0 pb-0">
              {/* Investment Management Journal - Separate Box */}
              <ScrollReveal direction="left" delay={180}>
                <div className="bg-gradient-to-r from-newtifi-teal/10 to-newtifi-navy/5 border border-newtifi-teal/20 rounded-2xl p-6 shadow-2xl hover:shadow-2xl transition-all duration-300 cursor-pointer group">
                  <div onClick={() => navigate('/publishing/journals/investment-management')} className="cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-newtifi-teal/20 rounded-lg">
                        <svg className="w-5 h-5 text-newtifi-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-newtifi-navy group-hover:text-newtifi-teal transition-colors">
                        Investment Management Journal
                      </h3>
                    </div>
                    <p className="text-base md:text-lg text-gray-600 font-light mb-3">
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

              {/* Latest News & Articles - Directly Under Journal Box */}
              <ScrollReveal direction="left" delay={200}>
                <div className="bg-[#F5F7FA] rounded-2xl p-8 shadow-2xl">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-semibold text-newtifi-navy">Latest News & Articles</h2>
                    <Button 
                      to="/publishing/journals/investment-management" 
                      className="text-newtifi-navy hover:text-newtifi-teal transition-colors duration-300 flex items-center gap-2"
                    >
                      View All
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Button>
                  </div>
                  <div className="space-y-6">
                    {articleFiles.slice(0,2).map((file, index) => {
                      const meta = parseArticleMeta(file.filename);
                      return (
                        <div 
                          key={index}
                          className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
                          onClick={() => navigate(`/publishing/journals/investment-management/article/${encodeURIComponent(file.filename)}`)}
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 gap-1 md:gap-0">
                            <h3 className="text-lg font-medium text-newtifi-navy mb-0 md:mb-0">{meta.title}</h3>
                            <div className="flex items-center gap-3 flex-shrink-0">
                              <span className="text-sm text-newtifi-teal whitespace-nowrap">Journal Article</span>
                              <span className="text-sm text-gray-500 whitespace-nowrap">{meta.date}</span>
                              {meta.authors && <span className="text-sm text-gray-500 whitespace-nowrap">By {meta.authors}</span>}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
      
      {/* New Technologies and Investment Funds Institute Pillars & What We Do */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <ScrollReveal direction="right" delay={100}>
            <div className="bg-newtifi-navy rounded-2xl p-8 md:p-12">
              {/* New Technologies and Investment Funds Institute Pillars Section */}
              <ScrollReveal direction="right" delay={200}>
                <h2 className="text-3xl md:text-4xl text-center mb-4 text-white">
                  New Technologies and Investment Funds Institute Pillars
                </h2>
                <h3 className="text-xl text-white/80 text-center mb-12">
                  Technology Pillars
                </h3>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                {[
                  {
                    title: "HealthTech",
                    description: "Enhancing personal care and diagnostics through innovative technology solutions.",
                    icon: "🏥",
                    image: "/images/health-tech.jpg"
                  },
                  {
                    title: "FoodTech",
                    description: "Transforming food systems for greater efficiency and sustainability.",
                    icon: "🌱",
                    image: "/images/food-tech.jpg"
                  },
                  {
                    title: "EnergyTech",
                    description: "Advancing resource management and conservation technologies.",
                    icon: "⚡",
                    image: "/images/energy-tech.jpg"
                  },
                  {
                    title: "FinTech",
                    description: "Revolutionizing financial services through cutting-edge technology.",
                    icon: "💳",
                    image: "/images/fin-tech.jpg"
                  }
                ].map((pillar, index) => (
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
                      <h3 className="text-xl font-semibold mb-3 text-newtifi-navy">{pillar.title}</h3>
                      <p className="text-gray-700 flex-grow">{pillar.description}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* What We Do Section */}
              <ScrollReveal direction="right" delay={200}>
                <h2 className="text-3xl md:text-4xl text-center mb-4 text-white">
                  New Technologies and Investment Funds Institute Pillars
                </h2>
                <h3 className="text-xl text-white/80 text-center mb-12">
                  Financial Pillars
                </h3>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    title: "Investment Funds",
                    description: "Strategic investment vehicles designed to maximize returns while managing risk through diversified portfolios.",
                    icon: "💰"
                  },
                  {
                    title: "Securitisation Vehicles",
                    description: "Innovative structures that transform illiquid assets into tradable securities, enhancing market liquidity.",
                    icon: "📊"
                  },
                  {
                    title: "Pension Funds",
                    description: "Long-term investment solutions focused on securing retirement benefits through prudent asset management.",
                    icon: "🏦"
                  },
                  {
                    title: "Insurance Products",
                    description: "Comprehensive risk management solutions providing protection and financial security for various contingencies.",
                    icon: "🛡️"
                  }
                ].map((item, index) => (
                  <ScrollReveal 
                    key={item.title} 
                    direction="right" 
                    delay={200 + (index * 100)}
                    className="transform transition-all duration-300 hover:scale-105"
                  >
                    <div className="bg-white rounded-2xl p-8 shadow-lg h-full flex flex-col">
                      <div className="text-4xl mb-4">{item.icon}</div>
                      <h3 className="text-xl font-semibold mb-3 text-newtifi-navy">{item.title}</h3>
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
                <h2 className="text-3xl md:text-4xl uppercase mb-4 text-newtifi-navy">Scholarship & Education</h2>
                <p className="text-xl text-gray-700 font-light">
                  Our comprehensive scholarship programs support academic excellence and professional development in technology innovation.
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
                        "border border-newtifi-navy/20 backdrop-blur-sm",
                        activeScholarship === item.title
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
                    {scholarshipContent.find(s => s.title === activeScholarship)?.description}
                  </h3>
                  <div className="mt-8">
                    <ul className="space-y-3">
                      {scholarshipContent.find(s => s.title === activeScholarship)?.details.map((detail, i) => (
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
      
      {/* Trusted Legal Insight */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <ScrollReveal direction="right" delay={100}>
            <div className="bg-[#F5F7FA] rounded-2xl p-8 md:p-12">
              <ScrollReveal direction="right" delay={200} className="mb-12 text-center">
                <h2 className="text-3xl md:text-4xl uppercase mb-4 text-newtifi-navy">Trusted Legal Insight</h2>
                <p className="text-xl text-gray-700 font-light">
                  Our legal expertise helps organizations navigate the evolving landscape of technology regulation. We provide comprehensive guidance on compliance, risk management, and strategic implementation of innovative solutions.
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
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <ScrollReveal direction="right" delay={100}>
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 relative overflow-hidden max-w-4xl mx-auto">
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
                      className="bg-newtifi-navy text-white hover:bg-newtifi-teal transition-all duration-300 transform hover:scale-105"
                    >
                      Become a Member
                    </Button>
                  </ScrollReveal>
                </div>

                {/* Right side - Image with overlay */}
                <ScrollReveal direction="left" delay={300}>
                  <div className="relative w-32 lg:w-40 aspect-[3/4] rounded-xl overflow-hidden group transform transition-all duration-300 hover:scale-105">
                    <img
                      src="https://newtifi.com/wp-content/uploads/2024/08/009ea3ac2018c459ce84161d1b88796f.png"
                      alt="New Technologies and Investment Funds Institute Global Network"
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
