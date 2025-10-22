import React, { useState, useEffect } from 'react';
import { useSimpleAuth } from '../hooks/useSimpleAuth';

interface LinkedAccount {
  id: string;
  provider: string;
  providerId: string | null;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  isPrimary: boolean;
}

export default function LinkedAccounts() {
  const { user } = useSimpleAuth();
  const [linkedAccounts, setLinkedAccounts] = useState<LinkedAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    if (user?.id) {
      loadLinkedAccounts();
    }
  }, [user?.id]);

  const loadLinkedAccounts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/linked-accounts');
      if (!response.ok) {
        throw new Error('Failed to load linked accounts');
      }
      const accounts = await response.json();
      setLinkedAccounts(accounts);
    } catch (error) {
      console.error('Failed to load linked accounts:', error);
      setMessage({ type: 'error', text: 'Failed to load linked accounts' });
    } finally {
      setLoading(false);
    }
  };

  const handleUnlink = async (accountId: string, provider: string) => {
    if (!confirm(`Are you sure you want to unlink your ${provider} account?`)) {
      return;
    }

    try {
      const response = await fetch('/api/auth/unlink-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountId })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setMessage({ type: 'success', text: `${provider} account unlinked successfully` });
        loadLinkedAccounts();
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to unlink account' });
      }
    } catch (error) {
      console.error('Failed to unlink account:', error);
      setMessage({ type: 'error', text: 'Failed to unlink account' });
    }
  };

  const handleSetPrimary = async (accountId: string, provider: string) => {
    try {
      const response = await fetch('/api/auth/set-primary-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountId })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setMessage({ type: 'success', text: `${provider} account set as primary` });
        loadLinkedAccounts();
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to set primary account' });
      }
    } catch (error) {
      console.error('Failed to set primary account:', error);
      setMessage({ type: 'error', text: 'Failed to set primary account' });
    }
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'google':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 10.2v3.6h5.1c-.2 1.2-1.5 3.6-5.1 3.6-3.1 0-5.7-2.6-5.7-5.7S8.9 6 12 6c1.8 0 3 .8 3.7 1.5l2.5-2.5C16.8 3.8 14.7 3 12 3 6.9 3 2.7 7.2 2.7 12.3S6.9 21.6 12 21.6c6.9 0 9.3-4.8 9.3-7.2 0-.5 0-1-.1-1.2H12z"/>
          </svg>
        );
      case 'linkedin':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#0077B5" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.036-1.85-3.036-1.853 0-2.136 1.446-2.136 2.941v5.664H9.354V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.368-1.85 3.602 0 4.268 2.37 4.268 5.455v6.286zM5.337 7.433a2.062 2.062 0 11.001-4.124 2.062 2.062 0 01-.001 4.124zM7.114 20.452H3.56V9h3.554v11.452z"/>
          </svg>
        );
      case 'email':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        );
      default:
        return <div className="w-5 h-5 bg-gray-400 rounded-full"></div>;
    }
  };

  const getProviderName = (provider: string) => {
    switch (provider) {
      case 'google': return 'Google';
      case 'linkedin': return 'LinkedIn';
      case 'email': return 'Email & Password';
      default: return provider;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Linked Accounts</h3>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Linked Accounts</h3>
      
      {message && (
        <div className={`mb-4 p-3 rounded-md ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      {linkedAccounts.length === 0 ? (
        <p className="text-gray-500">No linked accounts found.</p>
      ) : (
        <div className="space-y-3">
          {linkedAccounts.map((account) => (
            <div key={account.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                {getProviderIcon(account.provider)}
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">
                      {getProviderName(account.provider)}
                    </span>
                    {account.isPrimary && (
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        Primary
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{account.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {!account.isPrimary && (
                  <button
                    onClick={() => handleSetPrimary(account.id, account.provider)}
                    className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                  >
                    Set Primary
                  </button>
                )}
                
                {account.provider !== 'email' && !account.isPrimary && (
                  <button
                    onClick={() => handleUnlink(account.id, account.provider)}
                    className="px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                  >
                    Unlink
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> You can link multiple accounts to the same email address. 
          Your primary account will be used for login preferences.
        </p>
      </div>
    </div>
  );
}
