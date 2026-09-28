import { useState } from 'react';
import NetflixPreloader from './components/NetflixPreloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Expertise';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Global Desktop Custom Cursor & Red Ambient Spotlight */}
      <CustomCursor />

      <main className="bg-[#050505] min-h-screen text-white relative selection:bg-[#E50914] selection:text-white">
        {/* Cinematic Preloader */}
        {loading && <NetflixPreloader onComplete={() => setLoading(false)} />}

      {/* Sticky Cinematic Navbar */}
      <Navbar />

      {/* Complete Cinematic Developer Series Sections */}
      <Hero />
      <About />
      <Expertise />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </main>
  </>
);
}

export default App;
