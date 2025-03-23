
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
      
      {/* What We Do Section */}
      <section id="what-we-do" className="py-20 px-6 bg-newtifi-navy">
        <div className="container mx-auto">
          <ScrollReveal className="mb-16 max-w-xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What We Do
            </h2>
            <p className="text-white text-opacity-80">
              We fund breakthrough research and accelerate its implementation into real-world systems.
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TechCard 
              title="HealthTech" 
              description="Advancing healthcare through AI-powered diagnostics and personalized medicine."
              icon={<Heart className="h-8 w-8" />}
              delay={100}
            />
            <TechCard 
              title="FoodTech" 
              description="Creating sustainable food systems with intelligent supply chains and analytics."
              icon={<Leaf className="h-8 w-8" />}
              delay={200}
            />
            <TechCard 
              title="EnergyTech" 
              description="Optimizing energy usage and accelerating renewable energy adoption."
              icon={<Zap className="h-8 w-8" />}
              delay={300}
            />
            <TechCard 
              title="FinTech" 
              description="Revolutionizing financial services with smarter algorithms and systems."
              icon={<DollarSign className="h-8 w-8" />}
              delay={400}
            />
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
              Fund a Scholar
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
      
      {/* Membership CTA */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join the Newtifi Community
            </h2>
            <p className="text-lg text-gray-600 mb-10">
              Become part of a collective that's shaping the future of technology and innovation. Connect with leading researchers, gain exclusive insights, and contribute to groundbreaking work.
            </p>
            <Button to="/membership" size="lg">
              Become a Member
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default Home;
