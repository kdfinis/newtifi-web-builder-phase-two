import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Users, Award, Globe } from "lucide-react";
import ScrollReveal from '@/components/ScrollReveal';
import AuthModal from '@/components/AuthModal';

export default function Login() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleAuthSuccess = (user: any) => {
    localStorage.setItem('user', JSON.stringify(user));
    setIsLoggedIn(true);
    setShowAuthModal(false);
    // Redirect to home or previous page
    navigate('/');
  };

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Enhanced Hero Section with Visuals */}
      <section className="relative px-6 py-32 bg-gradient-to-br from-newtifi-navy to-newtifi-teal text-white overflow-hidden">
        {/* Background Graphics */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-white/10 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/10 rounded-full"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 border border-white/10 transform rotate-45"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-white/5 rounded-full"></div>
        
        {/* Stencil-style decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path d="M20,20 L180,20 L180,180 L20,180 Z" stroke="white" strokeWidth="2" fill="none"/>
            <circle cx="100" cy="100" r="40" stroke="white" strokeWidth="2" fill="none"/>
            <path d="M60,100 L140,100 M100,60 L100,140" stroke="white" strokeWidth="2"/>
          </svg>
        </div>
        
        {/* Animated floating elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-white/30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="container mx-auto relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Back Button */}
            <ScrollReveal>
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-12"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </button>
            </ScrollReveal>

            <ScrollReveal>
              <div className="space-y-8">
                <div className="inline-flex items-center px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium">
                  <Shield className="w-4 h-4 mr-2" />
                  Secure Access
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  Welcome Back
                </h1>
                
                <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                  Sign in to access our research platform and join our community of professionals.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Enhanced Authentication Section with Visuals */}
      <section className="px-6 py-24 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 border border-newtifi-teal rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-newtifi-navy rounded-full"></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 border border-newtifi-teal transform rotate-45"></div>
        </div>
        
        <div className="container mx-auto relative">
          <div className="max-w-2xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-newtifi-navy mb-4">
                  Choose Your Sign-In Method
                </h2>
                <p className="text-gray-600 text-lg">
                  Quick and secure access to your account
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="space-y-8">
                {/* Visual Luxembourg Elements */}
                <div className="flex justify-between items-center mb-8">
                  <div className="w-1/3 h-32 bg-gradient-to-br from-newtifi-teal/20 to-newtifi-navy/20 rounded-2xl border border-newtifi-teal/30 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-newtifi-teal/30 rounded-full flex items-center justify-center mx-auto mb-2">
                        <svg className="w-8 h-8 text-newtifi-teal" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-1/3 h-32 bg-gradient-to-br from-newtifi-navy/20 to-newtifi-teal/20 rounded-2xl border border-newtifi-navy/30 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-newtifi-navy/30 rounded-full flex items-center justify-center mx-auto mb-2">
                        <svg className="w-8 h-8 text-newtifi-navy" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-1/3 h-32 bg-gradient-to-br from-newtifi-teal/20 to-newtifi-navy/20 rounded-2xl border border-newtifi-teal/30 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-newtifi-teal/30 rounded-full flex items-center justify-center mx-auto mb-2">
                        <svg className="w-8 h-8 text-newtifi-teal" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Login */}
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
                  <h3 className="text-xl font-semibold text-newtifi-navy mb-6 text-center">
                    Quick Sign In
                  </h3>
                  
                  <div className="space-y-4">
                    <button
                      onClick={() => openAuthModal('login')}
                      className="w-full bg-white border-2 border-gray-200 text-gray-700 px-6 py-4 rounded-xl font-medium hover:border-newtifi-teal hover:text-newtifi-teal transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <g>
                          <path d="M21.805 10.023h-9.765v3.954h5.617c-.242 1.25-1.484 3.672-5.617 3.672-3.375 0-6.125-2.797-6.125-6.25s2.75-6.25 6.125-6.25c1.922 0 3.219.766 3.969 1.422l2.719-2.641c-1.719-1.547-3.953-2.5-6.688-2.5-5.531 0-10 4.469-10 10s4.469 10 10 10c5.75 0 9.563-4.031 9.563-9.719 0-.656-.07-1.156-.156-1.609z" fill="#FBBB00"/>
                          <path d="M3.152 7.548l3.25 2.391c.891-1.781 2.531-2.891 4.598-2.891 1.406 0 2.672.484 3.672 1.422l2.75-2.672c-1.719-1.547-3.953-2.5-6.688-2.5-3.906 0-7.188 2.672-8.406 6.25z" fill="#518EF8"/>
                          <path d="M12 22c2.719 0 5.031-.891 6.719-2.422l-3.094-2.531c-.844.594-1.922.953-3.625.953-2.797 0-5.156-1.891-6.016-4.453l-3.25 2.516c1.5 3.047 4.719 5.437 9.266 5.437z" fill="#28B446"/>
                          <path d="M21.805 10.023h-9.765v3.954h5.617c-.242 1.25-1.484 3.672-5.617 3.672-3.375 0-6.125-2.797-6.125-6.25s2.75-6.25 6.125-6.25c1.922 0 3.219.766 3.969 1.422l2.719-2.641c-1.719-1.547-3.953-2.5-6.688-2.5-5.531 0-10 4.469-10 10s4.469 10 10 10c5.75 0 9.563-4.031 9.563-9.719 0-.656-.07-1.156-.156-1.609z" fill="#F14336"/>
                        </g>
                      </svg>
                      Continue with Google
                    </button>
                    
                    <button
                      onClick={() => openAuthModal('login')}
                      className="w-full bg-blue-600 text-white px-6 py-4 rounded-xl font-medium hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect width="24" height="24" rx="4" fill="#0077B5"/>
                        <path d="M7.1 9.5H4.9V19H7.1V9.5ZM6 8.4C6.7 8.4 7.2 7.9 7.2 7.2C7.2 6.5 6.7 6 6 6C5.3 6 4.8 6.5 4.8 7.2C4.8 7.9 5.3 8.4 6 8.4ZM19 19H16.8V14.2C16.8 13.1 16.8 11.7 15.2 11.7C13.6 11.7 13.4 12.9 13.4 14.1V19H11.2V9.5H13.3V10.7H13.3C13.6 10.1 14.4 9.4 15.6 9.4C18.1 9.4 19 10.9 19 13.1V19Z" fill="white"/>
                      </svg>
                      Continue with LinkedIn
                    </button>
                  </div>
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">or</span>
                  </div>
                </div>

                {/* Email Login */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-semibold text-newtifi-navy mb-6 text-center">
                    Email Sign In
                  </h3>
                  
                  <div className="space-y-4">
                    <button
                      onClick={() => openAuthModal('login')}
                      className="w-full bg-newtifi-navy text-white px-6 py-4 rounded-xl font-semibold hover:bg-newtifi-navy/90 transition-all duration-300"
                    >
                      Sign In with Email
                    </button>
                    
                    <button
                      onClick={() => openAuthModal('signup')}
                      className="w-full bg-newtifi-teal/10 text-newtifi-teal px-6 py-4 rounded-xl font-semibold hover:bg-newtifi-teal/20 transition-all duration-300 border border-newtifi-teal/20"
                    >
                      Create New Account
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Simple Stats */}
            <ScrollReveal delay={400}>
              <div className="mt-16 pt-12 border-t border-gray-100">
                <div className="flex justify-center gap-12 text-center">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-5 h-5 text-newtifi-teal" />
                    <span>500+ Members</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Award className="w-5 h-5 text-newtifi-teal" />
                    <span>Peer-Reviewed</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Globe className="w-5 h-5 text-newtifi-teal" />
                    <span>Global Network</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        mode={authMode}
      />
    </main>
  );
}
