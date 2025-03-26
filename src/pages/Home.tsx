
import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import TechCard from '@/components/TechCard';
import { Rocket, Lightbulb, ShieldCheck } from 'lucide-react';

const Home = () => {
  return (
    <main className="min-h-screen">
      {/* Split Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 pb-16 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Column - Text */}
            <ScrollReveal direction="left" delay={100} className="text-left">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-newtifi-navy mb-3">
                NewTIFI
              </h1>
              <p className="text-base md:text-lg text-gray-700 mb-6 font-light">
                We build human-centered products, strategies, and systems that help individuals and teams move faster, stay clearer, and do better work.
              </p>
              <Button asChild size="default">
                <a href="/membership">Become a Member</a>
              </Button>
            </ScrollReveal>
            
            {/* Right Column - Image */}
            <ScrollReveal direction="right" delay={200} className="flex justify-center md:justify-end">
              <img 
                src="/lovable-uploads/490cdab7-a1b0-46e2-b7cd-7e3457a2b5a9.png" 
                alt="NewTIFI Vision" 
                className="rounded-lg shadow-md max-w-full h-auto"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-medium text-newtifi-navy mb-4">
              Our Services
            </h2>
            <p className="text-base md:text-lg text-gray-700 font-light">
              Explore our core services designed to transform your approach to productivity and innovation.
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TechCard 
              title="Strategic Planning"
              description="Crafting clear, actionable plans that align with your goals."
              icon={<Rocket className="h-6 w-6" />}
              delay={100}
            />
            <TechCard 
              title="System Design"
              description="Designing robust systems for efficiency and effectiveness."
              icon={<Lightbulb className="h-6 w-6" />}
              delay={200}
            />
            <TechCard 
              title="Security Solutions"
              description="Implementing top-tier security measures to protect your valuable assets."
              icon={<ShieldCheck className="h-6 w-6" />}
              delay={300}
            />
          </div>
        </div>
      </section>
      
      {/* About Us Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <ScrollReveal direction="left" delay={100} className="text-left">
              <h2 className="text-2xl md:text-3xl font-medium text-newtifi-navy mb-4">
                About NewTIFI
              </h2>
              <p className="text-base md:text-lg text-gray-700 mb-6 font-light">
                Founded in 2024, NewTIFI is dedicated to building a future where technology enhances human potential. We focus on creating solutions that are not only innovative but also practical and user-friendly.
              </p>
              <Button asChild size="default">
                <a href="/who-we-are">Learn More</a>
              </Button>
            </ScrollReveal>
            
            {/* Image */}
            <ScrollReveal direction="right" delay={200} className="flex justify-center md:justify-start">
              <img 
                src="/lovable-uploads/bb9440c3-1909-4c9d-b92a-ef29a97c7e48.png" 
                alt="About NewTIFI" 
                className="rounded-lg shadow-md max-w-full h-auto"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16 px-6 bg-newtifi-navy text-white">
        <div className="container mx-auto text-center">
          <ScrollReveal className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-medium mb-4">
              Ready to Transform Your Approach?
            </h2>
            <p className="text-base md:text-lg font-light mb-8">
              Contact us today to discover how NewTIFI can help you achieve your goals with cutting-edge strategies and systems.
            </p>
            <Button asChild variant="secondary" size="lg">
              <a href="/connect">Get in Touch</a>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default Home;
