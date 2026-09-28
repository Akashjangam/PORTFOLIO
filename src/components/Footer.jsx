import { Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] text-white py-16 px-6 md:px-12 border-t border-white/10 select-none relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col space-y-12">
        
        {/* Top Section: Brand & Quick Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-10 border-b border-white/10">
          <div className="space-y-2">
            <div className="text-3xl font-black text-[#E50914] tracking-tighter flex items-center gap-2 drop-shadow-[0_2px_15px_rgba(229,9,20,0.8)] font-netflix">
              AKASH.<span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
            </div>
            <p className="text-xs font-mono text-white/50 tracking-widest uppercase">
              {"// MERN STACK DEVELOPER"} &bull; HYDERABAD, INDIA
            </p>
          </div>

          {/* Quick Navigation Links */}
          <nav className="flex flex-wrap gap-5 sm:gap-8 text-xs font-mono uppercase tracking-widest text-white/70">
            <a href="#home" className="hover:text-[#E50914] transition-colors">Home</a>
            <a href="#about" className="hover:text-[#E50914] transition-colors">About</a>
            <a href="#expertise" className="hover:text-[#E50914] transition-colors">Expertise</a>
            <a href="#skills" className="hover:text-[#E50914] transition-colors">Skills</a>
            <a href="#projects" className="hover:text-[#E50914] transition-colors">Projects</a>
            <a href="#experience" className="hover:text-[#E50914] transition-colors">Experience</a>
            <a href="#education" className="hover:text-[#E50914] transition-colors">Education</a>
            <a href="#contact" className="hover:text-[#E50914] transition-colors">Contact</a>
          </nav>
        </div>

        {/* Middle Section: Socials & Location Details */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs font-mono text-white/60">
          <div className="flex flex-wrap items-center gap-6">
            {/* Update the href below with your real GitHub URL */}
            <a 
              href="https://github.com/Akashjangam" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-[#E50914] transition-colors uppercase tracking-wider flex items-center gap-1.5"
            >
              <GithubIcon size={14} className="text-[#E50914]" />
              <span>GitHub {"//"}</span>
            </a>

            <a 
              href="https://www.linkedin.com/in/akashjangam/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-[#E50914] transition-colors uppercase tracking-wider flex items-center gap-1.5"
            >
              <LinkedinIcon size={14} className="text-[#E50914]" />
              <span>LinkedIn {"//"}</span>
            </a>

            <a 
              href="mailto:akashjangam66@gmail.com" 
              className="hover:text-[#E50914] transition-colors uppercase tracking-wider flex items-center gap-1.5"
            >
              <Mail size={14} className="text-[#E50914]" />
              <span>Email {"//"}</span>
            </a>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-white/40 tracking-widest uppercase">
              LOCATION: HYDERABAD, TELANGANA, IN
            </span>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/5 border border-white/10 hover:border-[#E50914] hover:text-[#E50914] transition-colors"
              aria-label="Scroll back to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        {/* Bottom Copyright & Tagline */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-white/5 text-[11px] font-mono text-white/40 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} AKASH JANGAM. ALL RIGHTS RESERVED.</p>
          <p className="text-[#E50914]/80">STREAMING WORLDWIDE &bull; BUILT WITH REACT, TAILWIND & GSAP</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
