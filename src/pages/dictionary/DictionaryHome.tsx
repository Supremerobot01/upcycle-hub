import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCategoriesGrouped } from '@/hooks/useCategories';
import { useDictionaryEntriesByCategory } from '@/hooks/useDictionaryEntries';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';
import DictionaryEntryCard from '@/components/dictionary/DictionaryEntryCard';

export default function DictionaryHome() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategoryId = searchParams.get('category');
  const { grouped, isLoading: categoriesLoading } = useCategoriesGrouped();
  const { data: entries, isLoading: entriesLoading } = useDictionaryEntriesByCategory(selectedCategoryId);
  const [search, setSearch] = useState('');

  const handleCategoryClick = (categoryId: string | null) => {
    if (categoryId) {
      setSearchParams({ category: categoryId });
    } else {
      setSearchParams({});
    }
  };

  const filteredEntries = entries?.filter(entry =>
    entry.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px]">
                <div className="p-4 space-y-1">
                  <Button
                    variant={!selectedCategoryId ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => handleCategoryClick(null)}
                  >
                    All Entries
                  </Button>
                  {categoriesLoading ? (
                    <Skeleton className="h-32 w-full" />
                  ) : (
                    Object.entries(grouped || {}).map(([groupName, cats]) => (
                      <div key={groupName} className="pt-2">
                        <p className="text-xs font-medium text-muted-foreground px-2 mb-1">{groupName}</p>
                        {cats.map((cat) => (
                          <Button
                            key={cat.id}
                            variant={selectedCategoryId === cat.id ? 'secondary' : 'ghost'}
                            className="w-full justify-start text-sm"
                            onClick={() => handleCategoryClick(cat.id)}
                          >
                            {cat.name}
                          </Button>
                        ))}
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </aside>

        {/* Main content */}
        <main className="lg:col-span-3">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search entries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {entriesLoading ? (
            <div className="grid md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32" />)}
            </div>
          ) : filteredEntries?.length ? (
            <div className="grid md:grid-cols-2 gap-4">
              {filteredEntries.map((entry) => (
                <Link key={entry.id} to={`/dictionary/entry/${entry.slug}`}>
                  <DictionaryEntryCard entry={entry} />
                </Link>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No entries found</p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
