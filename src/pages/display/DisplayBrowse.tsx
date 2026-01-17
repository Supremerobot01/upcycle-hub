import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useBrands, useFeaturedBrands } from '@/hooks/useBrands';
import { useDictionaryEntries } from '@/hooks/useDictionaryEntries';
import Hero from '@/components/display/Hero';
import CarouselRow from '@/components/display/CarouselRow';
import EntryModal from '@/components/display/EntryModal';
import BrandModal from '@/components/display/BrandModal';
import type { DictionaryEntry } from '@/types/database';
import type { DisplayBrand, DisplayItem } from '@/components/display/types';

type BrowseType = 'featured-brands' | 'brands' | 'entries';

const browseConfig: Record<BrowseType, { title: string; description: string }> = {
  'featured-brands': {
    title: 'Featured Brands',
    description: 'Our spotlight on exceptional upcycling brands making a difference.',
  },
  'brands': {
    title: 'All Brands',
    description: 'Discover all the brands in our upcycling directory.',
  },
  'entries': {
    title: 'Dictionary Entries',
    description: 'Explore our comprehensive upcycling dictionary.',
  },
};

export default function DisplayBrowse() {
  const { browseType } = useParams<{ browseType: string }>();
  const navigate = useNavigate();

  const { data: allBrands, isLoading: brandsLoading } = useBrands(true);
  const { data: featuredBrands, isLoading: featuredLoading } = useFeaturedBrands();
  const { data: entries, isLoading: entriesLoading } = useDictionaryEntries(true);

  const [selectedEntry, setSelectedEntry] = useState<DictionaryEntry | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<DisplayBrand | null>(null);

  const config = browseConfig[browseType as BrowseType] || browseConfig['entries'];

  const items = useMemo<DisplayItem[]>(() => {
    switch (browseType) {
      case 'featured-brands':
        return (featuredBrands as DisplayBrand[] | undefined)?.map((brand) => ({
          kind: 'brand',
          brand,
        })) || [];
      case 'brands':
        return (allBrands as DisplayBrand[] | undefined)?.map((brand) => ({
          kind: 'brand',
          brand,
        })) || [];
      case 'entries':
      default:
        return (entries as DictionaryEntry[] | undefined)?.map((entry) => ({
          kind: 'entry',
          entry,
        })) || [];
    }
  }, [browseType, featuredBrands, allBrands, entries]);

  const isLoading = browseType === 'featured-brands' ? featuredLoading 
    : browseType === 'brands' ? brandsLoading 
    : entriesLoading;

  const heroItem = items[0];

  const handleSelect = (item: DisplayItem) => {
    if (item.kind === 'entry') {
      setSelectedBrand(null);
      setSelectedEntry(item.entry);
    } else {
      setSelectedEntry(null);
      setSelectedBrand(item.brand);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-10 pb-12">
        <Skeleton className="h-16 w-64" />
        <Skeleton className="h-[50vh] w-full rounded-2xl" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Button variant="ghost" onClick={() => navigate('/display')}>
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to browse
        </Button>
        <div className="text-right">
          <h2 className="text-3xl font-semibold">{config.title}</h2>
          <p className="text-muted-foreground max-w-2xl">{config.description}</p>
        </div>
      </div>

      {heroItem && <Hero item={heroItem} onSelect={handleSelect} />}

      <CarouselRow 
        title={`All ${config.title}`} 
        items={items} 
        onSelect={handleSelect} 
      />

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
