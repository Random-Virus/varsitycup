import { BadgeDefinition } from '../types';

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  {
    id: 'newbie',
    name: 'Newbie',
    description: 'Solved your first coding problem',
    icon: '/newbie-badge.png',
    category: 'milestone',
    rarity: 'common',
    condition: (participant, submissions) => {
      return submissions.some(s => s.status === 'Accepted');
    }
  },
  {
    id: 'problem-solver',
    name: 'Problem Solver',
    description: 'Solved 3 problems',
    icon: '/newbie-badge.png',
    category: 'milestone',
    rarity: 'common',
    condition: (participant, submissions) => {
      const solvedProblems = new Set(
        submissions.filter(s => s.status === 'Accepted').map(s => s.problemId)
      );
      return solvedProblems.size >= 3;
    }
  },
  {
    id: 'code-master',
    name: 'Code Master',
    description: 'Solved all problems in the competition',
    icon: '/newbie-badge.png',
    category: 'achievement',
    rarity: 'epic',
    condition: (participant, submissions) => {
      const solvedProblems = new Set(
        submissions.filter(s => s.status === 'Accepted').map(s => s.problemId)
      );
      return solvedProblems.size >= 4; // Total problems in competition
    }
  },
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Solved a problem in under 10 minutes',
    icon: '/newbie-badge.png',
    category: 'achievement',
    rarity: 'rare',
    condition: (participant, submissions) => {
      const competitionStart = new Date('2024-03-15T09:00:00Z').getTime();
      return submissions.some(s => {
        if (s.status === 'Accepted') {
          const submissionTime = new Date(s.timestamp).getTime();
          const timeTaken = (submissionTime - competitionStart) / (1000 * 60); // minutes
          return timeTaken <= 10;
        }
        return false;
      });
    }
  },
  {
    id: 'persistent',
    name: 'Persistent',
    description: 'Made 10 or more submissions',
    icon: '/newbie-badge.png',
    category: 'achievement',
    rarity: 'common',
    condition: (participant, submissions) => {
      return submissions.length >= 10;
    }
  },
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Solved a problem on first attempt',
    icon: '/newbie-badge.png',
    category: 'achievement',
    rarity: 'rare',
    condition: (participant, submissions) => {
      const problemAttempts = new Map<string, number>();
      
      for (const submission of submissions.sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      )) {
        const attempts = problemAttempts.get(submission.problemId) || 0;
        problemAttempts.set(submission.problemId, attempts + 1);
        
        if (submission.status === 'Accepted' && attempts === 0) {
          return true;
        }
      }
      return false;
    }
  },
  {
    id: 'polyglot',
    name: 'Polyglot',
    description: 'Used 3 different programming languages',
    icon: '/newbie-badge.png',
    category: 'achievement',
    rarity: 'rare',
    condition: (participant, submissions) => {
      const languages = new Set(submissions.map(s => s.language));
      return languages.size >= 3;
    }
  },
  {
    id: 'early-bird',
    name: 'Early Bird',
    description: 'First submission within 5 minutes of competition start',
    icon: '/newbie-badge.png',
    category: 'special',
    rarity: 'rare',
    condition: (participant, submissions) => {
      const competitionStart = new Date('2024-03-15T09:00:00Z').getTime();
      return submissions.some(s => {
        const submissionTime = new Date(s.timestamp).getTime();
        const timeTaken = (submissionTime - competitionStart) / (1000 * 60); // minutes
        return timeTaken <= 5;
      });
    }
  },
  {
    id: 'champion',
    name: 'Champion',
    description: 'Achieved top 3 ranking',
    icon: '/newbie-badge.png',
    category: 'special',
    rarity: 'legendary',
    condition: (participant, submissions) => {
      // This would need to be checked against current rankings
      // For now, we'll check if they have a high score
      return participant.score >= 300;
    }
  }
];

export const checkForNewBadges = (
  participant: Participant, 
  submissions: Submission[]
): BadgeDefinition[] => {
  const currentBadgeIds = participant.badges.map(b => b.id);
  const newBadges: BadgeDefinition[] = [];
  
  for (const badgeDefinition of BADGE_DEFINITIONS) {
    if (!currentBadgeIds.includes(badgeDefinition.id)) {
      if (badgeDefinition.condition(participant, submissions)) {
        newBadges.push(badgeDefinition);
      }
    }
  }
  
  return newBadges;
};

export const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'common':
      return 'border-white/30 bg-white/10';
    case 'rare':
      return 'border-blue-400/50 bg-blue-400/10';
    case 'epic':
      return 'border-purple-400/50 bg-purple-400/10';
    case 'legendary':
      return 'border-yellow-400/50 bg-yellow-400/10';
    default:
      return 'border-white/30 bg-white/10';
  }
};

export const getRarityTextColor = (rarity: string) => {
  switch (rarity) {
    case 'common':
      return 'text-white';
    case 'rare':
      return 'text-blue-400';
    case 'epic':
      return 'text-purple-400';
    case 'legendary':
      return 'text-yellow-400';
    default:
      return 'text-white';
  }
};