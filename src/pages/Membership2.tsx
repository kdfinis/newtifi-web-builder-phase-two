import React, { useState } from 'react';
import { Check, ChevronDown, Mail, Lock, ArrowRight, ArrowUpRight, Users, Globe, Award, TrendingUp, Shield, Zap, Star, Quote, Sparkles, Target, Rocket } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import Button from '@/components/Button';

const Membership2 = () => {
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
    <main className="min-h-screen bg-white text-[#1A1C2A]">
      {/* Hero Section with Value Proposition */}
      <section className="relative px-6 py-32 bg-gradient-to-br from-newtifi-navy via-newtifi-navy/95 to-newtifi-teal/20 text-white overflow-hidden">
        {/* Background Graphics */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-white/10 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/10 rounded-full"></div>
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
          <div className="w-full max-w-4xl">
            <ScrollReveal>
              <p className="text-xs uppercase tracking-[0.35em] text-white/70 mb-6">Membership</p>
              <div className="mb-8">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extralight tracking-[0.12em] leading-tight uppercase">
                  Shape the Future of <span className="text-newtifi-teal font-light">Technology & Finance</span>
                </h1>
              </div>
              <p className="text-base md:text-lg leading-relaxed text-white/85 font-light max-w-2xl">
                Connect with world-class researchers, policymakers, and industry leaders. Access verified insights and drive innovation across HealthTech, FoodTech, EnergyTech, and FinTech.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button
                  className="bg-newtifi-teal text-newtifi-navy hover:bg-white rounded-full px-6 py-3 text-xs uppercase tracking-[0.2em]"
                >
                  Apply for Membership
                </Button>
                <Button
                  variant="outline"
                  className="border-white/40 text-white hover:border-white rounded-full px-6 py-3 text-xs uppercase tracking-[0.2em]"
                >
                  Explore Benefits
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>



      {/* Membership Tiers Section */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="container mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.35em] text-[#5F5F5F] mb-4">
              Membership Tiers
            </p>
            <h2 className="text-2xl md:text-4xl font-extralight tracking-[0.12em] uppercase text-newtifi-navy mb-4">
              Choose Your Path to Innovation
            </h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              Three distinct membership tiers designed to meet your organization’s goals, from open access to enterprise collaboration.
            </p>
          </ScrollReveal>

          <ScrollReveal className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Positioning</p>
              <p className="mt-4 text-xl font-light text-newtifi-navy">Executive-led research</p>
              <p className="mt-2 text-sm text-gray-600">Evidence-backed intelligence for strategic decisions.</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Network</p>
              <p className="mt-4 text-xl font-light text-newtifi-navy">Global peer exchange</p>
              <p className="mt-2 text-sm text-gray-600">Curated access to policy, finance, and innovation leaders.</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Impact</p>
              <p className="mt-4 text-xl font-light text-newtifi-navy">Policy and market influence</p>
              <p className="mt-2 text-sm text-gray-600">Structured programs to shape the future of tech and finance.</p>
            </div>
          </ScrollReveal>
          
          <div className="grid lg:grid-cols-3 gap-8 w-full mx-auto">
            {/* Open Member */}
            <ScrollReveal delay={100}>
              <div className={`relative bg-white rounded-2xl p-8 shadow-sm border transition-all duration-300 hover:shadow-md ${
                selectedTier === 'open' ? 'border-newtifi-teal shadow-newtifi-teal/20' : 'border-gray-200'
              }`}>
                <div className="absolute -top-4 -left-4 w-16 h-16 border border-gray-200 rounded-2xl rotate-6"></div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 border border-gray-200 rounded-xl -rotate-6"></div>
                {/* Background pattern */}
                <div className="absolute top-4 right-4 w-16 h-16 opacity-5">
                  <svg viewBox="0 0 50 50" className="w-full h-full">
                    <circle cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="1" fill="none"/>
                    <path d="M10,25 L40,25 M25,10 L25,40" stroke="currentColor" strokeWidth="1"/>
                  </svg>
                </div>
                
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-newtifi-navy mb-2">Open Member</h3>
                  <p className="text-sm text-gray-600">Perfect for getting started</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-newtifi-teal mr-3" />
                    <span className="text-sm text-gray-700">Limited research access</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-newtifi-teal mr-3" />
                    <span className="text-sm text-gray-700">Public events & webinars</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-newtifi-teal mr-3" />
                    <span className="text-sm text-gray-700">Newsletter updates</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-newtifi-teal mr-3" />
                    <span className="text-sm text-gray-700">Community access</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveContent('overview');
                    setActiveForm(activeForm === 'open' ? null : 'open');
                  }}
                  className="w-full bg-gray-100 text-newtifi-navy py-3 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-gray-200 transition-all duration-300"
                >
                  Get Started Free
                </button>
              </div>
            </ScrollReveal>

            {/* Individual Member - Featured */}
            <ScrollReveal delay={200}>
              <div className={`relative bg-gradient-to-br from-newtifi-navy to-newtifi-navy/90 text-white rounded-2xl p-8 shadow-2xl border border-newtifi-teal transition-all duration-300 hover:-translate-y-1 ${
                selectedTier === 'individual' ? 'shadow-newtifi-teal/30' : ''
              }`}>
                <div className="absolute -top-6 -right-6 w-20 h-20 border border-white/20 rounded-2xl rotate-12"></div>
                <div className="absolute -bottom-6 left-4 w-14 h-14 border border-white/15 rounded-xl -rotate-6"></div>
                {/* Featured badge */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#57F0B0] text-[#1A1C2A] px-4 py-1 rounded-full text-xs font-semibold tracking-[0.2em] uppercase">
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
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-newtifi-teal" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Individual Member</h3>
                  <p className="text-sm text-white/80">Premium access</p>
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
                  className="w-full bg-newtifi-teal text-newtifi-navy py-3 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-white transition-all duration-300"
                >
                  Join Now
                    </button>
              </div>
            </ScrollReveal>

            {/* Institutional Member */}
            <ScrollReveal delay={300}>
              <div className={`relative bg-white rounded-2xl p-8 shadow-sm border transition-all duration-300 hover:shadow-md ${
                selectedTier === 'institutional' ? 'border-newtifi-teal shadow-newtifi-teal/20' : 'border-gray-200'
              }`}>
                <div className="absolute -top-4 -right-4 w-16 h-16 border border-gray-200 rounded-2xl -rotate-6"></div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 border border-gray-200 rounded-xl rotate-6"></div>
                {/* Background geometric pattern */}
                <div className="absolute top-4 right-4 w-16 h-16 opacity-5">
                  <svg viewBox="0 0 50 50" className="w-full h-full">
                    <polygon points="25,5 45,15 45,35 25,45 5,35 5,15" stroke="currentColor" strokeWidth="1" fill="none"/>
                    <circle cx="25" cy="25" r="8" stroke="currentColor" strokeWidth="1" fill="none"/>
                  </svg>
                </div>
                
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-newtifi-navy" />
                  </div>
                  <h3 className="text-xl font-semibold text-newtifi-navy mb-2">Institutional</h3>
                  <p className="text-sm text-gray-600">Enterprise solutions</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-newtifi-teal mr-3" />
                    <span className="text-sm text-gray-700">Everything in Individual</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-newtifi-teal mr-3" />
                    <span className="text-sm text-gray-700">Internal content distribution</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-newtifi-teal mr-3" />
                    <span className="text-sm text-gray-700">Custom training programs</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-newtifi-teal mr-3" />
                    <span className="text-sm text-gray-700">Dedicated account manager</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-5 h-5 text-newtifi-teal mr-3" />
                    <span className="text-sm text-gray-700">Custom research projects</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveContent('institutional');
                    setActiveForm(activeForm === 'institutional' ? null : 'institutional');
                  }}
                  className="w-full bg-newtifi-navy text-white py-3 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-newtifi-navy/90 transition-all duration-300"
                >
                  Contact Sales
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Membership Journey Section */}
      <section className="px-6 py-20 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
            <ScrollReveal>
              <p className="text-xs uppercase tracking-[0.35em] text-gray-500 mb-4">
                Membership Journey
              </p>
              <h2 className="text-2xl md:text-4xl font-extralight tracking-[0.12em] uppercase text-newtifi-navy mb-6">
                A structured, transparent process
              </h2>
              <p className="text-base text-gray-600 mb-8">
                Every membership tier is aligned with governance, research access, and collaborative impact. The process is simple, verified, and tailored to your goals.
              </p>
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-sm uppercase tracking-[0.2em] text-newtifi-navy mb-4">Eligibility</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>• Demonstrated interest in technology and finance.</p>
                  <p>• Commitment to ethical research and policy standards.</p>
                  <p>• Alignment with NewTIFI’s research priorities.</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: 'Apply', desc: 'Select a tier and submit your profile.' },
                  { title: 'Review', desc: 'We verify eligibility and alignment.' },
                  { title: 'Activate', desc: 'Unlock research, events, and tools.' },
                  { title: 'Collaborate', desc: 'Join programs and member initiatives.' }
                ].map((step, index) => (
                  <div key={step.title} className="relative bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                    <div className="absolute -top-3 -right-3 w-10 h-10 border border-gray-200 rounded-xl rotate-6"></div>
                    <p className="text-xs uppercase tracking-[0.25em] text-gray-500">Step {index + 1}</p>
                    <h4 className="mt-3 text-lg font-semibold text-newtifi-navy">{step.title}</h4>
                    <p className="mt-2 text-sm text-gray-600">{step.desc}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Dynamic Content Section */}
      <section className="px-6 py-20 bg-white relative overflow-hidden">
        {/* Background stencil pattern */}
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute top-10 left-10 w-32 h-32">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <rect x="10" y="10" width="80" height="80" stroke="#2d2a5f" strokeWidth="2" fill="none"/>
              <circle cx="50" cy="50" r="30" stroke="#2d2a5f" strokeWidth="2" fill="none"/>
              <path d="M20,50 L80,50 M50,20 L50,80" stroke="#2d2a5f" strokeWidth="2"/>
            </svg>
          </div>
          <div className="absolute bottom-10 right-10 w-24 h-24">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" stroke="#2d2a5f" strokeWidth="2" fill="none"/>
              <circle cx="50" cy="50" r="20" stroke="#2d2a5f" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="w-full mx-auto">
            {activeContent === 'overview' && (
              <ScrollReveal>
                <div className="text-center mb-12">
                  <p className="text-xs uppercase tracking-[0.35em] text-gray-500 mb-4">
                    Compare Benefits
                  </p>
                  <h2 className="text-2xl md:text-4xl font-extralight tracking-[0.12em] uppercase text-newtifi-navy mb-4">
                    Compare Membership Benefits
                  </h2>
                  <p className="text-base text-gray-600">
                    See exactly what each membership tier includes.
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="grid grid-cols-4 bg-gray-50">
                    <div className="p-6 font-semibold text-newtifi-navy">Feature</div>
                    <div className="p-6 text-center font-semibold text-gray-600">Open</div>
                    <div className="p-6 text-center font-semibold text-newtifi-navy">Individual</div>
                    <div className="p-6 text-center font-semibold text-gray-600">Institutional</div>
                  </div>
                  
                  {benefits.map((benefit, index) => (
                    <div key={index} className={`grid grid-cols-4 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <div className="p-6 text-gray-700">{benefit.feature}</div>
                      <div className="p-6 text-center">
                        {benefit.open ? <Check className="w-5 h-5 text-newtifi-teal mx-auto" /> : <span className="text-gray-400">—</span>}
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
                    <p className="text-xs uppercase tracking-[0.35em] text-gray-500 mb-4">
                      Individual
                    </p>
                    <h2 className="text-2xl md:text-4xl font-extralight tracking-[0.12em] uppercase text-newtifi-navy mb-6">
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
                  <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                    <img 
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=400&fit=crop&crop=center" 
                      alt="Individual Membership"
                      className="w-full h-80 object-cover rounded-2xl mb-6"
                    />
                    <h3 className="text-lg font-semibold text-newtifi-navy mb-4">Perfect For:</h3>
                    <ul className="space-y-2 text-gray-600">
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
                    <p className="text-xs uppercase tracking-[0.35em] text-gray-500 mb-4">
                      Institutional
                    </p>
                    <h2 className="text-2xl md:text-4xl font-extralight tracking-[0.12em] uppercase text-newtifi-navy mb-6">
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
                  <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                    <img 
                      src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=400&fit=crop&crop=center" 
                      alt="Institutional Membership"
                      className="w-full h-80 object-cover rounded-2xl mb-6"
                    />
                    <h3 className="text-lg font-semibold text-newtifi-navy mb-4">Perfect For:</h3>
                    <ul className="space-y-2 text-gray-600">
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
        <section className="fixed inset-0 bg-black/60 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-2xl">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-newtifi-navy">
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
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-newtifi-teal/20 focus:border-newtifi-teal outline-none"
                    />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-newtifi-teal/20 focus:border-newtifi-teal outline-none"
                  />
                </div>

                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-newtifi-teal/20 focus:border-newtifi-teal outline-none"
                    />

                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-newtifi-teal/20 focus:border-newtifi-teal outline-none"
                    />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      placeholder="Country"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-newtifi-teal/20 focus:border-newtifi-teal outline-none"
                    />
                    <input
                      type="text"
                    placeholder="Role/Position"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-newtifi-teal/20 focus:border-newtifi-teal outline-none"
                  />
                </div>

                {(activeForm === 'institutional' || activeForm === 'individual') && (
                  <input
                    type="text"
                    placeholder={activeForm === 'institutional' ? 'Company Name' : 'Organization'}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-newtifi-teal/20 focus:border-newtifi-teal outline-none"
                    />
                )}

                    <textarea
                  placeholder={activeForm === 'institutional' ? 'Tell us about your institution and goals' :
                             activeForm === 'individual' ? 'Tell us about your interests and goals' :
                             'Tell us about your interests'}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-newtifi-teal/20 focus:border-newtifi-teal outline-none"
                      rows={4}
                    />

                    <div className="flex items-start">
                      <input
                        type="checkbox"
                    id="terms"
                        className="mt-1 h-4 w-4 text-newtifi-teal focus:ring-newtifi-teal border-gray-300 rounded"
                      />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                    I agree to receive communications and accept the terms of membership
                      </label>
                    </div>

                    <button
                      type="submit"
                  className="w-full bg-newtifi-teal text-newtifi-navy py-3 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-newtifi-teal/90 transition-all duration-300"
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
      <section className="px-6 py-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="w-full mx-auto">
            <ScrollReveal className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.35em] text-gray-500 mb-4">
                Luxembourg Advantage
              </p>
              <h2 className="text-2xl md:text-4xl font-extralight tracking-[0.12em] uppercase text-newtifi-navy mb-4">
                Luxembourg: Innovation Powerhouse
              </h2>
              <p className="text-base text-gray-600 max-w-3xl mx-auto">
                NewTIFI leverages Luxembourg's strategic advantages and research capabilities in Europe’s most dynamic innovation ecosystem.
              </p>
            </ScrollReveal>

            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              <ScrollReveal>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-semibold text-newtifi-teal">3.2%</span>
                    <button 
                      onClick={() => setExpandedStats(expandedStats === 'rd' ? null : 'rd')}
                      className="text-gray-400 hover:text-newtifi-teal transition-colors"
                    >
                      {expandedStats === 'rd' ? '−' : '+'}
                    </button>
                  </div>
                  <p className="text-newtifi-navy font-medium mb-2">R&D Investment Rate</p>
                  <p className="text-sm text-gray-600 mb-3">Highest in the EU, exceeding 3% target</p>
                  {expandedStats === 'rd' && (
                    <div className="text-xs text-gray-600 border-t border-gray-200 pt-3">
                      <p><strong>Source:</strong> Eurostat, 2023</p>
                      <p><strong>Methodology:</strong> Gross domestic expenditure on R&D as % of GDP</p>
                    </div>
                  )}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-semibold text-newtifi-teal">€6.2T</span>
                <button
                      onClick={() => setExpandedStats(expandedStats === 'assets' ? null : 'assets')}
                      className="text-gray-400 hover:text-newtifi-teal transition-colors"
                >
                      {expandedStats === 'assets' ? '−' : '+'}
                </button>
              </div>
                  <p className="text-newtifi-navy font-medium mb-2">Financial Assets</p>
                  <p className="text-sm text-gray-600 mb-3">Under management in Luxembourg</p>
                  {expandedStats === 'assets' && (
                    <div className="text-xs text-gray-600 border-t border-gray-200 pt-3">
                      <p><strong>Source:</strong> CSSF Annual Report, 2023</p>
                      <p><strong>Scope:</strong> UCITS, AIFs, and other investment vehicles</p>
                    </div>
                  )}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-semibold text-newtifi-teal">500+</span>
                    <button
                      onClick={() => setExpandedStats(expandedStats === 'fintech' ? null : 'fintech')}
                      className="text-gray-400 hover:text-newtifi-teal transition-colors"
                    >
                      {expandedStats === 'fintech' ? '−' : '+'}
                    </button>
                  </div>
                  <p className="text-newtifi-navy font-medium mb-2">FinTech Companies</p>
                  <p className="text-sm text-gray-600 mb-3">Leading European ecosystem</p>
                  {expandedStats === 'fintech' && (
                    <div className="text-xs text-gray-600 border-t border-gray-200 pt-3">
                      <p><strong>Source:</strong> Luxembourg House of Financial Technology, 2023</p>
                      <p><strong>Includes:</strong> Startups, scale-ups, and established companies</p>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { title: 'FinTech', desc: 'Payments, digital assets, and RegTech programs.' },
                { title: 'HealthTech', desc: 'Clinical innovation and compliant data research.' },
                { title: 'EnergyTech', desc: 'Sustainable finance and grid transformation.' },
                { title: 'FoodTech', desc: 'Supply chain intelligence and resilience.' }
              ].map((pillar) => (
                <div key={pillar.title} className="relative bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                  <div className="absolute -top-3 -left-3 w-10 h-10 border border-gray-200 rounded-xl -rotate-6"></div>
                  <p className="text-xs uppercase tracking-[0.2em] text-newtifi-navy">{pillar.title}</p>
                  <p className="mt-3 text-sm text-gray-600">{pillar.desc}</p>
                </div>
              ))}
            </ScrollReveal>

            <div className="grid lg:grid-cols-2 gap-8">
              <ScrollReveal>
                <div className="bg-gradient-to-br from-newtifi-navy to-newtifi-navy/90 text-white rounded-2xl p-6 shadow-xl">
                  <h4 className="text-sm uppercase tracking-[0.2em] mb-4">Key Advantages</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-newtifi-teal rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <span className="font-medium">Strategic EU Location</span>
                        <p className="text-white/80 text-xs">Direct access to EU policymakers</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-newtifi-teal rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <span className="font-medium">Multilingual Expertise</span>
                        <p className="text-white/80 text-xs">70% speak 3+ languages</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-newtifi-teal rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <span className="font-medium">Innovation-Friendly Regulations</span>
                        <p className="text-white/80 text-xs">Progressive technology policies</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={100}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <h4 className="text-sm uppercase tracking-[0.2em] text-newtifi-navy mb-4">Research Institutions</h4>
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

export default Membership2;
