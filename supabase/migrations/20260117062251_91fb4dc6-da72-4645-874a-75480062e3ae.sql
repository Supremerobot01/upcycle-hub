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