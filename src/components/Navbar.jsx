import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-xl"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full py-4 px-10 flex items-center justify-center shadow-2xl">
            <div className="flex gap-10 text-sm font-medium text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Work</a>
              <a href="#" className="hover:text-white transition-colors">Skills</a>
              <a href="#" className="hover:text-white transition-colors">Experience</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;