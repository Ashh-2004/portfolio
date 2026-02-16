
import React from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, MapPin, Mail, Download } from 'lucide-react';
import MagneticButton from './MagneticButton';

const Contact: React.FC = () => {
  const handleDownloadCV = () => {
    alert("Resume download triggered! (Replace with actual link in production)");
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h2 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-4">Contact Me</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">
            Ready for a <br /><span className="text-zinc-500">part-time internship.</span>
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-12 max-w-md">
            I am available for 15–25 hours per week. I'm eager to apply my analytical skills to real business problems.
          </p>

          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.location.href = 'mailto:ashishramana1708@gmail.com'}>
              <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-2xl group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Email</p>
                <p className="text-lg font-bold">ashishramana1708@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-2xl group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Location</p>
                <p className="text-lg font-bold">Bengaluru, India</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <MagneticButton>
              <a href="https://github.com/ashishramana1708" target="_blank" className="w-12 h-12 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 rounded-2xl hover:bg-blue-500 hover:text-white transition-all">
                <Github size={20} />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="https://www.linkedin.com/in/ashish-ramana-1708/" target="_blank" className="w-12 h-12 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 rounded-2xl hover:bg-blue-500 hover:text-white transition-all">
                <Linkedin size={20} />
              </a>
            </MagneticButton>
            <MagneticButton>
              <button 
                onClick={handleDownloadCV}
                className="px-6 h-12 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 rounded-2xl hover:bg-blue-500 hover:text-white transition-all font-bold gap-2"
              >
                <Download size={18} /> Resume
              </button>
            </MagneticButton>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-10 rounded-[2.5rem] bg-white/5"
        >
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Your Name"
                  className="w-full px-6 py-4 bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Email Address</label>
                <input 
                  type="email" 
                  placeholder="your@email.com"
                  className="w-full px-6 py-4 bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all dark:text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Project Details</label>
              <textarea 
                rows={4}
                placeholder="Tell me about your project or role..."
                className="w-full px-6 py-4 bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none dark:text-white"
              ></textarea>
            </div>
            
            <button className="group w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]">
              Send Inquiry 
              <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
