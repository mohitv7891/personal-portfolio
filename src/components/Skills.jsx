import React from 'react';

const skillsList = [
  'JavaScript', 'C/C++', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 
  'HTML/CSS', 'MySql', 'Git/Github', 'Docker', 'DataStructures/Algorithms'
];

const Skills = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skillsList.map((skill, index) => (
            <span 
              key={index} 
              className="bg-slate-200 text-slate-900 px-3 py-1 text-sm font-semibold rounded-md"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;