import React, { useState } from 'react';

interface ContentBlock {
  id: string;
  type: 'header' | 'text' | 'image' | 'cta';
  content: string;
  alignment?: 'left' | 'center' | 'right';
  imageUrl?: string;
  imageAlt?: string;
}

interface PageContent {
  id: string;
  name: string;
  blocks: ContentBlock[];
  background: 'white' | 'hex-pattern' | 'teal-gradient' | 'none';
}

interface ContentEditorProps {
  pages?: PageContent[];
}

const ContentEditor: React.FC<ContentEditorProps> = ({ pages = [] }) => {
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [editingBlock, setEditingBlock] = useState<ContentBlock | null>(null);
  const [selectedBackground, setSelectedBackground] = useState<'white' | 'hex-pattern' | 'teal-gradient' | 'none'>('white');

  const layoutPresets = [
    {
      name: 'Full-width Intro',
      blocks: [
        { id: '1', type: 'header' as const, content: 'Welcome to NewTIFI' },
        { id: '2', type: 'text' as const, content: 'Leading research and legal commentary in investment management.' }
      ]
    },
    {
      name: 'Two-column Text + Image',
      blocks: [
        { id: '1', type: 'header' as const, content: 'About Us' },
        { id: '2', type: 'text' as const, content: 'Our mission and values...' },
        { id: '3', type: 'image' as const, content: '', imageUrl: '', imageAlt: 'About image' }
      ]
    },
    {
      name: 'Call-to-action Cards',
      blocks: [
        { id: '1', type: 'header' as const, content: 'Join NewTIFI' },
        { id: '2', type: 'cta' as const, content: 'Become a member today' }
      ]
    }
  ];

  const backgroundOptions = [
    { value: 'white', label: 'White', preview: 'bg-white' },
    { value: 'hex-pattern', label: 'Hex Pattern', preview: 'bg-gray-100' },
    { value: 'teal-gradient', label: 'Teal Gradient', preview: 'bg-gradient-to-r from-teal-400 to-teal-600' },
    { value: 'none', label: 'None', preview: 'bg-transparent' }
  ];

  const currentPage = pages.find(p => p.id === selectedPage);

  const addBlock = (type: ContentBlock['type']) => {
    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      type,
      content: '',
      alignment: 'left'
    };
    // In real implementation, this would update the page content
  };

  const updateBlock = (blockId: string, updates: Partial<ContentBlock>) => {
    // In real implementation, this would update the specific block
  };

  const previewPage = () => {
    if (selectedPage) {
      window.open(`/preview/${selectedPage}`, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Static Content Editor</h2>
        <button 
          className="bg-[#0A0A23] text-white px-4 py-2 rounded shadow"
          onClick={previewPage}
        >
          Preview
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Page Selection */}
        <div className="lg:col-span-1">
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-semibold mb-4">Pages</h3>
            <div className="space-y-2">
              {pages.length === 0 ? (
                <p className="text-gray-400 text-sm">No pages found.</p>
              ) : (
                pages.map((page) => (
                  <button
                    key={page.id}
                    onClick={() => setSelectedPage(page.id)}
                    className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                      selectedPage === page.id 
                        ? 'bg-[#0A0A23] text-white' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {page.name}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Layout Presets */}
          <div className="bg-white border rounded-lg p-4 mt-4">
            <h3 className="font-semibold mb-4">Layout Presets</h3>
            <div className="space-y-2">
              {layoutPresets.map((preset) => (
                <button
                  key={preset.name}
                  className="w-full text-left px-3 py-2 rounded text-sm hover:bg-gray-100 border"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Background Pattern */}
          <div className="bg-white border rounded-lg p-4 mt-4">
            <h3 className="font-semibold mb-4">Background Pattern</h3>
            <div className="space-y-2">
              {backgroundOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedBackground(option.value as any)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded text-sm transition-colors ${
                    selectedBackground === option.value 
                      ? 'bg-[#0A0A23] text-white' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className={`w-6 h-6 rounded ${option.preview}`}></div>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Editor */}
        <div className="lg:col-span-2">
          <div className="bg-white border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">
                {currentPage ? currentPage.name : 'Select a page to edit'}
              </h3>
              <div className="flex space-x-2">
                <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">+ Header</button>
                <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">+ Text</button>
                <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">+ Image</button>
                <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">+ CTA</button>
              </div>
            </div>

            {!currentPage ? (
              <div className="text-center text-gray-400 py-12">
                <div className="text-4xl mb-2">📄</div>
                <p>Select a page from the sidebar to start editing.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {currentPage.blocks.length === 0 ? (
                  <div className="text-center text-gray-400 py-8">
                    <p>No content blocks. Add some blocks to get started.</p>
                  </div>
                ) : (
                  currentPage.blocks.map((block) => (
                    <div key={block.id} className="border rounded p-3 hover:bg-gray-50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-500 uppercase">{block.type}</span>
                        <div className="flex space-x-1">
                          <button className="text-gray-400 hover:text-gray-600 text-xs">✏️</button>
                          <button className="text-gray-400 hover:text-red-600 text-xs">🗑️</button>
                        </div>
                      </div>
                      <div className="text-sm">
                        {block.type === 'header' && (
                          <h4 className="font-semibold">{block.content || 'Header text...'}</h4>
                        )}
                        {block.type === 'text' && (
                          <p>{block.content || 'Text content...'}</p>
                        )}
                        {block.type === 'image' && (
                          <div className="text-center">
                            {block.imageUrl ? (
                              <img src={block.imageUrl} alt={block.imageAlt} className="max-w-full h-32 object-cover rounded" />
                            ) : (
                              <div className="w-full h-32 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                                📷 Image
                              </div>
                            )}
                          </div>
                        )}
                        {block.type === 'cta' && (
                          <button className="bg-[#0A0A23] text-white px-4 py-2 rounded">
                            {block.content || 'Call to Action'}
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentEditor; 