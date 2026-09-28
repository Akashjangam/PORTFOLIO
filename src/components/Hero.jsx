import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Mail, Terminal, MapPin, Database, Server, Code, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import profileImg from '../assets/profile/akash.png';

const Hero = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const spotlightRef = useRef(null);
  const contentRef = useRef(null);
  const [imageError, setImageError] = useState(false);

  const marqueeRoles = [
    'MERN STACK DEVELOPER',
    'FULL-STACK ARCHITECT',
    'REST APIS & MONGODB',
    'REACT & NODE.JS SPECIALIST',
    'SCALABLE WEB APPLICATIONS',
    'ALGORITHMS & PROBLEM SOLVER'
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const content = contentRef.current;
    if (!section || !card || !content) return;

    const ctx = gsap.context(() => {
      // --- GSAP CINEMATIC ENTRANCE ANIMATION ---
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(
        content.querySelectorAll('.hero-anim-item'),
        { y: 40, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, stagger: 0.12 }
      ).fromTo(
        card,
        { scale: 0.8, opacity: 0, rotationY: 25, rotationX: -15 },
        { scale: 1, opacity: 1, rotationY: 0, rotationX: 0, duration: 1.3, ease: 'back.out(1.2)' },
        '-=0.8'
      );

      // --- MOUSE 3D PERSPECTIVE PHYSICS & SPOTLIGHT ---
      const xTilt = gsap.quickTo(card, 'rotationY', { duration: 0.35, ease: 'power3.out' });
      const yTilt = gsap.quickTo(card, 'rotationX', { duration: 0.35, ease: 'power3.out' });
      const glareX = gsap.quickTo(glareRef.current, 'x', { duration: 0.3, ease: 'power2.out' });
      const glareY = gsap.quickTo(glareRef.current, 'y', { duration: 0.3, ease: 'power2.out' });

      const handleMouseMove = (e) => {
        const rect = section.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (spotlightRef.current) {
          spotlightRef.current.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
        }

        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2 - rect.left;
        const cardCenterY = cardRect.top + cardRect.height / 2 - rect.top;

        const rotateX = -((y - cardCenterY) / (cardRect.height / 2)) * 14;
        const rotateY = ((x - cardCenterX) / (cardRect.width / 2)) * 14;

        xTilt(rotateY);
        yTilt(rotateX);

        if (glareRef.current) {
          glareX(x - cardRect.left - cardRect.width / 2);
          glareY(y - cardRect.top - cardRect.height / 2);
        }
      };

      const handleMouseEnter = () => {
        if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 1, duration: 0.3 });
      };

      const handleMouseLeave = () => {
        if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
        xTilt(0);
        yTilt(0);
      };

      section.addEventListener('mousemove', handleMouseMove);
      section.addEventListener('mouseenter', handleMouseEnter);
      section.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        section.removeEventListener('mousemove', handleMouseMove);
        section.removeEventListener('mouseenter', handleMouseEnter);
        section.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex flex-col justify-between select-none pt-24 pb-12"
    >
      <style>{`
        @keyframes heroMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-hero-marquee {
          display: flex;
          width: max-content;
          animation: heroMarquee 38s linear infinite;
        }
      `}</style>

      {/* 1. Cinematic Background Gradient & Marquee */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#080808]/95 to-[#050505] z-0 pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-5">
          <div className="flex whitespace-nowrap animate-hero-marquee">
            {[...marqueeRoles, ...marqueeRoles].map((role, idx) => (
              <span key={idx} className="text-[12vw] font-black text-[#E50914] mx-8 uppercase tracking-tighter font-netflix">
                {role} •
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Direct Mouse Tracking Spotlight */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-10 opacity-0 blur-[90px] transition-opacity duration-300 hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(229,9,20,0.3) 0%, rgba(229,9,20,0.08) 40%, transparent 70%)'
        }}
      ></div>

      {/* 3. Ambient Red Corner Vignettes */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#E50914]/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 -right-48 w-96 h-96 bg-[#E50914]/10 rounded-full blur-[140px] pointer-events-none"></div>

      {/* 4. Main Content Container */}
      <div ref={contentRef} className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex-1 flex flex-col justify-between">
        
        {/* Top Netflix Cinematic Badge */}
        <div className="hero-anim-item flex flex-wrap items-center justify-between gap-4 w-full pt-4 pb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-2xl border border-[#E50914]/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#E50914] animate-ping"></span>
            <span className="text-[#E50914] font-bold">NETFLIX DEVELOPER SERIES</span>
            <span className="text-white/40">|</span>
            <span className="text-white/80">{"PREMIERE // 2026"}</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-white/60 tracking-wider">
            <span className="flex items-center gap-1.5 px-3 py-1 border border-white/10 rounded-full bg-black/40 backdrop-blur-md">
              <MapPin size={12} className="text-[#E50914]" />
              HYDERABAD, INDIA
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 border border-[#E50914]/30 rounded-full bg-[#E50914]/10 text-white font-semibold">
              <Sparkles size={12} className="text-[#E50914]" />
              AVAILABLE FOR HIRE
            </span>
          </div>
        </div>

        {/* Center Grid: Story - Profile Card - Stack Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-10 my-auto py-6">
          
          {/* Left Column: Developer Story & Headline */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-5 text-left">
            <div className="hero-anim-item inline-flex items-center gap-2.5">
              <span className="px-2.5 py-0.5 bg-[#E50914] text-white font-black text-xs rounded tracking-widest shadow-[0_0_20px_rgba(229,9,20,0.8)]">
                TOP TIER
              </span>
              <span className="text-white/80 text-xs font-mono tracking-widest uppercase">
                Software Engineer & Problem Solver
              </span>
            </div>

            <h1 className="hero-anim-item text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-black tracking-tighter text-white leading-[0.9] font-netflix drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
              AKASH <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E50914] via-rose-600 to-red-500 drop-shadow-[0_0_35px_rgba(229,9,20,0.6)]">
                JANGAM
              </span>
            </h1>

            {/* Sub-headline: Role & Supporting Tech */}
            <div className="hero-anim-item space-y-2">
              <div className="text-lg md:text-xl font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E50914]"></span>
                MERN STACK DEVELOPER
              </div>
              <div className="text-xs md:text-sm font-mono text-[#E50914] font-semibold tracking-wide flex flex-wrap items-center gap-2">
                <span>React</span>
                <span className="text-white/30">•</span>
                <span>Node.js</span>
                <span className="text-white/30">•</span>
                <span>Express.js</span>
                <span className="text-white/30">•</span>
                <span>MongoDB</span>
              </div>
            </div>

            <p className="hero-anim-item text-sm md:text-base text-white/75 font-light leading-relaxed max-w-md">
              Building responsive, scalable and reliable full-stack web applications with robust REST APIs, modern authentication, and high-performance database architectures.
            </p>

            {/* Action Buttons */}
            <div className="hero-anim-item flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="px-7 py-3.5 bg-white text-black font-bold text-xs uppercase tracking-widest rounded hover:bg-[#E50914] hover:text-white transition-all duration-300 shadow-[0_10px_35px_rgba(255,255,255,0.2)] flex items-center gap-2 hover:scale-105 active:scale-95 group"
              >
                <span>View Projects</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="px-7 py-3.5 bg-neutral-900/90 text-white border border-white/20 font-bold text-xs uppercase tracking-widest rounded hover:bg-neutral-800 transition-all duration-300 shadow-xl backdrop-blur-md flex items-center gap-2 hover:scale-105 active:scale-95 hover:border-[#E50914]/60"
              >
                <Mail size={15} className="text-[#E50914]" />
                <span>Contact Me</span>
              </a>
              <a
                href="https://github.com/Akashjangam"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 bg-neutral-900/90 text-white/80 hover:text-white border border-white/20 rounded hover:border-[#E50914] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center shadow-xl backdrop-blur-md"
                aria-label="GitHub Profile"
              >
                <GithubIcon size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/akashjangam/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 bg-neutral-900/90 text-white/80 hover:text-white border border-white/20 rounded hover:border-[#E50914] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center shadow-xl backdrop-blur-md"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon size={16} />
              </a>
            </div>
          </div>

          {/* Center Column: 3D Holographic Developer Poster Frame */}
          <div className="lg:col-span-4 flex justify-center [perspective:1200px] my-6 lg:my-0">
            <div
              ref={cardRef}
              className="relative group transform-gpu transition-transform duration-100 ease-out will-change-transform"
            >
              {/* Cinematic Red Neon Back Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#E50914]/70 via-rose-600/40 to-red-900/30 rounded-3xl blur-3xl opacity-80 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>

              {/* Poster Card with Glossy Sheen */}
              <div className="relative w-[280px] sm:w-[310px] md:w-[330px] p-3.5 bg-[#141414]/95 backdrop-blur-2xl rounded-2xl border border-[#E50914]/40 shadow-[0_35px_70px_rgba(0,0,0,0.95)] overflow-hidden">
                {/* Dynamic Specular Glare Layer */}
                <div
                  ref={glareRef}
                  className="absolute inset-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none transform-gpu z-40"
                ></div>

                {/* Netflix Top Badge */}
                <div className="absolute top-6 left-6 z-30 px-3 py-1 bg-[#E50914] text-white font-mono text-[10px] font-bold tracking-widest rounded shadow-xl flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  FEATURED ENGINEER
                </div>

                {/* Profile Card Visual (Akash Jangam) */}
                <div className="relative w-full h-[340px] sm:h-[390px] rounded-xl overflow-hidden bg-gradient-to-b from-[#1c1c1c] via-[#101010] to-[#080808] flex flex-col justify-end p-6 border border-white/5">
                  {!imageError ? (
                    <img
                      src={profileImg}
                      alt="Akash Jangam - MERN Stack Developer"
                      onError={() => setImageError(true)}
                      className="absolute inset-0 w-full h-full object-cover rounded-xl filter contrast-125 brightness-105 group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : null}

                  {/* Gradient Overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none"></div>

                  {/* Stylized Badge Overlay / Details inside card */}
                  <div className="relative z-20 space-y-2">
                    <div className="text-[10px] font-mono text-[#E50914] font-bold uppercase tracking-widest">
                      {"ORIGINAL SERIES // S01"}
                    </div>
                    <h2 className="text-2xl font-black text-white font-netflix tracking-wide leading-tight drop-shadow-md">
                      AKASH JANGAM
                    </h2>
                    <p className="text-[11px] font-mono text-white/70 tracking-wider">
                      MERN STACK ARCHITECT
                    </p>
                    <div className="flex items-center gap-1.5 pt-1 text-[10px] font-mono text-white/50">
                      <span className="px-2 py-0.5 rounded bg-black/60 border border-white/20">HYD, IN</span>
                      <span className="px-2 py-0.5 rounded bg-[#E50914]/20 border border-[#E50914]/40 text-[#E50914]">FULL-STACK</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="pt-3 px-1 flex items-center justify-between text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  <span>NETFLIX DEV ORIGINALS</span>
                  <span className="text-[#E50914]">4K UHD</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Technical Foundation & Education Highlights */}
          <div className="hero-anim-item lg:col-span-3 flex flex-col items-start lg:items-end space-y-4 text-left lg:text-right">
            {/* Core Stack Spec Card */}
            <div className="p-5 bg-black/80 backdrop-blur-2xl border border-white/15 rounded-xl shadow-2xl max-w-xs hover:border-[#E50914]/50 transition-colors w-full">
              <div className="flex items-center gap-2 mb-2 text-[#E50914] font-mono text-xs uppercase tracking-widest font-bold lg:justify-end">
                <Database size={14} />
                <span>Primary Stack</span>
              </div>
              <p className="text-xs text-white/80 leading-relaxed font-light">
                MongoDB, Express.js, React, Node.js, Python, REST APIs, and JWT Authentication.
              </p>
            </div>

            {/* Academic Pedigree Card */}
            <div className="p-5 bg-black/80 backdrop-blur-2xl border border-white/15 rounded-xl shadow-2xl max-w-xs hover:border-[#E50914]/50 transition-colors w-full">
              <div className="flex items-center gap-2 mb-2 text-[#E50914] font-mono text-xs uppercase tracking-widest font-bold lg:justify-end">
                <Server size={14} />
                <span>Academic Track</span>
              </div>
              <p className="text-xs text-white/80 leading-relaxed font-light">
                <strong className="text-white">IIT Mandi</strong> Minor in Computer Science (GPA 7.81) & <strong className="text-white">MRIET</strong> B.Tech CSE (CGPA 7.18).
              </p>
            </div>

            {/* Industry Internship */}
            <div className="p-5 bg-black/80 backdrop-blur-2xl border border-white/15 rounded-xl shadow-2xl max-w-xs hover:border-[#E50914]/50 transition-colors w-full">
              <div className="flex items-center gap-2 mb-2 text-[#E50914] font-mono text-xs uppercase tracking-widest font-bold lg:justify-end">
                <Code size={14} />
                <span>Experience</span>
              </div>
              <p className="text-xs text-white/80 leading-relaxed font-light">
                Frontend Developer Intern at <strong className="text-white">Venturexlabs India</strong> (Built 10+ reusable UI components).
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Cinematic Ticker */}
        <div className="hero-anim-item flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-white/40 tracking-widest uppercase pt-6 border-t border-white/10">
          <span className="flex items-center gap-2">
            <Terminal size={14} className="text-[#E50914]" />
            ENGINEERED FOR SCALABILITY & PERFORMANCE
          </span>
          <span>{"[ PORTFOLIO RELEASE v2.6 // AKASH JANGAM ]"}</span>
        </div>

      </div>
    </section>
  );
};

export default Hero;
