import React from 'react';

const skillGroups = [
  {
    label: 'Languages',
    color: 'text-violet-300 bg-violet-400/10 border-violet-400/20',
    skills: ['C++', 'C', 'Java', 'JavaScript', 'Node.js'],
  },
  {
    label: 'Frameworks',
    color: 'text-blue-300 bg-blue-400/10 border-blue-400/20',
    skills: ['React.js', 'Next.js', 'Express.js'],
  },
  {
    label: 'Databases',
    color: 'text-amber-300 bg-amber-400/10 border-amber-400/20',
    skills: ['MySQL', 'MongoDB', 'PostgreSQL'],
  },
  {
    label: 'Tools',
    color: 'text-pink-300 bg-pink-400/10 border-pink-400/20',
    skills: ['Git', 'Linux', 'Postman', 'Swagger', 'Prisma', 'JWT'],
  },
  {
    label: 'Security & Crypto',
    color: 'text-teal-300 bg-teal-400/10 border-teal-400/20',
    skills: ['OpenSSL', 'Crypto++', 'AES', 'RSA', 'IBE'],
  },
  {
    label: 'Concepts',
    color: 'text-slate-300 bg-slate-400/10 border-slate-400/20',
    skills: ['DSA', 'DBMS', 'Operating Systems', 'OOP', 'Computer Networks', 'Cryptography'],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20">
      {/* Section heading */}
      <div className="flex items-center gap-4 mb-10">
        <span className="text-teal-400 text-sm font-mono shrink-0">04.</span>
        <h2 className="text-xl font-bold text-slate-100 shrink-0">Skills</h2>
        <div className="flex-1 h-px bg-custom-border" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {skillGroups.map((group) => (
          <div
            key={group.label}
            className="bg-custom-light-dark border border-custom-border rounded-xl p-5 hover:border-slate-600 transition-colors duration-300"
          >
            <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-3">
              {group.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className={`text-xs px-2.5 py-1 rounded-full border font-medium ${group.color}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
