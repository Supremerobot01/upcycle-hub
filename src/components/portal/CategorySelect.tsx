import { useCategoriesGrouped } from '@/hooks/useCategories';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Control } from 'react-hook-form';

interface CategorySelectProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}

export default function CategorySelect({ 
  control, 
  name, 
  label, 
  placeholder = 'Select category',
  required = false 
}: CategorySelectProps) {
  const { grouped, isLoading } = useCategoriesGrouped();

  const groupOrder = [
    'Core Upcycling Practices',
    'Material-Based Approaches', 
    'Design & Craft Techniques',
    'Context & Values',
    'Other'
  ];

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}{required && ' *'}</FormLabel>
          <Select onValueChange={field.onChange} value={field.value || ''}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={isLoading ? 'Loading...' : placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {!required && (
                <SelectItem value="">None</SelectItem>
              )}
              {grouped && groupOrder.map((groupName) => {
                const categories = grouped[groupName];
                if (!categories?.length) return null;
                
                return (
                  <SelectGroup key={groupName}>
                    <SelectLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      {groupName}
                    </SelectLabel>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                );
              })}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
