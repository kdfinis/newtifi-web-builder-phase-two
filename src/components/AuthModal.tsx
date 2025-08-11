import React, { useState } from 'react';
import { loginEmail, registerEmail, loginWithGoogle, loginWithLinkedIn } from '@/lib/auth';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
  mode?: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  mode = 'login'
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>(mode);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleGoogleSignIn = () => loginWithGoogle();

  const handleLinkedInSignIn = () => loginWithLinkedIn();

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (authMode === 'signup' && formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      if (authMode === 'login') {
        const { email, password } = formData;
        await loginEmail(email, password);
      } else {
        const { email, password, firstName, lastName } = formData;
        await registerEmail(email, password, `${firstName} ${lastName}`.trim());
      }
      onSuccess({ id: 'me', email: formData.email });
      onClose();
    } catch (error) {
      setError(authMode === 'login' ? 'Invalid credentials' : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70">
      {/* Fullscreen split layout, spacious and professional */}
      <div className="grid md:grid-cols-2 w-full h-screen overflow-hidden">
        {/* Left visual panel with Luxembourg photography */}
        <div className="hidden md:block relative h-full w-full">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/images/Lux-Philharmonie.jpeg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/55 to-black/10" />
        </div>

        {/* Right form panel - glass card */}
        <div className="relative h-full w-full bg-white/70 backdrop-blur-sm">
          <div className="absolute top-6 right-6">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-base text-gray-700 hover:text-newtifi-navy rounded-full bg-white/70 border border-gray-200 hover:bg-white transition"
            >
              Close
            </button>
          </div>

          <div className="h-full w-full flex items-center justify-center p-6">
            <div className="w-full max-w-lg bg-white/90 border border-gray-200 rounded-2xl p-8 shadow-xl">
              <div className="text-center mb-8">
                <img src="/assets/images/logo.png" alt="NewTIFI" className="mx-auto h-12 mb-4" />
                <h2 className="text-3xl font-bold text-newtifi-navy tracking-tight">
                  {authMode === 'login' ? 'Sign in to NewTIFI' : 'Create your NewTIFI account'}
                </h2>
                <p className="text-base text-gray-600 mt-2">
                  Secure access to Luxembourg-focused research and insights
                </p>
              </div>

              {/* Option cards */}
              <div className="grid grid-cols-1 gap-3 mb-6">
                <button
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full px-5 py-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition disabled:opacity-50"
                >
                  {isLoading ? 'Connecting to Google…' : 'Continue with Google'}
                </button>
                <button
                  onClick={handleLinkedInSignIn}
                  disabled={isLoading}
                  className="w-full px-5 py-4 rounded-xl bg-newtifi-navy text-white hover:bg-newtifi-navy/90 transition disabled:opacity-50"
                >
                  {isLoading ? 'Connecting to LinkedIn…' : 'Continue with LinkedIn'}
                </button>
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"/></div>
                <div className="relative flex justify-center"><span className="px-2 bg-white text-gray-500 text-base">or</span></div>
              </div>

              {/* Email Form */}
              <form onSubmit={handleEmailAuth} className="space-y-5">
          {authMode === 'signup' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label className="block text-base font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              {/* Removed icon */}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              {/* Removed icon */}
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {authMode === 'signup' && (
            <div>
              <label className="block text-base font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                {/* Removed icon */}
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="text-red-600 text-base bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-newtifi-navy text-white py-3 rounded-xl font-medium hover:bg-newtifi-navy/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
                {isLoading ? 'Please wait…' : (authMode === 'login' ? 'Sign In' : 'Create Account')}
          </button>
                </form>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 text-center">
                  <p className="text-gray-600">
                    {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
                    <button
                      onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                      className="text-newtifi-teal hover:text-newtifi-navy font-medium transition-colors"
                    >
                      {authMode === 'login' ? 'Sign up' : 'Sign in'}
                    </button>
                  </p>
                </div>
              </div>{/* end max-w-md */}
            </div>{/* end flex center wrapper */}
          </div>{/* end right panel */}
        </div>{/* end grid */}
      </div>
    );
  };

export default AuthModal;
