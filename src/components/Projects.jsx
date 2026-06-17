import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projectData = [
  {
    title: 'SecureDocs',
    description:
      'A secure web platform for sharing confidential documents. Architected a decoupled backend separating the Key Distribution Center from the Data Storage Server — preventing any single component from accessing both encrypted files and decryption keys. Implemented Identity-Based Encryption (IBE) and Digital Signatures in C using OpenSSL and WebAssembly for secure transmission and verifiable sender identity.',
    tech: ['Node.js', 'Express.js', 'React.js', 'MongoDB', 'AES', 'PBKDF2', 'IBE', 'OpenSSL', 'WebAssembly', 'JWT'],
    github: 'https://github.com/mohitv7891',
    live: null,
  },
  {
    title: 'Secure Message Transmission Protocol using RSA & AES',
    description:
      'Designed a secure communication protocol using RSA for key exchange and digital signatures, and AES-256 for symmetric encryption of large datasets. Implemented key generation, encryption/decryption, digital signatures, and signature verification using Crypto++ on the Unix/Linux command line.',
    tech: ['Bash', 'Unix/Linux', 'OpenSSL', 'RSA', 'AES-256', 'Public-key Cryptography', 'Digital Signatures', 'Crypto++'],
    github: 'https://github.com/mohitv7891',
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
