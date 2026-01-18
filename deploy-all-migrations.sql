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
  '053b1215-f840-4e8e-8b9f-00f759afba48'
ON CONFLICT DO NOTHING;
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
)
ON CONFLICT (slug) DO NOTHING;

-- Link entries to categories
INSERT INTO public.entry_categories (entry_id, category_id) VALUES
((SELECT id FROM dictionary_entries WHERE slug = 'zero-waste-design'), '3b944b70-49dd-45cf-9543-39332f176ed7'),
((SELECT id FROM dictionary_entries WHERE slug = 'deadstock-fabric'), 'df9380af-42f8-4e0f-bbcb-a57cae5e8f5b'),
((SELECT id FROM dictionary_entries WHERE slug = 'textile-recycling'), 'baa5cb93-bb6f-42d0-ba5a-f2420e432e71'),
((SELECT id FROM dictionary_entries WHERE slug = 'circular-fashion'), 'fa49131a-d024-482d-890a-2225b793f18a')
ON CONFLICT DO NOTHING;

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
)
ON CONFLICT (user_id, name) DO NOTHING;

-- Add brand content for the sample brand
INSERT INTO public.brand_content (brand_id, field_type, value, display_order) VALUES
((SELECT id FROM brands WHERE name = 'EcoThread Collective'), 'blurb', 'Transforming textile waste into stunning fashion pieces through innovative upcycling techniques.', 1),
((SELECT id FROM brands WHERE name = 'EcoThread Collective'), 'image', 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800', 2),
((SELECT id FROM brands WHERE name = 'EcoThread Collective'), 'bio', 'EcoThread Collective is a pioneering sustainable fashion brand dedicated to reducing textile waste. Founded in 2020, we work with local artisans to transform discarded materials into beautiful, wearable art. Every piece tells a story of transformation and environmental responsibility.', 3),
((SELECT id FROM brands WHERE name = 'EcoThread Collective'), 'logo', 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200', 4)
ON CONFLICT DO NOTHING;
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
('f10e9502-b5f9-4608-a858-e322b582c6d3', 'Luxe Remake', 'studio@luxeremake.example', 'https://luxeremake.example', 'featured', 'published', '207b8830-a9bc-4b09-906b-717b378964d4', '33d6481c-5974-4bad-9f66-32e50e5c767a')
ON CONFLICT (user_id, name) DO NOTHING;

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
((SELECT id FROM brands WHERE name = 'Luxe Remake'), 'logo', 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=200', 4)
ON CONFLICT DO NOTHING;
-- Insert comprehensive dictionary entries
INSERT INTO dictionary_entries (title, slug, body, status) VALUES
-- Zero-Waste Design entries
('Zero-Waste Pattern Cutting', 'zero-waste-pattern-cutting', 'Zero-waste pattern cutting is a design methodology that eliminates textile waste at the pattern-making stage. By treating the fabric width as a fixed parameter, designers create interlocking pattern pieces that use 100% of the material.

This approach requires a fundamental shift in design thinkingâ€”garment silhouettes emerge from geometric constraints rather than being imposed upon fabric. The resulting designs often feature unexpected proportions and construction details that become signature elements.

Pioneered by designers like Timo Rissanen and Holly McQuillan, zero-waste cutting has evolved from an academic exercise into a commercially viable practice adopted by brands seeking to address the 15% average fabric waste in conventional garment production.', 'published'),

('Marker Optimization Techniques', 'marker-optimization-techniques', 'Marker optimization refers to the strategic arrangement of pattern pieces on fabric to minimize waste. While traditional markers accept 10-20% waste as inevitable, advanced optimization techniques can reduce this to under 5%.

Modern approaches combine algorithmic software with designer intuition. Nested cutting layouts, jigsaw-style arrangements, and modular pattern systems allow manufacturers to extract maximum value from each meter of fabric.

The environmental impact is significant: optimizing markers across the global apparel industry could save millions of tons of textile waste annually while reducing raw material costs for producers.', 'published'),

('Jigsaw Pattern Systems', 'jigsaw-pattern-systems', 'Jigsaw pattern systems treat garment construction as a puzzle where every piece must fit together without gaps. Unlike conventional patternmaking where shapes are designed independently, jigsaw systems consider the negative space between pieces as a design constraint.

These systems often produce unconventional garment constructionsâ€”seam placements determined by efficiency rather than convention, and finishing details that celebrate rather than hide the zero-waste methodology.

The learning curve is steep, but designers who master jigsaw systems often find their creativity enhanced rather than constrained by the geometric requirements.', 'published'),

-- Garment Refashioning entries
('Garment-to-Garment Reconstruction', 'garment-to-garment-reconstruction', 'Garment-to-garment reconstruction transforms existing clothing into entirely new pieces without reducing materials to fiber or fabric level. This direct transformation preserves the embedded energy of original manufacturing while creating unique, often one-of-a-kind pieces.

The practice ranges from simple alterationsâ€”taking in seams, shortening hemsâ€”to radical deconstruction and reassembly. Advanced practitioners combine multiple source garments into single new pieces, creating hybrid designs impossible to achieve through conventional manufacturing.

This approach represents the highest-value form of textile recycling, maintaining material integrity while adding creative and economic value through skilled labor.', 'published'),

('Deconstructive Tailoring', 'deconstructive-tailoring', 'Deconstructive tailoring applies traditional tailoring skills to the dismantling and reimagining of existing garments. Practitioners analyze construction methods, identify valuable components, and reassemble them according to new design specifications.

The discipline requires deep understanding of garment constructionâ€”seam allowances, fabric behavior, and structural elements like interfacing and linings. Master deconstructivists can transform a men''s suit into a women''s jacket, or combine multiple blouses into a single dress.

This skill set bridges traditional craftsmanship with contemporary sustainability concerns, creating a new category of maker who is equally historian and innovator.', 'published'),

('Silhouette Transformation Methods', 'silhouette-transformation-methods', 'Silhouette transformation encompasses techniques for radically altering a garment''s shape and proportions while maintaining material integrity. From boxy to fitted, oversized to structuredâ€”these methods extend the useful life of clothing that might otherwise be discarded due to style obsolescence.

Key techniques include strategic seam relocation, dart manipulation, and panel insertion or removal. Advanced practitioners can transform decade-old silhouettes into contemporary shapes, making vintage pieces wearable for modern contexts.

The practice challenges fast fashion''s obsolescence model by demonstrating that style currency can be renewed through skill rather than consumption.', 'published'),

-- Textile Waste Upcycling entries
('Post-Consumer Textile Recycling', 'post-consumer-textile-recycling', 'Post-consumer textile recycling addresses the 85% of clothing that currently ends up in landfills. Unlike donation or resale, recycling transforms materials into new products, often through mechanical or chemical processes that break down fibers for reuse.

The challenge lies in mixed-fiber content and contamination. Pure cotton or wool can be shredded and respun, but polyester-cotton blends require chemical separation. Innovation in this space focuses on scalable solutions for fiber identification and separation.

Emerging technologies promise closed-loop systems where old garments become feedstock for new fabric production, though commercial viability remains limited to specific fiber types.', 'published'),

('Pre-Consumer Waste Streams', 'pre-consumer-waste-streams', 'Pre-consumer textile waste includes cutting scraps, sampling materials, and production overrunsâ€”waste generated before products reach consumers. This cleaner, more consistent waste stream offers significant upcycling opportunities.

Factory scraps maintain known fiber content and quality specifications, making them easier to process than post-consumer waste. Progressive manufacturers now view cutting waste as a secondary product rather than disposal cost.

Small-scale upcyclers often partner with manufacturers to access this premium waste stream, creating products from materials that would otherwise be landfilled or downcycled into industrial rags.', 'published'),

('Industrial Offcut Utilization', 'industrial-offcut-utilization', 'Industrial offcutsâ€”the irregular fabric pieces remaining after pattern cuttingâ€”represent an underexploited resource for creative upcycling. These scraps maintain full fabric quality but are too small or irregularly shaped for conventional manufacturing.

Designers working with offcuts develop specialized skills in small-piece assembly, patchwork construction, and modular design systems. The constraints often produce distinctive aesthetics that become brand signatures.

Some operations specialize entirely in offcut sourcing, building businesses around materials that cost nothing at origin but gain value through creative transformation.', 'published'),

-- Denim Upcycling entries
('Denim Deconstruction Practices', 'denim-deconstruction-practices', 'Denim''s durability and cultural significance make it ideal for deconstruction and reconstruction. The fabric''s strength allows repeated sewing and handling, while its familiar aesthetic carries meaning across cultures and generations.

Practitioners harvest components based on wear patterns and indigo fadingâ€”each piece tells a story through its patina. Pockets, waistbands, and leg panels become building blocks for new designs that celebrate denim''s heritage.

The practice connects to denim''s working-class origins while elevating discarded jeans into considered design objects.', 'published'),

('Indigo Preservation Techniques', 'indigo-preservation-techniques', 'Indigo''s unique dyeing processâ€”building color through repeated oxidationâ€”creates unrepeatable fade patterns on denim. Preserving and showcasing these patterns is central to high-quality denim upcycling.

Skilled practitioners identify "sweet spots" of wear: whiskers, honeycombs, and pocket fading that indicate authentic use. These areas become focal points in new designs, turning wear marks into features rather than flaws.

Advanced techniques include strategic washing to enhance existing fades and careful pressing to maintain dimensional characteristics of original wear patterns.', 'published'),

('Jean Jacket Hybridization', 'jean-jacket-hybridization', 'The jean jacket occupies unique territory in fashionâ€”simultaneously workwear, subcultural signifier, and wardrobe staple. Hybridizing jean jackets combines this cultural weight with creative transformation.

Common approaches include sleeve substitution (adding knit or contrast fabric sleeves), panel replacement (leather accents, quilted sections), and silhouette modification (cropping, extending, or reshaping).

The results maintain the jacket''s iconic status while adding personal expression or elevated design details that distinguish from mass-market versions.', 'published'),

-- Deadstock Utilization entries
('Deadstock Fabric Sourcing', 'deadstock-fabric-sourcing', 'Deadstock fabricâ€”unused materials from cancelled orders, overproduction, or brand closuresâ€”offers access to high-quality textiles at reduced environmental cost. No new resources are consumed in production; the materials already exist.

Sourcing requires industry connections and opportunistic buying. Quantities are unpredictable, requiring flexible design approaches that adapt to available materials rather than specifying fabrics in advance.

Successful deadstock brands build identities around material resourcefulness, marketing limited-edition pieces made from fabrics that will never be available again.', 'published'),

('End-of-Roll Design Strategies', 'end-of-roll-design-strategies', 'End-of-roll fabricâ€”the final meters remaining after production runsâ€”presents unique design challenges. Quantities are limited and inconsistent, requiring modular or small-batch approaches.

Designers working with end-of-roll stock develop systems for mixing short lengths into cohesive collections. Color blocking, strategic paneling, and intentional mismatch become aesthetic features rather than limitations.

This approach suits made-to-order or limited-run business models where flexibility and uniqueness are valued over consistency.', 'published'),

('Vintage Fabric Restoration', 'vintage-fabric-restoration', 'Vintage fabricsâ€”stored for decadesâ€”often require restoration before use. Proper cleaning, pressing, and sometimes structural repair bring dormant materials back to working condition.

The rewards justify the effort: vintage textiles offer weave structures, fiber qualities, and print designs unavailable in contemporary production. Liberty prints from the 1960s, Japanese cottons from defunct mills, Italian wools from closed housesâ€”these materials connect new garments to textile history.

Restoration skills include stain removal, fiber identification, and construction techniques appropriate to fragile or aged materials.', 'published'),

-- Repair & Visible Mending entries
('Visible Mending Philosophy', 'visible-mending-philosophy', 'Visible mending rejects the repair paradigm of invisible restoration. Instead of hiding damage, visible mending celebrates itâ€”using contrasting thread, decorative patches, and obvious stitching to mark the garment''s history.

Rooted in Japanese concepts like wabi-sabi and kintsugi, visible mending finds beauty in imperfection and evidence of use. Each repair becomes a design element, accumulating over time into a unique garment biography.

The practice carries political weight in consumer culture: choosing repair over replacement, and making that choice visible, constitutes a quiet rejection of disposability.', 'published'),

('Sashiko and Boro Techniques', 'sashiko-boro-techniques', 'Sashiko and boro represent centuries-old Japanese textile practices now finding global adoption. Sashikoâ€”running stitch patterns creating geometric designsâ€”reinforces fabric while adding decoration. Boroâ€”the layered patching of worn textilesâ€”extends material life through accumulation.

These techniques developed from necessity in rural Japan, where textiles were precious and imported cotton was rare. Today they offer meditative, low-tech approaches to garment extension that require minimal tools and maximum patience.

Contemporary practitioners adapt traditional patterns to modern garments, creating visual continuity with historical textile cultures while addressing current sustainability concerns.', 'published'),

('Darning as Design Practice', 'darning-as-design-practice', 'Darningâ€”the interlacing of thread to replace worn fabricâ€”is among the oldest textile repair techniques. Contemporary darning practitioners elevate this utilitarian skill into deliberate design practice.

Using contrasting yarns, experimental weave patterns, and strategic placement, designers transform holes and worn spots into focal points. The darn becomes a signature element, drawing attention rather than deflecting it.

This inversionâ€”flaw as featureâ€”challenges assumptions about garment condition and value, suggesting that wear and repair might enhance rather than diminish worth.', 'published'),

-- Secondhand Transformation entries
('Thrift Flip Methodology', 'thrift-flip-methodology', 'Thrift flipping transforms secondhand garments through alteration, combination, and creative intervention. The practice democratizes upcycling, requiring minimal investment and basic sewing skills.

Successful thrift flipping requires trained eyeâ€”the ability to see potential in unlikely source garments. An oversized dress becomes a structured top; men''s trousers transform into a skirt; multiple blouses combine into a single patchwork piece.

Social media has amplified the practice, with creators documenting transformations and sharing techniques with global audiences.', 'published'),

('Size Adaptation Techniques', 'size-adaptation-techniques', 'Size adaptation addresses one of secondhand shopping''s primary barriers: the limited size range of vintage and thrifted clothing. Skilled adaptation expands or contracts garments to fit new bodies.

Techniques range from simpleâ€”letting out seams, adding gussetsâ€”to complex restructuring that maintains garment integrity while significantly altering dimensions. The goal is invisible modification: the finished piece should appear intentionally designed at its new size.

This skill set enables access to vintage treasures previously limited to narrow size ranges, democratizing secondhand fashion beyond bodies that happen to match historical sizing norms.', 'published'),

-- Patchwork & Quilting entries
('Contemporary Patchwork Construction', 'contemporary-patchwork-construction', 'Contemporary patchwork applies traditional quilting techniques to garment construction. Rather than decorative bed covers, modern practitioners create wearable pieces from assembled fragments.

The approach suits sustainability goals: small fabric pieces unusable for conventional cutting become building blocks for complex designs. The constraints of patchworkâ€”working with available materials rather than designed patternsâ€”often produce unexpected aesthetic outcomes.

Technical challenges include matching fabric weights, managing bulk at seam intersections, and creating stable structures from potentially unstable components.', 'published'),

('Improvisational Quilting Methods', 'improvisational-quilting-methods', 'Improvisational quilting rejects templates and planned layouts in favor of intuitive composition. Practitioners work responsively, letting each added piece inform the next decision.

This approach suits upcycling contexts where source materials arrive unpredictably. Rather than waiting for matching fabrics, improvisational quilters incorporate whatever becomes available, trusting process to create coherence.

The results often carry more energy and visual interest than planned quilts, reflecting the responsive decision-making embedded in their construction.', 'published'),

-- Dyeing & Surface Treatment entries
('Natural Dye Applications', 'natural-dye-applications', 'Natural dyeing uses plant, mineral, and insect-derived colorants instead of synthetic dyes. Applied to upcycling, natural dyes can transform stained or faded textiles into newly vibrant pieces.

The process requires patienceâ€”mordanting, repeated dipping, and proper fixationâ€”but produces colors with depth and complexity impossible to achieve synthetically. Indigo''s living oxidation, madder''s warm variations, and weld''s bright yellows each carry distinct characteristics.

Natural dyeing connects contemporary practice to pre-industrial textile traditions while addressing concerns about synthetic dye pollution in global waterways.', 'published'),

('Overdyeing and Color Revival', 'overdyeing-color-revival', 'Overdyeing applies new color over existing dyed fabric, creating complex color relationships impossible to achieve through single dyeing. Faded garments gain new life; stains disappear under deeper hues.

The technique requires understanding of color interactionâ€”red over blue creates purple; yellow over faded black produces olive. Practitioners develop intuition for predicting outcomes from starting color, fabric fiber, and dye choice.

Overdyeing offers low-cost color transformation without complex equipment, making it accessible to home practitioners and small studios alike.', 'published'),

-- Embellishment & Handcraft entries
('Embroidered Repair and Embellishment', 'embroidered-repair-embellishment', 'Embroidery bridges repair and embellishmentâ€”functional stitching that simultaneously decorates. A patch becomes a canvas; a reinforced seam becomes a design line; stain coverage becomes botanical illustration.

The practice requires needle skills but minimal equipment, making it accessible across economic contexts. Historical embroidery traditions from every culture offer technique vocabularies applicable to contemporary upcycling.

Time investment is significantâ€”hours of handwork for visible resultsâ€”but the meditative quality of stitching often provides value beyond the finished product.', 'published'),

('Beading and Surface Adornment', 'beading-surface-adornment', 'Beading adds material value to garments through accumulated handwork. Applied to upcycled pieces, beading can elevate simple source garments into statement pieces worthy of special occasions.

Techniques range from scattered individual beads to dense beaded panels requiring thousands of hand-sewn elements. Weight and care requirements must be consideredâ€”heavily beaded pieces require hand washing and careful storage.

Sourcing reclaimed beads from vintage jewelry, broken necklaces, or thrifted decorative items extends the upcycling philosophy to embellishment materials themselves.', 'published'),

-- Circular Fashion Systems entries
('Closed-Loop Production Models', 'closed-loop-production-models', 'Closed-loop production systems design for end-of-life from the beginning. Garments are constructed for eventual disassembly; materials are selected for recyclability; take-back programs ensure products return to manufacturers rather than landfills.

Implementation requires systemic thinking beyond individual garments. Fiber choices, joining methods, and business models must align. Mono-material construction simplifies recycling; mechanical fasteners enable non-destructive disassembly.

Few brands achieve true closed-loop status, but the concept provides direction for industry transformation beyond incremental sustainability improvements.', 'published'),

('Take-Back Program Design', 'take-back-program-design', 'Take-back programs collect used garments from consumers for recycling, refurbishment, or responsible disposal. Effective programs require convenient collection, transparent processing, and genuine material recovery rather than greenwashing.

Design considerations include incentive structures (discounts, loyalty points), collection logistics (in-store, mail-back, pickup), and processing partnerships (recyclers, upcyclers, resale platforms).

The most successful programs integrate take-back into brand identity, making return as natural as purchase and building ongoing relationships with consumers beyond initial transactions.', 'published'),

-- Mixed-Material / Bricolage entries
('Mixed-Media Garment Construction', 'mixed-media-garment-construction', 'Mixed-media construction combines disparate materialsâ€”textile with leather, fabric with metal, woven with knitâ€”into unified garments. The approach suits upcycling contexts where material availability is unpredictable.

Technical challenges include joining dissimilar materials, managing different care requirements, and creating visual coherence from potentially chaotic combinations.

The best mixed-media work transcends its salvage origins, appearing as intentional design rather than constrained assemblage.', 'published'),

('Found Object Integration', 'found-object-integration', 'Found object integration extends upcycling beyond textiles to include non-fabric materials. Hardware, jewelry fragments, industrial components, and natural objects become garment elements.

Safety and wearability require careful considerationâ€”sharp edges must be covered or removed; weight distribution must be manageable; cleaning must remain possible.

The results often carry surrealist or sculptural qualities, blurring boundaries between garment and art object.', 'published'),

-- Leather & Non-Textile entries
('Leather Reconditioning Methods', 'leather-reconditioning-methods', 'Leather''s durability enables reconditioning that extends material life for decades. Cleaning, conditioning, and minor repairs restore vintage leather to functional condition while preserving patina and character.

Techniques include saddle soap cleaning, oil conditioning, scratch repair, and hardware replacement. More significant damageâ€”tears, holes, extensive wearâ€”may require patching or panel replacement.

Reconditioning skills apply across leather goods: jackets, bags, shoes, and accessories all benefit from proper maintenance and restoration.', 'published'),

('Leather Patchwork Applications', 'leather-patchwork-applications', 'Leather patchwork assembles small pieces into larger panels suitable for garment construction. Scraps from bag production, damaged sections from vintage pieces, and sample materials combine into unique composite surfaces.

Joining requires specialized equipmentâ€”industrial machines or hand-stitching with appropriate needles and thread. Edge finishing techniques prevent fraying and create clean seam allowances.

The resulting material carries visual complexity impossible to achieve with single hides, with color and texture variations adding depth.', 'published'),

-- Community-Based / DIY entries
('Repair CafÃ© Facilitation', 'repair-cafe-facilitation', 'Repair cafÃ©s create community spaces where experienced menders help others repair clothing and household textiles. The model spreads skills while extending product lifespans and building social connections.

Successful facilitation requires space, basic equipment (sewing machines, irons, notions), volunteer expertise, and community outreach. Regular scheduling builds habit and expectation.

Beyond individual repairs, cafÃ©s shift cultural attitudes toward maintenance and care, normalizing repair as routine practice rather than exceptional intervention.', 'published'),

('Skill-Sharing Workshop Models', 'skill-sharing-workshop-models', 'Skill-sharing workshops teach specific techniques in focused sessions. Unlike ongoing classes, workshops deliver concentrated learning that participants can immediately apply.

Effective workshop design includes clear learning objectives, appropriate difficulty levels, take-home resources, and hands-on practice time. Demonstrations must be visible; materials must be adequate; pacing must accommodate varied skill levels.

Workshops often serve as entry pointsâ€”participants gain enough skill to attempt projects independently, potentially returning for advanced sessions.', 'published'),

-- Natural Fiber Reuse entries
('Wool Fiber Recovery', 'wool-fiber-recovery', 'Wool''s natural propertiesâ€”resilience, felting capacity, biodegradabilityâ€”make it ideal for fiber-level recovery. Old sweaters can be unraveled for yarn; felted wool can be cut for craft applications; worn wool returns nutrients to soil.

Unraveling requires patience and techniqueâ€”proper unwinding preserves fiber integrity; rushed pulling creates breakage. The reclaimed yarn often carries more character than virgin equivalents.

For items beyond unraveling, wool''s ability to felt opens additional possibilities: fulled fabric becomes stable material for cutting without fraying.', 'published'),

('Linen and Hemp Restoration', 'linen-hemp-restoration', 'Linen and hemp textiles improve with ageâ€”fibers soften through washing and wear while maintaining strength. Vintage linens offer quality often unavailable in contemporary production.

Restoration addresses stains, tears, and storage damage. Enzyme treatments can remove aged stains; reweaving repairs holes; proper pressing restores hand and drape.

These bast fibers connect to pre-industrial textile traditions when linen and hemp were common rather than luxury materials.', 'published'),

-- Recycled Synthetic Materials entries
('Polyester Recycling Processes', 'polyester-recycling-processes', 'Polyester recycling addresses the permanence problem: synthetic fibers persist for centuries in landfills. Mechanical recycling shreds and melts polyester for respinning; chemical recycling breaks polymers to molecular level for reconstitution.

Current limitations include color contamination (recycled polyester tends toward gray), fiber quality degradation through mechanical processing, and the energy intensity of chemical approaches.

Despite limitations, recycled polyester represents significant improvement over virgin production, reducing petroleum dependence and landfill burden.', 'published'),

('Nylon Recovery Applications', 'nylon-recovery-applications', 'Nylon recovery focuses on high-value applications: fishing nets, carpet fibers, and industrial materials. The polymer''s propertiesâ€”strength, elasticity, durabilityâ€”make recovery worthwhile despite processing costs.

Consumer-facing applications include recycled nylon swimwear, hosiery, and activewear. These products perform identically to virgin equivalents while reducing environmental impact.

Sourcing remains challengingâ€”collection infrastructure for nylon waste lags behind polyester, and sorting mixed synthetic streams adds complexity.', 'published'),

-- Luxury / Couture Upcycling entries
('Haute Couture Deconstruction', 'haute-couture-deconstruction', 'Deconstructing haute couture requires reverence for original craftsmanship alongside willingness to reimagine. Vintage couture pieces often contain techniques lost to contemporary productionâ€”hand-rolled hems, bound buttonholes, couture-weight interlinings.

Practitioners document construction methods before disassembly, preserving knowledge while liberating materials. The goal is not destruction but transformation that honors original making while enabling new expression.

Resulting pieces often reference their origins: a Balenciaga-sourced jacket maintains proportions suggesting its parentage even in radically altered form.', 'published'),

('Luxury Material Reclamation', 'luxury-material-reclamation', 'Luxury materialsâ€”silk, cashmere, fine leatherâ€”justify specialized reclamation due to high replacement cost. Stained silk scarves become linings; worn cashmere sweaters yield material for accessories; damaged luxury bags provide hardware and leather for smaller items.

Quality assessment is critical: is the material worth the processing effort? Fiber degradation, moth damage, and structural weakness can render luxury materials unusable regardless of original value.

The most skilled practitioners achieve transformations where reclaimed materials outperform new equivalents, adding patina and history to inherent quality.', 'published'),

-- Cultural & Heritage Practices entries
('Traditional Textile Preservation', 'traditional-textile-preservation', 'Traditional textiles carry cultural knowledge in their constructionâ€”regional techniques, symbolic patterns, and historical production methods embedded in fabric. Preservation maintains these connections across generations.

Approaches range from museum-style conservation (stabilizing without alteration) to living preservation (continuing to use and repair traditional pieces). The latter acknowledges textiles as functional objects meant for use rather than static artifacts.

Contemporary upcyclers working with traditional textiles navigate respect for cultural significance alongside creative transformation.', 'published'),

('Regional Craft Revival', 'regional-craft-revival', 'Regional craft revival reconnects contemporary making with historical local practices. Techniques abandoned during industrializationâ€”regional weaving patterns, local dyeing traditions, specific construction methodsâ€”find new practitioners committed to continuation.

Revival requires research, often archaeological: examining surviving examples, interpreting fragmentary documentation, and experimenting with historical materials and tools.

The resulting work grounds contemporary practice in specific places and histories, offering alternative to globalized fashion''s placelessness.', 'published'),

-- Experimental / Conceptual entries
('Speculative Material Futures', 'speculative-material-futures', 'Speculative design imagines textile futures beyond current technological constraints. What if fabrics could self-repair? What if garments could biodegrade on command? What if clothing could be grown rather than manufactured?

These speculations inform present-day research directions while challenging assumptions about material possibility. The conceptual work creates space for innovation by suggesting destinations before routes are mapped.

Even unrealizable speculations serve purpose: expanding imagination enables seeing beyond current limitations toward genuinely alternative systems.', 'published'),

('Conceptual Deconstruction Projects', 'conceptual-deconstruction-projects', 'Conceptual deconstruction uses garment disassembly as medium for commentary. The work asks questions through making: What is a garment? When does clothing become waste? How do we assign value to materials?

Projects might document complete garment decomposition, create taxonomies of component parts, or reassemble pieces according to unconventional logics.

This work operates in galleries and publications rather than commercial contexts, expanding discourse around fashion and sustainability beyond market solutions.', 'published'),

-- Educational / Research-Led entries
('Academic Upcycling Research', 'academic-upcycling-research', 'Academic research brings rigor to upcycling practice: measuring environmental impacts, developing new techniques, and documenting traditional methods. University programs in sustainable fashion produce graduates who bridge making and scholarship.

Research addresses practical questions: Which techniques achieve greatest material efficiency? How do consumers perceive upcycled products? What barriers prevent commercial scaling?

Academic work also provides historical context, connecting contemporary sustainability concerns to centuries of making-do and mending.', 'published'),

('Material Science Innovation', 'material-science-innovation', 'Material science innovation develops new processes for textile recycling and upcycling. Chemical recycling methods, fiber identification technologies, and bio-based alternatives emerge from laboratory research.

The gap between laboratory success and commercial viability remains wideâ€”promising technologies often stall at scaling. Close collaboration between researchers and industry practitioners helps bridge this gap.

Current frontiers include enzymatic fiber separation, bio-fabricated materials, and closed-loop chemical recycling at commercially viable costs.', 'published')
ON CONFLICT (slug) DO NOTHING;

-- Make user_id nullable for mock/admin-created brands
ALTER TABLE brands ALTER COLUMN user_id DROP NOT NULL;
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
SELECT id, 'bio', 'Revival Denim Co. specializes in giving worn denim a second life. Every pair of jeans tells a storyâ€”we believe that story shouldn''t end in a landfill. Our master craftspeople carefully deconstruct vintage and donated denim, preserving unique fades and wear patterns that become signature elements in new designs.', 1
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
SELECT id, 'bio', 'Heritage Threads draws on generations of textile knowledge. Working with vintage fabricsâ€”some dating back decadesâ€”we employ traditional hand-finishing techniques alongside modern construction methods. Each garment carries forward the stories embedded in these treasured materials.', 1
FROM brands WHERE name = 'Heritage Threads'
UNION ALL
SELECT id, 'blurb', 'Small-batch craftsmanship turning rescued materials into refined everyday essentials.', 0
FROM brands WHERE name = 'Artisan Upcycle'
UNION ALL
SELECT id, 'bio', 'Artisan Upcycle is a collective of skilled makers united by a commitment to material stewardship. From our workshops, we produce limited editions of thoughtfully designed piecesâ€”bags, accessories, and garmentsâ€”each made from carefully sourced secondhand and surplus materials.', 1
FROM brands WHERE name = 'Artisan Upcycle'
UNION ALL
SELECT id, 'blurb', 'Luxury-grade craftsmanship applied to the finest reclaimed and vintage materials.', 0
FROM brands WHERE name = 'Luxe Remake'
UNION ALL
SELECT id, 'bio', 'Luxe Remake proves that sustainability and luxury are not mutually exclusive. Sourcing from the finest vintage pieces and end-of-run luxury fabrics, our atelier applies couture techniques to create statement pieces worthy of the materials'' original pedigreeâ€”while giving them new purpose.', 1
FROM brands WHERE name = 'Luxe Remake';
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
('Repair CafÃ© Network', 'featured', 'published', 'join@repaircafe.network', 'https://repaircafe.network', true, '7fa5c0d8-d810-4733-ab6a-2c5facaedea4'::uuid, NULL),
('Mend Together', 'standard', 'published', 'hello@mendtogether.org', 'https://mendtogether.org', false, '7fa5c0d8-d810-4733-ab6a-2c5facaedea4'::uuid, NULL),

-- Natural Fiber brands
('Fiber Reclaim', 'featured', 'published', 'info@fiberreclaim.co', 'https://fiberreclaim.co', true, 'b7f90de6-688c-49ac-b212-6c46cfea7206'::uuid, NULL),

-- Recycled Synthetic brands
('Ocean Yarn Collective', 'featured', 'published', 'hello@oceanyarn.co', 'https://oceanyarn.co', true, '5f414230-27e8-444f-b6a0-bbb584a5436a'::uuid, NULL),

-- Luxury Upcycling brands
('Couture Reclaimed', 'featured', 'published', 'atelier@couturereclaimed.com', 'https://couturereclaimed.com', true, '207b8830-a9bc-4b09-906b-717b378964d4'::uuid, NULL),
('Luxury Second Life', 'featured', 'published', 'info@luxurysecondlife.co', 'https://luxurysecondlife.co', true, '207b8830-a9bc-4b09-906b-717b378964d4'::uuid, NULL);
-- Add entry-category associations
INSERT INTO entry_categories (entry_id, category_id)
SELECT de.id, '3b944b70-49dd-45cf-9543-39332f176ed7'::uuid FROM dictionary_entries de WHERE de.slug IN ('zero-waste-pattern-cutting', 'marker-optimization-techniques', 'jigsaw-pattern-systems')
UNION ALL
SELECT de.id, '053b1215-f840-4e8e-8b9f-00f759afba48'::uuid FROM dictionary_entries de WHERE de.slug IN ('garment-to-garment-reconstruction', 'deconstructive-tailoring', 'silhouette-transformation-methods')
UNION ALL
SELECT de.id, 'baa5cb93-bb6f-42d0-ba5a-f2420e432e71'::uuid FROM dictionary_entries de WHERE de.slug IN ('post-consumer-textile-recycling', 'pre-consumer-waste-streams', 'industrial-offcut-utilization')
UNION ALL
SELECT de.id, '8af67843-a125-46d0-9a3d-f1014f99b3da'::uuid FROM dictionary_entries de WHERE de.slug IN ('denim-deconstruction-practices', 'indigo-preservation-techniques', 'jean-jacket-hybridization')
UNION ALL
SELECT de.id, 'df9380af-42f8-4e0f-bbcb-a57cae5e8f5b'::uuid FROM dictionary_entries de WHERE de.slug IN ('deadstock-fabric-sourcing', 'end-of-roll-design-strategies', 'vintage-fabric-restoration')
UNION ALL
SELECT de.id, 'ee76c165-0989-46ae-8436-2215bed0250c'::uuid FROM dictionary_entries de WHERE de.slug IN ('visible-mending-philosophy', 'sashiko-boro-techniques', 'darning-as-design-practice')
UNION ALL
SELECT de.id, '8a6e3906-a876-42fe-9a32-a52a06b4923b'::uuid FROM dictionary_entries de WHERE de.slug IN ('thrift-flip-methodology', 'size-adaptation-techniques')
UNION ALL
SELECT de.id, '8fa6a98d-71da-4506-a938-ccadb24371d5'::uuid FROM dictionary_entries de WHERE de.slug IN ('contemporary-patchwork-construction', 'improvisational-quilting-methods')
UNION ALL
SELECT de.id, '5e42e609-53f4-4b4f-b89e-fc89e49a4dcf'::uuid FROM dictionary_entries de WHERE de.slug IN ('natural-dye-applications', 'overdyeing-color-revival')
UNION ALL
SELECT de.id, 'e256882c-58f7-4126-888a-5d5747d3ceb1'::uuid FROM dictionary_entries de WHERE de.slug IN ('embroidered-repair-embellishment', 'beading-surface-adornment')
UNION ALL
SELECT de.id, 'fa49131a-d024-482d-890a-2225b793f18a'::uuid FROM dictionary_entries de WHERE de.slug IN ('closed-loop-production-models', 'take-back-program-design')
UNION ALL
SELECT de.id, '672fbc98-a8aa-43bb-a302-9cd38ce64126'::uuid FROM dictionary_entries de WHERE de.slug IN ('mixed-media-garment-construction', 'found-object-integration')
UNION ALL
SELECT de.id, '438b1a80-4e65-4fd7-9c5e-792a545b66c0'::uuid FROM dictionary_entries de WHERE de.slug IN ('leather-reconditioning-methods', 'leather-patchwork-applications')
UNION ALL
SELECT de.id, '7fa5c0d8-d810-4733-ab6a-2c5facaedea4'::uuid FROM dictionary_entries de WHERE de.slug IN ('repair-cafe-facilitation', 'skill-sharing-workshop-models')
UNION ALL
SELECT de.id, 'b7f90de6-688c-49ac-b212-6c46cfea7206'::uuid FROM dictionary_entries de WHERE de.slug IN ('wool-fiber-recovery', 'linen-hemp-restoration')
UNION ALL
SELECT de.id, '5f414230-27e8-444f-b6a0-bbb584a5436a'::uuid FROM dictionary_entries de WHERE de.slug IN ('polyester-recycling-processes', 'nylon-recovery-applications')
UNION ALL
SELECT de.id, '207b8830-a9bc-4b09-906b-717b378964d4'::uuid FROM dictionary_entries de WHERE de.slug IN ('haute-couture-deconstruction', 'luxury-material-reclamation')
UNION ALL
SELECT de.id, '674eac39-0e9f-426e-9fd0-5b8e0ef21c08'::uuid FROM dictionary_entries de WHERE de.slug IN ('traditional-textile-preservation', 'regional-craft-revival')
UNION ALL
SELECT de.id, '33d6481c-5974-4bad-9f66-32e50e5c767a'::uuid FROM dictionary_entries de WHERE de.slug IN ('speculative-material-futures', 'conceptual-deconstruction-projects')
UNION ALL
SELECT de.id, 'ec555b31-cc19-4a63-bd94-5d3ffddf6a0e'::uuid FROM dictionary_entries de WHERE de.slug IN ('academic-upcycling-research', 'material-science-innovation')
ON CONFLICT DO NOTHING;
-- Add brand content (blurbs) for new brands
INSERT INTO brand_content (brand_id, field_type, value, display_order)
SELECT id, 'blurb', 'Zero-waste pattern pioneers eliminating textile waste at the design stage.', 0 FROM brands WHERE name = 'Void Patterns Studio'
UNION ALL
SELECT id, 'blurb', 'Geometric precision meets sustainable fashion in our tessellated designs.', 0 FROM brands WHERE name = 'Geometry Atelier'
UNION ALL
SELECT id, 'blurb', 'Using 100% of every boltâ€”because waste is a design failure.', 0 FROM brands WHERE name = 'Full Cloth Collective'
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
SELECT id, 'blurb', 'Building repair communities one cafÃ© at a time.', 0 FROM brands WHERE name = 'Repair CafÃ© Network'
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
-- Add placeholder images for all brands without images
INSERT INTO brand_content (brand_id, field_type, value, display_order)
SELECT id, 'image', 'https://images.unsplash.com/photo-1558171813-01237782bf6c?w=800', 0 FROM brands WHERE name = 'Assemblage Studios'
UNION ALL
SELECT id, 'image', 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800', 0 FROM brands WHERE name = 'Blue Reimagined'
UNION ALL
SELECT id, 'image', 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800', 0 FROM brands WHERE name = 'Botanical Hues'
UNION ALL
SELECT id, 'image', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', 0 FROM brands WHERE name = 'Couture Reclaimed'
UNION ALL
SELECT id, 'image', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800', 0 FROM brands WHERE name = 'Embroidered Stories'
UNION ALL
SELECT id, 'image', 'https://images.unsplash.com/photo-1558171014-c5c1f0a8d10d?w=800', 0 FROM brands WHERE name = 'End of Roll Studio'
UNION ALL
SELECT id, 'image', 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800', 0 FROM brands WHERE name = 'Fade Forward'
UNION ALL
SELECT id, 'image', 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800', 0 FROM brands WHERE name = 'Fiber Reclaim'
UNION ALL
SELECT id, 'image', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800', 0 FROM brands WHERE name = 'Flip Studios'
UNION ALL
SELECT id, 'image', 'https://images.unsplash.com/photo-1558171015-cf3684c84fb3?w=800', 0 FROM brands WHERE name = 'Full Cloth Collective'
UNION ALL
SELECT id, 'image', 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800', 0 FROM brands WHERE name = 'Geometry Atelier'
UNION ALL
SELECT id, 'image', 'https://images.unsplash.com/photo-1558171014-e5aa9c5f46bb?w=800', 0 FROM brands WHERE name = 'Hybrid Makers'
UNION ALL
SELECT id, 'image', 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=800', 0 FROM brands WHERE name = 'Indigo Second Life'
UNION ALL
SELECT id, 'image', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800', 0 FROM brands WHERE name = 'Leather Revival Co'
UNION ALL
SELECT id, 'image', 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800', 0 FROM brands WHERE name = 'Loop Fashion Lab'
UNION ALL
SELECT id, 'image', 'https://images.unsplash.com/photo-1558618047-f4b511e2a0bd?w=800', 0 FROM brands WHERE name = 'Luxury Second Life'
UNION ALL
SELECT id, 'image', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800', 0 FROM brands WHERE name = 'Mend Together'
UNION ALL
SELECT id, 'image', 'https://images.unsplash.com/photo-1594938291221-87249aa2c249?w=800', 0 FROM brands WHERE name = 'Modern Quilt Studio'
UNION ALL
SELECT id, 'image', 'https://images.unsplash.com/photo-1457545195570-67f207084966?w=800', 0 FROM brands WHERE name = 'Natural Color Studio'
UNION ALL
SELECT id, 'image', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', 0 FROM brands WHERE name = 'Ocean Yarn Collective'
UNION ALL
SELECT id, 'image', 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800', 0 FROM brands WHERE name = 'Ornament Studio'
UNION ALL
SELECT id, 'image', 'https://images.unsplash.com/photo-1594938328870-9623159c8c99?w=800', 0 FROM brands WHERE name = 'Patch Collective'
UNION ALL
SELECT id, 'image', 'https://images.unsplash.com/photo-1558171014-f5f2f44c3d44?w=800', 0 FROM brands WHERE name = 'Reform Atelier'
UNION ALL
SELECT id, 'image', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800', 0 FROM brands WHERE name = 'Repair CafÃ© Network'
UNION ALL
SELECT id, 'image', 'https://images.unsplash.com/photo-1558171015-c7c26c07de3f?w=800', 0 FROM brands WHERE name = 'Salvage Textiles'
UNION ALL
SELECT id, 'image', 'https://images.unsplash.com/photo-1594938384624-9567b76dd29c?w=800', 0 FROM brands WHERE name = 'Sashiko Studio'
UNION ALL
SELECT id, 'image', 'https://images.unsplash.com/photo-1558171015-cf3684c84fb3?w=800', 0 FROM brands WHERE name = 'Scrap Studios'
UNION ALL
SELECT id, 'image', 'https://images.unsplash.com/photo-1467043198406-dc953a3defa0?w=800', 0 FROM brands WHERE name = 'Second Cut Studio'
UNION ALL
SELECT id, 'image', 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800', 0 FROM brands WHERE name = 'Stitch & Story'
UNION ALL
SELECT id, 'image', 'https://images.unsplash.com/photo-1558171014-e5aa9c5f46bb?w=800', 0 FROM brands WHERE name = 'Stockroom Revival'
UNION ALL
SELECT id, 'image', 'https://images.unsplash.com/photo-1467043198406-dc953a3defa0?w=800', 0 FROM brands WHERE name = 'The Remake Collective'
UNION ALL
SELECT id, 'image', 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800', 0 FROM brands WHERE name = 'Thrift Alchemy'
UNION ALL
SELECT id, 'image', 'https://images.unsplash.com/photo-1594938328870-9623159c8c99?w=800', 0 FROM brands WHERE name = 'Visible Repair Co'
UNION ALL
SELECT id, 'image', 'https://images.unsplash.com/photo-1558171015-c7c26c07de3f?w=800', 0 FROM brands WHERE name = 'Void Patterns Studio';
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
UNION ALL SELECT id, 'image', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800', 0 FROM brands WHERE name = 'Repair CafÃ© Network'
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
