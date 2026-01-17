import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useDictionaryEntriesByCategory } from '@/hooks/useDictionaryEntries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import DictionaryEntryCard from '@/components/dictionary/DictionaryEntryCard';
import type { Category } from '@/types/database';

export default function DictionaryCategory() {
  const { categoryId } = useParams<{ categoryId: string }>();
  
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

  const { data: entries, isLoading: entriesLoading } = useDictionaryEntriesByCategory(categoryId || null);

  if (categoryLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/dictionary">
        <Button variant="ghost" size="sm" className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dictionary
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">{category?.name || 'Category'}</h1>
        {category?.description && (
          <p className="text-muted-foreground mt-2">{category.description}</p>
        )}
      </div>

      {entriesLoading ? (
        <div className="grid md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32" />)}
        </div>
      ) : entries?.length ? (
        <div className="grid md:grid-cols-2 gap-4">
          {entries.map((entry) => (
            <Link key={entry.id} to={`/dictionary/entry/${entry.slug}`}>
              <DictionaryEntryCard entry={entry} />
            </Link>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No entries in this category yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
