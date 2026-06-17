import React from 'react';

const experienceData = [
  {
    company: 'TripFactory.com',
    role: 'SDE Intern',
    duration: 'Dec 2025 – June 2026',
    location: 'Bengaluru, India',
    bullets: [
      'Built a multi-brand hotel domain crawler using Playwright (headless Firefox) that dynamically discovers hotel section links at runtime — eliminating all hard-coded URL maps — supporting 6 hotel chains (NH Hotels, Anantara, AVANI, Niyama, Naladhu; IHG, Hilton, Taj) across brand and country filter modes.',
      'Engineered a 3-strategy deep content extraction algorithm (sub-page traversal → in-page tab interaction → single-page fallback) producing granular per-entity JSON records across 6 content types (ROOM, DINING, EXPERIENCE, OFFER, EVENT, LOGISTICS).',
      'Implemented WAF/anti-bot bypass with exponential-backoff retry logic in PlaywrightPageHelper, enabling reliable content retrieval from bot-protected luxury hotel websites returning HTTP 403 on direct access.',
      'Designed the Food Intelligence extraction pipeline — an LLM-backed ClaimAtom system with a 12-op schema registry and 30+ dining-specific enums enforcing strict machine-readable structured output from raw dining text.',
      'Developed the Itinerary Aggregation Engine — a multi-source vote-based pipeline that chunks raw itinerary pages, extracts atomic signals via LLM, and reduces them through 4 specialist reducers into confidence-scored destination profiles.',
    ],
    tech: ['Core Java', 'Playwright', 'LLM APIs', 'Apache Ant', 'Tomcat 9', 'Hibernate', 'REST API', 'Git'],
  },
];

const Experience = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6">Work Experience</h2>
        <div className="flex flex-col gap-6">
          {experienceData.map((job, index) => (
            <div key={index} className="bg-custom-light-dark p-6 rounded-lg shadow-lg">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                <div>
                  <h3 className="text-xl font-semibold">{job.company}</h3>
                  <p className="text-lg font-medium text-teal-300 mt-0.5">{job.role}</p>
                </div>
                <div className="text-sm text-slate-400 sm:text-right shrink-0">
                  <p>{job.duration}</p>
                  <p>{job.location}</p>
                </div>
              </div>
              <ul className="mt-4 space-y-2 list-disc list-inside text-slate-400 text-sm leading-relaxed">
                {job.bullets.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mt-4">
                {job.tech.map((t, i) => (
                  <span key={i} className="bg-slate-200 text-slate-900 px-2 py-0.5 text-xs font-semibold rounded-md">
                    {t}
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

export default Experience;
