import React, { useState } from 'react';

const raifArticles = [
  // This should be fetched from backend in real use
  { id: 'art3', label: 'Art. 3' },
  { id: 'art4_1', label: 'Art. 4.1' },
  { id: 'art5', label: 'Art. 5' },
];

const LegalCommentaryManager: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(raifArticles[0]?.id || null);
  const [content, setContent] = useState('');
  const [charCount, setCharCount] = useState(0);

  // Placeholder for WYSIWYG editor
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setCharCount(e.target.value.length);
  };

  return (
    <div className="flex bg-white rounded-lg shadow min-h-[400px]">
      {/* Sidebar */}
      <div className="w-48 border-r p-4 bg-gray-50">
        <div className="font-bold mb-2">RAIF Code</div>
        <ul className="space-y-2">
          {raifArticles.map((a) => (
            <li key={a.id}>
              <button
                className={`w-full text-left px-2 py-1 rounded ${selected === a.id ? 'bg-[#0A0A23] text-white' : 'hover:bg-gray-200'}`}
                onClick={() => setSelected(a.id)}
              >
                {a.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* Main Pane */}
      <div className="flex-1 p-6 relative" style={{ backgroundImage: 'url(/assets/images/grid-pattern.svg)', backgroundRepeat: 'repeat', backgroundSize: 'auto' }}>
        <div className="mb-2 flex items-center justify-between">
          <div className="font-serif text-xl font-bold">{selected ? raifArticles.find(a => a.id === selected)?.label : 'N/A'}</div>
          <div className="text-sm text-gray-500">Contributor: <span className="underline cursor-pointer">N/A</span></div>
        </div>
        <textarea
          className="w-full min-h-[180px] border rounded p-3 font-mono bg-white/80"
          placeholder="Write commentary in Markdown..."
          value={content}
          onChange={handleContentChange}
        />
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <div>Character count: {charCount}</div>
          <div>Auto-save: <span className="text-green-500">N/A</span></div>
        </div>
        {/* Metadata and actions */}
        <div className="mt-4 flex gap-4 items-center">
          <input type="file" className="border rounded px-2 py-1" />
          <button className="bg-[#0A0A23] text-white px-4 py-2 rounded shadow">Save</button>
          <button className="bg-[#00C2CB] text-white px-4 py-2 rounded shadow">Preview</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded shadow">Publish</button>
        </div>
        <div className="mt-2 text-xs text-gray-400">Publish date: N/A | Version: N/A | Author contact: N/A</div>
      </div>
    </div>
  );
};

export default LegalCommentaryManager; 