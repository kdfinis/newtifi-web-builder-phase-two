import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

type TeamMemberProps = {
  name: string;
  title: string;
  subtitle?: string;
  bio: string;
  imageSrc: string;
  className?: string;
};

const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  title,
  subtitle,
  bio,
  imageSrc,
  className,
}) => {
  const urlName = name.toLowerCase().replace(/,/g, '').replace(/\s+/g, '-');

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <Link 
        to={`/person/${urlName}`}
        className="relative w-full max-w-[280px] bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-md hover:border-newtifi-teal/30"
      >
        <div className="relative h-[240px] w-full overflow-hidden rounded-t-2xl">
          <div className="absolute inset-0 bg-newtifi-navy/20 opacity-0 group-hover:opacity-30 transition-opacity duration-500 ease-in-out rounded-t-2xl"></div>
          <img 
            src={imageSrc} 
            alt={name}
            className="h-[360px] w-full object-cover transition-all duration-700 group-hover:scale-102 grayscale hover:grayscale-[50%]" 
            style={{ 
              objectPosition: name === 'Delphine Filsack' ? 'center 30%' : 'center 40%',
              transform: 'scale(1)'
            }}
          />
        </div>
         
        <div className="p-6 transition-all duration-300 bg-white group-hover:bg-white h-[180px] flex flex-col justify-between shadow-sm group-hover:shadow-md">
          <div>
            <h3 className="text-base font-extralight uppercase tracking-[0.12em] text-newtifi-navy mb-1 transition-all duration-300 group-hover:text-newtifi-teal line-clamp-2">{name}</h3>
            <p className="text-newtifi-navy font-light uppercase tracking-[0.2em] text-base line-clamp-2">{title}</p>
            {subtitle && (
              <p className="text-newtifi-navy/70 font-light uppercase tracking-wide text-sm line-clamp-1">{subtitle}</p>
            )}
          </div>
          
          <div className="flex justify-start">
            <span 
              className={cn(
                "flex items-center justify-center text-newtifi-navy transition-all duration-300",
                "bg-newtifi-teal/10 rounded-lg p-2",
                "group-hover:translate-x-1 group-hover:bg-newtifi-teal/20"
              )}
            >
              <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TeamMember;
