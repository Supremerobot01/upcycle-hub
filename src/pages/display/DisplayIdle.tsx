import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFeaturedBrands } from '@/hooks/useBrands';
import { Badge } from '@/components/ui/badge';
import { QRCodeSVG } from 'qrcode.react';
import { Recycle } from 'lucide-react';
import { getBrandImage } from '@/components/display/types';

const CAROUSEL_INTERVAL = 8000; // Longer to appreciate Ken Burns
const CROSSFADE_DURATION = 1500;

export default function DisplayIdle() {
  const { data: featuredBrands } = useFeaturedBrands();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [fadeInReady, setFadeInReady] = useState(false);
  const remoteUrl = `${window.location.origin}/remote`;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const frameRef = useRef<number | null>(null);

  // Auto-rotate with proper crossfade
  useEffect(() => {
    if (!featuredBrands?.length || featuredBrands.length <= 1) return;

    const startTransition = () => {
      const next = (currentIndex + 1) % featuredBrands.length;
      setNextIndex(next);
      setIsTransitioning(true);
      setFadeInReady(false);

      // Wait for next frame to ensure the element is mounted at opacity 0
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = requestAnimationFrame(() => {
          setFadeInReady(true);
        });
      });

      // Complete transition after fade duration
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex(next);
        setNextIndex(null);
        setIsTransitioning(false);
        setFadeInReady(false);
      }, CROSSFADE_DURATION);
    };

    const interval = setInterval(startTransition, CAROUSEL_INTERVAL);
    return () => {
      clearInterval(interval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [featuredBrands?.length, currentIndex]);

  const handleInteraction = () => {
    navigate('/display');
  };

  const currentBrand = featuredBrands?.[currentIndex];
  const nextBrand = nextIndex !== null ? featuredBrands?.[nextIndex] : null;
  const currentImage = currentBrand ? getBrandImage(currentBrand) : undefined;
  const nextImage = nextBrand ? getBrandImage(nextBrand) : undefined;
  const displayBrand = isTransitioning && nextBrand ? nextBrand : currentBrand;

  return (
    <div 
      className="fixed inset-0 z-50 w-screen h-screen cursor-pointer overflow-hidden bg-black" 
      onClick={handleInteraction}
      onKeyDown={handleInteraction}
      role="button"
      tabIndex={0}
    >
      {/* Current background image with Ken Burns */}
      {currentImage && (
        <div 
          className="absolute inset-0 transition-opacity ease-in-out"
          style={{ 
            transitionDuration: `${CROSSFADE_DURATION}ms`,
            opacity: isTransitioning ? 0 : 1 
          }}
        >
          <img 
            key={`current-${currentIndex}`}
            src={currentImage} 
            alt="" 
            className="w-full h-full object-cover animate-ken-burns"
          />
        </div>
      )}
      
      {/* Next background image (fades in from 0) */}
      {nextImage && isTransitioning && (
        <div 
          className="absolute inset-0 transition-opacity ease-in-out"
          style={{ 
            transitionDuration: `${CROSSFADE_DURATION}ms`,
            opacity: fadeInReady ? 1 : 0 
          }}
        >
          <img 
            key={`next-${nextIndex}`}
            src={nextImage} 
            alt="" 
            className="w-full h-full object-cover animate-ken-burns"
          />
        </div>
      )}

      {/* Cinematic vignette overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Strong radial vignette */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 100%)'
          }}
        />
        {/* Bottom gradient for text legibility */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 30%, transparent 60%)'
          }}
        />
        {/* Top gradient for header */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 20%)'
          }}
        />
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-8 flex items-center gap-4 z-10">
        <Recycle className="w-12 h-12 text-primary drop-shadow-lg" />
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">Upcycling Dictionary</h1>
      </header>

      {/* Centered content - positioned lower for cinematic feel */}
      <div className="absolute inset-0 flex items-end justify-center pb-32 z-10">
        <div 
          className="text-center max-w-5xl px-8 transition-opacity duration-500"
          style={{ opacity: isTransitioning ? 0.7 : 1 }}
        >
          {featuredBrands?.length ? (
            <>
              <Badge className="mb-6 bg-tier-featured text-background text-lg px-4 py-1.5 shadow-xl">
                Featured Brand
              </Badge>
              <h2 
                className="text-7xl md:text-8xl font-bold text-white mb-6 tracking-tight"
                style={{ textShadow: '0 4px 30px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.9)' }}
              >
                {displayBrand?.name}
              </h2>
              <div className="flex justify-center gap-3 mt-10">
                {featuredBrands.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === (isTransitioning && nextIndex !== null ? nextIndex : currentIndex) 
                        ? 'bg-primary w-8' 
                        : 'bg-white/30 w-3'
                    }`}
                  />
                ))}
              </div>
            </>
          ) : (
            <h2 
              className="text-7xl md:text-8xl font-bold text-white tracking-tight"
              style={{ textShadow: '0 4px 30px rgba(0,0,0,0.8)' }}
            >
              Upcycling Dictionary
            </h2>
          )}
          <p className="text-white/60 mt-10 text-xl tracking-wide uppercase">Touch anywhere to explore</p>
        </div>
      </div>

      {/* Footer with QR Code */}
      <footer className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between z-10">
        <div className="text-white/50 text-sm">
          <p>Scan to control this display</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-2xl">
          <QRCodeSVG value={remoteUrl} size={100} bgColor="white" fgColor="black" />
        </div>
      </footer>
    </div>
  );
}
