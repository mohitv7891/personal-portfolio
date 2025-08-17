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
import Header from './components/Header';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import CommandMenu from './components/CommandMenu'; // Import CommandMenu
import Footer from './components/Footer'; // Import Footer

function App() {
  const [open, setOpen] = useState(false);

  // Effect to listen for keydown events
  useEffect(() => {
    const down = (e) => {
      // Check for Cmd/Ctrl + J
      if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

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
      
      {/* Render the command menu and footer */}
      <CommandMenu open={open} setOpen={setOpen} />
      <Footer />
    </main>
  );
}

export default App;