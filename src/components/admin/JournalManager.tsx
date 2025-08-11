import React, { useState, useEffect } from 'react';

type TabType = 'articles' | 'upload' | 'scan';

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
  status: 'published' | 'draft' | 'archived';
  views: number;
  downloads: number;
  featured: boolean;
  category: 'journal' | 'news';
  volume?: string;
  pdfUrl?: string;
  fileSize?: string;
  lastModified?: string;
}

interface ArticleCollatingToolProps {
  articles: Article[];
  onRefresh: () => void;
}

const ArticleCollatingTool: React.FC<ArticleCollatingToolProps> = ({ articles, onRefresh }) => {
  const [tab, setTab] = useState<TabType>('articles');
  const [uploading, setUploading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [realArticles, setRealArticles] = useState<Article[]>([]);

  // Scan for real PDF articles in the website
  const scanForRealArticles = async () => {
    setScanning(true);
    try {
      const response = await fetch('/api/admin/scan-articles');
      if (response.ok) {
        const scannedArticles = await response.json();
        setRealArticles(scannedArticles);
        onRefresh();
      }
    } catch (error) {
      console.error('Error scanning articles:', error);
    } finally {
      setScanning(false);
    }
  };

  // Filter to only show articles that have actual PDF files
  const validArticles = articles.filter(article => {
    // Check if article has a real PDF file
    return article.pdfUrl && article.filename && (
      article.pdfUrl.includes('.pdf') || 
      article.filename.includes('.pdf')
    );
  });

  // Get file size and last modified date for articles
  const getArticleMetadata = async (article: Article) => {
    try {
      const response = await fetch(`/api/admin/article-metadata/${article.id}`);
      if (response.ok) {
        const metadata = await response.json();
        return metadata;
      }
    } catch (error) {
      console.error('Error getting article metadata:', error);
    }
    return null;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }

      const response = await fetch('/api/admin/upload-article', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        onRefresh();
        alert('Articles uploaded successfully');
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteArticle = async (articleId: string) => {
    if (confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
      try {
        const response = await fetch(`/api/admin/articles/${articleId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          onRefresh();
          alert('Article deleted successfully');
        } else {
          alert('Failed to delete article');
        }
      } catch (error) {
        console.error('Delete error:', error);
        alert('Failed to delete article');
      }
    }
  };

  const handleToggleFeatured = async (articleId: string, featured: boolean) => {
    try {
      const response = await fetch(`/api/admin/articles/${articleId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !featured }),
      });
      if (response.ok) {
        onRefresh();
      }
    } catch (error) {
      console.error('Error toggling featured status:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#0A0A23]">Article Collating Tool</h2>
          <p className="text-base text-gray-600 mt-1">
            Manage and organize real articles with actual PDF files
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={scanForRealArticles}
            disabled={scanning}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {scanning ? 'Scanning...' : '🔍 Scan for Articles'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b mb-4">
        {(['articles', 'upload', 'scan'] as const).map((t) => (
          <button
            key={t}
            className={`px-4 py-2 font-semibold border-b-2 ${tab === t ? 'border-[#0A0A23] text-[#0A0A23]' : 'border-transparent text-gray-500'}`}
            onClick={() => setTab(t)}
          >
            {t === 'articles' ? '📄 Articles' : t === 'upload' ? '📤 Upload' : '🔍 Scan'}
          </button>
        ))}
      </div>

      {/* Articles Table */}
      {tab === 'articles' && (
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-base font-bold">
              Real Articles ({validArticles.length})
            </div>
            <div className="text-base text-gray-500">
              Only articles with actual PDF files
            </div>
          </div>
          
          {validArticles.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-600 font-medium">No real articles found</p>
              <p className="text-base text-gray-500 mt-1">
                Use the Scan tab to find articles or Upload tab to add new ones
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-base">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Title</th>
                    <th className="p-2 text-left">Author</th>
                    <th className="p-2 text-left">Date</th>
                    <th className="p-2 text-left">File</th>
                    <th className="p-2 text-left">Size</th>
                    <th className="p-2 text-left">Status</th>
                    <th className="p-2 text-left">Featured</th>
                    <th className="p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {validArticles.map((article) => (
                    <tr key={article.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 font-serif text-[#0A0A23] max-w-xs truncate">
                        {article.title || 'Untitled'}
                      </td>
                      <td className="p-2">{article.author || 'Unknown'}</td>
                      <td className="p-2">{article.date || 'N/A'}</td>
                      <td className="p-2">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          PDF
                        </span>
                      </td>
                      <td className="p-2 text-xs text-gray-500">
                        {article.fileSize || 'N/A'}
                      </td>
                      <td className="p-2">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                          {article.status || 'published'}
                        </span>
                      </td>
                      <td className="p-2">
                        <button
                          onClick={() => handleToggleFeatured(article.id, article.featured)}
                          className={`px-2 py-1 text-xs rounded ${
                            article.featured 
                              ? 'bg-yellow-100 text-yellow-700' 
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {article.featured ? '⭐ Featured' : '☆ Not Featured'}
                        </button>
                      </td>
                      <td className="p-2">
                        <div className="flex gap-2">
                          <button 
                            className="text-blue-600 hover:text-blue-800 text-xs"
                            onClick={() => window.open(article.pdfUrl, '_blank')}
                          >
                            View
                          </button>
                          <button 
                            className="text-green-600 hover:text-green-800 text-xs"
                            onClick={() => window.open(article.pdfUrl, '_blank')}
                          >
                            Download
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-800 text-xs"
                            onClick={() => handleDeleteArticle(article.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Upload Tab */}
      {tab === 'upload' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-base font-bold mb-4">Upload Articles</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-gray-600 mb-4">Upload PDF articles to the system</p>
            <input
              type="file"
              multiple
              accept=".pdf"
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
              id="article-upload"
            />
            <label
              htmlFor="article-upload"
              className={`inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-[#0A0A23] hover:bg-[#1a1a40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A0A23] cursor-pointer ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {uploading ? 'Uploading...' : 'Select PDF Files'}
            </label>
          </div>
        </div>
      )}

      {/* Scan Tab */}
      {tab === 'scan' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-base font-bold mb-4">Scan for Articles</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Scan Results</h4>
              <p className="text-base text-blue-700">
                This will scan the website directories for PDF articles and automatically add them to the system.
              </p>
            </div>
            
            <button
              onClick={scanForRealArticles}
              disabled={scanning}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {scanning ? 'Scanning directories...' : '🔍 Scan for PDF Articles'}
            </button>

            {realArticles.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Found Articles:</h4>
                <div className="space-y-2">
                  {realArticles.map((article, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded border">
                      <div className="font-medium">{article.title}</div>
                      <div className="text-base text-gray-500">{article.filename}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleCollatingTool; 