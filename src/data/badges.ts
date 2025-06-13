import { BadgeDefinition, Participant, Submission } from '../types';

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  {
    id: 'newbie',
    name: 'Newbie',
    description: 'Solved your first coding problem',
    icon: '/pic.png',
    category: 'milestone',
    rarity: 'common',
    condition: (participant, submissions) => {
      console.log('🔍 Checking NEWBIE badge condition:');
      console.log('  - Participant:', participant.name);
      console.log('  - Total submissions:', submissions.length);
      console.log('  - Submission statuses:', submissions.map(s => s.status));
      
      const acceptedSubmissions = submissions.filter(s => s.status === 'Accepted');
      console.log('  - Accepted submissions:', acceptedSubmissions.length);
      
      const hasAcceptedSubmission = acceptedSubmissions.length > 0;
      console.log('  - Has accepted submission:', hasAcceptedSubmission);
      console.log('  - Current badges:', participant.badges?.map(b => b.name) || []);
      
      return hasAcceptedSubmission;
    }
  },
  {
    id: 'problem-solver',
    name: 'Problem Solver',
    description: 'Solved 3 problems',
    icon: '/pic.png',
    category: 'milestone',
    rarity: 'common',
    condition: (participant, submissions) => {
      console.log('🔍 Checking PROBLEM SOLVER badge condition:');
      console.log('  - Participant:', participant.name);
      
      const acceptedSubmissions = submissions.filter(s => s.status === 'Accepted');
      const solvedProblems = new Set(acceptedSubmissions.map(s => s.problemId));
      
      console.log('  - Accepted submissions:', acceptedSubmissions.length);
      console.log('  - Unique solved problems:', solvedProblems.size);
      console.log('  - Problem IDs solved:', Array.from(solvedProblems));
      
      const meetsCondition = solvedProblems.size >= 3;
      console.log('  - Meets condition (>=3):', meetsCondition);
      
      return meetsCondition;
    }
  },
  {
    id: 'code-master',
    name: 'Code Master',
    description: 'Solved all problems in the competition',
    icon: '/pic.png',
    category: 'achievement',
    rarity: 'epic',
    condition: (participant, submissions) => {
      console.log('🔍 Checking CODE MASTER badge condition:');
      console.log('  - Participant:', participant.name);
      
      const acceptedSubmissions = submissions.filter(s => s.status === 'Accepted');
      const solvedProblems = new Set(acceptedSubmissions.map(s => s.problemId));
      
      console.log('  - Unique solved problems:', solvedProblems.size);
      console.log('  - Total problems in competition:', 8); // 4 programming + 4 cryptography
      
      const meetsCondition = solvedProblems.size >= 8;
      console.log('  - Meets condition (>=8):', meetsCondition);
      
      return meetsCondition;
    }
  },
  {
    id: 'programming-expert',
    name: 'Programming Expert',
    description: 'Solved all programming challenges',
    icon: '/pic.png',
    category: 'achievement',
    rarity: 'rare',
    condition: (participant, submissions) => {
      console.log('🔍 Checking PROGRAMMING EXPERT badge condition:');
      console.log('  - Participant:', participant.name);
      
      const programmingProblems = ['two-sum', 'reverse-string', 'palindrome-number', 'fibonacci-sequence'];
      const acceptedSubmissions = submissions.filter(s => s.status === 'Accepted');
      const solvedProgrammingProblems = new Set(
        acceptedSubmissions
          .filter(s => programmingProblems.includes(s.problemId))
          .map(s => s.problemId)
      );
      
      console.log('  - Programming problems solved:', solvedProgrammingProblems.size);
      console.log('  - Programming problem IDs solved:', Array.from(solvedProgrammingProblems));
      
      const meetsCondition = solvedProgrammingProblems.size >= 4;
      console.log('  - Meets condition (>=4 programming problems):', meetsCondition);
      
      return meetsCondition;
    }
  },
  {
    id: 'security-expert',
    name: 'Security Expert',
    description: 'Solved all cryptography challenges',
    icon: '/pic.png',
    category: 'achievement',
    rarity: 'epic',
    condition: (participant, submissions) => {
      console.log('🔍 Checking SECURITY EXPERT badge condition:');
      console.log('  - Participant:', participant.name);
      
      const cryptographyProblems = ['caesar-cipher-cracker', 'password-strength-analyzer', 'simple-rsa-keygen', 'hash-collision-finder'];
      const acceptedSubmissions = submissions.filter(s => s.status === 'Accepted');
      const solvedCryptographyProblems = new Set(
        acceptedSubmissions
          .filter(s => cryptographyProblems.includes(s.problemId))
          .map(s => s.problemId)
      );
      
      console.log('  - Cryptography problems solved:', solvedCryptographyProblems.size);
      console.log('  - Cryptography problem IDs solved:', Array.from(solvedCryptographyProblems));
      
      const meetsCondition = solvedCryptographyProblems.size >= 4;
      console.log('  - Meets condition (>=4 cryptography problems):', meetsCondition);
      
      return meetsCondition;
    }
  },
  {
    id: 'crypto-cracker',
    name: 'Crypto Cracker',
    description: 'Successfully cracked the Caesar cipher',
    icon: '/pic.png',
    category: 'achievement',
    rarity: 'rare',
    condition: (participant, submissions) => {
      console.log('🔍 Checking CRYPTO CRACKER badge condition:');
      console.log('  - Participant:', participant.name);
      
      const caesarSolved = submissions.some(s => 
        s.problemId === 'caesar-cipher-cracker' && s.status === 'Accepted'
      );
      
      console.log('  - Caesar cipher solved:', caesarSolved);
      return caesarSolved;
    }
  },
  {
    id: 'password-guardian',
    name: 'Password Guardian',
    description: 'Built a comprehensive password strength analyzer',
    icon: '/pic.png',
    category: 'achievement',
    rarity: 'rare',
    condition: (participant, submissions) => {
      console.log('🔍 Checking PASSWORD GUARDIAN badge condition:');
      console.log('  - Participant:', participant.name);
      
      const passwordSolved = submissions.some(s => 
        s.problemId === 'password-strength-analyzer' && s.status === 'Accepted'
      );
      
      console.log('  - Password analyzer solved:', passwordSolved);
      return passwordSolved;
    }
  },
  {
    id: 'rsa-architect',
    name: 'RSA Architect',
    description: 'Implemented RSA key generation algorithm',
    icon: '/pic.png',
    category: 'achievement',
    rarity: 'epic',
    condition: (participant, submissions) => {
      console.log('🔍 Checking RSA ARCHITECT badge condition:');
      console.log('  - Participant:', participant.name);
      
      const rsaSolved = submissions.some(s => 
        s.problemId === 'simple-rsa-keygen' && s.status === 'Accepted'
      );
      
      console.log('  - RSA keygen solved:', rsaSolved);
      return rsaSolved;
    }
  },
  {
    id: 'hash-hunter',
    name: 'Hash Hunter',
    description: 'Found hash collisions and exposed vulnerabilities',
    icon: '/pic.png',
    category: 'achievement',
    rarity: 'epic',
    condition: (participant, submissions) => {
      console.log('🔍 Checking HASH HUNTER badge condition:');
      console.log('  - Participant:', participant.name);
      
      const hashSolved = submissions.some(s => 
        s.problemId === 'hash-collision-finder' && s.status === 'Accepted'
      );
      
      console.log('  - Hash collision finder solved:', hashSolved);
      return hashSolved;
    }
  },
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Solved a problem in under 10 minutes',
    icon: '/pic.png',
    category: 'achievement',
    rarity: 'rare',
    condition: (participant, submissions) => {
      console.log('🔍 Checking SPEED DEMON badge condition:');
      console.log('  - Participant:', participant.name);
      
      const competitionStart = new Date('2024-03-15T09:00:00Z').getTime();
      const acceptedSubmissions = submissions.filter(s => s.status === 'Accepted');
      
      for (const submission of acceptedSubmissions) {
        const submissionTime = new Date(submission.timestamp).getTime();
        const timeTaken = (submissionTime - competitionStart) / (1000 * 60); // minutes
        console.log(`  - Submission ${submission.id}: ${timeTaken.toFixed(2)} minutes`);
        
        if (timeTaken <= 10) {
          console.log('  - Found speed solution!');
          return true;
        }
      }
      
      console.log('  - No speed solutions found');
      return false;
    }
  },
  {
    id: 'persistent',
    name: 'Persistent',
    description: 'Made 10 or more submissions',
    icon: '/pic.png',
    category: 'achievement',
    rarity: 'common',
    condition: (participant, submissions) => {
      console.log('🔍 Checking PERSISTENT badge condition:');
      console.log('  - Participant:', participant.name);
      console.log('  - Total submissions:', submissions.length);
      
      const meetsCondition = submissions.length >= 10;
      console.log('  - Meets condition (>=10):', meetsCondition);
      
      return meetsCondition;
    }
  },
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Solved a problem on first attempt',
    icon: '/pic.png',
    category: 'achievement',
    rarity: 'rare',
    condition: (participant, submissions) => {
      console.log('🔍 Checking PERFECTIONIST badge condition:');
      console.log('  - Participant:', participant.name);
      
      const problemAttempts = new Map<string, number>();
      const sortedSubmissions = submissions.sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      
      for (const submission of sortedSubmissions) {
        const attempts = problemAttempts.get(submission.problemId) || 0;
        problemAttempts.set(submission.problemId, attempts + 1);
        
        if (submission.status === 'Accepted' && attempts === 0) {
          console.log(`  - Found first attempt success for problem: ${submission.problemId}`);
          return true;
        }
      }
      
      console.log('  - No first attempt successes found');
      return false;
    }
  },
  {
    id: 'polyglot',
    name: 'Polyglot',
    description: 'Used 3 different programming languages',
    icon: '/pic.png',
    category: 'achievement',
    rarity: 'rare',
    condition: (participant, submissions) => {
      console.log('🔍 Checking POLYGLOT badge condition:');
      console.log('  - Participant:', participant.name);
      
      const languages = new Set(submissions.map(s => s.language));
      console.log('  - Languages used:', Array.from(languages));
      console.log('  - Unique languages count:', languages.size);
      
      const meetsCondition = languages.size >= 3;
      console.log('  - Meets condition (>=3):', meetsCondition);
      
      return meetsCondition;
    }
  },
  {
    id: 'early-bird',
    name: 'Early Bird',
    description: 'First submission within 5 minutes of competition start',
    icon: '/pic.png',
    category: 'special',
    rarity: 'rare',
    condition: (participant, submissions) => {
      console.log('🔍 Checking EARLY BIRD badge condition:');
      console.log('  - Participant:', participant.name);
      
      const competitionStart = new Date('2024-03-15T09:00:00Z').getTime();
      
      for (const submission of submissions) {
        const submissionTime = new Date(submission.timestamp).getTime();
        const timeTaken = (submissionTime - competitionStart) / (1000 * 60); // minutes
        
        if (timeTaken <= 5) {
          console.log(`  - Found early submission: ${timeTaken.toFixed(2)} minutes`);
          return true;
        }
      }
      
      console.log('  - No early submissions found');
      return false;
    }
  },
  {
    id: 'champion',
    name: 'Champion',
    description: 'Achieved top 3 ranking',
    icon: '/pic.png',
    category: 'special',
    rarity: 'legendary',
    condition: (participant, submissions) => {
      console.log('🔍 Checking CHAMPION badge condition:');
      console.log('  - Participant:', participant.name);
      console.log('  - Score:', participant.score);
      
      // Updated threshold for expanded challenge set
      const meetsCondition = participant.score >= 500; // Increased from 300
      console.log('  - Meets condition (>=500 points):', meetsCondition);
      
      return meetsCondition;
    }
  }
];

