import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useDictionaryEntries } from '@/hooks/useDictionaryEntries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Search, Pencil } from 'lucide-react';

export default function DictionaryList() {
  const { isAdmin } = useAuth();
  const { data: entries, isLoading } = useDictionaryEntries(false);
  const [search, setSearch] = useState('');

  const filteredEntries = entries?.filter(entry =>
    entry.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Dictionary Entries</h2>
          <p className="text-muted-foreground">Browse and manage dictionary entries</p>
        </div>
        {isAdmin && (
          <Link to="/portal/dictionary/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Entry
            </Button>
          </Link>
        )}
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search entries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      ) : filteredEntries?.length ? (
        <div className="space-y-4">
          {filteredEntries.map((entry) => (
            <Card key={entry.id}>
              <CardHeader className="py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{entry.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={entry.status === 'published' ? 'default' : 'secondary'}>
                        {entry.status}
                      </Badge>
                    </div>
                  </div>
                  {isAdmin && (
                    <Link to={`/portal/dictionary/edit/${entry.id}`}>
                      <Button variant="ghost" size="sm">
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </CardHeader>
              {entry.body && (
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-2">{entry.body}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No entries found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
