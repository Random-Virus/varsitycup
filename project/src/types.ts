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
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  description: string;
  examples: {
    input: string;
    output: string;
  }[];
  testCases: {
    input: string;
    output: string;
  }[];
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
  timestamp: string;
  status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Runtime Error';
  testResults: {
    passed: boolean;
    message?: string;
  }[];
}