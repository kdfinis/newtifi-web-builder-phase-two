// Simple Test Page

import React from 'react';

const TestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Test Page</h1>
        <p className="text-gray-600 mb-8">This is a simple test page to verify React is working</p>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-green-600 font-medium">✅ React is working correctly!</p>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
