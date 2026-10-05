import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, CheckCircle } from "lucide-react";
import PageHero from '@/components/PageHero';

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
      <div className="flex min-h-[60vh] items-center justify-center bg-gray-50 p-6">
        <div className="surface-card w-full max-w-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl text-newtifi-navy mb-2">Check your email</h2>
          <p className="text-gray-600 mb-4">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Please check your email and click the link to reset your password. The link will expire in 1 hour.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-newtifi-teal text-sm font-bold text-white shadow-card transition-[background-color,transform] duration-150 ease-out-strong active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none fine:hover:bg-[#00aeb6]"
          >
            Back to sign in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <PageHero compact title="Reset your password" lede="Enter your email address and we'll send you a link to reset your password." />

      <section className="flex w-full justify-center bg-gray-50 px-6 py-16">
        <div className="surface-card w-full max-w-md p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-newtifi-navy rounded-2xl flex items-center justify-center mx-auto mb-4">
              <img src="/assets/images/logo.png" alt="NewTIFI Logo" className="w-12 h-12 object-contain" />
            </div>
            <h1 className="text-2xl text-newtifi-navy mb-2">Forgot password?</h1>
            <p className="text-gray-600">No worries, we'll send you reset instructions.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm text-gray-700">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 transition-[border-color,box-shadow] duration-150 ease-out-strong focus:border-newtifi-navy focus:outline-none focus:ring-2 focus:ring-newtifi-navy/20"
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
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-newtifi-teal text-sm font-bold text-white shadow-card transition-[background-color,transform] duration-150 ease-out-strong active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none fine:hover:bg-[#00aeb6]"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Sending...
                </>
              ) : (
                "Send reset link"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-base text-gray-500">
              Remember your password?{" "}
              <button
                onClick={() => navigate('/login')}
                className="text-newtifi-navy underline decoration-newtifi-teal underline-offset-4 transition-colors duration-150 ease-out-strong fine:hover:decoration-newtifi-navy"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}




