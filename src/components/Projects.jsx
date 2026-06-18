import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projectData = [
  {
    title: 'IntelliVibe — AI Hiring Platform',
    description:
      'Full-stack MERN app that automates the hiring pipeline with a real-time AI video interview system and an AI-powered resume screening engine.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Google Gemini', 'Socket.IO'],
    github: 'https://github.com/mohitv7891/IntelliVibe',
    live: null,
  },
  {
    title: 'BasketIQ — WhatsApp Grocery Bot',
    description:
      'WhatsApp bot that concurrently scrapes Blinkit and Zepto to compare grocery prices and find the cheapest complete cart from your shopping list.',
    tech: ['Java', 'Spring Boot', 'Playwright', 'OpenAI', 'PostgreSQL', 'Twilio'],
    github: 'https://github.com/mohitv7891/BasketIQ-WhatsApp',
    live: null,
  },
  {
    title: 'Personal Finance Assistant',
    description:
      'Web app to track expenses with AI-powered receipt scanning (OCR), visual analytics charts, and JWT-secured accounts.',
    tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'JWT', 'Mindee OCR'],
    github: 'https://github.com/mohitv7891/Personal-Finance-Assistant',
    live: 'https://finance-app-frontend-52wb.onrender.com',
  },
  {
    title: 'SecureDocs',
    description:
      'Secure document-sharing platform with a decoupled Key Distribution Center. Uses Identity-Based Encryption (IBE) and Digital Signatures via OpenSSL and WebAssembly.',
    tech: ['Node.js', 'Express.js', 'React.js', 'MongoDB', 'AES', 'IBE', 'OpenSSL', 'WebAssembly', 'JWT'],
    github: 'https://github.com/mohitv7891/secureDocs',
    live: null,
  },
  {
    title: 'Secure Message Transmission (RSA & AES)',
    description:
      'Command-line secure communication protocol using RSA for key exchange and digital signatures, and AES-256 for symmetric encryption, implemented with Crypto++.',
    tech: ['Bash', 'Unix/Linux', 'OpenSSL', 'RSA', 'AES-256', 'Digital Signatures', 'Crypto++'],
    github: 'https://github.com/mohitv7891/crypto--_assignment',
    live: null,
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-20">
      {/* Section heading */}
      <div className="flex items-center gap-4 mb-10">
        <span className="text-teal-400 text-sm font-mono shrink-0">05.</span>
        <h2 className="text-xl font-bold text-slate-100 shrink-0">Projects</h2>
        <div className="flex-1 h-px bg-custom-border" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projectData.map((project, i) => (
          <div
            key={i}
            className="group relative bg-custom-light-dark border border-custom-border rounded-xl overflow-hidden flex flex-col hover:-translate-y-1 hover:border-teal-400/30 hover:shadow-lg hover:shadow-teal-900/20 transition-all duration-300"
          >
            {/* Top accent bar */}
            <div className="h-[2px] w-full bg-gradient-to-r from-teal-500/60 via-teal-400/30 to-transparent" />

            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="text-slate-100 font-semibold text-sm leading-snug group-hover:text-teal-300 transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 shrink-0">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="text-slate-500 hover:text-teal-400 transition-colors"
                    >
                      <FaGithub size={16} />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Live Demo"
                      className="text-slate-500 hover:text-teal-400 transition-colors"
                    >
                      <FaExternalLinkAlt size={13} />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-slate-400 text-xs leading-relaxed flex-1">{project.description}</p>

              <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-custom-border">
                {project.tech.map((t, j) => (
                  <span key={j} className="text-teal-300 bg-teal-400/10 text-[11px] px-2 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
