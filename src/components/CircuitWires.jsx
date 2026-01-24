import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const CircuitWires = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // 1. Draw the lines as you scroll (0 to 1)
  const pathLength = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  
  // 2. Fade them out slightly as they finish drawing to blend into the next section
  const opacity = useTransform(scrollYProgress, [0.6, 0.9], [1, 0]);

  const transition = { duration: 0, ease: "linear" };
  
  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none w-full h-full">
      <svg className="w-full h-full" viewBox="0 0 1440 1000" preserveAspectRatio="none">
        <defs>
          <linearGradient id="wire-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" /> {/* Fade at top */}
            <stop offset="50%" stopColor="#3b82f6" /> {/* Blue in middle */}
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" /> {/* Fade at bottom */}
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- LEFT SIDE WIRES --- */}
        
        {/* Left Corner -> Bottom Left Corner */}
        <motion.path
          d="M0,0 C50,300 50,700 0,1000"
          fill="transparent"
          stroke="url(#wire-gradient)"
          strokeWidth="3"
          filter="url(#glow)"
          style={{ pathLength, opacity }}
          transition={transition}
        />

        {/* Left Corner -> Center Screen */}
        <motion.path
          d="M0,0 C150,300 400,600 720,900"
          fill="transparent"
          stroke="url(#wire-gradient)"
          strokeWidth="2"
          filter="url(#glow)"
          style={{ pathLength, opacity }}
          transition={transition}
        />

        {/* --- RIGHT SIDE WIRES --- */}

        {/* Right Corner -> Center Screen */}
        <motion.path
          d="M1440,0 C1290,300 1040,600 720,900"
          fill="transparent"
          stroke="url(#wire-gradient)"
          strokeWidth="2"
          filter="url(#glow)"
          style={{ pathLength, opacity }}
          transition={transition}
        />

        {/* Right Corner -> Bottom Right Corner */}
        <motion.path
          d="M1440,0 C1390,300 1390,700 1440,1000"
          fill="transparent"
          stroke="url(#wire-gradient)"
          strokeWidth="3"
          filter="url(#glow)"
          style={{ pathLength, opacity }}
          transition={transition}
        />
      </svg>
    </div>
  );
};