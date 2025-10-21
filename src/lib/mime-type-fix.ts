/**
 * MIME Type Error Detection and Recovery
 * Detects and fixes MIME type errors at runtime
 */

export class MimeTypeFixer {
  private static instance: MimeTypeFixer;
  private retryCount = 0;
  private maxRetries = 3;

  static getInstance(): MimeTypeFixer {
    if (!MimeTypeFixer.instance) {
      MimeTypeFixer.instance = new MimeTypeFixer();
    }
    return MimeTypeFixer.instance;
  }

  init() {
    // Listen for script loading errors
    window.addEventListener('error', (event) => {
      if (this.isMimeTypeError(event)) {
        console.warn('🚨 MIME type error detected:', event);
        this.handleMimeTypeError(event);
      }
    });

    // Listen for module loading errors
    window.addEventListener('unhandledrejection', (event) => {
      if (this.isMimeTypeError(event.reason)) {
        console.warn('🚨 MIME type error in promise:', event.reason);
        this.handleMimeTypeError(event.reason);
      }
    });

    // Check for existing MIME type errors on page load
    this.checkForMimeTypeErrors();
  }

  private isMimeTypeError(error: any): boolean {
    if (!error) return false;
    
    const message = error.message || error.toString();
    return message.includes('MIME type') || 
           message.includes('application/octet-stream') ||
           message.includes('Expected a JavaScript');
  }

  private handleMimeTypeError(error: any) {
    if (this.retryCount >= this.maxRetries) {
      console.error('❌ Max retries reached for MIME type error');
      this.showUserFriendlyError();
      return;
    }

    this.retryCount++;
    console.log(`🔄 Retrying MIME type fix (attempt ${this.retryCount}/${this.maxRetries})`);
    
    // Try to reload the page with cache busting
    setTimeout(() => {
      this.reloadWithCacheBusting();
    }, 1000 * this.retryCount);
  }

  private reloadWithCacheBusting() {
    const url = new URL(window.location.href);
    url.searchParams.set('_cb', Date.now().toString());
    window.location.href = url.toString();
  }

  private checkForMimeTypeErrors() {
    // Check if any script tags failed to load
    const scripts = document.querySelectorAll('script[src]');
    scripts.forEach(script => {
      if (script instanceof HTMLScriptElement) {
        script.addEventListener('error', (event) => {
          if (this.isMimeTypeError(event)) {
            console.warn('🚨 Script MIME type error:', script.src);
            this.handleMimeTypeError(event);
          }
        });
      }
    });
  }

  private showUserFriendlyError() {
    // Create a user-friendly error message
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: #ff4444;
      color: white;
      padding: 20px;
      text-align: center;
      z-index: 10000;
      font-family: Arial, sans-serif;
    `;
    errorDiv.innerHTML = `
      <h3>🚨 Loading Error Detected</h3>
      <p>The website is experiencing a loading issue. Please try refreshing the page.</p>
      <button onclick="window.location.reload()" style="
        background: white;
        color: #ff4444;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        margin: 10px;
      ">Refresh Page</button>
    `;
    document.body.appendChild(errorDiv);
  }
}

// Auto-initialize the MIME type fixer
if (typeof window !== 'undefined') {
  const fixer = MimeTypeFixer.getInstance();
  fixer.init();
}
