import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFeaturedBrands } from '@/hooks/useBrands';
import { Badge } from '@/components/ui/badge';
import { QRCodeSVG } from 'qrcode.react';
import { Recycle } from 'lucide-react';
import { getBrandImage } from '@/components/display/types';

// Timing
const HOLD_DURATION = 6500; // time fully visible before crossfade starts
const CROSSFADE_DURATION = 1500; // fade duration

type Slot = 0 | 1;

export default function DisplayIdle() {
  const { data: featuredBrands } = useFeaturedBrands();
  const navigate = useNavigate();

  const remoteUrl = `${window.location.origin}/remote`;

  // Which featured brand index is currently "active" (fully visible when not transitioning)
  const [currentIndex, setCurrentIndex] = useState(0);

  // Two-layer crossfade slots so the incoming image can keep its Ken Burns animation
  // after the fade completes (no remount = no restart).
  const [activeSlot, setActiveSlot] = useState<Slot>(0);
  const [slotImages, setSlotImages] = useState<[string | undefined, string | undefined]>([undefined, undefined]);

  const [incomingIndex, setIncomingIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [fadeInReady, setFadeInReady] = useState(false);

  // Refs to avoid re-creating timers on every render
  const currentIndexRef = useRef(0);
  const activeSlotRef = useRef<Slot>(0);
  const transitioningRef = useRef(false);

  const holdTimerRef = useRef<number | null>(null);
  const transitionTimerRef = useRef<number | null>(null);
  const raf1Ref = useRef<number | null>(null);
  const raf2Ref = useRef<number | null>(null);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    activeSlotRef.current = activeSlot;
  }, [activeSlot]);

  useEffect(() => {
    transitioningRef.current = isTransitioning;
  }, [isTransitioning]);

  // Initialize slot images when featured brands load
  useEffect(() => {
    if (!featuredBrands?.length) return;

    const first = getBrandImage(featuredBrands[0]);
    const second = featuredBrands[1] ? getBrandImage(featuredBrands[1]) : undefined;

    setCurrentIndex(0);
    setIncomingIndex(null);
    setIsTransitioning(false);
    setFadeInReady(false);

    setActiveSlot(0);
    setSlotImages([first, second]);
  }, [featuredBrands?.length]);

  // Timed rotation (timeout chain, not interval) to prevent overlapping transitions.
  useEffect(() => {
    if (!featuredBrands?.length || featuredBrands.length <= 1) return;

    const clearAllTimers = () => {
      if (holdTimerRef.current) window.clearTimeout(holdTimerRef.current);
      if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current);
      if (raf1Ref.current) cancelAnimationFrame(raf1Ref.current);
      if (raf2Ref.current) cancelAnimationFrame(raf2Ref.current);
      holdTimerRef.current = null;
      transitionTimerRef.current = null;
      raf1Ref.current = null;
      raf2Ref.current = null;
    };

    const scheduleNext = () => {
      clearAllTimers();
      holdTimerRef.current = window.setTimeout(() => {
        startTransition();
      }, HOLD_DURATION);
    };

    const startTransition = () => {
      if (!featuredBrands?.length || featuredBrands.length <= 1) return;
      if (transitioningRef.current) return;

      const len = featuredBrands.length;
      const next = (currentIndexRef.current + 1) % len;
      const incomingSlot: Slot = activeSlotRef.current === 0 ? 1 : 0;
      const nextImage = getBrandImage(featuredBrands[next]);

      setIncomingIndex(next);
      setIsTransitioning(true);
      setFadeInReady(false);

      // Load upcoming image into the hidden slot.
      setSlotImages((prev) => {
        const copy: [string | undefined, string | undefined] = [...prev];
        copy[incomingSlot] = nextImage;
        return copy;
      });

      // Mount at opacity 0, then flip to 1 on next frame(s) so the fade-in animates.
      raf1Ref.current = requestAnimationFrame(() => {
        raf2Ref.current = requestAnimationFrame(() => {
          setFadeInReady(true);
        });
      });

      transitionTimerRef.current = window.setTimeout(() => {
        // Make the incoming slot the active slot *without changing its DOM*.
        setActiveSlot(incomingSlot);
        setCurrentIndex(next);
        setIncomingIndex(null);
        setIsTransitioning(false);
        setFadeInReady(false);

        scheduleNext();
      }, CROSSFADE_DURATION);
    };

    scheduleNext();

    return () => {
      clearAllTimers();
    };
  }, [featuredBrands?.length]);

  const handleInteraction = () => {
    navigate('/display');
  };

  const incomingSlot: Slot = activeSlot === 0 ? 1 : 0;

  const currentBrand = featuredBrands?.[currentIndex];
  const transitioningBrand = incomingIndex !== null ? featuredBrands?.[incomingIndex] : undefined;
  const displayBrand = isTransitioning && transitioningBrand ? transitioningBrand : currentBrand;

  const slotOpacity = useMemo(() => {
    const getOpacity = (slot: Slot) => {
      if (!isTransitioning) return slot === activeSlot ? 1 : 0;
      if (slot === activeSlot) return 0;
      if (slot === incomingSlot) return fadeInReady ? 1 : 0;
      return 0;
    };

    return {
      slot0: getOpacity(0),
      slot1: getOpacity(1),
    };
  }, [activeSlot, fadeInReady, incomingSlot, isTransitioning]);

  const kenBurnsClass = (slot: Slot) => {
    // Start Ken Burns exactly when the image becomes visible.
    if (slot === activeSlot) return 'animate-ken-burns';
    if (isTransitioning && slot === incomingSlot && fadeInReady) return 'animate-ken-burns';
    return '';
  };

  return (
    <div
      className="fixed inset-0 z-50 w-screen h-screen cursor-pointer overflow-hidden bg-black"
      onClick={handleInteraction}
      onKeyDown={handleInteraction}
      role="button"
      tabIndex={0}
    >
      {/* Slot 0 */}
      {slotImages[0] && (
        <div
          className="absolute inset-0 transition-opacity ease-in-out"
          style={{ transitionDuration: `${CROSSFADE_DURATION}ms`, opacity: slotOpacity.slot0 }}
        >
          <img
            src={slotImages[0]}
            alt=""
            className={`w-full h-full object-cover ${kenBurnsClass(0)}`}
          />
        </div>
      )}

      {/* Slot 1 */}
      {slotImages[1] && (
        <div
          className="absolute inset-0 transition-opacity ease-in-out"
          style={{ transitionDuration: `${CROSSFADE_DURATION}ms`, opacity: slotOpacity.slot1 }}
        >
          <img
            src={slotImages[1]}
            alt=""
            className={`w-full h-full object-cover ${kenBurnsClass(1)}`}
          />
        </div>
      )}

      {/* Cinematic vignette overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Strong radial vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 100%)',
          }}
        />
        {/* Bottom gradient for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 30%, transparent 60%)',
          }}
        />
        {/* Top gradient for header */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 20%)',
          }}
        />
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-8 flex items-center gap-4 z-10">
        <Recycle className="w-12 h-12 text-primary drop-shadow-lg" />
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">Upcycling Dictionary</h1>
      </header>

      {/* Centered content - positioned lower for cinematic feel */}
      <div className="absolute inset-0 flex items-end justify-center pb-32 z-10">
        <div className="text-center max-w-5xl px-8 transition-opacity duration-500" style={{ opacity: isTransitioning ? 0.7 : 1 }}>
          {featuredBrands?.length ? (
            <>
              <Badge className="mb-6 bg-tier-featured text-background text-lg px-4 py-1.5 shadow-xl">Featured Brand</Badge>
              <h2
                className="text-7xl md:text-8xl font-bold text-white mb-6 tracking-tight"
                style={{ textShadow: '0 4px 30px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.9)' }}
              >
                {displayBrand?.name}
              </h2>
              <div className="flex justify-center gap-3 mt-10">
                {featuredBrands.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === (isTransitioning && incomingIndex !== null ? incomingIndex : currentIndex)
                        ? 'bg-primary w-8'
                        : 'bg-white/30 w-3'
                    }`}
                  />
                ))}
              </div>
            </>
          ) : (
            <h2 className="text-7xl md:text-8xl font-bold text-white tracking-tight" style={{ textShadow: '0 4px 30px rgba(0,0,0,0.8)' }}>
              Upcycling Dictionary
            </h2>
          )}
          <p className="text-white/60 mt-10 text-xl tracking-wide uppercase">Touch anywhere to explore</p>
        </div>
      </div>

      {/* Footer with QR Code */}
      <footer className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between z-10">
        <div className="text-white/50 text-sm">
          <p>Scan to control this display</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-2xl">
          <QRCodeSVG value={remoteUrl} size={100} bgColor="white" fgColor="black" />
        </div>
      </footer>
    </div>
  );
}
