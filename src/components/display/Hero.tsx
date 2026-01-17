import { Button } from '@/components/ui/button';
import { getBrandImage, getItemDescription, getItemTitle, type DisplayItem } from './types';

interface HeroProps {
  item: DisplayItem;
  onSelect: (item: DisplayItem) => void;
}

export default function Hero({ item, onSelect }: HeroProps) {
  const title = getItemTitle(item);
  const description = getItemDescription(item);
  const imageUrl = item.kind === 'brand' ? getBrandImage(item.brand) : undefined;

  return (
    <section className="relative overflow-hidden rounded-2xl bg-muted">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-muted to-muted" />
      )}
      {/* Layered gradients for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      <div className="relative flex min-h-[56vh] flex-col justify-end gap-6 p-12">
        <p className="text-sm uppercase tracking-widest text-white/70">
          {item.kind === 'entry' ? 'Featured Entry' : 'Featured Brand'}
        </p>
        <h2 className="text-5xl font-bold text-white md:text-6xl drop-shadow-lg">{title}</h2>
        {description && (
          <p className="max-w-2xl text-xl text-white/80 line-clamp-3 drop-shadow-md">{description}</p>
        )}
        <div className="pt-2">
          <Button size="lg" className="text-lg px-8 py-6" onClick={() => onSelect(item)}>
            View details
          </Button>
        </div>
      </div>
    </section>
  );
}
