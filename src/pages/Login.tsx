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
    setIsLoading(true);
    setError('');

    try {
      if (mode === 'login') {
        // Password login - store in same format as OAuth
        // For now, accept any email/password (in production, this would validate against a backend)
        if (!email || !password) {
          setError('Please enter both email and password');
          setIsLoading(false);
          return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          setError('Please enter a valid email address');
          setIsLoading(false);
          return;
        }

        if (password.length < 6) {
          setError('Password must be at least 6 characters long');
          setIsLoading(false);
          return;
        }

        // Create user data in same format as OAuth
        const userData = {
          id: email.toLowerCase(),
          email: email.toLowerCase(),
          name: email.split('@')[0] || 'User',
          provider: 'password',
          loginTime: new Date().toISOString(),
          hasPasswordAuth: true
        };

        // Store in localStorage (same format as OAuth)
        localStorage.setItem('newtifi_user', JSON.stringify(userData));
        localStorage.setItem('newtifi_auth', 'true');
        
        // Trigger auth state refresh
        window.dispatchEvent(new CustomEvent('authStateChanged'));
        
        // Redirect to dashboard
        window.location.href = '/dashboard?auth=success&provider=password';
      } else {
        // Signup mode
        if (!email || !password || !firstName || !lastName) {
          setError('Please fill in all fields');
          setIsLoading(false);
          return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          setError('Please enter a valid email address');
          setIsLoading(false);
          return;
        }

        if (password.length < 6) {
          setError('Password must be at least 6 characters long');
          setIsLoading(false);
          return;
        }

        if (firstName.length < 2 || lastName.length < 2) {
          setError('First and last name must be at least 2 characters long');
          setIsLoading(false);
          return;
        }

        // Create user data
        const userData = {
          id: email.toLowerCase(),
          email: email.toLowerCase(),
          name: `${firstName} ${lastName}`.trim(),
          provider: 'password',
          loginTime: new Date().toISOString(),
          hasPasswordAuth: true
        };

        // Store in localStorage
        localStorage.setItem('newtifi_user', JSON.stringify(userData));
        localStorage.setItem('newtifi_auth', 'true');
        
        // Trigger auth state refresh
        window.dispatchEvent(new CustomEvent('authStateChanged'));
        
        // Redirect to dashboard
        window.location.href = '/dashboard?auth=success&provider=password';
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex min-h-[calc(100vh-var(--nav-h))]">
        {/* Left side - Brand section (Membership-era hero style) */}
        <div className="hidden lg:flex lg:w-2/5 institute-hero text-white">
          <div className="flex flex-col justify-center p-12">
            <div className="max-w-sm">
              <h1 className="mb-4 text-3xl leading-tight">
                Welcome to NewTIFI
              </h1>
              <p className="mb-6 text-base leading-relaxed text-white/80 text-pretty">
                Shaping the future of technology through innovation and regulation
              </p>
              <div className="border-l-2 border-newtifi-teal pl-4">
                <p className="text-sm leading-relaxed text-white/80 text-pretty">
                  Join our community of technology leaders, investors, and innovators working together to build a better future.
                </p>
              </div>
            </div>
            <div className="mt-10 max-w-[12rem]">
              <img
                src="/assets/images/logo.png"
                alt="NewTIFI Logo"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-full lg:w-3/5 flex items-center justify-center bg-gray-50 p-6 py-12 lg:p-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h2 className="mb-3 text-2xl md:text-3xl text-newtifi-navy">
                {mode === 'login' ? 'Welcome back' : 'Create account'}
              </h2>
              <p className="text-base text-gray-600">
                {mode === 'login' 
                  ? 'Sign in to your NewTIFI account' 
                  : 'Join the NewTIFI community'
                }
              </p>
            </div>

            <div className="surface-card p-8">
              <div className="space-y-6">
                <p className="text-gray-600 text-center leading-relaxed">
                  Choose a sign-in option. You can use LinkedIn for a quick, secure login, or sign in with your email and password below.
                </p>

                {/* SSO */}
                <div className="grid grid-cols-1 gap-4">
                  <button 
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    className="flex h-11 w-full items-center justify-center gap-3 rounded-lg bg-white px-5 text-sm text-newtifi-navy ring-1 ring-inset ring-gray-300 transition-[background-color,box-shadow,transform] duration-150 ease-out-strong active:scale-[0.97] disabled:opacity-50 motion-reduce:transition-none fine:hover:bg-gray-50 fine:hover:ring-gray-400"
                  >
                    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill="#EA4335" d="M12 10.2v3.6h5.1c-.2 1.2-1.5 3.6-5.1 3.6-3.1 0-5.7-2.6-5.7-5.7S8.9 6 12 6c1.8 0 3 .8 3.7 1.5l2.5-2.5C16.8 3.8 14.7 3 12 3 6.9 3 2.7 7.2 2.7 12.3S6.9 21.6 12 21.6c6.9 0 9.3-4.8 9.3-7.2 0-.5 0-1-.1-1.2H12z"/>
                      <path fill="#34A853" d="M3.9 7.4l3 2.2C7.7 8 9.7 6.6 12 6.6c1.8 0 3 .8 3.7 1.5l2.5-2.5C16.8 3.8 14.7 3 12 3 8.6 3 5.6 4.9 3.9 7.4z"/>
                      <path fill="#FBBC05" d="M12 21.6c3.2 0 5.9-1.1 7.9-3.1l-3.3-2.7c-1 .7-2.3 1.2-4.6 1.2-3.6 0-6.7-2.4-7.7-5.7l-3.3 2.6C3.8 18.7 7.6 21.6 12 21.6z"/>
                      <path fill="#4285F4" d="M21.3 14.4c.1-.5.1-1 .1-1.6 0-.6 0-1.1-.1-1.6H12v3.2h9.3z"/>
                    </svg>
                    <span>{isLoading ? 'Redirecting...' : 'Continue with Google'}</span>
                  </button>
                  <button 
                    onClick={handleLinkedInSignIn}
                    disabled={isLoading}
                    className="flex h-11 w-full items-center justify-center gap-3 rounded-lg bg-[#0A66C2] px-5 text-sm text-white transition-[background-color,transform] duration-150 ease-out-strong active:scale-[0.97] disabled:opacity-50 motion-reduce:transition-none fine:hover:bg-[#004182]"
                  >
                    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.036-1.85-3.036-1.853 0-2.136 1.446-2.136 2.941v5.664H9.354V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.368-1.85 3.602 0 4.268 2.37 4.268 5.455v6.286zM5.337 7.433a2.062 2.062 0 11.001-4.124 2.062 2.062 0 01-.001 4.124zM7.114 20.452H3.56V9h3.554v11.452z"/>
                    </svg>
                    <span>{isLoading ? 'Redirecting...' : 'Continue with LinkedIn'}</span>
                  </button>
                </div>

                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"/>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-4 text-gray-500">Or continue with email</span>
                  </div>
                </div>

                {/* Email/Password Form */}
                <form onSubmit={submit} className="space-y-5">
                  {mode === 'signup' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm text-gray-700 mb-1.5">First Name</label>
                        <input
                          id="firstName"
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required={mode === 'signup'}
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-newtifi-navy transition-[border-color,box-shadow] duration-150 ease-out-strong focus:border-newtifi-navy focus:outline-none focus:ring-2 focus:ring-newtifi-navy/20"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm text-gray-700 mb-1.5">Last Name</label>
                        <input
                          id="lastName"
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required={mode === 'signup'}
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-newtifi-navy transition-[border-color,box-shadow] duration-150 ease-out-strong focus:border-newtifi-navy focus:outline-none focus:ring-2 focus:ring-newtifi-navy/20"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label htmlFor="email" className="block text-sm text-gray-700 mb-1.5">Email</label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-newtifi-navy transition-[border-color,box-shadow] duration-150 ease-out-strong focus:border-newtifi-navy focus:outline-none focus:ring-2 focus:ring-newtifi-navy/20"
                      placeholder=""
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm text-gray-700 mb-1.5">Password</label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-newtifi-navy transition-[border-color,box-shadow] duration-150 ease-out-strong focus:border-newtifi-navy focus:outline-none focus:ring-2 focus:ring-newtifi-navy/20"
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
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">Remember me</label>
                      </div>
                      <div className="text-sm">
                        <a href="/forgot-password" className="text-newtifi-navy underline decoration-newtifi-teal underline-offset-4 transition-colors duration-150 ease-out-strong fine:hover:decoration-newtifi-navy">Forgot password?</a>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="text-red-600 text-sm text-center bg-red-50 p-4 rounded-lg border border-red-200">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="h-11 w-full rounded-lg bg-newtifi-teal px-6 text-sm font-bold text-white shadow-card transition-[background-color,transform] duration-150 ease-out-strong active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none fine:hover:bg-[#00aeb6]"
                  >
                    {isLoading ? 'Please wait...' : (mode === 'login' ? 'Sign in' : 'Create account')}
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600">
                    {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                    <button
                      onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                      className="text-newtifi-navy underline decoration-newtifi-teal underline-offset-4 transition-colors duration-150 ease-out-strong fine:hover:decoration-newtifi-navy"
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