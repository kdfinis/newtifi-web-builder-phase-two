import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GoogleOAuthCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const error = urlParams.get('error');

        if (error) {
          setError(`OAuth error: ${error}`);
          setStatus('error');
          return;
        }

        if (!code) {
          setError('No authorization code received');
          setStatus('error');
          return;
        }

        // Exchange code for access token
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: '194507073097-ocntv6b6bou3v4m334tr637pjq2d8702.apps.googleusercontent.com',
            client_secret: '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',
            code,
            grant_type: 'authorization_code',
            redirect_uri: window.location.origin + '/auth/google/callback'
          })
        });

        if (!tokenResponse.ok) {
          throw new Error('Failed to exchange code for token');
        }

        const tokens = await tokenResponse.json();

        // Get user info from Google
        const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`
          }
        });

        if (!userResponse.ok) {
          throw new Error('Failed to get user info');
        }

        const userInfo = await userResponse.json();

        // Store user data in localStorage
        const userData = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          avatarUrl: userInfo.picture,
          provider: 'google',
          accessToken: tokens.access_token,
          loginTime: new Date().toISOString()
        };

        localStorage.setItem('newtifi_user', JSON.stringify(userData));
        localStorage.setItem('newtifi_auth', 'true');

        setStatus('success');
        
        // Redirect to dashboard
        setTimeout(() => {
          navigate('/dashboard?auth=success&provider=google');
        }, 1000);

      } catch (err) {
        console.error('Google OAuth callback error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        setStatus('error');
      }
    };

    handleGoogleCallback();
  }, [navigate]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-newtifi-teal mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-newtifi-navy mb-2">Authenticating with Google</h2>
          <p className="text-gray-600">Please wait while we complete your login...</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4">
            <h2 className="font-bold text-lg mb-2">Authentication Failed</h2>
            <p className="text-sm">{error}</p>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="bg-newtifi-teal text-white px-6 py-3 rounded-xl hover:bg-newtifi-teal/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
      <div className="text-center">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl mb-4">
          <h2 className="font-bold text-lg mb-2">Authentication Successful!</h2>
          <p className="text-sm">Redirecting to dashboard...</p>
        </div>
      </div>
    </div>
  );
}
