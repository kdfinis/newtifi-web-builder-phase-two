import React from 'react';

const Publishing: React.FC = () => {
  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 24, fontFamily: 'serif', background: '#fff', borderRadius: 8, boxShadow: '0 2px 12px #0001' }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24 }}>Articles</h1>
      <p style={{ fontSize: 18, color: '#444' }}>
        No articles are currently available. Please check back later.
      </p>
    </div>
  );
};

export default Publishing; 