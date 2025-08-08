import React, { useState } from 'react';
import { Check, ChevronDown, Mail, Lock, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import Button from '@/components/Button';

const Membership = () => {
  const [activeForm, setActiveForm] = useState<'institutional' | 'individual' | 'open' | null>(null);

  return (
    <main className="min-h-screen bg-white">
      {/* Membership Hero */}
      <section className="px-6 py-32 bg-newtifi-navy text-white">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-2xl">
            <h1 className="text-4xl md:text-4xl font-bold mb-8 mt-32">Join NewTIFI</h1>
            <p className="text-base text-white/80 leading-relaxed">
              Become part of a global network of innovators and industry leaders who are shaping the future of technology.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Membership Options */}
      <section className="px-6 py-20 bg-white">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-4xl uppercase mb-4 text-newtifi-navy">Choose Your Membership</h2>
            <p className="text-base text-gray-700 font-light">
              Select the membership tier that best fits your needs and goals.
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Institutional Member */}
            <ScrollReveal delay={100} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col border border-gray-100 hover:border-newtifi-teal/20 transition-all duration-300">
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-newtifi-navy">
                    Institutional Member
                  </h3>
                  <Lock className="h-6 w-6 text-newtifi-teal" />
                </div>
                <p className="text-gray-600 mb-6">
                  For institutions wishing to grant access to NewTIFI resources to their employees.
                </p>
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Full access to all legal commentaries and tools</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Participation in networking events and roundtables</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Internal content distribution rights</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Recognition as an institutional supporter</span>
                  </li>
                </ul>
                <button
                  onClick={() => setActiveForm(activeForm === 'institutional' ? null : 'institutional')}
                  className="w-full bg-newtifi-navy text-white py-3 rounded-xl font-medium flex items-center justify-center group hover:bg-newtifi-navy/90 transition-all duration-300"
                >
                  <span>Request Contact</span>
                  <ChevronDown className={`ml-2 h-5 w-5 transform transition-transform duration-300 ${activeForm === 'institutional' ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Contact Form */}
              <div className={`transition-all duration-300 ${activeForm === 'institutional' ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-8 bg-white">
                  <form className="space-y-6">
                    <input
                      type="text"
                      placeholder="Company Name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Contact Person"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Country"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Role"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                    />
                    <textarea
                      placeholder="Tell us about your institution"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                      rows={4}
                    />
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="terms-institutional"
                        className="mt-1 h-4 w-4 text-newtifi-teal focus:ring-newtifi-teal border-gray-300 rounded"
                      />
                      <label htmlFor="terms-institutional" className="ml-2 block text-base text-gray-600">
                        I agree to receive communications
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-newtifi-teal text-white py-3 rounded-xl font-medium hover:bg-newtifi-teal/90 transition-all duration-300"
                    >
                      Submit Request
                    </button>
                  </form>
                </div>
              </div>
            </ScrollReveal>

            {/* Individual Member */}
            <ScrollReveal delay={200} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col border border-gray-100 hover:border-newtifi-teal/20 transition-all duration-300">
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-newtifi-navy">
                    Individual Member
                  </h3>
                  <Mail className="h-6 w-6 text-newtifi-teal" />
                </div>
                <p className="text-gray-600 mb-6">
                  For professionals and private individuals who wish to access NewTIFI's full suite of research and commentary.
                </p>
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Full personal access to legal commentaries</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Invitation to all member events</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Right to submit commentary</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Personalized member updates</span>
                  </li>
                </ul>
                <button
                  onClick={() => setActiveForm(activeForm === 'individual' ? null : 'individual')}
                  className="w-full bg-newtifi-navy text-white py-3 rounded-xl font-medium flex items-center justify-center group hover:bg-newtifi-navy/90 transition-all duration-300"
                >
                  <span>Apply</span>
                  <ChevronDown className={`ml-2 h-5 w-5 transform transition-transform duration-300 ${activeForm === 'individual' ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Application Form */}
              <div className={`transition-all duration-300 ${activeForm === 'individual' ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-8 bg-white">
                  <form className="space-y-6">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Country"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Role"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                    />
                    <textarea
                      placeholder="Tell us about your interests"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                      rows={4}
                    />
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="terms-individual"
                        className="mt-1 h-4 w-4 text-newtifi-teal focus:ring-newtifi-teal border-gray-300 rounded"
                      />
                      <label htmlFor="terms-individual" className="ml-2 block text-base text-gray-600">
                        I agree to receive communications
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-newtifi-teal text-white py-3 rounded-xl font-medium hover:bg-newtifi-teal/90 transition-all duration-300"
                    >
                      Submit Application
                    </button>
                  </form>
                </div>
              </div>
            </ScrollReveal>

            {/* Open Member */}
            <ScrollReveal delay={300} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col border border-gray-100 hover:border-newtifi-teal/20 transition-all duration-300">
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-newtifi-navy">
                    Open Member
                  </h3>
                  <ArrowRight className="h-6 w-6 text-newtifi-teal" />
                </div>
                <p className="text-gray-600 mb-6">
                  Free membership open to all citizens and interested individuals.
                </p>
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Limited access to selected commentaries</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Invitations to public events</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Access to exclusive updates</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">No cost, registration only</span>
                  </li>
                </ul>
                <button
                  onClick={() => setActiveForm(activeForm === 'open' ? null : 'open')}
                  className="w-full bg-newtifi-navy text-white py-3 rounded-xl font-medium flex items-center justify-center group hover:bg-newtifi-navy/90 transition-all duration-300"
                >
                  <span>Register</span>
                  <ChevronDown className={`ml-2 h-5 w-5 transform transition-transform duration-300 ${activeForm === 'open' ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Registration Form */}
              <div className={`transition-all duration-300 ${activeForm === 'open' ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-8 bg-white">
                  <form className="space-y-6">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Country"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Role"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                    />
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="terms-open"
                        className="mt-1 h-4 w-4 text-newtifi-teal focus:ring-newtifi-teal border-gray-300 rounded"
                      />
                      <label htmlFor="terms-open" className="ml-2 block text-base text-gray-600">
                        I agree to receive communications
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-newtifi-teal text-white py-3 rounded-xl font-medium hover:bg-newtifi-teal/90 transition-all duration-300"
                    >
                      Complete Registration
                    </button>
                  </form>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Membership; 