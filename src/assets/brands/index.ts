// Brand category images - ES6 imports for proper asset handling
import denimUpcycling from './denim-upcycling.jpg';
import patchworkQuilting from './patchwork-quilting.jpg';
import visibleMending from './visible-mending.jpg';
import leatherUpcycling from './leather-upcycling.jpg';
import zeroWasteDesign from './zero-waste-design.jpg';
import textileWaste from './textile-waste.jpg';
import naturalDye from './natural-dye.jpg';
import embroidery from './embroidery.jpg';
import thriftSecondhand from './thrift-secondhand.jpg';
import luxuryUpcycling from './luxury-upcycling.jpg';
import repairCafe from './repair-cafe.jpg';
import naturalFiber from './natural-fiber.jpg';
import deadstock from './deadstock.jpg';
import garmentRefashioning from './garment-refashioning.jpg';
import mixedMaterial from './mixed-material.jpg';
import circularFashion from './circular-fashion.jpg';
import recycledSynthetic from './recycled-synthetic.jpg';

// Unique brand-specific images (AI-generated to avoid duplicates)
import assemblageStudios from './assemblage-studios.jpg';
import coutureReclaimed from './couture-reclaimed.jpg';
import geometryAtelier from './geometry-atelier.jpg';
import fullClothCollective from './full-cloth-collective.jpg';

// Map category slugs to images
export const categoryImages: Record<string, string> = {
  'denim-upcycling': denimUpcycling,
  'patchwork-quilting': patchworkQuilting,
  'visible-mending': visibleMending,
  'repair-visible-mending': visibleMending,
  'leather-non-textile-upcycling': leatherUpcycling,
  'zero-waste-design': zeroWasteDesign,
  'textile-waste-upcycling': textileWaste,
  'dyeing-surface-treatment': naturalDye,
  'embellishment-handcraft': embroidery,
  'secondhand-transformation': thriftSecondhand,
  'luxury-couture-upcycling': luxuryUpcycling,
  'community-based-diy': repairCafe,
  'natural-fiber-reuse': naturalFiber,
  'deadstock-utilization': deadstock,
  'garment-refashioning': garmentRefashioning,
  'bricolage-mixed-material': mixedMaterial,
  'circular-fashion-systems': circularFashion,
  'recycled-synthetic-materials': recycledSynthetic,
};

// Map brand names to UNIQUE images - avoiding duplicates for visual variety
export const brandImages: Record<string, string> = {
  // Spread brands across different images to avoid duplicates appearing next to each other
  'Revival Denim Co': denimUpcycling,
  'Blue Reimagined': zeroWasteDesign,
  'Indigo Second Life': deadstock,
  'Fade Forward': garmentRefashioning,
  
  'Patchwork Studio': patchworkQuilting,
  'Patch Collective': embroidery,
  'Modern Quilt Studio': textileWaste,
  
  'Stitch & Story': visibleMending,
  'Visible Repair Co': naturalDye,
  'Sashiko Studio': circularFashion,
  
  'Leather Revival Co': leatherUpcycling,
  
  'Void Patterns Studio': zeroWasteDesign,
  'Geometry Atelier': geometryAtelier,
  'Full Cloth Collective': fullClothCollective,
  
  'Salvage Textiles': textileWaste,
  'Scrap Studios': patchworkQuilting,
  'EcoThread Collective': denimUpcycling,
  
  'Natural Color Studio': naturalDye,
  'Botanical Hues': thriftSecondhand,
  
  'Embroidered Stories': embroidery,
  'Ornament Studio': visibleMending,
  
  'Thrift Alchemy': thriftSecondhand,
  'Flip Studios': garmentRefashioning,
  
  'Luxe Remake': circularFashion,
  'Couture Reclaimed': coutureReclaimed,
  'Luxury Second Life': luxuryUpcycling,
  
  'Repair Café Network': repairCafe,
  'Mend Together': visibleMending,
  
  'Fiber Reclaim': naturalFiber,
  'Heritage Threads': recycledSynthetic,
  
  'Stockroom Revival': deadstock,
  'End of Roll Studio': textileWaste,
  
  'Second Cut Studio': garmentRefashioning,
  'Reform Atelier': leatherUpcycling,
  'The Remake Collective': patchworkQuilting,
  'Reimagine Apparel': naturalDye,
  'Second Life Textiles': embroidery,
  'Artisan Upcycle': zeroWasteDesign,
  
  'Hybrid Makers': mixedMaterial,
  'Assemblage Studios': assemblageStudios,
  
  'Loop Fashion Lab': circularFashion,
  
  'Ocean Yarn Collective': recycledSynthetic,
};

export {
  denimUpcycling,
  patchworkQuilting,
  visibleMending,
  leatherUpcycling,
  zeroWasteDesign,
  textileWaste,
  naturalDye,
  embroidery,
  thriftSecondhand,
  luxuryUpcycling,
  repairCafe,
  naturalFiber,
  deadstock,
  garmentRefashioning,
  mixedMaterial,
  circularFashion,
  recycledSynthetic,
};
