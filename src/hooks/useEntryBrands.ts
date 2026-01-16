import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Brand, BrandContent } from '@/types/database';

interface BrandWithContent extends Brand {
  blurb?: string;
  logo?: string;
}

export function useEntryBrands(entryId: string | undefined) {
  return useQuery({
    queryKey: ['entry_brands', entryId],
    queryFn: async () => {
      if (!entryId) return [];

      // Get category IDs for this entry
      const { data: entryCategories } = await supabase
        .from('entry_categories')
        .select('category_id')
        .eq('entry_id', entryId);

      if (!entryCategories || entryCategories.length === 0) return [];

      const categoryIds = entryCategories.map(ec => ec.category_id);

      // Get brands matching these categories
      const { data: brands, error } = await supabase
        .from('brands')
        .select('*')
        .eq('status', 'published')
        .or(`primary_category_id.in.(${categoryIds.join(',')}),secondary_category_id.in.(${categoryIds.join(',')})`)
        .order('tier', { ascending: false });

      if (error) throw error;
      if (!brands || brands.length === 0) return [];

      // Get content for these brands
      const { data: content } = await supabase
        .from('brand_content')
        .select('*')
        .in('brand_id', brands.map(b => b.id))
        .in('field_type', ['blurb', 'logo']);

      // Merge content with brands
      const brandsWithContent: BrandWithContent[] = brands.map(brand => {
        const brandContent = content?.filter(c => c.brand_id === brand.id) || [];
        const blurb = brandContent.find(c => c.field_type === 'blurb')?.value;
        const logo = brandContent.find(c => c.field_type === 'logo')?.value;
        return { ...brand, blurb, logo };
      });

      return brandsWithContent;
    },
    enabled: !!entryId,
  });
}
