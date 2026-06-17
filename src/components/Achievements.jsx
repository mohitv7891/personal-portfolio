import React from 'react';

const achievementsList = [
  {
    title: 'GATE 2024 — 97.19 Percentile',
    detail: 'Scored a GATE score of 558 among 1,23,967 candidates in the CS/IT exam.',
  },
  {
    title: 'LeetCode — Rating 1613',
    detail: '600+ problems solved across data structures, algorithms, and system design topics.',
  },
  {
    title: 'CodeChef — 4-Star (Max Rating: 1817)',
    detail: 'Earned a 4-star rating through consistent competitive programming performance.',
  },
];

const Achievements = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6">Achievements</h2>
        <div className="flex flex-col gap-3">
          {achievementsList.map((item, index) => (
            <div key={index} className="bg-custom-light-dark p-4 rounded-lg flex items-start gap-4">
              <span className="mt-1 w-2 h-2 rounded-full bg-teal-400 shrink-0" />
              <div>
                <p className="font-semibold text-white">{item.title}</p>
                <p className="text-slate-400 text-sm mt-0.5">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
