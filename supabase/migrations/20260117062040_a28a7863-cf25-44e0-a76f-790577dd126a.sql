-- Insert brand content for existing brands (blurbs and bios only - images stored in blob storage)
INSERT INTO brand_content (brand_id, field_type, value, display_order)
SELECT id, 'blurb', 'Sustainable fashion pioneers transforming pre-loved materials into contemporary statement pieces.', 0
FROM brands WHERE name = 'EcoThread Collective'
UNION ALL
SELECT id, 'bio', 'Founded in 2019, EcoThread Collective emerged from a shared vision among textile designers to challenge the fashion industry''s waste crisis. Working from a converted warehouse in Portland, our team of artisans transforms discarded fabrics and vintage garments into one-of-a-kind pieces that honor both craft tradition and environmental responsibility.', 1
FROM brands WHERE name = 'EcoThread Collective'
UNION ALL
SELECT id, 'blurb', 'Reimagining denim''s lifecycle through expert deconstruction and artisanal reconstruction.', 0
FROM brands WHERE name = 'Revival Denim Co'
UNION ALL
SELECT id, 'bio', 'Revival Denim Co. specializes in giving worn denim a second life. Every pair of jeans tells a story—we believe that story shouldn''t end in a landfill. Our master craftspeople carefully deconstruct vintage and donated denim, preserving unique fades and wear patterns that become signature elements in new designs.', 1
FROM brands WHERE name = 'Revival Denim Co'
UNION ALL
SELECT id, 'blurb', 'Where textile fragments become wearable art through thoughtful patchwork composition.', 0
FROM brands WHERE name = 'Patchwork Studio'
UNION ALL
SELECT id, 'bio', 'Patchwork Studio celebrates the beauty of assembled fragments. What began as an experiment in our founder''s apartment has grown into a design practice that creates garments from carefully curated fabric remnants, each piece a unique tapestry of colors, textures, and histories.', 1
FROM brands WHERE name = 'Patchwork Studio'
UNION ALL
SELECT id, 'blurb', 'Extending fabric lifecycles through creative transformation and zero-waste pattern cutting.', 0
FROM brands WHERE name = 'Second Life Textiles'
UNION ALL
SELECT id, 'bio', 'Second Life Textiles operates at the intersection of environmental activism and high design. Using innovative zero-waste cutting techniques, we transform end-of-roll fabrics and textile remnants into sophisticated garments that prove sustainability and style are natural partners.', 1
FROM brands WHERE name = 'Second Life Textiles'
UNION ALL
SELECT id, 'blurb', 'Rethinking fashion from thread to closet with circular design principles.', 0
FROM brands WHERE name = 'Reimagine Apparel'
UNION ALL
SELECT id, 'bio', 'Reimagine Apparel was founded on a simple premise: fashion can be beautiful without being wasteful. Our design team approaches each collection with circular principles, selecting materials that can be remade and recycled, and constructing garments for longevity and eventual transformation.', 1
FROM brands WHERE name = 'Reimagine Apparel'
UNION ALL
SELECT id, 'blurb', 'Preserving textile heritage through traditional techniques and contemporary vision.', 0
FROM brands WHERE name = 'Heritage Threads'
UNION ALL
SELECT id, 'bio', 'Heritage Threads draws on generations of textile knowledge. Working with vintage fabrics—some dating back decades—we employ traditional hand-finishing techniques alongside modern construction methods. Each garment carries forward the stories embedded in these treasured materials.', 1
FROM brands WHERE name = 'Heritage Threads'
UNION ALL
SELECT id, 'blurb', 'Small-batch craftsmanship turning rescued materials into refined everyday essentials.', 0
FROM brands WHERE name = 'Artisan Upcycle'
UNION ALL
SELECT id, 'bio', 'Artisan Upcycle is a collective of skilled makers united by a commitment to material stewardship. From our workshops, we produce limited editions of thoughtfully designed pieces—bags, accessories, and garments—each made from carefully sourced secondhand and surplus materials.', 1
FROM brands WHERE name = 'Artisan Upcycle'
UNION ALL
SELECT id, 'blurb', 'Luxury-grade craftsmanship applied to the finest reclaimed and vintage materials.', 0
FROM brands WHERE name = 'Luxe Remake'
UNION ALL
SELECT id, 'bio', 'Luxe Remake proves that sustainability and luxury are not mutually exclusive. Sourcing from the finest vintage pieces and end-of-run luxury fabrics, our atelier applies couture techniques to create statement pieces worthy of the materials'' original pedigree—while giving them new purpose.', 1
FROM brands WHERE name = 'Luxe Remake';