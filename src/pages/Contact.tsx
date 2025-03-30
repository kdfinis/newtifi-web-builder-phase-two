import React, { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  return (
    <main className="min-h-screen pb-20">
      {/* Header Section */}
      <section className="px-6 py-32 bg-newtifi-navy text-white">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 mt-32">Contact Us</h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Get in touch with our team. We're here to help and answer any questions you may have about NewTIFI's initiatives and programs.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="px-6 py-20">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto">
            <ScrollReveal>
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group">
                    <label htmlFor="firstName" className="block text-sm font-medium text-newtifi-navy mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-newtifi-teal focus:border-transparent transition-all duration-300 group-hover:border-newtifi-teal/50"
                      placeholder="John"
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="lastName" className="block text-sm font-medium text-newtifi-navy mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-newtifi-teal focus:border-transparent transition-all duration-300 group-hover:border-newtifi-teal/50"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium text-newtifi-navy mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-newtifi-teal focus:border-transparent transition-all duration-300 group-hover:border-newtifi-teal/50"
                    placeholder="john.doe@example.com"
                  />
                </div>

                <div className="group">
                  <label htmlFor="subject" className="block text-sm font-medium text-newtifi-navy mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-newtifi-teal focus:border-transparent transition-all duration-300 group-hover:border-newtifi-teal/50"
                    placeholder="How can we help?"
                  />
                </div>

                <div className="group">
                  <label htmlFor="message" className="block text-sm font-medium text-newtifi-navy mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-newtifi-teal focus:border-transparent transition-all duration-300 group-hover:border-newtifi-teal/50 resize-none"
                    placeholder="Your message here..."
                  ></textarea>
                </div>

                <div className="flex justify-start">
                  <button
                    type="submit"
                    className="group bg-newtifi-teal text-white px-8 py-3 rounded-lg font-medium hover:bg-newtifi-teal/90 transition-all duration-300 flex items-center space-x-2"
                  >
                    <span>Send Message</span>
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="px-6 py-20 bg-newtifi-navy text-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Get in Touch</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div 
                  className="text-center p-6 rounded-lg transition-all duration-300 hover:bg-white/5 cursor-pointer"
                  onMouseEnter={() => setIsHovered('email')}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <div className="inline-block p-3 rounded-full bg-newtifi-teal/10 mb-4">
                    <Mail className="h-6 w-6 text-newtifi-teal" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Email</h3>
                  <p className="text-white/80 hover:text-white transition-colors duration-300">info@newtifi.com</p>
                </div>
                
                <div 
                  className="text-center p-6 rounded-lg transition-all duration-300 hover:bg-white/5 cursor-pointer"
                  onMouseEnter={() => setIsHovered('phone')}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <div className="inline-block p-3 rounded-full bg-newtifi-teal/10 mb-4">
                    <Phone className="h-6 w-6 text-newtifi-teal" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Phone</h3>
                  <p className="text-white/80 hover:text-white transition-colors duration-300">(555) 123-4567</p>
                </div>
                
                <div 
                  className="text-center p-6 rounded-lg transition-all duration-300 hover:bg-white/5 cursor-pointer"
                  onMouseEnter={() => setIsHovered('address')}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <div className="inline-block p-3 rounded-full bg-newtifi-teal/10 mb-4">
                    <MapPin className="h-6 w-6 text-newtifi-teal" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Address</h3>
                  <p className="text-white/80 hover:text-white transition-colors duration-300">
                    14 rue Jean-Pierre Biermann<br />L-1268 Luxembourg
                  </p>
                </div>
              </div>

              <div className="mt-12 text-center">
                <h3 className="text-xl font-bold mb-4">Office Hours</h3>
                <p className="text-white/80">
                  Monday-Friday: 9am - 5pm PST
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact; 