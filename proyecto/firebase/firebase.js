import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, sendEmailVerification } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore'
import "firebase/compat/firestore";
import firebaseConfig from './config';



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

  async iniciarSesion(email, password) {
    signInWithEmailAndPassword(this.auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      return user
    }).catch((error) => {
      const errorCode = error.code;
      console.log(errorCode)
      const errorMessage = error.message;
      console.log(errorMessage)
      return errorMessage
    });
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

  verificar = async () => {
    const actionCodeSettings = {
      url: 'http://localhost:3000/',
      handleCodeInApp: true,
    };

    await sendEmailVerification(this.auth, actionCodeSettings)
    console.log("se reenvio")
  }
}

const firebase = new Firebase();
export default firebase;