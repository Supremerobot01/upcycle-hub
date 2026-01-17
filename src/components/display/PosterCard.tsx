import { Badge } from '@/components/ui/badge';
import { getBrandImage, getItemDescription, getItemTitle, type DisplayItem } from './types';

interface PosterCardProps {
  item: DisplayItem;
  onSelect: (item: DisplayItem) => void;
  index?: number;
  variant?: 'default' | 'featured';
}

export default function PosterCard({ item, onSelect, index = 0, variant = 'default' }: PosterCardProps) {
  const title = getItemTitle(item);
  const description = getItemDescription(item);
  const imageUrl = item.kind === 'brand' ? getBrandImage(item.brand) : undefined;

  const isNew =
    item.kind === 'entry'
      ? Date.now() - new Date(item.entry.created_at).getTime() < 7 * 24 * 60 * 60 * 1000
      : Date.now() - new Date(item.brand.created_at).getTime() < 7 * 24 * 60 * 60 * 1000;

  const tier = item.kind === 'brand' ? item.brand.tier : null;

  const isFeatured = variant === 'featured';

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className={`group shrink-0 text-left ${
        isFeatured ? 'w-80' : 'w-56'
      }`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div
        className={`relative overflow-hidden rounded-[10px] bg-muted shadow-[0_2px_12px_rgba(0,0,0,0.35)] transition-[transform,box-shadow] duration-[220ms] ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-[1.06] group-hover:z-10 group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.08)] ${
          isFeatured ? 'aspect-video' : 'aspect-[2/3]'
        }`}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-primary/20 via-muted to-muted/50" />
        )}
        {/* Base gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/90" />
        {/* Cinematic vignette */}
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(to_top,rgba(0,0,0,0.35),transparent_40%)]" />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 right-2 flex gap-2">
          {isNew && (
            <Badge className="bg-green-500 text-white text-xs">NEW</Badge>
          )}
          {tier === 'featured' && (
            <Badge className="bg-white/90 text-slate-700 text-xs font-bold tracking-wide border-2 border-slate-300/50 shadow-md">Featured</Badge>
          )}
        </div>

        {/* Base info - always visible */}
        <div className={`absolute left-3 right-3 transition-all duration-300 ${
          isFeatured ? 'bottom-4 group-hover:bottom-20' : 'bottom-3 group-hover:bottom-24'
        }`}>
          <p className="text-xs uppercase tracking-widest text-white/60">
            {item.kind === 'entry' ? 'Entry' : 'Brand'}
          </p>
          <p className={`font-bold text-white drop-shadow-md ${
            isFeatured ? 'text-xl line-clamp-1' : 'text-lg line-clamp-2'
          }`}>{title}</p>
        </div>

        {/* Expanded info - visible on hover */}
        <div className={`absolute left-3 right-3 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 ${
          isFeatured ? 'bottom-4' : 'bottom-3'
        }`}>
          {description && (
            <p className="text-sm text-white/80 line-clamp-2">{description}</p>
          )}
          <p className="mt-2 text-xs font-medium text-primary">Click to view →</p>
        </div>
      </div>
    </button>
  );
}
