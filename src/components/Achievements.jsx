import React from 'react';

const achievements = [
  {
    metric: '97.19%',
    title: 'GATE 2024 Percentile',
    detail: 'GATE score of 558 among 1,23,967 CS/IT candidates.',
    accent: 'text-teal-400 border-teal-400/30 bg-teal-400/5',
  },
  {
    metric: '1613',
    title: 'LeetCode Rating',
    detail: '600+ problems solved across DSA and system design.',
    accent: 'text-amber-400 border-amber-400/30 bg-amber-400/5',
  },
  {
    metric: '4★',
    title: 'CodeChef Rating',
    detail: 'Max rating of 1817 through competitive programming.',
    accent: 'text-violet-400 border-violet-400/30 bg-violet-400/5',
  },
];

const Achievements = () => {
  return (
    <section id="achievements" className="py-20 md:pb-32">
      {/* Section heading */}
      <div className="flex items-center gap-4 mb-10">
        <span className="text-teal-400 text-sm font-mono shrink-0">06.</span>
        <h2 className="text-xl font-bold text-slate-100 shrink-0">Achievements</h2>
        <div className="flex-1 h-px bg-custom-border" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {achievements.map((item) => (
          <div
            key={item.title}
            className={`rounded-xl border p-6 text-center hover:-translate-y-1 transition-all duration-300 ${item.accent}`}
          >
            <p className="text-4xl font-bold mb-1">{item.metric}</p>
            <p className="text-slate-200 font-semibold text-sm mb-2">{item.title}</p>
            <p className="text-slate-500 text-xs leading-relaxed">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
