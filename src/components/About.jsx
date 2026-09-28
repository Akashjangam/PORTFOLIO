import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Terminal,
  GraduationCap,
  Code2,
  Cpu,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { educationData } from "../data/education";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Cinematic Stagger Entrance on Scroll
      gsap.fromTo(
        cardRefs.current,
        { y: 70, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Interactive Magnetic Mouse Spotlight per Bento Card
      const cards = cardRefs.current;
      const handleMouseMove = (e, card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      };

      cards.forEach((card) => {
        if (!card) return;
        const listener = (e) => handleMouseMove(e, card);
        card.addEventListener("mousemove", listener);
        return () => card.removeEventListener("mousemove", listener);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#050505] text-white py-28 md:py-36 px-6 md:px-12 flex flex-col justify-center select-none overflow-hidden"
    >
      {/* Background Cinematic Red Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-[#E50914]/10 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-red-950/20 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-16">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-2xl border border-[#E50914]/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#E50914] animate-ping"></span>
            <span className="text-[#E50914] font-bold">EPISODE 01</span>
            <span className="text-white/40">|</span>
            <span>ABOUT THE ENGINEER</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white font-netflix leading-none">
            EPISODE SYNOPSIS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E50914] via-rose-600 to-red-500 drop-shadow-[0_0_30px_rgba(229,9,20,0.4)]">
              ORIGIN & VISION.
            </span>
          </h2>
          <p className="text-white/60 text-sm md:text-base font-light max-w-2xl leading-relaxed">
            Computer Science graduate specializing in full-stack MERN
            development, enterprise REST APIs, database architectures, and
            algorithm design.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Core Bio & Engineering Profile (Span 7) */}
          <div
            ref={addToRefs}
            className="md:col-span-7 p-8 md:p-10 bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl flex flex-col justify-between relative group hover:border-[#E50914]/60 transition-all duration-500 overflow-hidden"
          >
            {/* Dynamic mouse hover spotlight */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(229,9,20,0.14), transparent 70%)",
              }}
            ></div>

            <div className="absolute top-0 right-0 p-8 text-white/5 font-mono text-7xl font-black pointer-events-none select-none">
              01
            </div>

            <div className="space-y-5 relative z-10">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E50914] font-bold">
                <Terminal size={14} />
                <span>Cast & Profile</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide leading-snug">
                I am{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-neutral-300 font-black">
                  AKASH JANGAM
                </span>
                , a MERN Stack Developer based in Hyderabad, India.
              </h3>

              <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
                Computer Science graduate with strong foundations in Data
                Structures and Algorithms, Object-Oriented Programming, software
                engineering, and problem solving.
              </p>

              <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
                Proficient in Python and JavaScript with hands-on experience
                building full-stack applications using React, Node.js,
                Express.js, and MongoDB. Experienced in developing REST APIs,
                authentication systems, database-driven workflows, debugging
                applications, and Git-based development.
              </p>
            </div>

            <div className="pt-8 flex flex-wrap items-center gap-2 relative z-10 border-t border-white/10 mt-6">
              <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80 flex items-center gap-1.5">
                <Code2 size={12} className="text-[#E50914]" /> Full-Stack MERN
              </span>
              <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80 flex items-center gap-1.5">
                <Cpu size={12} className="text-[#E50914]" /> REST APIs & Auth
              </span>
              <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80 flex items-center gap-1.5">
                <MapPin size={12} className="text-[#E50914]" /> Hyderabad, India
              </span>
              <a
                href="https://github.com/Akashjangam"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80 hover:text-white hover:border-[#E50914] transition-colors flex items-center gap-1.5"
              >
                <GithubIcon size={12} className="text-[#E50914]" /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/akashjangam/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80 hover:text-white hover:border-[#E50914] transition-colors flex items-center gap-1.5"
              >
                <LinkedinIcon size={12} className="text-[#E50914]" /> LinkedIn
              </a>
            </div>
          </div>

          {/* Card 2: Academic Foundations & Pedigree (Span 5) */}
          <div
            ref={addToRefs}
            className="md:col-span-5 p-8 md:p-10 bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl flex flex-col justify-between relative group hover:border-[#E50914]/60 transition-all duration-500 overflow-hidden"
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(229,9,20,0.14), transparent 70%)",
              }}
            ></div>

            <div className="absolute top-0 right-0 p-8 text-white/5 font-mono text-7xl font-black pointer-events-none select-none">
              02
            </div>

            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E50914] font-bold">
                <GraduationCap size={14} />
                <span>Academic Pedigree</span>
              </div>

              {/* Education Entry 1: IIT Mandi */}
              <div className="space-y-2 p-4 rounded-xl bg-black/40 border border-white/10 group-hover:border-[#E50914]/30 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#E50914] font-bold uppercase tracking-wider">
                    {educationData[0].shortName}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#E50914]/20 border border-[#E50914]/40 text-[#E50914] text-[10px] font-mono font-bold">
                    GPA {educationData[0].grade}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white leading-snug">
                  {educationData[0].institution}
                </h4>
                <p className="text-xs text-white/60 font-light">
                  {educationData[0].degree} ({educationData[0].period})
                </p>
              </div>

              {/* Education Entry 2: MRIET */}
              <div className="space-y-2 p-4 rounded-xl bg-black/40 border border-white/10 group-hover:border-[#E50914]/30 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#E50914] font-bold uppercase tracking-wider">
                    {educationData[1].shortName}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/10 border border-white/20 text-white/90 text-[10px] font-mono font-bold">
                    CGPA {educationData[1].grade}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white leading-snug">
                  {educationData[1].institution}
                </h4>
                <p className="text-xs text-white/60 font-light">
                  {educationData[1].degree} ({educationData[1].period})
                </p>
              </div>
            </div>

            <div className="pt-6 font-mono text-xs text-white/40 relative z-10 flex items-center justify-between border-t border-white/10 mt-4">
              <span>{"// RIGOROUS CS FOUNDATIONS"}</span>
              <span className="text-[#E50914]">ALGORITHMIC TRACK</span>
            </div>
          </div>

          {/* Card 3: Development Philosophy & Problem Solving (Span 6) */}
          <div
            ref={addToRefs}
            className="md:col-span-6 p-8 md:p-10 bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl flex flex-col justify-between relative group hover:border-[#E50914]/60 transition-all duration-500 overflow-hidden"
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(229,9,20,0.14), transparent 70%)",
              }}
            ></div>

            <div className="absolute top-0 right-0 p-8 text-white/5 font-mono text-7xl font-black pointer-events-none select-none">
              03
            </div>

            <div className="space-y-4 relative z-10">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E50914] font-bold">
                Philosophy & Standards
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Software Engineering Principles
              </h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                Prioritizing clean modular architecture, declarative state
                management, predictable database transactions, and comprehensive
                error handling. Every application is built with the Software
                Development Life Cycle (SDLC) best practices in mind.
              </p>
              <ul className="space-y-2 pt-2 text-xs font-mono text-white/80">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#E50914] shrink-0" />
                  <span>
                    Modular, maintainable & reusable component architecture
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#E50914] shrink-0" />
                  <span>Secure JWT token auth with role-based permissions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#E50914] shrink-0" />
                  <span>
                    Performance tuning, debugging & cross-browser compatibility
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 4: Technical Narrative & Workflows (Span 6) */}
          <div
            ref={addToRefs}
            className="md:col-span-6 p-8 md:p-10 bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl flex flex-col justify-between relative group hover:border-[#E50914]/60 transition-all duration-500 overflow-hidden"
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(229,9,20,0.14), transparent 70%)",
              }}
            ></div>

            <div className="absolute top-0 right-0 p-8 text-white/5 font-mono text-7xl font-black pointer-events-none select-none">
              04
            </div>

            <div className="space-y-4 relative z-10">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E50914] font-bold">
                Ecosystem & Tooling
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Modern Full-Stack Stack
              </h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                Seamlessly connecting client interfaces with backend logic
                through Postman API validation, Git branching strategies, and
                Linux environments for reproducible deployments.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono">
                <div className="p-3 rounded-lg bg-black/40 border border-white/10">
                  <div className="text-[#E50914] font-bold mb-1">LANGUAGES</div>
                  <div className="text-white/80">
                    Python, JavaScript ES6+, SQL
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-black/40 border border-white/10">
                  <div className="text-[#E50914] font-bold mb-1">
                    FOUNDATIONS
                  </div>
                  <div className="text-white/80">DSA, OOP, DBMS, SDLC</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
