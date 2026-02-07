import React, { useState } from 'react';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  type: 'news' | 'event' | 'update' | 'announcement';
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  publishDate: string;
  author: string;
  views: number;
  featured: boolean;
  tags: string[];
  imageUrl?: string;
  externalLink?: string;
}

const NewsManager: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);

  const filters = [
    { id: 'all', name: 'All Items', count: news.length },
    { id: 'news', name: 'News', count: news.filter(n => n.type === 'news').length },
    { id: 'event', name: 'Events', count: news.filter(n => n.type === 'event').length },
    { id: 'update', name: 'Updates', count: news.filter(n => n.type === 'update').length },
    { id: 'announcement', name: 'Announcements', count: news.filter(n => n.type === 'announcement').length },
    { id: 'draft', name: 'Drafts', count: news.filter(n => n.status === 'draft').length },
    { id: 'published', name: 'Published', count: news.filter(n => n.status === 'published').length },
    { id: 'scheduled', name: 'Scheduled', count: news.filter(n => n.status === 'scheduled').length }
  ];

  const filteredNews = news.filter(item => {
    if (selectedFilter === 'all') return true;
    return item.type === selectedFilter || item.status === selectedFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-700';
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      case 'archived': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'news': return '📰';
      case 'event': return '📅';
      case 'update': return '🔄';
      case 'announcement': return '📢';
      default: return '📄';
    }
  };

  const handleAddNews = () => {
    setShowAddForm(true);
    setEditingItem(null);
  };

  const handleEditNews = (item: NewsItem) => {
    setEditingItem(item);
    setShowAddForm(true);
  };

  const handleSaveNews = async (newsData: Partial<NewsItem>) => {
    try {
      if (editingItem) {
        // Update existing news
        const response = await fetch(`/api/admin/news/${editingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newsData)
        });
        if (response.ok) {
          setNews(prev => prev.map(n => n.id === editingItem.id ? { ...n, ...newsData } : n));
        }
      } else {
        // Create new news
        const response = await fetch('/api/admin/news', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newsData)
        });
        if (response.ok) {
          const newItem = await response.json();
          setNews(prev => [...prev, newItem]);
        }
      }
      setShowAddForm(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving news:', error);
      alert('Failed to save news item');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#0A0A23]">News & Events Manager</h2>
        <div className="flex gap-3">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            {viewMode === 'grid' ? '📋 List' : '🔲 Grid'}
          </button>
          <button
            onClick={handleAddNews}
            className="px-4 py-2 bg-[#0A0A23] text-white rounded-md hover:bg-[#1a1a40]"
          >
            + Add News
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id)}
            className={`px-4 py-2 rounded-full text-base font-medium whitespace-nowrap ${
              selectedFilter === filter.id
                ? 'bg-[#0A0A23] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter.name} ({filter.count})
          </button>
        ))}
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-base font-light uppercase tracking-wide text-[#0A0A23] mb-4">
            {editingItem ? 'Edit News Item' : 'Add News Item'}
          </h3>
          <NewsForm
            news={editingItem}
            onSave={handleSaveNews}
            onCancel={() => {
              setShowAddForm(false);
              setEditingItem(null);
            }}
          />
        </div>
      )}

      {/* News Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <NewsCard
              key={item.id}
              item={item}
              onEdit={() => handleEditNews(item)}
              getStatusColor={getStatusColor}
              getTypeIcon={getTypeIcon}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Publish Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredNews.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-base">{getTypeIcon(item.type)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-base font-medium text-[#0A0A23]">{item.title}</div>
                    <div className="text-base text-gray-500">{item.author}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-light uppercase tracking-wide rounded-full ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500">
                    {item.publishDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500">
                    {item.views}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base font-medium">
                    <button
                      onClick={() => handleEditNews(item)}
                      className="text-[#0A0A23] hover:text-[#1a1a40] mr-3"
                    >
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredNews.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <p className="text-gray-600 font-medium">No news items found</p>
          <p className="text-base text-gray-500 mt-1">Create your first news item to get started</p>
        </div>
      )}
    </div>
  );
};

// News Card Component
const NewsCard: React.FC<{
  item: NewsItem;
  onEdit: () => void;
  getStatusColor: (status: string) => string;
  getTypeIcon: (type: string) => string;
}> = ({ item, onEdit, getStatusColor, getTypeIcon }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
    {item.imageUrl && (
      <div className="h-48 bg-gray-200">
        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
      </div>
    )}
    <div className="p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-base">{getTypeIcon(item.type)}</span>
        <span className={`inline-flex px-2 py-1 text-xs font-light uppercase tracking-wide rounded-full ${getStatusColor(item.status)}`}>
          {item.status}
        </span>
      </div>
      <h3 className="font-light uppercase tracking-wide text-[#0A0A23] mb-2 line-clamp-2">{item.title}</h3>
      <p className="text-base text-gray-600 mb-3 line-clamp-3">{item.content}</p>
      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
        <span>{item.author}</span>
        <span>{item.publishDate}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{item.views} views</span>
        <button
          onClick={onEdit}
          className="text-base text-[#0A0A23] hover:text-[#1a1a40] font-medium"
        >
          Edit
        </button>
      </div>
    </div>
  </div>
);

// News Form Component
const NewsForm: React.FC<{
  news: NewsItem | null;
  onSave: (data: Partial<NewsItem>) => void;
  onCancel: () => void;
}> = ({ news, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: news?.title || '',
    content: news?.content || '',
    type: news?.type || 'news',
    status: news?.status || 'draft',
    publishDate: news?.publishDate || '',
    author: news?.author || '',
    featured: news?.featured || false,
    tags: news?.tags?.join(', ') || '',
    imageUrl: news?.imageUrl || '',
    externalLink: news?.externalLink || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-base font-medium text-[#0A0A23] mb-1">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A0A23]"
            required
          />
        </div>
        <div>
          <label className="block text-base font-medium text-[#0A0A23] mb-1">Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as NewsItem['type'] })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A0A23]"
          >
            <option value="news">News</option>
            <option value="event">Event</option>
            <option value="update">Update</option>
            <option value="announcement">Announcement</option>
          </select>
        </div>
        <div>
          <label className="block text-base font-medium text-[#0A0A23] mb-1">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as NewsItem['status'] })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A0A23]"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="scheduled">Scheduled</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div>
          <label className="block text-base font-medium text-[#0A0A23] mb-1">Publish Date</label>
          <input
            type="datetime-local"
            value={formData.publishDate}
            onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A0A23]"
          />
        </div>
        <div>
          <label className="block text-base font-medium text-[#0A0A23] mb-1">Author</label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A0A23]"
          />
        </div>
        <div>
          <label className="block text-base font-medium text-[#0A0A23] mb-1">Image URL</label>
          <input
            type="url"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A0A23]"
            placeholder="Enter URL..."
          />
        </div>
      </div>
      
      <div>
        <label className="block text-base font-medium text-[#0A0A23] mb-1">Content</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={6}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A0A23]"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-base font-medium text-[#0A0A23] mb-1">Tags</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A0A23]"
            placeholder="tag1, tag2, tag3"
          />
        </div>
        <div>
          <label className="block text-base font-medium text-[#0A0A23] mb-1">External Link</label>
          <input
            type="url"
            value={formData.externalLink}
            onChange={(e) => setFormData({ ...formData, externalLink: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A0A23]"
            placeholder="Enter URL..."
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="featured"
          checked={formData.featured}
          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
          className="h-4 w-4 text-[#0A0A23] focus:ring-[#0A0A23] border-gray-300 rounded"
        />
        <label htmlFor="featured" className="ml-2 block text-base text-[#0A0A23]">
          Featured item
        </label>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-[#0A0A23] text-white rounded-md hover:bg-[#1a1a40]"
        >
          {news ? 'Update' : 'Create'} News Item
        </button>
      </div>
    </form>
  );
};

export default NewsManager; 