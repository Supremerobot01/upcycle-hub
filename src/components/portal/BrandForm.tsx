import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { useCategories } from '@/hooks/useCategories';
import { useUpdateBrand, useCreateBrand } from '@/hooks/useBrands';
import { useBrandContent, useUpdateBrandContent } from '@/hooks/useBrandContent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import type { Brand, BrandTier } from '@/types/database';

const brandSchema = z.object({
  name: z.string().min(1, 'Brand name is required'),
  website_url: z.string().url('Must be a valid URL').or(z.literal('')),
  primary_category_id: z.string().optional(),
  secondary_category_id: z.string().optional(),
  blurb: z.string().max(200, 'Blurb must be 200 characters or less').optional(),
  bio: z.string().optional(),
  video_url: z.string().url('Must be a valid URL').or(z.literal('')).optional(),
});

type BrandFormData = z.infer<typeof brandSchema>;

interface BrandFormProps {
  brand?: Brand;
}

export default function BrandForm({ brand }: BrandFormProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: categories } = useCategories();
  const { data: content } = useBrandContent(brand?.id);
  const updateBrand = useUpdateBrand();
  const createBrand = useCreateBrand();
  const updateContent = useUpdateBrandContent();
  
  const tier: BrandTier = brand?.tier || 'basic';
  
  const form = useForm<BrandFormData>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: brand?.name || '',
      website_url: brand?.website_url || '',
      primary_category_id: brand?.primary_category_id || '',
      secondary_category_id: brand?.secondary_category_id || '',
      blurb: '',
      bio: '',
      video_url: '',
    },
  });

  useEffect(() => {
    if (content) {
      const blurbContent = content.find(c => c.field_type === 'blurb');
      const bioContent = content.find(c => c.field_type === 'bio');
      const videoContent = content.find(c => c.field_type === 'video_url');
      
      if (blurbContent) form.setValue('blurb', blurbContent.value);
      if (bioContent) form.setValue('bio', bioContent.value);
      if (videoContent) form.setValue('video_url', videoContent.value);
    }
  }, [content, form]);

  const onSubmit = async (data: BrandFormData) => {
    try {
      if (brand) {
        await updateBrand.mutateAsync({
          id: brand.id,
          name: data.name,
          website_url: data.website_url || null,
          primary_category_id: data.primary_category_id || null,
          secondary_category_id: data.secondary_category_id || null,
        });

        // Update content fields based on tier
        if (tier !== 'basic' && data.blurb) {
          await updateContent.mutateAsync({
            brandId: brand.id,
            fieldType: 'blurb',
            value: data.blurb,
          });
        }
        if (tier === 'featured') {
          if (data.bio) {
            await updateContent.mutateAsync({
              brandId: brand.id,
              fieldType: 'bio',
              value: data.bio,
            });
          }
          if (data.video_url) {
            await updateContent.mutateAsync({
              brandId: brand.id,
              fieldType: 'video_url',
              value: data.video_url,
            });
          }
        }

        toast({ title: 'Brand updated', description: 'Your changes have been saved.' });
      } else {
        await createBrand.mutateAsync({
          name: data.name,
          website_url: data.website_url || null,
          primary_category_id: data.primary_category_id || null,
          secondary_category_id: data.secondary_category_id || null,
          user_id: user?.id || null,
          tier: 'basic',
          status: 'draft',
          email: user?.email || null,
        });
        toast({ title: 'Brand created', description: 'Your brand listing has been created.' });
      }
    } catch {
      toast({ title: 'Error', description: 'Failed to save changes. Please try again.', variant: 'destructive' });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic tier fields - always visible */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand Name</FormLabel>
              <FormControl>
                <Input placeholder="Your brand name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input placeholder="https://yourbrand.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="primary_category_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="secondary_category_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Secondary Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Standard tier fields */}
        {(tier === 'standard' || tier === 'featured') && (
          <>
            <Separator />
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Standard Tier Features</Label>
            </div>
            <FormField
              control={form.control}
              name="blurb"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blurb</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="A short description of your brand (max 200 characters)" 
                      className="resize-none"
                      maxLength={200}
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    {field.value?.length || 0}/200 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {/* Featured tier fields */}
        {tier === 'featured' && (
          <>
            <Separator />
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Featured Tier Features</Label>
            </div>
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Bio</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell your brand's story..." 
                      className="min-h-32"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="video_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://youtube.com/watch?v=..." {...field} />
                  </FormControl>
                  <FormDescription>YouTube or Vimeo URL</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <Button type="submit" disabled={updateBrand.isPending || createBrand.isPending}>
          {updateBrand.isPending || createBrand.isPending ? 'Saving...' : brand ? 'Save Changes' : 'Create Brand'}
        </Button>
      </form>
    </Form>
  );
}
