import React, { useState } from 'react';
import { Check, ChevronDown, Mail, Lock, ArrowRight, ArrowUpRight, Users, Globe, Award, TrendingUp, Shield, Zap, Star, Quote, Sparkles, Target, Rocket } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import Button from '@/components/Button';

const Membership = () => {
  const [activeForm, setActiveForm] = useState<'institutional' | 'individual' | 'open' | null>(null);
  const [selectedTier, setSelectedTier] = useState<'institutional' | 'individual' | 'open' | null>(null);
  const [activeContent, setActiveContent] = useState<'overview' | 'individual' | 'institutional'>('overview');
  const [expandedStats, setExpandedStats] = useState<string | null>(null);

  // Member statistics
  const memberStats = [
    { number: '500+', label: 'Global Members', icon: Users },
    { number: '45+', label: 'Countries', icon: Globe },
    { number: '15+', label: 'Years Experience', icon: Award },
    { number: '95%', label: 'Satisfaction Rate', icon: Star }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "NewTIFI's insights have been invaluable for our investment strategy. The quality of research and networking opportunities are unmatched.",
      author: "Dr. Sarah Chen",
      role: "Chief Investment Officer",
      company: "Global Tech Ventures",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      quote: "Being part of NewTIFI has opened doors to collaborations I never thought possible. The community is truly world-class.",
      author: "Marcus Rodriguez",
      role: "Innovation Director",
      company: "FinTech Solutions Inc.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    }
  ];

  // Membership benefits comparison
  const benefits = [
    { feature: "Access to Research Library", institutional: true, individual: true, open: false },
    { feature: "Exclusive Events & Webinars", institutional: true, individual: true, open: true },
    { feature: "Networking Opportunities", institutional: true, individual: true, open: true },
    { feature: "Policy Advocacy Participation", institutional: true, individual: true, open: false },
    { feature: "Internal Content Distribution", institutional: true, individual: false, open: false },
    { feature: "Priority Support", institutional: true, individual: true, open: false },
    { feature: "Member Directory Access", institutional: true, individual: true, open: false },
    { feature: "Research Collaboration", institutional: true, individual: true, open: false }
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
          <div className="w-full">
            <ScrollReveal>
              <h1 className="text-2xl md:text-2xl font-light mb-10">Membership</h1>
              <div className="mb-10">
                <h2 className="text-2xl md:text-4xl lg:text-4xl font-extralight tracking-wider leading-tight uppercase">
                  Shape the Future of <span className="text-newtifi-teal">Technology & Finance</span>
                </h2>
              </div>
              <p className="text-base md:text-base leading-relaxed text-white/90 font-light">
                Connect with world-class researchers, policymakers, and industry leaders. Access cutting-edge insights and drive innovation across HealthTech, FoodTech, EnergyTech, and FinTech.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>



      {/* Membership Tiers Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-newtifi-navy mb-4">
              Choose Your Path to Innovation
            </h2>
            <p className="text-2xl text-gray-600 w-full">
              Three distinct membership tiers designed to meet your organization's needs and goals.
            </p>
          </ScrollReveal>
          
          <div className="grid lg:grid-cols-3 gap-8 w-full mx-auto">
            {/* Open Member */}
            <ScrollReveal delay={100}>
              <div className={`relative bg-white rounded-3xl p-8 shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                selectedTier === 'open' ? 'border-newtifi-teal shadow-newtifi-teal/20' : 'border-gray-200'
              }`}>
                {/* Background pattern */}
                <div className="absolute top-4 right-4 w-16 h-16 opacity-5">
                  <svg viewBox="0 0 50 50" className="w-full h-full">
                    <circle cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="1" fill="none"/>
                    <path d="M10,25 L40,25 M25,10 L25,40" stroke="currentColor" strokeWidth="1"/>
                  </svg>
                </div>
                
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-newtifi-navy mb-2">Open Member</h3>
                  <p className="text-gray-600">Perfect for getting started</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Limited research access</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Public events & webinars</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Newsletter updates</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Community access</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveContent('overview');
                    setActiveForm(activeForm === 'open' ? null : 'open');
                  }}
                  className="w-full bg-gray-100 text-newtifi-navy py-3 rounded-xl font-medium hover:bg-gray-200 transition-all duration-300"
                >
                  Get Started Free
                </button>
              </div>
            </ScrollReveal>

            {/* Individual Member - Featured */}
            <ScrollReveal delay={200}>
              <div className={`relative bg-gradient-to-br from-newtifi-navy to-newtifi-navy/90 text-white rounded-3xl p-8 shadow-2xl border-2 border-newtifi-teal transform scale-105 transition-all duration-300 hover:scale-110 ${
                selectedTier === 'individual' ? 'shadow-newtifi-teal/30' : ''
              }`}>
                {/* Featured badge */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-newtifi-teal text-newtifi-navy px-4 py-1 rounded-full text-base font-bold">
                    MOST POPULAR
                  </div>
              </div>

                {/* Background stencil pattern */}
                <div className="absolute top-4 right-4 w-16 h-16 opacity-10">
                  <svg viewBox="0 0 50 50" className="w-full h-full">
                    <rect x="10" y="10" width="30" height="30" stroke="white" strokeWidth="1" fill="none"/>
                    <circle cx="25" cy="25" r="10" stroke="white" strokeWidth="1" fill="none"/>
                  </svg>
              </div>

                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-newtifi-teal/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-newtifi-teal" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Individual Member</h3>
                  <p className="text-white/80">Premium access</p>
              </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-newtifi-teal mr-3" />
                    <span>Full research library access</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-newtifi-teal mr-3" />
                    <span>All events & networking</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-newtifi-teal mr-3" />
                    <span>Policy advocacy participation</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-newtifi-teal mr-3" />
                    <span>Priority support</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-newtifi-teal mr-3" />
                    <span>Member directory access</span>
                  </div>
                    </div>

                    <button
                  onClick={() => {
                    setActiveContent('individual');
                    setActiveForm(activeForm === 'individual' ? null : 'individual');
                  }}
                  className="w-full bg-newtifi-teal text-newtifi-navy py-3 rounded-xl font-medium hover:bg-white transition-all duration-300"
                >
                  Join Now
                    </button>
              </div>
            </ScrollReveal>

            {/* Institutional Member */}
            <ScrollReveal delay={300}>
              <div className={`relative bg-white rounded-3xl p-8 shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                selectedTier === 'institutional' ? 'border-newtifi-teal shadow-newtifi-teal/20' : 'border-gray-200'
              }`}>
                {/* Background geometric pattern */}
                <div className="absolute top-4 right-4 w-16 h-16 opacity-5">
                  <svg viewBox="0 0 50 50" className="w-full h-full">
                    <polygon points="25,5 45,15 45,35 25,45 5,35 5,15" stroke="currentColor" strokeWidth="1" fill="none"/>
                    <circle cx="25" cy="25" r="8" stroke="currentColor" strokeWidth="1" fill="none"/>
                  </svg>
                </div>
                
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-newtifi-teal/20 to-newtifi-navy/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-newtifi-navy" />
                  </div>
                  <h3 className="text-2xl font-bold text-newtifi-navy mb-2">Institutional</h3>
                  <p className="text-gray-600">Enterprise solutions</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Everything in Individual</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Internal content distribution</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Custom training programs</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Dedicated account manager</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Custom research projects</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveContent('institutional');
                    setActiveForm(activeForm === 'institutional' ? null : 'institutional');
                  }}
                  className="w-full bg-newtifi-navy text-white py-3 rounded-xl font-medium hover:bg-newtifi-navy/90 transition-all duration-300"
                >
                  Contact Sales
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Dynamic Content Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-newtifi-navy to-newtifi-teal relative overflow-hidden">
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
        
        <div className="container mx-auto relative z-10">
          <div className="w-full mx-auto">
            {activeContent === 'overview' && (
              <ScrollReveal>
                <div className="text-center mb-16">
                  <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                    Compare Membership Benefits
                  </h2>
                  <p className="text-base text-white/90">
                    See exactly what each membership tier includes
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="grid grid-cols-4 bg-gray-50">
                    <div className="p-6 font-semibold text-newtifi-navy">Feature</div>
                    <div className="p-6 text-center font-semibold text-gray-600">Open</div>
                    <div className="p-6 text-center font-semibold text-newtifi-navy">Individual</div>
                    <div className="p-6 text-center font-semibold text-gray-600">Institutional</div>
                  </div>
                  
                  {benefits.map((benefit, index) => (
                    <div key={index} className={`grid grid-cols-4 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                      <div className="p-6 text-gray-700">{benefit.feature}</div>
                      <div className="p-6 text-center">
                        {benefit.open ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <span className="text-gray-400">—</span>}
                      </div>
                      <div className="p-6 text-center">
                        {benefit.individual ? <Check className="w-5 h-5 text-newtifi-teal mx-auto" /> : <span className="text-gray-400">—</span>}
                      </div>
                      <div className="p-6 text-center">
                        {benefit.institutional ? <Check className="w-5 h-5 text-newtifi-navy mx-auto" /> : <span className="text-gray-400">—</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            )}

            {activeContent === 'individual' && (
              <ScrollReveal>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-2xl md:text-4xl font-bold text-newtifi-navy mb-6">
                      Individual Membership
                    </h2>
                    <p className="text-base text-gray-600 mb-8">
                      Join as an individual professional and gain exclusive access to NewTIFI's comprehensive research library, networking events, and policy advocacy opportunities.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Check className="w-6 h-6 text-newtifi-teal mr-4 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-newtifi-navy mb-1">Full Research Access</h3>
                          <p className="text-gray-600">Access our complete library of peer-reviewed articles, policy papers, and industry reports.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Check className="w-6 h-6 text-newtifi-teal mr-4 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-newtifi-navy mb-1">Exclusive Events</h3>
                          <p className="text-gray-600">Attend member-only webinars, workshops, and networking events with industry leaders.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Check className="w-6 h-6 text-newtifi-teal mr-4 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-newtifi-navy mb-1">Policy Participation</h3>
                          <p className="text-gray-600">Contribute to policy discussions and advocacy efforts in technology and finance.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-newtifi-teal/10 to-newtifi-navy/10 rounded-3xl p-8">
                    <img 
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=400&fit=crop&crop=center" 
                      alt="Individual Membership"
                      className="w-full h-80 object-cover rounded-2xl mb-6"
                    />
                    <h3 className="text-2xl font-bold text-newtifi-navy mb-4">Perfect For:</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Technology professionals and researchers</li>
                      <li>• Financial industry experts</li>
                      <li>• Policy analysts and consultants</li>
                      <li>• Entrepreneurs and startup founders</li>
                      <li>• Academic researchers and professors</li>
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {activeContent === 'institutional' && (
              <ScrollReveal>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-2xl md:text-4xl font-bold text-newtifi-navy mb-6">
                      Institutional Membership
                    </h2>
                    <p className="text-base text-gray-600 mb-8">
                      Empower your entire organization with comprehensive access to NewTIFI's resources, custom training programs, and dedicated support for enterprise-level innovation initiatives.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Check className="w-6 h-6 text-newtifi-navy mr-4 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-newtifi-navy mb-1">Enterprise Access</h3>
                          <p className="text-gray-600">Provide unlimited access to all NewTIFI resources for your entire team.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Check className="w-6 h-6 text-newtifi-navy mr-4 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-newtifi-navy mb-1">Custom Training</h3>
                          <p className="text-gray-600">Tailored training programs and workshops designed for your organization's specific needs.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Check className="w-6 h-6 text-newtifi-navy mr-4 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-newtifi-navy mb-1">Dedicated Support</h3>
                          <p className="text-gray-600">Direct access to our team of experts and dedicated account management.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-newtifi-navy/10 to-newtifi-teal/10 rounded-3xl p-8">
                    <img 
                      src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=400&fit=crop&crop=center" 
                      alt="Institutional Membership"
                      className="w-full h-80 object-cover rounded-2xl mb-6"
                    />
                    <h3 className="text-2xl font-bold text-newtifi-navy mb-4">Perfect For:</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Financial institutions and banks</li>
                      <li>• Technology companies and startups</li>
                      <li>• Consulting firms and advisory services</li>
                      <li>• Research institutions and universities</li>
                      <li>• Government agencies and regulators</li>
                </ul>
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>

      {/* Application Forms */}
      {activeForm && (
        <section className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50 bg-white">
          <div className="bg-white rounded-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-newtifi-navy">
                  {activeForm === 'institutional' ? 'Institutional Membership Request' :
                   activeForm === 'individual' ? 'Individual Membership Application' :
                   'Open Membership Registration'}
                </h3>
                <button
                  onClick={() => setActiveForm(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

                  <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                    placeholder="First Name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                    />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                  />
                </div>

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      placeholder="Country"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                    />
                    <input
                      type="text"
                    placeholder="Role/Position"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                  />
                </div>

                {(activeForm === 'institutional' || activeForm === 'individual') && (
                  <input
                    type="text"
                    placeholder={activeForm === 'institutional' ? 'Company Name' : 'Organization'}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                    />
                )}

                    <textarea
                  placeholder={activeForm === 'institutional' ? 'Tell us about your institution and goals' :
                             activeForm === 'individual' ? 'Tell us about your interests and goals' :
                             'Tell us about your interests'}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                      rows={4}
                    />

                    <div className="flex items-start">
                      <input
                        type="checkbox"
                    id="terms"
                        className="mt-1 h-4 w-4 text-newtifi-teal focus:ring-newtifi-teal border-gray-300 rounded"
                      />
                  <label htmlFor="terms" className="ml-2 block text-base text-gray-600">
                    I agree to receive communications and accept the terms of membership
                      </label>
                    </div>

                    <button
                      type="submit"
                  className="w-full bg-newtifi-teal text-newtifi-navy py-3 rounded-xl font-medium hover:bg-newtifi-teal/90 transition-all duration-300"
                    >
                  {activeForm === 'institutional' ? 'Submit Request' :
                   activeForm === 'individual' ? 'Submit Application' :
                   'Complete Registration'}
                    </button>
                  </form>
                </div>
              </div>
        </section>
      )}

      {/* Luxembourg Innovation Statistics Section */}
      <section className="px-6 py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto">
          <div className="w-full mx-auto">
            <ScrollReveal className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-newtifi-navy mb-4">
                Luxembourg: Innovation Powerhouse
              </h2>
              <p className="text-base text-gray-600 w-full">
                NewTIFI leverages Luxembourg's strategic advantages and research capabilities in Europe's most dynamic innovation ecosystem.
              </p>
            </ScrollReveal>

            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              <ScrollReveal>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-newtifi-teal">3.2%</span>
                    <button 
                      onClick={() => setExpandedStats(expandedStats === 'rd' ? null : 'rd')}
                      className="text-gray-400 hover:text-newtifi-teal transition-colors"
                    >
                      {expandedStats === 'rd' ? '−' : '+'}
                    </button>
                  </div>
                  <p className="text-newtifi-navy font-medium mb-2">R&D Investment Rate</p>
                  <p className="text-base text-gray-600 mb-3">Highest in the EU, exceeding 3% target</p>
                  {expandedStats === 'rd' && (
                    <div className="text-xs text-gray-500 border-t pt-3">
                      <p><strong>Source:</strong> Eurostat, 2023</p>
                      <p><strong>Methodology:</strong> Gross domestic expenditure on R&D as % of GDP</p>
                    </div>
                  )}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-newtifi-teal">€6.2T</span>
                <button
                      onClick={() => setExpandedStats(expandedStats === 'assets' ? null : 'assets')}
                      className="text-gray-400 hover:text-newtifi-teal transition-colors"
                >
                      {expandedStats === 'assets' ? '−' : '+'}
                </button>
              </div>
                  <p className="text-newtifi-navy font-medium mb-2">Financial Assets</p>
                  <p className="text-base text-gray-600 mb-3">Under management in Luxembourg</p>
                  {expandedStats === 'assets' && (
                    <div className="text-xs text-gray-500 border-t pt-3">
                      <p><strong>Source:</strong> CSSF Annual Report, 2023</p>
                      <p><strong>Scope:</strong> UCITS, AIFs, and other investment vehicles</p>
                    </div>
                  )}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-newtifi-teal">500+</span>
                    <button
                      onClick={() => setExpandedStats(expandedStats === 'fintech' ? null : 'fintech')}
                      className="text-gray-400 hover:text-newtifi-teal transition-colors"
                    >
                      {expandedStats === 'fintech' ? '−' : '+'}
                    </button>
                  </div>
                  <p className="text-newtifi-navy font-medium mb-2">FinTech Companies</p>
                  <p className="text-base text-gray-600 mb-3">Leading European ecosystem</p>
                  {expandedStats === 'fintech' && (
                    <div className="text-xs text-gray-500 border-t pt-3">
                      <p><strong>Source:</strong> Luxembourg House of Financial Technology, 2023</p>
                      <p><strong>Includes:</strong> Startups, scale-ups, and established companies</p>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <ScrollReveal>
                <div className="bg-gradient-to-br from-newtifi-navy to-newtifi-teal text-white rounded-2xl p-6 shadow-xl">
                  <h4 className="text-base font-bold mb-4">Key Advantages</h4>
                  <div className="space-y-3 text-base">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <span className="font-medium">Strategic EU Location</span>
                        <p className="text-white/80 text-xs">Direct access to EU policymakers</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <span className="font-medium">Multilingual Expertise</span>
                        <p className="text-white/80 text-xs">70% speak 3+ languages</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <span className="font-medium">Innovation-Friendly Regulations</span>
                        <p className="text-white/80 text-xs">Progressive technology policies</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={100}>
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                  <h4 className="text-base font-bold text-newtifi-navy mb-4">Research Institutions</h4>
                  <div className="space-y-3">
                    <a 
                      href="https://wwwen.uni.lu" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                    >
                      <div className="w-3 h-3 bg-newtifi-teal rounded-full mr-3"></div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-newtifi-navy group-hover:text-newtifi-teal transition-colors">University of Luxembourg</h5>
                        <p className="text-xs text-gray-600">6,700+ students, leading research university</p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-newtifi-teal transition-colors" />
                    </a>
                    <a 
                      href="https://www.list.lu" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                    >
                      <div className="w-3 h-3 bg-newtifi-teal rounded-full mr-3"></div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-newtifi-navy group-hover:text-newtifi-teal transition-colors">Luxembourg Institute of Science and Technology (LIST)</h5>
                        <p className="text-xs text-gray-600">Applied research and innovation center</p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-newtifi-teal transition-colors" />
                    </a>
                    <a 
                      href="https://www.fnr.lu" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                    >
                      <div className="w-3 h-3 bg-newtifi-teal rounded-full mr-3"></div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-newtifi-navy group-hover:text-newtifi-teal transition-colors">Luxembourg National Research Fund (FNR)</h5>
                        <p className="text-xs text-gray-600">€100M+ annual research funding</p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-newtifi-teal transition-colors" />
                    </a>
                </div>
              </div>
            </ScrollReveal>
            </div>
          </div>
        </div>
      </section>


    </main>
  );
};

export default Membership; 