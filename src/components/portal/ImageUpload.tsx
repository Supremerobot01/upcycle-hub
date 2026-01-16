import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  brandId: string;
  fieldType: 'image' | 'logo';
  currentValue?: string;
  onUpload: (url: string) => void;
  disabled?: boolean;
  label: string;
}

export default function ImageUpload({ 
  brandId, 
  fieldType, 
  currentValue, 
  onUpload, 
  disabled = false,
  label 
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentValue || null);
  const { toast } = useToast();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({ title: 'Error', description: 'Please upload an image file', variant: 'destructive' });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: 'Error', description: 'Image must be less than 5MB', variant: 'destructive' });
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${brandId}/${fieldType}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('brand-assets')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('brand-assets')
        .getPublicUrl(fileName);

      setPreview(publicUrl);
      onUpload(publicUrl);
      toast({ title: 'Uploaded', description: 'Image uploaded successfully' });
    } catch (error) {
      console.error('Upload error:', error);
      toast({ title: 'Upload failed', description: 'Could not upload image. Please try again.', variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onUpload('');
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {preview ? (
        <div className="relative w-full max-w-xs">
          <img 
            src={preview} 
            alt={fieldType} 
            className="w-full h-32 object-cover rounded-md border"
          />
          {!disabled && (
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={disabled || uploading}
            className="hidden"
            id={`upload-${fieldType}`}
          />
          <Label 
            htmlFor={`upload-${fieldType}`}
            className={`flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-accent ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            {uploading ? 'Uploading...' : 'Choose Image'}
          </Label>
        </div>
      )}
    </div>
  );
}
