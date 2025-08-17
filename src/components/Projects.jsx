import React from 'react';

const projectData = [
  {
    title: 'IntelliVibe - AI-Powered Hiring Platform',
    description: 'A full-stack MERN application to automate the hiring pipeline, featuring a real-time, conversational AI video interview system and an AI-powered resume screening engine.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Google Gemini', 'Socket.IO'],
  },
  {
    title: 'SecureDocs',
    description: 'A full-stack secure document sharing platform using Identity-Based Encryption (IBE) with a core crypto-engine in C++ compiled to WebAssembly for 20x faster client-side encryption.',
    tech: ['React', 'Node.js', 'C++', 'WebAssembly', 'IBE'],
  },
  // You can add more projects here
];

const Projects = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectData.map((project, index) => (
            <div key={index} className="bg-custom-light-dark p-6 rounded-lg shadow-lg flex flex-col">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                {project.title}
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full ml-2"></span>
              </h3>
              <p className="text-slate-400 flex-grow">{project.description}</p>
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