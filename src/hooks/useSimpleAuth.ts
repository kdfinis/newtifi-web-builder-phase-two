import { useState, useEffect } from 'react';

export function useSimpleAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/auth/status', { credentials: 'include' })
      .then(r => r.json())
      .then(data => {
        if (data.loggedIn) setUser(data.user);
        setLoading(false);
      })
      .catch(err => {
        console.error('Auth check failed:', err);
        setLoading(false);
      });
  }, []);

  const logout = async () => {
    try {
      await fetch('/auth/logout', { method: 'POST', credentials: 'include' });
      setUser(null);
      window.location.href = '/';
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return { 
    user, 
    loading, 
    logout, 
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN',
    isContributor: user?.role === 'CONTRIBUTOR',
    isMember: user?.role === 'MEMBER'
  };
}
