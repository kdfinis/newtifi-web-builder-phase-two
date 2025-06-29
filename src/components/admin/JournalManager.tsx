import React, { useState } from 'react';

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
  status: 'draft' | 'published' | 'missing';
  views: number;
  downloads: number;
  featured: boolean;
  category: 'journal' | 'news';
  volume?: string;
}

interface Journal {
  id: string;
  title: string;
  issn: string;
  description: string;
  status: 'active' | 'inactive';
  articles: string[];
}

interface JournalManagerProps {
  articles: Article[];
  journals: Journal[];
  onRefresh: () => void;
}

const statusColor = (status: string) => {
  if (status === 'published') return 'bg-green-500';
  if (status === 'draft') return 'bg-orange-400';
  if (status === 'missing') return 'bg-red-500';
  return 'bg-gray-300';
};

const JournalManager: React.FC<JournalManagerProps> = ({ articles, journals, onRefresh }) => {
  const [tab, setTab] = useState<'volumes' | 'issues' | 'articles'>('articles');

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-4 border-b mb-4">
        {['volumes', 'issues', 'articles'].map((t) => (
          <button
            key={t}
            className={`px-4 py-2 font-semibold border-b-2 ${tab === t ? 'border-[#0A0A23] text-[#0A0A23]' : 'border-transparent text-gray-500'}`}
            onClick={() => setTab(t as any)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Articles Table */}
      {tab === 'articles' && (
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-xl font-bold">Articles</div>
            <button className="bg-[#0A0A23] text-white px-4 py-2 rounded shadow hover:bg-[#1a1a40]">+ Add Article</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 font-mono">Title</th>
                  <th className="p-2">Volume</th>
                  <th className="p-2">Author(s)</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Preview</th>
                </tr>
              </thead>
              <tbody>
                {articles.length === 0 ? (
                  <tr><td colSpan={6} className="text-center text-gray-400">No articles found.</td></tr>
                ) : (
                  articles.map((a) => (
                    <tr key={a.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 font-serif text-[#0A0A23]">{a.title || 'N/A'}</td>
                      <td className="p-2">{a.volume || 'N/A'}</td>
                      <td className="p-2">{a.author || 'N/A'}</td>
                      <td className="p-2">{a.date || 'N/A'}</td>
                      <td className="p-2">
                        <span className={`inline-block w-2 h-2 rounded-full mr-2 align-middle ${statusColor(a.status)}`}></span>
                        {a.status || 'N/A'}
                      </td>
                      <td className="p-2">
                        {/* PDF preview thumbnail placeholder */}
                        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">PDF</div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* Volumes and Issues tabs can be implemented similarly if real data is available */}
    </div>
  );
};

export default JournalManager; 