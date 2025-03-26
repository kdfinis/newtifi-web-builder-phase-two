
import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import TeamMember from '@/components/TeamMember';

// Team data
const teamMembers = [
  {
    name: 'Karlo Definis',
    title: 'Strategic Lead and Founder',
    bio: '10+ years in systems, fintech strategy, and operational design.',
    imageSrc: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Sophia Chen',
    title: 'Research Director',
    bio: 'Ph.D. in Computer Science with expertise in research methodologies.',
    imageSrc: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80'
  },
  {
    name: 'Marcus Johnson',
    title: 'Technology Officer',
    bio: 'Systems architect specializing in scalable implementations and cloud infrastructure.',
    imageSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Aria Rodriguez',
    title: 'Partnerships Lead',
    bio: 'Leader in forming strategic alliances between academic institutions and industry.',
    imageSrc: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80'
  }
];

const WhoWeAre = () => {
  return (
    <main className="min-h-screen pt-28 pb-20">
      {/* Team Section */}
      <section className="px-6 py-12">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Who We Are</h1>
            <p className="text-lg text-gray-600">
              Meet the team driving innovation at Newtifi. We're a diverse group of thinkers, builders, and innovators committed to shaping a better future through technology.
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember
                key={member.name}
                name={member.name}
                title={member.title}
                bio={member.bio}
                imageSrc={member.imageSrc}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Mission Statement */}
      <section className="px-6 py-20 bg-newtifi-navy text-white">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Mission</h2>
            <p className="text-xl md:text-2xl leading-relaxed mb-6">
              "Newtifi builds useful, human-centered products, strategies, and systems. We help individuals and teams move faster, stay clearer, and do better work."
            </p>
            <p className="text-lg opacity-80">
              This mission drives everything we do, from the research we fund to the technologies we develop and the partnerships we form.
            </p>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="px-6 py-20">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ScrollReveal delay={100} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-newtifi-navy">Human-Centered Innovation</h3>
                <p className="text-gray-600">
                  We believe technology should augment human capabilities, not replace them. Every innovation we pursue aims to enhance human potential and well-being.
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={200} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-newtifi-navy">Rigorous Research</h3>
                <p className="text-gray-600">
                  We uphold the highest standards of scientific inquiry, ensuring our work is grounded in evidence, peer review, and ethical considerations.
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={300} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-newtifi-navy">Collaborative Progress</h3>
                <p className="text-gray-600">
                  We foster partnerships across disciplines and sectors, recognizing that the most significant breakthroughs come from diverse perspectives working together.
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={400} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-newtifi-navy">Long-Term Thinking</h3>
                <p className="text-gray-600">
                  We prioritize sustainable impact over short-term gains, making decisions that benefit future generations as much as our own.
                </p>
              </ScrollReveal>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default WhoWeAre;
