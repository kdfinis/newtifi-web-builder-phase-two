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
        className="relative w-full max-w-[280px] bg-white rounded-lg shadow-sm overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-md"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="relative h-56 w-full overflow-hidden">
          <div className="absolute inset-0 bg-[#0F2D5F] opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
          <img 
            src={imageSrc} 
            alt={name} 
            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105 grayscale rounded-lg" 
          />
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-bold text-newtifi-navy mb-1">{name}</h3>
          <p className="text-newtifi-navy font-medium text-sm whitespace-pre-line mb-4 min-h-[3.5rem]">{title}</p>
          
          <div className={`transition-all duration-500 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <p className="text-newtifi-navy text-sm leading-relaxed">{bio}</p>
          </div>
          
          <div className="mt-4 flex justify-start">
            <button 
              className={cn(
                "flex items-center justify-center text-newtifi-navy transition-all duration-300",
                "bg-newtifi-teal/10 rounded-full p-2",
                "group-hover:translate-x-1"
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
