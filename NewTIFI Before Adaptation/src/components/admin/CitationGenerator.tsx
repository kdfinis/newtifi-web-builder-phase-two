import React, { useState } from 'react';
import { URLS } from '@/lib/urls';

type CitationFormat = 'APA' | 'MLA' | 'Chicago' | 'BibTeX';

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
  const [format, setFormat] = useState<CitationFormat>('APA');
  const [doi, setDoi] = useState('');
  const [isValidDoi, setIsValidDoi] = useState<boolean | null>(null);

  const generateCitation = (data: CitationData | undefined, format: string): string => {
    if (!data) return 'No citation data available';
    
    switch (format) {
      case 'APA':
        return `${data.authors.join(', ')} (${data.year}). ${data.title}. ${data.journal || 'Journal'}. ${data.doi ? `${URLS.EXTERNAL.DOI_BASE}/${data.doi}` : ''}`;
      case 'MLA':
        return `${data.authors.join(', ')}. "${data.title}." ${data.journal || 'Journal'}, ${data.year}. ${data.doi ? `${URLS.EXTERNAL.DOI_BASE}/${data.doi}` : ''}`;
      case 'Chicago':
        return `${data.authors.join(', ')}. "${data.title}." ${data.journal || 'Journal'} ${data.year}. ${data.doi ? `${URLS.EXTERNAL.DOI_BASE}/${data.doi}` : ''}`;
      case 'BibTeX':
        return `@article{${data.doi || 'article'},\n  title={${data.title}},\n  author={${data.authors.join(' and ')}},\n  journal={${data.journal || 'Journal'}},\n  year={${data.year}},\n  doi={${data.doi}},\n}`;
      default:
        return 'Unsupported format';
    }
  };

  const validateDoi = (doi: string): boolean => {
    const doiRegex = /^10\.\d{4,}(?:\.\d+)*\/\S+(?:\?\S+)?$/;
    return doiRegex.test(doi);
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
  <div className="bg-white border rounded-lg p-4 w-full">
      <h3 className="font-semibold text-base mb-4">Citation & Metadata Generator</h3>
      
      <div className="space-y-4">
        {/* Format Selection */}
        <div>
          <label className="block text-base font-medium mb-2">Citation Format</label>
          <select 
            value={format} 
            onChange={(e) => setFormat(e.target.value as CitationFormat)}
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
          <label className="block text-base font-medium mb-2">DOI Validator</label>
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
              <span className={`px-2 py-2 rounded text-base ${
                isValidDoi ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {isValidDoi ? '✓ Valid' : '✗ Invalid'}
              </span>
            )}
          </div>
        </div>

        {/* Citation Output */}
        <div>
          <label className="block text-base font-medium mb-2">Generated Citation</label>
          <div className="relative">
            <textarea
              value={citation}
              readOnly
              className="w-full border rounded p-3 bg-gray-50 font-mono text-base min-h-[100px] resize-none"
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
            <h4 className="font-medium text-base mb-2">Metadata Preview</h4>
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