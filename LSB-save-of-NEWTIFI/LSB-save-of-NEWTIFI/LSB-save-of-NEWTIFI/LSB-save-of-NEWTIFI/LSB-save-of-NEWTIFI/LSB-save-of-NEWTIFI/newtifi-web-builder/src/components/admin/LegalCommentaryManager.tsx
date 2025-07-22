import React, { useState } from 'react';

interface LegalCommentary {
  id: string;
  title: string;
  content: string;
  category: 'RAIF' | 'SICAR' | 'SIF' | 'ELTIF' | 'AIFM' | 'General';
  status: 'draft' | 'published' | 'review' | 'archived';
  author: string;
  publishDate: string;
  lastUpdated: string;
  views: number;
  downloads: number;
  tags: string[];
  relatedArticles: string[];
  legalReferences: string[];
  summary: string;
  featured: boolean;
}

const LegalCommentaryManager: React.FC = () => {
  const [commentaries, setCommentaries] = useState<LegalCommentary[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<LegalCommentary | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Categories', count: commentaries.length },
    { id: 'RAIF', name: 'RAIF Code', count: commentaries.filter(c => c.category === 'RAIF').length },
    { id: 'SICAR', name: 'SICAR', count: commentaries.filter(c => c.category === 'SICAR').length },
    { id: 'SIF', name: 'SIF', count: commentaries.filter(c => c.category === 'SIF').length },
    { id: 'ELTIF', name: 'ELTIF', count: commentaries.filter(c => c.category === 'ELTIF').length },
    { id: 'AIFM', name: 'AIFM', count: commentaries.filter(c => c.category === 'AIFM').length },
    { id: 'General', name: 'General', count: commentaries.filter(c => c.category === 'General').length }
  ];

  const statuses = [
    { id: 'all', name: 'All Status', count: commentaries.length },
    { id: 'draft', name: 'Draft', count: commentaries.filter(c => c.status === 'draft').length },
    { id: 'published', name: 'Published', count: commentaries.filter(c => c.status === 'published').length },
    { id: 'review', name: 'Under Review', count: commentaries.filter(c => c.status === 'review').length },
    { id: 'archived', name: 'Archived', count: commentaries.filter(c => c.status === 'archived').length }
  ];

  const filteredCommentaries = commentaries.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-700';
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'review': return 'bg-yellow-100 text-yellow-700';
      case 'archived': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'RAIF': return 'bg-blue-100 text-blue-700';
      case 'SICAR': return 'bg-purple-100 text-purple-700';
      case 'SIF': return 'bg-indigo-100 text-indigo-700';
      case 'ELTIF': return 'bg-teal-100 text-teal-700';
      case 'AIFM': return 'bg-orange-100 text-orange-700';
      case 'General': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleAddCommentary = () => {
    setShowAddForm(true);
    setEditingItem(null);
  };

  const handleEditCommentary = (item: LegalCommentary) => {
    setEditingItem(item);
    setShowAddForm(true);
  };

  const handleSaveCommentary = async (commentaryData: Partial<LegalCommentary>) => {
    try {
      if (editingItem) {
        // Update existing commentary
        const response = await fetch(`/api/admin/legal-commentary/${editingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(commentaryData)
        });
        if (response.ok) {
          setCommentaries(prev => prev.map(c => c.id === editingItem.id ? { ...c, ...commentaryData } : c));
        }
      } else {
        // Create new commentary
        const response = await fetch('/api/admin/legal-commentary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(commentaryData)
        });
        if (response.ok) {
          const newItem = await response.json();
          setCommentaries(prev => [...prev, newItem]);
        }
      }
      setShowAddForm(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving commentary:', error);
      alert('Failed to save legal commentary');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#0A0A23]">Legal Commentary Manager</h2>
        <div className="flex gap-3">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            {viewMode === 'grid' ? '📋 List' : '🔲 Grid'}
          </button>
          <button
            onClick={handleAddCommentary}
            className="px-4 py-2 bg-[#0A0A23] text-white rounded-md hover:bg-[#1a1a40]"
          >
            + Add Commentary
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search commentaries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A0A23]"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-[#0A0A23] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {statuses.map((status) => (
            <button
              key={status.id}
              onClick={() => setSelectedStatus(status.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                selectedStatus === status.id
                  ? 'bg-[#0A0A23] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status.name} ({status.count})
            </button>
          ))}
        </div>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-[#0A0A23] mb-4">
            {editingItem ? 'Edit Legal Commentary' : 'Add Legal Commentary'}
          </h3>
          <LegalCommentaryForm
            commentary={editingItem}
            onSave={handleSaveCommentary}
            onCancel={() => {
              setShowAddForm(false);
              setEditingItem(null);
            }}
          />
        </div>
      )}

      {/* Commentary Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommentaries.map((item) => (
            <CommentaryCard
              key={item.id}
              item={item}
              onEdit={() => handleEditCommentary(item)}
              getStatusColor={getStatusColor}
              getCategoryColor={getCategoryColor}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCommentaries.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-[#0A0A23]">{item.title}</div>
                    <div className="text-sm text-gray-500 line-clamp-2">{item.summary}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.views}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEditCommentary(item)}
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

      {filteredCommentaries.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-600 font-medium">No legal commentaries found</p>
          <p className="text-sm text-gray-500 mt-1">Create your first legal commentary to get started</p>
        </div>
      )}
    </div>
  );
};

// Commentary Card Component
const CommentaryCard: React.FC<{
  item: LegalCommentary;
  onEdit: () => void;
  getStatusColor: (status: string) => string;
  getCategoryColor: (category: string) => string;
}> = ({ item, onEdit, getStatusColor, getCategoryColor }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(item.category)}`}>
          {item.category}
        </span>
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
          {item.status}
        </span>
      </div>
      <h3 className="font-semibold text-[#0A0A23] mb-2 line-clamp-2">{item.title}</h3>
      <p className="text-sm text-gray-600 mb-3 line-clamp-3">{item.summary}</p>
      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
        <span>{item.author}</span>
        <span>{item.publishDate}</span>
      </div>
      <div className="flex flex-wrap gap-1 mb-3">
        {item.tags.slice(0, 3).map((tag, index) => (
          <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
            {tag}
          </span>
        ))}
        {item.tags.length > 3 && (
          <span className="text-xs text-gray-500">+{item.tags.length - 3} more</span>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>{item.views} views</span>
          <span>{item.downloads} downloads</span>
        </div>
        <button
          onClick={onEdit}
          className="text-sm text-[#0A0A23] hover:text-[#1a1a40] font-medium"
        >
          Edit
        </button>
      </div>
    </div>
  </div>
);

// Legal Commentary Form Component
const LegalCommentaryForm: React.FC<{
  commentary: LegalCommentary | null;
  onSave: (data: Partial<LegalCommentary>) => void;
  onCancel: () => void;
}> = ({ commentary, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: commentary?.title || '',
    content: commentary?.content || '',
    summary: commentary?.summary || '',
    category: commentary?.category || 'General',
    status: commentary?.status || 'draft',
    author: commentary?.author || '',
    tags: commentary?.tags?.join(', ') || '',
    legalReferences: commentary?.legalReferences?.join(', ') || '',
    relatedArticles: commentary?.relatedArticles?.join(', ') || '',
    featured: commentary?.featured || false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      legalReferences: formData.legalReferences.split(',').map(ref => ref.trim()).filter(ref => ref),
      relatedArticles: formData.relatedArticles.split(',').map(article => article.trim()).filter(article => article)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#0A0A23] mb-1">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A0A23]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0A0A23] mb-1">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A0A23]"
          >
            <option value="RAIF">RAIF Code</option>
            <option value="SICAR">SICAR</option>
            <option value="SIF">SIF</option>
            <option value="ELTIF">ELTIF</option>
            <option value="AIFM">AIFM</option>
            <option value="General">General</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0A0A23] mb-1">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A0A23]"
          >
            <option value="draft">Draft</option>
            <option value="review">Under Review</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0A0A23] mb-1">Author</label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A0A23]"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-[#0A0A23] mb-1">Summary</label>
        <textarea
          value={formData.summary}
          onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A0A23]"
          placeholder="Brief summary of the legal commentary..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#0A0A23] mb-1">Content</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={10}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A0A23]"
          placeholder="Detailed legal commentary content..."
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#0A0A23] mb-1">Tags</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A0A23]"
            placeholder="tag1, tag2, tag3"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0A0A23] mb-1">Legal References</label>
          <input
            type="text"
            value={formData.legalReferences}
            onChange={(e) => setFormData({ ...formData, legalReferences: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A0A23]"
            placeholder="Reference 1, Reference 2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#0A0A23] mb-1">Related Articles</label>
        <input
          type="text"
          value={formData.relatedArticles}
          onChange={(e) => setFormData({ ...formData, relatedArticles: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A0A23]"
          placeholder="Article ID 1, Article ID 2"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="featured"
          checked={formData.featured}
          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
          className="h-4 w-4 text-[#0A0A23] focus:ring-[#0A0A23] border-gray-300 rounded"
        />
        <label htmlFor="featured" className="ml-2 block text-sm text-[#0A0A23]">
          Featured commentary
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
          {commentary ? 'Update' : 'Create'} Commentary
        </button>
      </div>
    </form>
  );
};

export default LegalCommentaryManager; 