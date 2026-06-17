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
      'WhatsApp bot that concurrently scrapes Blinkit and Zepto to compare grocery prices and find the cheapest complete cart — send your list, get the best deal.',
    tech: ['Java', 'Spring Boot', 'Playwright', 'OpenAI', 'PostgreSQL', 'Twilio'],
    github: 'https://github.com/mohitv7891/BasketIQ-WhatsApp',
    live: null,
  },
  {
    title: 'Personal Finance Assistant',
    description:
      'Web app to track expenses and spending patterns with AI-powered receipt scanning (OCR), visual analytics, and JWT-secured accounts.',
    tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'JWT', 'Mindee OCR'],
    github: 'https://github.com/mohitv7891/Personal-Finance-Assistant',
    live: 'https://finance-app-frontend-52wb.onrender.com',
  },
  {
    title: 'SecureDocs',
    description:
      'Secure document-sharing platform with a decoupled Key Distribution Center and Data Storage Server. Uses Identity-Based Encryption (IBE) and Digital Signatures via OpenSSL and WebAssembly.',
    tech: ['Node.js', 'Express.js', 'React.js', 'MongoDB', 'AES', 'IBE', 'OpenSSL', 'WebAssembly', 'JWT'],
    github: 'https://github.com/mohitv7891/secureDocs',
    live: null,
  },
  {
    title: 'Secure Message Transmission (RSA & AES)',
    description:
      'Command-line secure communication protocol using RSA for key exchange and digital signatures, and AES-256 for symmetric encryption of large datasets, implemented with Crypto++.',
    tech: ['Bash', 'Unix/Linux', 'OpenSSL', 'RSA', 'AES-256', 'Digital Signatures', 'Crypto++'],
    github: 'https://github.com/mohitv7891/crypto--_assignment',
    live: null,
  },
];

const Projects = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectData.map((project, index) => (
            <div key={index} className="bg-custom-light-dark p-6 rounded-lg shadow-lg flex flex-col">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-xl font-semibold leading-snug">{project.title}</h3>
                <div className="flex items-center gap-2 shrink-0 mt-1">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white transition-colors"
                      aria-label="GitHub"
                    >
                      <FaGithub size={18} />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white transition-colors"
                      aria-label="Live Demo"
                    >
                      <FaExternalLinkAlt size={15} />
                    </a>
                  )}
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed flex-grow">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tech.map((tech, i) => (
                  <span key={i} className="bg-slate-200 text-slate-900 px-3 py-1 text-xs font-semibold rounded-md">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
