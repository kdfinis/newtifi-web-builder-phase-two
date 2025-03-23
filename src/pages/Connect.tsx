
import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import Button from '@/components/Button';

const Connect = () => {
  return (
    <main className="min-h-screen pt-28 pb-20">
      {/* Connect Hero */}
      <section className="px-6 py-12">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Connect With Us</h1>
            <p className="text-lg text-gray-600">
              Interested in learning more about Newtifi's research, membership opportunities, or potential collaborations? We'd love to hear from you.
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-newtifi-teal"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-newtifi-teal"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-newtifi-teal"
                    placeholder="What's this regarding?"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-newtifi-teal"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <Button type="submit" fullWidth>
                  Send Message
                </Button>
              </form>
            </ScrollReveal>
            
            {/* Contact Information */}
            <div>
              <ScrollReveal className="bg-newtifi-navy text-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-gray-300">123 AI Innovation St.</p>
                      <p className="text-gray-300">San Francisco, CA 94105</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-gray-300">(555) 123-4567</p>
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
                      <p className="text-gray-300">Monday-Friday: 9am - 5pm PST</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={200}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden h-80">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50470.11139771014!2d-122.43018817558091!3d37.773959229961635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1677890257135!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Newtifi Office Location"
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
              Find answers to common questions about Newtifi's research, membership, and opportunities.
            </p>
          </ScrollReveal>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <ScrollReveal delay={100} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2 text-newtifi-navy">How can I join Newtifi as a member?</h3>
              <p className="text-gray-600">
                You can apply for membership through our Membership page. Once we receive your application, our team will review it and contact you with next steps.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={200} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2 text-newtifi-navy">What kinds of research does Newtifi focus on?</h3>
              <p className="text-gray-600">
                We primarily focus on applied AI research in HealthTech, FoodTech, EnergyTech, and FinTech sectors, with an emphasis on creating practical, human-centered solutions.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={300} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2 text-newtifi-navy">How does the scholar funding program work?</h3>
              <p className="text-gray-600">
                Our scholar funding program allows individuals and organizations to directly support promising researchers. You can choose specific research areas to fund, and you'll receive regular updates on the progress and outcomes of the supported work.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Connect;
