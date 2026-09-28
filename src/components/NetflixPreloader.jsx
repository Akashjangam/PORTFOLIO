import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const NetflixPreloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const contentRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    tl.set(preloaderRef.current, { autoAlpha: 1 })
      .fromTo(
        contentRef.current,
        { scale: 0.9, opacity: 0, filter: "blur(12px)" },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
        },
      )
      .fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: "power2.inOut" },
        "-=0.4",
      )
      .to(contentRef.current, {
        scale: 1.08,
        opacity: 0,
        filter: "blur(12px)",
        duration: 0.45,
        ease: "power2.in",
        delay: 0.5,
      })
      .to(preloaderRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[99999] bg-[#050505] flex items-center justify-center select-none overflow-hidden"
    >
      <div
        ref={contentRef}
        className="flex flex-col items-center gap-4 text-center px-4"
      >
        {/* Animated Netflix Red Indicator Dot */}
        <div className="relative flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-[#E50914] animate-ping opacity-75"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#E50914] absolute"></div>
        </div>

        {/* Cinematic Netflix Typography */}
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-[0.35em] text-white font-netflix drop-shadow-[0_0_25px_rgba(229,9,20,0.8)]">
          AKASH
        </h1>

        {/* Animated Crimson Progress Accent */}
        <div
          ref={lineRef}
          className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#E50914] to-transparent origin-center"
        ></div>

        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40">
          {"MERN DEVELOPER // PORTFOLIO"}
        </span>
      </div>
    </div>
  );
};

export default NetflixPreloader;
