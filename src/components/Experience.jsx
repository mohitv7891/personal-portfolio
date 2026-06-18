import React from 'react';
import ReadMore from './ReadMore';

const experienceData = [
  {
    company: 'TripFactory.com',
    role: 'SDE Intern',
    duration: 'Dec 2025 – June 2026',
    location: 'Bengaluru, India',
    bullets: [
      'Built a multi-brand hotel domain crawler using Playwright (headless Firefox) that dynamically discovers hotel section links at runtime — supporting 6 hotel chains across brand and country filter modes.',
      'Engineered a 3-strategy deep content extraction algorithm (sub-page traversal → in-page tab interaction → single-page fallback) producing granular per-entity JSON records across 6 content types.',
      'Implemented WAF/anti-bot bypass with exponential-backoff retry logic, enabling reliable content retrieval from bot-protected luxury hotel websites returning HTTP 403.',
      'Designed the Food Intelligence extraction pipeline — an LLM-backed ClaimAtom system with a 12-op schema registry and 30+ dining-specific enums for structured output.',
      'Developed the Itinerary Aggregation Engine — a multi-source vote-based pipeline with 4 specialist reducers producing confidence-scored destination profiles.',
    ],
    tech: ['Core Java', 'Playwright', 'LLM APIs', 'Apache Ant', 'Tomcat 9', 'Hibernate', 'REST API', 'Git'],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-20">
      {/* Section heading */}
      <div className="flex items-center gap-4 mb-10">
        <span className="text-teal-400 text-sm font-mono shrink-0">02.</span>
        <h2 className="text-xl font-bold text-slate-100 shrink-0">Work Experience</h2>
        <div className="flex-1 h-px bg-custom-border" />
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-0 top-2 bottom-0 w-px bg-custom-border" />

        {experienceData.map((job, i) => (
          <div key={i} className="relative pl-8 pb-4">
            {/* Timeline dot */}
            <div className="absolute -left-[5px] top-1.5 w-[11px] h-[11px] rounded-full border-2 border-teal-400 bg-custom-dark" />

            <div className="bg-custom-light-dark border border-custom-border rounded-xl p-6 hover:border-teal-400/30 transition-colors duration-300">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                <div>
                  <h3 className="text-slate-100 font-bold text-base">{job.company}</h3>
                  <p className="text-teal-400 text-sm mt-0.5">{job.role}</p>
                </div>
                <div className="text-xs text-slate-500 sm:text-right shrink-0">
                  <p className="text-slate-400">{job.duration}</p>
                  <p>{job.location}</p>
                </div>
              </div>

              <ReadMore collapsedClass="max-h-[5.5rem]" fromColor="#0C1628">
                <ul className="space-y-2 mb-4">
                  {job.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3 text-slate-400 text-xs leading-relaxed">
                      <span className="text-teal-400 mt-0.5 shrink-0">▹</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </ReadMore>

              <div className="flex flex-wrap gap-2 pt-3 border-t border-custom-border">
                {job.tech.map((t, j) => (
                  <span key={j} className="text-teal-300 bg-teal-400/10 border border-teal-400/20 text-[11px] px-2.5 py-0.5 rounded-full">
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

export default Experience;
