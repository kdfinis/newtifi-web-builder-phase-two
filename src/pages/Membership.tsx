
import React from 'react';
import { Check } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import Button from '@/components/Button';

const Membership = () => {
  return (
    <main className="min-h-screen pt-28 pb-20">
      {/* Membership Hero */}
      <section className="px-6 py-12">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-sm font-light uppercase tracking-wide mb-6">Join the NewTIFI Community</h1>
            <p className="text-xs text-gray-600 font-light">
              Become part of a global network of innovators, researchers, and industry leaders who are shaping the future of technology.
            </p>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Membership Benefits */}
      <section className="px-6 py-12 bg-newtifi-navy bg-opacity-5">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-4xl mx-auto mb-12">
            <h2 className="text-xs uppercase font-light tracking-wide mb-8 text-center">Membership Benefits</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ScrollReveal delay={100} className="flex flex-col bg-white p-8 rounded-sm shadow-sm">
                <h3 className="text-xs font-light uppercase tracking-wide mb-6 text-newtifi-navy">Access Research Insights</h3>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-newtifi-teal mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-gray-700 font-light">Exclusive access to high-level knowledge and strategic industry networks across the Fields and Sectors covered by NewTIFI.</span>
                  </li>
                </ul>
                <div className="mt-auto">
                  <Button to="/membership/join" fullWidth className="text-xs uppercase tracking-wide">
                    Join as a Member
                  </Button>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={200} className="flex flex-col bg-white p-8 rounded-sm shadow-sm">
                <h3 className="text-xs font-light uppercase tracking-wide mb-6 text-newtifi-navy">Be in touch with NewTIFI</h3>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-newtifi-teal mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-gray-700 font-light">Full access to the RAIF legal commentary and all upcoming legal commentaries authored by leading Luxembourg professionals.</span>
                  </li>
                </ul>
                <div className="mt-auto">
                  <Button to="/membership/join" fullWidth variant="outline" className="text-xs uppercase tracking-wide">
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
                <h2 className="text-xs uppercase font-light tracking-wide mb-6">Fund a Scholar</h2>
                <p className="text-xs opacity-90 mb-6 font-light">
                  Support the next generation of innovators by funding scholarship opportunities. Your contribution directly enables groundbreaking research that can transform industries and improve lives.
                </p>
                <p className="text-xs opacity-90 mb-8 font-light">
                  Scholarship sponsors receive regular updates on research progress, acknowledgment in publications, and opportunities to connect directly with the scholars they support.
                </p>
                <Button 
                  to="/membership/fund"
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-newtifi-navy text-xs uppercase tracking-wide"
                >
                  Fund a Scholar
                </Button>
              </div>
              
              <div className="rounded-sm overflow-hidden">
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
            <h2 className="text-xs uppercase font-light tracking-wide mb-6">
              What Members Say
            </h2>
            <p className="text-xs text-gray-600 font-light">
              Hear from our community of researchers, innovators, and industry leaders.
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal delay={100} className="bg-white p-6 rounded-sm shadow-sm">
              <p className="text-xs text-gray-600 italic mb-6 font-light">
                "Being part of NewTIFI has connected me with researchers and innovators I wouldn't have met otherwise. The insights and collaborations have been invaluable to our development efforts."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img 
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                    alt="Member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-light text-newtifi-navy">David Chen</h4>
                  <p className="text-[10px] text-gray-500 font-light">CTO, FutureTech Solutions</p>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={200} className="bg-white p-6 rounded-sm shadow-sm">
              <p className="text-xs text-gray-600 italic mb-6 font-light">
                "The research insights we've gained through our NewTIFI membership have directly influenced our strategic roadmap. Their approach to combining technology and law is revolutionary."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                    alt="Member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-light text-newtifi-navy">Sarah Johnson</h4>
                  <p className="text-[10px] text-gray-500 font-light">Innovation Director, Global Health</p>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={300} className="bg-white p-6 rounded-sm shadow-sm">
              <p className="text-xs text-gray-600 italic mb-6 font-light">
                "Funding a scholarship through NewTIFI has been one of our most rewarding investments. Seeing the research progress and knowing we're contributing to meaningful innovation is incredibly fulfilling."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img 
                    src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                    alt="Member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-light text-newtifi-navy">Michael Torres</h4>
                  <p className="text-[10px] text-gray-500 font-light">Investment Partner, Horizon Ventures</p>
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
            <h2 className="text-xs uppercase font-light tracking-wide mb-6">Ready to Join?</h2>
            <p className="text-xs text-gray-600 mb-10 font-light">
              Become part of the NewTIFI community today and help shape the future of research and innovation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button to="/membership/join" size="md" className="text-xs uppercase tracking-wide">
                Join as a Member
              </Button>
              <Button to="/membership/fund" variant="outline" size="md" className="text-xs uppercase tracking-wide">
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
