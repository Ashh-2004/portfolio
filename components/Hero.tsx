
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Download } from 'lucide-react';
import MagneticButton from './MagneticButton';

const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 }
    },
  };

  const handleDownloadCV = () => {
    // In a real scenario, this would be a link to a PDF
    alert("Resume download triggered! (Replace with actual link in production)");
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-20 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl text-center z-10"
      >
        <motion.div 
          variants={itemVariants}
          className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 text-xs font-bold uppercase tracking-widest"
        >
          Open to Internship Opportunities
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight"
        >
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-600">Ashish Ramana.</span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          An <span className="text-zinc-900 dark:text-white font-medium">Aspiring Data Scientist</span> currently pursuing MCA at BIT. I transform raw datasets into actionable business stories.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticButton>
            <a 
              href="#projects"
              className="px-8 py-4 rounded-full bg-blue-600 text-white font-bold flex items-center gap-2 group transition-all shadow-lg shadow-blue-500/20"
            >
              View My Projects
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </MagneticButton>
          
          <MagneticButton>
            <button 
              onClick={handleDownloadCV}
              className="px-8 py-4 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 font-bold transition-all flex items-center gap-2"
            >
              <Download size={20} /> Download CV
            </button>
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[120px] -z-0"
      />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="animate-bounce text-zinc-400" />
      </motion.div>
    </section>
  );
};

export default Hero;
