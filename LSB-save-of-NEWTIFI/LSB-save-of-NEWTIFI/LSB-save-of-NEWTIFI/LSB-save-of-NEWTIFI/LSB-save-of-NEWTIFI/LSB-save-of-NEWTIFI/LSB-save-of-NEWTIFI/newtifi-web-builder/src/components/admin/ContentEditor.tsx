import React, { useState } from 'react';

interface ContentPage {
  id: string;
  title: string;
  path: string;
  content: string;
  lastModified: string;
  status: 'published' | 'draft';
}

const ContentEditor: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<string>('home');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const pages: ContentPage[] = [
    {
      id: 'home',
      title: 'Homepage',
      path: '/',
      content: 'Homepage content...',
      lastModified: '2025-01-27',
      status: 'published'
    },
    {
      id: 'about',
      title: 'About Us',
      path: '/who-we-are',
      content: 'About page content...',
      lastModified: '2025-01-27',
      status: 'published'
    },
    {
      id: 'contact',
      title: 'Contact',
      path: '/contact',
      content: 'Contact page content...',
      lastModified: '2025-01-27',
      status: 'published'
    },
    {
      id: 'membership',
      title: 'Membership',
      path: '/membership',
      content: 'Membership page content...',
      lastModified: '2025-01-27',
      status: 'published'
    }
  ];

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Content saved successfully!');
    } catch (error) {
      alert('Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  const currentPage = pages.find(p => p.id === selectedPage);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#0A0A23]">Content Editor</h2>
        <div className="flex gap-3">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              previewMode 
                ? 'bg-[#0A0A23] text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {previewMode ? 'Edit Mode' : 'Preview Mode'}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-[#0A0A23] text-white rounded-md hover:bg-[#1a1a40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A0A23] disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar - Page Selection */}
        <div className="w-64 bg-white rounded-lg shadow p-4 h-fit">
          <h3 className="font-semibold text-[#0A0A23] mb-4">Pages</h3>
          <div className="space-y-2">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => setSelectedPage(page.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedPage === page.id
                    ? 'bg-[#0A0A23] text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="font-medium">{page.title}</div>
                <div className={`text-xs mt-1 ${
                  selectedPage === page.id ? 'text-gray-200' : 'text-gray-500'
                }`}>
                  {page.path} • {page.status}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-white rounded-lg shadow">
          {currentPage && (
            <div className="p-6">
              {/* Page Header */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[#0A0A23] mb-2">
                  {currentPage.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Path: {currentPage.path}</span>
                  <span>Last modified: {currentPage.lastModified}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    currentPage.status === 'published' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {currentPage.status}
                  </span>
                </div>
              </div>

              {/* Content Editor */}
              {!previewMode ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0A0A23] mb-2">
                      Page Content
                    </label>
                    <textarea
                      value={content || currentPage.content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={20}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A0A23] focus:border-[#0A0A23] font-mono text-sm"
                      placeholder="Enter your content here..."
                    />
                  </div>

                  {/* Toolbar */}
                  <div className="flex gap-2 p-3 bg-gray-50 rounded-lg">
                    <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50">
                      Bold
                    </button>
                    <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50">
                      Italic
                    </button>
                    <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50">
                      Link
                    </button>
                    <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50">
                      Image
                    </button>
                    <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50">
                      List
                    </button>
                  </div>
                </div>
              ) : (
                /* Preview Mode */
                <div className="prose max-w-none">
                  <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
                    <h4 className="text-lg font-semibold text-[#0A0A23] mb-4">Preview</h4>
                    <div className="bg-white p-4 rounded border">
                      {content || currentPage.content}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* SEO Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-[#0A0A23] mb-4">SEO Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#0A0A23] mb-2">
              Meta Title
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A0A23] focus:border-[#0A0A23]"
              placeholder="Enter meta title..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0A0A23] mb-2">
              Meta Description
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A0A23] focus:border-[#0A0A23]"
              placeholder="Enter meta description..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0A0A23] mb-2">
              Keywords
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A0A23] focus:border-[#0A0A23]"
              placeholder="Enter keywords separated by commas..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0A0A23] mb-2">
              Canonical URL
            </label>
            <input
              type="url"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A0A23] focus:border-[#0A0A23]"
              placeholder="Enter canonical URL..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentEditor; 