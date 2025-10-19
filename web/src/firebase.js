// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjifgEMmEzIMeVL9UzVG3mMxnjwC1_BEw",
  authDomain: "contestify-3209e.firebaseapp.com",
  projectId: "contestify-3209e",
  storageBucket: "contestify-3209e.firebasestorage.app",
  messagingSenderId: "98458256488",
  appId: "1:98458256488:web:4d43580f22ec49cf02e7dd",
  measurementId: "G-EVDH1ZQ1K5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);
export const analytics = getAnalytics(app);