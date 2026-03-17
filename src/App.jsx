import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { animate } from 'animejs';
import Navbar from './components/Navbar';
import { AppleCard } from './components/AppleCard';
import { CircuitWires } from './components/CircuitWires';

const Portfolio = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Anime.js Interactive Animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target, {
            y: [50, 0],
            opacity: [0, 1],
            ease: 'outCubic',
            duration: 800,
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.anime-reveal').forEach((el) => {
      el.style.opacity = '0';
      observer.observe(el);
    });

    animate('.anime-spin-icon', {
      rotate: 360,
      duration: 8000,
      ease: 'linear',
      loop: true
    });

    return () => observer.disconnect();
  }, []);

  // Hero Text Animations
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const blur = useTransform(scrollYProgress, [0, 0.5], [0, 10]);
  const bgImageOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0]);
  const gradientX = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const gradientColor = useTransform(scrollYProgress, [0, 0.5, 1], ['rgba(30, 58, 138, 0.15)', 'rgba(88, 28, 135, 0.15)', 'rgba(24, 24, 27, 0.1)']);

  // PULSE LOGIC:
  // At scroll 0 (top), opacity is 0 (invisible).
  // By scroll 0.1 (just started scrolling), it becomes fully visible (opacity 1).
  const pulseVisibility = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="bg-[#000] text-white min-h-screen selection:bg-blue-500/30">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section ref={containerRef} className="relative h-[150vh] flex flex-col items-center">
        
        {/* Background Image Layer */}
        <motion.div 
          style={{ opacity: bgImageOpacity }}
          className="fixed inset-0 z-0 pointer-events-none"
        >
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
            alt="Background Technology" 
            className="w-full h-full object-cover grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-black/70" />
        </motion.div>

        {/* PULSATING BLUE LIGHT LAYER (Fixed Position) */}
        <motion.div 
          style={{ opacity: pulseVisibility }} // Linked to scroll: 0 at top, 1 when down
          className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        >
          <motion.div
            animate={{ 
              opacity: [0.4, 0.8, 0.4], // Stronger pulsing (40% to 80%)
              scale: [1, 1.2, 1],       // Larger breathing effect
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            // Increased base opacity from /20 to /50
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-blue-500/50 via-blue-900/20 to-transparent blur-[100px] rounded-full"
          />
        </motion.div>

        {/* WIRES LAYER */}
        <div className="absolute inset-0 z-0 overflow-hidden">
           <CircuitWires />
        </div>

      {/* Hero Content (Sticky) */}
        <motion.div 
          style={{ opacity, scale, filter: `blur(${blur}px)` }}
          className="sticky top-0 h-screen flex flex-col items-center justify-center z-10 text-center px-6"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-blue-500 font-mono tracking-[0.4em] uppercase text-[10px] md:text-xs mb-6 block"
          >
            Software Engineering & Systems Architecture
          </motion.span>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-br from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent leading-tight pb-4">
            Tejas U. Kedarpawar
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mt-8 space-y-6 max-w-4xl"
          >
            <p className="text-xl md:text-3xl font-medium tracking-tight text-white leading-snug">
              Architecting scalable systems and <br className="hidden md:block" /> 
              refined digital experiences through clean engineering.
            </p>
            
            <div className="flex flex-col gap-6 text-zinc-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              <p>
                Currently pursuing a <span className="text-white font-semibold">B.Tech in Computer Science</span> at Ramdeobaba University. 
                I focus on developing <span className="text-white">enterprise-grade backend logic</span> and 
                <span className="text-white">seamless frontend architectures</span>.
              </p>

              {/* PREMIUM DOWNLOAD RESUME BUTTON */}
              <motion.div 
                className="pt-4 flex justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a 
                  href="/Tejas_Kedarpawar_resume.pdf" // Put your resume file in the 'public' folder
                  download
                  className="relative group inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-white/20 rounded-full text-white font-medium overflow-hidden transition-all hover:border-blue-500/50"
                >
                  {/* Glowing background effect on hover */}
                  <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download Resume</span>
                  
                  {/* Subtle bottom glow line */}
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-zinc-400">Explore Engineering Portfolio</span>
          </motion.div>
        </motion.div>
        {/* Dynamic Gradient Overlay */}
        <motion.div 
          style={{ background: `radial-gradient(circle at ${gradientX} 50%, ${gradientColor} 0%, transparent 70%)` }}
          className="fixed inset-0 pointer-events-none -z-10"
        />
      </section>

      {/* 2. MAIN CONTENT */}
      <div className="relative z-20 bg-black">
        
        {/* SKILLS SECTION */}
        <section id="skills" className="px-6 py-32 max-w-6xl mx-auto anime-reveal">
          <motion.div>
            <h2 className="text-sm font-mono text-blue-500 uppercase tracking-widest mb-12">Architecture & Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-2 bg-zinc-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/5">
                <h4 className="text-2xl font-semibold mb-8 text-white">Full Stack Core</h4>
                <div className="flex flex-wrap gap-3">
                  {['React.js', 'PHP', 'MySQL', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Python', 'C++'].map((skill, index) => (
                    <motion.span 
                      key={skill} 
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 + 0.2 }}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                      className="px-5 py-2.5 bg-white/5 rounded-full text-sm font-medium border border-white/10 hover:border-blue-500/50 transition-all cursor-default text-zinc-200"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
              <div className="md:col-span-1 bg-zinc-900/40 p-10 rounded-[2.5rem] border border-white/5 flex flex-col justify-between">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/50" />
                <div>
                    <h4 className="font-bold text-xl text-white">Database</h4>
                    <p className="text-zinc-400 mt-2">Scalable Schema Design</p>
                </div>
              </div>
              <div className="md:col-span-1 bg-zinc-900/40 p-10 rounded-[2.5rem] border border-white/5 flex flex-col justify-between">
                <div className="w-10 h-10 rounded-full bg-zinc-700/20 border border-zinc-700/50" />
                <div>
                    <h4 className="font-bold text-xl text-white">Backend</h4>
                    <p className="text-zinc-400 mt-2">API Optimization</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="work" className="px-6 py-32 max-w-6xl mx-auto anime-reveal">
          <h2 className="text-sm font-mono text-blue-500 uppercase tracking-widest mb-12">Live Projects</h2>
          <AppleCard className="bg-zinc-950 border-white/5 p-8 md:p-20 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 text-left">
                <div className="inline-block px-4 py-1.5 bg-blue-500/10 text-blue-500 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-500/20">
                  NIT Polytechnic
                </div>
                <h4 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">Stationery Management</h4>
                <p className="text-zinc-300 leading-relaxed text-lg">
                  A full-lifecycle development project to automate inventory workflows. 
                  Focused on reducing resource wastage and providing real-time analytics 
                  for college administrators.
                </p>
                <div className="pt-4">
                  <motion.a 
                    href="https://stationary.nitpoly.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-bold transition-all group text-lg shadow-xl shadow-white/5 hover:shadow-blue-500/20"
                  >
                    View Project <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
                  </motion.a>
                </div>
              </div>
              <div className="relative aspect-square md:aspect-video bg-zinc-900/80 rounded-[2rem] border border-white/10 flex flex-col items-center justify-center p-12 overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 transition-colors" />
                <div className="font-mono text-[11px] text-zinc-500 space-y-3 opacity-60 leading-relaxed">
                   <div>{`UPDATE inventory SET stock = stock - 1`}</div>
                   <div>{`WHERE item_id = ? AND status = 'available';`}</div>
                   <div className="text-blue-400 font-bold">{`// Transaction successful`}</div>
                </div>
              </div>
            </div>
          </AppleCard>

          {/* IN DEVELOPMENT CARD */}
          <AppleCard className="mt-12 bg-zinc-900/40 border-white/5 p-8 md:p-12 overflow-hidden flex flex-col items-center justify-center text-center">
             <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 border border-blue-500/20">
               <svg className="w-8 h-8 text-blue-500 anime-spin-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
               </svg>
             </div>
             <h4 className="text-2xl md:text-4xl font-bold tracking-tight text-white mb-4">More Projects in Development</h4>
             <p className="text-zinc-400 text-lg max-w-xl mx-auto">
               Currently architecting and building new enterprise-grade systems. Stay tuned for advanced full-stack applications and system designs.
             </p>
          </AppleCard>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="px-6 py-32 max-w-6xl mx-auto pb-60 anime-reveal">
          <motion.div>
            <h2 className="text-sm font-mono text-blue-500 uppercase tracking-widest mb-12">Experience</h2>
            <AppleCard className="bg-zinc-950 border-white/5 p-10 md:p-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
              <div className="flex-1 text-left">
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-black font-black text-2xl shadow-2xl">
                    IG
                  </div>
                  <div>
                    <h4 className="text-2xl md:text-3xl font-bold text-white">Internship Trainee</h4>
                    <p className="text-zinc-400 text-lg">Indo German Tool Room (IGTR) Nagpur</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-zinc-300 text-lg">
                  <p className="flex gap-4">
                    <span className="text-blue-500 text-2xl">•</span>
                    Engineered precision industrial documentation and workflow automation systems.
                  </p>
                  <p className="flex gap-4">
                    <span className="text-blue-500 text-2xl">•</span>
                    Modernized legacy technical analysis processes using modern engineering frameworks.
                  </p>
                </div>
              </div>
              <div className="shrink-0">
                <span className="text-zinc-400 font-mono text-sm px-6 py-3 border border-white/10 rounded-full bg-white/5">
                  May 2024 — July 2024
                </span>
              </div>
            </div>
            </AppleCard>
          </motion.div>
        </section>

        <footer className="py-24 border-t border-white/5 text-center bg-zinc-950/20 backdrop-blur-sm">
          <p className="text-zinc-500 text-[10px] md:text-xs font-medium uppercase tracking-[0.4em]">
            Precision Engineering &bull; Tejas U. Kedarpawar &bull; {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Portfolio;