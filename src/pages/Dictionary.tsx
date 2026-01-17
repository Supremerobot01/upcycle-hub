import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCategoriesGrouped } from '@/hooks/useCategories';
import { useDictionaryEntriesByCategory } from '@/hooks/useDictionaryEntries';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, ChevronRight } from 'lucide-react';
import DictionaryEntryCard from '@/components/dictionary/DictionaryEntryCard';
import logo from '@/assets/logo.png';

export default function Dictionary() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  
  const categoryId = searchParams.get('category');
  const { grouped, isLoading: categoriesLoading } = useCategoriesGrouped();
  const { data: entries, isLoading: entriesLoading } = useDictionaryEntriesByCategory(categoryId);

  const filteredEntries = entries?.filter(entry =>
    entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.body?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryClick = (catId: string | null) => {
    if (catId) {
      setSearchParams({ category: catId });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="cursor-pointer" onClick={() => navigate('/')}>
            <img src={logo} alt="Upcycling Dictionary" className="h-8" />
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/portal')}>
            Brand Portal
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="sticky top-24">
              <h2 className="font-semibold mb-4">Categories</h2>
              <ScrollArea className="h-[calc(100vh-200px)]">
                <nav className="space-y-4">
                  <Button
                    variant={!categoryId ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => handleCategoryClick(null)}
                  >
                    All Entries
                  </Button>
                  {categoriesLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-8 w-full" />
                    ))
                  ) : (
                    Object.entries(grouped || {}).map(([groupName, cats]) => (
                      <div key={groupName}>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2 px-2">
                          {groupName}
                        </h3>
                        {cats.map((cat) => (
                          <Button
                            key={cat.id}
                            variant={categoryId === cat.id ? 'secondary' : 'ghost'}
                            className="w-full justify-start"
                            onClick={() => handleCategoryClick(cat.id)}
                          >
                            {cat.name}
                          </Button>
                        ))}
                      </div>
                    ))
                  )}
                </nav>
              </ScrollArea>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search entries..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {entriesLoading ? (
              <div className="grid gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </div>
            ) : filteredEntries?.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>No entries found</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredEntries?.map((entry) => (
                  <DictionaryEntryCard key={entry.id} entry={entry} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
