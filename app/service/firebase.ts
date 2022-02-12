import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAnalytics, logEvent } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const firebaseApp = initializeApp({
  apiKey: "AIzaSyDtuA2g8c2Wy3HW-XxSjeMtaeV4EfmpNUk",
  authDomain: "guptasiddhant-com.firebaseapp.com",
  databaseURL: "https://guptasiddhant-com.firebaseio.com",
  projectId: "guptasiddhant-com",
  storageBucket: "guptasiddhant-com.appspot.com",
  messagingSenderId: "693972243954",
  appId: "1:693972243954:web:9cabb4774c7f9e6196876b",
  measurementId: "G-SVFRY7WXKB",
})

export const firestoreInstance = getFirestore(firebaseApp)
export const storageInstance = getStorage(firebaseApp)
export const analyticsInstance = getAnalytics(firebaseApp)
