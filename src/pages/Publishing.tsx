import React, { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { Sparkles, BookOpen, Users, Award, Globe, Target, ChevronDown, ChevronUp, FileText, Download } from 'lucide-react';
import { submissionRulesData, downloadSubmissionRulesPDF } from '@/data/submissionRules';

const Publishing: React.FC = () => {
  const [showSubmissionRules, setShowSubmissionRules] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
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
          <div className="max-w-4xl">
            <ScrollReveal>
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-newtifi-teal/20 text-newtifi-teal rounded-full text-sm font-medium">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Scientific & Editorial Arm
                </div>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  NewTIFI
                  <span className="text-newtifi-teal block">Publishing</span>
                </h1>
                <h2 className="text-2xl md:text-2xl font-semibold text-newtifi-teal">
                  Empowering knowledge & education for a sustainable future
                </h2>
                <p className="text-xl text-white/90 leading-relaxed">
          NewTIFI Publishing is the scientific and editorial arm of the New Technologies & Investment Funds Institute, dedicated to advancing accessible, high-quality research and thought leadership across the fields of new technologies and finance.
        </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-6 py-20 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <ScrollReveal>
                <div className="space-y-8">
                  <div className="bg-gradient-to-r from-newtifi-teal/10 to-newtifi-navy/10 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-newtifi-navy mb-4">Our Publications</h3>
                    <p className="text-lg text-gray-700 mb-6">
          We publish peer-reviewed journals, practitioner-oriented reviews, academic articles, books, and interviews that explore the intersections of innovation, sustainability, and public policy.
        </p>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-newtifi-teal rounded-full mr-3"></div>
                        <span className="text-gray-700">Peer-reviewed journals</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-newtifi-teal rounded-full mr-3"></div>
                        <span className="text-gray-700">Practitioner-oriented reviews</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-newtifi-teal rounded-full mr-3"></div>
                        <span className="text-gray-700">Academic articles</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-newtifi-teal rounded-full mr-3"></div>
                        <span className="text-gray-700">Books and interviews</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                    <h3 className="text-2xl font-bold text-newtifi-navy mb-4">Our Mission</h3>
                    <p className="text-lg text-gray-700 mb-6">
          Our mission is to foster informed dialogue and bridge the gap between cutting-edge research and real-world decision-making. All publications are produced with academic integrity, intellectual independence, and an emphasis on clarity and impact.
        </p>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-newtifi-teal/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                          <Award className="w-6 h-6 text-newtifi-teal" />
                        </div>
                        <div className="text-sm text-gray-600">Academic Integrity</div>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-newtifi-teal/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                          <Target className="w-6 h-6 text-newtifi-teal" />
                        </div>
                        <div className="text-sm text-gray-600">Intellectual Independence</div>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-newtifi-teal/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                          <Globe className="w-6 h-6 text-newtifi-teal" />
                        </div>
                        <div className="text-sm text-gray-600">Clarity & Impact</div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={200}>
                <div className="space-y-8">
                  <div className="bg-gradient-to-br from-newtifi-navy to-newtifi-teal text-white rounded-3xl p-8 shadow-xl">
                    <h4 className="text-2xl font-bold mb-6">Non-Profit Model</h4>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-white rounded-full mt-3 mr-4 flex-shrink-0"></div>
                        <div>
                          <h5 className="font-semibold mb-1">Contrary to many publishing houses</h5>
                          <p className="text-white/80 text-sm">NewTIFI operates as a non-profit organization</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-white rounded-full mt-3 mr-4 flex-shrink-0"></div>
                        <div>
                          <h5 className="font-semibold mb-1">All profits reinvested</h5>
                          <p className="text-white/80 text-sm">Used to fund Doctoral Scholarships</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-white rounded-full mt-3 mr-4 flex-shrink-0"></div>
                        <div>
                          <h5 className="font-semibold mb-1">Supporting education</h5>
                          <p className="text-white/80 text-sm">Advancing the next generation of researchers</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                    <h4 className="text-2xl font-bold text-newtifi-navy mb-6">Research Focus Areas</h4>
                    <div className="space-y-4">
                      <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                        <div className="w-3 h-3 bg-newtifi-teal rounded-full mr-4"></div>
                        <div>
                          <h5 className="font-semibold text-newtifi-navy">New Technologies</h5>
                          <p className="text-sm text-gray-600">Cutting-edge innovation and development</p>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                        <div className="w-3 h-3 bg-newtifi-teal rounded-full mr-4"></div>
                        <div>
                          <h5 className="font-semibold text-newtifi-navy">Investment Funds</h5>
                          <p className="text-sm text-gray-600">Financial innovation and management</p>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                        <div className="w-3 h-3 bg-newtifi-teal rounded-full mr-4"></div>
                        <div>
                          <h5 className="font-semibold text-newtifi-navy">Sustainability</h5>
                          <p className="text-sm text-gray-600">Environmental and social impact</p>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                        <div className="w-3 h-3 bg-newtifi-teal rounded-full mr-4"></div>
                        <div>
                          <h5 className="font-semibold text-newtifi-navy">Public Policy</h5>
                          <p className="text-sm text-gray-600">Regulatory frameworks and governance</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Submission Guidelines Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-2 bg-newtifi-teal/10 text-newtifi-teal rounded-full text-sm font-medium mb-6">
                  <FileText className="w-4 h-4 mr-2" />
                  Submission Guidelines
                </div>
                <h2 className="text-2xl md:text-4xl font-bold text-newtifi-navy mb-4">
                  How to Submit Your Research
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Follow our comprehensive guidelines to ensure your submission meets our standards for quality and academic rigor.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-newtifi-navy to-newtifi-teal text-white p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Submission Guidelines</h3>
                      <p className="text-white/90">Complete guidelines for authors and contributors</p>
                    </div>
                    <button
                      onClick={downloadSubmissionRulesPDF}
                      className="flex items-center gap-2 px-6 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors font-medium"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </button>
                  </div>
                </div>

                {/* Toggle Button */}
                <div className="p-6 border-b border-gray-100">
                  <button
                    onClick={() => setShowSubmissionRules(!showSubmissionRules)}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <div>
                      <h4 className="text-lg font-semibold text-newtifi-navy">View Complete Guidelines</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {showSubmissionRules ? 'Click to collapse' : 'Click to expand detailed submission requirements'}
                      </p>
                    </div>
                    {showSubmissionRules ? (
                      <ChevronUp className="w-6 h-6 text-newtifi-teal" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-newtifi-teal" />
                    )}
                  </button>
                </div>

                {/* Guidelines Content */}
                {showSubmissionRules && (
                  <div className="p-8 space-y-8">
                    {submissionRulesData.map((category, index) => (
                      <div key={category.id} className="border-b border-gray-100 last:border-b-0 pb-8 last:pb-0">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 bg-newtifi-teal/20 rounded-lg flex items-center justify-center">
                            <span className="text-newtifi-teal font-bold text-sm">{index + 1}</span>
                          </div>
                          <h5 className="text-xl font-bold text-newtifi-navy">{category.name}</h5>
                        </div>
                        <p className="text-gray-600 mb-6 leading-relaxed">{category.description}</p>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          {category.rules.map((rule) => (
                            <div key={rule.id} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                              <h6 className="font-semibold text-newtifi-navy mb-2">{rule.title}</h6>
                              <p className="text-sm text-gray-700 leading-relaxed">{rule.content}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>
      </div>
    </div>
      </section>
    </main>
  );
};

export default Publishing; 