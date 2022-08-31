import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, sendEmailVerification, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage } from "firebase/storage";
import { doc, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore'
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

  async docExists(email){
    try {
      const docRef = doc(firebase.db, "Usuarios", email)
      console.log("docRef")
      const res = await getDoc(docRef)
      return res.exists()
    } catch (err) {
      console.log(err)
    }
  }

  async registrarGoogle() {
    const nuevoUsuario = await signInWithPopup(this.auth, this.providerGoogle)
    if (this.docExists(this.auth.currentUser.email)) {
      const docRef = doc(firebase.db, "Usuarios", this.auth.currentUser.email)
      const docSnap = await getDoc(docRef)
      const docSnapData = docSnap.data()
      await updateProfile(this.auth.currentUser, {
        displayName: docSnapData.nombreUsuario,
        photoURL: docSnapData.fotoPerfilURL
      })
      return
    } else {
      await setDoc(doc(firebase.db, "Usuarios", this.auth.currentUser.email), {
        nombreUsuario: nomUsu,
        uid: user.uid,
        mail: user.email,
        type: tipoCuenta,
      })

      // BEGIN IMAGENES
      const imagePerfRef = ref(storage, `imagenesDefault/perfilDefault.jpg`)
      const urlPerf = await getDownloadURL(imagePerfRef)
      await updateProfile(user, {
        photoURL: urlPerf
      }).then(() => {
        console.log("se actualizo la foto de display")
      }).catch((error) => {
        console.log(error.message)
        console.log("hubo un errror actualizando la foto de display")
      });

      await updateDoc(doc(firebase.db, "Usuarios", this.auth.currentUser.email), {
        fotoPerfilURL: urlPerf
      }).catch((error) => {
        console.log(error)
      })



      const imageFondRef = ref(storage, `imagenesDefault/fondoDefault.png`)
      const urlFondo = await getDownloadURL(imageFondRef)

      await updateDoc(doc(db, "Usuarios", this.auth.currentUser.email), {
        fotoFondoURL: urlFondo
      }).catch((error) => {
        console.log(error)
      })
      // END IMAGENES
      return
    }


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