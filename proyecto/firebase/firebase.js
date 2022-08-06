import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore'
import { GoogleAuthProvider } from "firebase/auth";
import "firebase/compat/firestore";
import firebaseConfig from './config';
import { useRouter } from 'next/router';




class Firebase {

    

    constructor() {
        this.app = initializeApp(firebaseConfig);
        this.auth = getAuth(this.app)
        this.auth.languageCode = 'es_419';
        this.auth.useDeviceLanguage();

        this.storage = getStorage(this.app)

        this.db = getFirestore(this.app)

        this.providerGoogle = new GoogleAuthProvider();


    }

    async registrar(auth, email, password) {
        const nuevoUsuario = await createUserWithEmailAndPassword(auth, email, password)
        return nuevoUsuario.user
    }

    async registrarGoogle() {
        const nuevoUsuario = await signInWithPopup(this.auth, this.providerGoogle)
        return nuevoUsuario.user 
    }

    handleSignOut = () => {
        signOut(this.auth).then(() => {
          console.log("Sign-out successful.")
          console.log(this.auth)
          window.location.href = "http://localhost:3000//";
        }).catch((error) => {
          console.log("No se deslogueo")
        });
      
      }
}

const firebase = new Firebase();
export default firebase;