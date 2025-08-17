
import React from 'react';

const Experience = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6">Work Experience</h2>
        <div className="bg-custom-light-dark p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-semibold">Cixcent Technologies <span className="text-sm text-slate-400">(Intern)</span></h3>
            <p className="text-sm text-slate-400">May 2023 - Aug 2023</p>
          </div>
          <p className="text-lg font-semibold my-1">Software Engineer Intern</p>
          <p className="text-slate-400">
            Developed and maintained a SaaS application, working on both frontend (React, TypeScript) and backend (Node.js, Express). Delivered scalable and user-friendly features, and ensured 99% bug-free delivery.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Experience;