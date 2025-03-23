
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Linkedin } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import Button from '@/components/Button';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo, just show a success toast
    toast.success('Login successful!');
    navigate('/');
  };
  
  const handleSocialLogin = (provider: string) => {
    // Mock social login
    toast.success(`Login with ${provider} successful!`);
    navigate('/');
  };
  
  return (
    <main className="min-h-screen pt-28 pb-20 flex items-center justify-center bg-gray-50">
      <ScrollReveal className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-newtifi-navy mb-2">Welcome Back</h1>
            <p className="text-gray-600">
              Sign in to access your Newtifi membership
            </p>
          </div>
          
          {/* Social Login Options */}
          <div className="space-y-4 mb-6">
            <button
              onClick={() => handleSocialLogin('Google')}
              className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-md py-3 px-4 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 12h8"></path>
                <path d="M12 8v8"></path>
              </svg>
              <span>Continue with Google</span>
            </button>
            
            <button
              onClick={() => handleSocialLogin('LinkedIn')}
              className="w-full flex items-center justify-center gap-2 bg-[#0A66C2] text-white rounded-md py-3 px-4 hover:bg-opacity-90 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span>Continue with LinkedIn</span>
            </button>
          </div>
          
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>
          
          {/* Email Login Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-newtifi-teal"
                placeholder="you@example.com"
                required
              />
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="#" className="text-sm text-newtifi-teal hover:text-opacity-80">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-newtifi-teal"
                placeholder="••••••••"
                required
              />
            </div>
            
            <Button type="submit" fullWidth>
              Sign In
            </Button>
          </form>
          
          {/* Register Link */}
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <a href="/membership" className="text-newtifi-teal font-medium hover:text-opacity-80">
                Join as a member
              </a>
            </p>
          </div>
        </div>
      </ScrollReveal>
    </main>
  );
};

export default Login;
