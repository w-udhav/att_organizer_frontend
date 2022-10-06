import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBhun3zbzWCysP1KYEH4gkuAv1VvOosgqA",
  authDomain: "playground-22564.firebaseapp.com",
  projectId: "playground-22564",
  storageBucket: "playground-22564.appspot.com",
  messagingSenderId: "305912747776",
  appId: "1:305912747776:web:07a57faadbca61624cc5e5",
  measurementId: "G-3K377N6152"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };