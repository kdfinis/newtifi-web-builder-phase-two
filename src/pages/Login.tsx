import React, { useState, useEffect } from "react";
import { loginEmail, registerEmail, loginWithGoogle, loginWithLinkedIn } from '@/lib/auth';
import { useSimpleAuth } from '@/hooks/useSimpleAuth';
import { handleOAuthCallback, isOAuthCallback } from '@/lib/oauth-handler';
import ScrollReveal from '@/components/ScrollReveal';

export default function Login() {
  const { login, register, isAuthenticated } = useSimpleAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle OAuth callback
  useEffect(() => {
    if (isOAuthCallback()) {
      handleOAuthCallback();
    }
  }, []);

  // Redirect if already authenticated
  if (isAuthenticated) {
    window.location.href = '/dashboard';
    return null;
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (mode === 'login') {
        const success = await login(email, password);
        if (success) {
          window.location.href = '/dashboard';
        } else {
          setError('Invalid credentials');
        }
      } else {
        const success = await register(email, password, `${firstName} ${lastName}`);
        if (success) {
          window.location.href = '/dashboard';
        } else {
          setError('Registration failed');
        }
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="flex min-h-screen">
        {/* Left side - Brand section */}
        <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-newtifi-teal to-newtifi-navy relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
            <div className="text-center max-w-md">
              <h1 className="text-4xl font-bold mb-6">Welcome to NewTIFI</h1>
              <p className="text-xl mb-8 text-gray-200">
                Shaping the Future of Technology through Innovation and Regulation
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <p className="text-sm text-gray-200">
                  Join our community of technology leaders, investors, and innovators working together to build a better future.
                </p>
              </div>
            </div>
            <div className="absolute bottom-8 left-8 right-8">
              <img 
                src="/assets/images/luxembourg-skyline.png" 
                alt="Luxembourg Skyline"
                className="w-full h-48 object-cover rounded-lg opacity-80"
              />
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-full lg:w-3/5 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-newtifi-navy mb-2">
                {mode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-gray-600">
                {mode === 'login' 
                  ? 'Sign in to your NewTIFI account' 
                  : 'Join the NewTIFI community'
                }
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <div className="p-10 md:p-12">
                <p className="text-base text-gray-600 mb-4">Choose a sign-in option. You can use Google or LinkedIn for a quick, secure login, or sign in with your email and password below.</p>

                {/* SSO */}
                <div className="grid grid-cols-1 gap-4 mb-8">
                  <button 
                    onClick={() => {
                      setIsLoading(true);
                      loginWithGoogle();
                    }} 
                    disabled={isLoading}
                    className="w-full px-6 py-4 border border-gray-200 rounded-2xl hover:bg-gray-50 text-newtifi-navy text-left text-base flex items-center gap-3 disabled:opacity-50"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true"><path fill="#EA4335" d="M12 10.2v3.6h5.1c-.2 1.2-1.5 3.6-5.1 3.6-3.1 0-5.7-2.6-5.7-5.7S8.9 6 12 6c1.8 0 3 .8 3.7 1.5l2.5-2.5C16.8 3.8 14.7 3 12 3 6.9 3 2.7 7.2 2.7 12.3S6.9 21.6 12 21.6c6.9 0 9.3-4.8 9.3-7.2 0-.5 0-1-.1-1.2H12z"/><path fill="#34A853" d="M3.9 7.4l3 2.2C7.7 8 9.7 6.6 12 6.6c1.8 0 3 .8 3.7 1.5l2.5-2.5C16.8 3.8 14.7 3 12 3 8.6 3 5.6 4.9 3.9 7.4z"/><path fill="#FBBC05" d="M12 21.6c3.2 0 5.9-1.1 7.9-3.1l-3.3-2.7c-1 .7-2.3 1.2-4.6 1.2-3.6 0-6.7-2.4-7.7-5.7l-3.3 2.6C3.8 18.7 7.6 21.6 12 21.6z"/><path fill="#4285F4" d="M21.3 14.4c.1-.5.1-1 .1-1.6 0-.6 0-1.1-.1-1.6H12v3.2h9.3z"/></svg>
                    <span>{isLoading ? 'Redirecting...' : 'Continue with Google'}</span>
                  </button>
                  <button 
                    onClick={() => {
                      setIsLoading(true);
                      loginWithLinkedIn();
                    }} 
                    disabled={isLoading}
                    className="w-full px-6 py-4 rounded-2xl bg-newtifi-navy text-white hover:bg-newtifi-navy/90 text-left text-base flex items-center gap-3 disabled:opacity-50"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true"><path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.036-1.85-3.036-1.853 0-2.136 1.446-2.136 2.941v5.664H9.354V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.368-1.85 3.602 0 4.268 2.37 4.268 5.455v6.286zM5.337 7.433a2.062 2.062 0 11.001-4.124 2.062 2.062 0 01-.001 4.124zM7.114 20.452H3.56V9h3.554v11.452z"/></svg>
                    <span>{isLoading ? 'Redirecting...' : 'Continue with LinkedIn'}</span>
                  </button>
                </div>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"/></div>
                  <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or continue with email</span></div>
                </div>

                {/* Email/Password Form */}
                <form onSubmit={submit} className="space-y-4">
                  {mode === 'signup' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input
                          id="firstName"
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required={mode === 'signup'}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input
                          id="lastName"
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required={mode === 'signup'}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                      placeholder="••••••••"
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
                        <a href="/forgot-password" className="font-medium text-newtifi-teal hover:text-newtifi-navy">Forgot password?</a>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-newtifi-teal text-white py-3 px-4 rounded-xl hover:bg-newtifi-navy focus:ring-2 focus:ring-newtifi-teal focus:ring-offset-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Please wait...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                    <button
                      onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                      className="font-medium text-newtifi-teal hover:text-newtifi-navy"
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