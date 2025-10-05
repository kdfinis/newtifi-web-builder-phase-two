// LMS Professor Dashboard - Additional to existing website
import React, { useState, useEffect } from 'react';
import { useLMSAuth } from '@/hooks/useLMSAuth';
import { useNavigate } from 'react-router-dom';
import { LMSArticle, ArticleStatus } from '@/lib/lms/articles/types';
import { lmsArticleService } from '@/lib/lms/articles/LMSArticleService';
import { UserRole } from '@/lib/lms/auth/types';
import { BookOpen, FileText, Download, Upload, AlertCircle, CheckCircle, ChevronRight, ExternalLink, ArrowLeft, ChevronDown, ChevronUp, Clock, Users, Archive, MapPin, PlusCircle, BarChart, Edit, Trash2, Eye, MessageSquare, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

const ProfessorDashboard: React.FC = () => {
  const { user, isAuthenticated, isLoading, canAccessProfessorDashboard, signOut } = useLMSAuth();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<LMSArticle[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !canAccessProfessorDashboard)) {
      navigate('/lms/login');
    } else if (isAuthenticated && canAccessProfessorDashboard) {
      fetchArticles();
    }
  }, [isAuthenticated, isLoading, canAccessProfessorDashboard, navigate, user]);

  const fetchArticles = () => {
    setLoadingArticles(true);
    setError(null);
    try {
      const allArticles = lmsArticleService.getAllArticles();
      const professorArticles = allArticles.filter(article =>
        article.authors.some(author => author.id === user?.id || author.email === user?.email)
      );
      setArticles(professorArticles);
    } catch (err) {
      setError('Failed to load articles.');
      console.error(err);
    } finally {
      setLoadingArticles(false);
    }
  };

  const handleDeleteArticle = (id: string) => {
    setArticleToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (articleToDelete) {
      lmsArticleService.deleteArticle(articleToDelete);
      fetchArticles();
      setShowDeleteConfirm(false);
      setArticleToDelete(null);
    }
  };

  const getStatusBadge = (status: ArticleStatus) => {
    switch (status) {
      case ArticleStatus.DRAFT: return <Badge variant="outline" className="bg-gray-100 text-gray-700">Draft</Badge>;
      case ArticleStatus.SUBMITTED: return <Badge className="bg-blue-100 text-blue-700">Submitted</Badge>;
      case ArticleStatus.UNDER_REVIEW: return <Badge className="bg-yellow-100 text-yellow-700">Under Review</Badge>;
      case ArticleStatus.ACCEPTED: return <Badge className="bg-green-100 text-green-700">Accepted</Badge>;
      case ArticleStatus.REJECTED: return <Badge className="bg-red-100 text-red-700">Rejected</Badge>;
      case ArticleStatus.PUBLISHED: return <Badge className="bg-blue-600 text-white">Published</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  if (!isAuthenticated || !canAccessProfessorDashboard) {
    return null;
  }

  const totalArticles = articles.length;
  const publishedArticles = articles.filter(a => a.status === ArticleStatus.PUBLISHED).length;
  const underReviewArticles = articles.filter(a => a.status === ArticleStatus.UNDER_REVIEW).length;
  const submittedArticles = articles.filter(a => a.status === ArticleStatus.SUBMITTED).length;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Professor Dashboard</h1>
            <p className="text-gray-600">Welcome, {user?.name || 'Professor'}! Manage your articles and track your impact.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/')}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Main Site
            </Button>
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalArticles}</div>
            <p className="text-xs text-gray-500">Your complete publication record</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedArticles}</div>
            <p className="text-xs text-gray-500">Articles successfully published</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{underReviewArticles}</div>
            <p className="text-xs text-gray-500">Currently being evaluated</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submitted</CardTitle>
            <Upload className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{submittedArticles}</div>
            <p className="text-xs text-gray-500">Awaiting review assignment</p>
          </CardContent>
        </Card>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <PlusCircle className="h-10 w-10 text-blue-600 mb-3" />
              <Button variant="link" className="text-lg font-semibold" onClick={() => navigate('/lms/articles/submit')}>Submit New Article</Button>
              <p className="text-sm text-gray-500 text-center">Start a new submission process.</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <BarChart className="h-10 w-10 text-blue-600 mb-3" />
              <Button variant="link" className="text-lg font-semibold" onClick={() => navigate('/lms/analytics')}>View KPI Dashboard</Button>
              <p className="text-sm text-gray-500 text-center">Track your article performance.</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <MessageSquare className="h-10 w-10 text-purple-500 mb-3" />
              <Button variant="link" className="text-lg font-semibold" onClick={() => navigate('/lms/reviews')}>Manage Reviews</Button>
              <p className="text-sm text-gray-500 text-center">Oversee articles under review.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Articles</h2>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All ({totalArticles})</TabsTrigger>
            <TabsTrigger value="published">Published ({publishedArticles})</TabsTrigger>
            <TabsTrigger value="review">Under Review ({underReviewArticles})</TabsTrigger>
            <TabsTrigger value="submitted">Submitted ({submittedArticles})</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Your Submissions</CardTitle>
                <CardDescription>A comprehensive list of all articles you are an author on.</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingArticles ? (
                  <div className="flex justify-center items-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : articles.length === 0 ? (
                  <p className="text-center text-gray-500 p-8">No articles found. Start by submitting a new one!</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Journal</TableHead>
                        <TableHead>Submission Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {articles.map((article) => (
                        <TableRow key={article.id}>
                          <TableCell className="font-medium">{article.title}</TableCell>
                          <TableCell>{getStatusBadge(article.status)}</TableCell>
                          <TableCell>{article.journalId}</TableCell>
                          <TableCell>{new Date(article.submissionDate).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => navigate(`/lms/articles/${article.slug}`)}>
                              <Eye className="h-4 w-4 mr-1" /> View
                            </Button>
                            {article.status === ArticleStatus.DRAFT || article.status === ArticleStatus.SUBMITTED ? (
                              <Button variant="ghost" size="sm" onClick={() => navigate(`/lms/articles/edit/${article.id}`)}>
                                <Edit className="h-4 w-4 mr-1" /> Edit
                              </Button>
                            ) : null}
                            {article.status !== ArticleStatus.PUBLISHED && (
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700" onClick={() => handleDeleteArticle(article.id)}>
                                <Trash2 className="h-4 w-4 mr-1" /> Delete
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this article? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfessorDashboard;
