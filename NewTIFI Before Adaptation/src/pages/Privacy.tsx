import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { urlFactory } from '@/lib/urls/UrlFactory';

const Privacy = () => {
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
              <h1 className="text-2xl md:text-2xl font-light mb-10">Privacy Policy</h1>
              <div className="mb-10">
                <h2 className="text-2xl md:text-4xl lg:text-4xl font-extralight tracking-wider leading-tight uppercase">
                  Your <span className="text-newtifi-teal">Privacy</span> Matters
                </h2>
              </div>
              <p className="text-base md:text-base leading-relaxed text-white/90 font-light">
                Learn how we protect and handle your personal information in accordance with data protection regulations.
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
                <h2 className="text-2xl font-light text-newtifi-navy mb-4">1. Introduction</h2>
                <p className="text-gray-600 leading-relaxed">
                  At NewTIFI A.s.b.l., we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. We are committed to protecting your personal data in accordance with the General Data Protection Regulation (GDPR) and Luxembourg data protection laws.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={300}>
              <section>
                <h2 className="text-2xl font-light text-newtifi-navy mb-4">2. Information We Collect</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Contact information (name, email address, phone number)</li>
                  <li>Professional information (company name, job title)</li>
                  <li>Membership application details</li>
                  <li>Communication preferences</li>
                </ul>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={400}>
              <section>
                <h2 className="text-2xl font-light text-newtifi-navy mb-4">3. How We Use Your Information</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We use the collected information for various purposes:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>To provide and maintain our services</li>
                  <li>To process your membership applications</li>
                  <li>To communicate with you about our activities and events</li>
                  <li>To improve our website and services</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={500}>
              <section>
                <h2 className="text-2xl font-light text-newtifi-navy mb-4">4. Data Protection Rights</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Under GDPR, you have the following rights:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Right to access your personal data</li>
                  <li>Right to rectification of inaccurate data</li>
                  <li>Right to erasure ("right to be forgotten")</li>
                  <li>Right to restrict processing</li>
                  <li>Right to data portability</li>
                  <li>Right to object to processing</li>
                </ul>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={600}>
              <section>
                <h2 className="text-2xl font-light text-newtifi-navy mb-4">5. Data Security</h2>
                <p className="text-gray-600 leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. Our security measures include encryption, secure servers, and regular security assessments.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={700}>
              <section>
                <h2 className="text-2xl font-light text-newtifi-navy mb-4">6. Contact Us</h2>
                <p className="text-gray-600 leading-relaxed">
                  If you have any questions about this Privacy Policy or our data practices, please contact us at:
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

export default Privacy; 