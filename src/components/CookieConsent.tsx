import React, { useEffect, useState } from 'react';
import Button from './Button';

const CONSENT_KEY = 'newtifi_cookie_consent';

const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(CONSENT_KEY);
      if (!consent) setVisible(true);
    } catch {}
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({ consent: 'accepted', ts: Date.now() }));
    } catch {}
    setVisible(false);
  };

  const reject = () => {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({ consent: 'rejected', ts: Date.now() }));
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="surface-card fixed bottom-4 left-1/2 z-[10000] w-[92vw] max-w-xl -translate-x-1/2 p-4 ring-1 ring-inset ring-black/5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <p className="flex-1 text-sm text-gray-700 text-pretty">
          We use minimal cookies to improve your experience. See our{' '}
          <a href="/cookies" className="text-newtifi-navy underline decoration-newtifi-teal underline-offset-4">
            Cookie Policy
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <Button variant="secondary" size="sm" onClick={reject}>
            Decline
          </Button>
          <Button size="sm" onClick={accept}>
            Allow
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
