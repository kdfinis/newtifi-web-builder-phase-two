
import React, { useEffect } from 'react';
import { Heart, Zap, Leaf, DollarSign, Brain, Users, BarChart, Globe } from 'lucide-react';
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
      <section className="min-h-screen flex flex-col justify-center pt-20 pb-16 px-6 bg-white relative">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="up" delay={100}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-newtifi-navy">
                Newtifi builds useful, human-centered products, strategies, and systems.
              </h1>
              <p className="text-base md:text-lg mt-6 text-gray-600 font-light">
                We help individuals and teams move faster, stay clearer, and do better work by combining insights with technology.
              </p>
              <div className="mt-10">
                <Button to="/membership" size="lg">
                  Learn More
                </Button>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={200} className="flex justify-center">
              <img 
                src="/lovable-uploads/490cdab7-a1b0-46e2-b7cd-7e3457a2b5a9.png" 
                alt="Newtifi Innovation" 
                className="max-w-full rounded-lg shadow-lg"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* What We Do Section */}
      <section id="what-we-do" className="py-20 px-6 bg-newtifi-navy">
        <div className="container mx-auto">
          <ScrollReveal className="mb-16 max-w-xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
              What We Do
            </h2>
            <p className="text-white text-opacity-80 font-light">
              We fund breakthrough research and accelerate its implementation into real-world systems across these key sectors.
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TechCard 
              title="HealthTech" 
              description="Advancing healthcare through diagnostics, personalized medicine, and systems that augment medical professionals."
              icon={<Heart className="h-8 w-8" />}
              delay={100}
            />
            <TechCard 
              title="FoodTech" 
              description="Creating sustainable food systems with intelligent supply chains, production optimization, and advanced analytics."
              icon={<Leaf className="h-8 w-8" />}
              delay={200}
            />
            <TechCard 
              title="EnergyTech" 
              description="Optimizing energy usage, accelerating renewable adoption, and building intelligent systems for distribution networks."
              icon={<Zap className="h-8 w-8" />}
              delay={300}
            />
            <TechCard 
              title="FinTech" 
              description="Revolutionizing financial services with smarter algorithms, risk assessment tools, and inclusive banking systems."
              icon={<DollarSign className="h-8 w-8" />}
              delay={400}
            />
          </div>
        </div>
      </section>
      
      {/* Our Research Process */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <ScrollReveal className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-light text-newtifi-navy mb-6">
              Our Research Process
            </h2>
            <p className="text-base text-gray-700 font-light">
              We follow a rigorous, iterative process that ensures our research is both scientifically sound and practically applicable.
            </p>
          </ScrollReveal>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-12">
                <ScrollReveal delay={100} className="relative pl-12">
                  <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-newtifi-teal text-white flex items-center justify-center font-bold">1</div>
                  <h3 className="text-lg font-medium mb-2">Problem Identification</h3>
                  <p className="text-gray-700 font-light">We identify critical challenges at the intersection of technology and human systems through consultation with industry experts, academic partners, and our own research agenda.</p>
                </ScrollReveal>
                
                <ScrollReveal delay={300} className="relative pl-12">
                  <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-newtifi-teal text-white flex items-center justify-center font-bold">3</div>
                  <h3 className="text-lg font-medium mb-2">Solution Development</h3>
                  <p className="text-gray-700 font-light">Our research teams develop novel approaches, algorithms, and frameworks, constantly testing against real-world scenarios and performance metrics.</p>
                </ScrollReveal>
              </div>
              
              <div className="space-y-12 md:mt-24">
                <ScrollReveal delay={200} className="relative pl-12">
                  <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-newtifi-teal text-white flex items-center justify-center font-bold">2</div>
                  <h3 className="text-lg font-medium mb-2">Fundamental Research</h3>
                  <p className="text-gray-700 font-light">We conduct fundamental research to understand the theoretical underpinnings of the problem, leveraging our network of scholars and research fellows.</p>
                </ScrollReveal>
                
                <ScrollReveal delay={400} className="relative pl-12">
                  <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-newtifi-teal text-white flex items-center justify-center font-bold">4</div>
                  <h3 className="text-lg font-medium mb-2">Implementation & Impact</h3>
                  <p className="text-gray-700 font-light">We work with partners to implement our research in real-world settings, measuring impact and continuously refining our approaches based on feedback.</p>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Scholarship CTA Block */}
      <section className="py-20 px-6 bg-white">
        <ScrollReveal className="container mx-auto rounded-xl bg-newtifi-teal text-white p-10 md:p-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-light mb-6">
              Back the science that shapes tomorrow.
            </h2>
            <p className="mb-8 text-base font-light">
              Your contribution powers groundbreaking research that transforms industries and improves lives. Join us in building a better future through science and technology.
            </p>
            <Button 
              to="/membership" 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-newtifi-teal"
            >
              Fund a PhD Scholar
            </Button>
          </div>
        </ScrollReveal>
      </section>
      
      {/* Legal Commentary Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <ScrollReveal className="mb-16 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-light text-newtifi-navy mb-6">
              Legal Commentary
            </h2>
            <p className="text-base text-gray-700 font-light">
              Newtifi brings together top legal professionals to provide insightful commentary on legal codes and regulations such as the RAIF code, helping businesses navigate complex regulatory environments.
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <ScrollReveal delay={100} className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-lg font-medium mb-4 text-newtifi-navy">Expert Legal Analysis</h3>
              <p className="text-gray-700 mb-6 font-light">
                Our network of legal professionals provides in-depth analysis of emerging regulations and their implications for businesses operating in regulated industries.
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-3 font-light">
                <li>Regulatory compliance frameworks</li>
                <li>Legal risk assessment for implementation</li>
                <li>Cross-border regulatory considerations</li>
                <li>Industry-specific legal guidelines</li>
              </ul>
            </ScrollReveal>
            
            <ScrollReveal delay={200} className="flex justify-center">
              <div className="bg-newtifi-navy p-10 rounded-lg text-white">
                <h3 className="text-lg font-medium mb-4">RAIF Code Insights</h3>
                <p className="mb-6 font-light">
                  Our specialized commentary on the Reserved Alternative Investment Fund (RAIF) code helps investment firms understand the nuances of this regulatory framework.
                </p>
                <Button 
                  to="/legal-insights" 
                  className="bg-white text-newtifi-navy hover:bg-newtifi-teal hover:text-white"
                >
                  Learn More
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* Why We Exist - Simplified */}
      <section className="py-20 px-6 bg-newtifi-navy bg-opacity-5">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal delay={100} className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-light text-newtifi-navy">
                Why We Exist
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={300}>
              <blockquote className="text-xl md:text-2xl font-light italic text-newtifi-navy border-l-4 border-newtifi-teal pl-6 mb-8">
                "We're not building to exit. We're building to endure. The goal isn't dominance. It's contribution."
              </blockquote>
              
              <p className="text-base text-gray-700 mb-8 font-light">
                Inspired by Simon Sinek's Infinite Game philosophy, we believe in playing the long game. Our mission transcends quarterly results or short-term gains. We're focused on creating meaningful impact that spans generations.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* Membership CTA - Moved Lower */}
      <section className="py-20 px-6 bg-newtifi-navy mt-20">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-light mb-6 text-white">
              Join the Newtifi Community
            </h2>
            <p className="text-base text-white text-opacity-90 mb-10 font-light">
              Become part of a collective that's shaping the future of technology and innovation. Connect with leading researchers, gain exclusive insights, and contribute to groundbreaking work.
            </p>
            <Button 
              to="/membership" 
              size="lg"
              className="bg-white text-newtifi-navy hover:bg-newtifi-teal hover:text-white"
            >
              Become a Member
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default Home;
