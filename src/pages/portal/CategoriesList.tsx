import { useCategoriesGrouped } from '@/hooks/useCategories';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export default function CategoriesList() {
  const { grouped, isLoading } = useCategoriesGrouped();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Categories</h2>
        <p className="text-muted-foreground">Browse available upcycling categories</p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped || {}).map(([groupName, categories]) => (
            <Card key={groupName}>
              <CardHeader>
                <CardTitle className="text-lg">{groupName}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <Badge 
                      key={cat.id} 
                      variant={cat.active ? 'default' : 'secondary'}
                      className="text-sm"
                    >
                      {cat.name}
                      {!cat.active && ' (inactive)'}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
