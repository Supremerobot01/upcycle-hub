import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { DictionaryEntry } from '@/types/database';

export function useDictionaryEntries(publishedOnly = true) {
  return useQuery({
    queryKey: ['dictionary_entries', { publishedOnly }],
    queryFn: async () => {
      let query = supabase
        .from('dictionary_entries')
        .select('*, entry_categories(category_id)')
        .order('title', { ascending: true });

      if (publishedOnly) {
        query = query.eq('status', 'published');
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as unknown as (DictionaryEntry & { entry_categories: { category_id: string }[] })[];
    },
  });
}

export function useDictionaryEntriesByCategory(categoryId: string | null, publishedOnly = true) {
  return useQuery({
    queryKey: ['dictionary_entries', 'category', categoryId, { publishedOnly }],
    queryFn: async () => {
      // If no category selected, return empty (use useDictionaryEntries for all)
      if (!categoryId) return [];

      const { data: entryIds, error: junctionError } = await supabase
        .from('entry_categories')
        .select('entry_id')
        .eq('category_id', categoryId);

      if (junctionError) throw junctionError;
      
      const ids = entryIds as unknown as { entry_id: string }[];
      if (!ids.length) return [];

      let query = supabase
        .from('dictionary_entries')
        .select('*, entry_categories(category_id)')
        .in('id', ids.map(e => e.entry_id))
        .order('title', { ascending: true });

      if (publishedOnly) {
        query = query.eq('status', 'published');
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as unknown as (DictionaryEntry & { entry_categories: { category_id: string }[] })[];
    },
    enabled: !!categoryId,
  });
}

export function useDictionaryEntry(slug: string | undefined) {
  return useQuery({
    queryKey: ['dictionary_entries', 'slug', slug],
    queryFn: async () => {
      if (!slug) return null;

      const { data, error } = await supabase
        .from('dictionary_entries')
        .select('*, entry_categories(category_id)')
        .eq('slug', slug)
        .maybeSingle();

      if (error) throw error;
      return data as unknown as (DictionaryEntry & { entry_categories: { category_id: string }[] }) | null;
    },
    enabled: !!slug,
  });
}

export function useUpdateDictionaryEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<DictionaryEntry> & { id: string }) => {
      const { data, error } = await supabase
        .from('dictionary_entries')
        .update(updates as Record<string, unknown>)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dictionary_entries'] });
    },
  });
}

export function useCreateDictionaryEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (entry: Omit<DictionaryEntry, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('dictionary_entries')
        .insert(entry)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dictionary_entries'] });
    },
  });
}
