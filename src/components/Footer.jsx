import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [keySymbol, setKeySymbol] = useState('⌘');

  useEffect(() => {
    if (/Mac|iPod|iPhone|iPad/.test(window.navigator.platform)) {
      setKeySymbol('⌘');
    } else {
      setKeySymbol('Ctrl');
    }
  }, []);

  return (
    <>
      <footer className="border-t border-custom-border py-8">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <span>
            <span className="text-teal-400 font-bold tracking-widest">MV.</span>
            {' '}© {new Date().getFullYear()} Mohit Vishwakarma
          </span>
          <span className="font-mono">
            Built with{' '}
            <span className="text-teal-500">React</span>
            {' · '}
            <span className="text-teal-500">Vite</span>
            {' · '}
            <span className="text-teal-500">Tailwind</span>
          </span>
        </div>
      </footer>

      {/* Keyboard shortcut hint — desktop only */}
      <div className="hidden md:flex fixed bottom-4 right-6 items-center gap-2 text-xs text-slate-600">
        Press{' '}
        <kbd className="px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 bg-slate-800 border border-slate-700 rounded">
          {keySymbol} J
        </kbd>{' '}
        for quick nav
      </div>
    </>
  );
};

export default Footer;
