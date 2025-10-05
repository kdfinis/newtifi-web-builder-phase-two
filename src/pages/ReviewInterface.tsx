// Review Interface for Article Reviewers

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  CheckCircle, 
  Clock, 
  FileText,
  User,
  Calendar,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { articleService } from '@/lib/articles/ArticleService';
import { Article, Review, ReviewFormData } from '@/lib/articles/types';

const ReviewInterface: React.FC = () => {
  const { user, isReviewer, isProfessor } = useAuth();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [reviewForm, setReviewForm] = useState<ReviewFormData>({
    score: 0,
    comments: '',
    recommendations: []
  });

  useEffect(() => {
    if (!isReviewer() && !isProfessor()) {
      navigate('/');
      return;
    }

    loadReviewData();
  }, [isReviewer, isProfessor, navigate]);

  const loadReviewData = async () => {
    try {
      setLoading(true);
      const allArticles = await articleService.getArticles();
      // Filter articles that need review
      const reviewableArticles = allArticles.filter(article => 
        article.status === 'under_review' || article.status === 'submitted'
      );
      setArticles(reviewableArticles);
    } catch (error) {
      console.error('❌ Error loading review data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleArticleSelect = (article: Article) => {
    setSelectedArticle(article);
    // Reset form
    setReviewForm({
      score: 0,
      comments: '',
      recommendations: []
    });
  };

  const handleScoreChange = (score: number) => {
    setReviewForm(prev => ({ ...prev, score }));
  };

  const handleCommentsChange = (comments: string) => {
    setReviewForm(prev => ({ ...prev, comments }));
  };

  const handleRecommendationAdd = (recommendation: string) => {
    if (recommendation.trim() && !reviewForm.recommendations.includes(recommendation.trim())) {
      setReviewForm(prev => ({
        ...prev,
        recommendations: [...prev.recommendations, recommendation.trim()]
      }));
    }
  };

  const handleRecommendationRemove = (recommendation: string) => {
    setReviewForm(prev => ({
      ...prev,
      recommendations: prev.recommendations.filter(r => r !== recommendation)
    }));
  };

  const handleSubmitReview = async () => {
    if (!selectedArticle || !user) return;

    if (reviewForm.score === 0) {
      alert('Please provide a score');
      return;
    }

    if (!reviewForm.comments.trim()) {
      alert('Please provide comments');
      return;
    }

    try {
      setSubmitting(true);
      await articleService.addReview(
        selectedArticle.id,
        reviewForm,
        user.id,
        user.name
      );
      
      // Reload data
      await loadReviewData();
      setSelectedArticle(null);
      setReviewForm({ score: 0, comments: '', recommendations: [] });
      
      alert('Review submitted successfully!');
    } catch (error) {
      console.error('❌ Error submitting review:', error);
      alert('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-newtifi-teal mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <button
              onClick={() => navigate('/professor')}
              className="mr-4 p-2 text-gray-400 hover:text-gray-600"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Article Reviews</h1>
              <p className="text-gray-600">Review and evaluate submitted articles</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">
                  Pending Reviews ({articles.length})
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {articles.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => handleArticleSelect(article)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${
                      selectedArticle?.id === article.id ? 'bg-newtifi-teal/10 border-r-4 border-newtifi-teal' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {article.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {article.authors.map(a => a.name).join(', ')}
                        </p>
                        <div className="flex items-center mt-2 space-x-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(article.status)}`}>
                            {article.status.replace('_', ' ')}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(article.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <FileText className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Review Form */}
          <div className="lg:col-span-2">
            {selectedArticle ? (
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Review Article</h2>
                </div>
                <div className="p-6 space-y-6">
                  {/* Article Preview */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {selectedArticle.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <User className="h-4 w-4 mr-1" />
                      <span>{selectedArticle.authors.map(a => a.name).join(', ')}</span>
                      <Calendar className="h-4 w-4 ml-4 mr-1" />
                      <span>{new Date(selectedArticle.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {selectedArticle.abstract}
                    </p>
                  </div>

                  {/* Score Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Overall Score (1-10) *
                    </label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                        <button
                          key={score}
                          type="button"
                          onClick={() => handleScoreChange(score)}
                          className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-colors ${
                            reviewForm.score >= score
                              ? 'border-newtifi-teal bg-newtifi-teal text-white'
                              : 'border-gray-300 text-gray-500 hover:border-newtifi-teal hover:text-newtifi-teal'
                          }`}
                        >
                          {score}
                        </button>
                      ))}
                    </div>
                    {reviewForm.score > 0 && (
                      <p className={`mt-2 text-sm font-medium ${getScoreColor(reviewForm.score)}`}>
                        {reviewForm.score >= 8 ? 'Excellent' : 
                         reviewForm.score >= 6 ? 'Good' : 
                         reviewForm.score >= 4 ? 'Fair' : 'Poor'}
                      </p>
                    )}
                  </div>

                  {/* Comments */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Comments *
                    </label>
                    <textarea
                      value={reviewForm.comments}
                      onChange={(e) => handleCommentsChange(e.target.value)}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                      placeholder="Provide detailed feedback on the article..."
                    />
                  </div>

                  {/* Recommendations */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recommendations
                    </label>
                    <div className="space-y-3">
                      <div className="flex">
                        <input
                          type="text"
                          placeholder="Add recommendation..."
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleRecommendationAdd(e.currentTarget.value);
                              e.currentTarget.value = '';
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                            handleRecommendationAdd(input.value);
                            input.value = '';
                          }}
                          className="px-4 py-2 bg-newtifi-teal text-white rounded-r-md hover:bg-newtifi-teal-dark"
                        >
                          Add
                        </button>
                      </div>
                      
                      {reviewForm.recommendations.length > 0 && (
                        <div className="space-y-2">
                          {reviewForm.recommendations.map((recommendation, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-50 rounded-md p-2">
                              <span className="text-sm text-gray-700">{recommendation}</span>
                              <button
                                type="button"
                                onClick={() => handleRecommendationRemove(recommendation)}
                                className="text-red-600 hover:text-red-700"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setSelectedArticle(null)}
                      className="px-6 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmitReview}
                      disabled={submitting || reviewForm.score === 0 || !reviewForm.comments.trim()}
                      className="px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-newtifi-teal hover:bg-newtifi-teal-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-newtifi-teal disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Article Selected</h3>
                <p className="text-gray-500">Select an article from the list to begin reviewing</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewInterface;
