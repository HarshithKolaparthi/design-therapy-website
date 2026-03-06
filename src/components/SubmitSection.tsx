import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Send } from 'lucide-react';

interface SubmitSectionProps {
  selectedId: string | null;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
}

export const SubmitSection: React.FC<SubmitSectionProps> = ({ selectedId, onSubmit, isSubmitting }) => {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!selectedId) {
      setError("Please select a problem statement before submitting.");
      return;
    }
    setError(null);
    await onSubmit();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex justify-center md:justify-end">
        <motion.div
           initial={{ y: 100, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           className="bg-surface/90 backdrop-blur-xl border border-border p-4 rounded-3xl shadow-2xl pointer-events-auto flex flex-col md:flex-row items-center gap-4 md:gap-8"
        >
          <div className="text-center md:text-left">
            <p className="text-sm font-medium text-textSecondary uppercase tracking-wider">Selected</p>
            <p className="text-xl font-bold text-white">
              {selectedId || "None"}
            </p>
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={!selectedId || isSubmitting}
            className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-white text-background font-bold rounded-2xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>CONFIRM & SUBMIT</span>
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {error && (
           <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: 10 }}
             className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 bg-accent text-white px-6 py-3 rounded-xl shadow-lg pointer-events-auto font-medium"
           >
             {error}
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
