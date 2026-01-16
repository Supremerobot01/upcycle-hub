import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://mzzmqlyoucsqwxxknawv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16em1xbHlvdWNzcXd4eGtuYXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2MDIxNDQsImV4cCI6MjA4NDE3ODE0NH0.TBJTecHzIjZP4tFsZAN9WV54Z-AhJJrHo1ufb4W9-MQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: typeof window !== 'undefined' ? localStorage : undefined,
    persistSession: true,
    autoRefreshToken: true,
  },
});
