// Quick test script to check Supabase data
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://mzzmqlyoucsqwxxknawv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16em1xbHlvdWNzcXd4eGtuYXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2MDIxNDQsImV4cCI6MjA4NDE3ODE0NH0.TBJTecHzIjZP4tFsZAN9WV54Z-AhJJrHo1ufb4W9-MQ';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkData() {
  console.log('Checking Supabase data...\n');

  // Check categories
  const { data: categories, error: catError } = await supabase
    .from('categories')
    .select('id, name, active')
    .limit(10);
  console.log('Categories:', catError ? catError.message : categories);

  // Check dictionary entries
  const { data: entries, error: entryError } = await supabase
    .from('dictionary_entries')
    .select('id, title, status')
    .limit(10);
  console.log('\nDictionary Entries:', entryError ? entryError.message : entries);

  // Check brands
  const { data: brands, error: brandError } = await supabase
    .from('brands')
    .select('id, name, status, tier')
    .limit(10);
  console.log('\nBrands:', brandError ? brandError.message : brands);

  // Check published counts
  const { count: pubEntries } = await supabase
    .from('dictionary_entries')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published');
  console.log('\nPublished entries count:', pubEntries);

  const { count: pubBrands } = await supabase
    .from('brands')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published');
  console.log('Published brands count:', pubBrands);

  const { count: activeCats } = await supabase
    .from('categories')
    .select('*', { count: 'exact', head: true })
    .eq('active', true);
  console.log('Active categories count:', activeCats);
}

checkData();
