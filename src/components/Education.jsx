import React from 'react';

const educationData = [
  {
    institution: 'Indian Institute of Information Technology,Allahabad',
    degree: 'M.Tech in Network and Security',
    years: '2024 - 2026',
    score: 'CGPA: 7.54 / 10',
  },
  {
    institution: 'University Institute of Technology, RGPV, Bhopal',
    degree: 'B. Tech in Information Technology',
    years: '2019 - 2023',
    score: 'CGPA: 6.92 / 10',
  },
  {
    institution: 'Shubham Convent Higher Secondary School, Nasrullaganj',
    degree: 'Senior Secondary (Science)',
    years: '2016 - 2018',
    score: 'Percentage: 87%',
  },
];

const Education = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6">Education</h2>
        <div className="space-y-4">
          {educationData.map((edu, index) => (
            <div key={index} className="bg-custom-light-dark p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold">{edu.institution}</h3>
                <p className="text-sm text-slate-400">{edu.years}</p>
              </div>
              <p className="text-slate-300 my-1">{edu.degree}</p>
              <p className="text-slate-400">{edu.score}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;