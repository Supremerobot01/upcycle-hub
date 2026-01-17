import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useCategories } from '@/hooks/useCategories';
import { useDictionaryEntriesByCategory } from '@/hooks/useDictionaryEntries';
import { useBrandsByCategory } from '@/hooks/useBrands';
import Hero from '@/components/display/Hero';
import CarouselRow from '@/components/display/CarouselRow';
import EntryModal from '@/components/display/EntryModal';
import BrandModal from '@/components/display/BrandModal';
import type { DictionaryEntry } from '@/types/database';
import type { DisplayBrand, DisplayItem } from '@/components/display/types';

export default function DisplayCategory() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  const { data: categories, isLoading: categoriesLoading } = useCategories(true);
  const { data: entries, isLoading: entriesLoading } = useDictionaryEntriesByCategory(categoryId ?? null, true);
  const { data: brands, isLoading: brandsLoading } = useBrandsByCategory(categoryId ?? null, true);

  const [selectedEntry, setSelectedEntry] = useState<DictionaryEntry | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<DisplayBrand | null>(null);

  const category = categories?.find((item) => item.id === categoryId);

  const entryItems = useMemo<DisplayItem[]>(() => {
    return (entries as DictionaryEntry[] | undefined)?.map((entry) => ({
      kind: 'entry',
      entry,
    })) || [];
  }, [entries]);

  const brandItems = useMemo<DisplayItem[]>(() => {
    return (brands as DisplayBrand[] | undefined)?.map((brand) => ({
      kind: 'brand',
      brand,
    })) || [];
  }, [brands]);

  const heroItem = entryItems[0] || brandItems[0];

  const handleSelect = (item: DisplayItem) => {
    if (item.kind === 'entry') {
      setSelectedBrand(null);
      setSelectedEntry(item.entry);
    } else {
      setSelectedEntry(null);
      setSelectedBrand(item.brand);
    }
  };

  if (categoriesLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  return (
    <div className="space-y-10 pb-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Button variant="ghost" onClick={() => navigate('/display')}>
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to browse
        </Button>
        <div className="text-right">
          <p className="text-sm uppercase tracking-wide text-muted-foreground">Category</p>
          <h2 className="text-3xl font-semibold">{category?.name || 'Category'}</h2>
          {category?.description ? (
            <p className="text-muted-foreground max-w-2xl">{category.description}</p>
          ) : null}
        </div>
      </div>

      {heroItem ? <Hero item={heroItem} onSelect={handleSelect} /> : null}

      {entriesLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <CarouselRow title="Entries" items={entryItems} onSelect={handleSelect} />
      )}

      {brandsLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <CarouselRow title="Brands" items={brandItems} onSelect={handleSelect} />
      )}

      <EntryModal
        entry={selectedEntry}
        open={!!selectedEntry}
        onOpenChange={(open) => !open && setSelectedEntry(null)}
      />
      <BrandModal
        brand={selectedBrand}
        open={!!selectedBrand}
        onOpenChange={(open) => !open && setSelectedBrand(null)}
      />
    </div>
  );
}
