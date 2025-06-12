import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBfAxHQirlmSbR1gGQD8SoLKoCxRdQCwxY",
  authDomain: "facebook12-33711.firebaseapp.com",
  databaseURL: "https://facebook12-33711-default-rtdb.firebaseio.com",
  projectId: "facebook12-33711",
  storageBucket: "facebook12-33711.appspot.com",
  messagingSenderId: "1020382277222",
  appId: "1:1020382277222:web:3a553c46a76d5b337007a7",
  measurementId: "G-9D31WLWP06"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
export default app;