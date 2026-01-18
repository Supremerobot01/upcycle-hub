import { Outlet } from 'react-router-dom';
import { useDisplaySession } from '@/hooks/useDisplaySession';
import { Badge } from '@/components/ui/badge';
import { QRCodeSVG } from 'qrcode.react';

export default function DisplayLayout() {
  const { isControlled } = useDisplaySession();
  const remoteUrl = `${window.location.origin}/remote`;

  return (
    <div className="min-h-screen bg-background display-mode text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 px-6 py-3 flex items-center justify-between z-10 bg-black/40 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-12 w-auto" onError={(e) => {e.currentTarget.style.display = 'none'}} />
          <img src="/upcyclinglogotext.png" alt="Upcycling Dictionary" className="h-7 w-auto" onError={(e) => {e.currentTarget.style.display = 'none'; document.querySelector('h1')?.classList.remove('hidden')}} />
          <h1 className="text-xl font-bold hidden">Upcycling Dictionary</h1>
        </div>
        <div className="flex items-center gap-4">
          {isControlled && (
            <Badge variant="secondary" className="text-sm">
              Remote Connected
            </Badge>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-screen pt-20 pb-36 px-8">
        <Outlet />
      </main>

      {/* Footer with QR Code */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 flex items-end justify-between">
        <div className="text-sm text-muted-foreground">
          <p>Scan to control this display</p>
        </div>
        <div className="bg-card p-3 rounded-lg">
          <QRCodeSVG value={remoteUrl} size={100} />
        </div>
      </footer>
    </div>
  );
}
