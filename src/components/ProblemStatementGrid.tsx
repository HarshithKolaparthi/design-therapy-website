import React from 'react';
import { ProblemCard } from './ProblemCard';
import type { ProblemStatement } from '../types';
import { LayoutGrid } from 'lucide-react';

interface ProblemStatementGridProps {
  statements: ProblemStatement[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const ProblemStatementGrid: React.FC<ProblemStatementGridProps> = ({ 
  statements, 
  selectedId, 
  onSelect 
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8">
      <div className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-neon/10 text-neon mb-4">
            <LayoutGrid className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-textPrimary mb-3">
            Select Problem Statement
          </h2>
          <p className="text-textSecondary max-w-xl">
            Choose carefully. Once submitted, your selection will be locked in. Only one team can work on a specific problem statement.
          </p>
        </div>
        
        <div className="bg-surface border border-border px-6 py-4 rounded-2xl md:text-right">
          <span className="block text-sm text-textSecondary mb-1 font-medium uppercase tracking-wider">Status</span>
          <span className="text-xl font-bold">
            {selectedId ? (
              <span className="text-primary">{selectedId} Selected</span>
            ) : (
              <span className="text-accent hover:text-accent/80 transition-colors cursor-default animate-pulse">Waiting for selection...</span>
            )}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
        {statements.map((statement) => (
          <ProblemCard
            key={statement.id}
            statement={statement}
            isSelected={selectedId === statement.id}
            onSelect={() => onSelect(statement.id)}
          />
        ))}
      </div>
    </div>
  );
};
