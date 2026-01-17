-- Add more brands with varied tiers
INSERT INTO brands (name, tier, status, email, website_url, is_featured, primary_category_id, secondary_category_id) VALUES
-- Zero-Waste Design brands
('Void Patterns Studio', 'featured', 'published', 'hello@voidpatterns.co', 'https://voidpatterns.co', true, '3b944b70-49dd-45cf-9543-39332f176ed7'::uuid, NULL),
('Geometry Atelier', 'standard', 'published', 'info@geometryatelier.com', 'https://geometryatelier.com', false, '3b944b70-49dd-45cf-9543-39332f176ed7'::uuid, NULL),
('Full Cloth Collective', 'featured', 'published', 'studio@fullcloth.org', 'https://fullcloth.org', true, '3b944b70-49dd-45cf-9543-39332f176ed7'::uuid, NULL),

-- Garment Refashioning brands
('Second Cut Studio', 'featured', 'published', 'studio@secondcut.co', 'https://secondcut.co', true, '053b1215-f840-4e8e-8b9f-00f759afba48'::uuid, NULL),
('Reform Atelier', 'standard', 'published', 'hello@reformatelier.com', 'https://reformatelier.com', false, '053b1215-f840-4e8e-8b9f-00f759afba48'::uuid, NULL),
('The Remake Collective', 'featured', 'published', 'info@theremake.org', 'https://theremake.org', true, '053b1215-f840-4e8e-8b9f-00f759afba48'::uuid, NULL),

-- Textile Waste brands
('Salvage Textiles', 'featured', 'published', 'info@salvagetextiles.com', 'https://salvagetextiles.com', true, 'baa5cb93-bb6f-42d0-ba5a-f2420e432e71'::uuid, NULL),
('Scrap Studios', 'standard', 'published', 'hello@scrapstudios.co', 'https://scrapstudios.co', false, 'baa5cb93-bb6f-42d0-ba5a-f2420e432e71'::uuid, NULL),

-- Denim brands
('Blue Reimagined', 'featured', 'published', 'studio@bluereimagnined.co', 'https://bluereimagnined.co', true, '8af67843-a125-46d0-9a3d-f1014f99b3da'::uuid, NULL),
('Indigo Second Life', 'standard', 'published', 'info@indigosecondlife.com', 'https://indigosecondlife.com', false, '8af67843-a125-46d0-9a3d-f1014f99b3da'::uuid, NULL),
('Fade Forward', 'standard', 'published', 'make@fadeforward.studio', 'https://fadeforward.studio', false, '8af67843-a125-46d0-9a3d-f1014f99b3da'::uuid, NULL),

-- Deadstock brands
('Stockroom Revival', 'featured', 'published', 'info@stockroomrevival.com', 'https://stockroomrevival.com', true, 'df9380af-42f8-4e0f-bbcb-a57cae5e8f5b'::uuid, NULL),
('End of Roll Studio', 'standard', 'published', 'hello@endofroll.co', 'https://endofroll.co', false, 'df9380af-42f8-4e0f-bbcb-a57cae5e8f5b'::uuid, NULL),

-- Repair & Mending brands
('Stitch & Story', 'featured', 'published', 'hello@stitchandstory.co', 'https://stitchandstory.co', true, 'ee76c165-0989-46ae-8436-2215bed0250c'::uuid, NULL),
('Visible Repair Co', 'standard', 'published', 'mend@visiblerepair.com', 'https://visiblerepair.com', false, 'ee76c165-0989-46ae-8436-2215bed0250c'::uuid, NULL),
('Sashiko Studio', 'featured', 'published', 'create@sashikostudio.com', 'https://sashikostudio.com', true, 'ee76c165-0989-46ae-8436-2215bed0250c'::uuid, '053b1215-f840-4e8e-8b9f-00f759afba48'::uuid),

