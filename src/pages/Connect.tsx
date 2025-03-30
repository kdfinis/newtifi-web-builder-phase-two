import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import Button from '@/components/Button';

const Connect = () => {
  return (
    <main className="min-h-screen">
      {/* Connect Hero */}
      <section className="px-6 py-32 bg-newtifi-navy text-white">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 mt-32">Contact Us</h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Meet the team driving innovation at NewTIFI. We're a diverse group of thinkers, builders, and innovators committed to shaping a better future through technology.
            </p>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Contact Form & Information */}
      <section className="px-6 py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ScrollReveal className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-newtifi-teal bg-newtifi-navy/10"
                    placeholder="Your name"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-newtifi-teal bg-newtifi-navy/10"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-newtifi-teal bg-newtifi-navy/10"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <div className="mb-6">
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    Select the role that applies to you
                  </label>
                  <select
                    id="role"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-newtifi-teal bg-newtifi-navy/10"
                  >
                    <option value="">Select a role</option>
                    <option value="professional">Professional investor</option>
                    <option value="manager">Investment Manager</option>
                    <option value="press">Press</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Select your country
                  </label>
                  <select
                    id="country"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-newtifi-teal bg-newtifi-navy/10"
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

                <div className="mb-6">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="privacy"
                      className="mt-1 h-4 w-4 text-newtifi-teal focus:ring-newtifi-teal border-gray-300 rounded"
                    />
                    <label htmlFor="privacy" className="ml-2 block text-sm text-gray-700">
                      I confirm that I have read and agree to the NewTIFI Privacy Policy
                    </label>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="communications"
                      className="mt-1 h-4 w-4 text-newtifi-teal focus:ring-newtifi-teal border-gray-300 rounded"
                    />
                    <label htmlFor="communications" className="ml-2 block text-sm text-gray-700">
                      I would like to receive occasional communications and insights reports from NewTIFI
                    </label>
                  </div>
                </div>
                
                <Button type="submit" fullWidth className="bg-newtifi-navy hover:bg-newtifi-navy/90">
                  Submit
                </Button>
              </form>
            </ScrollReveal>
            
            {/* Contact Information */}
            <div>
              <ScrollReveal className="bg-newtifi-navy text-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-gray-300">Luxembourg</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-gray-300">+352 123 456 789</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-gray-300">info@newtifi.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-6 w-6 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium">Office Hours</h3>
                      <p className="text-gray-300">Monday-Friday: 9am - 5pm CET</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={200}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden h-80">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2595.8684700480477!2d6.127777315490051!3d49.611979979999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47954a1c0c0c0c0c%3A0x0!2s14%20Rue%20Jean-Pierre%20Biermann%2C%201268%20Luxembourg!5e0!3m2!1sen!2slu!4v1677890257135!5m2!1sen!2slu&zoom=10"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="NewTIFI Office Location"
                  ></iframe>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="px-6 py-16 bg-newtifi-navy bg-opacity-5">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Find answers to common questions about NewTIFI's technology solutions, membership, and opportunities.
            </p>
          </ScrollReveal>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <ScrollReveal delay={100} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2 text-newtifi-navy">How can I join NewTIFI as a member?</h3>
              <p className="text-gray-600">
                You can apply for membership through our Membership page. Once we receive your application, our team will review it and contact you with next steps.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={200} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2 text-newtifi-navy">What kinds of technology does NewTIFI focus on?</h3>
              <p className="text-gray-600">
                We primarily focus on innovative technology solutions in HealthTech, FoodTech, EnergyTech, and FinTech sectors, with an emphasis on creating practical, human-centered solutions.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={300} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2 text-newtifi-navy">How does the scholar funding program work?</h3>
              <p className="text-gray-600">
                Our scholar funding program allows individuals and organizations to directly support promising innovators. You can choose specific technology areas to fund, and you'll receive regular updates on the progress and outcomes of the supported work.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Connect;
