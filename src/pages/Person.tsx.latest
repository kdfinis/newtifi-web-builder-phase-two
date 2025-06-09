import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Linkedin, Mail } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

// Team member detailed data
const teamMembersData = [
  {
    name: 'Ezechiel Havrenne, LLM',
    urlName: 'ezechiel-havrenne-llm',
    title: 'Chair & President',
    shortBio: 'Leading NewTIFI\'s vision as Chair and President, driving technological innovation and sustainable development.',
    fullBio: `Ezechiel is responsible for leading the organization's strategic vision and governance. He leads the executive board and oversees the implementation of NewTIFI's mission across all platforms and initiatives.

As Chair and President, he plays a crucial role in shaping the organization's direction in technological innovation and sustainable development, while ensuring strong governance and ethical standards are maintained across all operations.`,
    expertise: [
      'Technology Law & Policy',
      'Sustainable Development',
      'Corporate Governance',
      'Strategic Leadership'
    ],
    achievements: [
      'Led the establishment of NewTIFI\'s global research partnerships',
      'Developed the organization\'s 2030 strategic vision',
      'Published numerous papers on technology law and innovation',
      'Speaker at major international technology conferences'
    ],
    imageSrc: '/assets/images/team/ezechiel-havrenne.jpg',
    linkedin: 'https://linkedin.com/in/ezechiel-havrenne'
  },
  {
    name: 'Karlo Definis, FICP',
    urlName: 'karlo-definis-ficp',
    title: 'COO & General Secretary',
    shortBio: 'Overseeing operational excellence and strategic initiatives across NewTIFI\'s programs and partnerships.',
    fullBio: `Karlo leads the organization's operational activities and program management. He is responsible for implementing strategic initiatives and maintaining organizational efficiency across all departments.

His role involves coordinating technology programs, managing partnerships, and ensuring the smooth execution of NewTIFI's various initiatives while maintaining high standards of organizational governance.`,
    expertise: [
      'Operations Management',
      'Program Coordination',
      'Strategic Planning',
      'Partnership Development'
    ],
    achievements: [
      'Streamlined NewTIFI\'s operational processes',
      'Established key strategic partnerships',
      'Implemented innovative program management systems',
      'Led successful international collaboration initiatives'
    ],
    imageSrc: '/assets/images/team/karlo-definis.jpg',
    linkedin: 'https://linkedin.com/in/karlo-definis'
  },
  {
    name: 'Vlado Sutlovic, FICP',
    urlName: 'vlado-sutlovic-ficp',
    title: 'Treasurer',
    shortBio: 'MSc in Business Economics with expertise in AML Compliance and Risk Management, attained through multi-year tenures in global fintech and investment banks.',
    fullBio: `Vlado Sutlovic is a MSc in Business Economics with expertise in AML Compliance and Risk Management, attained through multi-year tenures in global fintech and investment banks.

He is serving as treasurer and member of the Board of NewTIFI. Over the past years, Vlado has researched interdependencies between the banking and funds sectors in the EU, focusing on German and Luxembourg markets and future regulation implementations.`,
    expertise: [
      'AML Compliance',
      'Risk Management',
      'Financial Operations',
      'Regulatory Compliance'
    ],
    achievements: [
      'Established robust financial control systems',
      'Implemented comprehensive AML framework',
      'Secured sustainable funding streams',
      'Developed strategic financial partnerships'
    ],
    imageSrc: '/assets/images/team/vlado-sutlovic.jpeg',
    linkedin: 'https://linkedin.com/in/vlado-sutlovic'
  },
  {
    name: 'Delphine Filsack',
    urlName: 'delphine-filsack',
    title: 'Scientific Advisor',
    shortBio: 'Bridging emerging energy technologies and the financial sector with a focus on sustainable innovation.',
    fullBio: `Delphine brings a unique bridge between emerging energy technologies and the financial sector. With a career rooted in the power supply sector, Delphine leverages deep technical understanding of battery storage and clean power solutions to inform strategic investment research and foster real-world impact.

An out-of-the-box thinker, Delphine excels in crafting sustainable business development strategies that endure, aligning cutting-edge technology with mid- to long-term return objectives. Passionate about accelerating the transition to a cleaner, more resilient energy landscape, Delphine collaborates across disciplines to translate scientific breakthroughs and innovations into investable opportunities.`,
    expertise: [
      'Battery Storage Systems – Technology assessment, integration strategies, lifecycle optimisation',
      'Clean Power Supply – Renewables project feasibility, grid-scale deployment, sustainability metrics',
      'Strategic Innovation – Cross-sector partnerships, go-to-market roadmaps, investment thesis development',
      'Sustainable Business Development – Long-term value creation, impact measurement, stakeholder engagement'
    ],
    achievements: [
      'Clean Energy – Driving adoption of zero-emission power technologies',
      'Water – Exploring WaterTech for water management and purification solutions',
      'Agriculture – Advancing precision AgriTech for sustainable food systems'
    ],
    imageSrc: '/assets/images/team/delphine-filsack.jpg',
    linkedin: 'https://linkedin.com/in/delphine-filsack'
  }
];

const Person = () => {
  const { name } = useParams();
  const member = teamMembersData.find(m => m.urlName === name);

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Person not found</h1>
          <Link to="/who-we-are" className="text-newtifi-teal hover:underline">
            Return to Team
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header with back button */}
      <header className="bg-newtifi-navy text-white">
        <div className="container mx-auto px-6 py-8">
          <Link 
            to="/who-we-are" 
            className="inline-flex items-center text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Team
          </Link>
        </div>
      </header>

      {/* Main content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Profile section */}
          <ScrollReveal className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            {/* Image column */}
            <div className="lg:col-span-5">
              <div className="aspect-[4/5] overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={member.imageSrc}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  style={{ 
                    objectPosition: member.name === 'Delphine Filsack' ? 'center 30%' : 'center 40%' 
                  }}
                />
              </div>
            </div>

            {/* Content column */}
            <div className="lg:col-span-7">
              <ScrollReveal className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold text-newtifi-navy mb-2">{member.name}</h1>
                  <p className="text-xl text-gray-600">{member.title}</p>
                </div>

                <div className="flex gap-4">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-newtifi-teal/10 text-newtifi-navy hover:bg-newtifi-teal/20 transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  <a
                    href={`mailto:${member.urlName.split('-')[0]}.${member.urlName.split('-')[1]}@newtifi.org`}
                    className="p-2 rounded-full bg-newtifi-teal/10 text-newtifi-navy hover:bg-newtifi-teal/20 transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>

                <div className="prose prose-lg">
                  {member.fullBio.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-600 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </ScrollReveal>

          {/* Expertise & Achievements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ScrollReveal delay={200}>
              <div className="bg-newtifi-grey rounded-lg p-8">
                <h2 className="text-2xl font-bold text-newtifi-navy mb-6">Areas of Expertise</h2>
                <ul className="space-y-3">
                  {member.expertise.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-newtifi-teal mt-1.5">•</span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="bg-newtifi-grey rounded-lg p-8">
                <h2 className="text-2xl font-bold text-newtifi-navy mb-6">Key Achievements</h2>
                <ul className="space-y-3">
                  {member.achievements.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-newtifi-teal mt-1.5">•</span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Person; 