export const checkForNewBadges = (
  participant: Participant, 
  submissions: Submission[]
): BadgeDefinition[] => {
  console.log('🏆 === CHECKING FOR NEW BADGES ===');
  console.log('🏆 Participant:', participant.name);
  console.log('🏆 Current badges in participant:', participant.badges?.map(b => b.name) || []);
  console.log('🏆 Submissions count:', submissions.length);
  console.log('🏆 Accepted submissions:', submissions.filter(s => s.status === 'Accepted').length);
  
  const currentBadgeIds = (participant.badges || []).map(b => b.id);
  console.log('🏆 Current badge IDs:', currentBadgeIds);
  
  const newBadges: BadgeDefinition[] = [];
  
  for (const badgeDefinition of BADGE_DEFINITIONS) {
    console.log(`\n🔍 Checking badge: ${badgeDefinition.name} (${badgeDefinition.id})`);
    
    const alreadyHasBadge = currentBadgeIds.includes(badgeDefinition.id);
    console.log('🔍 Already has badge:', alreadyHasBadge);
    
    if (!alreadyHasBadge) {
      console.log('🔍 Badge not yet earned, checking condition...');
      
      try {
        const meetsCondition = badgeDefinition.condition(participant, submissions);
        console.log('🔍 Meets condition:', meetsCondition);
        
        if (meetsCondition) {
          console.log(`✅ NEW BADGE EARNED: ${badgeDefinition.name}`);
          newBadges.push(badgeDefinition);
        } else {
          console.log(`❌ Condition not met for: ${badgeDefinition.name}`);
        }
      } catch (error) {
        console.error(`❌ Error checking condition for badge ${badgeDefinition.id}:`, error);
      }
    } else {
      console.log(`⏭️ Already has badge: ${badgeDefinition.name}`);
    }
  }
  
  console.log('🏆 === BADGE CHECK COMPLETE ===');
  console.log('🏆 New badges to award:', newBadges.map(b => b.name));
  
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