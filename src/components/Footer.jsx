import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { MdOutlineMail } from 'react-icons/md';

const socialLinks = [
  { href: 'https://github.com/mohitv7891', icon: <FaGithub size={16} />, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/mohitvishwkarma/', icon: <FaLinkedin size={16} />, label: 'LinkedIn' },
  { href: 'https://x.com/mohitv7891', icon: <FaTwitter size={16} />, label: 'Twitter' },
  {
    href: 'https://mail.google.com/mail/?view=cm&to=mohitvishwakarma7891@gmail.com&su=Let%27s%20Collaborate!',
    icon: <MdOutlineMail size={16} />,
    label: 'Email',
  },
];

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
      {/* ── Main footer ── */}
      <footer className="border-t border-custom-border mt-8 bg-custom-dark">
        <div className="max-w-4xl mx-auto px-6 py-12">

          {/* Top row */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">

            {/* Brand */}
            <div>
              <a href="#" className="text-teal-400 font-bold tracking-widest text-lg">
                MV<span className="text-custom-border">.</span>
              </a>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                Mohit Vishwakarma
              </p>
              <p className="text-slate-600 text-xs mt-0.5">
                M.Tech Network &amp; Security · IIITA
              </p>
              <p className="text-slate-600 text-xs mt-0.5">
                SDE Intern @ TripFactory.com · Bengaluru
              </p>
            </div>

            {/* Contact */}
            <div>
              <p className="text-slate-500 text-[10px] font-bold tracking-widest uppercase mb-3">
                Connect
              </p>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    aria-label={link.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 border border-custom-border rounded-full flex items-center justify-center text-slate-500 hover:border-teal-400 hover:text-teal-400 transition-all duration-200"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
              <a
                href="https://mail.google.com/mail/?view=cm&to=mohitvishwakarma7891@gmail.com&su=Let%27s%20Collaborate!&body=Hi%20Mohit%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20collaborate%20with%20you.%0A%0ABest%20regards"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-xs bg-teal-400/10 border border-teal-400/30 text-teal-300 px-4 py-1.5 rounded-full hover:bg-teal-400/20 transition-colors"
              >
                Say Hello →
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-custom-border my-8" />

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[11px] text-slate-600">
            <span>© {new Date().getFullYear()} Mohit Vishwakarma · All rights reserved.</span>
            <span className="font-mono">
              Built with{' '}
              <span className="text-teal-500">React</span>
              {' · '}
              <span className="text-teal-500">Vite</span>
              {' · '}
              <span className="text-teal-500">Tailwind</span>
            </span>
          </div>
        </div>
      </footer>

      {/* ── Keyboard shortcut hint — desktop only, fixed bottom-right ── */}
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
