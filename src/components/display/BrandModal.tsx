import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getBrandContentValue, type DisplayBrand } from './types';

interface BrandModalProps {
  brand: DisplayBrand | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BrandModal({ brand, open, onOpenChange }: BrandModalProps) {
  const logoUrl = brand ? getBrandContentValue(brand, 'logo') : undefined;
  const imageUrl = brand ? getBrandContentValue(brand, 'image') : undefined;
  const blurb = brand ? getBrandContentValue(brand, 'blurb') : undefined;
  const bio = brand ? getBrandContentValue(brand, 'bio') : undefined;
  const videoUrl = brand ? getBrandContentValue(brand, 'video_url') : undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[92vw] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl flex items-center gap-4">
            {logoUrl ? (
              <img src={logoUrl} alt={brand?.name || 'Brand'} className="h-10 w-10 rounded" />
            ) : null}
            {brand?.name}
          </DialogTitle>
          <DialogDescription>Brand Profile</DialogDescription>
        </DialogHeader>

        {imageUrl ? (
          <img src={imageUrl} alt={brand?.name || 'Brand'} className="w-full rounded-xl" />
        ) : null}

        {blurb ? (
          <p className="text-lg text-muted-foreground">{blurb}</p>
        ) : null}

        {bio ? (
          <p className="text-base text-muted-foreground whitespace-pre-line">{bio}</p>
        ) : null}

        <div className="flex flex-wrap gap-3">
          {brand?.tier ? (
            <Badge variant="outline" className="text-base">{brand.tier} tier</Badge>
          ) : null}
          {brand?.website_url ? (
            <a
              href={brand.website_url}
              target="_blank"
              rel="noreferrer"
              className="text-primary underline text-base"
            >
              {brand.website_url}
            </a>
          ) : null}
        </div>

        {videoUrl ? (
          <div className="mt-6">
            <p className="text-sm uppercase tracking-wide text-muted-foreground">Video</p>
            <a href={videoUrl} target="_blank" rel="noreferrer" className="text-primary underline">
              {videoUrl}
            </a>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
