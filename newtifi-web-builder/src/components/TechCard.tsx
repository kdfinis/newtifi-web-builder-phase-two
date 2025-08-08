
import React from 'react';
import { cn } from '@/lib/utils';
import ScrollReveal from './ScrollReveal';

type TechCardProps = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  delay?: number;
  className?: string;
};

const TechCard: React.FC<TechCardProps> = ({
  title,
  description,
  icon,
  delay = 0,
  className,
}) => {
  return (
    <ScrollReveal delay={delay} className={cn("flex flex-col", className)}>
      <div className="group p-6 h-full rounded-lg border border-gray-200 shadow-sm card-hover">
        <div className="mb-4 flex items-center justify-center h-10 w-10 bg-newtifi-teal bg-opacity-20 rounded-lg text-newtifi-teal">
          {icon}
        </div>
        <h3 className="text-base font-medium mb-2 text-newtifi-navy uppercase tracking-wider group-hover:text-newtifi-teal transition-colors">
          {title}
        </h3>
        {description && (
          <p className="text-gray-700 text-xs font-light">
            {description}
          </p>
        )}
      </div>
    </ScrollReveal>
  );
};

export default TechCard;
