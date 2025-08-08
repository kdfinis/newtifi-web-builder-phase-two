import React, { useState, useEffect } from 'react';
import { X, Download, ZoomIn, ZoomOut, RotateCw, Fullscreen, FileText as FileTextIcon } from 'lucide-react';

interface PDFPreviewProps {
  pdfUrl: string;
  title: string;
  onClose: () => void;
  onDownload?: () => void;
  requireAuth?: boolean;
  isAuthenticated?: boolean;
  onLoginRequired?: () => void;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({
  pdfUrl,
  title,
  onClose,
  onDownload,
  requireAuth = false,
  isAuthenticated = false,
  onLoginRequired
}) => {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pdfError, setPdfError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Add timeout to handle loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        setPdfError(true);
      }
    }, 5000); // 5 second timeout

    return () => clearTimeout(timer);
  }, [isLoading]);

  // Reset loading state when PDF URL changes
  useEffect(() => {
    setIsLoading(true);
    setPdfError(false);
  }, [pdfUrl]);

  const handleDownload = () => {
    if (requireAuth && !isAuthenticated) {
      onLoginRequired?.();
      return;
    }
    onDownload?.();
  };

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);
  const handleFullscreen = () => setIsFullscreen(!isFullscreen);

  const handlePdfLoad = () => {
    setIsLoading(false);
    setPdfError(false);
  };

  const handlePdfError = () => {
    setIsLoading(false);
    setPdfError(true);
  };

  return (
    <div className={`fixed inset-0 z-50 bg-black/80 flex items-center justify-center ${isFullscreen ? 'p-0' : 'p-4'}`}>
      <div className={`bg-white rounded-2xl shadow-2xl flex flex-col ${isFullscreen ? 'w-full h-full rounded-none' : 'w-full max-w-6xl h-full max-h-[90vh]'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-800 truncate">{title}</h2>
          <div className="flex items-center gap-2">
            {/* Controls */}
            <button
              onClick={handleZoomOut}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-base text-gray-600 min-w-[60px] text-center">{Math.round(scale * 100)}%</span>
            <button
              onClick={handleZoomIn}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleRotate}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title="Rotate"
            >
              <RotateCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleFullscreen}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title="Fullscreen"
            >
              <Fullscreen className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title="Download"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-hidden relative">
          {isLoading && (
            <div className="absolute inset-0 bg-white flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-newtifi-teal mx-auto mb-4"></div>
                <p className="text-gray-600 mb-4">Loading PDF...</p>
                <button
                  onClick={() => {
                    setIsLoading(false);
                    setPdfError(true);
                  }}
                  className="text-base text-gray-500 hover:text-gray-700 underline"
                >
                  Skip loading
                </button>
              </div>
            </div>
          )}
          
          {pdfError && (
            <div className="flex items-center justify-center h-full bg-gray-100">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileTextIcon className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-base font-semibold text-gray-800 mb-2">PDF Preview Error</h3>
                <p className="text-gray-600 mb-4">Unable to load the PDF preview</p>
                <button
                  onClick={onDownload}
                  className="bg-newtifi-navy text-white px-6 py-3 rounded-xl font-medium hover:bg-newtifi-navy/90 transition-colors"
                >
                  Download PDF
                </button>
              </div>
            </div>
          )}
          
          {!isLoading && !pdfError && (
            <iframe
              src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
              className="w-full h-full border-0"
              onLoad={handlePdfLoad}
              onError={handlePdfError}
              title="PDF Preview"
            />
          )}
        </div>

        {/* Auth Required Overlay */}
        {requireAuth && !isAuthenticated && (
          <div className="absolute inset-0 bg-white/95 flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-newtifi-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-newtifi-teal" />
              </div>
              <h3 className="text-base font-semibold text-gray-800 mb-2">Authentication Required</h3>
              <p className="text-gray-600 mb-6">Please sign in to download this PDF</p>
              <button
                onClick={onLoginRequired}
                className="bg-newtifi-navy text-white px-6 py-3 rounded-xl font-medium hover:bg-newtifi-navy/90 transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFPreview;
