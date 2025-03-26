// firebase/firebaseConfig.jsx
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDkd3Lqg9utiCr0ASYELNqqLXM9hmvTAO0",
    authDomain: "zingster-dbf39.firebaseapp.com",
    projectId: "zingster-dbf39",
    storageBucket: "zingster-dbf39.appspot.com", // Fixed storageBucket typo
    messagingSenderId: "714958255522",
    appId: "1:714958255522:web:178bff32dd46c935d4aefb",
    measurementId: "G-JRNN49NKZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
