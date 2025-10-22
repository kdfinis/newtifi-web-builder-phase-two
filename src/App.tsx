import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Person from "./pages/Person";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import AuthCallback from './pages/AuthCallback';
import OAuthCallback from './pages/OAuthCallback';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import "./styles/typography.css";
import "./App.css";

// Lazy load heavy components for better performance
const LazyAdmin = React.lazy(() => import('./pages/Admin'));
const LazyArticlePage = React.lazy(() => import('./pages/publishing/journals/ArticlePage'));
const LazyPublishing = React.lazy(() => import('./pages/Publishing'));
const LazyInvestmentManagement = React.lazy(() => import('./pages/publishing/journals/investment-management'));
const LazyDashboard = React.lazy(() => import('./pages/Dashboard'));
const LazyProfile = React.lazy(() => import('./pages/Profile'));
const LazyArticles = React.lazy(() => import('./pages/Articles'));
const LazyArticleEditor = React.lazy(() => import('./pages/articles/ArticleEditor'));
const LazyWhoWeAre = React.lazy(() => import('./pages/WhoWeAre'));
const LazyMembership = React.lazy(() => import('./pages/Membership'));
const LazyContact = React.lazy(() => import('./pages/Contact'));
const LazyLogin = React.lazy(() => import('./pages/Login'));
const LazySignup = React.lazy(() => import('./pages/Signup'));

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

function OldArticleRedirect() {
  const { journalSlug, slug } = useParams();
  return <Navigate to={`/publishing/${journalSlug}/article/${slug}`} replace />;
}

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter
              future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true
              }}
            >
              <Layout>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/who-we-are" element={<LazyWhoWeAre />} />
                <Route path="/membership" element={<LazyMembership />} />
                <Route path="/contact" element={<LazyContact />} />
                <Route path="/login" element={<LazyLogin />} />
                <Route path="/signup" element={<LazySignup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/person/:name" element={<Person />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/publishing" element={<LazyPublishing />} />
                <Route path="/publishing/investment-management" element={<LazyInvestmentManagement />} />
                <Route path="/publishing/:journalSlug/article/:slug" element={<LazyArticlePage />} />
                {/* Backward-compat redirect: old URLs with '/publishing/journals/...' */}
                <Route path="/publishing/journals/:journalSlug/article/:slug" element={<OldArticleRedirect />} />
                    <Route path="/auth/callback" element={<AuthCallback />} />
                    <Route path="/auth/google/callback" element={<OAuthCallback />} />
                    <Route path="/auth/linkedin/callback" element={<OAuthCallback />} />
                    <Route path="/oauth-callback" element={<OAuthCallback />} /> {/* Fallback for old URLs */}
                <Route path="/dashboard" element={<LazyDashboard />} />
                <Route path="/articles" element={<LazyArticles />} />
                <Route path="/profile" element={<LazyProfile />} />
                <Route path="/apply-contributor" element={<ApplyContributor />} />
                <Route path="/articles/new" element={<LazyArticleEditor />} />
                <Route path="/articles/edit/:id" element={<LazyArticleEditor />} />
                <Route path="/admin" element={<LazyAdmin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Layout>
        </BrowserRouter>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
