import type { Brand, BrandContent, DictionaryEntry } from '@/types/database';

export type DisplayBrand = Brand & { brand_content?: BrandContent[] };

export type DisplayItem =
  | { kind: 'entry'; entry: DictionaryEntry }
  | { kind: 'brand'; brand: DisplayBrand };

export function getBrandContentValue(brand: DisplayBrand, fieldType: BrandContent['field_type']) {
  return brand.brand_content?.find((content) => content.field_type === fieldType)?.value;
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
