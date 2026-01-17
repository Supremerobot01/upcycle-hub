-- Insert more sample published dictionary entries
INSERT INTO public.dictionary_entries (title, slug, body, status) VALUES
(
  'Zero-Waste Design',
  'zero-waste-design',
  'Zero-waste design is a pattern-making approach that eliminates textile waste during the cutting process. Designers create patterns that use 100% of the fabric, leaving no scraps. This technique requires creative thinking about garment construction and often results in unique, innovative silhouettes.',
  'published'
),
(
  'Deadstock Fabric',
  'deadstock-fabric',
  'Deadstock refers to unused fabric that would otherwise go to waste. This includes excess materials from fashion houses, discontinued textiles from manufacturers, or surplus inventory. Using deadstock reduces demand for new fabric production and gives new life to existing materials.',
  'published'
),
(
  'Textile Recycling',
  'textile-recycling',
  'Textile recycling involves converting old clothing and textiles into new materials. This can include mechanical recycling (shredding fabrics into fibers) or chemical recycling (breaking down materials at a molecular level). These processes help divert textiles from landfills.',
  'published'
),
(
  'Circular Fashion',
  'circular-fashion',
  'Circular fashion is a regenerative system where products are designed, produced, and used in ways that maximize their lifespan and minimize waste. It emphasizes durability, repairability, and eventual recyclability, keeping materials in use for as long as possible.',
  'published'
);

-- Link entries to categories
INSERT INTO public.entry_categories (entry_id, category_id) VALUES
((SELECT id FROM dictionary_entries WHERE slug = 'zero-waste-design'), '3b944b70-49dd-45cf-9543-39332f176ed7'),
((SELECT id FROM dictionary_entries WHERE slug = 'deadstock-fabric'), 'df9380af-42f8-4e0f-bbcb-a57cae5e8f5b'),
((SELECT id FROM dictionary_entries WHERE slug = 'textile-recycling'), 'baa5cb93-bb6f-42d0-ba5a-f2420e432e71'),
((SELECT id FROM dictionary_entries WHERE slug = 'circular-fashion'), 'fa49131a-d024-482d-890a-2225b793f18a');

-- Insert a sample published brand using the existing user
INSERT INTO public.brands (user_id, name, email, website_url, tier, status, primary_category_id, secondary_category_id)
VALUES (
  'f10e9502-b5f9-4608-a858-e322b582c6d3',
  'EcoThread Collective',
  'hello@ecothread.example',
  'https://ecothread.example',
  'featured',
  'published',
  '053b1215-f840-4e8e-8b9f-00f759afba48',
  'fa49131a-d024-482d-890a-2225b793f18a'
);

-- Add brand content for the sample brand
INSERT INTO public.brand_content (brand_id, field_type, value, display_order) VALUES
((SELECT id FROM brands WHERE name = 'EcoThread Collective'), 'blurb', 'Transforming textile waste into stunning fashion pieces through innovative upcycling techniques.', 1),
((SELECT id FROM brands WHERE name = 'EcoThread Collective'), 'image', 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800', 2),
((SELECT id FROM brands WHERE name = 'EcoThread Collective'), 'bio', 'EcoThread Collective is a pioneering sustainable fashion brand dedicated to reducing textile waste. Founded in 2020, we work with local artisans to transform discarded materials into beautiful, wearable art. Every piece tells a story of transformation and environmental responsibility.', 3),
((SELECT id FROM brands WHERE name = 'EcoThread Collective'), 'logo', 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200', 4);