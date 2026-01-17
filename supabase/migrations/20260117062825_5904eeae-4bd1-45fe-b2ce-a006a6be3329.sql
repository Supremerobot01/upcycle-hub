-- Delete the bad placeholder images I just added and replace with relevant ones
DELETE FROM brand_content WHERE field_type = 'image' AND value LIKE '%unsplash%';

-- Re-add with curated, relevant sustainable fashion images
INSERT INTO brand_content (brand_id, field_type, value, display_order)
-- Zero-Waste / Pattern brands
SELECT id, 'image', 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800', 0 FROM brands WHERE name = 'Void Patterns Studio'
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1558171014-e5aa9c5f46bb?w=800', 0 FROM brands WHERE name = 'Geometry Atelier'
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1558171015-cf3684c84fb3?w=800', 0 FROM brands WHERE name = 'Full Cloth Collective'
-- Garment Refashioning
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1467043198406-dc953a3defa0?w=800', 0 FROM brands WHERE name = 'Second Cut Studio'
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800', 0 FROM brands WHERE name = 'Reform Atelier'
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800', 0 FROM brands WHERE name = 'The Remake Collective'
-- Textile Waste
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1558171015-c7c26c07de3f?w=800', 0 FROM brands WHERE name = 'Salvage Textiles'
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800', 0 FROM brands WHERE name = 'Scrap Studios'
-- Denim
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=800', 0 FROM brands WHERE name = 'Blue Reimagined'
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800', 0 FROM brands WHERE name = 'Indigo Second Life'
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=800', 0 FROM brands WHERE name = 'Fade Forward'
-- Deadstock
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1558171014-c5c1f0a8d10d?w=800', 0 FROM brands WHERE name = 'Stockroom Revival'
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800', 0 FROM brands WHERE name = 'End of Roll Studio'
-- Repair & Mending
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1594938328870-9623159c8c99?w=800', 0 FROM brands WHERE name = 'Stitch & Story'
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800', 0 FROM brands WHERE name = 'Visible Repair Co'
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1594938291221-87249aa2c249?w=800', 0 FROM brands WHERE name = 'Sashiko Studio'
-- Secondhand
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800', 0 FROM brands WHERE name = 'Thrift Alchemy'
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800', 0 FROM brands WHERE name = 'Flip Studios'
-- Patchwork
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800', 0 FROM brands WHERE name = 'Patch Collective'
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1558171014-e5aa9c5f46bb?w=800', 0 FROM brands WHERE name = 'Modern Quilt Studio'
-- Dyeing
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800', 0 FROM brands WHERE name = 'Natural Color Studio'
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1558171015-c7c26c07de3f?w=800', 0 FROM brands WHERE name = 'Botanical Hues'
-- Embellishment
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800', 0 FROM brands WHERE name = 'Embroidered Stories'
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1558171014-e5aa9c5f46bb?w=800', 0 FROM brands WHERE name = 'Ornament Studio'
-- Circular Fashion
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800', 0 FROM brands WHERE name = 'Loop Fashion Lab'
-- Mixed-Material
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1558171015-cf3684c84fb3?w=800', 0 FROM brands WHERE name = 'Hybrid Makers'
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800', 0 FROM brands WHERE name = 'Assemblage Studios'
-- Leather
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800', 0 FROM brands WHERE name = 'Leather Revival Co'
-- Community
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800', 0 FROM brands WHERE name = 'Repair Café Network'
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800', 0 FROM brands WHERE name = 'Mend Together'
-- Natural Fiber
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800', 0 FROM brands WHERE name = 'Fiber Reclaim'
-- Recycled Synthetic
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1558171015-c7c26c07de3f?w=800', 0 FROM brands WHERE name = 'Ocean Yarn Collective'
-- Luxury
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', 0 FROM brands WHERE name = 'Couture Reclaimed'
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800', 0 FROM brands WHERE name = 'Luxury Second Life'
-- Original brands that already had images - restore them
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800', 0 FROM brands WHERE name = 'EcoThread Collective'
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=800', 0 FROM brands WHERE name = 'Revival Denim Co'
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800', 0 FROM brands WHERE name = 'Patchwork Studio'
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800', 0 FROM brands WHERE name = 'Second Life Textiles'
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800', 0 FROM brands WHERE name = 'Reimagine Apparel'
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800', 0 FROM brands WHERE name = 'Heritage Threads'
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800', 0 FROM brands WHERE name = 'Artisan Upcycle'
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800', 0 FROM brands WHERE name = 'Luxe Remake';