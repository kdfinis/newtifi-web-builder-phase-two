import React from 'react';

const Publishing: React.FC = () => {
  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: 32, fontFamily: 'sans-serif' }}>
      <div className="bg-newtifi-navy rounded-2xl shadow-xl p-10 md:p-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-tight">NewTIFI Publishing</h1>
        <h2 className="text-2xl font-semibold text-newtifi-teal mb-6">Empowering knowledge & education for a sustainable future</h2>
        <p className="text-lg text-white/90 mb-4">
          NewTIFI Publishing is the scientific and editorial arm of the New Technologies & Investment Funds Institute, dedicated to advancing accessible, high-quality research and thought leadership across the fields of new technologies and finance.
        </p>
        <p className="text-lg text-white/80 mb-4">
          We publish peer-reviewed journals, practitioner-oriented reviews, academic articles, books, and interviews that explore the intersections of innovation, sustainability, and public policy.
        </p>
        <p className="text-lg text-white/80 mb-4">
          Our mission is to foster informed dialogue and bridge the gap between cutting-edge research and real-world decision-making. All publications are produced with academic integrity, intellectual independence, and an emphasis on clarity and impact.
        </p>
        <p className="text-lg text-white/80 mb-2">
          Contrary to many publishing houses, NewTIFI operates as a non-profit. All profits realised by NewTIFI are used to fund Doctoral Scholarships.
        </p>
      </div>
    </div>
  );
};

export default Publishing; 