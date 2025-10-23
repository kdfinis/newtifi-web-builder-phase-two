import React, { useState, useEffect } from "react";
import { useSimpleAuth } from '@/hooks/useSimpleAuth';
import { GoogleAuth } from '@/lib/auth/GoogleAuth';
import { LinkedInAuth } from '@/lib/auth/LinkedInAuth';
import { getGoogleOAuthUrl } from '@/lib/auth/GoogleOAuthConfig';
import { getLinkedInAuthUrl } from '@/lib/auth/LinkedInOAuthConfig';
import ScrollReveal from '@/components/ScrollReveal';

export default function Login() {
  const { isAuthenticated } = useSimpleAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Initialize OAuth SDKs
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await GoogleAuth.getInstance().initialize();
      } catch (err) {
        console.error('Failed to initialize Google Auth:', err);
      }
    };
    initializeAuth();
  }, []);

  // Handle URL parameters for error messages
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    const message = urlParams.get('message');
    
    if (error === 'google_not_configured') {
      setError('Google OAuth is not configured. Please use LinkedIn login or email/password.');
    } else if (error === 'google_auth_failed') {
      setError('Google authentication failed. Please try again or use LinkedIn login.');
    } else if (error === 'linkedin_auth_failed') {
      setError('LinkedIn authentication failed. Please try again or use Google login.');
    } else if (message) {
      setError(decodeURIComponent(message));
    }
  }, []);

  // Redirect if already authenticated
  if (isAuthenticated) {
    window.location.href = '/dashboard';
    return null;
  }

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setIsLoading(true);
      
      // Use configurable Google OAuth URL
      const googleUrl = getGoogleOAuthUrl();
      window.location.href = googleUrl;
    } catch (err) {
      console.error('Google sign-in error:', err);
      setError('Google sign-in failed. Please try again.');
      setIsLoading(false);
    }
  };

  const handleLinkedInSignIn = async () => {
    try {
      setError('');
      setIsLoading(true);
      
      const redirectUri = window.location.origin + '/auth/linkedin/callback';
      const state = 'linkedin_auth_' + Math.random().toString(36).substring(7);
      
      sessionStorage.setItem('linkedin_state', state);
      
      const linkedinUrl = getLinkedInAuthUrl(redirectUri, state);
      window.location.href = linkedinUrl;
    } catch (err) {
      console.error('LinkedIn sign-in error:', err);
      setError('LinkedIn sign-in failed. Please try again.');
      setIsLoading(false);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('Please use Google or LinkedIn to sign in.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="flex min-h-screen">
        {/* Left side - Brand section */}
        <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-newtifi-teal via-newtifi-navy to-indigo-900 relative overflow-hidden">
          {/* Subtle pattern overlay instead of dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
          
          <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
            <div className="text-center max-w-sm">
              <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Welcome to NewTIFI
              </h1>
              <p className="text-lg mb-6 text-blue-100 leading-relaxed">
                Shaping the Future of Technology through Innovation and Regulation
              </p>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="text-xs text-blue-50 leading-relaxed">
                  Join our community of technology leaders, investors, and innovators working together to build a better future.
                </p>
              </div>
            </div>
            <div className="mt-6 max-w-sm">
              <img 
                src="/images/uploads/luxembourg-skyline-golden-hour.jpg" 
                alt="Luxembourg Skyline"
                className="w-full h-32 object-cover rounded-lg shadow-xl border border-white/20"
              />
            </div>
            
            {/* NewTIFI Logo */}
            <div className="mt-4 max-w-xs">
              <img 
                src="/assets/images/logo.png" 
                alt="NewTIFI Logo"
                className="w-full h-auto drop-shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-full lg:w-3/5 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                {mode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-gray-600 text-lg">
                {mode === 'login' 
                  ? 'Sign in to your NewTIFI account' 
                  : 'Join the NewTIFI community'
                }
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8">
              <div className="space-y-6">
                <p className="text-gray-600 text-center leading-relaxed">
                  Choose a sign-in option. You can use LinkedIn for a quick, secure login, or sign in with your email and password below.
                </p>

                {/* SSO */}
                <div className="grid grid-cols-1 gap-4">
                  <button 
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl hover:border-gray-300 hover:bg-gray-50 text-gray-700 text-left text-base flex items-center gap-3 disabled:opacity-50 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill="#EA4335" d="M12 10.2v3.6h5.1c-.2 1.2-1.5 3.6-5.1 3.6-3.1 0-5.7-2.6-5.7-5.7S8.9 6 12 6c1.8 0 3 .8 3.7 1.5l2.5-2.5C16.8 3.8 14.7 3 12 3 6.9 3 2.7 7.2 2.7 12.3S6.9 21.6 12 21.6c6.9 0 9.3-4.8 9.3-7.2 0-.5 0-1-.1-1.2H12z"/>
                      <path fill="#34A853" d="M3.9 7.4l3 2.2C7.7 8 9.7 6.6 12 6.6c1.8 0 3 .8 3.7 1.5l2.5-2.5C16.8 3.8 14.7 3 12 3 8.6 3 5.6 4.9 3.9 7.4z"/>
                      <path fill="#FBBC05" d="M12 21.6c3.2 0 5.9-1.1 7.9-3.1l-3.3-2.7c-1 .7-2.3 1.2-4.6 1.2-3.6 0-6.7-2.4-7.7-5.7l-3.3 2.6C3.8 18.7 7.6 21.6 12 21.6z"/>
                      <path fill="#4285F4" d="M21.3 14.4c.1-.5.1-1 .1-1.6 0-.6 0-1.1-.1-1.6H12v3.2h9.3z"/>
                    </svg>
                    <span className="font-medium">{isLoading ? 'Redirecting...' : 'Continue with Google'}</span>
                  </button>
                  <button 
                    onClick={handleLinkedInSignIn}
                    disabled={isLoading}
                    className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 text-left text-base flex items-center gap-3 disabled:opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.036-1.85-3.036-1.853 0-2.136 1.446-2.136 2.941v5.664H9.354V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.368-1.85 3.602 0 4.268 2.37 4.268 5.455v6.286zM5.337 7.433a2.062 2.062 0 11.001-4.124 2.062 2.062 0 01-.001 4.124zM7.114 20.452H3.56V9h3.554v11.452z"/>
                    </svg>
                    <span className="font-medium">{isLoading ? 'Redirecting...' : 'Continue with LinkedIn'}</span>
                  </button>
                </div>

                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"/>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500 font-medium">Or continue with email</span>
                  </div>
                </div>

                {/* Email/Password Form */}
                <form onSubmit={submit} className="space-y-5">
                  {mode === 'signup' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                        <input
                          id="firstName"
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required={mode === 'signup'}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-newtifi-teal focus:border-newtifi-teal transition-colors bg-white/70"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                        <input
                          id="lastName"
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required={mode === 'signup'}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-newtifi-teal focus:border-newtifi-teal transition-colors bg-white/70"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-newtifi-teal focus:border-newtifi-teal transition-colors bg-white/70"
                      placeholder=""
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-newtifi-teal focus:border-newtifi-teal transition-colors bg-white/70"
                      placeholder=""
                    />
                  </div>

                  {mode === 'login' && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 w-4 text-newtifi-teal focus:ring-newtifi-teal border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 font-medium">Remember me</label>
                      </div>
                      <div className="text-sm">
                        <a href="/forgot-password" className="font-semibold text-newtifi-teal hover:text-newtifi-navy transition-colors">Forgot password?</a>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="text-red-600 text-sm text-center bg-red-50 p-4 rounded-xl border border-red-200">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-newtifi-teal to-newtifi-navy text-white py-4 px-6 rounded-xl hover:from-newtifi-navy hover:to-newtifi-teal focus:ring-2 focus:ring-newtifi-teal focus:ring-offset-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {isLoading ? 'Please wait...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600">
                    {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                    <button
                      onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                      className="font-semibold text-newtifi-teal hover:text-newtifi-navy transition-colors"
                    >
                      {mode === 'login' ? 'Sign up' : 'Sign in'}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}