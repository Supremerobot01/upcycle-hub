import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import type { DictionaryEntry, Brand } from '@/types/database';

export default function DisplayEntry() {
  const { entryId } = useParams<{ entryId: string }>();
  const navigate = useNavigate();

  const { data: entry, isLoading: entryLoading } = useQuery({
    queryKey: ['entry', entryId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('dictionary_entries')
        .select('*')
        .eq('id', entryId)
        .single();
      if (error) throw error;
      return data as DictionaryEntry;
    },
    enabled: !!entryId,
  });

  // Get categories for this entry, then get brands in those categories
  const { data: relatedBrands } = useQuery({
    queryKey: ['entry-brands', entryId],
    queryFn: async () => {
      // Get categories for this entry
      const { data: entryCategories } = await supabase
        .from('entry_categories')
        .select('category_id')
        .eq('entry_id', entryId);
      
      if (!entryCategories?.length) return [];
      
      const categoryIds = entryCategories.map(ec => ec.category_id);
      
      // Get brands in those categories
      const { data: brands } = await supabase
        .from('brands')
        .select('*')
        .eq('status', 'published')
        .or(`primary_category_id.in.(${categoryIds.join(',')}),secondary_category_id.in.(${categoryIds.join(',')})`)
        .limit(3);
      
      return brands as Brand[];
    },
    enabled: !!entryId,
  });

  if (entryLoading) {
    return <Skeleton className="h-96 w-full max-w-4xl" />;
  }

  return (
    <div className="text-center max-w-4xl">
      <Button
        variant="ghost"
        className="absolute left-8 top-1/2 -translate-y-1/2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-8 h-8" />
      </Button>

      <Badge className="mb-6">Dictionary Entry</Badge>
      <h2 className="text-display mb-8">{entry?.title}</h2>
      {entry?.body && (
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {entry.body}
        </p>
      )}

      {relatedBrands?.length ? (
        <div className="mt-12">
          <p className="text-sm text-muted-foreground mb-4">Related Brands</p>
          <div className="flex justify-center gap-4 flex-wrap">
            {relatedBrands.map((brand) => (
              <Badge 
                key={brand.id} 
                variant="outline" 
                className="text-lg px-4 py-2"
              >
                {brand.name}
              </Badge>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
