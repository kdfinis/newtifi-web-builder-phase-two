import React, { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { ArrowRight, Mail, Phone, MapPin, Clock, ArrowUpRight } from 'lucide-react';

const Contact = () => {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#F5E6E8]">
      {/* Hero Section with Overlapping Card */}
      <section className="relative px-6 pt-32 pb-40 bg-newtifi-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-newtifi-navy to-newtifi-navy/90"></div>
        <div className="container mx-auto relative">
          <ScrollReveal className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 mt-32">Get in Touch</h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Have questions about NewTIFI's initiatives? We're here to help you navigate the future of innovation.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Contact Form Card */}
      <section className="px-6 -mt-32 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="bg-[#E8D8E8] rounded-3xl shadow-2xl p-8 md:p-12">
                {/* Quick Contact Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div 
                    className="group p-6 bg-[#F5E6E8] rounded-2xl hover:bg-white/80 transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setIsHovered('email')}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Mail className="h-6 w-6 text-newtifi-navy" />
                      <ArrowUpRight className="h-5 w-5 text-newtifi-navy opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="text-lg font-semibold text-newtifi-navy mb-2">Email</h3>
                    <p className="text-newtifi-navy/70 text-sm">info@newtifi.com</p>
                  </div>

                  <div 
                    className="group p-6 bg-[#F5E6E8] rounded-2xl hover:bg-white/80 transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setIsHovered('phone')}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Phone className="h-6 w-6 text-newtifi-navy" />
                      <ArrowUpRight className="h-5 w-5 text-newtifi-navy opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="text-lg font-semibold text-newtifi-navy mb-2">Phone</h3>
                    <p className="text-newtifi-navy/70 text-sm">(555) 123-4567</p>
                  </div>

                  <div 
                    className="group p-6 bg-[#F5E6E8] rounded-2xl hover:bg-white/80 transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setIsHovered('location')}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <MapPin className="h-6 w-6 text-newtifi-navy" />
                      <ArrowUpRight className="h-5 w-5 text-newtifi-navy opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="text-lg font-semibold text-newtifi-navy mb-2">Location</h3>
                    <p className="text-newtifi-navy/70 text-sm">Luxembourg</p>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-newtifi-navy mb-4">Send Us a Message</h2>
                    <p className="text-newtifi-navy/70">We'll get back to you as soon as possible.</p>
                  </div>

                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <input
                          type="text"
                          placeholder="First Name"
                          className="w-full px-6 py-4 bg-white/80 rounded-2xl border-0 focus:ring-2 focus:ring-newtifi-teal placeholder:text-newtifi-navy/40 text-newtifi-navy"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Last Name"
                          className="w-full px-6 py-4 bg-white/80 rounded-2xl border-0 focus:ring-2 focus:ring-newtifi-teal placeholder:text-newtifi-navy/40 text-newtifi-navy"
                        />
                      </div>
                    </div>

                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-6 py-4 bg-white/80 rounded-2xl border-0 focus:ring-2 focus:ring-newtifi-teal placeholder:text-newtifi-navy/40 text-newtifi-navy"
                    />

                    <input
                      type="text"
                      placeholder="Subject"
                      className="w-full px-6 py-4 bg-white/80 rounded-2xl border-0 focus:ring-2 focus:ring-newtifi-teal placeholder:text-newtifi-navy/40 text-newtifi-navy"
                    />

                    <textarea
                      rows={6}
                      placeholder="Your message"
                      className="w-full px-6 py-4 bg-white/80 rounded-2xl border-0 focus:ring-2 focus:ring-newtifi-teal placeholder:text-newtifi-navy/40 text-newtifi-navy resize-none"
                    ></textarea>

                    <button
                      type="submit"
                      className="w-full bg-newtifi-navy text-white py-4 rounded-2xl font-medium flex items-center justify-center group hover:bg-newtifi-navy/90 transition-all duration-300"
                    >
                      <span>Send Message</span>
                      <ArrowRight className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1" />
                    </button>
                  </form>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Office Hours Section */}
      <section className="px-6 py-20">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-xl mx-auto">
            <div className="bg-[#E8D8E8] rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#F5E6E8] mb-6">
                <Clock className="h-6 w-6 text-newtifi-navy" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-newtifi-navy">Office Hours</h3>
              <p className="text-newtifi-navy/70">
                Monday-Friday: 9am - 5pm PST
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default Contact; 