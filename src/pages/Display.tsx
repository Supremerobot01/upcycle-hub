import { useState, useEffect } from 'react';
import { useCategoriesGrouped } from '@/hooks/useCategories';
import { useFeaturedBrands } from '@/hooks/useBrands';
import { useDisplaySession } from '@/hooks/useDisplaySession';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QRCodeSVG } from 'qrcode.react';
import { Recycle, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Display() {
  const { grouped, categories } = useCategoriesGrouped();
  const { data: featuredBrands } = useFeaturedBrands();
  const { currentState, isControlled } = useDisplaySession();
  
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isIdle, setIsIdle] = useState(true);

  const remoteUrl = `${window.location.origin}/remote`;
  const allCategories = categories || [];
  const currentCategory = allCategories[selectedCategoryIndex];

  // Auto-rotate carousel when idle
  useEffect(() => {
    if (!isIdle || !featuredBrands?.length) return;
    const interval = setInterval(() => {
      setCarouselIndex(i => (i + 1) % featuredBrands.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isIdle, featuredBrands?.length]);

  // Handle remote control state
  useEffect(() => {
    if (currentState?.categoryIndex !== undefined) {
      setSelectedCategoryIndex(currentState.categoryIndex);
      setIsIdle(false);
    }
  }, [currentState]);

  // Reset to idle after inactivity
  useEffect(() => {
    if (isControlled) {
      setIsIdle(false);
      const timeout = setTimeout(() => setIsIdle(true), 90000);
      return () => clearTimeout(timeout);
    }
  }, [isControlled, currentState]);

  const handlePrevCategory = () => {
    setSelectedCategoryIndex(i => (i - 1 + allCategories.length) % allCategories.length);
    setIsIdle(false);
  };

  const handleNextCategory = () => {
    setSelectedCategoryIndex(i => (i + 1) % allCategories.length);
    setIsIdle(false);
  };

  return (
    <div className="min-h-screen bg-background display-mode text-foreground overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <Recycle className="w-10 h-10 text-primary" />
          <h1 className="text-3xl font-bold">Upcycling Dictionary</h1>
        </div>
        <div className="flex items-center gap-4">
          {isControlled && (
            <Badge variant="secondary" className="text-sm">
              Remote Connected
            </Badge>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="h-screen flex items-center justify-center pt-20 pb-32 px-8">
        {isIdle && featuredBrands?.length ? (
          // Featured brands carousel
          <div className="text-center max-w-4xl">
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
          </div>
        ) : (
          // Category view
          <div className="text-center max-w-4xl">
            <p className="text-muted-foreground mb-4 text-lg">Category</p>
            <h2 className="text-display mb-8">
              {currentCategory?.name || 'All Categories'}
            </h2>
            {currentCategory?.description && (
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {currentCategory.description}
              </p>
            )}
            
            {/* Navigation arrows */}
            <div className="flex justify-center gap-8 mt-12">
              <Button
                variant="outline"
                size="lg"
                className="w-16 h-16"
                onClick={handlePrevCategory}
              >
                <ChevronLeft className="w-8 h-8" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-16 h-16"
                onClick={handleNextCategory}
              >
                <ChevronRight className="w-8 h-8" />
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Footer with QR Code */}
      <footer className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
        <div className="text-sm text-muted-foreground">
          <p>Scan to control this display</p>
        </div>
        <div className="bg-card p-3 rounded-lg">
          <QRCodeSVG value={remoteUrl} size={100} />
        </div>
      </footer>
    </div>
  );
}
