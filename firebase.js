import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
getDocs,
doc,
updateDoc
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAS1tcG7WCprB3JsAwTP98-v-PtMFA-UBA",
  authDomain: "vrundavan-masala.firebaseapp.com",
  projectId: "vrundavan-masala",
  storageBucket: "vrundavan-masala.firebasestorage.app",
  messagingSenderId: "311444034414",
  appId: "1:311444034414:web:e9b83fb0b679b71964677f",
  measurementId: "G-06NRX08J90"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export {
collection,
addDoc,
getDocs,
doc,
updateDoc,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut
};