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
      <div className="grid md:grid-cols-2 w-full h-screen overflow-hidden">
        {/* Left panel - Membership-era navy/teal gradient */}
        <div className="hidden md:block relative h-full w-full bg-gradient-to-br from-newtifi-navy via-newtifi-navy/95 to-newtifi-teal/20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
        </div>

        {/* Right form panel */}
        <div className="relative h-full w-full bg-gradient-to-br from-gray-50 to-white">
          <div className="absolute top-6 right-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs uppercase tracking-[0.2em] text-newtifi-navy hover:text-newtifi-teal rounded-full border border-gray-200 hover:border-gray-300 bg-white transition font-light"
            >
              Close
            </button>
          </div>

          <div className="h-full w-full flex items-center justify-center p-6">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="text-center mb-8">
                <img src="/assets/images/logo.png" alt="NewTIFI" className="mx-auto h-12 mb-4" />
                <p className="text-xs uppercase tracking-[0.35em] text-gray-500 mb-2">
                  {authMode === 'login' ? 'Sign in' : 'Create account'}
                </p>
                <h2 className="text-2xl md:text-3xl font-extralight tracking-[0.12em] uppercase text-newtifi-navy">
                  {authMode === 'login' ? 'Sign in to NewTIFI' : 'Create your NewTIFI account'}
                </h2>
                <p className="text-base text-gray-600 mt-2 font-light">
                  Secure access to Luxembourg-focused research and insights
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 mb-6">
                <button
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full px-5 py-3 border border-gray-200 rounded-full hover:bg-gray-50 text-newtifi-navy transition disabled:opacity-50 text-xs uppercase tracking-[0.2em] font-light"
                >
                  {isLoading ? 'Connecting to Google…' : 'Continue with Google'}
                </button>
                <button
                  onClick={handleLinkedInSignIn}
                  disabled={isLoading}
                  className="w-full px-5 py-3 rounded-full bg-newtifi-teal text-white hover:bg-newtifi-teal/90 transition disabled:opacity-50 text-xs uppercase tracking-[0.2em] font-light"
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
                <label className="block text-base font-light text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-newtifi-teal/20 focus:border-newtifi-teal transition-colors bg-white"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label className="block text-base font-light text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-newtifi-teal/20 focus:border-newtifi-teal transition-colors bg-white"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-base font-light text-gray-700 mb-1">Email</label>
            <div className="relative">
              {/* Removed icon */}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-newtifi-teal/20 focus:border-newtifi-teal transition-colors bg-white"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-base font-light text-gray-700 mb-1">Password</label>
            <div className="relative">
              {/* Removed icon */}
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-newtifi-teal/20 focus:border-newtifi-teal transition-colors bg-white"
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
              <label className="block text-base font-light text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                {/* Removed icon */}
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-newtifi-teal/20 focus:border-newtifi-teal transition-colors bg-white"
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
            className="w-full bg-newtifi-teal text-white py-3 rounded-full font-light text-xs uppercase tracking-[0.2em] hover:bg-newtifi-teal/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
                {isLoading ? 'Please wait…' : (authMode === 'login' ? 'Sign In' : 'Create Account')}
          </button>
                </form>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 text-center">
                  <p className="text-gray-600">
                    {authMode === 'login' ? "Do not have an account? " : "Already have an account? "}
                    <button
                      onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                      className="text-newtifi-teal hover:text-newtifi-navy font-light transition-colors"
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
