import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import "firebase/compat/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import Router, { useRouter } from 'next/router';





const firebaseConfig = {

  apiKey: "AIzaSyCnheK3k_qYzNkMjSqsI-IR3Cpv-J_A-DU",

  authDomain: "inmo-proyect.firebaseapp.com",

  projectId: "inmo-proyect",

  storageBucket: "inmo-proyect.appspot.com",

  messagingSenderId: "808798012448",

  appId: "1:808798012448:web:8f76818987dd5842c56845",

  measurementId: "G-TB696FC916"

};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
auth.languageCode = 'es_419';
auth.useDeviceLanguage();

const storage = getStorage(app)

const db = getFirestore(app)

const providerGoogle = new GoogleAuthProvider();




const handleSignOut = () => {

  signOut(auth).then(() => {
    console.log("Sign-out successful.")
    console.log(auth)
    localStorage.setItem('isLogged', false)
    localStorage.setItem('authAux', JSON.stringify({}))
    localStorage.setItem('siguienteCRP2', false)
    console.log(localStorage.getItem('isLogged') + ' localStorage isLogged')
    console.log('localStorage authAux abajo')
    console.log(JSON.parse(localStorage.getItem('authAux')))
    window.location.href = "http://localhost:3000//";
  }).catch((error) => {
    console.log("No se deslogueo")
  });

}


export { app, storage, auth, db, providerGoogle, handleSignOut } 
