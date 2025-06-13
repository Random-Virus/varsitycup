import React, { createContext, useContext, useState, useEffect } from 'react';
import { signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase/config';
import { 
  createParticipant, 
  getParticipants, 
  updateParticipant,
  createSubmission,
  getSubmissions,
  subscribeToParticipants,
  subscribeToSubmissions,
  getParticipantByEmail,
  getParticipantByStudentNumber
} from '../firebase/database';
import { Participant, Challenge, Submission, Badge } from '../types';
import { mockChallenge, cryptographyChallenge, dataStructuresChallenge, validateSubmission } from '../data/mockData';
import { checkForNewBadges, BADGE_DEFINITIONS } from '../data/badges';

interface AppContextType {
  currentUser: Participant | null;
  participants: Participant[];
  challenge: Challenge;
  cryptographyChallenge: Challenge;
  dataStructuresChallenge: Challenge;
  submissions: Submission[];
  registerParticipant: (participant: Omit<Participant, 'id' | 'score' | 'solvedProblems' | 'createdAt' | 'badges'>) => Promise<void>;
  loginParticipant: (email: string, studentNumber: string) => Promise<void>;
  logoutParticipant: () => void;
  submitSolution: (problemId: string, code: string, language: string) => Promise<Submission>;
  timeRemaining: number;
  notifications: string[];
  dismissNotification: (index: number) => void;
  loading: boolean;
  authUser: User | null;
  // Badge popup state
  selectedBadge: Badge | null;
  isBadgeModalOpen: boolean;
  showBadgeModal: (badge: Badge) => void;
  closeBadgeModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<Participant | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [challenge] = useState<Challenge>(mockChallenge);
  const [cryptoChallenge] = useState<Challenge>(cryptographyChallenge);
  const [dataStructuresChall] = useState<Challenge>(dataStructuresChallenge);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [authUser, setAuthUser] = useState<User | null>(null);
  
  // Badge modal state
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);

  // Badge modal functions
  const showBadgeModal = (badge: Badge) => {
    setSelectedBadge(badge);
    setIsBadgeModalOpen(true);
  };

  const closeBadgeModal = () => {
    setIsBadgeModalOpen(false);
    setSelectedBadge(null);
  };

  // Initialize Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setAuthUser(user);
      
      if (user) {
        // Check if user has a participant profile
        const storedParticipantId = localStorage.getItem('participantId');
        if (storedParticipantId) {
          // Load participant data from Realtime Database
          try {
            const participantData = await getParticipants();
            const participant = participantData.find(p => p.id === storedParticipantId);
            if (participant) {
              console.log('Loaded participant with badges:', participant.badges);
              setCurrentUser(participant);
            }
          } catch (error) {
            console.error('Error loading participant:', error);
          }
        }
      } else {
        // Sign in anonymously
        try {
          await signInAnonymously(auth);
        } catch (error) {
          console.error('Error signing in anonymously:', error);
        }
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Subscribe to participants updates
  useEffect(() => {
    const unsubscribe = subscribeToParticipants((updatedParticipants) => {
      console.log('Participants updated from database:', updatedParticipants.map(p => ({ name: p.name, badges: p.badges?.length || 0 })));
      setParticipants(updatedParticipants);
      
      // Update current user if they're in the list
      if (currentUser) {
        const updatedCurrentUser = updatedParticipants.find(p => p.id === currentUser.id);
        if (updatedCurrentUser) {
          console.log('Current user updated with badges:', updatedCurrentUser.badges);
          setCurrentUser(updatedCurrentUser);
        }
      }
    });

    return () => unsubscribe();
  }, [currentUser]);

  // Subscribe to current user's submissions
  useEffect(() => {
    if (currentUser) {
      const unsubscribe = subscribeToSubmissions(currentUser.id, (updatedSubmissions) => {
        console.log('Submissions updated for user:', currentUser.name, 'Count:', updatedSubmissions.length);
        setSubmissions(updatedSubmissions);
        
        // Check for new badges after submissions update
        setTimeout(() => {
          checkAndAwardBadges(currentUser, updatedSubmissions);
        }, 500); // Small delay to ensure database consistency
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  // Calculate time remaining
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const end = new Date(challenge.endTime);
      const diff = end.getTime() - now.getTime();
      setTimeRemaining(Math.max(0, diff));
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [challenge]);

  // Check and award new badges
  const checkAndAwardBadges = async (participant: Participant, userSubmissions: Submission[]) => {
    console.log('=== CHECKING BADGES FOR PARTICIPANT ===');
    console.log('Participant:', participant.name);
    console.log('Current badges in participant object:', participant.badges);
    console.log('Submissions count:', userSubmissions.length);
    console.log('Accepted submissions:', userSubmissions.filter(s => s.status === 'Accepted').length);
    
    try {
      // Get fresh participant data from database to ensure we have latest badges
      const freshParticipants = await getParticipants();
      const freshParticipant = freshParticipants.find(p => p.id === participant.id);
      
      if (!freshParticipant) {
        console.error('Could not find fresh participant data');
        return;
      }
      
      console.log('Fresh participant badges from database:', freshParticipant.badges);
      
      const newBadges = checkForNewBadges(freshParticipant, userSubmissions);
      console.log('New badges to award:', newBadges);
      
      if (newBadges.length > 0) {
        const currentBadges = freshParticipant.badges || [];
        const updatedBadges: Badge[] = [
          ...currentBadges,
          ...newBadges.map(badgeDefinition => ({
            id: badgeDefinition.id,
            name: badgeDefinition.name,
            description: badgeDefinition.description,
            icon: badgeDefinition.icon,
            category: badgeDefinition.category,
            rarity: badgeDefinition.rarity,
            earnedAt: new Date().toISOString()
          }))
        ];
        
        console.log('Updating participant badges in database:', updatedBadges);
        
        // Update badges in database
        await updateParticipant(participant.id, { badges: updatedBadges });
        
        // Show notifications for new badges
        newBadges.forEach(badge => {
          addNotification(`🏆 Badge Earned: ${badge.name} - ${badge.description}`);
        });
        
        console.log('✅ Badges successfully updated in database!');
        
        // Force refresh participant data
        setTimeout(async () => {
          try {
            const refreshedParticipants = await getParticipants();
            const refreshedParticipant = refreshedParticipants.find(p => p.id === participant.id);
            if (refreshedParticipant) {
              console.log('Refreshed participant badges:', refreshedParticipant.badges);
              setCurrentUser(refreshedParticipant);
            }
          } catch (error) {
            console.error('Error refreshing participant data:', error);
          }
        }, 1000);
        
      } else {
        console.log('No new badges to award');
      }
    } catch (error) {
      console.error('Error in checkAndAwardBadges:', error);
    }
  };

  // Register a new participant
  const registerParticipant = async (participantData: Omit<Participant, 'id' | 'score' | 'solvedProblems' | 'createdAt' | 'badges'>) => {
    try {
      // Check if email already exists
      const existingEmailParticipant = await getParticipantByEmail(participantData.email);
      if (existingEmailParticipant) {
        throw new Error('A participant with this email address is already registered.');
      }

      // Check if student number already exists
      const existingStudentParticipant = await getParticipantByStudentNumber(participantData.studentNumber);
      if (existingStudentParticipant) {
        throw new Error('A participant with this student number is already registered.');
      }

      const newParticipant = await createParticipant(participantData);
      console.log('New participant created with badges:', newParticipant.badges);
      setCurrentUser(newParticipant);
      localStorage.setItem('participantId', newParticipant.id);
      addNotification(`Welcome ${newParticipant.name}! You have been registered successfully.`);
    } catch (error) {
      console.error('Error registering participant:', error);
      if (error instanceof Error) {
        addNotification(error.message);
        throw error;
      } else {
        addNotification('Error registering participant. Please try again.');
        throw new Error('Registration failed');
      }
    }
  };

  // Login an existing participant
  const loginParticipant = async (email: string, studentNumber: string) => {
    try {
      // Find participant by email
      const participant = await getParticipantByEmail(email);
      
      if (!participant) {
        throw new Error('No participant found with this email address.');
      }

      // Verify student number matches
      if (participant.studentNumber !== studentNumber) {
        throw new Error('Student number does not match the registered email.');
      }

      console.log('Logged in participant with badges:', participant.badges);
      setCurrentUser(participant);
      localStorage.setItem('participantId', participant.id);
      addNotification(`Welcome back, ${participant.name}!`);
    } catch (error) {
      console.error('Error logging in participant:', error);
      if (error instanceof Error) {
        addNotification(error.message);
        throw error;
      } else {
        addNotification('Error logging in. Please try again.');
        throw new Error('Login failed');
      }
    }
  };

  // Logout participant
  const logoutParticipant = () => {
    setCurrentUser(null);
    setSubmissions([]);
    localStorage.removeItem('participantId');
    addNotification('You have been logged out successfully.');
  };

  // Submit a solution
  const submitSolution = async (problemId: string, code: string, language: string): Promise<Submission> => {
    if (!currentUser) {
      throw new Error('You must be logged in to submit a solution');
    }

    try {
      const validationResult = validateSubmission(code, language, problemId);
      
      const submission = await createSubmission({
        participantId: currentUser.id,
        problemId,
        code,
        language,
        status: validationResult.status,
        testResults: validationResult.testResults,
      });

      console.log('Submission created:', submission);

      // Update participant score if submission is accepted
      if (submission.status === 'Accepted') {
        // Find problem in any of the challenge sets
        const allProblems = [...challenge.problems, ...cryptoChallenge.problems, ...dataStructuresChall.problems];
        const problem = allProblems.find(p => p.id === problemId);
        
        if (problem) {
          // Check if this is the first time solving this problem
          const existingSubmissions = await getSubmissions(currentUser.id);
          const alreadySolved = existingSubmissions.some(
            s => s.problemId === problemId && s.status === 'Accepted' && s.id !== submission.id
          );
          
          if (!alreadySolved) {
            const newScore = currentUser.score + problem.points;
            const newSolvedProblems = currentUser.solvedProblems + 1;
            
            console.log('Updating participant score:', { newScore, newSolvedProblems });
            
            await updateParticipant(currentUser.id, {
              score: newScore,
              solvedProblems: newSolvedProblems,
            });
            
            addNotification(`Congratulations! You solved "${problem.title}" and earned ${problem.points} points!`);
            
            // Force check badges after score update with fresh data
            setTimeout(async () => {
              try {
                const freshParticipants = await getParticipants();
                const updatedParticipant = freshParticipants.find(p => p.id === currentUser.id);
                if (updatedParticipant) {
                  const allSubmissions = await getSubmissions(currentUser.id);
                  console.log('Checking badges after score update with fresh data');
                  await checkAndAwardBadges(updatedParticipant, allSubmissions);
                }
              } catch (error) {
                console.error('Error checking badges after score update:', error);
              }
            }, 1500); // Longer delay to ensure database consistency
          }
        }
      } else {
        const allProblems = [...challenge.problems, ...cryptoChallenge.problems, ...dataStructuresChall.problems];
        const problem = allProblems.find(p => p.id === problemId);
        addNotification(`Your submission for "${problem?.title}" was not accepted.`);
      }
      
      return submission;
    } catch (error) {
      console.error('Error submitting solution:', error);
      throw error;
    }
  };

  // Add a notification
  const addNotification = (message: string) => {
    setNotifications(prev => [...prev, message]);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      dismissNotification(0);
    }, 5000);
  };

  // Dismiss a notification
  const dismissNotification = (index: number) => {
    setNotifications(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        participants,
        challenge,
        cryptographyChallenge: cryptoChallenge,
        dataStructuresChallenge: dataStructuresChall,
        submissions,
        registerParticipant,
        loginParticipant,
        logoutParticipant,
        submitSolution,
        timeRemaining,
        notifications,
        dismissNotification,
        loading,
        authUser,
        selectedBadge,
        isBadgeModalOpen,
        showBadgeModal,
        closeBadgeModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};