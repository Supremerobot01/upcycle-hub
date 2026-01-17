import type { Brand, BrandContent, DictionaryEntry } from '@/types/database';
import { brandImages } from '@/assets/brands';

export type DisplayBrand = Brand & { brand_content?: BrandContent[] };

export type DisplayItem =
  | { kind: 'entry'; entry: DictionaryEntry }
  | { kind: 'brand'; brand: DisplayBrand };

export function getBrandContentValue(brand: DisplayBrand, fieldType: BrandContent['field_type']) {
  return brand.brand_content?.find((content) => content.field_type === fieldType)?.value;
}

export function getBrandImage(brand: DisplayBrand): string | undefined {
  // First check for local generated images by brand name
  const localImage = brandImages[brand.name];
  if (localImage) return localImage;
  
  // Fall back to database content
  return getBrandContentValue(brand, 'image') || getBrandContentValue(brand, 'logo');
}

export function getItemTitle(item: DisplayItem) {
  return item.kind === 'entry' ? item.entry.title : item.brand.name;
}

export function getItemDescription(item: DisplayItem) {
  if (item.kind === 'entry') return item.entry.body || '';
  return (
    getBrandContentValue(item.brand, 'blurb') ||
    getBrandContentValue(item.brand, 'bio') ||
    item.brand.website_url ||
    ''
  );
}
