import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { useEntryBrands } from '@/hooks/useEntryBrands';
import type { DictionaryEntry } from '@/types/database';

interface EntryModalProps {
  entry: DictionaryEntry | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EntryModal({ entry, open, onOpenChange }: EntryModalProps) {
  const { data: relatedBrands, isLoading } = useEntryBrands(entry?.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[92vw] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl">{entry?.title}</DialogTitle>
          <DialogDescription>Dictionary Entry</DialogDescription>
        </DialogHeader>

        {entry?.body ? (
          <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
            {entry.body}
          </p>
        ) : null}

        <div className="mt-8 space-y-3">
          <p className="text-sm uppercase tracking-wide text-muted-foreground">Related Brands</p>
          {isLoading ? (
            <Skeleton className="h-10 w-full" />
          ) : relatedBrands?.length ? (
            <div className="flex flex-wrap gap-3">
              {relatedBrands.map((brand) => (
                <Badge key={brand.id} variant="outline" className="px-4 py-2 text-base">
                  {brand.name}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No related brands available.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
