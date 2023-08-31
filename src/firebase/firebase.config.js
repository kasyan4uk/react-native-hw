import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCV5ES6qJ4s_F5HMDHppTiGoWrexyQLlS8",
  authDomain: "awesomeproject-b6ee1.firebaseapp.com",
  databaseURL: "https://awesomeproject-b6ee1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "awesomeproject-b6ee1",
  storageBucket: "awesomeproject-b6ee1.appspot.com",
  messagingSenderId: "1093882833154",
  appId: "1:1093882833154:web:e146e572881150ce4bba1b",
  measurementId: "G-JGRZMDL022"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };
