-- Drop the unique constraint on user_id to allow multiple brands per user (for testing purposes)
ALTER TABLE public.brands DROP CONSTRAINT IF EXISTS brands_user_id_key;

-- Insert more sample published brands for carousel testing
INSERT INTO public.brands (user_id, name, email, website_url, tier, status, primary_category_id, secondary_category_id) VALUES
('f10e9502-b5f9-4608-a858-e322b582c6d3', 'Revival Denim Co', 'info@revivaldenim.example', 'https://revivaldenim.example', 'featured', 'published', 'baa5cb93-bb6f-42d0-ba5a-f2420e432e71', '053b1215-f840-4e8e-8b9f-00f759afba48'),
('f10e9502-b5f9-4608-a858-e322b582c6d3', 'Patchwork Studio', 'hello@patchwork.example', 'https://patchwork.example', 'standard', 'published', '053b1215-f840-4e8e-8b9f-00f759afba48', NULL),
('f10e9502-b5f9-4608-a858-e322b582c6d3', 'Second Life Textiles', 'contact@secondlife.example', 'https://secondlife.example', 'featured', 'published', 'df9380af-42f8-4e0f-bbcb-a57cae5e8f5b', 'fa49131a-d024-482d-890a-2225b793f18a'),
('f10e9502-b5f9-4608-a858-e322b582c6d3', 'Reimagine Apparel', 'team@reimagine.example', 'https://reimagine.example', 'basic', 'published', '3b944b70-49dd-45cf-9543-39332f176ed7', NULL),
('f10e9502-b5f9-4608-a858-e322b582c6d3', 'Heritage Threads', 'info@heritagethreads.example', 'https://heritagethreads.example', 'featured', 'published', '674eac39-0e9f-426e-9fd0-5b8e0ef21c08', '207b8830-a9bc-4b09-906b-717b378964d4'),
('f10e9502-b5f9-4608-a858-e322b582c6d3', 'Artisan Upcycle', 'create@artisanupcycle.example', 'https://artisanupcycle.example', 'standard', 'published', '7fa5c0d8-d810-4733-ab6a-2c5facaedea4', NULL),
('f10e9502-b5f9-4608-a858-e322b582c6d3', 'Luxe Remake', 'studio@luxeremake.example', 'https://luxeremake.example', 'featured', 'published', '207b8830-a9bc-4b09-906b-717b378964d4', '33d6481c-5974-4bad-9f66-32e50e5c767a');

-- Add brand content for the new brands
INSERT INTO public.brand_content (brand_id, field_type, value, display_order) VALUES
((SELECT id FROM brands WHERE name = 'Revival Denim Co'), 'blurb', 'Breathing new life into vintage denim through expert craftsmanship and sustainable practices.', 1),
((SELECT id FROM brands WHERE name = 'Revival Denim Co'), 'image', 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=800', 2),
((SELECT id FROM brands WHERE name = 'Revival Denim Co'), 'bio', 'Revival Denim Co transforms pre-loved jeans into unique, one-of-a-kind pieces. Our skilled artisans combine traditional techniques with modern design.', 3),
((SELECT id FROM brands WHERE name = 'Revival Denim Co'), 'logo', 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=200', 4),

((SELECT id FROM brands WHERE name = 'Patchwork Studio'), 'blurb', 'Creating beautiful textile art from fabric scraps and remnants.', 1),
((SELECT id FROM brands WHERE name = 'Patchwork Studio'), 'image', 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800', 2),

((SELECT id FROM brands WHERE name = 'Second Life Textiles'), 'blurb', 'Industrial-scale textile recycling with a focus on quality and sustainability.', 1),
((SELECT id FROM brands WHERE name = 'Second Life Textiles'), 'image', 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800', 2),
((SELECT id FROM brands WHERE name = 'Second Life Textiles'), 'bio', 'Second Life Textiles operates the largest textile upcycling facility in the region, processing thousands of garments daily.', 3),
((SELECT id FROM brands WHERE name = 'Second Life Textiles'), 'logo', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200', 4),

((SELECT id FROM brands WHERE name = 'Reimagine Apparel'), 'blurb', 'Zero-waste fashion for the conscious consumer.', 1),
((SELECT id FROM brands WHERE name = 'Reimagine Apparel'), 'image', 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800', 2),

((SELECT id FROM brands WHERE name = 'Heritage Threads'), 'blurb', 'Preserving traditional textile techniques while creating contemporary fashion.', 1),
((SELECT id FROM brands WHERE name = 'Heritage Threads'), 'image', 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800', 2),
((SELECT id FROM brands WHERE name = 'Heritage Threads'), 'bio', 'Heritage Threads works with artisan communities worldwide to preserve endangered textile traditions.', 3),
((SELECT id FROM brands WHERE name = 'Heritage Threads'), 'logo', 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200', 4),

((SELECT id FROM brands WHERE name = 'Artisan Upcycle'), 'blurb', 'Community-driven upcycling with a focus on education and empowerment.', 1),
((SELECT id FROM brands WHERE name = 'Artisan Upcycle'), 'image', 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800', 2),

((SELECT id FROM brands WHERE name = 'Luxe Remake'), 'blurb', 'High-end upcycled fashion that rivals luxury brands in quality and design.', 1),
((SELECT id FROM brands WHERE name = 'Luxe Remake'), 'image', 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800', 2),
((SELECT id FROM brands WHERE name = 'Luxe Remake'), 'bio', 'Luxe Remake sources premium vintage pieces and transforms them into couture-quality garments.', 3),
((SELECT id FROM brands WHERE name = 'Luxe Remake'), 'logo', 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=200', 4);