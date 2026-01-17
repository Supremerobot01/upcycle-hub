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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Recycle, LogOut, ArrowLeft, Star, Plus, Pencil, Trash2 } from 'lucide-react';
import type { BrandTier, Category, DictionaryEntry } from '@/types/database';

export default function Admin() {
  const { user, loading: authLoading, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { data: categories, isLoading: categoriesLoading, refetch: refetchCategories } = useCategories(false);
  const { data: brands, isLoading: brandsLoading, refetch: refetchBrands } = useBrands(false);
  const { data: entries, isLoading: entriesLoading, refetch: refetchEntries } = useDictionaryEntries(false);

  // Category form state
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryForm, setCategoryForm] = useState({ name: '', description: '', group_name: '', display_order: 0 });

  // Entry form state
  const [entryDialogOpen, setEntryDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<DictionaryEntry | null>(null);
  const [entryForm, setEntryForm] = useState({ title: '', body: '', status: 'draft' as 'draft' | 'published' });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/portal');
    }
  }, [user, authLoading, isAdmin, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Generate slug from name/title
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
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

  // Brand actions
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

  const toggleBrandFeatured = async (id: string, isFeatured: boolean) => {
    const { error } = await supabase
      .from('brands')
      .update({ is_featured: !isFeatured })
      .eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      refetchBrands();
    }
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

  // Entry CRUD
  const openEntryDialog = async (entry?: DictionaryEntry) => {
    if (entry) {
      setEditingEntry(entry);
      setEntryForm({
        title: entry.title,
        body: entry.body || '',
        status: entry.status,
      });
      // Fetch categories for this entry
      const { data } = await supabase
        .from('entry_categories')
        .select('category_id')
        .eq('entry_id', entry.id);
      setSelectedCategories(data?.map(d => d.category_id) || []);
    } else {
      setEditingEntry(null);
      setEntryForm({ title: '', body: '', status: 'draft' });
      setSelectedCategories([]);
    }
    setEntryDialogOpen(true);
  };

  const saveEntry = async () => {
    const slug = generateSlug(entryForm.title);
    
    if (editingEntry) {
      const { error } = await supabase
        .from('dictionary_entries')
        .update({ ...entryForm, slug })
        .eq('id', editingEntry.id);
      
      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
        return;
      }
      
      // Update categories
      await supabase.from('entry_categories').delete().eq('entry_id', editingEntry.id);
      if (selectedCategories.length > 0) {
        await supabase.from('entry_categories').insert(
          selectedCategories.map(catId => ({ entry_id: editingEntry.id, category_id: catId }))
        );
      }
      
      toast({ title: 'Entry updated' });
    } else {
      const { data, error } = await supabase
        .from('dictionary_entries')
        .insert({ ...entryForm, slug })
        .select()
        .single();
      
      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
        return;
      }
      
      // Add categories
      if (selectedCategories.length > 0) {
        await supabase.from('entry_categories').insert(
          selectedCategories.map(catId => ({ entry_id: data.id, category_id: catId }))
        );
      }
      
      toast({ title: 'Entry created' });
    }
    
    setEntryDialogOpen(false);
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

  const toggleCategory = (catId: string) => {
    setSelectedCategories(prev => 
      prev.includes(catId) 
        ? prev.filter(id => id !== catId)
        : [...prev, catId]
    );
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Skeleton className="w-32 h-32 rounded-full" />
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  const groupNames = ['Core Upcycling Practices', 'Material-Based Approaches', 'Design & Craft Techniques', 'Context & Values'];

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
                                      This will permanently delete "{cat.name}". This action cannot be undone.
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
                        <TableHead>Email</TableHead>
                        <TableHead>Tier</TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Published</TableHead>
                        <TableHead className="w-16">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {brands?.map((brand) => (
                        <TableRow key={brand.id}>
                          <TableCell className="font-medium">{brand.name}</TableCell>
                          <TableCell className="text-muted-foreground text-sm">{brand.email || '-'}</TableCell>
                          <TableCell>
                            <Select
                              value={brand.tier}
                              onValueChange={(value: BrandTier) => updateBrandTier(brand.id, value)}
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
                              checked={brand.is_featured}
                              onCheckedChange={() => toggleBrandFeatured(brand.id, brand.is_featured)}
                            />
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
                                    This will permanently delete "{brand.name}". This action cannot be undone.
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
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Dictionary Entries</CardTitle>
                  <CardDescription>Manage dictionary content</CardDescription>
                </div>
                <Dialog open={entryDialogOpen} onOpenChange={setEntryDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => openEntryDialog()}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Entry
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{editingEntry ? 'Edit Entry' : 'Add Entry'}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input 
                          value={entryForm.title} 
                          onChange={e => setEntryForm(f => ({ ...f, title: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Body</Label>
                        <Textarea 
                          value={entryForm.body} 
                          onChange={e => setEntryForm(f => ({ ...f, body: e.target.value }))}
                          className="min-h-32"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Status</Label>
                        <Select 
                          value={entryForm.status} 
                          onValueChange={(v: 'draft' | 'published') => setEntryForm(f => ({ ...f, status: v }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Categories</Label>
                        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border rounded-md p-3">
                          {categories?.map(cat => (
                            <div key={cat.id} className="flex items-center space-x-2">
                              <Checkbox 
                                id={cat.id} 
                                checked={selectedCategories.includes(cat.id)}
                                onCheckedChange={() => toggleCategory(cat.id)}
                              />
                              <label htmlFor={cat.id} className="text-sm cursor-pointer">
                                {cat.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={saveEntry}>Save</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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
                        <TableHead className="w-24">Actions</TableHead>
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
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon" onClick={() => openEntryDialog(entry)}>
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
                                    <AlertDialogTitle>Delete entry?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will permanently delete "{entry.title}". This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => deleteEntry(entry.id)}>Delete</AlertDialogAction>
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
        </Tabs>
      </main>
    </div>
  );
}
