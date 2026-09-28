import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);
  const watermarkRef = useRef(null);
  const formCardRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    permission: false
  });

  const [status, setStatus] = useState({
    submitted: false,
    error: '',
    successMessage: ''
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax translation for the giant background watermark
      if (watermarkRef.current) {
        gsap.to(watermarkRef.current, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
      }

      // Smooth entrance of the contact card
      if (formCardRef.current) {
        gsap.fromTo(
          formCardRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
    // Clear previous error upon editing
    if (status.error) {
      setStatus(prev => ({ ...prev, error: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Frontend validation
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setStatus({ submitted: false, error: 'Please enter both your first and last name.', successMessage: '' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      setStatus({ submitted: false, error: 'Please enter a valid email address.', successMessage: '' });
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setStatus({ submitted: false, error: 'Please enter a message of at least 10 characters.', successMessage: '' });
      return;
    }

    if (!formData.permission) {
      setStatus({ submitted: false, error: 'Please check the box granting permission to contact you.', successMessage: '' });
      return;
    }

    /*
     * NOTE: To integrate with a real email service, replace the block below with:
     * - Formspree: fetch('https://formspree.io/f/YOUR_FORM_ID', { method: 'POST', body: JSON.stringify(formData) })
     * - EmailJS: emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData, 'YOUR_PUBLIC_KEY')
     * - Custom Express Backend: fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
     */
    console.log('Form validated successfully. Payload:', formData);
    
    setStatus({
      submitted: true,
      error: '',
      successMessage: `Thank you ${formData.firstName}! Your message was recorded. Akash will reach out to ${formData.email} shortly.`
    });

    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      message: '',
      permission: false
    });
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="bg-[#0b0b0b] w-full min-h-screen relative overflow-hidden flex items-end pt-32 pb-0 border-t border-white/10 select-none"
    >
      {/* Background Red Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#E50914]/15 rounded-full blur-[170px] pointer-events-none z-0"></div>

      {/* Massive Background Parallax Typography */}
      <div
        ref={watermarkRef}
        className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center overflow-hidden pointer-events-none z-0 pt-10 md:pt-6 opacity-10"
      >
        <h1 
          className="text-[25vw] leading-[0.75] font-black text-[#E50914] uppercase tracking-tighter select-none scale-y-[1.5] origin-top font-netflix"
        >
          CONTACT
        </h1>
      </div>

      {/* Form Card Overlay */}
      <div className="relative z-10 w-full flex justify-end items-end">
        <div
          ref={formCardRef}
          className="bg-[#141414]/95 backdrop-blur-2xl border-t border-l border-white/15 w-full md:w-[92%] lg:w-[84%] p-8 md:p-14 text-white flex flex-col justify-between rounded-tl-[3rem] shadow-[0_-25px_60px_rgba(0,0,0,0.9)] relative overflow-hidden"
        >
          {/* Subtle top crimson highlight stripe */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#E50914] to-transparent opacity-90"></div>

          {/* Card Header & Contact Meta */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-white/10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E50914]/10 border border-[#E50914]/30 text-xs font-mono uppercase tracking-widest text-[#E50914]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-ping"></span>
                <span>{"EPISODE 06 // TRANSMIT SIGNAL"}</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-white font-netflix tracking-tight">
                GET IN TOUCH &bull; COLLABORATE
              </h3>
            </div>

            {/* Direct Contact Metadata */}
            <div className="flex flex-wrap gap-4 text-xs font-mono text-white/70">
              <a
                href="mailto:akashjangam66@gmail.com"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#E50914] hover:text-white transition-colors"
              >
                <Mail size={13} className="text-[#E50914]" />
                <span>akashjangam66@gmail.com</span>
              </a>
              <a
                href="tel:9848256694"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#E50914] hover:text-white transition-colors"
              >
                <Phone size={13} className="text-[#E50914]" />
                <span>+91 9848256694</span>
              </a>
              <a
                href="https://github.com/Akashjangam"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#E50914] hover:text-white transition-colors"
              >
                <GithubIcon size={13} className="text-[#E50914]" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/akashjangam/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#E50914] hover:text-white transition-colors"
              >
                <LinkedinIcon size={13} className="text-[#E50914]" />
                <span>LinkedIn</span>
              </a>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60">
                <MapPin size={13} className="text-[#E50914]" />
                <span>Hyderabad, Telangana, India</span>
              </div>
            </div>
          </div>

          {/* Status Messages */}
          {status.error && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs font-mono flex items-center gap-2.5">
              <AlertCircle size={16} className="text-red-400 shrink-0" />
              <span>{status.error}</span>
            </div>
          )}

          {status.submitted && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-xs font-mono flex items-center gap-2.5">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span>{status.successMessage}</span>
            </div>
          )}

          {/* Form Element */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-10 md:gap-14 w-full">
            <div className="flex flex-col md:flex-row gap-10 md:gap-16 w-full">
              
              {/* Left Column Inputs */}
              <div className="flex-1 flex flex-col gap-8">
                <div className="relative">
                  <label htmlFor="firstName" className="block text-[11px] font-mono text-white/50 uppercase tracking-widest mb-1">
                    First Name
                  </label>
                  <input 
                    type="text" 
                    id="firstName" 
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="e.g. Akash" 
                    required
                    className="w-full bg-transparent border-b border-white/20 pb-2 text-base md:text-lg focus:outline-none focus:border-[#E50914] transition-colors placeholder-white/30 font-medium rounded-none text-white"
                  />
                </div>

                <div className="relative">
                  <label htmlFor="lastName" className="block text-[11px] font-mono text-white/50 uppercase tracking-widest mb-1">
                    Last Name
                  </label>
                  <input 
                    type="text" 
                    id="lastName" 
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="e.g. Jangam" 
                    required
                    className="w-full bg-transparent border-b border-white/20 pb-2 text-base md:text-lg focus:outline-none focus:border-[#E50914] transition-colors placeholder-white/30 font-medium rounded-none text-white"
                  />
                </div>

                <div className="relative">
                  <label htmlFor="email" className="block text-[11px] font-mono text-white/50 uppercase tracking-widest mb-1">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com" 
                    required
                    className="w-full bg-transparent border-b border-white/20 pb-2 text-base md:text-lg focus:outline-none focus:border-[#E50914] transition-colors placeholder-white/30 font-medium rounded-none text-white"
                  />
                </div>
              </div>

              {/* Right Column: Message */}
              <div className="flex-1 flex flex-col">
                <label htmlFor="message" className="block text-[11px] font-mono text-white/50 uppercase tracking-widest mb-1">
                  Message / Project Requirement
                </label>
                <div className="relative h-full flex flex-col">
                  <textarea 
                    id="message" 
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, team, or opportunity..." 
                    required
                    className="w-full h-full min-h-[140px] md:min-h-[180px] bg-transparent border-b border-white/20 pb-2 text-base focus:outline-none focus:border-[#E50914] transition-colors placeholder-white/30 font-medium resize-none rounded-none text-white"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Bottom Row: Permission Checkbox & Action Button */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pt-6 border-t border-white/10">
              
              {/* Checkbox */}
              <div className="flex items-start gap-3 text-xs font-light text-white/75">
                <input 
                  type="checkbox" 
                  id="permission" 
                  checked={formData.permission}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 rounded border-white/30 bg-black text-[#E50914] focus:ring-0 focus:ring-offset-0 cursor-pointer" 
                  style={{ accentColor: "#E50914" }}
                />
                <label htmlFor="permission" className="cursor-pointer max-w-sm leading-snug">
                  I give permission to contact me at this email address regarding developer opportunities or project collaborations.
                </label>
              </div>

              {/* Send Button */}
              <button 
                type="submit" 
                className="w-full md:w-auto px-8 py-3.5 rounded bg-[#E50914] text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-[#b80710] transition-all duration-300 group whitespace-nowrap shadow-[0_0_20px_rgba(229,9,20,0.6)] hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Send Message</span>
                <Send size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>

            </div>
          </form>

        </div>
      </div>
    </section>
  );
};

export default Contact;
