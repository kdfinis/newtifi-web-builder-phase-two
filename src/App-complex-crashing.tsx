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
import ArticlePage from "./pages/publishing/journals/ArticlePage";
import Admin from './pages/Admin';
import AuthCallback from './pages/AuthCallback';
import SimpleLogin from './components/SimpleLogin';
import SimpleProfessorDashboard from './pages/SimpleProfessorDashboard';
import TestPage from './pages/TestPage';
import ArticleSubmission from './pages/ArticleSubmission';
import AdminConsole from './pages/AdminConsole';
import ReviewInterface from './pages/ReviewInterface';
import KPIDashboard from './pages/KPIDashboard';
import MemberDashboard from './pages/MemberDashboard';
import "./styles/typography.css";
import "./App.css";

// Lazy load heavy components for better performance
const LazyAdmin = React.lazy(() => import('./pages/Admin'));
const LazyArticlePage = React.lazy(() => import('./pages/publishing/journals/ArticlePage'));
const LazyProfessorDashboard = React.lazy(() => import('./pages/ProfessorDashboard'));
const LazyArticleSubmission = React.lazy(() => import('./pages/ArticleSubmission'));
const LazyAdminConsole = React.lazy(() => import('./pages/AdminConsole'));
const LazyReviewInterface = React.lazy(() => import('./pages/ReviewInterface'));
const LazyKPIDashboard = React.lazy(() => import('./pages/KPIDashboard'));
const LazyMemberDashboard = React.lazy(() => import('./pages/MemberDashboard'));

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
                <Route path="/login" element={<SimpleLogin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/person/:name" element={<Person />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/publishing" element={<Publishing />} />
                <Route path="/publishing/articles/:slug" element={<LazyArticlePage />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/admin" element={<LazyAdmin />} />
                <Route path="/professor" element={<SimpleProfessorDashboard />} />
                <Route path="/test" element={<TestPage />} />
                {/* Temporarily disabled for testing */}
                {/* <Route path="/admin-console" element={<LazyAdminConsole />} />
                <Route path="/articles/submit" element={<LazyArticleSubmission />} />
                <Route path="/articles/edit/:id" element={<LazyArticleSubmission />} />
                <Route path="/reviews" element={<LazyReviewInterface />} />
                <Route path="/analytics" element={<LazyKPIDashboard />} />
                <Route path="/member" element={<LazyMemberDashboard />} /> */}
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
