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

  // Admin dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">NewTIFI Admin</h1>
              <p className="text-gray-600">Administration Panel</p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="articles" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Articles
            </TabsTrigger>
            <TabsTrigger value="journals" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Journals
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.totalViews.toLocaleString()}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.totalArticles}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Journals</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.totalJournals}</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Articles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {articles.slice(0, 5).map((article) => (
                      <div key={article.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{article.title}</p>
                          <p className="text-sm text-gray-600">{article.author} • {article.date}</p>
                        </div>
                        <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                          {article.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button 
                      onClick={() => {
                        setEditingArticle(null);
                        setShowArticleModal(true);
                      }}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Article
                    </Button>
                    <Button 
                      onClick={() => {
                        setEditingJournal(null);
                        setShowJournalModal(true);
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Journal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Articles Tab */}
          <TabsContent value="articles" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Article Management</h2>
              <Button 
                onClick={() => {
                  setEditingArticle(null);
                  setShowArticleModal(true);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Article
              </Button>
            </div>

            <div className="grid gap-6">
              {articles.map((article) => (
                <Card key={article.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{article.title}</CardTitle>
                        <CardDescription>
                          {article.author} • {article.date} • DOI: {article.doi}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingArticle(article);
                            setShowArticleModal(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteArticle(article.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                          {article.status}
                        </Badge>
                        <Badge variant={article.featured ? 'default' : 'outline'}>
                          {article.featured ? 'Featured' : 'Regular'}
                        </Badge>
                        <Badge variant="outline">
                          {article.category}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="mr-4">👁️ {article.views} views</span>
                        <span>⬇️ {article.downloads} downloads</span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{article.abstract}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Journals Tab */}
          <TabsContent value="journals" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Journal Management</h2>
              <Button 
                onClick={() => {
                  setEditingJournal(null);
                  setShowJournalModal(true);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Journal
              </Button>
            </div>

            <div className="grid gap-6">
              {journals.map((journal) => (
                <Card key={journal.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{journal.title}</CardTitle>
                        <CardDescription>
                          ISSN: {journal.issn} • {journal.articles.length} articles
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingJournal(journal);
                            setShowJournalModal(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteJournal(journal.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <Badge variant={journal.status === 'active' ? 'default' : 'secondary'}>
                        {journal.status}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{journal.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {analytics.monthlyViews.map((views, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{new Date(2024, index).toLocaleDateString('en-US', { month: 'short' })}</span>
                        <span>{views.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Articles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {articles
                      .sort((a, b) => b.views - a.views)
                      .slice(0, 5)
                      .map((article) => (
                        <div key={article.id} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-sm">{article.title}</p>
                            <p className="text-xs text-gray-600">{article.author}</p>
                          </div>
                          <span className="text-sm">{article.views} views</span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">Settings</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>System Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Articles:</span>
                    <span>{analytics.totalArticles}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Journals:</span>
                    <span>{analytics.totalJournals}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Views:</span>
                    <span>{analytics.totalViews.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Article Modal */}
      <Dialog open={showArticleModal} onOpenChange={setShowArticleModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingArticle ? 'Edit Article' : 'Add New Article'}
            </DialogTitle>
            <DialogDescription>
              {editingArticle ? 'Update article information' : 'Create a new article'}
            </DialogDescription>
          </DialogHeader>
          <ArticleForm
            article={editingArticle}
            onSave={handleSaveArticle}
            onCancel={() => {
              setShowArticleModal(false);
              setEditingArticle(null);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Journal Modal */}
      <Dialog open={showJournalModal} onOpenChange={setShowJournalModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingJournal ? 'Edit Journal' : 'Add New Journal'}
            </DialogTitle>
            <DialogDescription>
              {editingJournal ? 'Update journal information' : 'Create a new journal'}
            </DialogDescription>
          </DialogHeader>
          <JournalForm
            journal={editingJournal}
            onSave={handleSaveJournal}
            onCancel={() => {
              setShowJournalModal(false);
              setEditingJournal(null);
            }}
          />
        </DialogContent>
      </Dialog>
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