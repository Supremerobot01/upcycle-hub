import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import BrandForm from '@/components/portal/BrandForm';
import type { Brand } from '@/types/database';

export default function BrandEdit() {
  const { brandId } = useParams<{ brandId: string }>();
  const navigate = useNavigate();

  const { data: brand, isLoading } = useQuery({
    queryKey: ['brand', brandId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .eq('id', brandId)
        .single();
      if (error) throw error;
      return data as Brand;
    },
    enabled: !!brandId,
  });

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <p className="text-muted-foreground mb-4">Brand not found</p>
        <Button variant="outline" onClick={() => navigate('/portal/dashboard')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Button 
        variant="ghost" 
        className="mb-4" 
        onClick={() => navigate('/portal/dashboard')}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Button>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                Edit Brand
              </CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1">
                <Badge variant={brand.status === 'published' ? 'default' : 'secondary'}>
                  {brand.status}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={
                    brand.tier === 'featured' 
                      ? 'border-tier-featured text-tier-featured' 
                      : brand.tier === 'standard' 
                      ? 'border-tier-standard text-tier-standard' 
                      : 'border-tier-basic text-tier-basic'
                  }
                >
                  {brand.tier} tier
                </Badge>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <BrandForm brand={brand} />
        </CardContent>
      </Card>
    </div>
  );
}
