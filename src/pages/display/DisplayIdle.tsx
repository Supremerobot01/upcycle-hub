import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFeaturedBrands } from '@/hooks/useBrands';
import { Badge } from '@/components/ui/badge';
import { QRCodeSVG } from 'qrcode.react';
import { Recycle } from 'lucide-react';
import { getBrandImage } from '@/components/display/types';

export default function DisplayIdle() {
  const { data: featuredBrands } = useFeaturedBrands();
  const navigate = useNavigate();
  const [carouselIndex, setCarouselIndex] = useState(0);
  const remoteUrl = `${window.location.origin}/remote`;

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

  const currentBrand = featuredBrands?.[carouselIndex];
  const currentImage = currentBrand ? getBrandImage(currentBrand) : undefined;

  return (
    <>
      {/* Fullscreen overlay that escapes parent layout constraints */}
      <div 
        className="fixed inset-0 z-50 w-screen h-screen flex items-center justify-center cursor-pointer overflow-hidden" 
        onClick={handleInteraction}
        onKeyDown={handleInteraction}
        role="button"
        tabIndex={0}
      >
        {/* Background image with crossfade */}
        {currentImage && (
          <div 
            key={carouselIndex}
            className="absolute inset-0 animate-fade-in"
          >
            <img 
              src={currentImage} 
              alt="" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
          </div>
        )}
        
        {/* Fallback background when no image */}
        {!currentImage && (
          <div className="absolute inset-0 bg-background" />
        )}

        {/* Header */}
        <header className="fixed top-0 left-0 right-0 p-6 flex items-center gap-4 z-10">
          <Recycle className="w-10 h-10 text-primary" />
          <h1 className="text-3xl font-bold">Upcycling Dictionary</h1>
        </header>

        {/* Centered content */}
        <div className="relative z-10 text-center max-w-4xl px-8">
          {featuredBrands?.length ? (
            <>
              <Badge className="mb-6 bg-tier-featured text-background">Featured Brand</Badge>
              <h2 className="text-display mb-4 drop-shadow-lg">
                {currentBrand?.name}
              </h2>
              <div className="flex justify-center gap-2 mt-8">
                {featuredBrands.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === carouselIndex ? 'bg-primary' : 'bg-muted/50'
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

        {/* Footer with QR Code */}
        <footer className="fixed bottom-0 left-0 right-0 p-6 flex items-end justify-between z-10">
          <div className="text-sm text-muted-foreground">
            <p>Scan to control this display</p>
          </div>
          <div className="bg-card p-3 rounded-lg">
            <QRCodeSVG value={remoteUrl} size={100} />
          </div>
        </footer>
      </div>
    </>
  );
}
