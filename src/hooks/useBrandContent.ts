import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { BrandContent, ContentFieldType } from '@/types/database';

export function useBrandContent(brandId: string | undefined) {
  return useQuery({
    queryKey: ['brand_content', brandId],
    queryFn: async () => {
      if (!brandId) return [];
      const { data, error } = await supabase
        .from('brand_content')
        .select('*')
        .eq('brand_id', brandId)
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data as BrandContent[];
    },
    enabled: !!brandId,
  });
}

export function useUpdateBrandContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      brandId, 
      fieldType, 
      value 
    }: { 
      brandId: string; 
      fieldType: ContentFieldType; 
      value: string;
    }) => {
      // Check if content exists
      const { data: existing } = await supabase
        .from('brand_content')
        .select('id')
        .eq('brand_id', brandId)
        .eq('field_type', fieldType)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from('brand_content')
          .update({ value })
          .eq('id', existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('brand_content')
          .insert({ brand_id: brandId, field_type: fieldType, value, display_order: 0 });
        if (error) throw error;
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['brand_content', variables.brandId] });
    },
  });
}
