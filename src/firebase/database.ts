import { 
  ref, 
  push, 
  set, 
  get, 
  update,
  onValue,
  query,
  orderByChild,
  equalTo,
  off
} from 'firebase/database';
import { database } from './config';
import { Participant, Submission } from '../types';

// Database paths
export const DB_PATHS = {
  PARTICIPANTS: 'participants',
  SUBMISSIONS: 'submissions',
  CHALLENGES: 'challenges'
};

// Participant operations
export const createParticipant = async (participant: Omit<Participant, 'id' | 'score' | 'solvedProblems' | 'penaltyTime' | 'createdAt' | 'badges'>) => {
  const newParticipant = {
    ...participant,
    score: 0,
    solvedProblems: 0,
    penaltyTime: 0,
    badges: [],
    createdAt: new Date().toISOString()
  };
  
  const participantsRef = ref(database, DB_PATHS.PARTICIPANTS);
  const newParticipantRef = push(participantsRef);
  await set(newParticipantRef, newParticipant);
  
  return { id: newParticipantRef.key!, ...newParticipant };
};

export const getParticipants = async (): Promise<Participant[]> => {
  const participantsRef = ref(database, DB_PATHS.PARTICIPANTS);
  const snapshot = await get(participantsRef);
  
  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.keys(data).map(key => ({
      id: key,
      badges: [], // Ensure badges array exists
      ...data[key]
    } as Participant)).sort((a, b) => {
      // Sort by score descending, then by penalty time ascending
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.penaltyTime - b.penaltyTime;
    });
  }
  
  return [];
};

export const getParticipant = async (id: string): Promise<Participant | null> => {
  const participantRef = ref(database, `${DB_PATHS.PARTICIPANTS}/${id}`);
  const snapshot = await get(participantRef);
  
  if (snapshot.exists()) {
    const data = snapshot.val();
    return { 
      id, 
      badges: [], // Ensure badges array exists
      ...data 
    } as Participant;
  }
  
  return null;
};

export const getParticipantByEmail = async (email: string): Promise<Participant | null> => {
  const participantsRef = query(
    ref(database, DB_PATHS.PARTICIPANTS),
    orderByChild('email'),
    equalTo(email)
  );
  
  const snapshot = await get(participantsRef);
  
  if (snapshot.exists()) {
    const data = snapshot.val();
    const participantId = Object.keys(data)[0];
    const participantData = data[participantId];
    return { 
      id: participantId, 
      badges: [], // Ensure badges array exists
      ...participantData 
    } as Participant;
  }
  
  return null;
};

export const getParticipantByStudentNumber = async (studentNumber: string): Promise<Participant | null> => {
  const participantsRef = query(
    ref(database, DB_PATHS.PARTICIPANTS),
    orderByChild('studentNumber'),
    equalTo(studentNumber)
  );
  
  const snapshot = await get(participantsRef);
  
  if (snapshot.exists()) {
    const data = snapshot.val();
    const participantId = Object.keys(data)[0];
    const participantData = data[participantId];
    return { 
      id: participantId, 
      badges: [], // Ensure badges array exists
      ...participantData 
    } as Participant;
  }
  
  return null;
};

export const updateParticipant = async (id: string, updates: Partial<Participant>) => {
  const participantRef = ref(database, `${DB_PATHS.PARTICIPANTS}/${id}`);
  await update(participantRef, updates);
};

// Submission operations
export const createSubmission = async (submission: Omit<Submission, 'id' | 'timestamp'>) => {
  const newSubmission = {
    ...submission,
    timestamp: new Date().toISOString()
  };
  
  const submissionsRef = ref(database, DB_PATHS.SUBMISSIONS);
  const newSubmissionRef = push(submissionsRef);
  await set(newSubmissionRef, newSubmission);
  
  return { id: newSubmissionRef.key!, ...newSubmission };
};

export const getSubmissions = async (participantId?: string): Promise<Submission[]> => {
  let submissionsRef;
  
  if (participantId) {
    submissionsRef = query(
      ref(database, DB_PATHS.SUBMISSIONS),
      orderByChild('participantId'),
      equalTo(participantId)
    );
  } else {
    submissionsRef = ref(database, DB_PATHS.SUBMISSIONS);
  }
  
  const snapshot = await get(submissionsRef);
  
  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.keys(data).map(key => ({
      id: key,
      ...data[key]
    } as Submission)).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }
  
  return [];
};

// Real-time listeners
export const subscribeToParticipants = (callback: (participants: Participant[]) => void) => {
  const participantsRef = ref(database, DB_PATHS.PARTICIPANTS);
  
  const unsubscribe = onValue(participantsRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const participants = Object.keys(data).map(key => ({
        id: key,
        badges: [], // Ensure badges array exists
        ...data[key]
      } as Participant)).sort((a, b) => {
        // Sort by score descending, then by penalty time ascending
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return a.penaltyTime - b.penaltyTime;
      });
      
      callback(participants);
    } else {
      callback([]);
    }
  });
  
  return () => off(participantsRef, 'value', unsubscribe);
};

export const subscribeToSubmissions = (participantId: string, callback: (submissions: Submission[]) => void) => {
  const submissionsRef = query(
    ref(database, DB_PATHS.SUBMISSIONS),
    orderByChild('participantId'),
    equalTo(participantId)
  );
  
  const unsubscribe = onValue(submissionsRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const submissions = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      } as Submission)).sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      
      callback(submissions);
    } else {
      callback([]);
    }
  });
  
  return () => off(submissionsRef, 'value', unsubscribe);
};

export const subscribeToAllSubmissions = (callback: (submissions: Submission[]) => void) => {
  const submissionsRef = ref(database, DB_PATHS.SUBMISSIONS);
  
  const unsubscribe = onValue(submissionsRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const submissions = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      } as Submission)).sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      
      callback(submissions);
    } else {
      callback([]);
    }
  });
  
  return () => off(submissionsRef, 'value', unsubscribe);
};