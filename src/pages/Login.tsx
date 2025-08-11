import React, { useState } from "react";
import { loginEmail, registerEmail, loginWithGoogle, loginWithLinkedIn } from '@/lib/auth';

export default function Login() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      if (mode === 'login') {
        await loginEmail(email, password);
      } else {
        await registerEmail(email, password, `${firstName} ${lastName}`.trim());
      }
      localStorage.setItem('user', JSON.stringify({ email }));
      window.location.href = '/';
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Authentication failed';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white pt-[90px]">
      <section className="min-h-[calc(100vh-90px)] w-full flex items-center justify-center bg-gradient-to-br from-newtifi-navy to-newtifi-teal p-6">
        <div className="w-full grid md:grid-cols-2 gap-0 bg-white/95 rounded-3xl shadow-2xl overflow-hidden">
          {/* Left: Brand block */}
          <div className="flex flex-col justify-between bg-newtifi-navy text-white p-12">
            <div>
              <img src="/assets/images/logo.png" alt="NewTIFI" className="h-10 mb-6" />
              <h1 className="text-3xl font-bold leading-tight">NewTIFI Account</h1>
              <p className="text-base text-white/80 mt-2">Access research, publishing tools, and member services.</p>
            </div>
            <div
              className="mt-10 rounded-2xl w-full h-80 md:h-[28rem] bg-center bg-cover"
              style={{ backgroundImage: "url('/images/uploads/luxembourg-skyline-golden-hour.jpg')" }}
            />
          </div>

          {/* Right: Auth card */}
          <div className="p-10 md:p-12">
            <p className="text-base text-gray-600 mb-4">Choose a sign-in option. You can use Google or LinkedIn for a quick, secure login, or sign in with your email and password below.</p>

            {/* SSO */}
            <div className="grid grid-cols-1 gap-4 mb-8">
              <button onClick={loginWithGoogle} className="w-full px-6 py-4 border border-gray-200 rounded-2xl hover:bg-gray-50 text-newtifi-navy text-left text-base flex items-center gap-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true"><path fill="#EA4335" d="M12 10.2v3.6h5.1c-.2 1.2-1.5 3.6-5.1 3.6-3.1 0-5.7-2.6-5.7-5.7S8.9 6 12 6c1.8 0 3 .8 3.7 1.5l2.5-2.5C16.8 3.8 14.7 3 12 3 6.9 3 2.7 7.2 2.7 12.3S6.9 21.6 12 21.6c6.9 0 9.3-4.8 9.3-7.2 0-.5 0-1-.1-1.2H12z"/><path fill="#34A853" d="M3.9 7.4l3 2.2C7.7 8 9.7 6.6 12 6.6c1.8 0 3 .8 3.7 1.5l2.5-2.5C16.8 3.8 14.7 3 12 3 8.6 3 5.6 4.9 3.9 7.4z"/><path fill="#FBBC05" d="M12 21.6c3.2 0 5.9-1.1 7.9-3.1l-3.3-2.7c-1 .7-2.3 1.2-4.6 1.2-3.6 0-6.7-2.4-7.7-5.7l-3.3 2.6C3.8 18.7 7.6 21.6 12 21.6z"/><path fill="#4285F4" d="M21.3 14.4c.1-.5.1-1 .1-1.6 0-.6 0-1.1-.1-1.6H12v3.2h9.3z"/></svg>
                <span>Continue with Google</span>
              </button>
              <button onClick={loginWithLinkedIn} className="w-full px-6 py-4 rounded-2xl bg-newtifi-navy text-white hover:bg-newtifi-navy/90 text-left text-base flex items-center gap-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true"><path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.036-1.85-3.036-1.853 0-2.136 1.446-2.136 2.941v5.664H9.354V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.368-1.85 3.602 0 4.268 2.37 4.268 5.455v6.286zM5.337 7.433a2.062 2.062 0 11.001-4.124 2.062 2.062 0 01-.001 4.124zM7.114 20.452H3.56V9h3.554v11.452z"/></svg>
                <span>Continue with LinkedIn</span>
              </button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"/></div>
              <div className="relative flex justify-center"><span className="px-2 bg-white text-gray-500 text-base">or</span></div>
            </div>

            <form onSubmit={submit} className="space-y-5">
              {mode==='signup' && (
                <div className="grid grid-cols-2 gap-3">
                  <input value={firstName} onChange={e=>setFirstName(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-newtifi-teal focus:border-transparent" placeholder="First name" required />
                  <input value={lastName} onChange={e=>setLastName(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-newtifi-teal focus:border-transparent" placeholder="Last name" required />
                </div>
              )}
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-newtifi-teal focus:border-transparent" placeholder="Email" required />
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-newtifi-teal focus:border-transparent" placeholder="Password" required />
              {error && <div className="text-red-600 text-base bg-red-50 p-3 rounded-lg">{error}</div>}
              <button type="submit" disabled={isLoading} className="w-full bg-newtifi-navy text-white px-8 py-4 rounded-2xl font-semibold hover:bg-newtifi-navy/90 transition disabled:opacity-50">
                {isLoading ? 'Please wait…' : (mode==='login' ? 'Sign In' : 'Create Account')}
              </button>
              {mode==='login' && (
                <div className="text-right">
                  <a href="#" className="text-base text-gray-500 hover:text-newtifi-navy">Forgot password?</a>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
