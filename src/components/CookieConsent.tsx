import React, { useEffect, useState } from 'react';

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
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[10000] max-w-xl w-[92vw] bg-white/95 backdrop-blur shadow-xl border border-gray-200 rounded-xl p-4">
      <div className="flex items-start gap-3">
        <div className="flex-1 text-sm text-gray-700">
          We use minimal cookies to improve your experience. See our <a href="/cookies" className="text-newtifi-teal underline">Cookie Policy</a>.
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={reject} className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm">Decline</button>
          <button onClick={accept} className="px-3 py-1.5 bg-newtifi-teal text-white rounded-md hover:bg-newtifi-teal/90 text-sm">Allow</button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;


