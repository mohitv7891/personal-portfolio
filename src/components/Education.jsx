import React from 'react';

const educationData = [
  {
    institution: 'Indian Institute of Information Technology, Allahabad (IIITA)',
    degree: 'M.Tech in Network and Security',
    years: '2024 – 2026',
    score: 'CGPA: 7.54 / 10',
  },
  {
    institution: 'University Institute of Technology, RGPV, Bhopal',
    degree: 'B.Tech in Information Technology',
    years: '2019 – 2023',
    score: 'CGPA: 6.92 / 10',
  },
  {
    institution: 'Shubham Convent Higher Secondary School, Nasrullaganj',
    degree: 'Senior Secondary (Science)',
    years: '2016 – 2018',
    score: 'Percentage: 87%',
  },
];

const Education = () => {
  return (
    <section id="education" className="py-20">
      {/* Section heading */}
      <div className="flex items-center gap-4 mb-10">
        <span className="text-teal-400 text-sm font-mono shrink-0">03.</span>
        <h2 className="text-xl font-bold text-slate-100 shrink-0">Education</h2>
        <div className="flex-1 h-px bg-custom-border" />
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-0 top-2 bottom-0 w-px bg-custom-border" />

        {educationData.map((edu, i) => (
          <div key={i} className="relative pl-8 pb-6 last:pb-0">
            <div className="absolute -left-[5px] top-1.5 w-[11px] h-[11px] rounded-full border-2 border-slate-600 bg-custom-dark" />

            <div className="bg-custom-light-dark border border-custom-border rounded-xl p-5 hover:border-slate-600 transition-colors duration-300">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                <div>
                  <h3 className="text-slate-200 font-semibold text-sm leading-snug">{edu.institution}</h3>
                  <p className="text-slate-400 text-xs mt-1">{edu.degree}</p>
                </div>
                <div className="text-xs text-slate-500 sm:text-right shrink-0 mt-1 sm:mt-0">
                  <p>{edu.years}</p>
                  <p className="text-teal-400 mt-0.5 font-medium">{edu.score}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
