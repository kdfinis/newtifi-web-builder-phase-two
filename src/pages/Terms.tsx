import React from 'react';
import ScrollReveal from '../components/ScrollReveal';

const Terms = () => {
  return (
    <main className="min-h-screen">
      {/* Navy blue hero section */}
      <section className="px-6 py-32 bg-newtifi-navy text-white">
        <div className="container mx-auto">
          <ScrollReveal direction="right" delay={100}>
            <div className="mb-10">
              <h1 className="text-2xl md:text-4xl lg:text-4xl font-extralight tracking-wider leading-tight">
                TERMS &<br />INNOVATION
              </h1>
            </div>
            <p className="text-lg md:text-xl leading-relaxed text-white/90 font-light">
              Building trust through transparent collaboration
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

export default Terms; 