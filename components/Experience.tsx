
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';
import { Experience as ExpType } from '../types';

const education: ExpType[] = [
  {
    id: 'edu-1',
    role: 'Master of Computer Applications (MCA)',
    company: 'Bangalore Institute of Technology',
    period: '2025 - 2027',
    description: 'Pursuing post-graduation with focus on advanced computing and analytics.'
  },
  {
    id: 'edu-2',
    role: 'BCA – Data Analytics',
    company: 'St. Joseph’s University, Bengaluru',
    period: '2022 - 2025',
    description: 'Specialized in Data Analytics during undergraduate studies, building a core foundation in statistics and visualization.'
  }
];

const certifications = [
  'Data Analytics Essentials – Cisco',
  'Hands-on AI with TensorFlow – Infosys',
  'Introduction to MongoDB – MongoDB University',
  'Soft Skill Development – IIT Kharagpur'
];

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-6 bg-zinc-50 dark:bg-zinc-900/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-4">Milestones</h2>
          <h3 className="text-4xl font-extrabold">Education & Certs</h3>
        </div>

        <div className="relative space-y-12 mb-20">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 -translate-x-1/2 hidden md:block" />

          {education.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-white dark:border-zinc-950 -translate-x-1/2 z-10 hidden md:block" />

              <div className="w-full md:w-1/2">
                <div className={`glass-card p-8 rounded-3xl border border-white/10 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className={`flex items-center gap-3 mb-4 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                      <GraduationCap size={20} />
                    </div>
                    <span className="text-sm font-bold text-zinc-400">{exp.period}</span>
                  </div>
                  <h4 className="text-2xl font-bold mb-1">{exp.role}</h4>
                  <p className="text-blue-500 font-semibold mb-4">{exp.company}</p>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{exp.description}</p>
                </div>
              </div>
              <div className="hidden md:block w-1/2" />
            </motion.div>
          ))}
        </div>

        <div className="glass-card p-10 rounded-[2.5rem] border border-white/5">
          <h4 className="text-2xl font-bold mb-8 flex items-center gap-3">
             <Award className="text-blue-500" /> Key Certifications
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certifications.map((cert, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 5 }}
                className="flex items-start gap-3 p-4 bg-zinc-100/50 dark:bg-zinc-800/30 rounded-2xl"
              >
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2" />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{cert}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
