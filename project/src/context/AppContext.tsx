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
  subscribeToSubmissions
} from '../firebase/database';
import { Participant, Challenge, Submission } from '../types';
import { mockChallenge, validateSubmission } from '../data/mockData';

interface AppContextType {
  currentUser: Participant | null;
  participants: Participant[];
  challenge: Challenge;
  submissions: Submission[];
  registerParticipant: (participant: Omit<Participant, 'id' | 'score' | 'solvedProblems' | 'penaltyTime' | 'createdAt'>) => Promise<void>;
  submitSolution: (problemId: string, code: string, language: string) => Promise<Submission>;
  timeRemaining: number;
  notifications: string[];
  dismissNotification: (index: number) => void;
  loading: boolean;
  authUser: User | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<Participant | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [challenge] = useState<Challenge>(mockChallenge);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [authUser, setAuthUser] = useState<User | null>(null);

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
      setParticipants(updatedParticipants);
      
      // Update current user if they're in the list
      if (currentUser) {
        const updatedCurrentUser = updatedParticipants.find(p => p.id === currentUser.id);
        if (updatedCurrentUser) {
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
        setSubmissions(updatedSubmissions);
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

  // Register a new participant
  const registerParticipant = async (participantData: Omit<Participant, 'id' | 'score' | 'solvedProblems' | 'penaltyTime' | 'createdAt'>) => {
    try {
      const newParticipant = await createParticipant(participantData);
      setCurrentUser(newParticipant);
      localStorage.setItem('participantId', newParticipant.id);
      addNotification(`Welcome ${newParticipant.name}! You have been registered successfully.`);
    } catch (error) {
      console.error('Error registering participant:', error);
      addNotification('Error registering participant. Please try again.');
    }
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

      // Update participant score if submission is accepted
      if (submission.status === 'Accepted') {
        const problem = challenge.problems.find(p => p.id === problemId);
        if (problem) {
          // Check if this is the first time solving this problem
          const existingSubmissions = await getSubmissions(currentUser.id);
          const alreadySolved = existingSubmissions.some(
            s => s.problemId === problemId && s.status === 'Accepted' && s.id !== submission.id
          );
          
          if (!alreadySolved) {
            const newScore = currentUser.score + problem.points;
            const newSolvedProblems = currentUser.solvedProblems + 1;
            const newPenaltyTime = currentUser.penaltyTime + Math.floor((new Date().getTime() - new Date(challenge.startTime).getTime()) / (1000 * 60));
            
            await updateParticipant(currentUser.id, {
              score: newScore,
              solvedProblems: newSolvedProblems,
              penaltyTime: newPenaltyTime,
            });
            
            addNotification(`Congratulations! You solved "${problem.title}" and earned ${problem.points} points!`);
          }
        }
      } else {
        addNotification(`Your submission for "${challenge.problems.find(p => p.id === problemId)?.title}" was not accepted.`);
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
        submissions,
        registerParticipant,
        submitSolution,
        timeRemaining,
        notifications,
        dismissNotification,
        loading,
        authUser,
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