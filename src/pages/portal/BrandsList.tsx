import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useUserBrand } from '@/hooks/useBrands';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Edit } from 'lucide-react';

export default function BrandsList() {
  const { user } = useAuth();
  const { data: brand, isLoading } = useUserBrand(user?.id);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">My Brand</h2>
          <p className="text-muted-foreground">Manage your brand listing</p>
        </div>
        {!brand && (
          <Link to="/portal/brands/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Brand
            </Button>
          </Link>
        )}
      </div>

      {brand ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{brand.name}</CardTitle>
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
              <Button onClick={() => navigate(`/portal/brands/edit/${brand.id}`)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 text-sm">
              {brand.website_url && (
                <p><span className="text-muted-foreground">Website:</span> {brand.website_url}</p>
              )}
              {brand.email && (
                <p><span className="text-muted-foreground">Email:</span> {brand.email}</p>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">You haven't created a brand listing yet.</p>
            <Link to="/portal/brands/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Brand Listing
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
