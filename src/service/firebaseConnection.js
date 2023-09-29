// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyCdcjsr3Lr_ZixgFGX18KGxyndwC5leV_g",
    authDomain: "venus-409b9.firebaseapp.com",
    projectId: "venus-409b9",
    storageBucket: "venus-409b9.appspot.com",
    messagingSenderId: "219471364957",
    appId: "1:219471364957:web:cd8ce7d9a8a53954591eb4",
    measurementId: "G-DLPYE57XER"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default db;
export { auth, provider }