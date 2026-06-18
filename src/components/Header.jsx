import React from 'react';
import profilePic from '../assets/profile.jpeg';
import { MdOutlineMail, MdOutlinePhone } from 'react-icons/md';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';

const socialLinks = [
  { href: 'mailto:mohitvishwakarma7891@gmail.com', icon: <MdOutlineMail size={16} />, label: 'Email' },
  { href: 'tel:+919826403071', icon: <MdOutlinePhone size={16} />, label: 'Phone' },
  { href: 'https://github.com/mohitv7891', icon: <FaGithub size={16} />, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/mohitvishwkarma/', icon: <FaLinkedin size={16} />, label: 'LinkedIn' },
  { href: 'https://x.com/mohitv7891', icon: <FaTwitter size={16} />, label: 'Twitter' },
];

const Header = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">

      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-teal-500/5 blur-3xl pointer-events-none" />

      {/* Profile photo */}
      <div className="relative mb-7">
        <div className="absolute inset-0 rounded-full bg-teal-400/20 blur-xl scale-125 pointer-events-none" />
        <div className="relative p-[3px] rounded-full bg-gradient-to-br from-teal-400 via-teal-600 to-slate-700">
          <div className="p-[3px] rounded-full bg-custom-dark">
            <img
              src={profilePic}
              alt="Mohit Vishwakarma"
              className="w-32 h-32 rounded-full object-cover grayscale"
            />
          </div>
        </div>
      </div>

      {/* Greeting */}
      <p className="text-teal-400 text-sm tracking-[0.2em] font-mono mb-3">&gt; whoami</p>

      {/* Name */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-200 to-teal-300 mb-2">
        Mohit Vishwakarma
      </h1>

      {/* Role pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        <a
            href="https://mail.google.com/mail/?view=cm&to=mohitvishwakarma7891@gmail.com&su=Let's%20Collaborate!&body=Hi%20Mohit%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20collaborate%20with%20you.%0A%0AHere's%20what%20I%20have%20in%20mind%3A%0A%0A%5BYour%20message%20here%5D%0A%0ALooking%20forward%20to%20hearing%20from%20you!%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-teal-400/10 border border-teal-400/20 text-teal-300 text-xs px-3 py-1 rounded-full hover:bg-teal-400/20 hover:border-teal-400/50 transition-colors cursor-pointer"
          >
            #OpenToCollaborate
          </a>
        <span className="bg-slate-800/60 border border-custom-border text-slate-400 text-xs px-3 py-1 rounded-full">Engineering @ TripFactory.com</span>
        <span className="bg-slate-800/60 border border-custom-border text-slate-400 text-xs px-3 py-1 rounded-full">IIITA</span>
      </div>

      {/* Terminal snippet */}
      <div className="bg-custom-light-dark border border-custom-border rounded-lg px-5 py-3 mb-7 text-left text-xs text-slate-400 font-mono w-full max-w-sm">
        <span className="text-teal-400">const</span>
        <span className="text-slate-300"> mohit </span>
        <span className="text-teal-400">=</span>
        <span className="text-slate-300"> &#123;</span>
        <br />
        <span className="pl-4 text-slate-500">currently : </span>
        <span className="text-amber-300">&quot;shipping AI @ TripFactory&quot;</span>
        <span className="text-slate-300">,</span>
        <br />
        <span className="pl-4 text-slate-500">vibe      : </span>
        <span className="text-amber-300">&quot;build · break · secure · repeat&quot;</span>
        <span className="text-slate-300">,</span>
        <br />
        <span className="pl-4 text-slate-500">open_to   : </span>
        <span className="text-amber-300">&quot;collab, coffee &amp; cool ideas ☕&quot;</span>
        <br />
        <span className="text-slate-300">&#125;</span>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-7">
        <IoLocationOutline size={13} />
        <span>Bengaluru, Karnataka, India</span>
      </div>

      {/* Social + CTA */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {socialLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            aria-label={link.label}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="w-9 h-9 border border-custom-border rounded-full flex items-center justify-center text-slate-400 hover:border-teal-400 hover:text-teal-300 hover:bg-teal-400/5 transition-all duration-200"
          >
            {link.icon}
          </a>
        ))}
        <a
          href="https://mail.google.com/mail/?view=cm&to=mohitvishwakarma7891@gmail.com&su=Let's%20Collaborate!&body=Hi%20Mohit%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20collaborate%20with%20you.%0A%0AHere's%20what%20I%20have%20in%20mind%3A%0A%0A%5BYour%20message%20here%5D%0A%0ALooking%20forward%20to%20hearing%20from%20you!%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 bg-teal-400 text-custom-dark text-xs font-bold px-5 py-2 rounded-full hover:bg-teal-300 transition-colors"
        >
          Collaborate
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600 text-xs">
        <span className="tracking-widest uppercase text-[10px]">scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-slate-600 to-transparent" />
      </div>

    </section>
  );
};

export default Header;
