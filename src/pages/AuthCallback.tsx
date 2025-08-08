import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing authentication...');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const code = searchParams.get('code');
        const error = searchParams.get('error');
        const state = searchParams.get('state');
        
        console.log('Auth callback received:', { code, error, state });

        if (error) {
          setStatus('error');
          setMessage(`Authentication failed: ${error}`);
          setTimeout(() => navigate('/login'), 3000);
          return;
        }

        if (!code) {
          setStatus('error');
          setMessage('No authorization code received');
          setTimeout(() => navigate('/login'), 3000);
          return;
        }

        // Get the auth intent from localStorage
        const authIntent = localStorage.getItem('auth_intent');
        console.log('Auth intent:', authIntent);

        // Simulate processing the OAuth code
        // In a real implementation, you would send this code to your backend
        setTimeout(() => {
          // Create a mock user object based on the auth provider
          const mockUser = {
            id: `${authIntent}-user-${Date.now()}`,
            email: `user@${authIntent}.com`,
            name: `${authIntent.charAt(0).toUpperCase() + authIntent.slice(1)} User`,
            provider: authIntent,
            avatar: `https://via.placeholder.com/40/${authIntent === 'linkedin' ? '0077B5' : '4285F4'}/FFFFFF?text=${authIntent.charAt(0).toUpperCase()}`
          };

          // Store the user in localStorage
          localStorage.setItem('user', JSON.stringify(mockUser));
          localStorage.removeItem('auth_intent');
          localStorage.removeItem('auth_timestamp');

          setStatus('success');
          setMessage('Authentication successful! Redirecting...');
          
          setTimeout(() => {
            navigate('/');
          }, 1500);
        }, 2000);

      } catch (error) {
        console.error('Auth callback error:', error);
        setStatus('error');
        setMessage('Authentication processing failed');
        setTimeout(() => navigate('/login'), 3000);
      }
    };

    handleAuthCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="text-center">
          {status === 'loading' && (
            <>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Loader className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Processing...</h2>
              <p className="text-gray-600">{message}</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Success!</h2>
              <p className="text-gray-600">{message}</p>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
              <p className="text-gray-600">{message}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


