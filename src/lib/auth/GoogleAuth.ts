// Google Identity Services SDK - Pure Client-Side OAuth
export class GoogleAuth {
  private static instance: GoogleAuth;
  private isInitialized = false;

  static getInstance(): GoogleAuth {
    if (!GoogleAuth.instance) {
      GoogleAuth.instance = new GoogleAuth();
    }
    return GoogleAuth.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    return new Promise((resolve, reject) => {
      // Load Google Identity Services script
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        if (window.google) {
          window.google.accounts.id.initialize({
            client_id: '194507073097-ocntv6b6bou3v4m334tr637pjq2d8702.apps.googleusercontent.com',
            callback: this.handleCredentialResponse.bind(this),
            auto_select: false,
            cancel_on_tap_outside: true
          });
          this.isInitialized = true;
          resolve();
        } else {
          reject(new Error('Google Identity Services failed to load'));
        }
      };
      
      script.onerror = () => reject(new Error('Failed to load Google Identity Services'));
      document.head.appendChild(script);
    });
  }

  private handleCredentialResponse(response: any): void {
    console.log('Google OAuth response:', response);
    
    // Decode JWT token to get user info
    const payload = JSON.parse(atob(response.credential.split('.')[1]));
    
    const userData = {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      avatarUrl: payload.picture,
      provider: 'google',
      loginTime: new Date().toISOString()
    };

    // Store in localStorage
    localStorage.setItem('newtifi_user', JSON.stringify(userData));
    localStorage.setItem('newtifi_auth', 'true');

    // Trigger auth state refresh
    window.dispatchEvent(new CustomEvent('authStateChanged'));

    // Redirect to dashboard
    window.location.href = '/dashboard?auth=success&provider=google';
  }

  renderButton(elementId: string): void {
    if (!this.isInitialized) {
      console.error('GoogleAuth not initialized');
      return;
    }

    window.google.accounts.id.renderButton(
      document.getElementById(elementId),
      {
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        shape: 'rectangular',
        logo_alignment: 'left'
      }
    );
  }

  async signIn(): Promise<void> {
    if (!this.isInitialized) {
      await this.initialize();
    }
    
    window.google.accounts.id.prompt();
  }
}

// Global type declaration
declare global {
  interface Window {
    google: any;
  }
}
