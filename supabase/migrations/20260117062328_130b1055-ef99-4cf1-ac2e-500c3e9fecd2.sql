-- Add brand content (blurbs) for new brands
INSERT INTO brand_content (brand_id, field_type, value, display_order)
SELECT id, 'blurb', 'Zero-waste pattern pioneers eliminating textile waste at the design stage.', 0 FROM brands WHERE name = 'Void Patterns Studio'
UNION ALL
SELECT id, 'blurb', 'Geometric precision meets sustainable fashion in our tessellated designs.', 0 FROM brands WHERE name = 'Geometry Atelier'
UNION ALL
SELECT id, 'blurb', 'Using 100% of every bolt—because waste is a design failure.', 0 FROM brands WHERE name = 'Full Cloth Collective'
UNION ALL
SELECT id, 'blurb', 'Expert deconstruction and reconstruction for garment rebirth.', 0 FROM brands WHERE name = 'Second Cut Studio'
UNION ALL
SELECT id, 'blurb', 'Tailoring tradition meets contemporary transformation.', 0 FROM brands WHERE name = 'Reform Atelier'
UNION ALL
SELECT id, 'blurb', 'Collaborative upcycling where every garment finds new purpose.', 0 FROM brands WHERE name = 'The Remake Collective'
UNION ALL
SELECT id, 'blurb', 'Rescuing factory waste and turning it into textile treasure.', 0 FROM brands WHERE name = 'Salvage Textiles'
UNION ALL
SELECT id, 'blurb', 'Small-batch creations from the fashion industry''s forgotten fragments.', 0 FROM brands WHERE name = 'Scrap Studios'
UNION ALL
SELECT id, 'blurb', 'Celebrating denim''s infinite potential for reinvention.', 0 FROM brands WHERE name = 'Blue Reimagined'
UNION ALL
SELECT id, 'blurb', 'Preserving the soul of worn indigo in contemporary silhouettes.', 0 FROM brands WHERE name = 'Indigo Second Life'
UNION ALL
SELECT id, 'blurb', 'Moving denim forward through thoughtful reconstruction.', 0 FROM brands WHERE name = 'Fade Forward'
UNION ALL
SELECT id, 'blurb', 'Unlocking value in dormant fabric inventories worldwide.', 0 FROM brands WHERE name = 'Stockroom Revival'
UNION ALL
SELECT id, 'blurb', 'Beautiful designs from the last meters on the roll.', 0 FROM brands WHERE name = 'End of Roll Studio'
UNION ALL
SELECT id, 'blurb', 'Making repair visible, meaningful, and beautiful.', 0 FROM brands WHERE name = 'Stitch & Story'
UNION ALL
SELECT id, 'blurb', 'Celebrating imperfection through intentional, visible repair.', 0 FROM brands WHERE name = 'Visible Repair Co'
UNION ALL
SELECT id, 'blurb', 'Traditional Japanese stitching for contemporary garment care.', 0 FROM brands WHERE name = 'Sashiko Studio'
UNION ALL
SELECT id, 'blurb', 'Transforming thrift finds into runway-worthy pieces.', 0 FROM brands WHERE name = 'Thrift Alchemy'
UNION ALL
SELECT id, 'blurb', 'Quick transformations that maximize secondhand potential.', 0 FROM brands WHERE name = 'Flip Studios'
UNION ALL
SELECT id, 'blurb', 'Uniting makers through the art of pieced textiles.', 0 FROM brands WHERE name = 'Patch Collective'
UNION ALL
SELECT id, 'blurb', 'Contemporary quilting for wearable and home applications.', 0 FROM brands WHERE name = 'Modern Quilt Studio'
UNION ALL
SELECT id, 'blurb', 'Plant-based color revival for faded and stained textiles.', 0 FROM brands WHERE name = 'Natural Color Studio'
UNION ALL
SELECT id, 'blurb', 'Extracting beauty from leaves, roots, and flowers.', 0 FROM brands WHERE name = 'Botanical Hues'
UNION ALL
SELECT id, 'blurb', 'Needle and thread narratives on reclaimed fabric canvases.', 0 FROM brands WHERE name = 'Embroidered Stories'
UNION ALL
SELECT id, 'blurb', 'Decorative details that elevate upcycled foundations.', 0 FROM brands WHERE name = 'Ornament Studio'
UNION ALL
SELECT id, 'blurb', 'Designing for disassembly and endless material cycles.', 0 FROM brands WHERE name = 'Loop Fashion Lab'
UNION ALL
SELECT id, 'blurb', 'Mixed-material explorations at the edge of fashion and art.', 0 FROM brands WHERE name = 'Hybrid Makers'
UNION ALL
SELECT id, 'blurb', 'Sculptural assemblage from diverse material streams.', 0 FROM brands WHERE name = 'Assemblage Studios'
UNION ALL
SELECT id, 'blurb', 'Expert restoration and reimagining of vintage leather.', 0 FROM brands WHERE name = 'Leather Revival Co'
UNION ALL
SELECT id, 'blurb', 'Building repair communities one café at a time.', 0 FROM brands WHERE name = 'Repair Café Network'
UNION ALL
SELECT id, 'blurb', 'Collaborative mending for stronger communities.', 0 FROM brands WHERE name = 'Mend Together'
UNION ALL
SELECT id, 'blurb', 'Recovering and respinning natural fibers for new life.', 0 FROM brands WHERE name = 'Fiber Reclaim'
UNION ALL
SELECT id, 'blurb', 'Ocean plastics transformed into premium textile yarns.', 0 FROM brands WHERE name = 'Ocean Yarn Collective'
UNION ALL
SELECT id, 'blurb', 'Couture techniques applied to vintage luxury materials.', 0 FROM brands WHERE name = 'Couture Reclaimed'
UNION ALL
SELECT id, 'blurb', 'Extending the life of luxury through expert transformation.', 0 FROM brands WHERE name = 'Luxury Second Life';