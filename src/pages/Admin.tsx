import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { FileText, Upload, Users, BarChart3, Settings, Plus, Edit, Trash2, Eye, Download, BookOpen, Newspaper, GraduationCap, UserCheck, FileImage, Edit3, TrendingUp } from "lucide-react";

// Import all admin components
import AdminDashboard from '../components/admin/AdminDashboard';
import UserManagement from '../components/admin/UserManagement';
import SystemSettings from '../components/admin/SystemSettings';
import ArticleCollatingTool from '../components/admin/JournalManager';
import LegalCommentaryManager from '../components/admin/LegalCommentaryManager';
import NewsManager from '../components/admin/NewsManager';
import ScholarshipManager from '../components/admin/ScholarshipManager';
import PeopleManager from '../components/admin/PeopleManager';
import CitationGenerator from '../components/admin/CitationGenerator';
import MediaLibrary from '../components/admin/MediaLibrary';
import ContentEditor from '../components/admin/ContentEditor';
import AnalyticsDashboard from '../components/admin/AnalyticsDashboard';

interface Article {
  id: string;
  title: string;
  author: string;
  date: string;
  doi: string;
  keywords: string[];
  abstract: string;
  filename: string;
  url: string;
  status: 'draft' | 'published';
  views: number;
  downloads: number;
  featured: boolean;
  category: 'journal' | 'news';
}

interface Journal {
  id: string;
  title: string;
  issn: string;
  description: string;
  status: 'active' | 'inactive';
  articles: string[];
}

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  
  // Redirect to new dashboard immediately (new admin is at /dashboard)
  useEffect(() => {
    navigate('/dashboard', { replace: true });
  }, [navigate]);
  
  // Return loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-newtifi-teal mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to dashboard...</p>
      </div>
    </div>
  );
};

/* OLD ADMIN CODE - REMOVED, USE /dashboard INSTEAD */
/*
const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeModule, setActiveModule] = useState('dashboard');
  
  // Data states
  const [articles, setArticles] = useState<Article[]>([]);
  const [journals, setJournals] = useState<Journal[]>([]);
  const [analytics, setAnalytics] = useState({
    totalViews: 0,
    totalArticles: 0,
    totalJournals: 0,
    monthlyViews: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  });

  const { toast } = useToast();

  // Navigation modules - Google-like admin interface
  const modules = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, component: AdminDashboard },
    { id: 'users', label: 'Users', icon: Users, component: UserManagement },
    { id: 'settings', label: 'Settings', icon: Settings, component: SystemSettings },
    { id: 'journal', label: 'Article Collating Tool', icon: BookOpen, component: ArticleCollatingTool },
    { id: 'legal', label: 'Legal Commentary', icon: FileText, component: LegalCommentaryManager },
    { id: 'news', label: 'News & Events', icon: Newspaper, component: NewsManager },
    { id: 'scholarship', label: 'Scholarship Program', icon: GraduationCap, component: ScholarshipManager },
    { id: 'people', label: 'People & Contributors', icon: UserCheck, component: PeopleManager },
    { id: 'citation', label: 'Citation Generator', icon: Edit3, component: CitationGenerator },
    { id: 'media', label: 'Media Library', icon: FileImage, component: MediaLibrary },
    { id: 'content', label: 'Content Editor', icon: Edit, component: ContentEditor },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, component: AnalyticsDashboard },
  ];

  // Authentication
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        toast({
          title: "Login successful",
          description: "Welcome to the admin panel",
        });
        loadData();
      } else {
        toast({
          title: "Login failed",
          description: "Invalid credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Network error. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  // Data loading
  const loadData = async () => {
    try {
      // Load articles
      const articlesResponse = await fetch('/api/admin/articles');
      if (articlesResponse.ok) {
        const articlesData = await articlesResponse.json();
        setArticles(articlesData);
      }

      // Load journals
      const journalsResponse = await fetch('/api/admin/journals');
      if (journalsResponse.ok) {
        const journalsData = await journalsResponse.json();
        setJournals(journalsData);
      }

      // Load analytics
      const analyticsResponse = await fetch('/api/admin/analytics');
      if (analyticsResponse.ok) {
        const analyticsData = await analyticsResponse.json();
        setAnalytics({
          totalViews: analyticsData.totalViews,
          totalArticles: analyticsData.totalArticles,
          totalJournals: analyticsData.totalJournals,
          monthlyViews: analyticsData.monthlyViews
        });
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive",
      });
    }
  };

  // Render the active module component
  const renderActiveModule = () => {
    const module = modules.find(m => m.id === activeModule);
    if (!module) return null;

    const Component = module.component;
    
    switch (module.id) {
      case 'dashboard':
        return <Component analytics={analytics} activityLog={[]} />;
      case 'users':
        return <Component />;
      case 'settings':
        return <Component />;
      case 'journal':
        return <Component articles={articles} onRefresh={loadData} />;
      case 'legal':
        return <Component />;
      case 'news':
        return <Component />;
      case 'scholarship':
        return <Component />;
      case 'people':
        return <Component />;
      case 'citation':
        return <Component />;
      case 'media':
        return <Component />;
      case 'content':
        return <Component />;
      case 'analytics':
        return <Component />;
      default:
        return <Component />;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
              NewTIFI Admin
            </h2>
            <p className="mt-2 text-center text-base text-gray-600">
              Sign in to access the administration panel
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <Label htmlFor="email" className="sr-only">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-base"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="password" className="sr-only">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-base"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-base font-medium rounded-md text-white bg-[#0A0A23] hover:bg-[#1a1a40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white shadow">
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">NewTIFI Admin</h1>
              <div className="text-base text-gray-500">
                {modules.find(m => m.id === activeModule)?.label}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-base text-gray-600">Admin User</span>
              <Button onClick={handleLogout} variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
  <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-6">
          {/* Sidebar Navigation */}
          <div className="w-64 bg-white rounded-lg shadow p-4 h-fit">
            <nav className="space-y-2">
              {modules.map((module) => {
                const Icon = module.icon;
                return (
                  <button
                    key={module.id}
                    onClick={() => setActiveModule(module.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded text-base transition-colors ${
                      activeModule === module.id 
                        ? 'bg-[#0A0A23] text-white' 
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{module.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {renderActiveModule()}
          </div>
        </div>
      </div>
    </div>
  );
};

// OLD ADMIN CODE REMOVED - Use /dashboard instead
export default Admin; 