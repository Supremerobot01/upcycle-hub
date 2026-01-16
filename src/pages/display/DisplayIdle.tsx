import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFeaturedBrands } from '@/hooks/useBrands';
import { Badge } from '@/components/ui/badge';

export default function DisplayIdle() {
  const { data: featuredBrands } = useFeaturedBrands();
  const navigate = useNavigate();
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Auto-rotate carousel
  useEffect(() => {
    if (!featuredBrands?.length) return;
    const interval = setInterval(() => {
      setCarouselIndex(i => (i + 1) % featuredBrands.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredBrands?.length]);

  // Navigate to home on any interaction
  const handleInteraction = () => {
    navigate('/display');
  };

  return (
    <div 
      className="text-center max-w-4xl cursor-pointer" 
      onClick={handleInteraction}
      onKeyDown={handleInteraction}
      role="button"
      tabIndex={0}
    >
      {featuredBrands?.length ? (
        <>
          <Badge className="mb-6 bg-tier-featured text-background">Featured Brand</Badge>
          <h2 className="text-display mb-4">
            {featuredBrands[carouselIndex]?.name}
          </h2>
          <div className="flex justify-center gap-2 mt-8">
            {featuredBrands.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === carouselIndex ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </>
      ) : (
        <h2 className="text-display">Upcycling Dictionary</h2>
      )}
      <p className="text-muted-foreground mt-8">Touch to explore</p>
    </div>
  );
}
