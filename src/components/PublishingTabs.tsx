import React, { useRef } from 'react';
import { cn } from '@/lib/utils';

export type PublishingTab = {
  id: string;
  label: string;
};

type PublishingTabsProps = {
  tabs: PublishingTab[];
  active: string;
  onChange: (id: string) => void;
  label: string;
  className?: string;
};

const PublishingTabs: React.FC<PublishingTabsProps> = ({ tabs, active, onChange, label, className }) => {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const move = (index: number) => {
    const next = (index + tabs.length) % tabs.length;
    onChange(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className={cn('border-b border-gray-200', className)}>
      <div role="tablist" aria-label={label} className="-mb-px flex gap-6 overflow-x-auto">
        {tabs.map((tab, index) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              id={`tab-${tab.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(tab.id)}
              onKeyDown={(event) => {
                if (event.key === 'ArrowRight') {
                  event.preventDefault();
                  move(index + 1);
                } else if (event.key === 'ArrowLeft') {
                  event.preventDefault();
                  move(index - 1);
                }
              }}
              className={cn(
                'min-h-[44px] shrink-0 whitespace-nowrap border-b-2 px-1 text-sm transition-[color,border-color] duration-150 ease-out-strong',
                selected
                  ? 'border-newtifi-navy font-bold text-newtifi-navy'
                  : 'border-transparent text-gray-600 fine:hover:border-gray-300 fine:hover:text-newtifi-navy'
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PublishingTabs;
