import { Link } from 'react-router-dom';
import { useCategoriesGrouped, useCategories } from '@/hooks/useCategories';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Pencil } from 'lucide-react';

export default function CategoriesList() {
  const { grouped, isLoading } = useCategoriesGrouped(false);
  const { isAdmin } = useAuth();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Categories</h2>
          <p className="text-muted-foreground">Browse available upcycling categories</p>
        </div>
        {isAdmin && (
          <Link to="/portal/categories/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </Link>
        )}
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
                    <div key={cat.id} className="flex items-center gap-1">
                      <Badge 
                        variant={cat.active ? 'default' : 'secondary'}
                        className="text-sm"
                      >
                        {cat.name}
                        {!cat.active && ' (inactive)'}
                      </Badge>
                      {isAdmin && (
                        <Link to={`/portal/categories/edit/${cat.id}`}>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Pencil className="h-3 w-3" />
                          </Button>
                        </Link>
                      )}
                    </div>
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
