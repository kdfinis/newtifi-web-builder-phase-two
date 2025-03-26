
import React from 'react';
import { Send, Phone, MapPin, Clock, Calendar } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import Button from '@/components/Button';
import { toast } from 'sonner';

const Connect = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Your message has been sent! We will be in touch soon.');
  };
  
  return (
    <main className="min-h-screen pt-28 pb-20">
      {/* Contact Section */}
      <section className="px-6 py-12 bg-white">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-sm font-light uppercase tracking-wide mb-4 text-newtifi-navy">Connect With Us</h1>
            <p className="text-sm text-gray-700 font-light">
              Have questions or want to learn more about NewTIFI? We'd love to hear from you. Reach out through the form below or contact us directly.
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ScrollReveal delay={100} className="bg-white p-8 rounded-sm shadow-sm">
              <h2 className="text-xs uppercase font-light tracking-wide mb-6 text-newtifi-navy">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs text-gray-700 mb-1 font-light">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-newtifi-teal"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs text-gray-700 mb-1 font-light">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-newtifi-teal"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-xs text-gray-700 mb-1 font-light">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-newtifi-teal"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-xs text-gray-700 mb-1 font-light">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-newtifi-teal"
                    required
                  ></textarea>
                </div>
                
                <Button type="submit" className="w-full">
                  <Send className="h-3.5 w-3.5 mr-2" />
                  Send Message
                </Button>
              </form>
            </ScrollReveal>
            
            {/* Contact Information */}
            <div className="space-y-8">
              <ScrollReveal delay={200} className="bg-white p-6 rounded-sm shadow-sm">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-newtifi-teal mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-xs font-light mb-2 text-newtifi-navy">Visit Us</h3>
                    <p className="text-xs text-gray-600 font-light">
                      NewTIFI A.s.b.l.<br />
                      14 rue Jean-Pierre Biermann<br />
                      L-1268 Luxembourg<br />
                      Cents neighborhood, Luxembourg
                    </p>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={300} className="bg-white p-6 rounded-sm shadow-sm">
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-newtifi-teal mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-xs font-light mb-2 text-newtifi-navy">Contact Us</h3>
                    <p className="text-xs text-gray-600 font-light">
                      Email: <a href="mailto:info@newtifi.com" className="text-newtifi-teal hover:underline">info@newtifi.com</a><br />
                      Phone: +352 2333 3333
                    </p>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={400} className="bg-white p-6 rounded-sm shadow-sm">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-newtifi-teal mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-xs font-light mb-2 text-newtifi-navy">Office Hours</h3>
                    <p className="text-xs text-gray-600 font-light">
                      Monday - Friday: 9:00 AM - 5:00 PM<br />
                      Saturday & Sunday: Closed
                    </p>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={500} className="bg-white p-6 rounded-sm shadow-sm">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-newtifi-teal mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-xs font-light mb-2 text-newtifi-navy">Schedule a Meeting</h3>
                    <p className="text-xs text-gray-600 font-light mb-3">
                      Interested in learning more about our work? Schedule a virtual or in-person meeting with our team.
                    </p>
                    <Button variant="outline" size="sm">
                      Request Meeting
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQs Section - Reduced Visual Size */}
      <section className="px-6 py-12 bg-gray-50">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-3xl mx-auto">
            <h2 className="section-title text-newtifi-navy text-center mb-6">
              Frequently Asked Questions
            </h2>
            
            <div className="max-w-2xl mx-auto">
              <ul className="space-y-4 text-left list-disc pl-5">
                <li className="text-xs text-gray-700 font-light">
                  <strong className="font-medium">What is NewTIFI?</strong><br />
                  NewTIFI is a non-profit organization that supports the long-term progress of science, policy, and entrepreneurship — working across disciplines to bring sustainable solutions to life.
                </li>
                <li className="text-xs text-gray-700 font-light">
                  <strong className="font-medium">How can I get involved with NewTIFI?</strong><br />
                  You can explore our membership options, attend our events, or reach out to us directly about collaboration opportunities.
                </li>
                <li className="text-xs text-gray-700 font-light">
                  <strong className="font-medium">Does NewTIFI provide funding?</strong><br />
                  NewTIFI assists researchers in obtaining donations for funding research that yields societal benefit in the Fields and Sectors outlined by NewTIFI (HealthTech, FoodTech, EnergyTech, FinTech), while remaining a neutral, non-funding facilitating institution.
                </li>
                <li className="text-xs text-gray-700 font-light">
                  <strong className="font-medium">What areas does NewTIFI focus on?</strong><br />
                  Our focus areas include HealthTech, FoodTech, EnergyTech, and FinTech, with an emphasis on solutions that have long-term positive societal impact.
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Legal Commentary Invitation */}
      <section className="px-6 py-12 bg-white">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-3xl mx-auto text-center">
            <h2 className="section-title text-newtifi-navy mb-4">
              Legal Commentary Invitation
            </h2>
            <p className="text-xs text-gray-700 font-light mb-6">
              If you are a legal professional interested in contributing to commentary on the RAIF Code or related legal instruments, please contact us to get involved.
            </p>
            <Button variant="outline" size="sm">
              Contact for Legal Collaboration
            </Button>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Map Section (Google Maps embed) */}
      <section className="h-96 w-full">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2584.9557446005065!2d6.179742015691369!3d49.60824397936746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479548cd9f2d8a15%3A0xf4057f4f62d80c04!2sCents%2C%20Luxembourg!5e0!3m2!1sen!2sus!4v1653067898801!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="NewTIFI Luxembourg Office Location"
        ></iframe>
      </section>
    </main>
  );
};

export default Connect;
