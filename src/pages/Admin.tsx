import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useCategories } from '@/hooks/useCategories';
import { useBrands } from '@/hooks/useBrands';
import { useDictionaryEntries } from '@/hooks/useDictionaryEntries';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Recycle, LogOut, ArrowLeft, Star, StarOff } from 'lucide-react';
import type { BrandTier } from '@/types/database';

export default function Admin() {
  const { user, loading: authLoading, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { data: categories, isLoading: categoriesLoading, refetch: refetchCategories } = useCategories(false);
  const { data: brands, isLoading: brandsLoading, refetch: refetchBrands } = useBrands(false);
  const { data: entries, isLoading: entriesLoading, refetch: refetchEntries } = useDictionaryEntries(false);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/portal');
    }
  }, [user, authLoading, isAdmin, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const toggleCategoryActive = async (id: string, active: boolean) => {
    const { error } = await supabase
      .from('categories')
      .update({ active: !active })
      .eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      refetchCategories();
    }
  };

  const updateBrandTier = async (id: string, tier: BrandTier) => {
    const { error } = await supabase
      .from('brands')
      .update({ tier })
      .eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      refetchBrands();
    }
  };

  const toggleBrandPublished = async (id: string, status: string) => {
    const newStatus = status === 'published' ? 'draft' : 'published';
    const { error } = await supabase
      .from('brands')
      .update({ status: newStatus })
      .eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      refetchBrands();
    }
  };

  const toggleEntryPublished = async (id: string, status: string) => {
    const newStatus = status === 'published' ? 'draft' : 'published';
    const { error } = await supabase
      .from('dictionary_entries')
      .update({ status: newStatus })
      .eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      refetchEntries();
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Skeleton className="w-32 h-32 rounded-full" />
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/portal')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Portal
            </Button>
            <div className="flex items-center gap-3">
              <Recycle className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-semibold">Admin</h1>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="categories">
          <TabsList className="mb-6">
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="brands">Brands</TabsTrigger>
            <TabsTrigger value="entries">Dictionary</TabsTrigger>
          </TabsList>

          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
                <CardDescription>Manage category visibility</CardDescription>
              </CardHeader>
              <CardContent>
                {categoriesLoading ? (
                  <Skeleton className="h-48 w-full" />
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Group</TableHead>
                        <TableHead>Order</TableHead>
                        <TableHead>Active</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories?.map((cat) => (
                        <TableRow key={cat.id}>
                          <TableCell className="font-medium">{cat.name}</TableCell>
                          <TableCell>{cat.group_name || '-'}</TableCell>
                          <TableCell>{cat.display_order}</TableCell>
                          <TableCell>
                            <Switch
                              checked={cat.active}
                              onCheckedChange={() => toggleCategoryActive(cat.id, cat.active)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="brands">
            <Card>
              <CardHeader>
                <CardTitle>Brands</CardTitle>
                <CardDescription>Manage brand tiers and publishing</CardDescription>
              </CardHeader>
              <CardContent>
                {brandsLoading ? (
                  <Skeleton className="h-48 w-full" />
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Tier</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Published</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {brands?.map((brand) => (
                        <TableRow key={brand.id}>
                          <TableCell className="font-medium">{brand.name}</TableCell>
                          <TableCell>
                            <Select
                              value={brand.tier}
                              onValueChange={(value: BrandTier) => updateBrandTier(brand.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="basic">Basic</SelectItem>
                                <SelectItem value="standard">Standard</SelectItem>
                                <SelectItem value="featured">Featured</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Badge variant={brand.status === 'published' ? 'default' : 'secondary'}>
                              {brand.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={brand.status === 'published'}
                              onCheckedChange={() => toggleBrandPublished(brand.id, brand.status)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="entries">
            <Card>
              <CardHeader>
                <CardTitle>Dictionary Entries</CardTitle>
                <CardDescription>Manage entry publishing</CardDescription>
              </CardHeader>
              <CardContent>
                {entriesLoading ? (
                  <Skeleton className="h-48 w-full" />
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Published</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {entries?.map((entry) => (
                        <TableRow key={entry.id}>
                          <TableCell className="font-medium">{entry.title}</TableCell>
                          <TableCell className="text-muted-foreground">{entry.slug}</TableCell>
                          <TableCell>
                            <Badge variant={entry.status === 'published' ? 'default' : 'secondary'}>
                              {entry.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={entry.status === 'published'}
                              onCheckedChange={() => toggleEntryPublished(entry.id, entry.status)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
