import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Brand, BrandContent } from '@/types/database';

export function useBrands(publishedOnly = true) {
  return useQuery({
    queryKey: ['brands', { publishedOnly }],
    queryFn: async () => {
      let query = supabase
        .from('brands')
        .select('*, brand_content(*)')
        .order('created_at', { ascending: false });

      if (publishedOnly) {
        query = query.eq('status', 'published');
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as unknown as (Brand & { brand_content: BrandContent[] })[];
    },
  });
}

export function useBrandsByCategory(categoryId: string | null, publishedOnly = true) {
  return useQuery({
    queryKey: ['brands', 'category', categoryId, { publishedOnly }],
    queryFn: async () => {
      if (!categoryId) return [];

      let query = supabase
        .from('brands')
        .select('*, brand_content(*)')
        .or(`primary_category_id.eq.${categoryId},secondary_category_id.eq.${categoryId}`)
        .order('tier', { ascending: false });

      if (publishedOnly) {
        query = query.eq('status', 'published');
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as unknown as (Brand & { brand_content: BrandContent[] })[];
    },
    enabled: !!categoryId,
  });
}

export function useFeaturedBrands() {
  return useQuery({
    queryKey: ['brands', 'featured'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('brands')
        .select('*, brand_content(*)')
        .eq('status', 'published')
        .eq('tier', 'featured')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as unknown as (Brand & { brand_content: BrandContent[] })[];
    },
  });
}

export function useUserBrand(userId: string | undefined) {
  return useQuery({
    queryKey: ['brands', 'user', userId],
    queryFn: async () => {
      if (!userId) return null;

      const { data, error } = await supabase
        .from('brands')
        .select('*, brand_content(*)')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) throw error;
      return data as unknown as (Brand & { brand_content: BrandContent[] }) | null;
    },
    enabled: !!userId,
  });
}

export function useUpdateBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Brand> & { id: string }) => {
      const { data, error } = await supabase
        .from('brands')
        .update(updates as Record<string, unknown>)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    },
  });
}

export function useCreateBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (brand: Omit<Brand, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('brands')
        .insert(brand)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    },
  });
}
