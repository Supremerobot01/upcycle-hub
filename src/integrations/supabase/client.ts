import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://mzzmqlyoucsqwxxknawv.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_3z6MbBP8nud_KEFBILZNlg_soLuLYj7';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: typeof window !== 'undefined' ? localStorage : undefined,
    persistSession: true,
    autoRefreshToken: true,
  },
});
