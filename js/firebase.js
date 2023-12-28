import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVevm68YOQAd01bMTyaswAb9j8-TJOvvM",
  authDomain: "p2earn-f36ae.firebaseapp.com",
  projectId: "p2earn-f36ae",
  storageBucket: "p2earn-f36ae.appspot.com",
  messagingSenderId: "596533943453",
  appId: "1:596533943453:web:425590cc182078b1754874",
  measurementId: "G-2S1Q79MMN5"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.getAnalytics(app);
const auth = firebase.getAuth(app);
const firestore = getFirestore(app);