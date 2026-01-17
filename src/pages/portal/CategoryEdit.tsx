import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Loader2 } from 'lucide-react';
import type { Category } from '@/types/database';

const groupNames = ['Core Upcycling Practices', 'Material-Based Approaches', 'Design & Craft Techniques', 'Context & Values'];

export default function CategoryEdit() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin } = useAuth();
  const isNew = !categoryId;
  
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    group_name: '',
    display_order: 0,
    active: true,
  });

  const { data: category, isLoading } = useQuery({
    queryKey: ['category', categoryId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', categoryId)
        .single();
      if (error) throw error;
      return data as Category;
    },
    enabled: !!categoryId,
  });

  useEffect(() => {
    if (category) {
      setForm({
        name: category.name,
        description: category.description || '',
        group_name: category.group_name || '',
        display_order: category.display_order,
        active: category.active,
      });
    }
  }, [category]);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;
    
    setLoading(true);
    const slug = generateSlug(form.name);

    try {
      if (isNew) {
        const { error } = await supabase
          .from('categories')
          .insert({ ...form, slug });
        
        if (error) throw error;
        toast({ title: 'Category created' });
      } else {
        const { error } = await supabase
          .from('categories')
          .update({ ...form, slug })
          .eq('id', categoryId);
        
        if (error) throw error;
        toast({ title: 'Category updated' });
      }
      navigate('/portal/categories');
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }

    setLoading(false);
  };

  if (!isNew && isLoading) {
    return (
      <div className="max-w-2xl mx-auto">
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Button 
        variant="ghost" 
        className="mb-4" 
        onClick={() => navigate('/portal/categories')}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Categories
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{isNew ? 'New Category' : 'Edit Category'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="group">Group</Label>
              <Select 
                value={form.group_name} 
                onValueChange={(v) => setForm(f => ({ ...f, group_name: v }))}
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
              <Label htmlFor="display_order">Display Order</Label>
              <Input
                id="display_order"
                type="number"
                value={form.display_order}
                onChange={(e) => setForm(f => ({ ...f, display_order: parseInt(e.target.value) || 0 }))}
              />
            </div>

            <div className="flex items-center gap-3">
              <Switch
                id="active"
                checked={form.active}
                onCheckedChange={(checked) => setForm(f => ({ ...f, active: checked }))}
              />
              <Label htmlFor="active">Active</Label>
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={loading || !isAdmin}>
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {isNew ? 'Create Category' : 'Save Changes'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/portal/categories')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
