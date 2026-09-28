import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, MapPin, CheckCircle2, Building, GitBranch } from 'lucide-react';
import { experienceData } from '../data/experience';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    if (!section || !card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { y: 60, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full bg-[#050505] text-white py-28 md:py-36 px-6 md:px-12 select-none overflow-hidden"
    >
      {/* Cinematic Ambient Glow */}
      <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-[#E50914]/10 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto w-full space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-xl border border-[#E50914]/40 text-xs font-mono uppercase tracking-widest text-[#E50914] shadow-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-ping"></span>
            <span>EPISODE 04 // CAREER TIMELINE</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white font-netflix tracking-tight">
            INDUSTRY EXPERIENCE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E50914] via-rose-600 to-red-500 drop-shadow-[0_0_25px_rgba(229,9,20,0.35)]">
              FRONTEND ENGINEERING.
            </span>
          </h2>
          <p className="text-white/60 text-sm md:text-base font-light max-w-xl">
            Practical experience engineering modular frontend architectures, cross-browser compatibility, and collaborative Git workflows in production environments.
          </p>
        </div>

        {/* Experience Timeline Card */}
        <div ref={cardRef} className="relative">
          {experienceData.map((exp, idx) => (
            <div
              key={idx}
              className="relative p-8 md:p-12 rounded-[2rem] bg-gradient-to-b from-[#141414]/95 to-[#0d0d0d]/95 backdrop-blur-2xl border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden group hover:border-[#E50914]/60 transition-all duration-500"
            >
              {/* Crimson Accent Top Bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E50914] to-transparent"></div>

              {/* Glowing Corner Indicator */}
              <div className="absolute top-8 right-8 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#E50914]/15 border border-[#E50914]/30 text-[#E50914] text-xs font-mono font-bold uppercase tracking-wider">
                  {exp.type}
                </span>
              </div>

              {/* Company & Role Header */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-2 text-xs font-mono text-[#E50914] uppercase tracking-widest font-bold">
                  <Building size={14} />
                  <span>{exp.company}</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-black text-white font-netflix tracking-tight">
                  {exp.role}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/60 pt-1">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-[#E50914]" />
                    {exp.period}
                  </span>
                  <span className="text-white/20">&bull;</span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-[#E50914]" />
                    {exp.location}
                  </span>
                  <span className="text-white/20">&bull;</span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase size={13} className="text-[#E50914]" />
                    Frontend Engineering Track
                  </span>
                </div>
              </div>

              {/* Responsibilities Grid */}
              <div className="space-y-4 pt-6 border-t border-white/10">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#E50914] font-bold flex items-center gap-2">
                  <GitBranch size={14} />
                  <span>Key Responsibilities & Deliverables:</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <div
                      key={rIdx}
                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#E50914]/30 transition-colors flex items-start gap-3"
                    >
                      <CheckCircle2 size={16} className="text-[#E50914] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                        {resp}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Leveraged */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-xs font-mono text-white/80 bg-white/5 border border-white/10 px-3 py-1 rounded group-hover:border-[#E50914]/30 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="text-[11px] font-mono text-white/40">
                  {"// VERIFIED WORK EXPERIENCE"}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
