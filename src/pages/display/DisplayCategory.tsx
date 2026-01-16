import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import type { Category, DictionaryEntry } from '@/types/database';

export default function DisplayCategory() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  const { data: category, isLoading: categoryLoading } = useQuery({
    queryKey: ['category', categoryId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', categoryId)
        .single();
      if (error) throw error;
      return data as Category;
    },
    enabled: !!categoryId,
  });

  const { data: entries, isLoading: entriesLoading } = useQuery({
    queryKey: ['category-entries', categoryId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('entry_categories')
        .select('entry_id')
        .eq('category_id', categoryId);
      if (error) throw error;
      
      if (!data.length) return [];
      
      const { data: entriesData, error: entriesError } = await supabase
        .from('dictionary_entries')
        .select('*')
        .in('id', data.map(d => d.entry_id))
        .eq('status', 'published');
      if (entriesError) throw entriesError;
      return entriesData as DictionaryEntry[];
    },
    enabled: !!categoryId,
  });

  if (categoryLoading) {
    return <Skeleton className="h-96 w-full max-w-4xl" />;
  }

  return (
    <div className="text-center max-w-4xl">
      <Button
        variant="ghost"
        className="absolute left-8 top-1/2 -translate-y-1/2"
        onClick={() => navigate('/display')}
      >
        <ArrowLeft className="w-8 h-8" />
      </Button>

      <Badge className="mb-6">Category</Badge>
      <h2 className="text-display mb-4">{category?.name}</h2>
      {category?.description && (
        <p className="text-xl text-muted-foreground mb-8">{category.description}</p>
      )}

      {entriesLoading ? (
        <Skeleton className="h-32 w-full" />
      ) : entries?.length ? (
        <div className="grid gap-4 mt-8">
          {entries.slice(0, 5).map((entry) => (
            <button
              key={entry.id}
              onClick={() => navigate(`/display/entry/${entry.id}`)}
              className="text-left p-6 bg-card rounded-lg hover:bg-accent transition-colors"
            >
              <h3 className="text-2xl font-semibold">{entry.title}</h3>
              {entry.body && (
                <p className="text-muted-foreground mt-2 line-clamp-2">{entry.body}</p>
              )}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No entries in this category yet</p>
      )}
    </div>
  );
}
