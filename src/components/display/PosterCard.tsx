import { getBrandContentValue, getItemDescription, getItemTitle, type DisplayItem } from './types';

interface PosterCardProps {
  item: DisplayItem;
  onSelect: (item: DisplayItem) => void;
}

export default function PosterCard({ item, onSelect }: PosterCardProps) {
  const title = getItemTitle(item);
  const description = getItemDescription(item);
  const imageUrl =
    item.kind === 'brand'
      ? getBrandContentValue(item.brand, 'image') || getBrandContentValue(item.brand, 'logo')
      : undefined;

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className="group w-56 shrink-0 text-left"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-muted ring-1 ring-border transition-transform duration-200 group-hover:scale-[1.02]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-muted to-muted/50" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-sm uppercase tracking-wide text-white/70">
            {item.kind === 'entry' ? 'Entry' : 'Brand'}
          </p>
          <p className="text-lg font-semibold text-white line-clamp-2">{title}</p>
        </div>
      </div>
      {description && (
        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{description}</p>
      )}
    </button>
  );
}
