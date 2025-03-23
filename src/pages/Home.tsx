
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
      <section className="min-h-screen flex flex-col justify-center pt-20 pb-16 px-6 bg-white">
        <div className="container mx-auto">
          <ScrollReveal direction="up" delay={100}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center max-w-4xl mx-auto leading-tight">
              Newtifi builds useful, human-centered AI products, strategies, and systems.
            </h1>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={300}>
            <p className="text-lg md:text-xl text-center max-w-3xl mx-auto mt-6 text-gray-600">
              We help individuals and teams move faster, stay clearer, and do better work by combining human intelligence with machine intelligence.
            </p>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={500} className="mt-10 flex justify-center">
            <Button to="/membership" size="lg">
              Become a Member
            </Button>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Our Approach Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <ScrollReveal className="mb-16 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-newtifi-navy mb-6">
              Our Approach
            </h2>
            <p className="text-lg text-gray-700">
              At Newtifi, we believe in the power of integrative intelligence—combining the best of human expertise with the latest in AI capabilities. Our work spans across research, implementation, and education.
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <ScrollReveal delay={100}>
              <div className="bg-white rounded-xl shadow-sm p-8 h-full">
                <Brain className="h-10 w-10 text-newtifi-teal mb-4" />
                <h3 className="text-xl font-bold mb-4">Research Focus</h3>
                <p className="text-gray-700">
                  We conduct research in AI systems that enhance human capabilities rather than replace them. Our focus areas include natural language processing, computer vision, and knowledge systems that work alongside human experts.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <div className="bg-white rounded-xl shadow-sm p-8 h-full">
                <BarChart className="h-10 w-10 text-newtifi-teal mb-4" />
                <h3 className="text-xl font-bold mb-4">Implementation Strategy</h3>
                <p className="text-gray-700">
                  We translate cutting-edge research into practical tools and strategies that organizations can implement today. Our methods focus on responsible AI adoption with measurable results and clear ROI.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={300}>
              <div className="bg-white rounded-xl shadow-sm p-8 h-full">
                <Users className="h-10 w-10 text-newtifi-teal mb-4" />
                <h3 className="text-xl font-bold mb-4">Talent Development</h3>
                <p className="text-gray-700">
                  We invest in developing the next generation of talent through our PhD scholarship program, mentorship initiatives, and collaborative research opportunities with leading academic institutions.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={400}>
              <div className="bg-white rounded-xl shadow-sm p-8 h-full">
                <Globe className="h-10 w-10 text-newtifi-teal mb-4" />
                <h3 className="text-xl font-bold mb-4">Global Impact</h3>
                <p className="text-gray-700">
                  We apply our research and implementation strategies to address complex global challenges, leveraging AI as a force multiplier for human initiative in areas of critical need.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* What We Do Section */}
      <section id="what-we-do" className="py-20 px-6 bg-newtifi-navy">
        <div className="container mx-auto">
          <ScrollReveal className="mb-16 max-w-xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What We Do
            </h2>
            <p className="text-white text-opacity-80">
              We fund breakthrough research and accelerate its implementation into real-world systems across these key sectors.
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TechCard 
              title="HealthTech" 
              description="Advancing healthcare through AI-powered diagnostics, personalized medicine, and systems that augment medical professionals."
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
      
      {/* Key Research Areas Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <ScrollReveal className="mb-16 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-newtifi-navy mb-6">
              Key Research Areas
            </h2>
            <p className="text-lg text-gray-700">
              Our research labs focus on several interconnected domains that we believe will shape the future of AI and human-machine collaboration.
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <ScrollReveal delay={100} className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-newtifi-navy">Natural Language Systems</h3>
              <p className="text-gray-700 mb-4">
                Developing more nuanced language models that better understand context, reasoning, and the subtleties of human communication.
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Context-aware language models</li>
                <li>Domain-specific knowledge representation</li>
                <li>Multi-modal language understanding</li>
              </ul>
            </ScrollReveal>
            
            <ScrollReveal delay={200} className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-newtifi-navy">Human-AI Collaboration</h3>
              <p className="text-gray-700 mb-4">
                Exploring frameworks for effective collaboration between humans and AI systems, with humans remaining the primary decision-makers.
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Explainable AI interfaces</li>
                <li>Collaborative decision support systems</li>
                <li>AI-assisted creativity and problem-solving</li>
              </ul>
            </ScrollReveal>
            
            <ScrollReveal delay={300} className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-newtifi-navy">AI Safety & Governance</h3>
              <p className="text-gray-700 mb-4">
                Developing technical and policy approaches to ensure AI systems operate reliably, safely, and in alignment with human values.
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Alignment techniques for advanced AI</li>
                <li>Governance frameworks for AI deployment</li>
                <li>Risk assessment methodologies</li>
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* Scholarship CTA Block */}
      <section className="py-20 px-6 bg-white">
        <ScrollReveal className="container mx-auto rounded-xl bg-newtifi-teal text-white p-10 md:p-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Back the science that shapes tomorrow.
            </h2>
            <p className="mb-8 text-lg">
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
      
      {/* Why We Exist */}
      <section className="py-20 px-6 bg-newtifi-navy bg-opacity-5">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal delay={100}>
              <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
                Why We Exist
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={300} className="mb-8">
              <blockquote className="text-2xl md:text-3xl font-medium italic text-newtifi-navy border-l-4 border-newtifi-teal pl-6 mb-6">
                "We're not building to exit. We're building to endure. The goal isn't dominance. It's contribution."
              </blockquote>
              <p className="text-lg text-gray-600">
                Inspired by Simon Sinek's Infinite Game philosophy, we believe in playing the long game. Our mission transcends quarterly results or short-term gains. We're focused on creating meaningful impact that spans generations.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={500} className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-newtifi-navy">
                Principles That Guide Us
              </h3>
              <p className="text-lg text-gray-600 mb-4">
                Like Ray Dalio's principles, we value radical transparency, thoughtful disagreement, and continuous improvement. We believe that clear thinking and open communication lead to better outcomes for everyone.
              </p>
              <p className="text-lg text-gray-600">
                Our commitment is to create systems, technologies, and opportunities that align human potential with meaningful progress, never sacrificing long-term value for short-term rewards.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* Our Research Process */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <ScrollReveal className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-newtifi-navy mb-6">
              Our Research Process
            </h2>
            <p className="text-lg text-gray-700">
              We follow a rigorous, iterative process that ensures our research is both scientifically sound and practically applicable.
            </p>
          </ScrollReveal>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-12">
                <ScrollReveal delay={100} className="relative pl-12">
                  <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-newtifi-teal text-white flex items-center justify-center font-bold">1</div>
                  <h3 className="text-xl font-bold mb-2">Problem Identification</h3>
                  <p className="text-gray-700">We identify critical challenges at the intersection of AI and human systems through consultation with industry experts, academic partners, and our own research agenda.</p>
                </ScrollReveal>
                
                <ScrollReveal delay={300} className="relative pl-12">
                  <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-newtifi-teal text-white flex items-center justify-center font-bold">3</div>
                  <h3 className="text-xl font-bold mb-2">Solution Development</h3>
                  <p className="text-gray-700">Our research teams develop novel approaches, algorithms, and frameworks, constantly testing against real-world scenarios and performance metrics.</p>
                </ScrollReveal>
              </div>
              
              <div className="space-y-12 md:mt-24">
                <ScrollReveal delay={200} className="relative pl-12">
                  <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-newtifi-teal text-white flex items-center justify-center font-bold">2</div>
                  <h3 className="text-xl font-bold mb-2">Fundamental Research</h3>
                  <p className="text-gray-700">We conduct fundamental research to understand the theoretical underpinnings of the problem, leveraging our network of scholars and research fellows.</p>
                </ScrollReveal>
                
                <ScrollReveal delay={400} className="relative pl-12">
                  <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-newtifi-teal text-white flex items-center justify-center font-bold">4</div>
                  <h3 className="text-xl font-bold mb-2">Implementation & Impact</h3>
                  <p className="text-gray-700">We work with partners to implement our research in real-world settings, measuring impact and continuously refining our approaches based on feedback.</p>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Membership CTA - Moved Lower */}
      <section className="py-20 px-6 bg-newtifi-navy">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Join the Newtifi Community
            </h2>
            <p className="text-lg text-white text-opacity-90 mb-10">
              Become part of a collective that's shaping the future of technology and innovation. Connect with leading researchers, gain exclusive insights, and contribute to groundbreaking work in artificial intelligence and human-machine collaboration.
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
