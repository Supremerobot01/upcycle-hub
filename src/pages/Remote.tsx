import { useState } from 'react';
import { useCategoriesGrouped } from '@/hooks/useCategories';
import { useRemoteController } from '@/hooks/useDisplaySession';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Wifi, WifiOff, ChevronUp, ChevronDown } from 'lucide-react';
import logo from '@/assets/logo.png';

export default function Remote() {
  const { grouped, categories } = useCategoriesGrouped();
  const { isConnected, sendControl } = useRemoteController();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const allCategories = categories || [];

  const handleCategorySelect = (index: number) => {
    setSelectedIndex(index);
    sendControl({ categoryIndex: index });
  };

  const handlePrev = () => {
    const newIndex = (selectedIndex - 1 + allCategories.length) % allCategories.length;
    handleCategorySelect(newIndex);
  };

  const handleNext = () => {
    const newIndex = (selectedIndex + 1) % allCategories.length;
    handleCategorySelect(newIndex);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center justify-between">
          <img src={logo} alt="Upcycling Dictionary" className="h-8" />
          <Badge variant={isConnected ? 'default' : 'secondary'} className="gap-1">
            {isConnected ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            {isConnected ? 'Connected' : 'Connecting...'}
          </Badge>
        </div>
      </header>

      <main className="p-4">
        {/* Quick navigation */}
        <Card className="mb-4">
          <CardContent className="pt-4">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1 h-16"
                onClick={handlePrev}
                disabled={!isConnected}
              >
                <ChevronUp className="w-6 h-6" />
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 h-16"
                onClick={handleNext}
                disabled={!isConnected}
              >
                <ChevronDown className="w-6 h-6" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Current selection */}
        <Card className="mb-4 bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Currently Selected</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold">
              {allCategories[selectedIndex]?.name || 'Loading...'}
            </p>
          </CardContent>
        </Card>

        {/* Category list */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">All Categories</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px]">
              <div className="p-4 space-y-2">
                {Object.entries(grouped || {}).map(([groupName, cats]) => (
                  <div key={groupName}>
                    <p className="text-xs font-medium text-muted-foreground mb-2 px-2">
                      {groupName}
                    </p>
                    {cats.map((cat) => {
                      const index = allCategories.findIndex(c => c.id === cat.id);
                      return (
                        <Button
                          key={cat.id}
                          variant={selectedIndex === index ? 'default' : 'ghost'}
                          className="w-full justify-start mb-1"
                          onClick={() => handleCategorySelect(index)}
                          disabled={!isConnected}
                        >
                          {cat.name}
                        </Button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
