import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCategoriesGrouped } from '@/hooks/useCategories';
import { useFeaturedBrands } from '@/hooks/useBrands';
import { useDisplaySession } from '@/hooks/useDisplaySession';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function DisplayHome() {
  const { grouped, categories } = useCategoriesGrouped();
  const { data: featuredBrands } = useFeaturedBrands();
  const { currentState } = useDisplaySession();
  const navigate = useNavigate();
  
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isIdle, setIsIdle] = useState(true);

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
    if (!isIdle) {
      const timeout = setTimeout(() => setIsIdle(true), 90000);
      return () => clearTimeout(timeout);
    }
  }, [isIdle, selectedCategoryIndex]);

  const handlePrevCategory = () => {
    setSelectedCategoryIndex(i => (i - 1 + allCategories.length) % allCategories.length);
    setIsIdle(false);
  };

  const handleNextCategory = () => {
    setSelectedCategoryIndex(i => (i + 1) % allCategories.length);
    setIsIdle(false);
  };

  const handleCategoryClick = () => {
    if (currentCategory) {
      navigate(`/display/categories/${currentCategory.id}`);
    }
  };

  if (isIdle && featuredBrands?.length) {
    return (
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
        <p className="text-muted-foreground mt-8">Touch or use remote to explore categories</p>
      </div>
    );
  }

  return (
    <div className="text-center max-w-4xl">
      <p className="text-muted-foreground mb-4 text-lg">Category</p>
      <button 
        onClick={handleCategoryClick}
        className="text-display mb-8 hover:text-primary transition-colors cursor-pointer bg-transparent border-none"
      >
        {currentCategory?.name || 'All Categories'}
      </button>
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
  );
}
