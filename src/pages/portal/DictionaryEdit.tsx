import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useCategories } from '@/hooks/useCategories';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Loader2 } from 'lucide-react';
import type { DictionaryEntry } from '@/types/database';

export default function DictionaryEdit() {
  const { entryId } = useParams<{ entryId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isNew = !entryId;
  
  const { data: categories } = useCategories();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    body: '',
    status: 'draft' as 'draft' | 'published',
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const { data: entry, isLoading } = useQuery({
    queryKey: ['dictionary-entry', entryId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('dictionary_entries')
        .select('*')
        .eq('id', entryId)
        .single();
      if (error) throw error;
      return data as DictionaryEntry;
    },
    enabled: !!entryId,
  });

  // Load entry categories
  useEffect(() => {
    if (entryId) {
      supabase
        .from('entry_categories')
        .select('category_id')
        .eq('entry_id', entryId)
        .then(({ data }) => {
          setSelectedCategories(data?.map(d => d.category_id) || []);
        });
    }
  }, [entryId]);

  // Populate form when entry loads
  useEffect(() => {
    if (entry) {
      setForm({
        title: entry.title,
        body: entry.body || '',
        status: entry.status,
      });
    }
  }, [entry]);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const slug = generateSlug(form.title);

    try {
      if (isNew) {
        const { data, error } = await supabase
          .from('dictionary_entries')
          .insert({ ...form, slug })
          .select()
          .single();
        
        if (error) throw error;

        if (selectedCategories.length > 0) {
          await supabase.from('entry_categories').insert(
            selectedCategories.map(catId => ({ entry_id: data.id, category_id: catId }))
          );
        }

        toast({ title: 'Entry created' });
        navigate('/portal/dictionary');
      } else {
        const { error } = await supabase
          .from('dictionary_entries')
          .update({ ...form, slug })
          .eq('id', entryId);
        
        if (error) throw error;

        // Update categories
        await supabase.from('entry_categories').delete().eq('entry_id', entryId);
        if (selectedCategories.length > 0) {
          await supabase.from('entry_categories').insert(
            selectedCategories.map(catId => ({ entry_id: entryId, category_id: catId }))
          );
        }

        toast({ title: 'Entry updated' });
        navigate('/portal/dictionary');
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }

    setLoading(false);
  };

  const toggleCategory = (catId: string) => {
    setSelectedCategories(prev => 
      prev.includes(catId) 
        ? prev.filter(id => id !== catId)
        : [...prev, catId]
    );
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
        onClick={() => navigate('/portal/dictionary')}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dictionary
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{isNew ? 'New Dictionary Entry' : 'Edit Entry'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="body">Body</Label>
              <Textarea
                id="body"
                value={form.body}
                onChange={(e) => setForm(f => ({ ...f, body: e.target.value }))}
                rows={8}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={form.status} 
                onValueChange={(v) => setForm(f => ({ ...f, status: v as 'draft' | 'published' }))}
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
                {categories?.map((cat) => (
                  <label 
                    key={cat.id} 
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Checkbox
                      checked={selectedCategories.includes(cat.id)}
                      onCheckedChange={() => toggleCategory(cat.id)}
                    />
                    <span className="text-sm">{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {isNew ? 'Create Entry' : 'Save Changes'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/portal/dictionary')}
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
