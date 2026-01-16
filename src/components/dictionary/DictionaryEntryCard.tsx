import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import type { DictionaryEntry } from '@/types/database';

interface DictionaryEntryCardProps {
  entry: DictionaryEntry;
}

export default function DictionaryEntryCard({ entry }: DictionaryEntryCardProps) {
  const navigate = useNavigate();

  const excerpt = entry.body 
    ? entry.body.slice(0, 150) + (entry.body.length > 150 ? '...' : '')
    : '';

  return (
    <Card 
      className="cursor-pointer hover:bg-muted/50 transition-colors"
      onClick={() => navigate(`/dictionary/${entry.slug}`)}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          {entry.title}
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </CardTitle>
      </CardHeader>
      {excerpt && (
        <CardContent>
          <p className="text-sm text-muted-foreground">{excerpt}</p>
        </CardContent>
      )}
    </Card>
  );
}
