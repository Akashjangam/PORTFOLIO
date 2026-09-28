import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const checkIsDesktop = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
};

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(checkIsDesktop);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updateDesktop = (e) => {
      setIsDesktop(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateDesktop);
    } else {
      mediaQuery.addListener(updateDesktop);
    }

    // Touch/mobile devices: keep normal native cursor and exit
    if (!isDesktop) {
      document.body.classList.remove('custom-cursor-active');
      return () => {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', updateDesktop);
        } else {
          mediaQuery.removeListener(updateDesktop);
        }
      };
    }

    // Desktop validated: hide native cursor via body class
    document.body.classList.add('custom-cursor-active');

    const ctx = gsap.context(() => {
      const dot = dotRef.current;
      const ring = ringRef.current;
      const glow = glowRef.current;

      if (!dot || !ring) return;

      const dotSize = 6;
      const ringSize = 32;

      // Start hidden until first mouse movement detected
      gsap.set([dot, ring], { opacity: 0 });
      if (glow) gsap.set(glow, { opacity: 0 });

      // GSAP quickTo setters for buttery-smooth 60fps+ tracking
      const xToDot = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power3.out' });
      const yToDot = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power3.out' });
      const xToRing = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3.out' });
      const yToRing = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3.out' });

      let hasMoved = false;

      const handlePointerMove = (e) => {
        const x = e.clientX;
        const y = e.clientY;

        if (!hasMoved) {
          hasMoved = true;
          // Immediate jump on first interaction so cursor does not slide from (0,0)
          gsap.set(dot, { x: x - dotSize / 2, y: y - dotSize / 2, opacity: 1 });
          gsap.set(ring, { x: x - ringSize / 2, y: y - ringSize / 2, opacity: 1 });
          if (glow) {
            glow.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
            gsap.set(glow, { opacity: 1 });
          }
          return;
        }

        xToDot(x - dotSize / 2);
        yToDot(y - dotSize / 2);
        xToRing(x - ringSize / 2);
        yToRing(y - ringSize / 2);

        if (glow) {
          glow.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
        }
      };

      // Hover interactions: expand ring from 32px to 52px and intensify glow
      const interactiveSelector =
        'a, button, input, textarea, select, [role="button"], [data-cursor-hover], .cursor-pointer';

      const handlePointerOver = (e) => {
        const target = e.target;
        if (target && target.closest && target.closest(interactiveSelector)) {
          gsap.to(ring, {
            scale: 52 / 32, // expands outer ring to 52px
            borderColor: '#E50914',
            backgroundColor: 'rgba(229, 9, 20, 0.18)',
            boxShadow: '0 0 25px rgba(229, 9, 20, 0.7)',
            duration: 0.25,
            ease: 'power2.out',
          });
          gsap.to(dot, {
            scale: 1.35,
            backgroundColor: '#ff2630',
            boxShadow: '0 0 16px #ff2630, 0 0 30px #E50914',
            duration: 0.25,
            ease: 'power2.out',
          });
        }
      };

      const handlePointerOut = (e) => {
        const target = e.target;
        if (target && target.closest && target.closest(interactiveSelector)) {
          gsap.to(ring, {
            scale: 1, // back to normal 32px
            borderColor: 'rgba(229, 9, 20, 0.65)',
            backgroundColor: 'transparent',
            boxShadow: '0 0 15px rgba(229, 9, 20, 0.25)',
            duration: 0.25,
            ease: 'power2.out',
          });
          gsap.to(dot, {
            scale: 1,
            backgroundColor: '#E50914',
            boxShadow: '0 0 12px #E50914',
            duration: 0.25,
            ease: 'power2.out',
          });
        }
      };

      const handleWindowLeave = () => {
        gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
        if (glow) gsap.to(glow, { opacity: 0, duration: 0.2 });
      };

      const handleWindowEnter = () => {
        if (hasMoved) {
          gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
          if (glow) gsap.to(glow, { opacity: 1, duration: 0.2 });
        }
      };

      window.addEventListener('pointermove', handlePointerMove, { passive: true });
      window.addEventListener('mousemove', handlePointerMove, { passive: true });
      window.addEventListener('pointerdown', handlePointerMove, { passive: true });
      window.addEventListener('pointerover', handlePointerOver, { passive: true });
      window.addEventListener('pointerout', handlePointerOut, { passive: true });
      document.addEventListener('mouseleave', handleWindowLeave);
      document.addEventListener('mouseenter', handleWindowEnter);

      return () => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('mousemove', handlePointerMove);
        window.removeEventListener('pointerdown', handlePointerMove);
        window.removeEventListener('pointerover', handlePointerOver);
        window.removeEventListener('pointerout', handlePointerOut);
        document.removeEventListener('mouseleave', handleWindowLeave);
        document.removeEventListener('mouseenter', handleWindowEnter);
      };
    });

    return () => {
      document.body.classList.remove('custom-cursor-active');
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', updateDesktop);
      } else {
        mediaQuery.removeListener(updateDesktop);
      }
      ctx.revert();
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      {/* 1. Global Red Ambient Glow / Spotlight */}
      <div
        ref={glowRef}
        className="custom-cursor-glow rounded-full blur-[80px]"
        style={{
          width: '600px',
          height: '600px',
          background:
            'radial-gradient(circle, rgba(229,9,20,0.18) 0%, rgba(229,9,20,0.05) 40%, transparent 70%)',
        }}
      />

      {/* 2. Outer Ring with Delayed Movement */}
      <div
        ref={ringRef}
        className="custom-cursor-ring rounded-full border border-[#E50914]/65 backdrop-blur-[0.5px]"
        style={{
          width: '32px',
          height: '32px',
          boxShadow: '0 0 15px rgba(229, 9, 20, 0.25)',
        }}
      />

      {/* 3. Small Precision Center Red Dot */}
      <div
        ref={dotRef}
        className="custom-cursor-dot rounded-full bg-[#E50914]"
        style={{
          width: '6px',
          height: '6px',
          boxShadow: '0 0 12px #E50914, 0 0 20px rgba(229,9,20,0.8)',
        }}
      />
    </>
  );
};

export default CustomCursor;
