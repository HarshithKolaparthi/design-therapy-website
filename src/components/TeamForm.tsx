import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TeamData, Participant } from '../types';
import { cn } from '../lib/utils';
import { AlertCircle, User, Users, Hash } from 'lucide-react';

interface TeamFormProps {
  onSubmit: (data: TeamData) => void;
  initialData?: TeamData;
}

export const TeamForm: React.FC<TeamFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<TeamData>(initialData || {
    teamNumber: '',
    p1: { name: '', registerNumber: '' },
    p2: { name: '', registerNumber: '' },
    p3: { name: '', registerNumber: '' },
    p4: { name: '', registerNumber: '' },
  });
  
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    field: 'teamNumber', 
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleParticipantChange = (
    participantKey: keyof Omit<TeamData, 'teamNumber'>,
    field: keyof Participant,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [participantKey]: {
        ...prev[participantKey] as Participant,
        [field]: value
      }
    }));
    setError(null);
  };

  const validateForm = (): boolean => {
    if (!formData.teamNumber.trim()) {
      setError("Team Number is required.");
      return false;
    }
    
    if (!formData.p1.name.trim() || !formData.p1.registerNumber.trim()) {
      setError("Participant 1 details are fully required.");
      return false;
    }
    
    if (!formData.p2.name.trim() || !formData.p2.registerNumber.trim()) {
      setError("Participant 2 details are fully required.");
      return false;
    }

    // Collect all register numbers to check uniqueness
    const regNumbers: string[] = [];
    const participants: (keyof Omit<TeamData, 'teamNumber'>)[] = ['p1', 'p2', 'p3', 'p4'];
    
    for (const pKey of participants) {
      const p = formData[pKey];
      if (p && p.registerNumber.trim()) {
        if (regNumbers.includes(p.registerNumber.trim())) {
          setError(`Register number ${p.registerNumber} is duplicated within the team.`);
          return false;
        }
        regNumbers.push(p.registerNumber.trim());
      }
      
      // If name provided but no reg number, or vice versa for optional
      if (p && ((p.name.trim() && !p.registerNumber.trim()) || (!p.name.trim() && p.registerNumber.trim()))) {
        setError(`Please complete both Name and Register Number for Participant ${pKey.replace('p', '')}.`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const renderParticipantFields = (
    id: keyof Omit<TeamData, 'teamNumber'>, 
    label: string, 
    isRequired: boolean
  ) => (
    <div className="bg-surfaceHover p-5 rounded-2xl border border-border mt-4 transition-all focus-within:border-primary/50 focus-within:shadow-glow-primary">
      <div className="flex items-center gap-2 mb-4">
        <User className={cn("w-5 h-5", isRequired ? "text-primary" : "text-textSecondary")} />
        <h3 className="font-semibold text-textPrimary">
          {label} {!isRequired && <span className="text-textSecondary/60 text-sm font-normal">(Optional)</span>}
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-textSecondary mb-1.5 uppercase tracking-wider font-medium">Full Name</label>
          <input
            type="text"
            value={formData[id]?.name || ''}
            onChange={(e) => handleParticipantChange(id, 'name', e.target.value)}
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-textPrimary outline-none focus:border-primary transition-colors hover:border-border/80"
            placeholder="John Doe"
            required={isRequired}
          />
        </div>
        <div>
          <label className="block text-xs text-textSecondary mb-1.5 uppercase tracking-wider font-medium">Register Number</label>
          <input
            type="text"
            value={formData[id]?.registerNumber || ''}
            onChange={(e) => handleParticipantChange(id, 'registerNumber', e.target.value)}
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-textPrimary outline-none focus:border-primary transition-colors hover:border-border/80"
            placeholder="e.g. 21BCE0001"
            required={isRequired}
          />
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-3xl mx-auto p-4 md:p-8"
    >
      <div className="mb-10 text-center">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 text-primary mb-4">
          <Users className="w-8 h-8" />
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-textPrimary mb-3">Team Registration</h2>
        <p className="text-textSecondary">Enter your team details to proceed to the problem statements.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-surface p-6 md:p-8 rounded-3xl border border-border shadow-2xl relative">
        <div className="bg-surfaceHover p-5 rounded-2xl border border-border transition-all focus-within:border-accent/50 focus-within:shadow-glow-accent">
          <label className="flex items-center gap-2 text-sm text-textSecondary mb-2 font-medium uppercase tracking-wider">
            <Hash className="w-4 h-4" /> Team Number
          </label>
          <input
            type="text"
            value={formData.teamNumber}
            onChange={(e) => handleChange('teamNumber', e.target.value)}
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-textPrimary outline-none focus:border-accent transition-colors text-lg font-medium"
            placeholder="e.g. Team-42"
            required
          />
        </div>

        {renderParticipantFields('p1', 'Participant 1', true)}
        {renderParticipantFields('p2', 'Participant 2', true)}
        {renderParticipantFields('p3', 'Participant 3', false)}
        {renderParticipantFields('p4', 'Participant 4', false)}

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-accent/10 border border-accent/20 text-accent p-4 rounded-xl flex items-start gap-3 mt-4"
            >
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pt-6">
          <button
            type="submit"
            className="w-full py-4 bg-white text-background font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg active:scale-[0.98] outline-none focus:ring-4 ring-primary/30"
          >
            Continue to Problem Statements
          </button>
        </div>
      </form>
    </motion.div>
  );
};
