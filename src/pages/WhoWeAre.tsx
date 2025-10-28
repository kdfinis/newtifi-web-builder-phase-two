import React from 'react';

const WhoWeAre: React.FC = () => {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-newtifi-navy text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Who We Are</h1>
          <p className="text-lg text-white/80 max-w-3xl">
            NewTIFI is an independent platform focused on journals, publishing, and academic-quality insights
            across investment management and financial regulation.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-semibold text-newtifi-navy mb-3">Our Mission</h2>
          <p className="text-gray-700 max-w-3xl">
            We curate, publish, and present rigorous content to empower professionals, academics, and
            practitioners with high-signal thinking.
          </p>
        </div>
      </section>
    </main>
  );
};

export default WhoWeAre;
