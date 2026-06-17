import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20">
      {/* Section heading */}
      <div className="flex items-center gap-4 mb-10">
        <span className="text-teal-400 text-sm font-mono shrink-0">01.</span>
        <h2 className="text-xl font-bold text-slate-100 shrink-0">About Me</h2>
        <div className="flex-1 h-px bg-custom-border" />
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        <p className="text-slate-400 leading-8 text-sm max-w-2xl">
          M.Tech student in{' '}
          <span className="text-teal-300">Network and Security</span> at IIITA, and SDE Intern at{' '}
          <span className="text-teal-300">TripFactory.com</span>, where I build AI-powered hotel,
          dining, and itinerary intelligence systems using Core Java, Playwright, and LLM APIs.
          <br /><br />
          I have a strong foundation in{' '}
          <span className="text-teal-300">backend engineering</span>,{' '}
          <span className="text-teal-300">cryptography</span> (AES, RSA, IBE, OpenSSL), and
          full-stack development with React, Node.js, and Express. I ranked in the{' '}
          <span className="text-teal-300">97.19 percentile</span> in GATE 2024 and am passionate
          about solving complex problems at the intersection of security, systems, and intelligent
          automation.
        </p>

        {/* Quick stats */}
        <div className="grid grid-cols-3 md:flex md:flex-col gap-4 shrink-0">
          {[
            { value: '600+', label: 'DSA Problems' },
            { value: '97.19%', label: 'GATE 2024' },
            { value: '1613', label: 'LeetCode Rating' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-custom-light-dark border border-custom-border rounded-lg px-3 py-4 text-center"
            >
              <p className="text-teal-400 text-2xl font-bold">{stat.value}</p>
              <p className="text-slate-500 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