-- Secondhand brands
('Thrift Alchemy', 'featured', 'published', 'transform@thriftalchemy.co', 'https://thriftalchemy.co', true, '8a6e3906-a876-42fe-9a32-a52a06b4923b'::uuid, NULL),
('Flip Studios', 'standard', 'published', 'hello@flipstudios.com', 'https://flipstudios.com', false, '8a6e3906-a876-42fe-9a32-a52a06b4923b'::uuid, NULL),

-- Patchwork brands  
('Patch Collective', 'featured', 'published', 'make@patchcollective.org', 'https://patchcollective.org', true, '8fa6a98d-71da-4506-a938-ccadb24371d5'::uuid, NULL),
('Modern Quilt Studio', 'standard', 'published', 'info@modernquiltstudio.co', 'https://modernquiltstudio.co', false, '8fa6a98d-71da-4506-a938-ccadb24371d5'::uuid, NULL),

-- Dyeing brands
('Natural Color Studio', 'featured', 'published', 'dye@naturalcolorstudio.com', 'https://naturalcolorstudio.com', true, '5e42e609-53f4-4b4f-b89e-fc89e49a4dcf'::uuid, NULL),
('Botanical Hues', 'standard', 'published', 'info@botanicalhues.co', 'https://botanicalhues.co', false, '5e42e609-53f4-4b4f-b89e-fc89e49a4dcf'::uuid, NULL),

-- Embellishment brands
('Embroidered Stories', 'featured', 'published', 'stitch@embroideredstories.co', 'https://embroideredstories.co', true, 'e256882c-58f7-4126-888a-5d5747d3ceb1'::uuid, NULL),
('Ornament Studio', 'standard', 'published', 'create@ornamentstudio.com', 'https://ornamentstudio.com', false, 'e256882c-58f7-4126-888a-5d5747d3ceb1'::uuid, NULL),

-- Circular Fashion brands
('Loop Fashion Lab', 'featured', 'published', 'info@loopfashionlab.com', 'https://loopfashionlab.com', true, 'fa49131a-d024-482d-890a-2225b793f18a'::uuid, NULL),

-- Mixed-Material brands
('Hybrid Makers', 'featured', 'published', 'studio@hybridmakers.co', 'https://hybridmakers.co', true, '672fbc98-a8aa-43bb-a302-9cd38ce64126'::uuid, NULL),
('Assemblage Studios', 'basic', 'published', 'create@assemblagestudios.co', 'https://assemblagestudios.co', false, '672fbc98-a8aa-43bb-a302-9cd38ce64126'::uuid, NULL),

-- Leather brands
('Leather Revival Co', 'featured', 'published', 'restore@leatherrevival.co', 'https://leatherrevival.co', true, '438b1a80-4e65-4fd7-9c5e-792a545b66c0'::uuid, NULL),

-- Community brands
('Repair Café Network', 'featured', 'published', 'join@repaircafe.network', 'https://repaircafe.network', true, '7fa5c0d8-d810-4733-ab6a-2c5facaedea4'::uuid, NULL),
('Mend Together', 'standard', 'published', 'hello@mendtogether.org', 'https://mendtogether.org', false, '7fa5c0d8-d810-4733-ab6a-2c5facaedea4'::uuid, NULL),

-- Natural Fiber brands
('Fiber Reclaim', 'featured', 'published', 'info@fiberreclaim.co', 'https://fiberreclaim.co', true, 'b7f90de6-688c-49ac-b212-6c46cfea7206'::uuid, NULL),

-- Recycled Synthetic brands
('Ocean Yarn Collective', 'featured', 'published', 'hello@oceanyarn.co', 'https://oceanyarn.co', true, '5f414230-27e8-444f-b6a0-bbb584a5436a'::uuid, NULL),

-- Luxury Upcycling brands
('Couture Reclaimed', 'featured', 'published', 'atelier@couturereclaimed.com', 'https://couturereclaimed.com', true, '207b8830-a9bc-4b09-906b-717b378964d4'::uuid, NULL),
('Luxury Second Life', 'featured', 'published', 'info@luxurysecondlife.co', 'https://luxurysecondlife.co', true, '207b8830-a9bc-4b09-906b-717b378964d4'::uuid, NULL);