import PosterCard from './PosterCard';
import type { DisplayItem } from './types';

interface CarouselRowProps {
  title: string;
  items: DisplayItem[];
  onSelect: (item: DisplayItem) => void;
}

export default function CarouselRow({ title, items, onSelect }: CarouselRowProps) {
  if (!items.length) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between">
        <h3 className="text-2xl font-semibold">{title}</h3>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {items.map((item) => (
          <PosterCard key={`${item.kind}-${item.kind === 'entry' ? item.entry.id : item.brand.id}`} item={item} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}
