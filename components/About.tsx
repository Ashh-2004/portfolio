
import React from 'react';
import { motion } from 'framer-motion';
import { Database, TrendingUp, Cpu, PieChart } from 'lucide-react';

const About: React.FC = () => {
  const cards = [
    { icon: <Database className="text-blue-500" />, title: 'Data Cleaning', desc: 'Expertise in SQL and Python for handling real-world noisy datasets.' },
    { icon: <Cpu className="text-purple-500" />, title: 'Predictive Modeling', desc: 'Implementing classification and regression using Scikit-learn.' },
    { icon: <TrendingUp className="text-indigo-500" />, title: 'Statistical Insight', desc: 'Hypothesis testing and descriptive statistics to drive decisions.' },
    { icon: <PieChart className="text-emerald-500" />, title: 'Visualization', desc: 'Interactive dashboards with Power BI and Matplotlib.' },
  ];

  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-4">Professional Summary</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">
            Building end-to-end <span className="text-zinc-500">analytics</span> with <span className="text-indigo-500 underline decoration-indigo-500/30 underline-offset-8">impactful results</span>.
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-8">
            I am an MCA student with strong hands-on experience in Python, SQL, Power BI, and Excel. I specialize in building data pipelines and machine learning models that solve real business problems, from churn prediction to LLM-powered support systems.
          </p>
          <div className="flex gap-10">
            <div>
              <p className="text-4xl font-black text-blue-500">0.96</p>
              <p className="text-zinc-500 text-sm">Best ROC-AUC</p>
            </div>
            <div>
              <p className="text-4xl font-black text-purple-500">100%</p>
              <p className="text-zinc-500 text-sm">Hands-on Driven</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card p-8 rounded-3xl"
            >
              <div className="w-12 h-12 bg-white/5 dark:bg-black/20 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-white/10">
                {card.icon}
              </div>
              <h4 className="text-xl font-bold mb-3">{card.title}</h4>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
