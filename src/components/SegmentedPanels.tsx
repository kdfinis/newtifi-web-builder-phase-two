import React, { useId, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export type SegmentedPanelItem = {
  title: string;
  summary?: React.ReactNode;
  intro?: React.ReactNode;
  bullets?: React.ReactNode[];
  extra?: React.ReactNode;
};

type SegmentedPanelsProps = {
  items: SegmentedPanelItem[];
  tone?: 'light' | 'dark';
  label: string;
  className?: string;
};

const SegmentedPanels: React.FC<SegmentedPanelsProps> = ({ items, tone = 'light', label, className }) => {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();
  const isDark = tone === 'dark';
  const current = items[active];

  const focusTab = (index: number) => {
    const next = (index + items.length) % items.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        focusTab(index + 1);
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        focusTab(index - 1);
        break;
      case 'Home':
        event.preventDefault();
        focusTab(0);
        break;
      case 'End':
        event.preventDefault();
        focusTab(items.length - 1);
        break;
      default:
        break;
    }
  };

  if (!current) return null;

  return (
    <div className={cn('grid gap-6 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-10', className)}>
      <div
        role="tablist"
        aria-label={label}
        aria-orientation="vertical"
        className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {items.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.title}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              id={`${baseId}-tab-${index}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={cn(
                'shrink-0 rounded-lg border-l-2 px-4 py-3 text-left text-sm transition-[background-color,color,border-color] duration-150 ease-out-strong lg:w-full',
                isDark
                  ? selected
                    ? 'border-newtifi-teal bg-white/10 text-white font-bold'
                    : 'border-transparent text-white/70 fine:hover:bg-white/5 fine:hover:text-white'
                  : selected
                    ? 'border-newtifi-teal bg-newtifi-navy/5 text-newtifi-navy font-bold'
                    : 'border-transparent text-gray-600 fine:hover:bg-gray-50 fine:hover:text-newtifi-navy'
              )}
            >
              {item.title}
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        tabIndex={0}
        className={cn(
          'rounded-2xl p-6 md:p-8 focus:outline-none',
          isDark ? 'bg-white/5 text-white ring-1 ring-inset ring-white/10' : 'surface-card text-gray-700'
        )}
      >
        <h3 className={cn('text-xl md:text-2xl', isDark ? 'text-white' : 'text-newtifi-navy')}>{current.title}</h3>
        {current.summary && (
          <p className={cn('mt-3 text-base leading-relaxed text-pretty', isDark ? 'text-white/80' : 'text-gray-700')}>
            {current.summary}
          </p>
        )}
        {current.intro && (
          <p className={cn('mt-4 text-base leading-relaxed text-pretty', isDark ? 'text-white/80' : 'text-gray-700')}>
            {current.intro}
          </p>
        )}
        {current.bullets && current.bullets.length > 0 && (
          <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-newtifi-teal">
            {current.bullets.map((bullet, index) => (
              <li key={index} className={cn('leading-relaxed text-pretty', isDark ? 'text-white/80' : 'text-gray-700')}>
                {bullet}
              </li>
            ))}
          </ul>
        )}
        {current.extra && <div className="mt-6">{current.extra}</div>}
      </div>
    </div>
  );
};

export default SegmentedPanels;
