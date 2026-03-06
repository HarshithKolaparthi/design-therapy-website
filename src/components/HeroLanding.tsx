import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface HeroLandingProps {
  onGetStarted: () => void;
  onAdminClick: () => void;
}

export const HeroLanding: React.FC<HeroLandingProps> = ({ onGetStarted, onAdminClick }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      
      {/* Admin Button at top-right */}
      <button 
        onClick={onAdminClick}
        className="absolute top-6 right-6 z-20 px-4 py-2 bg-surface/50 hover:bg-surface border border-border/50 rounded-lg text-sm font-medium text-textSecondary hover:text-white transition-colors backdrop-blur-md"
      >
        Admin
      </button>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/bg-image.jpg" 
          alt="Landing Background" 
          className="w-full h-full object-cover opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-background/80 bg-gradient-to-b from-transparent to-background" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 max-w-4xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-medium text-sm tracking-wide uppercase shadow-glow-primary"
        >
          An Exclusive Design Challenge
        </motion.div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-textPrimary to-textSecondary mb-6 leading-tight">
          Design Therapy
        </h1>
        
        <p className="text-lg md:text-xl text-textSecondary max-w-2xl mx-auto mb-16 leading-relaxed">
          A hands-on design challenge where creativity meets problem solving. Teams will choose one real-world problem statement and design a solution that pushes innovation and user experience.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="z-10 flex flex-col items-center mt-8 animate-float"
      >
        <button
          onClick={onGetStarted}
          className="group relative px-8 py-4 bg-primary text-white font-bold text-lg rounded-full overflow-hidden shadow-glow-primary transition-all duration-300 hover:scale-105 hover:shadow-glow-accent outline-none"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
          <span className="relative z-10">GET STARTED</span>
        </button>

        <div className="mt-6 flex flex-col items-center text-textSecondary/70 gap-2">
          <span className="text-sm font-medium">Choose your problem statement here</span>
          <ChevronDown className="w-5 h-5 animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
};
