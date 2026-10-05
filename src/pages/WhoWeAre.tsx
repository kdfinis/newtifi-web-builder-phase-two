import React from 'react';
import TeamMember from '@/components/TeamMember';
import PageHero from '@/components/PageHero';
import SegmentedPanels from '@/components/SegmentedPanels';

const teamMembers = [
  {
    name: 'Ezechiel Havrenne, LLM',
    title: 'Chair & President',
    bio: 'Leading NewTIFI\'s vision as Chair and President, driving technological innovation and sustainable development. Responsible for strategic direction, board leadership, and representing the organization in legal matters. With extensive experience in technology and sustainable development, Ezechiel oversees the organization\'s strategic initiatives and ensures alignment with our mission of human-centered innovation.',
    imageSrc: '/assets/images/team/ezechiel-havrenne.jpg',
  },
  {
    name: 'Karlo Definis, FICP',
    title: 'Head of Operations & Digital Transformation',
    bio: 'Karlo leads operations and digital business transformation at NewTIFI from April 2024: remapping how research, policy, and education run day to day, and putting practical AI into internal workflows with human review.',
    imageSrc: '/assets/images/team/karlo-definis.jpg',
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

const WhoWeAre: React.FC = () => (
  <div className="bg-white pb-20">
    <PageHero
      title="Who we are"
      lede="Meet the team driving innovation at NewTIFI. We're a diverse group of thinkers, builders, and innovators committed to shaping a better future through technology."
    />

    <section className="bg-white py-16 md:py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="mb-10 text-2xl md:text-3xl text-newtifi-navy">Senior leadership</h2>
        <div className="grid grid-cols-1 items-stretch gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
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

    <section className="institute-hero py-20 text-white md:py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-2xl md:text-3xl text-newtifi-teal">Our mission</h2>
        <p className="mt-6 text-lg md:text-xl leading-relaxed text-white/90 text-pretty">
          NewTIFI exists to empower scientific breakthroughs that create lasting impact for a sustainable and equitable
          future. We champion researchers and visionaries, providing support to help translate transformative ideas into
          real-world solutions—advancing healthcare, food security, sustainable resources, and financial systems for the
          long-term benefit of society.
        </p>
      </div>
    </section>

    <section className="bg-white pt-16 md:pt-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-2xl md:text-3xl text-newtifi-navy">Our values</h2>
          <p className="mt-4 text-lg text-gray-700 text-pretty">The principles that guide our work and shape our impact.</p>
        </div>

        <div className="rounded-2xl bg-newtifi-navy p-8 md:p-12">
          <div className="mb-10 max-w-3xl">
            <h3 className="text-xl md:text-2xl text-white">Collaborations and partnerships are critical to our success.</h3>
            <p className="mt-4 text-base leading-relaxed text-white/80 text-pretty">
              We build collaborative relationships with investors and partners, including best-in-class brands, businesses and
              individuals. Our portfolio has prospered on the strong relationships we've built with management teams and
              collaborators from day one.
            </p>
          </div>
          <SegmentedPanels
            tone="dark"
            label="Our values"
            items={values.map((value) => ({ title: value.title, bullets: value.details }))}
          />
        </div>
      </div>
    </section>
  </div>
);

export default WhoWeAre;
