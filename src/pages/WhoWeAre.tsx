import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import TeamMember from '@/components/TeamMember';

// Team data
const teamMembers = [
  {
    name: 'Ezechiel Havrenne, LLM',
    title: 'Chair & President',
    bio: 'Leading NewTIFI\'s vision as Chair and President, driving technological innovation and sustainable development. Responsible for strategic direction, board leadership, and representing the organization in legal matters. With extensive experience in technology and sustainable development, Ezechiel oversees the organization\'s strategic initiatives and ensures alignment with our mission of human-centered innovation.',
    imageSrc: '/assets/images/team/ezechiel-havrenne.jpg'
  },
  {
    name: 'Karlo Definis, FICP',
    title: 'COO & General Secretary',
    bio: 'Overseeing operational excellence and strategic initiatives across NewTIFI\'s programs and partnerships. Coordinating technology programs and maintaining organizational records. Karlo brings expertise in operational management and program coordination, ensuring efficient execution of NewTIFI\'s initiatives while maintaining high standards of organizational governance.',
    imageSrc: '/assets/images/team/karlo-definis.jpg'
  },
  {
    name: 'Vlado Sutlovic, FICP',
    title: 'Treasurer',
    bio: 'Managing financial operations and AML expertise, ensuring sustainable growth and regulatory compliance. Vlado oversees all financial aspects of NewTIFI, including budget management, financial reporting, and compliance with regulatory requirements. His expertise in financial operations and AML ensures the organization\'s financial integrity and sustainable growth.',
    imageSrc: '/assets/images/team/vlado-sutlovic.jpg'
  },
  {
    name: 'Dr. Delphine Filsack',
    title: 'Scientific Advisor',
    bio: 'Leading technology initiatives and innovation strategy across NewTIFI\'s focus areas, with expertise in technological innovation and sustainable development. Delphine provides strategic guidance on technology direction, ensuring alignment with NewTIFI\'s mission and values. Her expertise in technological innovation and sustainable development helps shape our innovation priorities and partnerships.',
    imageSrc: '/assets/images/team/delphine-filsack.jpg'
  }
];

const values = [
  {
    title: 'Innovation',
    description: 'We push boundaries and challenge conventional thinking to develop breakthrough solutions.',
    details: [
      'Fostering creative thinking and experimentation',
      'Embracing emerging technologies and methodologies',
      'Encouraging cross-disciplinary collaboration',
      'Supporting risk-taking and learning from failure'
    ]
  },
  {
    title: 'Integrity',
    description: 'We maintain the highest standards of ethical conduct and transparency in all our work.',
    details: [
      'Rigorous research methodologies',
      'Transparent reporting and communication',
      'Ethical considerations in all projects',
      'Accountability to our stakeholders'
    ]
  },
  {
    title: 'Impact',
    description: 'We focus on creating meaningful, lasting change that benefits society as a whole.',
    details: [
      'Measurable outcomes and success metrics',
      'Sustainable and scalable solutions',
      'Long-term partnerships and engagement',
      'Focus on systemic change'
    ]
  }
];

const WhoWeAre = () => {
  return (
    <main className="min-h-screen pb-20">
      {/* Header Section */}
      <section className="px-6 py-32 bg-newtifi-navy text-white">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 mt-32">Who We Are</h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Meet the team driving innovation at Newtifi. We're a diverse group of thinkers, builders, and innovators committed to shaping a better future through technology.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-6 py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-20 gap-y-24 max-w-7xl mx-auto px-8">
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
      
      {/* Mission Section */}
      <section className="px-6 py-20 bg-newtifi-navy text-white">
        <div className="container mx-auto">
          <ScrollReveal className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Mission</h2>
            <p className="text-xl text-white/80 leading-relaxed">
              NewTIFI exists to empower scientific breakthroughs that create lasting impact for a sustainable and equitable future. We champion researchers and visionaries, providing support to help translate transformative ideas into real-world solutions—advancing healthcare, food security, sustainable resources, and financial systems for the long-term benefit of society.
            </p>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="py-16 bg-newtifi-grey">
        <div className="container mx-auto max-w-7xl">
          <ScrollReveal direction="up" delay={100} className="mb-12 text-center">
            <h2 className="text-base font-light mb-4 text-newtifi-navy uppercase tracking-wide">Our Values</h2>
            <p className="text-sm text-gray-700 font-light">
              The principles that guide our work and shape our impact.
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <ScrollReveal key={value.title} direction="right" delay={index * 200}>
                <article className="bg-white p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <h3 className="text-sm font-medium uppercase tracking-wider text-newtifi-navy mb-4">{value.title}</h3>
                  <p className="text-gray-700 text-sm font-light mb-6">{value.description}</p>
                  <ul className="space-y-3">
                    {value.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-newtifi-teal mt-1">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default WhoWeAre;
