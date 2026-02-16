
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, ChevronRight } from 'lucide-react';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: '1',
    title: 'Telecom Churn Analysis',
    category: 'Predictive Modeling',
    description: 'Analyzed telecom data to identify churn drivers. Built a prediction model achieving 0.96 ROC-AUC and 90% recall using Scikit-learn.',
    image: 'https://images.unsplash.com/photo-1551288049-bbda4864219c?auto=format&fit=crop&q=80&w=800',
    tags: ['Python', 'Scikit-Learn', 'Pandas', 'Matplotlib'],
    githubUrl: 'https://github.com/ashishramana1708',
    liveUrl: '#',
  },
  {
    id: '2',
    title: 'Mental Health Support Bot',
    category: 'AI / NLP',
    description: 'Developed a chatbot using Gemini API and Hugging Face NLP. Scraped Reddit for intent analysis and deployed as a Discord bot.',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd05a?auto=format&fit=crop&q=80&w=800',
    tags: ['Gemini API', 'Hugging Face', 'Discord.py', 'Reddit API'],
    githubUrl: 'https://github.com/ashishramana1708',
    liveUrl: '#',
  },
  {
    id: '3',
    title: 'Startup Funding Dashboard',
    category: 'Data Visualization',
    description: 'Interactive Power BI dashboard analyzing Indian startup funding trends by state and sector, highlighting high-growth regions.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    tags: ['Power BI', 'Excel', 'R', 'Data Transformation'],
    githubUrl: 'https://github.com/ashishramana1708',
    liveUrl: '#',
  }
];

const Projects: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedProject = projects.find(p => p.id === selectedId);

  return (
    <section id="projects" className="py-24 px-6 bg-zinc-50 dark:bg-zinc-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-4">Academic & Personal Projects</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold">Data-driven <br /><span className="text-zinc-500">solutions.</span></h3>
          </div>
          <motion.a 
            href="https://github.com/ashishramana1708"
            target="_blank"
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 font-bold text-zinc-600 dark:text-zinc-400 hover:text-blue-500 transition-colors"
          >
            Visit GitHub <ChevronRight size={20} />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              layoutId={project.id}
              key={project.id}
              onClick={() => setSelectedId(project.id)}
              whileHover={{ y: -10 }}
              className="cursor-pointer glass-card rounded-3xl overflow-hidden group border border-white/5 bg-white/5"
            >
              <div className="relative h-64 overflow-hidden bg-zinc-800">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/800x600/18181b/ffffff?text=${project.title}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-white">
                    <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">{project.category}</p>
                    <h4 className="text-xl font-bold">{project.title}</h4>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-3 py-1 bg-zinc-500/10 border border-zinc-500/20 rounded-full text-xs text-zinc-500 dark:text-zinc-400">{tag}</span>
                  ))}
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 line-clamp-2 text-sm leading-relaxed">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 cursor-pointer"
            />
            <motion.div
              layoutId={selectedId}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white dark:bg-zinc-950 rounded-[2.5rem] z-[60] overflow-hidden shadow-2xl"
            >
              <div className="relative h-64 bg-zinc-800">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/800x600/18181b/ffffff?text=${selectedProject.title}`;
                  }}
                />
                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 right-6 p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-10">
                <p className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-2">{selectedProject.category}</p>
                <h3 className="text-3xl font-black mb-6">{selectedProject.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
                  {selectedProject.description}
                </p>
                <div className="flex flex-wrap gap-3 mb-10">
                  {selectedProject.tags.map(tag => (
                    <span key={tag} className="px-4 py-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-full text-xs font-semibold">{tag}</span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a href={selectedProject.liveUrl} className="flex-1 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20">
                    <ExternalLink size={20} /> View Demo
                  </a>
                  <a href={selectedProject.githubUrl} target="_blank" className="flex-1 px-6 py-4 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all">
                    <Github size={20} /> Repository
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
