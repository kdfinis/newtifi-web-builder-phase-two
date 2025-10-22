import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  server: {
    port: parseInt(process.env.VITE_FRONTEND_PORT || '8080'),
    strictPort: true,
    host: true,
    watch: {
      usePolling: true,
      interval: 1000,
      ignored: ['**/LSB-save-of-NEWTIFI/**', '**/node_modules/**', '**/dist/**']
    },
    hmr: {
      overlay: false,
      timeout: 5000,
    },
    // No proxy needed for client-side OAuth
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..']
    }
  },
  plugins: [
    react({
      // Disable React DevTools in production
      jsxRuntime: 'automatic',
      babel: {
        plugins: [
          // Remove React DevTools hook in production
          process.env.NODE_ENV === 'production' && [
            'babel-plugin-transform-remove-console',
            { exclude: ['error', 'warn'] }
          ]
        ].filter(Boolean)
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
        format: 'es',
      },
    },
    // Remove React DevTools in production build
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
      '__REACT_DEVTOOLS_GLOBAL_HOOK__': 'undefined'
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  assetsInclude: ['**/*.pdf', '**/*.jpg', '**/*.png', '**/*.jpeg'],
});
