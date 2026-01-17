import { Outlet, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import logo from '@/assets/logo.png';

export default function DictionaryLayout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/dictionary">
            <img src={logo} alt="Upcycling Dictionary" className="h-8" />
          </Link>
          <Link to="/portal/login">
            <Button variant="outline" size="sm">
              <LogIn className="w-4 h-4 mr-2" />
              Brand Portal
            </Button>
          </Link>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
