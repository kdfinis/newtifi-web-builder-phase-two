import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { urlFactory } from '@/lib/urls/UrlFactory';

const Terms = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 py-32 bg-gradient-to-br from-newtifi-navy via-newtifi-navy/95 to-newtifi-teal/20 text-white overflow-hidden">
        {/* Background Graphics */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-white/10 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-newtifi-teal/10 rounded-full"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 border border-white/10 transform rotate-45"></div>
        
        {/* Stencil-style decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path d="M20,20 L180,20 L180,180 L20,180 Z" stroke="white" strokeWidth="2" fill="none"/>
            <circle cx="100" cy="100" r="40" stroke="white" strokeWidth="2" fill="none"/>
            <path d="M60,100 L140,100 M100,60 L100,140" stroke="white" strokeWidth="2"/>
          </svg>
        </div>

        <div className="container mx-auto relative">
          <div className="w-full">
            <ScrollReveal>
              <h1 className="text-2xl md:text-2xl font-light mb-10">Terms of Service</h1>
              <div className="mb-10">
                <h2 className="text-2xl md:text-4xl lg:text-4xl font-extralight tracking-wider leading-tight uppercase">
                  Our <span className="text-newtifi-teal">Agreement</span>
                </h2>
              </div>
              <p className="text-base md:text-base leading-relaxed text-white/90 font-light">
                Understanding the terms and conditions that govern your use of NewTIFI services and platforms.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Policy content */}
      <section className="bg-white">
        <div className="container mx-auto px-6 py-20">
          <div className="w-full mx-auto space-y-12">
            <ScrollReveal direction="right" delay={200}>
              <section>
                <h2 className="text-2xl font-light text-newtifi-navy mb-4">1. Agreement to Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  By accessing and using the NewTIFI website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={300}>
              <section>
                <h2 className="text-2xl font-light text-newtifi-navy mb-4">2. Membership and Services</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Our services include but are not limited to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Access to industry insights and research</li>
                  <li>Participation in networking events</li>
                  <li>Professional development opportunities</li>
                  <li>Collaboration with industry experts</li>
                  <li>Access to specialized resources and tools</li>
                </ul>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={400}>
              <section>
                <h2 className="text-2xl font-light text-newtifi-navy mb-4">3. Intellectual Property</h2>
                <p className="text-gray-600 leading-relaxed">
                  All content, features, and functionality of our website and services, including but not limited to text, graphics, logos, and software, are the exclusive property of NewTIFI A.s.b.l. and are protected by Luxembourg and international copyright, trademark, and other intellectual property laws.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={500}>
              <section>
                <h2 className="text-2xl font-light text-newtifi-navy mb-4">4. User Responsibilities</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  As a user of our services, you agree to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the confidentiality of your account</li>
                  <li>Use the services in compliance with applicable laws</li>
                  <li>Respect intellectual property rights</li>
                  <li>Not engage in any unauthorized or harmful activities</li>
                </ul>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={600}>
              <section>
                <h2 className="text-2xl font-light text-newtifi-navy mb-4">5. Limitation of Liability</h2>
                <p className="text-gray-600 leading-relaxed">
                  NewTIFI A.s.b.l. shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services. Our liability is limited to the maximum extent permitted by Luxembourg law.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={700}>
              <section>
                <h2 className="text-2xl font-light text-newtifi-navy mb-4">6. Governing Law</h2>
                <p className="text-gray-600 leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of Luxembourg, without regard to its conflict of law provisions. Any disputes shall be subject to the exclusive jurisdiction of the courts of Luxembourg.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={800}>
              <section>
                <h2 className="text-2xl font-light text-newtifi-navy mb-4">7. Contact Information</h2>
                <p className="text-gray-600 leading-relaxed">
                  For any questions regarding these Terms of Service, please contact us at:
                </p>
                <div className="mt-4 text-gray-600">
                  <p>NewTIFI A.s.b.l.</p>
                  <p>14 rue Jean-Pierre Biermann</p>
                  <p>L-1268 Luxembourg</p>
                  <p>Email: <a href={urlFactory.getEmailUrl('info@newtifi.com')} className="text-newtifi-teal hover:underline">info@newtifi.com</a></p>
                </div>
              </section>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Terms; 