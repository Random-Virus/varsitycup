export interface Participant {
  id: string;
  name: string;
  email: string;
  university: string;
  studentNumber: string;
  score: number;
  solvedProblems: number;
  penaltyTime: number;
  createdAt: string;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  timeLimit: number;
  memoryLimit: number;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  problems: Problem[];
}

export interface Submission {
  id: string;
  participantId: string;
  problemId: string;
  code: string;
  language: string;
  status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Runtime Error' | 'Compilation Error';
  timestamp: string;
  testResults?: {
    passed: number;
    total: number;
    details: string[];
  };
}

export interface TestResult {
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
}