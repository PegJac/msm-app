import { initializeApp } from "firebase/app"
import { collection, getFirestore } from "firebase/firestore"
import { getStorage, ref } from "firebase/storage"

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyC7_Guvm1Hy53QeGMnZhPCLa2mWc6cqvZ0",
    authDomain: "msm-app-a58f4.firebaseapp.com",
    projectId: "msm-app-a58f4",
    storageBucket: "msm-app-a58f4.appspot.com",
    messagingSenderId: "285989174470",
    appId: "1:285989174470:web:8a18884402f73b0fd5abc7",
    measurementId: "G-C28KPS9WWP"
});

export const db = getFirestore(firebaseApp)
export const messagesRef = collection(db, "messages")
export const titleRef = collection(db, "titles")

const storage = getStorage();
export const storageRef = ref(storage);