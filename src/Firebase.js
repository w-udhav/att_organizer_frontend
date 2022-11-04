import { initializeApp } from "firebase/app";
import { getDoc, getFirestore, collection, doc, setDoc, getDocs } from 'firebase/firestore'
import { getAuth, signOut } from 'firebase/auth'

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
export const auth = getAuth();

export function logout() {
  return signOut(auth);
}

export async function getDatabase(currentUser, docu) {
  const docRef = doc(db, currentUser, docu)
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document Data : ", docSnap.data())
  } else {
    console.log("No such document")
  }
}

export async function addDocument(data, currentUser) {
  const collRef = collection(db, currentUser)
  await setDoc(doc(collRef, data.name), {
    Name: data.name,
    occurred: parseFloat(data.occurred),
    attended: parseFloat(data.attended),
    min: parseFloat(data.min),
    achieved: parseFloat(data.achieved)
  })
}

export async function getCollections(currentUser) {
  const querySnapshot = await getDocs(collection(db, currentUser));
  const dataSet = [];
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data())
    if (doc.id !== 'userInfo') {
      dataSet.push(doc.data())
    }
  })
  return dataSet
}

export default db;