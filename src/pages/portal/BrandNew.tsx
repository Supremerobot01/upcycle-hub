import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import BrandForm from '@/components/portal/BrandForm';

export default function BrandNew() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create Your Brand Listing</CardTitle>
          <CardDescription>
            Get started by setting up your upcycling brand profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BrandForm />
        </CardContent>
      </Card>
    </div>
  );
}
