import React from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import Button from '@/components/Button';

const Login = () => {
  return (
    <main className="min-h-screen bg-newtifi-grey">
      {/* Hero Section with Overlapping Card */}
      <section className="relative px-6 pt-32 pb-40 bg-newtifi-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-newtifi-navy to-newtifi-navy/90"></div>
        <div className="container mx-auto relative">
          <ScrollReveal className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 mt-32">Welcome Back</h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Access your NewTIFI account to explore research, connect with members, and stay updated on the latest innovations.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Login Form Card */}
      <section className="px-6 -mt-32 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-xl mx-auto">
            <ScrollReveal>
              <div className="bg-[#F5F7FA] rounded-2xl shadow-xl p-8 md:p-12">
                {/* Social Login Options */}
                <div className="space-y-4 mb-8">
                  <Button 
                    variant="outline"
                    className="w-full flex items-center justify-center gap-3 border-newtifi-navy text-newtifi-navy hover:bg-newtifi-navy hover:text-white"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full flex items-center justify-center gap-3 border-newtifi-navy text-newtifi-navy hover:bg-newtifi-navy hover:text-white"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                    </svg>
                    Continue with Facebook
                  </Button>
                </div>

                <div className="relative mb-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-[#F5F7FA] text-gray-500">Or continue with email</span>
                  </div>
                </div>

                {/* Login Form */}
                <form className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        id="password"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-newtifi-teal focus:ring-newtifi-teal border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    <a href="#" className="text-sm font-medium text-newtifi-teal hover:text-newtifi-navy">
                      Forgot password?
                    </a>
                  </div>

                  <Button 
                    variant="primary"
                    className="w-full flex items-center justify-center gap-2 bg-newtifi-navy text-white hover:bg-newtifi-navy/90"
                  >
                    Sign In
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <a href="#" className="font-medium text-newtifi-teal hover:text-newtifi-navy">
                      Sign up
                    </a>
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
