import React, { useState } from 'react';

interface MediaItem {
  id: string;
  name: string;
  url: string;
  size: string;
  type: 'image' | 'pdf' | 'pattern' | 'logo';
  categories: string[];
  usedOn: string[];
}

interface MediaLibraryProps {
  media?: MediaItem[];
}

const MediaLibrary: React.FC<MediaLibraryProps> = ({ media = [] }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
  const [zoom, setZoom] = useState(1);

  const filters = [
    { id: 'all', label: 'All Media' },
    { id: 'homepage', label: 'Used on Homepage' },
    { id: 'journal', label: 'For Journal' },
    { id: 'hex-pattern', label: 'Hex Pattern' },
    { id: 'scholarship', label: 'Scholarship Flyers' },
  ];

  const filteredMedia = selectedFilter === 'all' 
    ? media 
    : media.filter(item => item.categories.includes(selectedFilter) || item.usedOn.includes(selectedFilter));

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'pattern': return '🔷';
      case 'logo': return '🏷️';
      default: return '🖼️';
    }
  };

  if (previewItem) {
    return (
      <div className="fixed inset-0 bg-[#0A0A23] z-50 flex items-center justify-center">
        <div className="relative max-w-4xl max-h-full p-4">
          <button
            onClick={() => setPreviewItem(null)}
            className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
          >
            ✕
          </button>
          <div className="flex items-center justify-center mb-4">
            <button
              onClick={() => setZoom(Math.max(0.5, zoom - 0.2))}
              className="bg-white/20 text-white px-3 py-1 rounded mr-2"
            >
              -
            </button>
            <span className="text-white text-sm">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom(Math.min(3, zoom + 0.2))}
              className="bg-white/20 text-white px-3 py-1 rounded ml-2"
            >
              +
            </button>
          </div>
          <div className="overflow-auto max-h-[80vh]">
            <img
              src={previewItem.url}
              alt={previewItem.name}
              style={{ transform: `scale(${zoom})` }}
              className="transition-transform duration-200"
            />
          </div>
          <div className="text-white text-center mt-4">
            <h3 className="font-semibold">{previewItem.name}</h3>
            <p className="text-sm text-gray-300">{previewItem.size}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex space-x-6">
      {/* Sidebar Filters */}
      <div className="w-48 bg-white border rounded-lg p-4 h-fit">
        <h3 className="font-semibold mb-4">Filters</h3>
        <div className="space-y-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                selectedFilter === filter.id 
                  ? 'bg-[#0A0A23] text-white' 
                  : 'hover:bg-gray-100'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Media & Asset Library</h2>
          <button className="bg-[#0A0A23] text-white px-4 py-2 rounded shadow">
            + Upload Media
          </button>
        </div>

        {filteredMedia.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <div className="text-4xl mb-2">📁</div>
            <p>No media found for this filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                className="bg-white border rounded-lg p-3 group cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="relative mb-2">
                  <div className="w-full h-24 bg-gray-100 rounded flex items-center justify-center text-2xl">
                    {item.type === 'image' ? (
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.style.display = 'none';
                          const nextElement = target.nextElementSibling as HTMLElement;
                          if (nextElement) nextElement.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className="hidden items-center justify-center text-2xl">
                      {getFileIcon(item.type)}
                    </div>
                  </div>
                  
                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewItem(item);
                      }}
                      className="bg-white text-black px-2 py-1 rounded text-xs hover:bg-gray-100"
                    >
                      View
                    </button>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="bg-white text-black px-2 py-1 rounded text-xs hover:bg-gray-100"
                    >
                      Replace
                    </button>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
                <div className="text-xs">
                  <div className="font-medium truncate">{item.name}</div>
                  <div className="text-gray-500">{item.size}</div>
                  <div className="text-gray-400 mt-1">
                    {item.categories.slice(0, 2).join(', ')}
                    {item.categories.length > 2 && '...'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaLibrary; 