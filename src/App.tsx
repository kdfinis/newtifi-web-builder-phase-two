import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import WhoWeAre from "./pages/WhoWeAre";
import Membership from "./pages/Membership";
import Connect from "./pages/Connect";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Person from "./pages/Person";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import Publishing from "./pages/Publishing";
import InvestmentManagementJournal from "./pages/publishing/journals/investment-management";
import ArticlePage from "./pages/publishing/journals/ArticlePage";
import Admin from './pages/Admin';
import AuthCallback from './pages/AuthCallback';
import "./styles/typography.css";
import "./App.css";

// Lazy load heavy components for better performance
const LazyAdmin = React.lazy(() => import('./pages/Admin'));
const LazyArticlePage = React.lazy(() => import('./pages/publishing/journals/ArticlePage'));

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-newtifi-teal mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (garbage collection time)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/who-we-are" element={<WhoWeAre />} />
                <Route path="/membership" element={<Membership />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/person/:name" element={<Person />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/publishing" element={<Publishing />} />
                <Route path="/publishing/journals/investment-management" element={<Publishing />} />
                <Route path="/publishing/journal" element={<Publishing />} />
                <Route path="/publishing/journals/investment-management/article/:slug" element={<LazyArticlePage />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/admin" element={<LazyAdmin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
