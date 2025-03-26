
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
      <div className="group p-6 h-full rounded-lg border border-gray-200 shadow-sm">
        <div className="mb-4 flex items-center justify-center h-8 w-8 bg-newtifi-teal bg-opacity-10 rounded-sm text-newtifi-teal">
          {icon}
        </div>
        <h3 className="text-xs font-light mb-3 uppercase tracking-wide text-newtifi-navy">
          {title}
        </h3>
        {description && (
          <p className="text-xs text-gray-700 font-light leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </ScrollReveal>
  );
};

export default TechCard;
