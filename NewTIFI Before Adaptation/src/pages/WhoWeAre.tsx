import React, { useState } from 'react';
import TeamMember from '@/components/TeamMember';
import { cn } from '@/lib/utils';

const teamMembers = [
  {
    name: 'Ezechiel Havrenne, LLM',
    title: 'Chair & President',
    bio: 'Leading NewTIFI\'s vision as Chair and President, driving technological innovation and sustainable development. Responsible for strategic direction, board leadership, and representing the organization in legal matters. With extensive experience in technology and sustainable development, Ezechiel oversees the organization\'s strategic initiatives and ensures alignment with our mission of human-centered innovation.',
    imageSrc: '/assets/images/team/ezechiel-havrenne.jpg',
  },
  {
    name: 'Karlo Definis, FICP',
    title: 'COO & General Secretary',
    bio: 'Overseeing operational excellence and strategic initiatives across NewTIFI\'s programs and partnerships. Coordinating technology programs and maintaining organizational records. Karlo brings expertise in operational management and program coordination, ensuring efficient execution of NewTIFI\'s initiatives while maintaining high standards of organizational governance.',
    imageSrc: '/assets/images/team/karlo-definis.jpg',
  },
  {
    name: 'Vlado Sutlovic, FICP',
    title: 'Treasurer',
    bio: 'Managing financial operations and AML expertise, ensuring sustainable growth and regulatory compliance. Vlado oversees all financial aspects of NewTIFI, including budget management, financial reporting, and compliance with regulatory requirements. His expertise in financial operations and AML ensures the organization\'s financial integrity and sustainable growth.',
    imageSrc: '/assets/images/team/vlado-sutlovic.jpeg',
  },
  {
    name: 'Delphine Filsack',
    title: 'Scientific Advisor',
    bio: 'Delphine joined NewTIFI as a Scientific Advisor, bringing a unique bridge between emerging energy technologies and the financial sector. With a career rooted in the power supply sector, Delphine leverages deep technical understanding of battery storage and clean power solutions to inform strategic investment research and foster real-world impact. An out-of-the-box thinker, Delphine excels in crafting sustainable business development strategies that endure, aligning cutting-edge technology with mid- to long-term return objectives. Passionate about accelerating the transition to a cleaner, more resilient energy landscape, Delphine collaborates across disciplines to translate scientific breakthroughs and innovations into investable opportunities.',
    imageSrc: '/assets/images/team/delphine-filsack.jpg',
  },
];

const values = [
  {
    title: 'Unseen Opportunities',
    description: 'We push boundaries and challenge conventional thinking to develop breakthrough solutions.',
    details: [
      'Fostering creative thinking and experimentation',
      'Embracing emerging technologies and methodologies',
      'Encouraging cross-disciplinary collaboration',
      'Supporting risk-taking and learning from failure',
    ],
  },
  {
    title: 'Value Creation',
    description: 'We maintain the highest standards of ethical conduct and transparency in all our work.',
    details: [
      'Rigorous research methodologies',
      'Transparent reporting and communication',
      'Ethical considerations in all projects',
      'Accountability to our stakeholders',
    ],
  },
  {
    title: 'Exceptional Partnerships',
    description: 'We focus on creating meaningful, lasting change that benefits society as a whole.',
    details: [
      'Measurable outcomes and success metrics',
      'Sustainable and scalable solutions',
      'Long-term partnerships and engagement',
      'Focus on systemic change',
    ],
  },
];

const WhoWeAre: React.FC = () => {
  const [activeValue, setActiveValue] = useState(values[0].title);

  return (
    <main className="min-h-screen pb-20 bg-white">
      <section className="px-6 py-32 bg-newtifi-navy text-white">
        <div className="container mx-auto">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 mt-32">Who We Are</h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Meet the team driving innovation at Newtifi. We're a diverse group of thinkers, builders, and innovators
              committed to shaping a better future through technology.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16 pt-24">
            <h2 className="text-3xl md:text-4xl uppercase mb-4 text-newtifi-navy">Senior Leadership</h2>
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

      <section className="px-6 py-20 bg-gradient-to-br from-newtifi-navy via-[#1a2b4d] to-[#162544] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/images/grid-pattern.svg')] opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-newtifi-teal/5 to-transparent"></div>
        <div className="container mx-auto relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl uppercase mb-8 font-light tracking-wider text-newtifi-teal/90">Our Mission</h2>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-newtifi-teal/20 shadow-lg shadow-newtifi-teal/5">
              <p className="text-xl text-white/90 leading-relaxed">
                NewTIFI exists to empower scientific breakthroughs that create lasting impact for a sustainable and equitable
                future. We champion researchers and visionaries, providing support to help translate transformative ideas into
                real-world solutions—advancing healthcare, food security, sustainable resources, and financial systems for the
                long-term benefit of society.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-12 text-center pt-20">
            <h2 className="text-3xl md:text-4xl uppercase mb-4 text-newtifi-navy">Our Values</h2>
            <p className="text-xl text-gray-700 font-light">The principles that guide our work and shape our impact.</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-newtifi-navy rounded-2xl p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                {values.map((value) => (
                  <button
                    key={value.title}
                    onClick={() => setActiveValue(value.title)}
                    className={cn(
                      'px-8 py-4 rounded-lg text-lg font-light transition-all duration-300',
                      'border border-white/20 backdrop-blur-sm',
                      activeValue === value.title ? 'bg-[#6F8FBF] text-white' : 'bg-transparent hover:bg-white/10 text-white',
                    )}
                  >
                    {value.title}
                  </button>
                ))}
              </div>

              <div className="mt-12">
                <h3 className="text-2xl font-light italic mb-6 text-white">
                  Collaborations and partnerships are critical to our success.
                </h3>
                <p className="text-lg text-white/80 leading-relaxed">
                  We build collaborative relationships with investors and partners, including best-in-class brands, businesses and
                  individuals. Our portfolio has prospered on the strong relationships we've built with management teams and
                  collaborators from day one.
                </p>
                <div className="mt-8">
                  <ul className="space-y-3">
                    {values.find((v) => v.title === activeValue)?.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-base text-white/80">
                        <span className="text-newtifi-teal mt-1">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default WhoWeAre;
