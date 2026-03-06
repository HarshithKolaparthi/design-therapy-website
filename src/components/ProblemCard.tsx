import React from 'react';
import { motion } from 'framer-motion';
import type { ProblemStatement } from '../types';
import { CheckCircle2, Circle, Target, Users, LayoutTemplate, Goal } from 'lucide-react';
import { cn } from '../lib/utils';

interface ProblemCardProps {
  statement: ProblemStatement;
  isSelected: boolean;
  onSelect: () => void;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({ statement, isSelected, onSelect }) => {
  return (
    <motion.div
      onClick={onSelect}
      className={cn(
        "group relative cursor-pointer p-6 md:p-8 rounded-3xl border transition-all duration-300 h-full flex flex-col",
        isSelected 
          ? "bg-primary/10 border-primary shadow-glow-primary scale-[1.02]" 
          : "bg-surface border-border hover:border-textSecondary/30 hover:shadow-lg hover:-translate-y-1"
      )}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col gap-2 relative z-10">
          <div className="flex items-center gap-3">
            <span className={cn(
              "px-3 py-1 rounded-full text-xs font-bold tracking-wider",
              isSelected ? "bg-primary text-white" : "bg-surfaceHover text-textSecondary group-hover:bg-border transition-colors"
            )}>
              {statement.id}
            </span>
            {statement.type && (
              <span className={cn(
                "px-3 py-1 rounded-full text-xs font-bold tracking-wider border",
                isSelected ? "bg-primary/20 text-primary border-primary/30" : "bg-surfaceHover text-textSecondary border-border"
              )}>
                {statement.type}
              </span>
            )}
          </div>
          <h3 className={cn(
            "text-xl md:text-2xl font-display font-bold leading-snug mt-2 transition-colors duration-300",
            isSelected ? "text-white" : "text-textPrimary group-hover:text-white"
          )}>
            {statement.title}
          </h3>
        </div>
        
        <div className={cn(
          "transition-colors duration-300 flex-shrink-0 z-10",
          isSelected ? "text-primary" : "text-border group-hover:text-textSecondary/50"
        )}>
          {isSelected ? <CheckCircle2 className="w-8 h-8" /> : <Circle className="w-8 h-8" />}
        </div>
      </div>
      
      <div className="space-y-6 flex-grow relative z-10 mt-2">
        {statement.problem && (
          <div>
            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-textSecondary mb-2">
              <Target className="w-3.5 h-3.5 text-accent" /> The Problem
            </h4>
            <p className="text-sm text-textPrimary leading-relaxed bg-surfaceHover/50 p-3 rounded-xl border border-border/50">
              {statement.problem}
            </p>
          </div>
        )}
        
        {statement.targetUsers && (
          <div>
            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-textSecondary mb-2">
              <Users className="w-3.5 h-3.5 text-primary" /> Target Users
            </h4>
            <p className="text-sm text-textPrimary">{statement.targetUsers}</p>
          </div>
        )}

        {statement.designTask && (
          <div>
            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-textSecondary mb-2">
              <LayoutTemplate className="w-3.5 h-3.5 text-neon" /> Design Task
            </h4>
            {Array.isArray(statement.designTask) ? (
              <ul className="list-disc list-inside space-y-1 text-sm text-textPrimary marker:text-primary">
                {statement.designTask.map((task, i) => (
                  <li key={i}>{task}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-textPrimary">{statement.designTask}</p>
            )}
          </div>
        )}

        {statement.posterTask && (
          <div>
            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-textSecondary mb-2">
              <LayoutTemplate className="w-3.5 h-3.5 text-accent" /> Poster Task
            </h4>
            <p className="text-sm text-textPrimary">{statement.posterTask}</p>
          </div>
        )}
        
        {statement.goal && (
          <div>
            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-textSecondary mb-2">
              <Goal className="w-3.5 h-3.5 text-green-400" /> Goal
            </h4>
            <p className="text-sm text-textPrimary font-medium">{statement.goal}</p>
          </div>
        )}
      </div>
      
      {/* Decorative gradient that shows on hover/select */}
      <div className={cn(
        "absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-300",
        isSelected ? "bg-gradient-to-br from-primary to-accent opacity-20" : "bg-gradient-to-br from-white/5 to-white/10"
      )} />
    </motion.div>
  );
};
