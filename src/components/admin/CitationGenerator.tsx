import React, { useState } from 'react';

interface CitationData {
  title: string;
  authors: string[];
  journal?: string;
  year: string;
  doi?: string;
  url?: string;
}

interface CitationGeneratorProps {
  citationData?: CitationData;
}

const CitationGenerator: React.FC<CitationGeneratorProps> = ({ citationData }) => {
  const [format, setFormat] = useState<'APA' | 'MLA' | 'Chicago' | 'BibTeX'>('APA');
  const [doi, setDoi] = useState(citationData?.doi || '');
  const [isValidDoi, setIsValidDoi] = useState<boolean | null>(null);

  const generateCitation = (data: CitationData | undefined, format: string): string => {
    if (!data) return 'N/A - No citation data available';
    
    const { title, authors, journal, year, doi, url } = data;
    
    switch (format) {
      case 'APA':
        return `${authors.join(', ')} (${year}). ${title}. ${journal || 'N/A'}. ${doi ? `https://doi.org/${doi}` : url || 'N/A'}`;
      case 'MLA':
        return `${authors.join(', ')}. "${title}." ${journal || 'N/A'}, ${year}. ${doi ? `https://doi.org/${doi}` : url || 'N/A'}`;
      case 'Chicago':
        return `${authors.join(', ')}, "${title}," ${journal || 'N/A'} (${year}): ${doi ? `https://doi.org/${doi}` : url || 'N/A'}`;
      case 'BibTeX':
        return `@article{${doi?.replace(/[^a-zA-Z0-9]/g, '') || 'article'},\n  title={${title}},\n  author={${authors.join(' and ')}},\n  journal={${journal || 'N/A'}},\n  year={${year}},\n  doi={${doi || 'N/A'}},\n  url={${url || 'N/A'}}\n}`;
      default:
        return 'N/A';
    }
  };

  const validateDoi = (doi: string): boolean => {
    // Basic DOI validation pattern
    const doiPattern = /^10\.\d{4,}(?:\.\d+)*\/\S+(?:\?\S+)?$/;
    return doiPattern.test(doi);
  };

  const handleDoiChange = (value: string) => {
    setDoi(value);
    if (value) {
      setIsValidDoi(validateDoi(value));
    } else {
      setIsValidDoi(null);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Could add toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const citation = generateCitation(citationData, format);

  return (
    <div className="bg-white border rounded-lg p-4 max-w-2xl">
      <h3 className="font-semibold text-lg mb-4">Citation & Metadata Generator</h3>
      
      <div className="space-y-4">
        {/* Format Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">Citation Format</label>
          <select 
            value={format} 
            onChange={(e) => setFormat(e.target.value as any)}
            className="w-full border rounded p-2 bg-white"
          >
            <option value="APA">APA</option>
            <option value="MLA">MLA</option>
            <option value="Chicago">Chicago</option>
            <option value="BibTeX">BibTeX</option>
          </select>
        </div>

        {/* DOI Validator */}
        <div>
          <label className="block text-sm font-medium mb-2">DOI Validator</label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={doi}
              onChange={(e) => handleDoiChange(e.target.value)}
              placeholder="Enter DOI (e.g., 10.1234/example.2024.001)"
              className={`flex-1 border rounded p-2 ${
                isValidDoi === true ? 'border-green-500' : 
                isValidDoi === false ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {isValidDoi !== null && (
              <span className={`px-2 py-2 rounded text-sm ${
                isValidDoi ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {isValidDoi ? '✓ Valid' : '✗ Invalid'}
              </span>
            )}
          </div>
        </div>

        {/* Citation Output */}
        <div>
          <label className="block text-sm font-medium mb-2">Generated Citation</label>
          <div className="relative">
            <textarea
              value={citation}
              readOnly
              className="w-full border rounded p-3 bg-gray-50 font-mono text-sm min-h-[100px] resize-none"
              style={{ fontFamily: 'monospace' }}
            />
            <button
              onClick={() => copyToClipboard(citation)}
              className="absolute top-2 right-2 bg-[#0A0A23] text-white px-3 py-1 rounded text-xs hover:bg-[#1a1a40] transition-colors"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Metadata Preview */}
        {citationData && (
          <div className="bg-gray-50 rounded p-3">
            <h4 className="font-medium text-sm mb-2">Metadata Preview</h4>
            <div className="text-xs space-y-1">
              <div><strong>Title:</strong> {citationData.title || 'N/A'}</div>
              <div><strong>Authors:</strong> {citationData.authors?.join(', ') || 'N/A'}</div>
              <div><strong>Journal:</strong> {citationData.journal || 'N/A'}</div>
              <div><strong>Year:</strong> {citationData.year || 'N/A'}</div>
              <div><strong>DOI:</strong> {citationData.doi || 'N/A'}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CitationGenerator; 