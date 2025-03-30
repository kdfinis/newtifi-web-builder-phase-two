import React from 'react';
import { Check } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import Button from '@/components/Button';

const Membership = () => {
  return (
    <main className="min-h-screen pb-20">
      {/* Membership Hero */}
      <section className="px-6 py-32 bg-newtifi-navy text-white">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 mt-32">Join Our Community</h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Become part of a global network of innovators and industry leaders who are shaping the future of technology.
            </p>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Membership Benefits */}
      <section className="px-6 py-12 bg-newtifi-navy bg-opacity-5">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Membership Benefits</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ScrollReveal delay={100} className="flex flex-col bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-6 text-newtifi-navy">Access Technology Insights</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="h-6 w-6 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Exclusive access to our latest technology findings and analysis</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-6 w-6 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Regular briefings on emerging technologies</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-6 w-6 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Detailed industry reports and market analyses</span>
                  </li>
                </ul>
                <div className="mt-auto">
                  <Button to="/membership/join" fullWidth>
                    Join as a Member
                  </Button>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={200} className="flex flex-col bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-6 text-newtifi-navy">Join the Innovation Community</h3>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <Check className="h-6 w-6 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Collaborate on technology initiatives and pilot projects</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-6 w-6 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Access to a global directory of fellow members</span>
                  </li>
                </ul>
                <div className="mt-auto">
                  <Button to="/membership/join" fullWidth variant="outline">
                    Learn More
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Fund a Scholar */}
      <section className="px-6 py-16 bg-newtifi-navy text-white">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Fund a Scholar</h2>
                <p className="text-lg text-gray-600">
                  Your contribution directly enables groundbreaking technology solutions that can transform industries and improve lives.
                </p>
                <p className="text-lg text-gray-600">
                  Scholarship sponsors receive regular updates on project progress, acknowledgment in publications, and opportunities to connect directly with the innovators they support.
                </p>
                <Button 
                  to="/membership/fund"
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-newtifi-navy"
                >
                  Fund a Scholar
                </Button>
              </div>
              
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" 
                  alt="Diverse group of researchers collaborating" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="px-6 py-16">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What Members Say</h2>
            <p className="text-lg text-gray-600">
              Hear from our community of researchers, innovators, and industry leaders.
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal delay={100} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 italic mb-6">
                "Being part of NewTIFI has connected me with innovators and industry leaders I wouldn't have met otherwise. The insights and collaborations have been invaluable to our technology development efforts."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                    alt="Member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-newtifi-navy">David Chen</h4>
                  <p className="text-sm text-gray-500">CTO, FutureTech Solutions</p>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={200} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 italic mb-6">
                "The technology insights we've gained through our NewTIFI membership have directly influenced our strategic roadmap. Their approach to combining human expertise with innovative technology is revolutionary."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                    alt="Member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-newtifi-navy">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">Innovation Director, Global Health</p>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={300} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 italic mb-6">
                "Funding a scholarship through NewTIFI has been one of our most rewarding investments. Seeing the project progress and knowing we're contributing to meaningful innovation is incredibly fulfilling."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                    alt="Member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-newtifi-navy">Michael Torres</h4>
                  <p className="text-sm text-gray-500">Investment Partner, Horizon Ventures</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="px-6 py-16">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join?</h2>
            <p className="text-lg text-gray-600 mb-10">
              Become part of the Newtifi community today and help shape the future of technology and innovation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button to="/membership/join" size="lg">
                Join as a Member
              </Button>
              <Button to="/membership/fund" variant="outline" size="lg">
                Fund a Scholar
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default Membership;
