import React, { useState } from 'react';
import { Check, ChevronDown, Mail, Lock, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import Button from '@/components/Button';

const Membership = () => {
  const [activeForm, setActiveForm] = useState<'full' | 'limited' | null>(null);

  return (
    <main className="min-h-screen">
      {/* Membership Hero */}
      <section className="px-6 py-32 bg-newtifi-navy text-white">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 mt-32">Join Our Community</h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Become part of a global network of innovators and industry leaders who are shaping the future of technology.
            </p>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Membership Benefits */}
      <section className="px-6 py-12 bg-newtifi-grey">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl uppercase mb-4 text-newtifi-navy">Membership Benefits</h2>
            <p className="text-xl text-gray-700 font-light">
              Join our community of innovators and gain access to exclusive resources and opportunities.
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <ScrollReveal delay={100} className="flex flex-col bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-6 text-newtifi-navy">
                <span className="text-newtifi-teal">New Technologies and Investment Funds Institute</span> Institutional Member
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Complete access to all research and insights</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Priority access to events and workshops</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Direct collaboration opportunities</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Exclusive access to premium News & Articles content</span>
                </li>
              </ul>
            </ScrollReveal>
            
            <ScrollReveal delay={200} className="flex flex-col bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-6 text-newtifi-navy">
                <span className="text-newtifi-teal">New Technologies and Investment Funds Institute</span> Limited Access
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Access to public research and insights</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Newsletter subscription</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Event notifications</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Access to public News & Articles content</span>
                </li>
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* Fund a PhD Research Section */}
      <section className="px-6 py-16 bg-newtifi-grey">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
            <ScrollReveal direction="up" delay={100} className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl uppercase mb-4 text-newtifi-navy">Fund a PhD Research</h2>
              <p className="text-xl text-gray-700 font-light">
                Support groundbreaking research and shape the future of technology.
              </p>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ScrollReveal delay={100} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600 italic mb-6">
                    "Being part of New Technologies and Investment Funds Institute has connected me with innovators and industry leaders I wouldn't have met otherwise. The insights and collaborations have been invaluable to our technology development efforts."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                      alt="Member" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-newtifi-navy">David Chen</h4>
                    <p className="text-sm text-gray-500">CTO, FutureTech Solutions</p>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={200} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600 italic mb-6">
                    "The technology insights we've gained through our New Technologies and Investment Funds Institute membership have directly influenced our strategic roadmap. Their approach to combining human expertise with innovative technology is revolutionary."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                      alt="Member" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-newtifi-navy">Sarah Johnson</h4>
                    <p className="text-sm text-gray-500">Innovation Director, Global Health</p>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={300} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600 italic mb-6">
                    "Funding a scholarship through New Technologies and Investment Funds Institute has been one of our most rewarding investments. Seeing the project progress and knowing we're contributing to meaningful innovation is incredibly fulfilling."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                      alt="Member" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-newtifi-navy">Michael Torres</h4>
                    <p className="text-sm text-gray-500">Investment Partner, Horizon Ventures</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="px-6 pb-0 pt-16 bg-newtifi-grey">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
            <ScrollReveal direction="up" delay={100} className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl uppercase mb-4 text-newtifi-navy">What Our Members Say</h2>
              <p className="text-xl text-gray-700 font-light">
                Hear from our community about their experiences and impact.
              </p>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ScrollReveal delay={100} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600 italic mb-6">
                    "Being part of New Technologies and Investment Funds Institute has connected me with innovators and industry leaders I wouldn't have met otherwise. The insights and collaborations have been invaluable to our technology development efforts."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                      alt="Member" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-newtifi-navy">David Chen</h4>
                    <p className="text-sm text-gray-500">CTO, FutureTech Solutions</p>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={200} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600 italic mb-6">
                    "The technology insights we've gained through our New Technologies and Investment Funds Institute membership have directly influenced our strategic roadmap. Their approach to combining human expertise with innovative technology is revolutionary."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                      alt="Member" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-newtifi-navy">Sarah Johnson</h4>
                    <p className="text-sm text-gray-500">Innovation Director, Global Health</p>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={300} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600 italic mb-6">
                    "Funding a scholarship through New Technologies and Investment Funds Institute has been one of our most rewarding investments. Seeing the project progress and knowing we're contributing to meaningful innovation is incredibly fulfilling."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                      alt="Member" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-newtifi-navy">Michael Torres</h4>
                    <p className="text-sm text-gray-500">Investment Partner, Horizon Ventures</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
      
      {/* Membership Options */}
      <section className="px-6 py-20 bg-newtifi-grey">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl uppercase mb-4 text-newtifi-navy">Choose Your Membership</h2>
            <p className="text-xl text-gray-700 font-light">
              Select the membership tier that best fits your needs and goals.
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Full Membership */}
            <div className="bg-[#F4F1EC] rounded-2xl shadow-md overflow-hidden flex flex-col">
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">
                    <span className="text-newtifi-teal">New Technologies and Investment Funds Institute</span> Institutional Member
                  </h3>
                  <Lock className="h-6 w-6 text-newtifi-teal" />
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Complete access to all research and insights</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Priority access to events and workshops</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Direct collaboration opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Exclusive access to premium News & Articles content</span>
                  </li>
                </ul>
                <button
                  onClick={() => setActiveForm(activeForm === 'full' ? null : 'full')}
                  className="w-full bg-newtifi-navy text-white py-3 rounded-xl font-medium flex items-center justify-center group hover:bg-newtifi-navy/90 transition-all duration-300"
                >
                  <span>Apply for Institutional Member</span>
                  <ChevronDown className={`ml-2 h-5 w-5 transform transition-transform duration-300 ${activeForm === 'full' ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Registration Form */}
              <div className={`transition-all duration-300 ${activeForm === 'full' ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
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
                      type="password"
                      placeholder="Password"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                    />
                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-newtifi-teal focus:border-transparent">
                      <option value="">Select your role</option>
                      <option value="researcher">Researcher</option>
                      <option value="industry">Industry Professional</option>
                      <option value="investor">Investor</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="terms"
                        className="mt-1 h-4 w-4 text-newtifi-teal focus:ring-newtifi-teal border-gray-300 rounded"
                      />
                      <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                        I agree to the terms and conditions
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-newtifi-teal text-white py-3 rounded-xl font-medium hover:bg-newtifi-teal/90 transition-all duration-300"
                    >
                      Create Account
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Limited Access */}
            <div className="bg-[#F4F1EC] rounded-2xl shadow-md overflow-hidden flex flex-col">
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">
                    <span className="text-newtifi-teal">New Technologies and Investment Funds Institute</span> Limited Access
                  </h3>
                  <Mail className="h-6 w-6 text-newtifi-teal" />
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Access to public research and insights</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Newsletter subscription</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Event notifications</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-newtifi-teal mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Access to public News & Articles content</span>
                  </li>
                </ul>
                <button
                  onClick={() => setActiveForm(activeForm === 'limited' ? null : 'limited')}
                  className="w-full bg-newtifi-navy text-white py-3 rounded-xl font-medium flex items-center justify-center group hover:bg-newtifi-navy/90 transition-all duration-300"
                >
                  <span>Sign Up for Limited Access</span>
                  <ChevronDown className={`ml-2 h-5 w-5 transform transition-transform duration-300 ${activeForm === 'limited' ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Registration Form */}
              <div className={`transition-all duration-300 ${activeForm === 'limited' ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
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
                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-newtifi-teal focus:border-transparent">
                      <option value="">Select your interest</option>
                      <option value="research">Research Updates</option>
                      <option value="events">Event Notifications</option>
                      <option value="newsletter">Newsletter Only</option>
                    </select>
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="terms-limited"
                        className="mt-1 h-4 w-4 text-newtifi-teal focus:ring-newtifi-teal border-gray-300 rounded"
                      />
                      <label htmlFor="terms-limited" className="ml-2 block text-sm text-gray-600">
                        I agree to receive communications
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-newtifi-teal text-white py-3 rounded-xl font-medium hover:bg-newtifi-teal/90 transition-all duration-300"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Membership;
