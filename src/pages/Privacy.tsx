import React from 'react';
import ScrollReveal from '../components/ScrollReveal';

const Privacy = () => {
  return (
    <main className="min-h-screen">
      {/* Navy blue hero section */}
      <section className="px-6 py-32 bg-newtifi-navy text-white">
        <div className="container mx-auto">
          <ScrollReveal direction="right" delay={100}>
            <div className="mb-10">
              <h1 className="text-2xl md:text-4xl lg:text-4xl font-extralight tracking-wider leading-tight">
                PRIVACY & DATA<br />PROTECTION
              </h1>
            </div>
            <p className="text-lg md:text-xl leading-relaxed text-white/90 font-light">
              Protecting your data while advancing innovation
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Policy content */}
      <section className="bg-white">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto space-y-12">
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
                  <p>Email: <a href="mailto:info@newtifi.com" className="text-newtifi-teal hover:underline">info@newtifi.com</a></p>
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