import { useMemo, useState } from 'react';
import { useBrands, useFeaturedBrands } from '@/hooks/useBrands';
import { useCategories } from '@/hooks/useCategories';
import { useDictionaryEntries } from '@/hooks/useDictionaryEntries';
import Hero from '@/components/display/Hero';
import CarouselRow from '@/components/display/CarouselRow';
import EntryModal from '@/components/display/EntryModal';
import BrandModal from '@/components/display/BrandModal';
import { Skeleton } from '@/components/ui/skeleton';
import type { DictionaryEntry } from '@/types/database';
import type { DisplayBrand, DisplayItem } from '@/components/display/types';

type EntryWithCategories = DictionaryEntry & { entry_categories?: { category_id: string }[] };

export default function DisplayHome() {
  const { data: categories } = useCategories(true);
  const { data: entries } = useDictionaryEntries(true);
  const { data: brands } = useBrands(true);
  const { data: featuredBrands } = useFeaturedBrands();

  const [selectedEntry, setSelectedEntry] = useState<DictionaryEntry | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<DisplayBrand | null>(null);

  const entryItems = useMemo<DisplayItem[]>(() => {
    return (entries as EntryWithCategories[] | undefined)?.map((entry) => ({
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

  const featuredItems = useMemo<DisplayItem[]>(() => {
    return (featuredBrands as DisplayBrand[] | undefined)?.map((brand) => ({
      kind: 'brand',
      brand,
    })) || [];
  }, [featuredBrands]);

  const categoryRows = useMemo(() => {
    if (!categories?.length || !entries?.length) return [];
    const entriesWithCategories = entries as EntryWithCategories[];

    return categories.slice(0, 5).map((category) => {
      const items = entriesWithCategories
        .filter((entry) => entry.entry_categories?.some((cat) => cat.category_id === category.id))
        .map<DisplayItem>((entry) => ({ kind: 'entry', entry }));

      return {
        title: category.name,
        items,
      };
    }).filter((row) => row.items.length > 0);
  }, [categories, entries]);

  const rows = useMemo(() => {
    const baseRows = [
      { title: 'Featured Brands', items: featuredItems },
      { title: 'New Brands', items: brandItems.slice(0, 12) },
      { title: 'Dictionary Entries', items: entryItems.slice(0, 12) },
      ...categoryRows,
    ].filter((row) => row.items.length > 0);

    if (baseRows.length < 5 && entryItems.length > 12) {
      baseRows.push({ title: 'More Entries', items: entryItems.slice(12, 24) });
    }

    if (baseRows.length < 5 && brandItems.length > 12) {
      baseRows.push({ title: 'More Brands', items: brandItems.slice(12, 24) });
    }

    return baseRows;
  }, [featuredItems, brandItems, entryItems, categoryRows]);

  const heroItem = featuredItems[0] || entryItems[0] || brandItems[0];

  const handleSelect = (item: DisplayItem) => {
    if (item.kind === 'entry') {
      setSelectedBrand(null);
      setSelectedEntry(item.entry);
    } else {
      setSelectedEntry(null);
      setSelectedBrand(item.brand);
    }
  };

  return (
    <div className="space-y-12 pb-12">
      {heroItem ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Hero item={heroItem} onSelect={handleSelect} />
        </div>
      ) : (
        <Skeleton className="h-[56vh] w-full rounded-2xl" />
      )}

      <div className="space-y-12">
        {rows.length ? (
          rows.map((row, rowIndex) => (
            <div
              key={row.title}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${200 + rowIndex * 100}ms`, animationFillMode: 'both' }}
            >
              <CarouselRow
                title={row.title}
                items={row.items}
                onSelect={handleSelect}
                variant={rowIndex === 0 ? 'featured' : 'default'}
              />
            </div>
          ))
        ) : (
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="flex gap-4 overflow-x-auto pb-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-72 w-56 rounded-xl" />
              ))}
            </div>
          </div>
        )}
      </div>

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
