
import React from 'react';
import { cn } from '@/lib/utils';
import ScrollReveal from './ScrollReveal';

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
  return (
    <ScrollReveal delay={delay} className={cn("flex flex-col items-center", className)}>
      <div 
        className="relative h-36 w-36 rounded-full overflow-hidden mb-4 group"
      >
        <div className="absolute inset-0 bg-newtifi-teal opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        <img 
          src={imageSrc} 
          alt={name} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
      </div>
      <h3 className="text-xs font-light uppercase tracking-wide text-center text-newtifi-navy">{name}</h3>
      <p className="text-xs text-newtifi-teal font-light text-center mb-2">{title}</p>
      <p className="text-center text-xs text-gray-600 font-light max-w-xs">{bio}</p>
    </ScrollReveal>
  );
};

export default TeamMember;
