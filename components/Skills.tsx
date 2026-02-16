
import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../types';

const skills: Skill[] = [
  { name: 'Python (Pandas, NumPy)', level: 95, category: 'Data' },
  { name: 'SQL (Joins, Subqueries)', level: 90, category: 'Data' },
  { name: 'Excel (Pivot, Lookups)', level: 92, category: 'Data' },
  { name: 'Classification Models', level: 85, category: 'ML' },
  { name: 'Evaluation (ROC-AUC)', level: 88, category: 'ML' },
  { name: 'Hugging Face / TensorFlow', level: 75, category: 'ML' },
  { name: 'Power BI (DAX)', level: 90, category: 'Visualization' },
  { name: 'Matplotlib / R-Viz', level: 82, category: 'Visualization' },
  { name: 'Gemini API', level: 80, category: 'Cloud' },
  { name: 'Git / GitHub', level: 85, category: 'Cloud' },
];

const Skills: React.FC = () => {
  const categories = ['Data', 'ML', 'Visualization', 'Cloud'];

  return (
    <section id="skills" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-4">Technical Proficiency</h2>
        <h3 className="text-4xl font-extrabold">Toolkit & Skills</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {categories.map((cat) => (
          <div key={cat}>
            <h4 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
              {cat === 'Cloud' ? 'APIs & Tools' : cat}
            </h4>
            <div className="space-y-8">
              {skills.filter(s => s.category === cat).map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">{skill.name}</span>
                    <span className="text-blue-500 font-bold">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
