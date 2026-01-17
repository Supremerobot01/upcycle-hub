import { Button } from '@/components/ui/button';
import { getBrandContentValue, getItemDescription, getItemTitle, type DisplayItem } from './types';

interface HeroProps {
  item: DisplayItem;
  onSelect: (item: DisplayItem) => void;
}

export default function Hero({ item, onSelect }: HeroProps) {
  const title = getItemTitle(item);
  const description = getItemDescription(item);
  const imageUrl =
    item.kind === 'brand'
      ? getBrandContentValue(item.brand, 'image') || getBrandContentValue(item.brand, 'logo')
      : undefined;

  return (
    <section className="relative overflow-hidden rounded-2xl bg-muted">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="relative flex min-h-[240px] flex-col justify-end gap-4 p-10">
        <p className="text-sm uppercase tracking-wide text-white/70">
          {item.kind === 'entry' ? 'Featured Entry' : 'Featured Brand'}
        </p>
        <h2 className="text-4xl font-bold text-white">{title}</h2>
        {description && (
          <p className="max-w-2xl text-lg text-white/80 line-clamp-3">{description}</p>
        )}
        <div>
          <Button size="lg" onClick={() => onSelect(item)}>
            View details
          </Button>
        </div>
      </div>
    </section>
  );
}
