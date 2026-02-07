import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import ScrollReveal from '@/components/ScrollReveal';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch('/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to send reset email');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-extralight uppercase tracking-[0.12em] text-newtifi-navy mb-2">Check Your Email</h2>
          <p className="text-gray-600 mb-4 font-light">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <p className="text-sm text-gray-500 mb-6 font-light">
            Please check your email and click the link to reset your password. The link will expire in 1 hour.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-newtifi-teal text-white py-3 rounded-full font-light text-xs uppercase tracking-[0.2em] hover:bg-newtifi-teal/90 transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-[90px]">
      {/* Hero Section */}
      <section className="relative px-6 py-32 bg-gradient-to-br from-newtifi-navy via-newtifi-navy/95 to-newtifi-teal/20 text-white overflow-hidden">
        {/* Background Graphics */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-white/10 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-newtifi-teal/10 rounded-full"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 border border-white/10 transform rotate-45"></div>

        <div className="container mx-auto relative">
          <div className="w-full">
            <ScrollReveal>
              <p className="text-xs uppercase tracking-[0.35em] text-white/70 mb-6">Forgot Password</p>
              <div className="mb-8">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extralight tracking-[0.12em] leading-tight uppercase">
                  Reset Your <span className="text-newtifi-teal font-light">Password</span>
                </h1>
              </div>
              <p className="text-base md:text-lg leading-relaxed text-white/85 font-light max-w-2xl">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="min-h-[calc(100vh-90px)] w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-white p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
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
            <h1 className="text-2xl font-extralight uppercase tracking-[0.12em] text-newtifi-navy mb-2">Forgot Password?</h1>
            <p className="text-gray-600">No worries, we'll send you reset instructions.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-newtifi-teal/20 focus:border-newtifi-teal transition-colors"
                  placeholder="Enter your email"
                  required
                />
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
              className="w-full bg-newtifi-teal text-white py-3 rounded-full font-light text-xs uppercase tracking-[0.2em] hover:bg-newtifi-teal/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-base text-gray-500">
              Remember your password?{" "}
              <button
                onClick={() => navigate('/login')}
                className="text-newtifi-teal hover:text-newtifi-navy font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}




