import React from 'react';
import { motion } from 'framer-motion';
import type { TeamData, ProblemStatement } from '../types';
import { CheckCircle, Home, FileText } from 'lucide-react';

interface ConfirmationPageProps {
  teamData: TeamData;
  problem: ProblemStatement;
  onHome: () => void;
}

export const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ teamData, problem, onHome }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Celebration background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(45,212,191,0.15),_transparent_60%)] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="z-10 bg-surface border border-border p-8 md:p-12 rounded-[2.5rem] shadow-2xl max-w-2xl w-full relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-neon via-primary to-accent" />
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="mx-auto w-24 h-24 bg-neon/10 rounded-full flex items-center justify-center mb-8"
        >
          <CheckCircle className="w-12 h-12 text-neon" />
        </motion.div>

        <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
          🎉 Successfully Reserved!
        </h1>
        
        <p className="text-lg text-textSecondary mb-10">
          You have successfully reserved your problem statement for Design Therapy. Get ready to design your solution.
        </p>

        <div className="bg-background rounded-2xl p-6 text-left mb-10 border border-border">
          <div className="flex items-start justify-between border-b border-border pb-6 mb-6">
            <div>
              <p className="text-sm text-textSecondary uppercase tracking-wider font-medium mb-1">Team</p>
              <p className="text-2xl font-bold text-white">{teamData.teamNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-textSecondary uppercase tracking-wider font-medium mb-1">Members</p>
              <p className="text-sm font-medium">{teamData.p1.name}</p>
              <p className="text-sm font-medium">{teamData.p2.name}</p>
              {teamData.p3?.name && <p className="text-sm font-medium">{teamData.p3.name}</p>}
              {teamData.p4?.name && <p className="text-sm font-medium">{teamData.p4.name}</p>}
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-primary" />
              <p className="text-sm text-textSecondary uppercase tracking-wider font-medium">Selected Statement</p>
            </div>
            <div className="flex flex-col gap-4 bg-surfaceHover p-5 md:p-6 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="bg-primary/20 text-primary px-3 py-1 rounded-lg font-bold text-sm">
                  {problem.id}
                </span>
                <span className="bg-surface text-textSecondary px-3 py-1 rounded-lg font-bold text-sm border border-border">
                  {problem.type}
                </span>
              </div>
              <p className="font-display font-bold text-xl md:text-2xl text-white">{problem.title}</p>
              
              <div className="w-full h-px bg-border/50 my-2" />
              
              <div className="space-y-4">
                {problem.problem && (
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-accent mb-1">The Problem</span>
                    <p className="text-sm text-textPrimary">{problem.problem}</p>
                  </div>
                )}
                
                {problem.targetUsers && (
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-primary mb-1">Target Users</span>
                    <p className="text-sm text-textPrimary">{problem.targetUsers}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {problem.designTask && (
                    <div className="bg-surface p-4 rounded-lg border border-border/50">
                      <span className="block text-xs font-bold uppercase tracking-wider text-neon mb-2">Design Task</span>
                      {Array.isArray(problem.designTask) ? (
                        <ul className="list-disc list-inside space-y-1 text-sm text-textPrimary marker:text-primary">
                          {problem.designTask.map((task, i) => (
                            <li key={i}>{task}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-textPrimary">{problem.designTask}</p>
                      )}
                    </div>
                  )}

                  {problem.posterTask && (
                    <div className="bg-surface p-4 rounded-lg border border-border/50">
                      <span className="block text-xs font-bold uppercase tracking-wider text-accent mb-2">Poster Task</span>
                      <p className="text-sm text-textPrimary">{problem.posterTask}</p>
                    </div>
                  )}
                </div>

                {problem.goal && (
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-green-400 mb-1">Goal</span>
                    <p className="text-sm text-textPrimary">{problem.goal}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onHome}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-surfaceHover text-white font-bold rounded-xl hover:bg-border transition-colors outline-none"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </button>
      </motion.div>
    </div>
  );
};
