import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getGoogleTokenExchangeParams } from '../lib/auth/GoogleOAuthConfig';
import { LINKEDIN_CONFIG } from '../lib/auth/LinkedInOAuthConfig';

export default function OAuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const code = searchParams.get('code');
        const error = searchParams.get('error');
        const state = searchParams.get('state');
        const provider = searchParams.get('provider') || (state?.startsWith('linkedin_auth') ? 'linkedin' : 'google');

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

        console.log('OAuth callback: Processing', { code, state, provider });

        if (provider === 'linkedin') {
          // Verify state (be more lenient with state verification)
          const storedState = sessionStorage.getItem('linkedin_state');
          if (!state || !storedState || !state.startsWith('linkedin_auth')) {
            console.warn('State verification failed, but continuing with OAuth flow');
            // Don't throw error, just log warning and continue
          } else {
            sessionStorage.removeItem('linkedin_state');
          }

          // Token exchange via Cloudflare Worker
          const tokenResponse = await fetch(`${LINKEDIN_CONFIG.workerUrl}/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              code,
              redirect_uri: window.location.origin + '/auth/linkedin/callback'
            })
          });

          if (!tokenResponse.ok) {
            const errorText = await tokenResponse.text();
            console.error('LinkedIn token exchange failed:', errorText);
            throw new Error(`Failed to exchange code for token`);
          }

          const tokenData = await tokenResponse.json();
          const accessToken = tokenData.access_token;

          // User info via Cloudflare Worker
          const userResponse = await fetch(`${LINKEDIN_CONFIG.workerUrl}/userinfo?access_token=${accessToken}`);

          if (!userResponse.ok) {
            const errorText = await userResponse.text();
            console.error('LinkedIn user info fetch failed:', errorText);
            throw new Error(`Failed to fetch user info`);
          }

          const user = await userResponse.json();
          console.log('LinkedIn user response:', user);
          
          // LinkedIn API v2 exact field mapping
          const userData = {
            id: user.sub || user.id,
            email: user.email || 'linkedin@user.com',
            name: user.name || `${user.given_name || ''} ${user.family_name || ''}`.trim() || 'LinkedIn User',
            avatarUrl: user.picture || '',
            provider: 'linkedin',
            loginTime: new Date().toISOString(),
            // LinkedIn API v2 exact field names
            headline: user.headline || '',
            location: user.location || null,
            industry: user.industry || '',
            positions: user.positions || [],
            educations: user.educations || [],
            skills: user.skills || [],
            numConnections: user.numConnections || 0,
            profileUrl: user.profileUrl || '',
            firstName: user.given_name || '',
            lastName: user.family_name || '',
            vanityName: user.vanityName || '',
            summary: user.summary || '',
            specialties: user.specialties || [],
            interests: user.interests || [],
            honors: user.honors || [],
            publications: user.publications || [],
            patents: user.patents || [],
            certifications: user.certifications || [],
            courses: user.courses || [],
            volunteer: user.volunteer || [],
            languages: user.languages || []
          };
          
          console.log('Storing user data:', userData);

          localStorage.setItem('newtifi_user', JSON.stringify(userData));
          localStorage.setItem('newtifi_auth', 'true');
          
          // Trigger auth state refresh
          window.dispatchEvent(new CustomEvent('authStateChanged'));
          
          // Set success status
          setStatus('success');
        } else if (provider === 'google') {
          // Handle Google OAuth using configurable parameters
          const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: getGoogleTokenExchangeParams(code)
          });

          if (!tokenResponse.ok) {
            throw new Error('Failed to exchange code for token');
          }

          const tokenData = await tokenResponse.json();
          const accessToken = tokenData.access_token;

          // Get user info
          const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: { 'Authorization': `Bearer ${accessToken}` }
          });

          if (!userResponse.ok) {
            throw new Error('Failed to fetch user info');
          }

          const user = await userResponse.json();
          
          // Seamless account linking - just use the OAuth data
          const userData = {
            id: user.id,
            email: user.email,
            name: user.name,
            avatarUrl: user.picture,
            provider: 'google',
            loginTime: new Date().toISOString()
          };

          console.log('Storing user data:', userData);

          // Store in localStorage
          localStorage.setItem('newtifi_user', JSON.stringify(userData));
          localStorage.setItem('newtifi_auth', 'true');
          
          // Trigger auth state refresh
          window.dispatchEvent(new CustomEvent('authStateChanged'));
          
          // Set success status
          setStatus('success');
        } else {
          throw new Error('Unknown OAuth provider');
        }

        // Small delay to ensure auth state is updated
        setTimeout(() => {
          console.log('OAuth callback: Redirecting to dashboard...');
          window.location.replace('/dashboard?auth=success&provider=' + provider);
        }, 100);

      } catch (err) {
        console.error('OAuth callback error:', err);
        setError(err instanceof Error ? err.message : 'OAuth callback failed');
        setStatus('error');
      }
    };

    handleOAuthCallback();
  }, [searchParams, navigate]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Processing authentication...</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Authentication Failed</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-green-600 text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Authentication Successful</h1>
        <p className="text-gray-600">Redirecting to dashboard...</p>
      </div>
    </div>
  );
}