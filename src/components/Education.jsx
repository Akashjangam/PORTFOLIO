import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Award, BookOpen, Calendar, CheckCircle } from 'lucide-react';
import { educationData } from '../data/education';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { y: 50, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.2,
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

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative w-full bg-[#070707] text-white py-28 md:py-36 px-6 md:px-12 select-none overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-[#E50914]/10 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto w-full space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-xl border border-[#E50914]/40 text-xs font-mono uppercase tracking-widest text-[#E50914] shadow-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-ping"></span>
            <span>EPISODE 05 // ACADEMIC PEDIGREE</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white font-netflix tracking-tight">
            EDUCATION & QUALIFICATIONS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E50914] via-rose-600 to-red-500 drop-shadow-[0_0_25px_rgba(229,9,20,0.35)]">
              COMPUTER SCIENCE FOUNDATIONS.
            </span>
          </h2>
          <p className="text-white/60 text-sm md:text-base font-light max-w-xl">
            Formal technical degrees and elite advanced coursework establishing rigorous software engineering and computer science capabilities.
          </p>
        </div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {educationData.map((edu, idx) => (
            <div
              key={idx}
              ref={addToRefs}
              className="p-8 md:p-10 rounded-[2rem] bg-[#141414]/95 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col justify-between group hover:border-[#E50914]/60 transition-all duration-500 relative overflow-hidden"
            >
              {/* Dynamic Crimson Top Accent */}
              <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-[#E50914] to-transparent"></div>

              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#E50914] px-3 py-1 rounded-full bg-[#E50914]/10 border border-[#E50914]/30">
                    {edu.badge}
                  </span>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white font-mono text-xs font-bold">
                    <Award size={13} className="text-[#E50914]" />
                    <span>{edu.gradeType}: {edu.grade}</span>
                  </div>
                </div>

                {/* Institution & Degree */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-xs font-mono text-white/50 uppercase tracking-widest">
                    <GraduationCap size={15} className="text-[#E50914]" />
                    <span>{edu.shortName}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white font-netflix tracking-tight group-hover:text-[#E50914] transition-colors">
                    {edu.institution}
                  </h3>
                  <p className="text-sm md:text-base font-semibold text-white/90">
                    {edu.degree}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-mono text-white/50 pt-1">
                    <Calendar size={13} className="text-[#E50914]" />
                    <span>{edu.period}</span>
                  </div>
                </div>

                {/* Coursework */}
                <div className="space-y-3 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E50914] font-bold">
                    <BookOpen size={13} />
                    <span>Core Coursework & Studies:</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {edu.coursework.map((course, cIdx) => (
                      <span
                        key={cIdx}
                        className="text-xs font-mono text-white/80 bg-white/5 border border-white/10 px-3 py-1 rounded-lg flex items-center gap-1.5 group-hover:border-[#E50914]/30 transition-colors"
                      >
                        <CheckCircle size={11} className="text-[#E50914]" />
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Subtle Bar */}
              <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
                <span>{edu.highlight}</span>
                <span className="text-[#E50914] font-bold">VERIFIED</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Education;
