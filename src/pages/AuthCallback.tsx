import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { handleOAuthCallback } from '@/lib/oauth-handler';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const processCallback = async () => {
      try {
        const authStatus = searchParams.get('auth');
        const provider = searchParams.get('provider');
        const error = searchParams.get('error');

        if (authStatus === 'success') {
          setStatus('success');
          setMessage(`Successfully logged in with ${provider}!`);
          
          // Redirect to dashboard after a short delay
          setTimeout(() => {
            const redirectPath = sessionStorage.getItem('auth_redirect') || '/dashboard';
            sessionStorage.removeItem('auth_redirect');
            window.location.replace(redirectPath);
          }, 2000);
        } else if (authStatus === 'failed' || error) {
          setStatus('error');
          const errorMessage = error ? decodeURIComponent(error.replace(/_/g, ' ')) : `Failed to log in with ${provider}. Please try again.`;
          setMessage(errorMessage);
          
          // Redirect to login page after a short delay
          setTimeout(() => {
            window.location.replace('/login');
          }, 3000);
        } else {
          setStatus('error');
          setMessage('Invalid callback parameters');
          setTimeout(() => {
            window.location.replace('/login');
          }, 2000);
        }
      } catch (err) {
        setStatus('error');
        setMessage('An unexpected error occurred');
        setTimeout(() => {
          window.location.replace('/login');
        }, 2000);
      }
    };

    processCallback();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-md w-full mx-4 text-center">
        {status === 'loading' && (
          <>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
            <h2 className="text-2xl font-extralight uppercase tracking-[0.12em] text-gray-800 mb-2">Processing Authentication</h2>
            <p className="text-gray-600">Please wait while we complete your login...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-extralight uppercase tracking-[0.12em] text-green-800 mb-2">Login Successful!</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-extralight uppercase tracking-[0.12em] text-red-800 mb-2">Login Failed</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <p className="text-sm text-gray-500">Redirecting to login page...</p>
          </>
        )}
      </div>
    </div>
  );
}