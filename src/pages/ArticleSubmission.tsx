// Article Submission Form

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Upload, 
  Plus, 
  Trash2, 
  FileText,
  Users,
  Tag,
  BookOpen
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { articleService } from '@/lib/articles/ArticleService';
import { ArticleFormData, ArticleType, Author } from '@/lib/articles/types';

const ArticleSubmission: React.FC = () => {
  const { user, isAuthor, isProfessor } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    abstract: '',
    content: '',
    authors: [],
    type: ArticleType.RESEARCH,
    journal: '',
    keywords: [],
    files: []
  });

  useEffect(() => {
    if (!isAuthor() && !isProfessor()) {
      navigate('/');
      return;
    }

    // Initialize with current user as author
    if (user) {
      setFormData(prev => ({
        ...prev,
        authors: [{
          id: user.id,
          name: user.name,
          email: user.email,
          institution: user.profile.institution || '',
          isCorresponding: true
        }]
      }));
    }
  }, [user, isAuthor, isProfessor, navigate]);

  const handleInputChange = (field: keyof ArticleFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAuthorChange = (index: number, field: keyof Author, value: string) => {
    setFormData(prev => ({
      ...prev,
      authors: prev.authors.map((author, i) => 
        i === index ? { ...author, [field]: value } : author
      )
    }));
  };

  const addAuthor = () => {
    setFormData(prev => ({
      ...prev,
      authors: [...prev.authors, {
        id: `author-${Date.now()}`,
        name: '',
        email: '',
        institution: '',
        isCorresponding: false
      }]
    }));
  };

  const removeAuthor = (index: number) => {
    setFormData(prev => ({
      ...prev,
      authors: prev.authors.filter((_, i) => i !== index)
    }));
  };

  const handleKeywordAdd = (keyword: string) => {
    if (keyword.trim() && !formData.keywords.includes(keyword.trim())) {
      setFormData(prev => ({
        ...prev,
        keywords: [...prev.keywords, keyword.trim()]
      }));
    }
  };

  const handleKeywordRemove = (keyword: string) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).map(file => ({
        id: `file-${Date.now()}-${Math.random()}`,
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file),
        uploadedAt: new Date()
      }));

      setFormData(prev => ({
        ...prev,
        files: [...prev.files, ...newFiles]
      }));
    }
  };

  const removeFile = (fileId: string) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter(f => f.id !== fileId)
    }));
  };

  const handleSaveDraft = async () => {
    try {
      setSaving(true);
      await articleService.createArticle(formData, user?.id || '');
      navigate('/professor');
    } catch (error) {
      console.error('❌ Error saving draft:', error);
      alert('Failed to save draft');
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Please enter a title');
      return;
    }
    
    if (!formData.abstract.trim()) {
      alert('Please enter an abstract');
      return;
    }
    
    if (formData.authors.length === 0) {
      alert('Please add at least one author');
      return;
    }

    try {
      setLoading(true);
      const article = await articleService.createArticle(formData, user?.id || '');
      await articleService.submitArticle(article.id);
      navigate('/professor');
    } catch (error) {
      console.error('❌ Error submitting article:', error);
      alert('Failed to submit article');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <button
              onClick={() => navigate('/professor')}
              className="mr-4 p-2 text-gray-400 hover:text-gray-600"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Submit New Article</h1>
              <p className="text-gray-600">Create and submit a new research article</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Basic Information
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                  placeholder="Enter article title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Abstract *
                </label>
                <textarea
                  value={formData.abstract}
                  onChange={(e) => handleInputChange('abstract', e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                  placeholder="Enter article abstract"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Article Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value as ArticleType)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                  >
                    <option value={ArticleType.RESEARCH}>Research Article</option>
                    <option value={ArticleType.REVIEW}>Review Article</option>
                    <option value={ArticleType.CASE_STUDY}>Case Study</option>
                    <option value={ArticleType.COMMENTARY}>Commentary</option>
                    <option value={ArticleType.BOOK_REVIEW}>Book Review</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Journal *
                  </label>
                  <select
                    value={formData.journal}
                    onChange={(e) => handleInputChange('journal', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                    required
                  >
                    <option value="">Select Journal</option>
                    <option value="investment-management">Investment Management Journal</option>
                    <option value="fintech-innovation">FinTech Innovation Journal</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Authors */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Authors
              </h2>
              <button
                type="button"
                onClick={addAuthor}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-newtifi-teal bg-newtifi-teal/10 hover:bg-newtifi-teal/20"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Author
              </button>
            </div>

            <div className="space-y-4">
              {formData.authors.map((author, index) => (
                <div key={author.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900">Author {index + 1}</h3>
                    {formData.authors.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeAuthor(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        value={author.name}
                        onChange={(e) => handleAuthorChange(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={author.email}
                        onChange={(e) => handleAuthorChange(index, 'email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Institution
                      </label>
                      <input
                        type="text"
                        value={author.institution}
                        onChange={(e) => handleAuthorChange(index, 'institution', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ORCID
                      </label>
                      <input
                        type="text"
                        value={author.orcid || ''}
                        onChange={(e) => handleAuthorChange(index, 'orcid', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={author.isCorresponding}
                        onChange={(e) => handleAuthorChange(index, 'isCorresponding', e.target.checked)}
                        className="h-4 w-4 text-newtifi-teal focus:ring-newtifi-teal border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Corresponding author</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Keywords */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Tag className="h-5 w-5 mr-2" />
              Keywords
            </h2>

            <div className="space-y-4">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Enter keyword and press Enter"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleKeywordAdd(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                    handleKeywordAdd(input.value);
                    input.value = '';
                  }}
                  className="px-4 py-2 bg-newtifi-teal text-white rounded-r-md hover:bg-newtifi-teal-dark"
                >
                  Add
                </button>
              </div>

              {formData.keywords.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-newtifi-teal/10 text-newtifi-teal"
                    >
                      {keyword}
                      <button
                        type="button"
                        onClick={() => handleKeywordRemove(keyword)}
                        className="ml-2 text-newtifi-teal hover:text-newtifi-teal-dark"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* File Upload */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Upload className="h-5 w-5 mr-2" />
              Attachments
            </h2>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-900">Upload files</p>
                  <p className="text-sm text-gray-500">PDF, DOC, DOCX files accepted</p>
                </label>
              </div>

              {formData.files.length > 0 && (
                <div className="space-y-2">
                  {formData.files.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{file.name}</p>
                          <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(file.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Content Editor */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Article Content
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                rows={20}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-newtifi-teal focus:border-transparent"
                placeholder="Enter article content..."
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={saving}
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-newtifi-teal disabled:opacity-50"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Draft'}
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-newtifi-teal hover:bg-newtifi-teal-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-newtifi-teal disabled:opacity-50"
            >
              <Upload className="h-4 w-4 mr-2" />
              {loading ? 'Submitting...' : 'Submit Article'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArticleSubmission;
