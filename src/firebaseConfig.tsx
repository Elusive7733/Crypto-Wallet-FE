import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiFFvu1qkNQmnxAZhy7VNKZtLBlDjyZvw",
  authDomain: "cryptowallet-8558f.firebaseapp.com",
  projectId: "cryptowallet-8558f",
  storageBucket: "cryptowallet-8558f.appspot.com",
  messagingSenderId: "1089939393965",
  appId: "1:1089939393965:web:783997a74eb5f4bda46524",
  measurementId: "G-JW5L78JHT0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
