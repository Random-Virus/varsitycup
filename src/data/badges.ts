import { BadgeDefinition, Participant, Submission } from '../types';

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  {
    id: 'newbie',
    name: 'Newbie',
    description: 'Solved your first coding problem',
    icon: '/newbie-badge.png',
    category: 'milestone',
    rarity: 'common',
    condition: (participant, submissions) => {
      console.log('Checking newbie badge condition:', {
        participantName: participant.name,
        submissions: submissions.length,
        acceptedSubmissions: submissions.filter(s => s.status === 'Accepted').length
      });
      
      const hasAcceptedSubmission = submissions.some(s => s.status === 'Accepted');
      console.log('Has accepted submission:', hasAcceptedSubmission);
      return hasAcceptedSubmission;
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
      console.log('Problem solver check:', {
        participantName: participant.name,
        uniqueSolvedProblems: solvedProblems.size,
        needed: 3
      });
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
      console.log('Code master check:', {
        participantName: participant.name,
        uniqueSolvedProblems: solvedProblems.size,
        totalProblems: 4
      });
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
      const hasSpeedSolution = submissions.some(s => {
        if (s.status === 'Accepted') {
          const submissionTime = new Date(s.timestamp).getTime();
          const timeTaken = (submissionTime - competitionStart) / (1000 * 60); // minutes
          return timeTaken <= 10;
        }
        return false;
      });
      console.log('Speed demon check:', {
        participantName: participant.name,
        hasSpeedSolution
      });
      return hasSpeedSolution;
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
      console.log('Persistent check:', {
        participantName: participant.name,
        totalSubmissions: submissions.length,
        needed: 10
      });
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
          console.log('Perfectionist check - found first attempt success:', {
            participantName: participant.name,
            problemId: submission.problemId
          });
          return true;
        }
      }
      console.log('Perfectionist check - no first attempt success:', {
        participantName: participant.name
      });
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
      console.log('Polyglot check:', {
        participantName: participant.name,
        uniqueLanguages: languages.size,
        languages: Array.from(languages),
        needed: 3
      });
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
      const hasEarlySubmission = submissions.some(s => {
        const submissionTime = new Date(s.timestamp).getTime();
        const timeTaken = (submissionTime - competitionStart) / (1000 * 60); // minutes
        return timeTaken <= 5;
      });
      console.log('Early bird check:', {
        participantName: participant.name,
        hasEarlySubmission
      });
      return hasEarlySubmission;
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
      const isChampion = participant.score >= 300;
      console.log('Champion check:', {
        participantName: participant.name,
        score: participant.score,
        isChampion
      });
      return isChampion;
    }
  }
];

export const checkForNewBadges = (
  participant: Participant, 
  submissions: Submission[]
): BadgeDefinition[] => {
  console.log('=== CHECKING FOR NEW BADGES ===');
  console.log('Participant:', participant.name);
  console.log('Current badges:', participant.badges?.map(b => b.name) || []);
  console.log('Submissions count:', submissions.length);
  console.log('Accepted submissions:', submissions.filter(s => s.status === 'Accepted').length);
  
  const currentBadgeIds = (participant.badges || []).map(b => b.id);
  const newBadges: BadgeDefinition[] = [];
  
  for (const badgeDefinition of BADGE_DEFINITIONS) {
    console.log(`\nChecking badge: ${badgeDefinition.name} (${badgeDefinition.id})`);
    console.log('Already has badge:', currentBadgeIds.includes(badgeDefinition.id));
    
    if (!currentBadgeIds.includes(badgeDefinition.id)) {
      console.log('Badge not yet earned, checking condition...');
      
      try {
        const meetsCondition = badgeDefinition.condition(participant, submissions);
        console.log('Meets condition:', meetsCondition);
        
        if (meetsCondition) {
          console.log(`✅ NEW BADGE EARNED: ${badgeDefinition.name}`);
          newBadges.push(badgeDefinition);
        }
      } catch (error) {
        console.error(`Error checking condition for badge ${badgeDefinition.id}:`, error);
      }
    }
  }
  
  console.log('=== BADGE CHECK COMPLETE ===');
  console.log('New badges to award:', newBadges.map(b => b.name));
  
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