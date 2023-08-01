import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAsZJJFz0Mp-zghDls2w3gydEgyQsLGIcA",
  authDomain: "kodisastram.firebaseapp.com",
  projectId: "kodisastram",
  storageBucket: "kodisastram.appspot.com",
  messagingSenderId: "1033442553182",
  appId: "1:1033442553182:android:08e214812ce2e0f91fb3cf",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const facebookAuthProvider = new FacebookAuthProvider();
export const db = getFirestore();
export const storage = getStorage(app);

export default app;
