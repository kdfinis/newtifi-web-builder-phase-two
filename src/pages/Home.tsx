import React, { useEffect } from 'react';
import { Heart, Zap, Leaf, DollarSign, Rocket, BookOpen, Library, Award, Users, Quote } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import TechCard from '@/components/TechCard';
import { Card, CardContent } from '@/components/ui/card';

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

  return (
    <main className="min-h-screen">
      {/* Hero Section - With Why We Exist Front and Center */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-10 lg:py-0">
        {/* Background elements for visual interest */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-newtifi-teal bg-opacity-10 filter blur-3xl animate-slow-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-blue-500 bg-opacity-10 filter blur-3xl animate-slow-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full bg-purple-500 bg-opacity-5 filter blur-3xl animate-slow-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="container mx-auto max-w-7xl px-6 z-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Why We Exist - Featured prominently */}
            <div className="lg:col-span-7 animate-fade-in-up order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -top-5 -left-5 w-24 h-24 rounded-full bg-newtifi-teal/20 animate-slow-pulse"></div>
                <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-blue-400/10 animate-slow-pulse" style={{animationDelay: '2s'}}></div>
                
                <div className="bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100 relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <h2 className="text-3xl md:text-4xl font-medium text-newtifi-navy">
                      Why We <span className="text-newtifi-teal">Exist</span>
                    </h2>
                    <Quote className="h-10 w-10 text-newtifi-teal/50" />
                  </div>
                  
                  <blockquote className="text-xl md:text-3xl font-light italic text-newtifi-navy border-l-4 border-newtifi-teal pl-5 mb-8">
                    "We're not building to exit. We're building to endure. The goal isn't dominance. It's contribution."
                  </blockquote>
                  
                  <div className="relative">
                    <div className="absolute w-full h-full bg-gradient-to-r from-newtifi-teal/5 to-blue-500/5 rounded-lg -z-10"></div>
                    <p className="text-base md:text-lg text-gray-700 font-light leading-relaxed">
                      Inspired by Simon Sinek's Infinite Game philosophy, we believe in playing the long game. Our mission transcends quarterly results or short-term gains. We're focused on creating meaningful impact that spans generations.
                    </p>
                  </div>
                  
                  <div className="mt-10 flex justify-center">
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-newtifi-teal to-blue-500 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                      <Button className="relative bg-white text-newtifi-navy border border-newtifi-teal/20 hover:bg-newtifi-teal hover:text-white">
                        Learn More About Our Vision
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Visual elements - artistic flourishes */}
                <div className="hidden lg:block absolute -left-16 top-1/2 transform -translate-y-1/2 w-14 h-80">
                  <div className="absolute top-0 w-0.5 h-full bg-gradient-to-b from-newtifi-teal to-transparent"></div>
                  <div className="absolute top-0 w-2 h-2 rounded-full bg-newtifi-teal"></div>
                  <div className="absolute top-1/3 -left-1 w-3 h-3 rounded-full bg-blue-400"></div>
                  <div className="absolute top-2/3 w-2 h-2 rounded-full bg-newtifi-teal/50"></div>
                </div>
                
                <div className="hidden lg:block absolute -right-10 -bottom-10">
                  <div className="w-20 h-20 border border-dashed border-newtifi-teal/30 rounded-full animate-spin-slow"></div>
                </div>
                
                {/* Abstract art elements */}
                <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10">
                  <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-newtifi-teal"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-blue-500"></div>
                  <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-newtifi-teal/20 rounded-full"></div>
                  <div className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-blue-500/10 rounded-full"></div>
                </div>
              </div>
            </div>
            
            {/* Right side content */}
            <div className="lg:col-span-5 animate-fade-in-up order-1 lg:order-2">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-newtifi-navy mb-6">
                Welcome to <span className="text-newtifi-teal">NewTIFI</span>.
              </h1>
              
              <p className="text-lg md:text-xl text-gray-700 mb-8 font-light leading-relaxed">
                We build innovative, human-centered products, strategies, and systems that combine human intelligence with technology to help individuals and teams move faster, stay clearer, and do better work.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Button size="lg" className="bg-newtifi-teal hover:bg-newtifi-teal/90 text-white">
                  Become a Member
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
              
              {/* Benefits dots visualization */}
              <div className="grid grid-cols-2 gap-4">
                {benefitItems.slice(0, 4).map((item, index) => (
                  <div key={index} className="flex items-start gap-3 animate-fade-in group" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="mt-0.5 p-1.5 rounded-full bg-newtifi-teal/10 text-newtifi-teal group-hover:bg-newtifi-teal group-hover:text-white transition-all duration-300">
                      {item.icon}
                    </div>
                    <span className="text-gray-700 font-light text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Vision illustration - abstract representation */}
          <div className="hidden lg:flex justify-center mt-10 mb-20">
            <div className="relative w-3/4 h-32">
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-0.5 bg-gradient-to-r from-newtifi-teal via-blue-400 to-transparent"></div>
              
              {/* Journey dots */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full bg-newtifi-teal z-10"></div>
              <div className="absolute left-1/4 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-blue-400 z-10"></div>
              <div className="absolute left-2/4 top-1/2 transform -translate-y-1/2 w-5 h-5 rounded-full bg-newtifi-navy z-10"></div>
              <div className="absolute left-3/4 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-newtifi-teal/50 z-10"></div>
              
              {/* Labels */}
              <div className="absolute left-0 top-0 transform -translate-x-1/2 text-xs text-newtifi-teal font-light">Innovation</div>
              <div className="absolute left-1/4 bottom-0 transform -translate-x-1/2 text-xs text-blue-500 font-light">Collaboration</div>
              <div className="absolute left-2/4 top-0 transform -translate-x-1/2 text-xs text-newtifi-navy font-light">Impact</div>
              <div className="absolute left-3/4 bottom-0 transform -translate-x-1/2 text-xs text-newtifi-teal/70 font-light">Legacy</div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="text-sm text-gray-500 mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>
      
      {/* What We Do Section */}
      <section id="what-we-do" className="py-20 px-6 bg-gradient-to-b from-newtifi-navy to-newtifi-navy/90">
        <div className="container mx-auto">
          <ScrollReveal className="mb-12 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-medium text-white mb-6">
              What We Do
            </h2>
            <p className="text-white text-opacity-90 text-base md:text-lg font-light mb-10">
              NewTIFI is dedicated to creating a lasting platform where science, policy, and entrepreneurship converge. We do not merely theorize. We implement.
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {serviceCategories.map((category, index) => (
              <ScrollReveal key={category.title} delay={index * 100}>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 h-full transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg">
                  <h3 className="text-lg font-medium text-newtifi-teal mb-4">{category.title}</h3>
                  <ul className="text-white text-opacity-90 space-y-3 font-light">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-newtifi-teal"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      
      {/* Research Focus Fields */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <ScrollReveal className="mb-16 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-medium text-newtifi-navy mb-6">
              Research Focus Fields
            </h2>
            <p className="text-base md:text-lg text-gray-700 font-light">
              Our work spans four key sectors where innovation can drive meaningful change.
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TechCard 
              title="HealthTech" 
              description="Advancing health through MedTech, BioTech, and human-centered systems. We support diagnostics, drug innovation, and scalable personal care solutions."
              icon={<Heart className="h-6 w-6" />}
              delay={100}
              className="bg-white shadow-lg hover:shadow-xl transition-all duration-300"
            />
            <TechCard 
              title="FoodTech" 
              description="Improving global food systems through AgriTech, Food Safety Tech, and sustainable proteins. Focus areas include waste reduction, nutrition science, and blockchain-enabled transparency."
              icon={<Leaf className="h-6 w-6" />}
              delay={200}
              className="bg-white shadow-lg hover:shadow-xl transition-all duration-300"
            />
            <TechCard 
              title="EnergyTech" 
              description="Supporting green transitions through Renewable Energy Tech, Water Management, Smart Infrastructure, and Circular Economy tools."
              icon={<Zap className="h-6 w-6" />}
              delay={300}
              className="bg-white shadow-lg hover:shadow-xl transition-all duration-300"
            />
            <TechCard 
              title="FinTech" 
              description="Driving financial access, compliance, and innovation across Core FinTech, RegTech, ESG finance, and new models of investment and wealth preservation."
              icon={<DollarSign className="h-6 w-6" />}
              delay={400}
              className="bg-white shadow-lg hover:shadow-xl transition-all duration-300"
            />
          </div>
        </div>
      </section>
      
      {/* Legal Commentary Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-newtifi-navy/95 to-newtifi-navy">
        <div className="container mx-auto">
          <ScrollReveal className="mb-16 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-medium text-white mb-6">
              Trusted Legal Insight – For Practitioners, By Practitioners
            </h2>
            <p className="text-base text-white/80 font-light mb-4">
              At NewTIFI, legal commentary is a pillar of our mission. We collaborate with top-tier Luxembourg legal professionals to produce world-class commentary — including full analysis of key legal instruments like the RAIF Code.
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Left grid - Legal service cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {legalInsights.map((insight, index) => (
                <ScrollReveal key={insight.title} delay={index * 100} className="h-full">
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 h-full transform transition-all duration-300 hover:translate-y-[-5px]">
                    <div className="text-newtifi-teal mb-4">{insight.icon}</div>
                    <h3 className="text-lg font-medium text-white mb-3">{insight.title}</h3>
                    <p className="text-sm text-white/80 font-light">{insight.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            
            {/* Right side - RAIF Code preview */}
            <ScrollReveal delay={200} className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-medium text-newtifi-navy">RAIF Code Insights</h3>
                <Library className="h-6 w-6 text-newtifi-teal" />
              </div>
              <p className="text-base mb-6 font-light text-gray-700">
                Our specialized commentary on the Reserved Alternative Investment Fund (RAIF) code helps investment firms understand the nuances of this regulatory framework.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6 border-l-4 border-newtifi-teal">
                <p className="text-sm font-light italic text-gray-600">
                  "The most comprehensive analysis of the RAIF regime available to practitioners today."
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button variant="default" size="sm">
                  Access Commentary Library
                </Button>
                <Button variant="outline" size="sm">
                  RAIF Code Preview
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* Scholarship & Education */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal delay={100} className="text-center mb-12">
              <div className="inline-block p-2 px-4 bg-newtifi-teal/10 rounded-full text-newtifi-teal mb-4">
                <Award className="h-6 w-6 inline-block mr-2" />
                <span className="text-sm font-medium">Education Initiative</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-medium text-newtifi-navy mb-6">
                Scholarships. Mentorships. Inclusion.
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={200} className="text-center mb-12">
              <p className="text-base md:text-lg text-gray-700 font-light mb-6">
                We support PhD students, researchers, and practitioners working on applied innovation in NewTIFI's Fields and Sectors.
                Scholarships are reviewed by NewTIFI's scientific committee and promote real-world solutions across health, energy, food, and finance.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={300} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-medium mb-6 text-newtifi-navy">Our education programs include:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {educationPrograms.map((program, index) => (
                  <div key={program} className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-newtifi-teal/10 flex items-center justify-center mb-3">
                      {programIcons[index]}
                    </div>
                    <p className="text-sm text-gray-700">{program}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 text-center">
                <Button>
                  Apply or Nominate a Scholar
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* Membership CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-newtifi-teal/90 to-blue-500/90 text-white">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-3xl mx-auto text-center">
            <div className="inline-block p-2 px-4 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <Users className="h-5 w-5 inline-block mr-2" />
              <span className="text-sm font-medium">Join Our Community</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-medium mb-6">
              Join the Institute
            </h2>
            <p className="text-base text-white/90 mb-8 font-light">
              NewTIFI is open to public and private institutions, academics and professionals, technologists and legal experts, and change-makers committed to durable innovation.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 transform transition-all duration-300 hover:translate-y-[-5px]">
                <h3 className="text-xl font-medium mb-3">Institutional Members</h3>
                <p className="text-white/80 font-light">
                  Regulated, supervised entities with access to our full platform of resources
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 transform transition-all duration-300 hover:translate-y-[-5px]">
                <h3 className="text-xl font-medium mb-3">Individual Members</h3>
                <p className="text-white/80 font-light">
                  Scientific or educational interest with specialized support
                </p>
              </div>
            </div>
            
            <Button className="bg-white text-newtifi-navy hover:bg-white/90">
              Learn More About Membership
            </Button>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Why We Exist */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal delay={100} className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-medium text-newtifi-navy mb-6">
                Why We Exist
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={300}>
              <div className="bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-100">
                <blockquote className="text-xl md:text-2xl font-light italic text-newtifi-navy border-l-4 border-newtifi-teal pl-5 mb-8">
                  "We're not building to exit. We're building to endure. The goal isn't dominance. It's contribution."
                </blockquote>
                
                <p className="text-base text-gray-700 font-light">
                  Inspired by Simon Sinek's Infinite Game philosophy, we believe in playing the long game. Our mission transcends quarterly results or short-term gains. We're focused on creating meaningful impact that spans generations.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
};

// Card data for the sections
const benefitItems = [
  { 
    icon: <Award className="h-5 w-5" />,
    text: "Exclusive access to technology insights" 
  },
  { 
    icon: <Users className="h-5 w-5" />,
    text: "Collaboration with innovators" 
  },
  { 
    icon: <BookOpen className="h-5 w-5" />,
    text: "Legal and regulatory guidance" 
  },
  { 
    icon: <Rocket className="h-5 w-5" />,
    text: "Member-only events access" 
  },
  { 
    icon: <Zap className="h-5 w-5" />,
    text: "Fund and mentor innovators" 
  }
];

const serviceCategories = [
  {
    title: "Research & Funding",
    items: [
      "Scientific research funding",
      "Peer-reviewed publishing",
      "Commentary on RAIF Code"
    ]
  },
  {
    title: "Innovation & Development",
    items: [
      "Legal and financial innovation research",
      "Development of searchable legal knowledge systems",
      "Collaboration with incubators and regulators"
    ]
  },
  {
    title: "Education & Support",
    items: [
      "Scholarship and mentorship programs",
      "Annual convention on future-critical fields",
      "Member advisory services"
    ]
  },
  {
    title: "Collaboration",
    items: [
      "Technical advisory services",
      "Legal and regulatory guidance",
      "Cross-sector connectivity"
    ]
  }
];

const legalInsights = [
  {
    title: "Comprehensive Analysis",
    description: "Detailed examination of legal frameworks and their implications for practitioners.",
    icon: <BookOpen className="h-6 w-6" />
  },
  {
    title: "Expert Insights",
    description: "Written by experienced legal professionals with deep knowledge of Luxembourg law.",
    icon: <Users className="h-6 w-6" />
  },
  {
    title: "Practical Guidance",
    description: "Actionable recommendations for legal practitioners and industry professionals.",
    icon: <Rocket className="h-6 w-6" />
  },
  {
    title: "Regular Updates",
    description: "Stay current with the latest legal developments and regulatory changes.",
    icon: <Zap className="h-6 w-6" />
  }
];

const educationPrograms = [
  "Doctoral scholarships",
  "Mentorship tracks",
  "Internship programs",
  "Lifelong learning resources"
];

const programIcons = [
  <BookOpen className="h-6 w-6 text-newtifi-teal" />,
  <Users className="h-6 w-6 text-newtifi-teal" />,
  <Rocket className="h-6 w-6 text-newtifi-teal" />,
  <Library className="h-6 w-6 text-newtifi-teal" />
];

export default Home;
