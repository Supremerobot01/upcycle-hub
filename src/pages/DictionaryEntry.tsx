import { useParams, useNavigate } from 'react-router-dom';
import { useDictionaryEntry } from '@/hooks/useDictionaryEntries';
import { useEntryBrands } from '@/hooks/useEntryBrands';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Recycle, ArrowLeft, ExternalLink } from 'lucide-react';

export default function DictionaryEntry() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: entry, isLoading: entryLoading } = useDictionaryEntry(slug);
  const { data: brands, isLoading: brandsLoading } = useEntryBrands(entry?.id);

  if (entryLoading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-4">
            <Skeleton className="h-8 w-48" />
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <Skeleton className="h-12 w-96 mb-4" />
          <Skeleton className="h-64 w-full" />
        </main>
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Entry not found</h1>
          <Button onClick={() => navigate('/dictionary')}>Back to Dictionary</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/dictionary')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <Recycle className="w-6 h-6 text-primary" />
            <span className="text-muted-foreground">Upcycling Dictionary</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <article className="max-w-3xl mx-auto">
          <h1 className="text-headline mb-6">{entry.title}</h1>
          
          {entry.body && (
            <div className="prose prose-green max-w-none mb-8">
              <p className="text-lg leading-relaxed whitespace-pre-wrap">{entry.body}</p>
            </div>
          )}

          {/* Related Brands */}
          {brands && brands.length > 0 && (
            <section className="mt-12">
              <h2 className="text-xl font-semibold mb-4">Related Brands</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {brands.map((brand) => (
                  <Card key={brand.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        {brand.name}
                        <Badge 
                          variant="outline"
                          className={
                            brand.tier === 'featured' 
                              ? 'border-tier-featured text-tier-featured' 
                              : brand.tier === 'standard' 
                              ? 'border-tier-standard text-tier-standard' 
                              : 'border-tier-basic text-tier-basic'
                          }
                        >
                          {brand.tier}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {brand.blurb && (
                        <p className="text-sm text-muted-foreground mb-3">{brand.blurb}</p>
                      )}
                      {brand.website_url && (
                        <a 
                          href={brand.website_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                        >
                          Visit website
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
    </div>
  );
}
