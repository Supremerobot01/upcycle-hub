import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { useUpdateBrand, useCreateBrand } from '@/hooks/useBrands';
import { useBrandContent, useUpdateBrandContent } from '@/hooks/useBrandContent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Lock, Save, Send } from 'lucide-react';
import CategorySelect from './CategorySelect';
import ImageUpload from './ImageUpload';
import type { Brand, BrandTier, BrandStatus } from '@/types/database';

const brandSchema = z.object({
  name: z.string().min(1, 'Brand name is required'),
  website_url: z.string().url('Must be a valid URL').or(z.literal('')).optional(),
  primary_category_id: z.string().min(1, 'Primary category is required'),
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
  const { data: content } = useBrandContent(brand?.id);
  const updateBrand = useUpdateBrand();
  const createBrand = useCreateBrand();
  const updateContent = useUpdateBrandContent();
  
  const [imageUrl, setImageUrl] = useState<string>('');
  const [logoUrl, setLogoUrl] = useState<string>('');
  
  const tier: BrandTier = brand?.tier || 'basic';
  const isStandardPlus = tier === 'standard' || tier === 'featured';
  const isFeatured = tier === 'featured';
  
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
      const imageContent = content.find(c => c.field_type === 'image');
      const logoContent = content.find(c => c.field_type === 'logo');
      
      if (blurbContent) form.setValue('blurb', blurbContent.value);
      if (bioContent) form.setValue('bio', bioContent.value);
      if (videoContent) form.setValue('video_url', videoContent.value);
      if (imageContent) setImageUrl(imageContent.value);
      if (logoContent) setLogoUrl(logoContent.value);
    }
  }, [content, form]);

  const saveContent = async (brandId: string, tier: BrandTier, data: BrandFormData) => {
    // Save Standard+ content
    if (tier !== 'basic') {
      if (data.blurb) {
        await updateContent.mutateAsync({
          brandId,
          fieldType: 'blurb',
          value: data.blurb,
        });
      }
      if (imageUrl) {
        await updateContent.mutateAsync({
          brandId,
          fieldType: 'image',
          value: imageUrl,
        });
      }
    }
    
    // Save Featured content
    if (tier === 'featured') {
      if (data.bio) {
        await updateContent.mutateAsync({
          brandId,
          fieldType: 'bio',
          value: data.bio,
        });
      }
      if (data.video_url) {
        await updateContent.mutateAsync({
          brandId,
          fieldType: 'video_url',
          value: data.video_url,
        });
      }
      if (logoUrl) {
        await updateContent.mutateAsync({
          brandId,
          fieldType: 'logo',
          value: logoUrl,
        });
      }
    }
  };

  const handleSave = async (status: BrandStatus) => {
    const isValid = await form.trigger();
    if (!isValid) return;
    
    const data = form.getValues();
    
    try {
      if (brand) {
        await updateBrand.mutateAsync({
          id: brand.id,
          name: data.name,
          website_url: data.website_url || null,
          primary_category_id: data.primary_category_id || null,
          secondary_category_id: data.secondary_category_id || null,
          status,
        });
        
        await saveContent(brand.id, tier, data);
        
        toast({ 
          title: status === 'published' ? 'Published!' : 'Draft saved', 
          description: status === 'published' 
            ? 'Your brand is now live in the dictionary.' 
            : 'Your changes have been saved as a draft.'
        });
      } else {
        const newBrand = await createBrand.mutateAsync({
          name: data.name,
          website_url: data.website_url || null,
          primary_category_id: data.primary_category_id || null,
          secondary_category_id: data.secondary_category_id || null,
          user_id: user?.id || null,
          tier: 'basic',
          status,
          email: user?.email || null,
          is_featured: false,
        });
        
        toast({ 
          title: 'Brand created', 
          description: 'Your brand listing has been created.' 
        });
      }
    } catch {
      toast({ 
        title: 'Error', 
        description: 'Failed to save changes. Please try again.', 
        variant: 'destructive' 
      });
    }
  };

  const isPending = updateBrand.isPending || createBrand.isPending || updateContent.isPending;

  return (
    <Form {...form}>
      <form className="space-y-6">
        {/* Basic tier fields - always visible */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand Name *</FormLabel>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CategorySelect
            control={form.control}
            name="primary_category_id"
            label="Primary Category"
            placeholder="Select primary category"
            required
          />
          <CategorySelect
            control={form.control}
            name="secondary_category_id"
            label="Secondary Category"
            placeholder="Select secondary category"
          />
        </div>

        {/* Standard tier section */}
        <Separator className="my-6" />
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Label className="text-sm font-medium">Standard Tier Features</Label>
            {!isStandardPlus && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" />
                Upgrade to Standard to unlock
              </span>
            )}
          </div>
          
          {brand && (
            <ImageUpload
              brandId={brand.id}
              fieldType="image"
              currentValue={imageUrl}
              onUpload={setImageUrl}
              disabled={!isStandardPlus}
              label="Brand Image"
            />
          )}
          
          <FormField
            control={form.control}
            name="blurb"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={!isStandardPlus ? 'text-muted-foreground' : ''}>
                  Short Blurb
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="A short description of your brand (max 200 characters)" 
                    className="resize-none"
                    maxLength={200}
                    disabled={!isStandardPlus}
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
        </div>

        {/* Featured tier section */}
        <Separator className="my-6" />
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Label className="text-sm font-medium">Featured Tier Features</Label>
            {!isFeatured && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" />
                Upgrade to Featured to unlock
              </span>
            )}
          </div>
          
          {brand && (
            <ImageUpload
              brandId={brand.id}
              fieldType="logo"
              currentValue={logoUrl}
              onUpload={setLogoUrl}
              disabled={!isFeatured}
              label="Brand Logo"
            />
          )}
          
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={!isFeatured ? 'text-muted-foreground' : ''}>
                  Full Bio
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell your brand's story..." 
                    className="min-h-32"
                    disabled={!isFeatured}
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
                <FormLabel className={!isFeatured ? 'text-muted-foreground' : ''}>
                  Video URL
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="https://youtube.com/watch?v=..." 
                    disabled={!isFeatured}
                    {...field} 
                  />
                </FormControl>
                <FormDescription>YouTube or Vimeo URL</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 pt-4">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => handleSave('draft')}
            disabled={isPending}
          >
            <Save className="h-4 w-4 mr-2" />
            {isPending ? 'Saving...' : 'Save Draft'}
          </Button>
          <Button 
            type="button"
            onClick={() => handleSave('published')}
            disabled={isPending}
          >
            <Send className="h-4 w-4 mr-2" />
            {isPending ? 'Publishing...' : 'Publish'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
