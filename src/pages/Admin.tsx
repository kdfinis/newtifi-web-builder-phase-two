import React, { useState, useEffect } from 'react';
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
import { FileText, Upload, Users, BarChart3, Settings, Plus, Edit, Trash2, Eye, Download } from "lucide-react";
import AdminDashboard from '../components/admin/AdminDashboard';
import JournalManager from '../components/admin/JournalManager';
import LegalCommentaryManager from '../components/admin/LegalCommentaryManager';
import NewsManager from '../components/admin/NewsManager';

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

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Data states
  const [articles, setArticles] = useState<Article[]>([]);
  const [journals, setJournals] = useState<Journal[]>([]);
  const [analytics, setAnalytics] = useState({
    totalViews: 0,
    totalArticles: 0,
    totalJournals: 0,
    monthlyViews: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  });

  // Modal states
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [showJournalModal, setShowJournalModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [editingJournal, setEditingJournal] = useState<Journal | null>(null);

  const { toast } = useToast();

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

  // Article management
  const handleSaveArticle = async (articleData: Partial<Article>) => {
    try {
      if (editingArticle) {
        // Update existing article
        const response = await fetch(`/api/admin/articles/${editingArticle.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(articleData),
        });

        if (response.ok) {
          toast({
            title: "Article updated",
            description: "Article has been updated successfully",
          });
          loadData();
        }
      } else {
        // Create new article
        const response = await fetch('/api/admin/articles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(articleData),
        });

        if (response.ok) {
          toast({
            title: "Article created",
            description: "New article has been created successfully",
          });
          loadData();
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save article",
        variant: "destructive",
      });
    }
    
    setShowArticleModal(false);
    setEditingArticle(null);
  };

  const handleDeleteArticle = async (articleId: string) => {
    try {
      const response = await fetch(`/api/admin/articles/${articleId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: "Article deleted",
          description: "Article has been deleted successfully",
        });
        loadData();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete article",
        variant: "destructive",
      });
    }
  };

  // Journal management
  const handleSaveJournal = async (journalData: Partial<Journal>) => {
    try {
      if (editingJournal) {
        // Update existing journal
        const response = await fetch(`/api/admin/journals/${editingJournal.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(journalData),
        });

        if (response.ok) {
          toast({
            title: "Journal updated",
            description: "Journal has been updated successfully",
          });
          loadData();
        }
      } else {
        // Create new journal
        const response = await fetch('/api/admin/journals', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(journalData),
        });

        if (response.ok) {
          toast({
            title: "Journal created",
            description: "New journal has been created successfully",
          });
          loadData();
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save journal",
        variant: "destructive",
      });
    }
    
    setShowJournalModal(false);
    setEditingJournal(null);
  };

  const handleDeleteJournal = async (journalId: string) => {
    try {
      const response = await fetch(`/api/admin/journals/${journalId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: "Journal deleted",
          description: "Journal has been deleted successfully",
        });
        loadData();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete journal",
        variant: "destructive",
      });
    }
  };

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Admin Login
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              NewTIFI Administration Panel
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="mt-1"
                />
              </div>
              <div className="mt-4">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-root">
      {/* Top nav or sidebar for switching modules */}
      <div className="admin-nav">
        {/* ... navigation logic ... */}
      </div>
      <div className="admin-content">
        {activeTab === 'dashboard' && <AdminDashboard analytics={analytics} activityLog={[]} />}
        {activeTab === 'journal' && <JournalManager articles={articles} journals={journals} onRefresh={loadData} />}
        {activeTab === 'legal' && <LegalCommentaryManager />}
        {activeTab === 'news' && <NewsManager />}
      </div>
    </div>
  );
};

// Article Form Component
const ArticleForm = ({ article, onSave, onCancel }: { 
  article: Article | null; 
  onSave: (data: Partial<Article>) => void; 
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState({
    title: article?.title || '',
    author: article?.author || '',
    date: article?.date || new Date().toISOString().split('T')[0],
    doi: article?.doi || '',
    keywords: article?.keywords?.join(', ') || '',
    abstract: article?.abstract || '',
    filename: article?.filename || '',
    url: article?.url || '',
    status: article?.status || 'draft',
    featured: article?.featured || false,
    category: article?.category || 'journal'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      keywords: formData.keywords.split(',').map(k => k.trim()).filter(k => k)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>
        <div>
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) => setFormData({...formData, author: e.target.value})}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            required
          />
        </div>
        <div>
          <Label htmlFor="doi">DOI</Label>
          <Input
            id="doi"
            value={formData.doi}
            onChange={(e) => setFormData({...formData, doi: e.target.value})}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="keywords">Keywords (comma-separated)</Label>
        <Input
          id="keywords"
          value={formData.keywords}
          onChange={(e) => setFormData({...formData, keywords: e.target.value})}
          placeholder="keyword1, keyword2, keyword3"
        />
      </div>

      <div>
        <Label htmlFor="abstract">Abstract</Label>
        <Textarea
          id="abstract"
          value={formData.abstract}
          onChange={(e) => setFormData({...formData, abstract: e.target.value})}
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="filename">Filename</Label>
          <Input
            id="filename"
            value={formData.filename}
            onChange={(e) => setFormData({...formData, filename: e.target.value})}
            required
          />
        </div>
        <div>
          <Label htmlFor="url">URL</Label>
          <Input
            id="url"
            value={formData.url}
            onChange={(e) => setFormData({...formData, url: e.target.value})}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value as 'draft' | 'published'})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value as 'journal' | 'news'})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="journal">Journal</SelectItem>
              <SelectItem value="news">News</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2 pt-6">
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured}
            onChange={(e) => setFormData({...formData, featured: e.target.checked})}
          />
          <Label htmlFor="featured">Featured</Label>
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {article ? 'Update' : 'Create'} Article
        </Button>
      </DialogFooter>
    </form>
  );
};

// Journal Form Component
const JournalForm = ({ journal, onSave, onCancel }: { 
  journal: Journal | null; 
  onSave: (data: Partial<Journal>) => void; 
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState({
    title: journal?.title || '',
    issn: journal?.issn || '',
    description: journal?.description || '',
    status: journal?.status || 'active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="journal-title">Title</Label>
        <Input
          id="journal-title"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />
      </div>

      <div>
        <Label htmlFor="issn">ISSN</Label>
        <Input
          id="issn"
          value={formData.issn}
          onChange={(e) => setFormData({...formData, issn: e.target.value})}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          rows={4}
          required
        />
      </div>

      <div>
        <Label htmlFor="journal-status">Status</Label>
        <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value as 'active' | 'inactive'})}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {journal ? 'Update' : 'Create'} Journal
        </Button>
      </DialogFooter>
    </form>
  );
};

export default Admin; 