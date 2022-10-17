// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKAKrmIrBJrzEW0u7ogcH5qSyqbFe9C2c",
  authDomain: "bluebutterfly-2e50b.firebaseapp.com",
  projectId: "bluebutterfly-2e50b",
  storageBucket: "bluebutterfly-2e50b.appspot.com",
  messagingSenderId: "34853977626",
  appId: "1:34853977626:web:600818cab471cfe1a29ba3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);