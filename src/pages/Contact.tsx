import React, { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { ArrowRight, Mail, Phone, MapPin, ArrowUpRight, Users, Globe, Award, TrendingUp, Shield, Zap, Star, Quote, Sparkles, Target, Rocket } from 'lucide-react';

const Contact = () => {
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<'contact' | 'location' | 'network'>('contact');

  // Contact statistics
  const contactStats = [
    { number: '500+', label: 'Global Members', icon: Users },
    { number: '45+', label: 'Countries', icon: Globe },
    { number: '15+', label: 'Years Experience', icon: Award },
    { number: '95%', label: 'Satisfaction Rate', icon: Star }
  ];

  // Luxembourg advantages
  const luxembourgAdvantages = [
    {
      title: "Strategic EU Location",
      description: "Direct access to EU policymakers and regulatory bodies",
      stat: "EU Capital",
      detail: "Located in the heart of Europe's decision-making center"
    },
    {
      title: "Multilingual Expertise",
      description: "Professional team fluent in multiple languages",
      stat: "5+ Languages",
      detail: "English, French, German, Luxembourgish, and more"
    },
    {
      title: "Financial Hub Access",
      description: "Connect with Europe's largest investment fund center",
      stat: "€6.2T Assets",
      detail: "Under management in Luxembourg's financial sector"
    },
    {
      title: "Innovation Ecosystem",
      description: "Access to cutting-edge research and technology",
      stat: "3.2% R&D",
      detail: "GDP investment rate - highest in the EU"
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section with Value Proposition */}
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-newtifi-teal/20 text-newtifi-teal rounded-full text-sm font-medium">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get in Touch
                </div>
                <h1 className="text-4xl md:text-4xl font-bold leading-tight">
                  Let's Connect and
                  <span className="text-newtifi-teal block">Shape the Future</span>
                </h1>
                <p className="text-lg text-white/90 leading-relaxed">
                  Ready to explore opportunities with NewTIFI? Our team is here to help you navigate the intersection of technology and finance, and connect you with our global network of innovators.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => setActiveSection('contact')}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                      activeSection === 'contact' 
                        ? 'bg-newtifi-teal text-newtifi-navy' 
                        : 'border-2 border-white text-white hover:bg-white hover:text-newtifi-navy'
                    }`}
                  >
                    Contact Form
                  </button>
                  <button 
                    onClick={() => setActiveSection('location')}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                      activeSection === 'location' 
                        ? 'bg-newtifi-teal text-newtifi-navy' 
                        : 'border-2 border-white text-white hover:bg-white hover:text-newtifi-navy'
                    }`}
                  >
                    Our Location
                  </button>

                </div>
              </div>
            </ScrollReveal>
            

          </div>
        </div>
      </section>

      {/* Dynamic Content Section */}
      <section className="px-6 py-16 bg-white">
        <div className="container mx-auto">
          <div className="max-w-7xl mx-auto">
            {activeSection === 'contact' && (
              <ScrollReveal>
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                  <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                    <h2 className="text-2xl md:text-4xl font-bold text-newtifi-navy mb-6">
                      Get in Touch
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                      Ready to explore opportunities with NewTIFI? Our team is here to help you navigate the intersection of technology and finance.
                    </p>
                    
                    <div className="bg-gradient-to-r from-newtifi-teal/10 to-newtifi-navy/10 rounded-2xl p-6">
                      <h3 className="text-xl font-semibold text-newtifi-navy mb-3">Quick Contact</h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Mail className="w-5 h-5 text-newtifi-teal mr-3" />
                          <span className="text-gray-700">info@newtifi.com</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-5 h-5 text-newtifi-teal mr-3" />
                          <span className="text-gray-700">+352 123 456 789</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-5 h-5 text-newtifi-teal mr-3" />
                          <span className="text-gray-700">Luxembourg, Europe</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                    <h3 className="text-2xl font-bold text-newtifi-navy mb-6">Send Us a Message</h3>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                          type="text"
                          placeholder="First Name"
                          className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-0 focus:ring-2 focus:ring-newtifi-teal placeholder:text-gray-500 text-newtifi-navy"
                        />
                        <input
                          type="text"
                          placeholder="Last Name"
                          className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-0 focus:ring-2 focus:ring-newtifi-teal placeholder:text-gray-500 text-newtifi-navy"
                        />
                      </div>

                      <input
                        type="text"
                        placeholder="Company Name"
                        className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-0 focus:ring-2 focus:ring-newtifi-teal placeholder:text-gray-500 text-newtifi-navy"
                      />

                      <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-0 focus:ring-2 focus:ring-newtifi-teal placeholder:text-gray-500 text-newtifi-navy"
                      />

                      <input
                        type="tel"
                        placeholder="Phone Number"
                        className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-0 focus:ring-2 focus:ring-newtifi-teal placeholder:text-gray-500 text-newtifi-navy"
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                          type="text"
                          placeholder="Country"
                          className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-0 focus:ring-2 focus:ring-newtifi-teal placeholder:text-gray-500 text-newtifi-navy"
                        />
                        <input
                          type="text"
                          placeholder="Role/Position"
                          className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-0 focus:ring-2 focus:ring-newtifi-teal placeholder:text-gray-500 text-newtifi-navy"
                        />
                      </div>

                      <input
                        type="text"
                        placeholder="Subject"
                        className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-0 focus:ring-2 focus:ring-newtifi-teal placeholder:text-gray-500 text-newtifi-navy"
                      />

                      <textarea
                        rows={6}
                        placeholder="Your message"
                        className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-0 focus:ring-2 focus:ring-newtifi-teal placeholder:text-gray-500 text-newtifi-navy resize-none"
                      ></textarea>

                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="terms-contact"
                          className="mt-1 h-4 w-4 text-newtifi-teal focus:ring-newtifi-teal border-gray-300 rounded"
                        />
                        <label htmlFor="terms-contact" className="ml-2 block text-sm text-gray-600">
                          I agree to receive communications and accept the privacy policy
                        </label>
                      </div>

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
                
                {/* Map under Get in Touch */}
                <div className="mt-8">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2595.8684700480477!2d6.127777315490051!3d49.611979979999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47954a1c0c0c0c0c%3A0x0!2s14%20Rue%20Jean-Pierre%20Biermann%2C%201268%20Luxembourg!5e0!3m2!1sen!2slu!4v1677890257135!5m2!1sen!2slu&zoom=15"
                    width="100%"
                    height="300"
                    style={{ border: 0, borderRadius: '16px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="NewTIFI Location Map"
                  ></iframe>
                </div>
              </ScrollReveal>
            )}

            {activeSection === 'location' && (
              <ScrollReveal>
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                  <div>
                    <h2 className="text-2xl md:text-4xl font-bold text-newtifi-navy mb-6">
                      Our Location
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                      Located in the heart of Europe's financial district, NewTIFI benefits from Luxembourg's strategic position and world-class infrastructure.
                    </p>
                    
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-newtifi-teal/10 to-newtifi-navy/10 rounded-2xl p-6">
                        <h3 className="text-xl font-semibold text-newtifi-navy mb-4">Mailing Address</h3>
                        <div className="space-y-3 text-gray-700">
                          <p className="font-medium">New Technologies and Investment Funds Institute A.s.b.l.</p>
                          <p>14, rue Jean-Pierre Biermann</p>
                          <p>L-1268 Luxembourg</p>
                          <p>Grand Duchy of Luxembourg</p>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <h3 className="text-xl font-semibold text-newtifi-navy mb-4">Why Luxembourg?</h3>
                        <div className="space-y-3 text-gray-600">
                          <div className="flex items-start">
                            <div className="w-2 h-2 bg-newtifi-teal rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Strategic EU location with direct access to policymakers</span>
                          </div>
                          <div className="flex items-start">
                            <div className="w-2 h-2 bg-newtifi-teal rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Europe's largest investment fund center</span>
                          </div>
                          <div className="flex items-start">
                            <div className="w-2 h-2 bg-newtifi-teal rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Leading FinTech and innovation ecosystem</span>
                          </div>
                          <div className="flex items-start">
                            <div className="w-2 h-2 bg-newtifi-teal rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>Multilingual workforce and international environment</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                    <h3 className="text-2xl font-bold text-newtifi-navy mb-6">Visit Us</h3>
                    <div className="space-y-6">
                      <div className="bg-gray-50 rounded-2xl p-6">
                        <h4 className="font-semibold text-newtifi-navy mb-3">Office Hours</h4>
                        <div className="space-y-2 text-gray-600">
                          <div className="flex justify-between">
                            <span>Monday - Friday:</span>
                            <span>9:00 AM - 6:00 PM CET</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Saturday:</span>
                            <span>10:00 AM - 2:00 PM CET</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Sunday:</span>
                            <span>Closed</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-2xl p-6">
                        <h4 className="font-semibold text-newtifi-navy mb-3">Getting Here</h4>
                        <div className="space-y-3 text-gray-600">
                          <div>
                            <p className="font-medium">By Public Transport:</p>
                            <p className="text-sm">5-minute walk from Luxembourg Central Station</p>
                          </div>
                          <div>
                            <p className="font-medium">By Car:</p>
                            <p className="text-sm">Parking available in nearby public garages</p>
                          </div>
                          <div>
                            <p className="font-medium">By Air:</p>
                            <p className="text-sm">20-minute drive from Luxembourg Airport</p>
                          </div>
                        </div>
                      </div>
                      

                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}


          </div>
        </div>
      </section>

      {/* Luxembourg Innovation Powerhouse Section */}
      <section className="px-6 py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            <ScrollReveal>
              <div>
                <h2 className="text-2xl md:text-4xl font-bold text-newtifi-navy mb-6">
                  Luxembourg Innovation Powerhouse
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Luxembourg's strategic advantages make it the ideal location for NewTIFI's mission to connect technology and finance.
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  {luxembourgAdvantages.map((advantage, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-newtifi-teal mb-2">{advantage.stat}</div>
                        <h3 className="text-lg font-semibold text-newtifi-navy mb-2">{advantage.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{advantage.description}</p>
                        <p className="text-xs text-newtifi-teal font-medium">{advantage.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                <h3 className="text-2xl font-bold text-newtifi-navy mb-6">Why Luxembourg?</h3>
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-newtifi-teal/10 to-newtifi-navy/10 rounded-2xl p-6">
                    <h4 className="font-semibold text-newtifi-navy mb-3">Research Institutions</h4>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-newtifi-teal rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>University of Luxembourg - Leading research in FinTech</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-newtifi-teal rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>LIST - Luxembourg Institute of Science and Technology</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-newtifi-teal rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>FNR - National Research Fund supporting innovation</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h4 className="font-semibold text-newtifi-navy mb-3">Innovation Ecosystem</h4>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-newtifi-teal rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>€6.2 trillion in assets under management</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-newtifi-teal rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>3.2% GDP investment in R&D (highest in EU)</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-newtifi-teal rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>500+ FinTech companies and startups</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="px-6 py-20">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
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
                        <a href="mailto:info@newtifi.com" className="text-newtifi-teal hover:text-white transition-colors">
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

      {/* CTA Section */}
      <section className="px-6 py-16 bg-gradient-to-r from-newtifi-navy to-newtifi-teal text-white relative overflow-hidden">
        {/* Background stencil pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <rect x="10" y="10" width="80" height="80" stroke="white" strokeWidth="2" fill="none"/>
              <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="2" fill="none"/>
              <path d="M20,50 L80,50 M50,20 L50,80" stroke="white" strokeWidth="2"/>
            </svg>
          </div>
          <div className="absolute bottom-10 right-10 w-24 h-24">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" stroke="white" strokeWidth="2" fill="none"/>
              <circle cx="50" cy="50" r="20" stroke="white" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-2xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Connect with our team and discover how NewTIFI can help you navigate the future of technology and finance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setActiveSection('contact')}
                className="bg-white text-newtifi-navy hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 px-8 py-4 rounded-2xl font-medium"
              >
                Contact Us Now
              </button>
              <button 
                onClick={() => setActiveSection('network')}
                className="border-2 border-white text-white hover:bg-white hover:text-newtifi-navy transition-all duration-300 transform hover:scale-105 px-8 py-4 rounded-2xl font-medium"
              >
                Join Our Network
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default Contact; 