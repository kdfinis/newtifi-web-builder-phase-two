import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, Linkedin } from "lucide-react";

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

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setTimeout(() => {
      setIsLoading(false);
      if (formData.email && formData.password) {
        navigate("/");
      } else {
        setError("Please enter both email and password.");
      }
    }, 1000);
  };

  const handleSocialLogin = (provider) => {
    // Simulate user info
    const user = {
      name: provider === 'google' ? 'Google User' : 'LinkedIn User',
      email: provider === 'google' ? 'user@gmail.com' : 'user@linkedin.com',
      isLoggedIn: true,
      provider
    };
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/');
  };
  const isLoggedIn = !!localStorage.getItem('user');

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f8fafc]" style={{ minHeight: '100vh' }}>
      <div className="w-full max-w-lg flex flex-col gap-8 mt-16">
        <div className="mb-6 mt-2">
          <h1 className="text-3xl md:text-4xl font-bold text-newtifi-navy leading-tight">
            Welcome to<br />NewTIFI
          </h1>
        </div>
        {/* Social Login Card */}
        <div className="bg-white rounded-xl shadow-lg border border-newtifi-navy/20 p-8 flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-newtifi-teal rounded-lg py-3 px-4 text-newtifi-navy hover:bg-newtifi-teal hover:text-white transition-colors font-medium shadow-sm focus:ring-2 focus:ring-newtifi-navy"
              style={{ background: '#fff' }}
              onClick={() => handleSocialLogin('google')}
            >
              <GoogleIcon />
              Continue with Google
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-newtifi-navy rounded-lg py-3 px-4 text-newtifi-navy hover:bg-newtifi-navy hover:text-white transition-colors font-medium shadow-sm focus:ring-2 focus:ring-newtifi-navy"
              style={{ background: '#fff' }}
              onClick={() => handleSocialLogin('linkedin')}
            >
              <LinkedInLogo />
              Continue with LinkedIn
            </button>
          </div>
          {isLoggedIn && (
            <div className="text-green-700 text-center mt-4 font-semibold">Your Account (Logged in)</div>
          )}
        </div>
        {/* Email/Password Card */}
        <div className="bg-white rounded-xl shadow-lg border border-newtifi-navy/20 p-8 flex flex-col gap-6">
          <div className="flex items-center mb-2">
            <div className="flex-1 h-px bg-newtifi-navy/20" />
            <span className="mx-3 text-newtifi-navy text-xs font-medium">or sign in with email</span>
            <div className="flex-1 h-px bg-newtifi-navy/20" />
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-newtifi-navy mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-newtifi-teal" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="pl-10 pr-4 py-2 w-full rounded-lg border border-newtifi-teal/30 focus:border-newtifi-navy focus:ring-2 focus:ring-newtifi-navy/30 text-newtifi-navy bg-white font-light transition"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-newtifi-navy mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-newtifi-teal" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="pl-10 pr-10 py-2 w-full rounded-lg border border-newtifi-teal/30 focus:border-newtifi-navy focus:ring-2 focus:ring-newtifi-navy/30 text-newtifi-navy bg-white font-light transition"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-newtifi-teal hover:text-newtifi-navy"
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            {error && <div className="text-red-600 text-xs text-center font-medium mt-1">{error}</div>}
            <div className="flex flex-col md:flex-row gap-3 mt-2">
              <button
                type="submit"
                className="flex-1 bg-newtifi-navy text-white font-semibold rounded-lg py-3 hover:bg-newtifi-teal transition-colors shadow-md disabled:opacity-60 focus:ring-2 focus:ring-newtifi-navy"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
              <a
                href="/signup"
                className="flex-1 border border-newtifi-teal text-newtifi-teal font-semibold rounded-lg py-3 text-center hover:bg-newtifi-teal hover:text-white transition-colors shadow-md focus:ring-2 focus:ring-newtifi-navy"
              >
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
