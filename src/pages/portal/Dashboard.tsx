import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useUserBrand } from '@/hooks/useBrands';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Store, Edit, Plus, Eye, BookOpen, FolderTree } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const { data: brand, isLoading } = useUserBrand(user?.id);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Welcome back!</h2>
        <p className="text-muted-foreground">Manage your brand listing and content</p>
      </div>

      {/* Brand Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="w-5 h-5" />
            Your Brand
          </CardTitle>
          <CardDescription>Your brand listing status and quick actions</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-24 w-full" />
          ) : brand ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{brand.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
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
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link to={`/portal/brands/edit/${brand.id}`}>
                    <Button>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Brand
                    </Button>
                  </Link>
                  <Link to="/dictionary">
                    <Button variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">You haven't created a brand listing yet.</p>
              <Link to="/portal/brands/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Brand Listing
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="w-5 h-5" />
              Dictionary Entries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Browse and manage dictionary entries
            </p>
            <Link to="/portal/dictionary">
              <Button variant="outline" className="w-full">View Entries</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FolderTree className="w-5 h-5" />
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Browse available categories
            </p>
            <Link to="/portal/categories">
              <Button variant="outline" className="w-full">View Categories</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
