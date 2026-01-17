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

// Map brand names to their primary category image
export const brandImages: Record<string, string> = {
  // Denim brands
  'Revival Denim Co': denimUpcycling,
  'Blue Reimagined': denimUpcycling,
  'Indigo Second Life': denimUpcycling,
  'Fade Forward': denimUpcycling,
  
  // Patchwork brands
  'Patchwork Studio': patchworkQuilting,
  'Patch Collective': patchworkQuilting,
  'Modern Quilt Studio': patchworkQuilting,
  
  // Repair/Mending brands
  'Stitch & Story': visibleMending,
  'Visible Repair Co': visibleMending,
  'Sashiko Studio': visibleMending,
  
  // Leather brands
  'Leather Revival Co': leatherUpcycling,
  
  // Zero-waste brands
  'Void Patterns Studio': zeroWasteDesign,
  'Geometry Atelier': zeroWasteDesign,
  'Full Cloth Collective': zeroWasteDesign,
  
  // Textile waste brands
  'Salvage Textiles': textileWaste,
  'Scrap Studios': textileWaste,
  'EcoThread Collective': textileWaste,
  
  // Natural dye brands
  'Natural Color Studio': naturalDye,
  'Botanical Hues': naturalDye,
  
  // Embroidery brands
  'Embroidered Stories': embroidery,
  'Ornament Studio': embroidery,
  
  // Thrift/Secondhand brands
  'Thrift Alchemy': thriftSecondhand,
  'Flip Studios': thriftSecondhand,
  
  // Luxury brands
  'Luxe Remake': luxuryUpcycling,
  'Couture Reclaimed': luxuryUpcycling,
  'Luxury Second Life': luxuryUpcycling,
  
  // Community brands
  'Repair Café Network': repairCafe,
  'Mend Together': repairCafe,
  
  // Natural fiber brands
  'Fiber Reclaim': naturalFiber,
  'Heritage Threads': naturalFiber,
  
  // Deadstock brands
  'Stockroom Revival': deadstock,
  'End of Roll Studio': deadstock,
  
  // Garment refashioning brands
  'Second Cut Studio': garmentRefashioning,
  'Reform Atelier': garmentRefashioning,
  'The Remake Collective': garmentRefashioning,
  'Reimagine Apparel': garmentRefashioning,
  'Second Life Textiles': garmentRefashioning,
  'Artisan Upcycle': garmentRefashioning,
  
  // Mixed material brands
  'Hybrid Makers': mixedMaterial,
  'Assemblage Studios': mixedMaterial,
  
  // Circular fashion brands
  'Loop Fashion Lab': circularFashion,
  
  // Recycled synthetic brands
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
