
import React from 'react';
import { Check, Users, Award, BookOpen, GraduationCap } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import Button from '@/components/Button';

const Membership = () => {
  return (
    <main className="min-h-screen pt-28 pb-20">
      {/* Hero Section */}
      <section className="px-6 py-12 bg-white">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-sm font-light uppercase tracking-wide mb-4 text-newtifi-navy">Membership</h1>
            <p className="text-sm text-gray-700 font-light">
              Join the NewTIFI community and be part of shaping a better future through collaboration, research, and innovation.
            </p>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="px-6 py-12 bg-gray-50">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-3xl mx-auto mb-12">
            <h2 className="section-title text-newtifi-navy text-center mb-8">
              Membership Benefits
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="mr-4 bg-newtifi-teal bg-opacity-10 p-2 rounded-full">
                  <Check className="h-5 w-5 text-newtifi-teal" />
                </div>
                <div>
                  <p className="text-xs text-gray-700 font-light">
                    Exclusive access to high-level knowledge and strategic industry networks across the Fields and Sectors covered by NewTIFI.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 bg-newtifi-teal bg-opacity-10 p-2 rounded-full">
                  <Check className="h-5 w-5 text-newtifi-teal" />
                </div>
                <div>
                  <p className="text-xs text-gray-700 font-light">
                    Full access to the RAIF legal commentary and all upcoming legal commentaries authored by leading Luxembourg professionals.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Membership Tiers */}
      <section className="px-6 py-16 bg-white">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-title text-newtifi-navy">
              Membership Tiers
            </h2>
            <p className="text-xs text-gray-600 font-light">
              Choose the membership level that's right for you or your organization.
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Individual Membership */}
            <ScrollReveal delay={100} className="bg-white p-6 rounded border border-gray-200 shadow-sm hover:shadow transition-shadow duration-300">
              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  <Users className="h-10 w-10 text-newtifi-teal" />
                </div>
                <h3 className="text-sm font-light mb-2 text-newtifi-navy">Individual</h3>
                <div className="text-sm font-medium text-newtifi-navy mb-2">€250<span className="text-xs font-light text-gray-500">/year</span></div>
                <p className="text-xs text-gray-500 font-light">For professionals and researchers</p>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-newtifi-teal mr-2 mt-0.5" />
                  <span className="text-xs text-gray-600 font-light">Access to exclusive content</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-newtifi-teal mr-2 mt-0.5" />
                  <span className="text-xs text-gray-600 font-light">Invitations to quarterly webinars</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-newtifi-teal mr-2 mt-0.5" />
                  <span className="text-xs text-gray-600 font-light">Annual conference discount</span>
                </li>
              </ul>
              
              <Button variant="outline" fullWidth className="text-xs">
                Apply Now
              </Button>
            </ScrollReveal>
            
            {/* Academic Membership */}
            <ScrollReveal delay={200} className="bg-white p-6 rounded border border-gray-200 shadow-sm hover:shadow transition-shadow duration-300">
              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  <GraduationCap className="h-10 w-10 text-newtifi-teal" />
                </div>
                <h3 className="text-sm font-light mb-2 text-newtifi-navy">Academic</h3>
                <div className="text-sm font-medium text-newtifi-navy mb-2">€150<span className="text-xs font-light text-gray-500">/year</span></div>
                <p className="text-xs text-gray-500 font-light">For students and faculty</p>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-newtifi-teal mr-2 mt-0.5" />
                  <span className="text-xs text-gray-600 font-light">All individual benefits</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-newtifi-teal mr-2 mt-0.5" />
                  <span className="text-xs text-gray-600 font-light">Research collaboration opportunities</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-newtifi-teal mr-2 mt-0.5" />
                  <span className="text-xs text-gray-600 font-light">Access to academic network</span>
                </li>
              </ul>
              
              <Button variant="outline" fullWidth className="text-xs">
                Apply Now
              </Button>
            </ScrollReveal>
            
            {/* Organizational Membership */}
            <ScrollReveal delay={300} className="bg-newtifi-navy p-6 rounded shadow-md">
              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  <Award className="h-10 w-10 text-newtifi-teal" />
                </div>
                <h3 className="text-sm font-light mb-2 text-white">Organization</h3>
                <div className="text-sm font-medium text-white mb-2">€2,000<span className="text-xs font-light text-gray-300">/year</span></div>
                <p className="text-xs text-gray-300 font-light">For companies and institutions</p>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-newtifi-teal mr-2 mt-0.5" />
                  <span className="text-xs text-gray-300 font-light">All benefits from other tiers</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-newtifi-teal mr-2 mt-0.5" />
                  <span className="text-xs text-gray-300 font-light">Up to 5 individual memberships</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-newtifi-teal mr-2 mt-0.5" />
                  <span className="text-xs text-gray-300 font-light">Priority access to events and research</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-newtifi-teal mr-2 mt-0.5" />
                  <span className="text-xs text-gray-300 font-light">Featured in our partner network</span>
                </li>
              </ul>
              
              <Button className="w-full text-xs">
                Apply Now
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* Join CTA */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-3xl mx-auto text-center">
            <h2 className="text-sm font-light uppercase tracking-wide mb-4 text-newtifi-navy">Be in touch with NewTIFI</h2>
            <p className="text-xs text-gray-600 font-light mb-8 max-w-xl mx-auto">
              Ready to join our community? Apply for membership today or contact us to learn more about how NewTIFI can support your work.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button>
                Apply for Membership
              </Button>
              <Button variant="outline">
                Contact Us
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
      
      {/* FAQ */}
      <section className="px-6 py-16 bg-white">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-3xl mx-auto">
            <h2 className="section-title text-newtifi-navy text-center mb-8">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-xs font-medium mb-2 text-newtifi-navy">How do I apply for membership?</h3>
                <p className="text-xs text-gray-600 font-light">
                  You can apply for membership by completing our online application form. After submission, our team will review your application and contact you within 5 business days.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-xs font-medium mb-2 text-newtifi-navy">When is the membership fee due?</h3>
                <p className="text-xs text-gray-600 font-light">
                  Membership fees are due at the time of acceptance. We offer annual billing cycles, with the option to renew automatically.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-xs font-medium mb-2 text-newtifi-navy">Can I upgrade my membership tier?</h3>
                <p className="text-xs text-gray-600 font-light">
                  Yes, you can upgrade your membership tier at any time. The difference in fee will be prorated based on the time remaining in your current billing cycle.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-xs font-medium mb-2 text-newtifi-navy">Are there any discounts available?</h3>
                <p className="text-xs text-gray-600 font-light">
                  We offer discounted rates for academic institutions, non-profit organizations, and startups. Please contact us for more information about eligibility.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default Membership;
