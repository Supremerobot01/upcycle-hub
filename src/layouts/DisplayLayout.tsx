import { Outlet } from 'react-router-dom';
import { useDisplaySession } from '@/hooks/useDisplaySession';
import { Badge } from '@/components/ui/badge';
import { QRCodeSVG } from 'qrcode.react';
import logo from '@/assets/logo.png';
export default function DisplayLayout() {
  const {
    isControlled
  } = useDisplaySession();
  const remoteUrl = `${window.location.origin}/remote`;
  return <div className="min-h-screen bg-background display-mode text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 p-6 flex items-center justify-between z-10">
        <img alt="Upcycling Dictionary" className="h-12" src="/lovable-uploads/78b8e1a6-39d2-4826-bfeb-4d7da9873aab.png" />
        <div className="flex items-center gap-4">
          {isControlled && <Badge variant="secondary" className="text-sm">
              Remote Connected
            </Badge>}
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-screen pt-24 pb-36 px-8">
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
    </div>;
}