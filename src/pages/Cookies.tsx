import React from 'react';
import ScrollReveal from '../components/ScrollReveal';

const Cookies = () => {
  return (
    <main className="min-h-screen">
      {/* Navy blue hero section */}
      <section className="px-6 py-32 bg-newtifi-navy text-white">
        <div className="container mx-auto">
          <ScrollReveal direction="right" delay={100}>
            <div className="mb-10">
              <h1 className="text-2xl md:text-4xl lg:text-4xl font-extralight tracking-wider leading-tight">
                COOKIES &<br />DIGITAL EXPERIENCE
              </h1>
            </div>
            <p className="text-base md:text-base leading-relaxed text-white/90 font-light">
              Enhancing your journey through responsible technology
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Policy content */}
      <section className="bg-white">
        <div className="container mx-auto px-6 py-20">
          <div className="w-full mx-auto space-y-12">
            <ScrollReveal direction="right" delay={200}>
              <section>
                <h2 className="text-2xl font-light text-newtifi-navy mb-4">1. What Are Cookies</h2>
                <p className="text-gray-600 leading-relaxed">
                  Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by enabling us to monitor which pages you find useful and which you do not. A cookie does not give us access to your device or any information about you, other than the data you choose to share with us.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={300}>
              <section>
                <h2 className="text-2xl font-light text-newtifi-navy mb-4">2. How We Use Cookies</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We use cookies for the following purposes:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Essential cookies: Required for the website to function properly</li>
                  <li>Analytics cookies: Help us understand how visitors interact with our website</li>
                  <li>Preference cookies: Remember your settings and preferences</li>
                  <li>Security cookies: Help protect our website and users</li>
                </ul>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={400}>
              <section>
                <h2 className="text-2xl font-light text-newtifi-navy mb-4">3. Types of Cookies We Use</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-medium text-newtifi-navy mb-2">Essential Cookies</h3>
                    <p className="text-gray-600 leading-relaxed">
                      These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-newtifi-navy mb-2">Analytics Cookies</h3>
                    <p className="text-gray-600 leading-relaxed">
                      These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular and see how visitors move around the site.
                    </p>
                  </div>
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={500}>
              <section>
                <h2 className="text-2xl font-light text-newtifi-navy mb-4">4. Managing Cookies</h2>
                <p className="text-gray-600 leading-relaxed">
                  Most web browsers allow you to control cookies through their settings preferences. However, limiting cookies may impact your experience using our website. To learn more about cookies and how to manage them, visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-newtifi-teal hover:underline">www.aboutcookies.org</a>.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={600}>
              <section>
                <h2 className="text-2xl font-light text-newtifi-navy mb-4">5. Third-Party Cookies</h2>
                <p className="text-gray-600 leading-relaxed">
                  Some cookies are placed by third-party services that appear on our pages. We use trusted third-party services that track this information on our behalf. These third parties have their own privacy policies and may collect information about your online activities across different websites.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={700}>
              <section>
                <h2 className="text-2xl font-light text-newtifi-navy mb-4">6. Contact Us</h2>
                <p className="text-gray-600 leading-relaxed">
                  If you have any questions about our use of cookies, please contact us at:
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

export default Cookies; 