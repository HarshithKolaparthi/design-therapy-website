export interface Participant {
  name: string;
  registerNumber: string;
}

export interface TeamData {
  teamNumber: string;
  p1: Participant;
  p2: Participant;
  p3?: Participant;
  p4?: Participant;
}

export interface ProblemStatement {
  id: string; // e.g. "PS-1"
  title: string;
  type?: string;
  problem?: string;
  targetUsers?: string;
  designTask?: string | string[];
  posterTask?: string;
  goal?: string;
}

export type AppState = 'LANDING' | 'FORM' | 'SELECTION' | 'SUCCESS';
