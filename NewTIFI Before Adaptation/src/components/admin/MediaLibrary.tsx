import React, { useState, useEffect } from 'react';

interface MediaItem {
  id: string;
  name: string;
  type: 'image' | 'document' | 'video';
  url: string;
  size: string;
  uploadedAt: string;
  category: string;
  alt?: string;
}

const MediaLibrary: React.FC = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Initialize with existing media from the website
  useEffect(() => {
    const existingMedia: MediaItem[] = [
      // Logos and Branding
      {
        id: 'logo-1',
        name: 'NewTIFI Logo',
        type: 'image',
        url: '/assets/images/logo.png',
        size: '12KB',
        uploadedAt: '2025-01-27',
        category: 'branding',
        alt: 'NewTIFI Logo'
      },
      {
        id: 'logo-2',
        name: 'NewTIFI Logo and Text',
        type: 'image',
        url: '/assets/images/NewTiIFI Logo and Text.jpg',
        size: '87KB',
        uploadedAt: '2025-01-27',
        category: 'branding',
        alt: 'NewTIFI Logo with Text'
      },
      {
        id: 'logo-3',
        name: 'Logo JPG',
        type: 'image',
        url: '/assets/images/logo.jpg',
        size: '63KB',
        uploadedAt: '2025-01-27',
        category: 'branding',
        alt: 'NewTIFI Logo JPG'
      },
      // Team Photos
      {
        id: 'team-1',
        name: 'Karlo Definis',
        type: 'image',
        url: '/assets/images/team/karlo-definis.jpg',
        size: '140KB',
        uploadedAt: '2025-01-27',
        category: 'team',
        alt: 'Karlo Definis - Managing Partner'
      },
      {
        id: 'team-2',
        name: 'Delphine Filsack',
        type: 'image',
        url: '/assets/images/team/delphine-filsack.jpg',
        size: '44KB',
        uploadedAt: '2025-01-27',
        category: 'team',
        alt: 'Delphine Filsack - Partner'
      },
      {
        id: 'team-3',
        name: 'Delphine Filsack Large',
        type: 'image',
        url: '/assets/images/team/delphine-filsack-large.jpg',
        size: '44KB',
        uploadedAt: '2025-01-27',
        category: 'team',
        alt: 'Delphine Filsack - Partner (Large)'
      },
      {
        id: 'team-4',
        name: 'Ezechiel Havrenne',
        type: 'image',
        url: '/assets/images/team/ezechiel-havrenne.jpg',
        size: '1.4MB',
        uploadedAt: '2025-01-27',
        category: 'team',
        alt: 'Ezechiel Havrenne - Lecturer'
      },
      {
        id: 'team-5',
        name: 'Vlado Sutlovic',
        type: 'image',
        url: '/assets/images/team/vlado-sutlovic.jpeg',
        size: '209KB',
        uploadedAt: '2025-01-27',
        category: 'team',
        alt: 'Vlado Sutlovic'
      },
      // Location Photos
      {
        id: 'location-1',
        name: 'Luxembourg Philharmonie',
        type: 'image',
        url: '/assets/images/Lux-Philharmonie.jpeg',
        size: '65KB',
        uploadedAt: '2025-01-27',
        category: 'locations',
        alt: 'Luxembourg Philharmonie'
      },
      // Tech Images
      {
        id: 'tech-1',
        name: 'Energy Tech',
        type: 'image',
        url: '/images/energy-tech.jpg',
        size: '1.9MB',
        uploadedAt: '2025-01-27',
        category: 'tech',
        alt: 'Energy Technology'
      },
      {
        id: 'tech-2',
        name: 'Fin Tech',
        type: 'image',
        url: '/images/fin-tech.jpg',
        size: '2.7MB',
        uploadedAt: '2025-01-27',
        category: 'tech',
        alt: 'Financial Technology'
      },
      {
        id: 'tech-3',
        name: 'Food Tech',
        type: 'image',
        url: '/images/food-tech.jpg',
        size: '4.1MB',
        uploadedAt: '2025-01-27',
        category: 'tech',
        alt: 'Food Technology'
      },
      {
        id: 'tech-4',
        name: 'Health Tech',
        type: 'image',
        url: '/images/health-tech.jpg',
        size: '2.4MB',
        uploadedAt: '2025-01-27',
        category: 'tech',
        alt: 'Health Technology'
      },
      {
        id: 'tech-5',
        name: 'Network Meeting',
        type: 'image',
        url: '/images/network-meeting.jpg',
        size: '16KB',
        uploadedAt: '2025-01-27',
        category: 'tech',
        alt: 'Network Meeting'
      },
      // Graphics
      {
        id: 'graphic-1',
        name: 'Grid Pattern',
        type: 'image',
        url: '/assets/images/grid-pattern.svg',
        size: '244B',
        uploadedAt: '2025-01-27',
        category: 'graphics',
        alt: 'Grid Pattern SVG'
      }
    ];
    setMedia(existingMedia);
  }, []);

  const categories = [
    { id: 'all', name: 'All Media', count: media.length },
    { id: 'branding', name: 'Branding', count: media.filter(m => m.category === 'branding').length },
    { id: 'team', name: 'Team Photos', count: media.filter(m => m.category === 'team').length },
    { id: 'locations', name: 'Locations', count: media.filter(m => m.category === 'locations').length },
    { id: 'tech', name: 'Technology', count: media.filter(m => m.category === 'tech').length },
    { id: 'graphics', name: 'Graphics', count: media.filter(m => m.category === 'graphics').length }
  ];

  const filteredMedia = media.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.alt?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }

      const response = await fetch('/api/admin/upload-media', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Refresh media list
        const newMedia = await response.json();
        setMedia(prev => [...prev, ...newMedia]);
        alert('Files uploaded successfully');
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

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('URL copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#0A0A23]">Media Library</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search media..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A0A23]"
          />
          <input
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
            id="media-upload"
          />
          <label
            htmlFor="media-upload"
            className={`inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-[#0A0A23] hover:bg-[#1a1a40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A0A23] cursor-pointer ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {uploading ? 'Uploading...' : '+ Upload Media'}
          </label>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-base font-medium whitespace-nowrap ${
              selectedCategory === category.id
                ? 'bg-[#0A0A23] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name} ({category.count})
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMedia.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-square bg-gray-100 flex items-center justify-center">
              {item.type === 'image' ? (
                <img
                  src={item.url}
                  alt={item.alt || item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
              ) : (
                <div className="text-center p-4">
                  <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-base text-gray-500">{item.type.toUpperCase()}</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-[#0A0A23] mb-1 truncate">{item.name}</h3>
              <p className="text-base text-gray-500 mb-2">{item.size} • {item.uploadedAt}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(item.url)}
                  className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                >
                  Copy URL
                </button>
                <button
                  onClick={() => window.open(item.url, '_blank')}
                  className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMedia.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-gray-600 font-medium">No media found</p>
          <p className="text-base text-gray-500 mt-1">Try adjusting your search or category filter</p>
        </div>
      )}
    </div>
  );
};

export default MediaLibrary; 