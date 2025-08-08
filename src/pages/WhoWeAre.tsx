import React, { useState } from 'react';
import TeamMember from '@/components/TeamMember';
import { cn } from '@/lib/utils';

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
    imageSrc: '/assets/images/team/vlado-sutlovic.jpeg'
  },
  {
    name: 'Delphine Filsack',
    title: 'Scientific Advisor',
    bio: 'Delphine joined NewTIFI as a Scientific Advisor, bringing a unique bridge between emerging energy technologies and the financial sector. With a career rooted in the power supply sector, Delphine leverages deep technical understanding of battery storage and clean power solutions to inform strategic investment research and foster real-world impact. An out-of-the-box thinker, Delphine excels in crafting sustainable business development strategies that endure, aligning cutting-edge technology with mid- to long-term return objectives. Passionate about accelerating the transition to a cleaner, more resilient energy landscape, Delphine collaborates across disciplines to translate scientific breakthroughs and innovations into investable opportunities.',
    imageSrc: '/assets/images/team/delphine-filsack.jpg'
  }
];

const values = [
  {
    title: 'Purposeful Innovation',
    description: 'We exist to empower scientific breakthroughs that address the world’s most pressing challenges – from healthcare and food security to sustainable resources and financial systems. Our mission is to turn transformative ideas into solutions that serve society for generations to come.'
  },
  {
    title: 'Integrity Through Knowledge',
    description: 'We are committed to academic independence, intellectual rigour, and open access to knowledge. Our journals, reviews, and events are designed to inform, educate, and influence – with no commercial or political agenda. Our publishing model ensures trust, and our governance guarantees transparency.'
  },
  {
    title: 'Investing in People',
    description: 'All profits are reinvested into PhD scholarships. Through mentorships, internships, and funding, we nurture the next generation of researchers and innovators, supporting their journey from vision to real-world impact.'
  },
  {
    title: 'Collaboration Without Border for the Common Good',
    description: 'We unite a global network of academics, professionals, policymakers, and entrepreneurs to foster interdisciplinary dialogue and systemic change. Our governance is transparent, our structure non-profit, and our mission aligned with the public interest.'
  }
];

const WhoWeAre = () => {
  const [activeValue, setActiveValue] = useState(values[0].title);

  return (
    <main className="min-h-screen pb-20 bg-white">
      {/* Header Section */}
      <section className="px-6 py-32 bg-newtifi-navy text-white">
        <div className="container mx-auto">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-4xl font-bold mb-8 mt-32">Who We Are</h1>
            <p className="text-base text-white/80 leading-relaxed">
              Meet the team driving innovation at Newtifi. We're a diverse group of thinkers, builders, and innovators committed to shaping a better future through technology.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-6 pb-20 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16 pt-24">
            <h2 className="text-2xl md:text-4xl uppercase mb-4 text-newtifi-navy">Senior Leadership</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <TeamMember
                key={member.name}
                name={member.name}
                title={member.title}
                bio={member.bio}
                imageSrc={member.imageSrc}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-newtifi-navy via-[#1a2b4d] to-[#162544] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/images/grid-pattern.svg')] opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-newtifi-teal/5 to-transparent"></div>
        <div className="container mx-auto relative">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl uppercase mb-8 font-light tracking-wider text-newtifi-teal/90">Our Mission</h2>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-newtifi-teal/20 shadow-lg shadow-newtifi-teal/5">
              <p className="text-base text-white/90 leading-relaxed">
                NewTIFI exists to empower scientific breakthroughs that create lasting impact for a sustainable and equitable future. We champion researchers and visionaries, providing support to help translate transformative ideas into real-world solutions—advancing healthcare, food security, sustainable resources, and financial systems for the long-term benefit of society.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="px-6 pb-20 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-12 text-center pt-20">
            <h2 className="text-2xl md:text-4xl uppercase mb-4 text-newtifi-navy">Our Values</h2>
            <p className="text-base text-gray-700 font-light">
              The principles that guide our work and shape our impact.
            </p>
          </div>
          
          <div className="max-w-7xl mx-auto">
            <div className="bg-newtifi-navy rounded-2xl p-8 md:p-12">
              <div className="mb-10 text-center">
                <p className="text-base text-white/80 font-light mb-2">Some Key principles that guide our work and shape our impact</p>
                <p className="text-base text-white/70">At NewTIFI, our values are rooted in purpose, guided by principle, and designed to support lasting impact through research, innovation, and collaboration</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {values.map((value) => (
                  <div key={value.title} className="bg-white/10 rounded-xl p-6 border border-white/10 shadow">
                    <h3 className="text-base font-bold mb-4 text-newtifi-teal">{value.title}</h3>
                    <p className="text-white/90 leading-relaxed">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default WhoWeAre;
