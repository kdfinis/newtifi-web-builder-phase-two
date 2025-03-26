
import React, { useState } from 'react';
import { MapPin, Mail } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import Button from '@/components/Button';
import { toast } from '@/components/ui/use-toast';

const Connect = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
    autoReply: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Show success message
    toast({
      title: "Message sent",
      description: "Thank you for your message. We will get back to you soon.",
    });
    
    // Clear form
    setFormData({
      name: '',
      email: '',
      organization: '',
      message: '',
      autoReply: false
    });
  };

  return (
    <main className="min-h-screen pt-28 pb-20">
      {/* Connect Hero */}
      <section className="px-6 py-12">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-sm font-light uppercase tracking-wide mb-6 text-newtifi-navy">Contact Us</h1>
            <p className="text-xs text-gray-600 font-light">
              Interested in learning more about NewTIFI's research, membership opportunities, or potential collaborations? We'd love to hear from you.
            </p>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Contact Form & Information */}
      <section className="px-6 py-12 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ScrollReveal className="bg-white rounded-sm shadow-sm p-8">
              <h2 className="text-xs font-light uppercase tracking-wide mb-6 text-newtifi-navy">Send Us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-xs font-light text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-newtifi-teal text-xs"
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-xs font-light text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-newtifi-teal text-xs"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="organization" className="block text-xs font-light text-gray-700 mb-1">
                    Organization (Optional)
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-newtifi-teal text-xs"
                    placeholder="Your company or institution"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-xs font-light text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-newtifi-teal text-xs"
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="autoReply"
                      name="autoReply"
                      checked={formData.autoReply}
                      onChange={handleCheckChange}
                      className="h-4 w-4 text-newtifi-teal border-gray-300 rounded focus:ring-newtifi-teal"
                    />
                    <label htmlFor="autoReply" className="ml-2 block text-xs font-light text-gray-700">
                      Send me a copy of this message
                    </label>
                  </div>
                </div>
                
                <Button type="submit" fullWidth className="text-xs uppercase tracking-wide">
                  Send Message
                </Button>
              </form>
            </ScrollReveal>
            
            {/* Contact Information */}
            <div>
              <ScrollReveal className="bg-newtifi-navy text-white rounded-sm shadow-sm p-8 mb-8">
                <h2 className="text-xs font-light uppercase tracking-wide mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xs font-light">Address</h3>
                      <p className="text-[10px] text-gray-300 mt-1 font-light">
                        14 rue Jean-Pierre Biermann<br />
                        L-1268 Luxembourg
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="h-4 w-4 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xs font-light">Email</h3>
                      <p className="text-[10px] text-gray-300 mt-1 font-light">
                        info@newtifi.com
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={200}>
                <div className="bg-white rounded-sm shadow-sm overflow-hidden h-80">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2585.730564015783!2d6.1852649!3d49.612289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479548cd1aed85a7%3A0x516bc5a8c07e6ce3!2sCents%2C%20Luxembourg%20City%2C%20Luxembourg!5e0!3m2!1sen!2sus!4v1677890257135!5m2!1sen!2sus"
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
      
      {/* Scholar Funding & Legal Commentary CTA Section */}
      <section className="px-6 py-12 bg-white">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-3xl mx-auto mb-10">
            <div className="bg-gray-50 p-6 rounded-sm shadow-sm mb-8">
              <h3 className="text-xs font-light uppercase tracking-wide mb-2 text-newtifi-navy">Scholar Funding Program</h3>
              <p className="text-xs text-gray-600 font-light">
                Our scholar funding program focuses on funding research that yields societal benefit in the Fields and Sectors outlined by NewTIFI: HealthTech, FoodTech, EnergyTech, and FinTech. Through these initiatives, we aim to create lasting impact and promote sustainable innovation.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-sm shadow-sm">
              <h3 className="text-xs font-light uppercase tracking-wide mb-2 text-newtifi-navy">Legal Commentary Invitation</h3>
              <p className="text-xs text-gray-600 font-light">
                If you are a legal professional interested in contributing to commentary on the RAIF Code or related legal instruments, please contact us to get involved.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
      
      {/* FAQ Section - Reduced size with bullet points */}
      <section className="px-6 py-10 bg-gray-50">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-2xl mx-auto">
            <h2 className="section-title text-newtifi-navy text-center mb-6">
              Frequently Asked Questions
            </h2>
            
            <div className="bg-white p-5 rounded-sm shadow-sm">
              <ul className="list-disc pl-5 text-xs text-gray-600 space-y-4 font-light">
                <li>
                  <span className="font-medium text-newtifi-navy">How can I join NewTIFI as a member?</span>
                  <p className="mt-1">You can apply for membership through our Membership page. Once we receive your application, our team will review it and contact you with next steps.</p>
                </li>
                
                <li>
                  <span className="font-medium text-newtifi-navy">What kinds of research does NewTIFI focus on?</span>
                  <p className="mt-1">We primarily focus on applied research in HealthTech, FoodTech, EnergyTech, and FinTech sectors, with an emphasis on creating practical, human-centered solutions.</p>
                </li>
                
                <li>
                  <span className="font-medium text-newtifi-navy">How does the scholar funding program work?</span>
                  <p className="mt-1">Our scholar funding program allows individuals and organizations to directly support promising researchers. You can choose specific research areas to fund, and you'll receive regular updates on the progress and outcomes of the supported work.</p>
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default Connect;
