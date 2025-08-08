import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, CheckCircle, ArrowLeft, Linkedin } from "lucide-react";

// Inline Google SVG icon as fallback
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <g>
      <path d="M21.805 10.023h-9.765v3.954h5.617c-.242 1.25-1.484 3.672-5.617 3.672-3.375 0-6.125-2.797-6.125-6.25s2.75-6.25 6.125-6.25c1.922 0 3.219.766 3.969 1.422l2.719-2.641c-1.719-1.547-3.953-2.5-6.688-2.5-5.531 0-10 4.469-10 10s4.469 10 10 10c5.75 0 9.563-4.031 9.563-9.719 0-.656-.07-1.156-.156-1.609z" fill="#FBBB00"/>
      <path d="M3.152 7.548l3.25 2.391c.891-1.781 2.531-2.891 4.598-2.891 1.406 0 2.672.484 3.672 1.422l2.75-2.672c-1.719-1.547-3.953-2.5-6.688-2.5-3.906 0-7.188 2.672-8.406 6.25z" fill="#518EF8"/>
      <path d="M12 22c2.719 0 5.031-.891 6.719-2.422l-3.094-2.531c-.844.594-1.922.953-3.625.953-2.797 0-5.156-1.891-6.016-4.453l-3.25 2.516c1.5 3.047 4.719 5.437 9.266 5.437z" fill="#28B446"/>
      <path d="M21.805 10.023h-9.765v3.954h5.617c-.242 1.25-1.484 3.672-5.617 3.672-3.375 0-6.125-2.797-6.125-6.25s2.75-6.25 6.125-6.25c1.922 0 3.219.766 3.969 1.422l2.719-2.641c-1.719-1.547-3.953-2.5-6.688-2.5-5.531 0-10 4.469-10 10s4.469 10 10 10c5.75 0 9.563-4.031 9.563-9.719 0-.656-.07-1.156-.156-1.609z" fill="#F14336"/>
    </g>
  </svg>
);

// Replace GoogleIcon with official SVG (already present)
// Add LinkedIn official SVG
const LinkedInLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#0077B5"/>
    <path d="M7.1 9.5H4.9V19H7.1V9.5ZM6 8.4C6.7 8.4 7.2 7.9 7.2 7.2C7.2 6.5 6.7 6 6 6C5.3 6 4.8 6.5 4.8 7.2C4.8 7.9 5.3 8.4 6 8.4ZM19 19H16.8V14.2C16.8 13.1 16.8 11.7 15.2 11.7C13.6 11.7 13.4 12.9 13.4 14.1V19H11.2V9.5H13.3V10.7H13.3C13.6 10.1 14.4 9.4 15.6 9.4C18.1 9.4 19 10.9 19 13.1V19Z" fill="white"/>
  </svg>
);

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Dummy signup - accept any valid form data
    if (formData.name.trim() && formData.email.trim() && formData.password.trim()) {
      setIsSignedUp(true);
      // Store dummy user session
      localStorage.setItem('user', JSON.stringify({
        name: formData.name,
        email: formData.email,
        isLoggedIn: true
      }));
      
      // Redirect after a brief success message
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } else {
      setError("Please fill in all fields");
    }
    
    setIsLoading(false);
  };

  const handleSocialSignup = (provider) => {
    // Simulate user info
    const user = {
      name: provider === 'google' ? 'Google User' : 'LinkedIn User',
      email: provider === 'google' ? 'user@gmail.com' : 'user@linkedin.com',
      isLoggedIn: true,
      provider
    };
    localStorage.setItem('user', JSON.stringify(user));
    setIsSignedUp(true);
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };
  const isLoggedIn = !!localStorage.getItem('user');

  if (isSignedUp) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-newtifi-teal/10 via-white to-newtifi-navy/5 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-newtifi-navy mb-2">Account Created!</h2>
          <p className="text-gray-600 mb-4">Welcome to NewTiFi, {formData.name}!</p>
          <div className="animate-pulse">
            <div className="h-2 bg-newtifi-teal/20 rounded-full mb-2"></div>
            <div className="h-2 bg-newtifi-teal/20 rounded-full w-3/4 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-newtifi-teal/10 via-white to-newtifi-navy/5 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/login')}
            className="absolute top-8 left-8 text-gray-500 hover:text-newtifi-navy transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div className="w-20 h-20 bg-newtifi-navy rounded-2xl flex items-center justify-center mx-auto mb-4">
            <img src="/assets/images/logo.png" alt="NewTiFi Logo" className="w-12 h-12 object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-newtifi-navy mb-2">Create Account</h1>
          <p className="text-gray-600">Join NewTiFi to access research and connect with professionals</p>
        </div>

        {/* Social Signup Buttons */}
        <div className="flex flex-col gap-4 mb-6">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 border border-newtifi-teal rounded-lg py-3 px-4 text-newtifi-navy hover:bg-newtifi-teal hover:text-white transition-colors font-medium shadow-sm focus:ring-2 focus:ring-newtifi-navy"
            style={{ background: '#fff' }}
            onClick={() => handleSocialSignup('google')}
          >
            <GoogleIcon />
            Sign up with Google
          </button>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 border border-newtifi-navy rounded-lg py-3 px-4 text-newtifi-navy hover:bg-newtifi-navy hover:text-white transition-colors font-medium shadow-sm focus:ring-2 focus:ring-newtifi-navy"
            style={{ background: '#fff' }}
            onClick={() => handleSocialSignup('linkedin')}
          >
            <LinkedInLogo />
            Sign up with LinkedIn
          </button>
          
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-base font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-newtifi-teal focus:border-transparent transition-colors"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-newtifi-teal focus:border-transparent transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-newtifi-teal focus:border-transparent transition-colors"
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-base font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-newtifi-teal focus:border-transparent transition-colors"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-base">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-newtifi-navy text-white py-3 rounded-lg font-semibold hover:bg-newtifi-teal hover:text-newtifi-navy transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Terms and Privacy */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            By creating an account, you agree to our{" "}
            <button
              onClick={() => navigate('/terms')}
              className="text-newtifi-teal hover:text-newtifi-navy"
            >
              Terms of Service
            </button>{" "}
            and{" "}
            <button
              onClick={() => navigate('/privacy')}
              className="text-newtifi-teal hover:text-newtifi-navy"
            >
              Privacy Policy
            </button>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-base text-gray-500">
            Already have an account?{" "}
            <button
              onClick={() => navigate('/login')}
              className="text-newtifi-teal hover:text-newtifi-navy font-medium"
            >
              Sign in
            </button>
          </p>
          <p className="text-xs text-gray-400 mt-2">
            This is a demo signup system. All data is stored locally for testing.
          </p>
        </div>
      </div>
    </div>
  );
} 