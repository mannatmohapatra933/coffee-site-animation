'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion';

export default function HeroCanvasAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [frames, setFrames] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // ULTRA-SMOOTH spring physics for a premium feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 25,
    restDelta: 0.0001
  });

  // Subtle float
  const scrollVelocity = useVelocity(scrollYProgress);
  const yOffset = useTransform(
    scrollVelocity,
    [-1, 0, 1],
    [8, 0, -8]
  );

  // Preload 120 frames
  useEffect(() => {
    const frameCount = 120;
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `/frames/frame-${i.toString().padStart(3, '0')}.png`;
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / frameCount) * 100));
        if (loadedCount === frameCount) {
          setFrames(loadedImages);
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        console.error(`Failed to load frame ${i}`);
        loadedCount++;
      };
      loadedImages[i - 1] = img;
    }
  }, []);

  // Canvas rendering
  useEffect(() => {
    if (!imagesLoaded || frames.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const progress = smoothProgress.get();
      // Calculate which frame to show (0 to 119)
      const frameIndex = Math.min(
        frames.length - 1,
        Math.floor(progress * frames.length)
      );

      const img = frames[frameIndex];
      if (!img) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const baseScale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const w = img.width * baseScale;
      const h = img.height * baseScale;
      const x = (canvas.width - w) / 2;
      const y = (canvas.height - h) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, x, y, w, h);
    };

    const unsubscribe = smoothProgress.on('change', render);
    render();

    const handleResize = () => render();
    window.addEventListener('resize', handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
    };
  }, [imagesLoaded, frames, smoothProgress]);

  // Text opacities
  const section1Opacity = useTransform(smoothProgress, [0, 0.1, 0.2, 0.3], [0, 1, 1, 0]);
  const section2Opacity = useTransform(smoothProgress, [0.4, 0.5, 0.6, 0.7], [0, 1, 1, 0]);
  const section3Opacity = useTransform(smoothProgress, [0.75, 0.85, 0.9, 0.95], [0, 1, 1, 0]);

  if (!imagesLoaded) {
    return (
      <div className="fixed inset-0 bg-[#1A0F0A] flex flex-col items-center justify-center z-50">
        <p className="text-amber-100/70 text-lg font-['Inter'] animate-pulse">
          BREWING AURA... {loadProgress}%
        </p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#1A0F0A]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div style={{ y: yOffset }} className="w-full h-full">
          <canvas
            ref={canvasRef}
            className="w-full h-full"
          />
        </motion.div>

        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <motion.div
            style={{ opacity: section1Opacity }}
            className="text-center px-4 text-[#F5E6D3]"
          >
            <h1 className="text-7xl md:text-9xl font-['playfair'] font-bold mb-4 drop-shadow-2xl">
              Infinite Aura
            </h1>
            <p className="text-xl md:text-2xl font-['inter'] tracking-widest uppercase">
              The Soul of Coffee
            </p>
          </motion.div>

          <motion.div
            style={{ opacity: section2Opacity }}
            className="text-center px-4 text-[#F5E6D3]"
          >
            <h2 className="text-6xl md:text-8xl font-['playfair'] font-bold mb-3 drop-shadow-2xl">
              Artisan Spirit
            </h2>
            <p className="text-lg md:text-xl font-['inter'] italic">
              Where every swirl tells a story
            </p>
          </motion.div>

          <motion.div
            style={{ opacity: section3Opacity }}
            className="text-center px-4 text-[#F5E6D3]"
          >
            <h2 className="text-6xl md:text-8xl font-['playfair'] font-bold mb-6 drop-shadow-2xl">
              Pure Aura
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 bg-[#F5E6D3] text-[#1A0F0A] rounded-sm text-lg font-bold tracking-widest pointer-events-auto font-['inter'] shadow-2xl transition-all"
            >
              DISCOVER MORE
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
