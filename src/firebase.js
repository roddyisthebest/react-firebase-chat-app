// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDx5n4xN-JwJpp0xa7LtkN28-PdjYxMhPo",
  authDomain: "react-firebase-chat-app-af9d2.firebaseapp.com",
  projectId: "react-firebase-chat-app-af9d2",
  storageBucket: "react-firebase-chat-app-af9d2.appspot.com",
  messagingSenderId: "885989209140",
  appId: "1:885989209140:web:9ed78a622be32b7d138661",
  measurementId: "G-9EYXLSCCDP",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default firebase;
