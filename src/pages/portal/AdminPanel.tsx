import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useCategories } from '@/hooks/useCategories';
import { useBrands } from '@/hooks/useBrands';
import { useDictionaryEntries } from '@/hooks/useDictionaryEntries';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Star } from 'lucide-react';
import type { BrandTier, Category } from '@/types/database';

const groupNames = ['Core Upcycling Practices', 'Material-Based Approaches', 'Design & Craft Techniques', 'Context & Values'];

export default function AdminPanel() {
  const { user, loading: authLoading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { data: categories, isLoading: categoriesLoading, refetch: refetchCategories } = useCategories(false);
  const { data: brands, isLoading: brandsLoading, refetch: refetchBrands } = useBrands(false);
  const { data: entries, isLoading: entriesLoading, refetch: refetchEntries } = useDictionaryEntries(false);

  // Category form state
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryForm, setCategoryForm] = useState({ name: '', description: '', group_name: '', display_order: 0 });

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/portal/dashboard');
    }
  }, [user, authLoading, isAdmin, navigate]);

  const generateSlug = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  // Category CRUD
  const openCategoryDialog = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setCategoryForm({
        name: category.name,
        description: category.description || '',
        group_name: category.group_name || '',
        display_order: category.display_order,
      });
    } else {
      setEditingCategory(null);
      setCategoryForm({ name: '', description: '', group_name: '', display_order: categories?.length || 0 });
    }
    setCategoryDialogOpen(true);
  };

  const saveCategory = async () => {
    const slug = generateSlug(categoryForm.name);
    
    if (editingCategory) {
      const { error } = await supabase
        .from('categories')
        .update({ ...categoryForm, slug })
        .eq('id', editingCategory.id);
      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Category updated' });
        refetchCategories();
      }
    } else {
      const { error } = await supabase
        .from('categories')
        .insert({ ...categoryForm, slug, active: true });
      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Category created' });
        refetchCategories();
      }
    }
    setCategoryDialogOpen(false);
  };

  const deleteCategory = async (id: string) => {
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Category deleted' });
      refetchCategories();
    }
  };

  const toggleCategoryActive = async (id: string, active: boolean) => {
    await supabase.from('categories').update({ active: !active }).eq('id', id);
    refetchCategories();
  };

  // Brand actions
  const updateBrandTier = async (id: string, tier: BrandTier) => {
    await supabase.from('brands').update({ tier }).eq('id', id);
    refetchBrands();
  };

  const toggleBrandPublished = async (id: string, status: string) => {
    const newStatus = status === 'published' ? 'draft' : 'published';
    await supabase.from('brands').update({ status: newStatus }).eq('id', id);
    refetchBrands();
  };

  const toggleBrandFeatured = async (id: string, isFeatured: boolean) => {
    await supabase.from('brands').update({ is_featured: !isFeatured }).eq('id', id);
    refetchBrands();
  };

  const deleteBrand = async (id: string) => {
    const { error } = await supabase.from('brands').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Brand deleted' });
      refetchBrands();
    }
  };

  // Entry actions
  const toggleEntryPublished = async (id: string, status: string) => {
    const newStatus = status === 'published' ? 'draft' : 'published';
    await supabase.from('dictionary_entries').update({ status: newStatus }).eq('id', id);
    refetchEntries();
  };

  const deleteEntry = async (id: string) => {
    await supabase.from('entry_categories').delete().eq('entry_id', id);
    const { error } = await supabase.from('dictionary_entries').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Entry deleted' });
      refetchEntries();
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Skeleton className="w-32 h-32 rounded-full" />
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <p className="text-muted-foreground">Manage categories, brands, and dictionary entries</p>
      </div>

      <Tabs defaultValue="categories">
        <TabsList className="mb-6">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="brands">Brands</TabsTrigger>
          <TabsTrigger value="entries">Dictionary</TabsTrigger>
        </TabsList>

        {/* Categories Tab */}
        <TabsContent value="categories">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Categories</CardTitle>
                <CardDescription>Manage dictionary categories</CardDescription>
              </div>
              <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => openCategoryDialog()}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingCategory ? 'Edit Category' : 'Add Category'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input 
                        value={categoryForm.name} 
                        onChange={e => setCategoryForm(f => ({ ...f, name: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea 
                        value={categoryForm.description} 
                        onChange={e => setCategoryForm(f => ({ ...f, description: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Group</Label>
                      <Select 
                        value={categoryForm.group_name} 
                        onValueChange={v => setCategoryForm(f => ({ ...f, group_name: v }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select group" />
                        </SelectTrigger>
                        <SelectContent>
                          {groupNames.map(g => (
                            <SelectItem key={g} value={g}>{g}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Display Order</Label>
                      <Input 
                        type="number" 
                        value={categoryForm.display_order} 
                        onChange={e => setCategoryForm(f => ({ ...f, display_order: parseInt(e.target.value) || 0 }))}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={saveCategory}>Save</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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
                      <TableHead className="w-24">Actions</TableHead>
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
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" onClick={() => openCategoryDialog(cat)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete category?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently delete "{cat.name}".
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => deleteCategory(cat.id)}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Brands Tab */}
        <TabsContent value="brands">
          <Card>
            <CardHeader>
              <CardTitle>Brands</CardTitle>
              <CardDescription>Manage brand listings</CardDescription>
            </CardHeader>
            <CardContent>
              {brandsLoading ? (
                <Skeleton className="h-48 w-full" />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Tier</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Featured</TableHead>
                      <TableHead className="w-24">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {brands?.map((brand) => (
                      <TableRow key={brand.id}>
                        <TableCell className="font-medium">{brand.name}</TableCell>
                        <TableCell>{brand.email || '-'}</TableCell>
                        <TableCell>
                          <Select 
                            value={brand.tier} 
                            onValueChange={(v) => updateBrandTier(brand.id, v as BrandTier)}
                          >
                            <SelectTrigger className="w-28">
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
                          <Switch
                            checked={brand.status === 'published'}
                            onCheckedChange={() => toggleBrandPublished(brand.id, brand.status)}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleBrandFeatured(brand.id, brand.is_featured)}
                          >
                            <Star className={`h-4 w-4 ${brand.is_featured ? 'fill-tier-featured text-tier-featured' : ''}`} />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete brand?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete "{brand.name}".
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteBrand(brand.id)}>Delete</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Entries Tab */}
        <TabsContent value="entries">
          <Card>
            <CardHeader>
              <CardTitle>Dictionary Entries</CardTitle>
              <CardDescription>Manage dictionary entries</CardDescription>
            </CardHeader>
            <CardContent>
              {entriesLoading ? (
                <Skeleton className="h-48 w-full" />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-24">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {entries?.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell className="font-medium">{entry.title}</TableCell>
                        <TableCell>
                          <Switch
                            checked={entry.status === 'published'}
                            onCheckedChange={() => toggleEntryPublished(entry.id, entry.status)}
                          />
                        </TableCell>
                        <TableCell>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete entry?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete "{entry.title}".
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteEntry(entry.id)}>Delete</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
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
    </div>
  );
}
