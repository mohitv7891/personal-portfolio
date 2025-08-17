import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [keySymbol, setKeySymbol] = useState('⌘');

  useEffect(() => {
    // Set the correct key symbol based on the OS
    if (typeof window !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(window.navigator.platform)) {
      setKeySymbol('⌘');
    } else {
      setKeySymbol('Ctrl');
    }
  }, []);

  return (
    <footer className="fixed bottom-0 left-0 
    w-full flex items-center justify-center p-4 bg-custom-dark">
      <div className="text-xs text-slate-500">
        Press{' '}
        <kbd className="px-2 py-1.5 text-xs font-semibold text-slate-400 bg-slate-800 border border-slate-700 rounded-lg">
          {keySymbol} J
        </kbd>{' '}
        to open the command menu
      </div>
    </footer>
  );
};

export default Footer;