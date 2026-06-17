/*
import React from 'react';
import Header from './components/Header';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';

function App() {
  return (
    <main className="min-h-screen px-4 md:px-0 pb-20">
      <div className="max-w-3xl mx-auto">
        <Header />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Projects />
      </div>
    </main>
  );
}

export default App;

*/

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Live from './components/Live';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import CommandMenu from './components/CommandMenu';
import Footer from './components/Footer';

function App() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      {/* Banner — scrolls with page */}
      <div className="w-full text-center py-2.5 text-sm bg-orange-950/60 border-b border-orange-900/40 text-orange-200 tracking-widest select-none">
        🚩 &nbsp; जय हनुमान &nbsp; 🚩
      </div>
      <Navbar />
      <main className="min-h-screen pt-14">
        {/* Hero — full viewport, no side padding constraint */}
        <Header />

        {/* Content sections — constrained width */}
        <div className="max-w-4xl mx-auto px-6">
          <Live />
          <About />
          <Experience />
          <Education />
          <Skills />
          <Projects />
          <Achievements />
        </div>
      </main>

      <CommandMenu open={open} setOpen={setOpen} />
      <Footer />
    </>
  );
}

export default App;