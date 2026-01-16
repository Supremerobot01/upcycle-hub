import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useUserBrand } from '@/hooks/useBrands';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Recycle, LogOut, ExternalLink, Edit } from 'lucide-react';
import BrandForm from '@/components/portal/BrandForm';

export default function Portal() {
  const { user, loading: authLoading, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { data: brand, isLoading: brandLoading } = useUserBrand(user?.id);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Skeleton className="w-32 h-32 rounded-full" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Recycle className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-semibold">Brand Portal</h1>
          </div>
          <div className="flex items-center gap-3">
            {isAdmin && (
              <Button variant="outline" size="sm" onClick={() => navigate('/admin')}>
                Admin
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={() => navigate('/dictionary')}>
              <ExternalLink className="w-4 h-4 mr-2" />
              View Dictionary
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {brandLoading ? (
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-64" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-64 w-full" />
              </CardContent>
            </Card>
          ) : brand ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {brand.name}
                      <Badge variant={brand.status === 'published' ? 'default' : 'secondary'}>
                        {brand.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
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
                  <Edit className="w-5 h-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <BrandForm brand={brand} />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Create Your Brand Listing</CardTitle>
                <CardDescription>
                  Get started by setting up your upcycling brand profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BrandForm />
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
