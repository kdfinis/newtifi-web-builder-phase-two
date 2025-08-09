import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <main className="min-h-screen bg-white pt-[128px]">
      {/* Single compact section: one box, one map, one column */}
      <section className="px-6 py-12">
        <div className="container mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden p-4 space-y-6">
              {/* One Map only */}
              <div className="w-full rounded-2xl" style={{ height: '280px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2595.8684700480477!2d6.127777315490051!3d49.611979979999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47954a1c0c0c0c0%3A0x0!2s14%20Rue%20Jean-Pierre%20Biermann%2C%201268%20Luxembourg!5e0!3m2!1sen!2slu!4v1677890257135!5m2!1sen!2slu&zoom=15"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="NewTIFI Location Map"
                ></iframe>
              </div>

              {/* Compact content in one column */}
              <div className="p-8 grid gap-8 rounded-2xl bg-white">
                {/* Intro copy above contact details */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-newtifi-navy">We’d love to hear from you</h3>
                  <p className="text-base text-gray-600">Whether you’re exploring partnerships, submitting research, or looking to get involved, our team will get back to you promptly. Reach out by email or send us a short message below.</p>
                </div>
                {/* Inline quick contact */}
                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-newtifi-teal/10">
                      <Mail className="h-5 w-5 text-newtifi-teal" />
                    </div>
                    <a href="mailto:info@newtifi.com" className="text-newtifi-navy hover:text-newtifi-teal transition-colors">info@newtifi.com</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-newtifi-teal/10">
                      <Phone className="h-5 w-5 text-newtifi-teal" />
                    </div>
                    <span className="text-newtifi-navy">+352 123 456 789</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-newtifi-teal/10">
                      <MapPin className="h-5 w-5 text-newtifi-teal" />
                    </div>
                    <span className="text-newtifi-navy">Luxembourg, Europe</span>
                  </div>
                </div>

                {/* WhatsApp Contact Button */}
                <div>
                  <a
                    href="https://wa.me/352621815753"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M20.52 3.484A11.87 11.87 0 0012.003 0C5.378 0 .046 5.332.046 11.957c0 2.107.551 4.178 1.6 6.012L0 24l6.186-1.61a11.926 11.926 0 005.817 1.517h.005c6.625 0 11.957-5.332 11.957-11.958 0-3.2-1.246-6.208-3.505-8.465zM12.008 22.05a9.9 9.9 0 01-5.045-1.385l-.362-.215-3.668.955.98-3.58-.235-.368a9.913 9.913 0 01-1.515-5.19c0-5.462 4.447-9.91 9.91-9.91 2.647 0 5.135 1.03 7.01 2.905a9.86 9.86 0 012.9 7.005c0 5.463-4.447 9.91-9.975 9.91zm5.45-7.423c-.298-.149-1.768-.87-2.042-.97-.274-.099-.474-.149-.675.149-.2.298-.774.97-.949 1.168-.174.199-.349.224-.647.075-.298-.149-1.26-.464-2.4-1.48-.887-.79-1.486-1.766-1.662-2.064-.174-.298-.018-.459.131-.608.135-.135.298-.349.447-.524.149-.174.199-.298.298-.498.099-.199.05-.373-.025-.522-.075-.149-.675-1.623-.924-2.225-.243-.584-.49-.505-.675-.514l-.574-.01c-.199 0-.522.075-.796.373-.274.298-1.045 1.02-1.045 2.486s1.07 2.883 1.219 3.082c.149.199 2.105 3.212 5.1 4.506.714.308 1.271.493 1.705.631.716.227 1.368.195 1.883.118.575-.086 1.768-.722 2.018-1.419.249-.697.249-1.295.174-1.42-.074-.124-.273-.198-.571-.347z"/></svg>
                    WhatsApp: +352 621 815 753
                  </a>
                </div>

                {/* Compact form */}
                <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input type="text" placeholder="Name" className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-newtifi-teal" />
                  <input type="email" placeholder="Email" className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-newtifi-teal" />
                  <input type="text" placeholder="Subject" className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-newtifi-teal" />
                  <textarea placeholder="Message" rows={4} className="md:col-span-3 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-newtifi-teal"></textarea>
                  <button type="submit" className="md:col-span-3 bg-newtifi-navy text-white py-3 rounded-xl font-medium flex items-center justify-center hover:bg-newtifi-navy/90 transition-colors">
                    Send Message
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </button>
                </form>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Floating WhatsApp Button (hidden number) */}
      <a
        href="https://wa.me/352621815753"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-600 shadow-lg hover:bg-green-700 transition-colors"
        aria-label="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-white"><path d="M20.52 3.484A11.87 11.87 0 0012.003 0C5.378 0 .046 5.332.046 11.957c0 2.107.551 4.178 1.6 6.012L0 24l6.186-1.61a11.926 11.926 0 005.817 1.517h.005c6.625 0 11.957-5.332 11.957-11.958 0-3.2-1.246-6.208-3.505-8.465zM12.008 22.05a9.9 9.9 0 01-5.045-1.385l-.362-.215-3.668.955.98-3.58-.235-.368a9.913 9.913 0 01-1.515-5.19c0-5.462 4.447-9.91 9.91-9.91 2.647 0 5.135 1.03 7.01 2.905a9.86 9.86 0 012.9 7.005c0 5.463-4.447 9.91-9.975 9.91zm5.45-7.423c-.298-.149-1.768-.87-2.042-.97-.274-.099-.474-.149-.675.149-.2.298-.774.97-.949 1.168-.174.199-.349.224-.647.075-.298-.149-1.26-.464-2.4-1.48-.887-.79-1.486-1.766-1.662-2.064-.174-.298-.018-.459.131-.608.135-.135.298-.349.447-.524.149-.174.199-.298.298-.498.099-.199.05-.373-.025-.522-.075-.149-.675-1.623-.924-2.225-.243-.584-.49-.505-.675-.514l-.574-.01c-.199 0-.522.075-.796.373-.274.298-1.045 1.02-1.045 2.486s1.07 2.883 1.219 3.082c.149.199 2.105 3.212 5.1 4.506.714.308 1.271.493 1.705.631.716.227 1.368.195 1.883.118.575-.086 1.768-.722 2.018-1.419.249-.697.249-1.295.174-1.42-.074-.124-.273-.198-.571-.347z"/></svg>
      </a>

      {/* Luxembourg Innovation Powerhouse - one column, navy box */}
      <section className="px-6 pb-16">
        <div className="container mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="bg-newtifi-navy text-white rounded-3xl shadow-2xl border border-newtifi-navy/20 overflow-hidden p-4 space-y-6">
              {/* Hero image of Adolphe Bridge (using available Luxembourg image) */}
              <div className="w-full h-64 md:h-80 bg-center bg-cover rounded-2xl" style={{ backgroundImage: "url('/images/uploads/adolphe-bridge-luxembourg.jpg')" }} aria-label="Adolphe Bridge, Luxembourg" />
              <div className="p-8 md:p-10">
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">Luxembourg Innovation Powerhouse</h2>
                <p className="text-base text-white/90 mb-8">Luxembourg's strategic advantages make it the ideal location for NewTIFI's mission to connect technology and finance.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white/10 rounded-2xl p-6 border border-white/10 text-center">
                    <div className="text-2xl font-bold text-newtifi-teal mb-2">EU Capital</div>
                    <div className="text-base text-white/90">Direct access to EU policymakers and regulators</div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-6 border border-white/10 text-center">
                    <div className="text-2xl font-bold text-newtifi-teal mb-2">5+ Languages</div>
                    <div className="text-base text-white/90">Multilingual professional environment</div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-6 border border-white/10 text-center">
                    <div className="text-2xl font-bold text-newtifi-teal mb-2">€6.2T AUM</div>
                    <div className="text-base text-white/90">Europe's largest investment fund center</div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-6 border border-white/10 text-center">
                    <div className="text-2xl font-bold text-newtifi-teal mb-2">3.2% R&D</div>
                    <div className="text-base text-white/90">Highest GDP investment in R&D in the EU</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* White section under Innovation - brief about NewTIFI */}
      <section className="px-6 pb-16 bg-white">
        <div className="container mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
              <h3 className="text-2xl font-bold text-newtifi-navy mb-4">About NewTIFI</h3>
              <p className="text-base text-gray-700 mb-2">New Technologies and Investment Funds Institute (NewTIFI) connects research, industry, and policy to accelerate innovation that serves the public good.</p>
              <p className="text-base text-gray-700">We publish peer‑reviewed journals and practitioner insights, support talent through scholarships and mentorships, and engage with institutions to promote innovation‑friendly regulation.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default Contact;