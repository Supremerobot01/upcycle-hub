import { useEffect } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  LogOut, 
  ExternalLink, 
  LayoutDashboard, 
  Store, 
  BookOpen, 
  FolderTree, 
  Settings 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import logo from '@/assets/logo.png';

const navItems = [
  { path: '/portal/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/portal/brands', label: 'My Brand', icon: Store },
  { path: '/portal/dictionary', label: 'Dictionary', icon: BookOpen },
  { path: '/portal/categories', label: 'Categories', icon: FolderTree },
];

const adminItems = [
  { path: '/portal/admin', label: 'Admin', icon: Settings },
];

export default function PortalLayout() {
  const { user, loading: authLoading, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/portal/login');
    }
  }, [user, authLoading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Skeleton className="w-32 h-32 rounded-full" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/portal/dashboard">
              <img src={logo} alt="Upcycling Dictionary" className="h-8" />
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path}>
                  <Button 
                    variant={location.pathname.startsWith(item.path) ? 'secondary' : 'ghost'} 
                    size="sm"
                    className={cn(
                      "gap-2",
                      location.pathname.startsWith(item.path) && "bg-secondary"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              ))}
              {isAdmin && adminItems.map((item) => (
                <Link key={item.path} to={item.path}>
                  <Button 
                    variant={location.pathname.startsWith(item.path) ? 'secondary' : 'ghost'} 
                    size="sm"
                    className={cn(
                      "gap-2",
                      location.pathname.startsWith(item.path) && "bg-secondary"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => navigate('/dictionary')}>
              <ExternalLink className="w-4 h-4 mr-2" />
              View Dictionary
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
