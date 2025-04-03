import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import ScrollReveal from './ScrollReveal';
import { ArrowRight } from 'lucide-react';

type TeamMemberProps = {
  name: string;
  title: string;
  bio: string;
  imageSrc: string;
  delay?: number;
  className?: string;
};

const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  title,
  bio,
  imageSrc,
  delay = 0,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <ScrollReveal delay={delay} className={cn("flex flex-col items-center", className)}>
      <div 
        className="relative w-full max-w-[280px] bg-white rounded-xl shadow-sm overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="relative h-[240px] w-full overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-[#0F2D5F] opacity-0 group-hover:opacity-30 transition-opacity duration-500 ease-in-out rounded-xl"></div>
          <img 
            src={imageSrc} 
            alt={name} 
            className="h-[360px] w-full object-cover transition-all duration-700 group-hover:scale-102 grayscale hover:grayscale-[50%]" 
            style={{ 
              objectPosition: name === 'Dr. Delphine Filsack' ? 'center 30%' : 'center 40%',
              transform: 'scale(1)'
            }}
          />
        </div>
        
        <div className="p-6 transition-all duration-300 bg-white group-hover:bg-white h-[180px] flex flex-col justify-between shadow-sm group-hover:shadow-xl">
          <div>
            <h3 className="text-lg font-bold text-newtifi-navy mb-1 transition-all duration-300 group-hover:text-newtifi-teal line-clamp-2">{name}</h3>
            <p className="text-newtifi-navy font-medium text-sm line-clamp-2">{title}</p>
          </div>
          
          <div className={`transition-all duration-500 absolute left-0 right-0 bg-white p-6 shadow-lg ${isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}`}>
            <p className="text-newtifi-navy text-sm leading-relaxed">{bio}</p>
          </div>
          
          <div className="flex justify-start">
            <button 
              className={cn(
                "flex items-center justify-center text-newtifi-navy transition-all duration-300",
                "bg-newtifi-teal/10 rounded-full p-2",
                "group-hover:translate-x-2 group-hover:bg-newtifi-teal/20"
              )}
            >
              <ArrowRight 
                className={cn(
                  "h-6 w-6 transition-transform duration-300",
                  isExpanded ? "rotate-90" : "group-hover:translate-x-1"
                )} 
              />
            </button>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default TeamMember;
