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
    <div className={cn("flex h-full flex-col items-center", className)}>
      <Link
        to={`/person/${urlName}`}
        className="relative flex h-full w-full max-w-[280px] flex-col bg-white rounded-2xl overflow-hidden group cursor-pointer shadow-card transition-[transform,box-shadow] duration-200 ease-out-strong active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-newtifi-navy focus-visible:ring-offset-2 fine:hover:-translate-y-1 fine:hover:shadow-card-hover"
      >
        <div className="relative h-[240px] w-full shrink-0 overflow-hidden">
          <img
            src={imageSrc}
            alt={name}
            className="photo h-[360px] w-full object-cover"
            style={{
              objectPosition: name === 'Delphine Filsack' ? 'center 30%' : 'center 40%',
            }}
          />
        </div>

        <div className="p-6 bg-white flex flex-1 flex-col justify-between gap-6">
          <div>
            <h3 className="mb-2 text-base font-bold text-balance text-newtifi-navy transition-colors duration-200 ease-out-strong fine:group-hover:text-[#008f96]">{name}</h3>
            <p className="text-sm leading-relaxed text-gray-600 text-balance">{title}</p>
            {subtitle && (
              <p className="text-sm text-gray-500 line-clamp-1">{subtitle}</p>
            )}
          </div>
          
          <div className="flex justify-start">
            <span 
              className={cn(
                "flex items-center justify-center text-newtifi-navy",
                "bg-newtifi-teal/10 rounded-lg p-2",
                "transition-[background-color,transform] duration-200 ease-out-strong motion-reduce:transition-none",
                "fine:group-hover:translate-x-1 fine:group-hover:bg-newtifi-teal/20"
              )}
            >
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TeamMember;
