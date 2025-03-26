
import React, { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import TeamMember from '@/components/TeamMember';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Team data
const teamMembers = [
  {
    name: 'Karlo Definis',
    title: 'Chief Operations Officer',
    bio: 'Oversees scientific programs and publication efforts in coordination with NewTIFI\'s board.',
    imageSrc: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    fullBio: 'Karlo has over 10 years of experience in fintech strategy and operational design. He leads NewTIFI\'s day-to-day operations and coordinates with our scientific committees to ensure research programs align with our mission and objectives.'
  },
  {
    name: 'Sophia Chen',
    title: 'Research Director',
    bio: 'Leads NewTIFI\'s research initiatives and coordinates with academic partners worldwide.',
    imageSrc: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
    fullBio: 'With a Ph.D. in Computer Science, Sophia oversees the institute\'s research portfolio across all four focus sectors. She has published extensively on topics related to financial innovation and technology policy.'
  },
  {
    name: 'Marcus Johnson',
    title: 'Technology Officer',
    bio: 'Manages NewTIFI\'s technical infrastructure and knowledge systems development.',
    imageSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    fullBio: 'Marcus brings 15+ years of experience in systems architecture and database design. He leads the development of NewTIFI\'s searchable legal knowledge systems and ensures our technical infrastructure supports our mission effectively.'
  },
  {
    name: 'Aria Rodriguez',
    title: 'Partnerships Lead',
    bio: 'Builds and maintains relationships with institutional members and external stakeholders.',
    imageSrc: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80',
    fullBio: 'Aria specializes in forming strategic alliances between academic institutions, regulatory bodies, and industry partners. She oversees NewTIFI\'s membership program and leads outreach efforts to expand our network of collaborators.'
  }
];

const WhoWeAre = () => {
  const [selectedMember, setSelectedMember] = useState<(typeof teamMembers)[0] | null>(null);

  return (
    <main className="min-h-screen pt-28 pb-20">
      {/* Mission & Vision Section */}
      <section className="px-6 py-12 bg-white">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-sm font-light uppercase tracking-wide mb-6 text-newtifi-navy">Who We Are</h1>
            
            <div className="mb-10">
              <h2 className="text-xs uppercase font-light tracking-wide mb-2 text-newtifi-navy">Mission Statement</h2>
              <p className="text-sm text-gray-700 font-light mb-6">
                To enable knowledge that endures — through collaboration, rigor, and responsible application.
              </p>
            </div>
            
            <div>
              <h2 className="text-xs uppercase font-light tracking-wide mb-2 text-newtifi-navy">Vision Statement</h2>
              <p className="text-sm text-gray-700 font-light">
                A world where scientific integrity, legal clarity, and technological advancement serve the public interest in harmony.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="px-6 py-12 bg-gray-50">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-title text-newtifi-navy">
              Our Team
            </h2>
            <p className="text-xs text-gray-600 font-light">
              Meet the team driving innovation at NewTIFI. We're a diverse group of thinkers, builders, and innovators committed to shaping a better future.
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={member.name} onClick={() => setSelectedMember(member)} className="cursor-pointer">
                <TeamMember
                  name={member.name}
                  title={member.title}
                  bio={member.bio}
                  imageSrc={member.imageSrc}
                  delay={index * 100}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="px-6 py-16 bg-white">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-3xl mx-auto">
            <h2 className="section-title text-newtifi-navy text-center mb-10">
              Our Values
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ScrollReveal delay={100} className="bg-white p-6 rounded-sm shadow-sm">
                <h3 className="text-xs font-light uppercase tracking-wide mb-3 text-newtifi-navy">Human-Centered Innovation</h3>
                <p className="text-xs text-gray-600 font-light">
                  We believe technology should augment human capabilities, not replace them. Every innovation we pursue aims to enhance human potential and well-being.
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={200} className="bg-white p-6 rounded-sm shadow-sm">
                <h3 className="text-xs font-light uppercase tracking-wide mb-3 text-newtifi-navy">Rigorous Research</h3>
                <p className="text-xs text-gray-600 font-light">
                  We uphold the highest standards of scientific inquiry, ensuring our work is grounded in evidence, peer review, and ethical considerations.
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={300} className="bg-white p-6 rounded-sm shadow-sm">
                <h3 className="text-xs font-light uppercase tracking-wide mb-3 text-newtifi-navy">Collaborative Progress</h3>
                <p className="text-xs text-gray-600 font-light">
                  We foster partnerships across disciplines and sectors, recognizing that the most significant breakthroughs come from diverse perspectives working together.
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={400} className="bg-white p-6 rounded-sm shadow-sm">
                <h3 className="text-xs font-light uppercase tracking-wide mb-3 text-newtifi-navy">Long-Term Thinking</h3>
                <p className="text-xs text-gray-600 font-light">
                  We prioritize sustainable impact over short-term gains, making decisions that benefit future generations as much as our own.
                </p>
              </ScrollReveal>
            </div>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Team Member Modal */}
      <Dialog open={!!selectedMember} onOpenChange={(open) => !open && setSelectedMember(null)}>
        <DialogContent className="bg-white p-6 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sm font-light text-newtifi-navy">{selectedMember?.name}</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col items-center mt-4">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
              <img 
                src={selectedMember?.imageSrc} 
                alt={selectedMember?.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <h3 className="text-xs font-medium uppercase tracking-wide text-newtifi-teal mb-2">
              {selectedMember?.title}
            </h3>
            
            <p className="text-xs text-gray-600 font-light text-center mt-4">
              {selectedMember?.fullBio}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default WhoWeAre;
