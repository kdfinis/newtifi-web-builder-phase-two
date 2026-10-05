import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export type PageHeroCrumb = {
  label: string;
  to?: string;
};

type PageHeroProps = {
  title: React.ReactNode;
  lede?: React.ReactNode;
  crumbs?: PageHeroCrumb[];
  children?: React.ReactNode;
  compact?: boolean;
  className?: string;
  titleClassName?: string;
  kicker?: React.ReactNode;
};

const PageHero: React.FC<PageHeroProps> = ({
  title,
  lede,
  crumbs,
  children,
  compact = false,
  className,
  titleClassName,
  kicker,
}) => (
  <section className={cn('institute-hero text-white', className)}>
    <div className={cn('container mx-auto px-6', compact ? 'py-14 md:py-16' : 'py-20 md:py-28')}>
      <div className="max-w-3xl">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/70">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {crumbs.map((crumb, index) => {
                const isLast = index === crumbs.length - 1;
                return (
                  <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                    {crumb.to && !isLast ? (
                      <Link
                        to={crumb.to}
                        className="underline-offset-4 transition-colors duration-150 ease-out-strong fine:hover:text-white fine:hover:underline"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span aria-current={isLast ? 'page' : undefined} className={isLast ? 'text-white' : undefined}>
                        {crumb.label}
                      </span>
                    )}
                    {!isLast && <span aria-hidden="true">/</span>}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}
        {kicker && <p className="mb-4 text-sm text-newtifi-teal">{kicker}</p>}
        <h1
          className={cn(
            'text-3xl md:text-4xl lg:text-5xl leading-[1.08] tracking-[-0.02em] text-balance font-normal',
            titleClassName
          )}
        >
          {title}
        </h1>
        {lede && (
          <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-white/80 text-pretty">{lede}</p>
        )}
        {children && <div className="mt-8 flex flex-wrap gap-4">{children}</div>}
      </div>
    </div>
  </section>
);

export default PageHero;
