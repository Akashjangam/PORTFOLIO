import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const expertiseData = [
  {
    number: "01",
    title: "Frontend Development",
    subtitle: "REACT & MODERN JAVASCRIPT",
    text: "Building responsive, modular, and high-performance user interfaces with React, React Router, JavaScript ES6+, HTML5, CSS3, and Tailwind CSS. Crafting reusable layout structures, form controls, and accessible interactions.",
    tag: "CLIENT-SIDE ARCHITECTURE",
    gradient: "from-[#1f0a0c] via-[#121212] to-[#0a0a0a]",
    skills: ["React", "React Router", "JavaScript ES6+", "HTML5", "CSS3", "Tailwind CSS"]
  },
  {
    number: "02",
    title: "Backend Development",
    subtitle: "NODE.JS & REST APIS",
    text: "Architecting secure and scalable server-side systems using Node.js and Express.js. Engineering RESTful APIs, JWT-based authentication pipelines, role-based access control (RBAC), and transactional error handling.",
    tag: "SERVER & SECURITY",
    gradient: "from-[#1a0809] via-[#111111] to-[#090909]",
    skills: ["Node.js", "Express.js", "REST APIs", "Authentication", "JWT"]
  },
  {
    number: "03",
    title: "Database & Data Systems",
    subtitle: "NOSQL & RELATIONAL DATA",
    text: "Designing structured database schemas with MongoDB and Mongoose ODM alongside relational SQL databases. Implementing data indexing, integrity validation, aggregation pipelines, and reliable query workflows.",
    tag: "DATA MANAGEMENT",
    gradient: "from-[#220a0d] via-[#131313] to-[#0a0a0a]",
    skills: ["MongoDB", "Mongoose", "SQL", "Database Management", "Data Modeling"]
  },
  {
    number: "04",
    title: "Full-Stack Engineering",
    subtitle: "END-TO-END MERN WORKFLOWS",
    text: "Bridging client interfaces with backend microservices across full-stack MERN workflows. Implementing end-to-end CRUD operations, seamless API integration, Git/GitHub collaboration, rigorous debugging, and SDLC best practices.",
    tag: "SYSTEM INTEGRATION",
    gradient: "from-[#1d090b] via-[#101010] to-[#080808]",
    skills: ["MERN Architecture", "API Integration", "Authentication", "CRUD", "Git/GitHub", "Debugging"]
  }
];

const Expertise = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const cards = cardRefs.current;
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        if (index === cards.length - 1) return; // Keep top card fully visible

        gsap.to(card, {
          scale: 0.92 - index * 0.025,
          y: -15 - index * 8,
          filter: "blur(6px)",
          opacity: 0.4,
          scrollTrigger: {
            trigger: card,
            start: `top ${90 + index * 20}px`,
            end: "bottom top",
            scrub: true,
          }
        });
      });

      // Magnetic mouse spotlight per card
      const handleMouseMove = (e, card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      };

      cards.forEach((card) => {
        if (!card) return;
        const listener = (e) => handleMouseMove(e, card);
        card.addEventListener('mousemove', listener);
        return () => card.removeEventListener('mousemove', listener);
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section
      id="expertise"
      ref={containerRef}
      className="relative w-full bg-[#050505] text-white py-24 px-6 md:px-12 select-none overflow-hidden"
    >
      {/* Cinematic Red Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-[#E50914]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto w-full space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/80 backdrop-blur-xl border border-[#E50914]/40 text-xs font-mono uppercase tracking-widest text-white shadow-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-ping"></span>
              <span className="text-[#E50914] font-bold">EPISODE 02</span>
              <span className="text-white/40">|</span>
              <span>TECHNICAL PILLARS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white font-netflix tracking-tight leading-tight">
              DIRECTOR&apos;S CUT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E50914] via-rose-600 to-red-500 drop-shadow-[0_0_25px_rgba(229,9,20,0.35)]">
                ENGINEERING EXPERTISE.
              </span>
            </h2>
          </div>
          <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed max-w-sm">
            Core focus areas covering responsive frontend architectures, high-throughput backend APIs, transactional databases, and unified MERN deployments.
          </p>
        </div>

        {/* Stacking Sticky Cards */}
        <div className="relative flex flex-col gap-8 pb-20">
          {expertiseData.map((item, index) => (
            <div
              key={index}
              ref={addToRefs}
              className={`sticky w-full p-6 sm:p-8 md:p-10 rounded-[2rem] bg-gradient-to-br ${item.gradient} backdrop-blur-2xl border border-white/10 shadow-[0_25px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between min-h-[250px] md:min-h-[280px] transform-gpu transition-all overflow-hidden group hover:border-[#E50914]/60`}
              style={{
                zIndex: index + 1,
                top: `${95 + index * 16}px`
              }}
            >
              {/* Dynamic Mouse Spotlight Highlight */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                style={{
                  background: 'radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), rgba(229,9,20,0.18), transparent 70%)'
                }}
              ></div>

              {/* Crimson Accent Stripe */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-[#E50914] to-transparent z-10"></div>

              {/* Card Header Top */}
              <div className="flex items-center justify-between w-full mb-4 relative z-10">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#E50914] px-3 py-1 rounded-full bg-[#E50914]/10 border border-[#E50914]/25">
                  {item.tag}
                </span>
                <span className="text-3xl md:text-4xl font-mono font-black text-white/20">
                  {item.number}
                </span>
              </div>

              {/* Card Body */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto relative z-10">
                <div className="lg:col-span-5 space-y-1">
                  <div className="text-[11px] font-mono text-white/50 uppercase tracking-widest">
                    {item.subtitle}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight group-hover:text-[#E50914] transition-colors duration-300 font-netflix">
                    {item.title}
                  </h3>
                </div>
                <div className="lg:col-span-7 space-y-4">
                  <p className="text-xs sm:text-sm text-white/75 font-light leading-relaxed">
                    {item.text}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                    {item.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] font-mono text-white/80 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded group-hover:border-[#E50914]/30 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Subtle Red Corner Accent */}
              <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-[#E50914] group-hover:shadow-[0_0_12px_#E50914] z-10 transition-all"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Expertise;
