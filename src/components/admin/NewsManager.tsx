import React, { useState } from 'react';

interface NewsItem {
  id: string;
  title: string;
  tag: 'News' | 'Event' | 'Update';
  date: string;
  excerpt: string;
  imageUrl?: string;
}

const NewsManager: React.FC = () => {
  // In real use, fetch news from backend
  const [news, setNews] = useState<NewsItem[]>([]);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [editContent, setEditContent] = useState('');

  if (editing) {
    return (
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
        <div className="font-bold text-xl mb-2">Edit News</div>
        <input
          className="w-full border rounded p-2 mb-2"
          value={editing.title}
          readOnly
        />
        <textarea
          className="w-full min-h-[120px] border rounded p-2 mb-2"
          value={editContent}
          onChange={e => setEditContent(e.target.value)}
        />
        <div className="flex gap-2">
          <button className="bg-[#0A0A23] text-white px-4 py-2 rounded shadow">Save</button>
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded shadow" onClick={() => setEditing(null)}>Cancel</button>
        </div>
        <div className="mt-2 text-xs text-gray-400">Publish date: {editing.date || 'N/A'} | Tag: {editing.tag}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="font-bold text-xl mb-4">News, Events & Updates</div>
      <div className="space-y-4 max-h-[500px] overflow-y-auto">
        {news.length === 0 ? (
          <div className="text-gray-400 text-sm">No news or updates found.</div>
        ) : (
          news.map(item => (
            <div key={item.id} className="flex bg-white rounded-lg shadow p-4 items-center gap-4">
              {item.imageUrl && (
                <img src={item.imageUrl} alt="" className="w-20 h-20 object-cover rounded" />
              )}
              <div className="flex-1">
                <div className="font-bold text-lg">{item.title}</div>
                <div className="text-xs text-gray-500 mb-1">{item.tag} • {item.date}</div>
                <div className="text-sm text-gray-700 mb-2">{item.excerpt}</div>
                <button className="bg-[#00C2CB] text-white px-3 py-1 rounded shadow text-xs" onClick={() => { setEditing(item); setEditContent(item.excerpt); }}>Edit</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NewsManager; 