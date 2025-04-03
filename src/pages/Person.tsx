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
    fullBio: `Ezechiel joined NewTIFI in 2022 and is responsible for leading the organization's strategic vision and governance. He leads the executive board and oversees the implementation of NewTIFI's mission across all platforms and initiatives.

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
    fullBio: `Karlo joined NewTIFI in 2022 and leads the organization's operational activities and program management. He is responsible for implementing strategic initiatives and maintaining organizational efficiency across all departments.

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
    shortBio: 'Managing financial operations and AML expertise, ensuring sustainable growth and regulatory compliance.',
    fullBio: `Vlado joined NewTIFI in 2022 and oversees all financial aspects of the organization. He is responsible for financial strategy, budget management, and ensuring compliance with regulatory requirements.

His expertise in financial operations and anti-money laundering (AML) plays a crucial role in maintaining the organization's financial integrity and sustainable growth while adhering to international standards.`,
    expertise: [
      'Financial Management',
      'Risk Assessment',
      'Regulatory Compliance',
      'Strategic Planning'
    ],
    achievements: [
      'Established robust financial control systems',
      'Implemented comprehensive AML framework',
      'Secured sustainable funding streams',
      'Developed strategic financial partnerships'
    ],
    imageSrc: '/assets/images/team/vlado-sutlovic.jpg',
    linkedin: 'https://linkedin.com/in/vlado-sutlovic'
  },
  {
    name: 'Dr. Delphine Filsack',
    urlName: 'dr-delphine-filsack',
    title: 'Scientific Advisor',
    shortBio: 'Leading technology initiatives and innovation strategy across NewTIFI\'s focus areas.',
    fullBio: `Dr. Filsack joined NewTIFI in 2022 and provides strategic guidance on technology direction and innovation initiatives. She leads the organization's scientific advisory board and shapes research priorities across all focus areas.

Her expertise in technological innovation and sustainable development helps guide NewTIFI's research agenda and ensures alignment with global sustainability goals while maintaining scientific rigor.`,
    expertise: [
      'Technology Innovation',
      'Scientific Research',
      'Sustainable Development',
      'Strategic Advisory'
    ],
    achievements: [
      'Led groundbreaking research initiatives',
      'Published influential papers in technology innovation',
      'Developed key scientific partnerships',
      'Advised on major technological breakthroughs'
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
                    objectPosition: member.name === 'Dr. Delphine Filsack' ? 'center 30%' : 'center 40%' 
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