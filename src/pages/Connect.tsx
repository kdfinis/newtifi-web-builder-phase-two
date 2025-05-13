import React from 'react';
import { MapPin, Phone, Mail, Clock, ArrowRight, ArrowUpRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import Button from '@/components/Button';

const Connect = () => {
  return (
    <main className="min-h-screen bg-[#F5E6E8]">
      {/* Hero Section with Overlapping Card */}
      <section className="relative px-6 pt-32 pb-40 bg-newtifi-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-newtifi-navy to-newtifi-navy/90"></div>
        <div className="container mx-auto relative">
          <ScrollReveal className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 mt-32">Get in Touch</h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Have questions about New Technologies and Investment Funds Institute's initiatives? We're here to help you navigate the future of innovation.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Contact Form Card */}
      <section className="px-6 -mt-32 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="bg-[#F5F7FA] rounded-3xl shadow-2xl p-8 md:p-12">
                {/* Quick Contact Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="group p-6 bg-[#F5F7FA] rounded-2xl hover:bg-white/80 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <Mail className="h-6 w-6 text-newtifi-navy" />
                      <ArrowUpRight className="h-5 w-5 text-newtifi-navy opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="text-lg font-semibold text-newtifi-navy mb-2">Email</h3>
                    <p className="text-newtifi-navy/70 text-sm">info@newtifi.com</p>
                  </div>

                  <div className="group p-6 bg-[#F5F7FA] rounded-2xl hover:bg-white/80 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <Phone className="h-6 w-6 text-newtifi-navy" />
                      <ArrowUpRight className="h-5 w-5 text-newtifi-navy opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="text-lg font-semibold text-newtifi-navy mb-2">Phone</h3>
                    <p className="text-newtifi-navy/70 text-sm">+352 123 456 789</p>
                  </div>

                  <div className="group p-6 bg-[#F5F7FA] rounded-2xl hover:bg-white/80 transition-all duration-300 cursor-pointer">
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
                    <div className="grid grid-cols-1 gap-6">
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full px-6 py-4 bg-white/80 rounded-2xl border-0 focus:ring-2 focus:ring-newtifi-teal placeholder:text-newtifi-navy/40 text-newtifi-navy"
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full px-6 py-4 bg-white/80 rounded-2xl border-0 focus:ring-2 focus:ring-newtifi-teal placeholder:text-newtifi-navy/40 text-newtifi-navy"
                      />
                      <textarea
                        rows={5}
                        placeholder="Your message"
                        className="w-full px-6 py-4 bg-white/80 rounded-2xl border-0 focus:ring-2 focus:ring-newtifi-teal placeholder:text-newtifi-navy/40 text-newtifi-navy resize-none"
                      ></textarea>

                      <div>
                        <label className="block text-sm font-medium text-newtifi-navy mb-2">
                          Select the role that applies to you
                        </label>
                        <select
                          className="w-full px-6 py-4 bg-white/80 rounded-2xl border-0 focus:ring-2 focus:ring-newtifi-teal text-newtifi-navy"
                        >
                          <option value="">Select a role</option>
                          <option value="professional">Professional investor</option>
                          <option value="manager">Investment Manager</option>
                          <option value="press">Press</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-newtifi-navy mb-2">
                          Select your country
                        </label>
                        <select
                          className="w-full px-6 py-4 bg-white/80 rounded-2xl border-0 focus:ring-2 focus:ring-newtifi-teal text-newtifi-navy"
                        >
                          <option value="">Select a country</option>
                          <option value="luxembourg">Luxembourg</option>
                          <option value="france">France</option>
                          <option value="germany">Germany</option>
                          <option value="belgium">Belgium</option>
                          <option value="netherlands">Netherlands</option>
                          <option value="uk">United Kingdom</option>
                          <option value="us">United States</option>
                        </select>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            id="privacy"
                            className="mt-1 h-4 w-4 text-newtifi-teal focus:ring-newtifi-teal border-gray-300 rounded"
                          />
                          <label htmlFor="privacy" className="ml-2 block text-sm text-newtifi-navy/70">
                            I confirm that I have read and agree to the New Technologies and Investment Funds Institute Privacy Policy
                          </label>
                        </div>

                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            id="communications"
                            className="mt-1 h-4 w-4 text-newtifi-teal focus:ring-newtifi-teal border-gray-300 rounded"
                          />
                          <label htmlFor="communications" className="ml-2 block text-sm text-newtifi-navy/70">
                            I would like to receive occasional communications and insights reports from New Technologies and Investment Funds Institute
                          </label>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-newtifi-navy text-white py-4 rounded-2xl font-medium flex items-center justify-center group hover:bg-newtifi-navy/90 transition-all duration-300"
                      >
                        <span>Send Message</span>
                        <ArrowRight className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mailing Address Section */}
      <section className="px-6 py-20">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-4xl mx-auto">
            <div className="bg-[#F5F7FA] rounded-3xl overflow-hidden shadow-lg">
              <div className="grid md:grid-cols-2">
                <div className="p-12 flex flex-col justify-center bg-newtifi-navy text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-newtifi-teal/10 rounded-bl-full"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-newtifi-teal/10 rounded-tr-full"></div>
                  
                  <h2 className="text-2xl font-bold mb-8 relative">
                    <span className="text-newtifi-teal">Mailing</span> Address
                  </h2>
                  
                  <div className="space-y-6 relative">
                    <div className="flex items-start space-x-4">
                      <div className="bg-newtifi-teal/20 p-3 rounded-xl">
                        <MapPin className="h-5 w-5 text-newtifi-teal" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-white/90 font-medium">New Technologies and Investment Funds Institute A.s.b.l.</p>
                        <p className="text-white/70">14, rue Jean-Pierre Biermann</p>
                        <p className="text-white/70">L-1268 Luxembourg</p>
                        <p className="text-white/70">Grand Duchy of Luxembourg</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-newtifi-teal/20 p-3 rounded-xl">
                        <Mail className="h-5 w-5 text-newtifi-teal" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-white/90 font-medium">Email</p>
                        <a 
                          href="mailto:info@newtifi.com" 
                          className="text-newtifi-teal hover:text-white transition-colors"
                        >
                          info@newtifi.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2595.8684700480477!2d6.127777315490051!3d49.611979979999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47954a1c0c0c0c0c%3A0x0!2s14%20Rue%20Jean-Pierre%20Biermann%2C%201268%20Luxembourg!5e0!3m2!1sen!2slu!4v1677890257135!5m2!1sen!2slu&zoom=10"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '400px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="New Technologies and Investment Funds Institute Location Map"
                  ></iframe>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default Connect;
