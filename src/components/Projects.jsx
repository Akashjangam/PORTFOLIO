import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Star, X, CheckCircle, FolderOpen, Layers, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import { projectsData } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const folderContainerRef = useRef(null);
  const folderBackRef = useRef(null);
  const folderFrontRef = useRef(null);
  const cardsRef = useRef([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ==========================================
      // DESKTOP: 3D Folder Opening & Card Spread
      // ==========================================
      mm.add('(min-width: 1024px)', () => {
        const folderFront = folderFrontRef.current;
        const folderContainer = folderContainerRef.current;
        const cards = cardsRef.current.filter(Boolean);

        if (!folderFront || !folderContainer || cards.length === 0) return;

        // Reset transform origins and initial positions
        gsap.set(folderFront, { transformOrigin: 'bottom center', rotationX: 0 });
        gsap.set(folderContainer, { y: 0, opacity: 1, scale: 1 });

        // Initial stacked state inside folder
        cards.forEach((card, i) => {
          gsap.set(card, {
            x: 0,
            y: 60,
            xPercent: -50,
            yPercent: -50,
            rotation: (i - 1) * 2,
            scale: 0.78,
            opacity: 0,
            zIndex: i === 0 ? 30 : 20, // DriveNow (Featured) on top
          });
        });

        let floatTween;

        const getOffset = () => {
          if (window.innerWidth >= 1360) return 410;
          if (window.innerWidth >= 1180) return 360;
          return 320;
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
            invalidateOnRefresh: true,
            onEnter: () => {
              if (floatTween) floatTween.kill();
            },
            onEnterBack: () => {
              if (floatTween) floatTween.kill();
            },
          },
          onComplete: () => {
            // Subtle cinematic floating breathing animation once cards are spread
            floatTween = gsap.to(cards, {
              y: '+=6',
              rotation: '+=0.4',
              duration: 3.2,
              yoyo: true,
              repeat: -1,
              ease: 'sine.inOut',
              stagger: { amount: 0.6, from: 'center' },
            });
          },
        });

        // 1. Folder flap smoothly opens in 3D
        tl.to(folderFront, {
          rotationX: -130,
          duration: 0.45,
          ease: 'power2.out',
        });

        // 2. Folder recedes downward and fades subtly so cards take the spotlight
        tl.to(
          folderContainer,
          {
            y: 200,
            opacity: 0.2,
            scale: 0.82,
            duration: 0.55,
            ease: 'power2.out',
          },
          '-=0.2'
        );

        // 3. Cards simultaneously emerge and spread outward into 3 visible positions
        // Card 0: Featured Centerpiece (DriveNow)
        tl.to(
          cards[0],
          {
            x: 0,
            y: 42,
            scale: 1.04,
            rotation: 0,
            opacity: 1,
            zIndex: 60,
            duration: 0.7,
            ease: 'power3.out',
          },
          '-=0.45'
        );

        // Card 1: CRM-MERN to the Left
        if (cards[1]) {
          tl.to(
            cards[1],
            {
              x: () => -getOffset(),
              y: 62,
              scale: 0.95,
              rotation: -2,
              opacity: 1,
              zIndex: 40,
              duration: 0.75,
              ease: 'power3.out',
            },
            '<'
          );
        }

        // Card 2: TaskFlow to the Right
        if (cards[2]) {
          tl.to(
            cards[2],
            {
              x: () => getOffset(),
              y: 62,
              scale: 0.95,
              rotation: 2,
              opacity: 1,
              zIndex: 40,
              duration: 0.75,
              ease: 'power3.out',
            },
            '<'
          );
        }
      });

      // ==========================================
      // MOBILE & TABLET: Clean responsive flow
      // ==========================================
      mm.add('(max-width: 1023px)', () => {
        const cards = cardsRef.current.filter(Boolean);
        cards.forEach((card) => {
          gsap.set(card, { clearProps: 'all' });
        });
        if (folderContainerRef.current) gsap.set(folderContainerRef.current, { clearProps: 'all' });
        if (folderFrontRef.current) gsap.set(folderFrontRef.current, { clearProps: 'all' });
      });
    }, sectionRef);

    // Refresh ScrollTrigger calculations after initial mount
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full min-h-[820px] lg:min-h-screen bg-[#070707] text-white pt-20 pb-16 px-4 sm:px-6 md:px-12 select-none overflow-hidden flex flex-col justify-between"
    >
      {/* Background Netflix Cinematic Watermark */}
      <div className="absolute top-4 left-0 w-full flex items-start justify-center pointer-events-none z-0">
        <h1 className="text-[16vw] sm:text-[18vw] font-black text-white/[0.03] tracking-tighter leading-none whitespace-nowrap uppercase font-netflix select-none">
          ORIGINALS
        </h1>
      </div>

      {/* Ambient Crimson Glow behind stage */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] bg-[#E50914]/10 rounded-full blur-[170px] pointer-events-none z-0" />

      {/* Top Section Header */}
      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-2 pb-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-xl border border-[#E50914]/40 text-xs font-mono uppercase tracking-widest text-[#E50914] shadow-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-ping"></span>
          <span>{"NETFLIX ARCHIVE // EPISODE 03"}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white font-netflix tracking-tight leading-none">
            ORIGINALS &bull; PROJECT ARCHIVE
          </h2>
          <p className="text-xs sm:text-sm font-mono text-white/50 tracking-wider">
            {"// 3 PRODUCTION REPOSITORIES"}
          </p>
        </div>
      </div>

      {/* ======================================================== */}
      {/* DESKTOP STAGE: 3D Folder & Spreading Interactive Cards   */}
      {/* ======================================================== */}
      <div
        ref={stageRef}
        className="hidden lg:flex relative w-full max-w-7xl mx-auto items-center justify-center my-auto min-h-[580px] pt-8 pb-12 [perspective:2200px] z-10"
      >
        {/* Origin Center Anchor */}
        <div className="relative w-0 h-0 [transform-style:preserve-3d]">
          {/* Animated Archive Folder */}
          <div
            ref={folderContainerRef}
            className="absolute w-[380px] aspect-[16/10] -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d] transition-opacity duration-500"
            style={{ zIndex: 10 }}
          >
            {/* Folder Back */}
            <div
              ref={folderBackRef}
              className="absolute inset-0 bg-gradient-to-b from-[#1b1b1b] to-[#111111] rounded-[24px] border border-[#E50914]/40 shadow-[0_20px_50px_rgba(229,9,20,0.25)] flex flex-col justify-between p-6"
            >
              <div className="absolute -top-6 left-6 w-36 h-8 bg-[#1f1f1f] rounded-t-xl border-t border-l border-r border-[#E50914]/30 flex items-center px-4">
                <span className="text-[10px] font-mono text-white/40 tracking-wider">SECURE_VAULT</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-white/40">
                <span>[ AKASH JANGAM ]</span>
                <span>ORIGINALS</span>
              </div>
              <div className="text-center text-[#E50914] font-mono font-black text-xl tracking-widest uppercase opacity-75 flex items-center justify-center gap-3">
                <FolderOpen size={24} />
                <span>PROJECT_ARCHIVE</span>
              </div>
              <div className="text-center text-[10px] font-mono text-white/30 uppercase tracking-widest">
                FULL-STACK REPERTOIRE
              </div>
            </div>

            {/* Folder Front Flap (Opens in 3D) */}
            <div
              ref={folderFrontRef}
              className="absolute inset-0 pointer-events-none will-change-transform [transform-style:preserve-3d]"
              style={{ zIndex: 35 }}
            >
              <div className="absolute bottom-0 w-full h-[88%] bg-gradient-to-t from-[#141414] via-[#1a1a1a] to-[#222222] rounded-b-[24px] rounded-t-md shadow-[0_-8px_30px_rgba(0,0,0,0.9)] flex flex-col justify-end p-6 border-t border-[#E50914]/50">
                <div className="w-24 h-1.5 bg-white/20 rounded-full mx-auto mb-2" />
                <div className="text-center text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  STREAMING NOW
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Project Cards (3 Cards) */}
          {projectsData.map((project, i) => {
            const isFeatured = project.featured;

            return (
              <div
                key={project.id}
                ref={(el) => (cardsRef.current[i] = el)}
                className={`absolute will-change-transform cursor-pointer transition-colors duration-300 ${
                  isFeatured
                    ? 'w-[365px] xl:w-[410px] min-h-[490px]'
                    : 'w-[315px] xl:w-[355px] min-h-[470px]'
                }`}
                style={{ zIndex: isFeatured ? 60 : 40 }}
              >
                <div
                  onClick={() => setSelectedProject(project)}
                  className={`w-full h-full rounded-[26px] overflow-hidden p-6 xl:p-7 flex flex-col justify-between backdrop-blur-2xl transition-all duration-300 group relative ${
                    isFeatured
                      ? 'border-2 border-[#E50914] bg-gradient-to-b from-[#1d0809]/98 via-[#141414]/98 to-[#0a0a0a]/98 shadow-[0_25px_60px_rgba(229,9,20,0.35)] hover:shadow-[0_35px_80px_rgba(229,9,20,0.55)] hover:scale-[1.02]'
                      : 'border border-white/15 bg-[#141414]/98 shadow-[0_20px_45px_rgba(0,0,0,0.9)] hover:border-[#E50914]/70 hover:shadow-[0_25px_60px_rgba(229,9,20,0.25)] hover:scale-[1.02]'
                  }`}
                >
                  {/* Featured Badge */}
                  {isFeatured && (
                    <div className="absolute top-0 right-7 -translate-y-1/2 px-3 py-1 rounded-full bg-[#E50914] text-white text-[10px] font-mono font-bold tracking-widest uppercase flex items-center gap-1.5 shadow-[0_0_20px_rgba(229,9,20,0.8)]">
                      <Star size={11} fill="currentColor" />
                      <span>PRIMARY FEATURED</span>
                    </div>
                  )}

                  {/* Card Content Top */}
                  <div>
                    {/* Top Episode & Match Tag */}
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#E50914] bg-[#E50914]/15 px-2.5 py-0.5 rounded-full border border-[#E50914]/30">
                          {`PROJECT ${project.number}`}
                        </span>
                        <span className="text-[10px] font-mono text-white/50">{project.episode}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-red-400 font-bold">{project.match} Match</span>
                        <span className="text-[10px] font-mono border border-white/20 px-1.5 py-0.5 rounded text-white/70">
                          HD
                        </span>
                      </div>
                    </div>

                    {/* Project Category / Type */}
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#E50914]/80 mb-1.5">
                      {project.type}
                    </div>

                    {/* Project Titles */}
                    {isFeatured ? (
                      <div className="mb-3">
                        <h3 className="text-2xl xl:text-3xl font-black text-white font-netflix leading-none tracking-wide group-hover:text-[#E50914] transition-colors">
                          DRIVENOW
                        </h3>
                        <p className="text-xs font-mono font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#E50914] via-rose-400 to-red-300 uppercase tracking-wider mt-1">
                          MERN Stack Car Rental Platform
                        </p>
                      </div>
                    ) : (
                      <div className="mb-3">
                        <h3 className="text-xl xl:text-2xl font-black text-white font-netflix leading-tight tracking-wide group-hover:text-[#E50914] transition-colors">
                          {project.shortTitle}
                        </h3>
                        <p className="text-xs font-mono font-semibold text-white/60 uppercase tracking-wider mt-1">
                          {project.subtitle}
                        </p>
                      </div>
                    )}

                    {/* Short Factual Description */}
                    <p className="text-xs text-white/75 font-light leading-relaxed line-clamp-3 mb-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Middle / Bottom: Tech Tags & Buttons */}
                  <div>
                    <div className="flex flex-wrap gap-1.5 py-2.5 border-t border-white/10">
                      {project.technologies.slice(0, isFeatured ? 5 : 4).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono text-white/80 bg-white/5 px-2.5 py-0.5 rounded border border-white/5 group-hover:border-[#E50914]/20 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > (isFeatured ? 5 : 4) && (
                        <span className="text-[10px] font-mono text-[#E50914] px-1 py-0.5">
                          +{project.technologies.length - (isFeatured ? 5 : 4)} more
                        </span>
                      )}
                    </div>

                    {/* Card Action Buttons */}
                    <div className="pt-3 border-t border-white/10 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                        className="flex-1 py-2.5 px-3 rounded-lg bg-[#E50914] hover:bg-[#b80710] text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-[0_0_15px_rgba(229,9,20,0.4)] cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowUpRight size={13} />
                      </button>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="py-2.5 px-3 rounded-lg bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border border-white/10 transition-colors flex items-center justify-center gap-1.5 text-xs font-mono cursor-pointer"
                        title="GitHub Repository"
                        aria-label={`${project.title} GitHub Repository`}
                      >
                        <GithubIcon size={14} />
                        <span className="font-semibold">GitHub</span>
                      </a>

                      {project.liveDemoUrl && (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border border-white/10 transition-colors flex items-center justify-center cursor-pointer"
                          title="Live Demo"
                          aria-label={`${project.title} Live Demo`}
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Red Corner Accent */}
                  <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-[#E50914] group-hover:shadow-[0_0_12px_#E50914] transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* MOBILE / TABLET VIEW: High-Performance Touch Carousel    */}
      {/* ======================================================== */}
      <div className="lg:hidden relative z-10 w-full py-4 space-y-6">
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory px-2 py-4 hide-scrollbar">
          {projectsData.map((project) => {
            const isFeatured = project.featured;

            return (
              <div
                key={`mob-${project.id}`}
                className={`shrink-0 w-[86vw] sm:w-[380px] snap-center rounded-[24px] overflow-hidden p-6 flex flex-col justify-between shadow-[0_20px_45px_rgba(0,0,0,0.95)] ${
                  isFeatured
                    ? 'border-2 border-[#E50914] bg-gradient-to-b from-[#1d0809] to-[#121212]'
                    : 'border border-white/15 bg-[#141414]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-[#E50914] bg-[#E50914]/10 px-2.5 py-0.5 rounded-full">
                        {`PROJECT ${project.number}`}
                      </span>
                      <span className="text-[10px] font-mono text-white/50">{project.episode}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {isFeatured && (
                        <span className="px-2 py-0.5 rounded bg-[#E50914] text-white text-[9px] font-mono font-bold uppercase tracking-wider">
                          FEATURED
                        </span>
                      )}
                      <span className="text-xs font-mono text-red-400 font-bold">{project.match} Match</span>
                    </div>
                  </div>

                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#E50914]/80 mb-1.5">
                    {project.type}
                  </div>

                  {isFeatured ? (
                    <div className="mb-3">
                      <h3 className="text-2xl font-black text-white font-netflix leading-none tracking-wide">
                        DRIVENOW
                      </h3>
                      <p className="text-xs font-mono font-semibold text-[#E50914] uppercase tracking-wider mt-1">
                        MERN Stack Car Rental Platform
                      </p>
                    </div>
                  ) : (
                    <div className="mb-3">
                      <h3 className="text-xl font-black text-white font-netflix leading-tight tracking-wide">
                        {project.shortTitle}
                      </h3>
                      <p className="text-xs font-mono font-semibold text-white/60 uppercase tracking-wider mt-1">
                        {project.subtitle}
                      </p>
                    </div>
                  )}

                  <p className="text-xs text-white/70 font-light line-clamp-3 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 py-2.5 border-t border-white/10">
                    {project.technologies.slice(0, 4).map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-mono text-white/70 bg-white/5 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-[10px] font-mono text-[#E50914] px-1 py-0.5">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="flex-1 py-2.5 px-3 rounded-lg bg-[#E50914] text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>View Details</span>
                      <ArrowUpRight size={13} />
                    </button>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-lg bg-white/5 text-white/80 border border-white/10 flex items-center justify-center gap-1.5 text-xs font-mono font-semibold cursor-pointer"
                      aria-label={`${project.title} GitHub Repository`}
                    >
                      <GithubIcon size={14} />
                      <span>GitHub</span>
                    </a>

                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-lg bg-white/5 text-white/80 border border-white/10 flex items-center justify-center cursor-pointer"
                        aria-label={`${project.title} Live Demo`}
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center text-xs font-mono text-white/40">
          <span>&larr; Swipe to explore repositories &rarr;</span>
        </div>
      </div>

      {/* Bottom Ticker / Watermark bar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40 uppercase tracking-widest">
        <span>{"ARCHIVE REPERTOIRE // PRODUCTION READY"}</span>
        <span className="text-[#E50914] flex items-center gap-1.5">
          <Layers size={13} />
          <span>MERN STACK ARCHITECTURE</span>
        </span>
      </div>

      {/* ======================================================== */}
      {/* Interactive Project Details Modal                        */}
      {/* ======================================================== */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-[99990] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 animate-fadeIn select-text"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-[#121212] border border-[#E50914]/50 rounded-[28px] p-6 md:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-[#E50914] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="space-y-3 pb-6 border-b border-white/10">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#E50914] px-3 py-1 rounded-full bg-[#E50914]/15 border border-[#E50914]/30">
                  {`PROJECT ${selectedProject.number}`}
                </span>
                <span className="text-xs font-mono text-white/50">{selectedProject.episode}</span>
                <span className="text-xs font-mono text-white/60 uppercase">
                  {selectedProject.type}
                </span>
                {selectedProject.featured && (
                  <span className="text-[10px] font-mono text-white font-bold bg-[#E50914] px-2.5 py-0.5 rounded-full uppercase">
                    PRIMARY FEATURED
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-netflix tracking-wide leading-tight">
                {selectedProject.title}
              </h3>
              <p className="text-sm text-white/80 font-light leading-relaxed">
                {selectedProject.description}
              </p>
            </div>

            {/* Key Architectural Features */}
            <div className="py-6 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#E50914] font-bold">
                Key Features & Engineering Workflows:
              </h4>
              <ul className="space-y-2.5">
                {selectedProject.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80 font-light">
                    <CheckCircle size={15} className="text-[#E50914] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="py-4 border-t border-white/10 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-white/60 font-bold">
                Stack & Integrations:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono text-white/90 bg-white/5 border border-white/15 px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Repository & Demo Buttons */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap gap-4 items-center">
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-[#E50914] hover:bg-[#b80710] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(229,9,20,0.5)] cursor-pointer"
              >
                <GithubIcon size={16} />
                <span>Open GitHub Repository</span>
              </a>

              {selectedProject.liveDemoUrl && (
                <a
                  href={selectedProject.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
                >
                  <ExternalLink size={16} />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
