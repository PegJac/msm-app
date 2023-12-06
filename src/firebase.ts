import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { getAuth } from "firebase/auth";

export const firebaseApp = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "msm-app-a58f4.firebaseapp.com",
  projectId: "msm-app-a58f4",
  storageBucket: "msm-app-a58f4.appspot.com",
  messagingSenderId: "285989174470",
  appId: "1:285989174470:web:8a18884402f73b0fd5abc7",
  measurementId: "G-C28KPS9WWP",
});

//db
export const db = getFirestore();
export const messagesRef = collection(db, "messages");
export const titleRef = collection(db, "titles");
export const featureRef = collection(db, "featured");

//img storage
const storage = getStorage();
export const storageRef = ref(storage);

//auth
export const auth = getAuth(firebaseApp);
