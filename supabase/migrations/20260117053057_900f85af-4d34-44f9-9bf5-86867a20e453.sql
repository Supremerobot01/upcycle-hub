-- Insert sample published dictionary entry
INSERT INTO public.dictionary_entries (title, slug, body, status)
VALUES (
  'Upcycling',
  'upcycling',
  'Upcycling is the process of transforming waste materials or unwanted products into new materials or products of higher quality or environmental value. Unlike recycling, which often breaks down materials, upcycling repurposes items creatively while maintaining or enhancing their original form.',
  'published'
);

-- Link it to a category
INSERT INTO public.entry_categories (entry_id, category_id)
SELECT 
  (SELECT id FROM dictionary_entries WHERE slug = 'upcycling'),
  '053b1215-f840-4e8e-8b9f-00f759afba48';