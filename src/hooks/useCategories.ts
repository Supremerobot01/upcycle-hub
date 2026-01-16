import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Category } from '@/types/database';

export function useCategories(activeOnly = true) {
  return useQuery({
    queryKey: ['categories', { activeOnly }],
    queryFn: async () => {
      let query = supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });

      if (activeOnly) {
        query = query.eq('active', true);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Category[];
    },
  });
}

export function useCategoriesGrouped(activeOnly = true) {
  const { data: categories, ...rest } = useCategories(activeOnly);

  const grouped = categories?.reduce((acc, category) => {
    const group = category.group_name || 'Other';
    if (!acc[group]) acc[group] = [];
    acc[group].push(category);
    return acc;
  }, {} as Record<string, Category[]>);

  return { grouped, categories, ...rest };
}
