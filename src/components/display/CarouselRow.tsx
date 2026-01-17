import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PosterCard from './PosterCard';
import type { DisplayItem } from './types';

interface CarouselRowProps {
  title: string;
  items: DisplayItem[];
  onSelect: (item: DisplayItem) => void;
  variant?: 'default' | 'featured';
  onExploreAll?: () => void;
}

export default function CarouselRow({ title, items, onSelect, variant = 'default', onExploreAll }: CarouselRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  if (!items.length) return null;

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="group/row space-y-4">
      <div className="flex items-end justify-between">
        <h3 className="text-3xl font-bold">{title}</h3>
        {onExploreAll ? (
          <button 
            onClick={onExploreAll}
            className="text-sm text-muted-foreground hover:text-primary opacity-0 transition-all group-hover/row:opacity-100 cursor-pointer"
          >
            Explore all →
          </button>
        ) : (
          <span className="text-sm text-muted-foreground/50 opacity-0 transition-opacity group-hover/row:opacity-100">
            {items.length} items
          </span>
        )}
      </div>
      <div className="relative">
        {/* Left fade + arrow */}
        <div className={`absolute left-0 top-0 bottom-4 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none transition-opacity duration-300 ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`} />
        {canScrollLeft && (
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full opacity-0 transition-opacity group-hover/row:opacity-100 shadow-lg"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
        >
          {items.map((item, index) => (
            <PosterCard
              key={`${item.kind}-${item.kind === 'entry' ? item.entry.id : item.brand.id}`}
              item={item}
              onSelect={onSelect}
              index={index}
              variant={variant}
            />
          ))}
        </div>

        {/* Right fade + arrow */}
        <div className={`absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none transition-opacity duration-300 ${canScrollRight ? 'opacity-100' : 'opacity-0'}`} />
        {canScrollRight && (
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full opacity-0 transition-opacity group-hover/row:opacity-100 shadow-lg"
            onClick={() => scroll('right')}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}
      </div>
    </section>
  );
}
