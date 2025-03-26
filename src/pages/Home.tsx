
import React, { useEffect } from 'react';
import { Heart, Zap, Leaf, DollarSign } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import Button from '@/components/Button';
import TechCard from '@/components/TechCard';

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
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 pb-16 px-6 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <ScrollReveal direction="up" delay={100}>
            <h1 className="text-base md:text-lg lg:text-xl font-light text-newtifi-navy mb-6 leading-relaxed">
              Newtifi builds useful, human-centered products, strategies, and systems. We help individuals and teams move faster, stay clearer, and do better work by combining human intelligence with technology.
            </h1>
            <p className="text-xs text-gray-600 font-light mb-8 max-w-3xl mx-auto">
              NewTIFI is an international non-profit association established under Luxembourg law (Art. 26-2 of the ASBL Law), promoting responsible research, legal insight, and sustainable innovation.
            </p>
            <Button to="/membership" size="md">
              Become a Member
            </Button>
          </ScrollReveal>
        </div>
      </section>
      
      {/* What We Do Section */}
      <section id="what-we-do" className="py-16 px-6 bg-newtifi-navy">
        <div className="container mx-auto">
          <ScrollReveal className="mb-12 max-w-3xl mx-auto text-center">
            <h2 className="section-title text-white">
              What We Do
            </h2>
            <p className="text-white text-opacity-90 text-xs md:text-sm font-light mb-6">
              NewTIFI is dedicated to creating a lasting platform where science, policy, and entrepreneurship converge. We do not merely theorize. We implement.
            </p>
            <p className="text-white text-opacity-80 text-xs font-light mb-8">
              We support individuals and institutions who aim to apply knowledge to impact. NewTIFI serves as a high-trust convener — across governments, researchers, and capital.
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <ScrollReveal delay={100}>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm p-5 rounded-lg border border-white border-opacity-20 h-full">
                <h3 className="text-xs font-medium uppercase tracking-wider text-newtifi-teal mb-3">Research & Funding</h3>
                <ul className="text-white text-opacity-90 text-xs space-y-2 font-light">
                  <li>Scientific research funding</li>
                  <li>Peer-reviewed publishing</li>
                  <li>Commentary on RAIF Code</li>
                </ul>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm p-5 rounded-lg border border-white border-opacity-20 h-full">
                <h3 className="text-xs font-medium uppercase tracking-wider text-newtifi-teal mb-3">Innovation & Development</h3>
                <ul className="text-white text-opacity-90 text-xs space-y-2 font-light">
                  <li>Legal and financial innovation research</li>
                  <li>Development of searchable legal knowledge systems</li>
                  <li>Collaboration with incubators and regulators</li>
                </ul>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={300}>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm p-5 rounded-lg border border-white border-opacity-20 h-full">
                <h3 className="text-xs font-medium uppercase tracking-wider text-newtifi-teal mb-3">Education & Support</h3>
                <ul className="text-white text-opacity-90 text-xs space-y-2 font-light">
                  <li>Scholarship and mentorship programs</li>
                  <li>Annual convention on future-critical fields</li>
                  <li>Member advisory services</li>
                </ul>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={400}>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm p-5 rounded-lg border border-white border-opacity-20 h-full">
                <h3 className="text-xs font-medium uppercase tracking-wider text-newtifi-teal mb-3">Collaboration</h3>
                <ul className="text-white text-opacity-90 text-xs space-y-2 font-light">
                  <li>Technical advisory services</li>
                  <li>Legal and regulatory guidance</li>
                  <li>Cross-sector connectivity</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* Research Focus Fields */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto">
          <ScrollReveal className="mb-12 max-w-3xl mx-auto text-center">
            <h2 className="section-title text-newtifi-navy">
              Research Focus Fields
            </h2>
            <p className="text-xs md:text-sm text-gray-700 font-light">
              Our work spans four key sectors where innovation can drive meaningful change.
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TechCard 
              title="HealthTech" 
              description="Advancing health through MedTech, BioTech, and human-centered systems. We support diagnostics, drug innovation, and scalable personal care solutions."
              icon={<Heart className="h-5 w-5" />}
              delay={100}
              className="bg-white"
            />
            <TechCard 
              title="FoodTech" 
              description="Improving global food systems through AgriTech, Food Safety Tech, and sustainable proteins. Focus areas include waste reduction, nutrition science, and blockchain-enabled transparency."
              icon={<Leaf className="h-5 w-5" />}
              delay={200}
              className="bg-white"
            />
            <TechCard 
              title="EnergyTech" 
              description="Supporting green transitions through Renewable Energy Tech, Water Management, Smart Infrastructure, and Circular Economy tools."
              icon={<Zap className="h-5 w-5" />}
              delay={300}
              className="bg-white"
            />
            <TechCard 
              title="FinTech" 
              description="Driving financial access, compliance, and innovation across Core FinTech, RegTech, ESG finance, and new models of investment and wealth preservation."
              icon={<DollarSign className="h-5 w-5" />}
              delay={400}
              className="bg-white"
            />
          </div>
        </div>
      </section>
      
      {/* Legal Commentary Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <ScrollReveal className="mb-12 max-w-3xl mx-auto text-center">
            <h2 className="section-title text-newtifi-navy">
              Trusted Legal Insight – For Practitioners, By Practitioners
            </h2>
            <p className="text-xs md:text-sm text-gray-700 font-light">
              At NewTIFI, legal commentary is a pillar of our mission. We collaborate with top-tier Luxembourg legal professionals to produce world-class commentary — including full analysis of key legal instruments like the RAIF Code. These works are:
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <ScrollReveal delay={100} className="bg-gray-50 p-8 rounded-lg">
              <ul className="list-disc pl-5 text-xs md:text-sm text-gray-700 space-y-3 font-light mb-6">
                <li>Published as books</li>
                <li>Offered as an online searchable library</li>
                <li>Intended for public benefit and member empowerment</li>
              </ul>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="secondary"
                  className="text-xs md:text-sm"
                >
                  Access the Commentary Library
                </Button>
                <Button 
                  variant="outline"
                  className="text-xs md:text-sm"
                >
                  RAIF Code Preview
                </Button>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={200} className="hidden lg:block">
              <div className="bg-newtifi-navy p-8 rounded-lg text-white">
                <h3 className="text-sm font-light mb-4 uppercase">RAIF Code Insights</h3>
                <p className="text-xs mb-6 font-light">
                  Our specialized commentary on the Reserved Alternative Investment Fund (RAIF) code helps investment firms understand the nuances of this regulatory framework.
                </p>
                <p className="text-xs font-light italic">
                  "The most comprehensive analysis of the RAIF regime available to practitioners today."
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* Scholarship & Education */}
      <section className="py-16 px-6 bg-gradient-to-b from-gray-100 to-gray-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal delay={100} className="text-center mb-8">
              <h2 className="section-title text-newtifi-navy font-serif">
                Scholarships. Mentorships. Inclusion.
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={200} className="text-center mb-8">
              <p className="text-xs md:text-sm text-gray-700 font-light mb-6">
                We support PhD students, researchers, and practitioners working on applied innovation in NewTIFI's Fields and Sectors.
                Scholarships are reviewed by NewTIFI's scientific committee and promote real-world solutions across health, energy, food, and finance.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={300} className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-sm font-light mb-4 text-newtifi-navy">Our education programs include:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <ul className="list-disc pl-5 text-xs text-gray-700 space-y-2 font-light">
                    <li>Doctoral scholarships</li>
                    <li>Mentorship tracks</li>
                  </ul>
                </div>
                <div>
                  <ul className="list-disc pl-5 text-xs text-gray-700 space-y-2 font-light">
                    <li>Internship programs</li>
                    <li>Lifelong learning resources for member institutions</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button>
                  Apply or Nominate a Scholar
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* Membership CTA */}
      <section className="py-16 px-6 bg-newtifi-navy">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-2xl mx-auto text-center">
            <h2 className="text-sm font-light mb-4 text-white uppercase tracking-wide">
              Join the Institute
            </h2>
            <p className="text-xs md:text-sm text-white text-opacity-90 mb-6 font-light">
              NewTIFI is open to public and private institutions, academics and professionals, technologists and legal experts, and change-makers committed to durable innovation.
            </p>
            <p className="text-xs md:text-sm text-white text-opacity-90 mb-8 font-light">
              Membership is available in two forms:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white bg-opacity-10 p-5 rounded-lg">
                <h3 className="text-xs text-newtifi-teal font-medium mb-2">Institutional Members</h3>
                <p className="text-xs text-white text-opacity-90 font-light">
                  Regulated, supervised entities
                </p>
              </div>
              <div className="bg-white bg-opacity-10 p-5 rounded-lg">
                <h3 className="text-xs text-newtifi-teal font-medium mb-2">Individual Members</h3>
                <p className="text-xs text-white text-opacity-90 font-light">
                  Scientific or educational interest
                </p>
              </div>
            </div>
            
            <Button 
              to="/membership" 
              className="bg-white text-newtifi-navy hover:bg-newtifi-teal hover:text-white"
            >
              Learn More About Membership
            </Button>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Why We Exist - Simplified */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal delay={100} className="text-center mb-8">
              <h2 className="section-title text-newtifi-navy">
                Why We Exist
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={300}>
              <blockquote className="text-sm font-light italic text-newtifi-navy border-l-4 border-newtifi-teal pl-5 mb-6">
                "We're not building to exit. We're building to endure. The goal isn't dominance. It's contribution."
              </blockquote>
              
              <p className="text-xs md:text-sm text-gray-700 font-light">
                Inspired by Simon Sinek's Infinite Game philosophy, we believe in playing the long game. Our mission transcends quarterly results or short-term gains. We're focused on creating meaningful impact that spans generations.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
