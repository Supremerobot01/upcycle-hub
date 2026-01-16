export type BrandTier = 'basic' | 'standard' | 'featured';
export type BrandStatus = 'draft' | 'published';
export type ContentFieldType = 'image' | 'logo' | 'blurb' | 'bio' | 'video_url';
export type EntryStatus = 'draft' | 'published';
export type AppRole = 'admin' | 'moderator' | 'user';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  group_name: string | null;
  display_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Brand {
  id: string;
  name: string;
  tier: BrandTier;
  status: BrandStatus;
  email: string | null;
  website_url: string | null;
  primary_category_id: string | null;
  secondary_category_id: string | null;
  user_id: string | null;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface BrandContent {
  id: string;
  brand_id: string;
  field_type: ContentFieldType;
  value: string;
  display_order: number;
  created_at: string;
}

export interface DictionaryEntry {
  id: string;
  title: string;
  slug: string;
  body: string | null;
  status: EntryStatus;
  created_at: string;
  updated_at: string;
}

export interface EntryCategory {
  entry_id: string;
  category_id: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
}

export interface DisplaySession {
  id: string;
  controller_id: string | null;
  current_state: Record<string, unknown>;
  last_activity: string;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: Category;
        Insert: Omit<Category, 'id' | 'created_at' | 'updated_at'> & { id?: string };
        Update: Partial<Omit<Category, 'id'>>;
      };
      brands: {
        Row: Brand;
        Insert: Omit<Brand, 'id' | 'created_at' | 'updated_at'> & { id?: string };
        Update: Partial<Omit<Brand, 'id'>>;
      };
      brand_content: {
        Row: BrandContent;
        Insert: Omit<BrandContent, 'id' | 'created_at'> & { id?: string };
        Update: Partial<Omit<BrandContent, 'id'>>;
      };
      dictionary_entries: {
        Row: DictionaryEntry;
        Insert: Omit<DictionaryEntry, 'id' | 'created_at' | 'updated_at'> & { id?: string };
        Update: Partial<Omit<DictionaryEntry, 'id'>>;
      };
      entry_categories: {
        Row: EntryCategory;
        Insert: EntryCategory;
        Update: Partial<EntryCategory>;
      };
      user_roles: {
        Row: UserRole;
        Insert: Omit<UserRole, 'id'> & { id?: string };
        Update: Partial<Omit<UserRole, 'id'>>;
      };
      display_sessions: {
        Row: DisplaySession;
        Insert: Omit<DisplaySession, 'id' | 'created_at'> & { id?: string };
        Update: Partial<Omit<DisplaySession, 'id'>>;
      };
    };
  };
}
