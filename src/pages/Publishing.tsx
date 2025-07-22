import React from 'react';

const Publishing: React.FC = () => {
  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: 32, fontFamily: 'sans-serif', background: '#fff', borderRadius: 16, boxShadow: '0 2px 24px #0001' }}>
      <h1 style={{ fontSize: 36, fontWeight: 800, color: '#00C2CB', marginBottom: 12, letterSpacing: '-1px' }}>NewTIFI Publishing</h1>
      <h2 style={{ fontSize: 22, fontWeight: 600, color: '#0A0A23', marginBottom: 18 }}>Empowering knowledge & education for a sustainable future</h2>
      <p style={{ fontSize: 18, color: '#222', marginBottom: 18 }}>
        NewTIFI Publishing is the scientific and editorial arm of the New Technologies & Investment Funds Institute, dedicated to advancing accessible, high-quality research and thought leadership across the fields of new technologies and finance.
      </p>
      <p style={{ fontSize: 18, color: '#222', marginBottom: 18 }}>
        We publish peer-reviewed journals, practitioner-oriented reviews, academic articles, books, and interviews that explore the intersections of innovation, sustainability, and public policy.
      </p>
      <p style={{ fontSize: 18, color: '#222', marginBottom: 18 }}>
        Our mission is to foster informed dialogue and bridge the gap between cutting-edge research and real-world decision-making. All publications are produced with academic integrity, intellectual independence, and an emphasis on clarity and impact.
      </p>
      <p style={{ fontSize: 18, color: '#222', marginBottom: 18 }}>
        Contrary to many publishing houses, NewTIFI operates as a non-profit. All profits realised by NewTIFI are used to fund Doctoral Scholarships.
      </p>
    </div>
  );
};

export default Publishing; 