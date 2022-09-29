import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, sendEmailVerification, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { doc, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore'
import "firebase/compat/firestore";
import firebaseConfig from './config';
import cors from "cors"


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






  async docExists(uid) {
    try {
      const docRef = doc(firebase.db, "Usuarios", uid)
      console.log("docRef")
      const res = await getDoc(docRef)
      return res.exists()
    } catch (err) {
      console.log(err)
    }
  }









  async registrarGoogle() {
    const nuevoUsuario = await signInWithPopup(this.auth, this.providerGoogle)
    let isRegistered = await this.docExists(this.auth.currentUser.uid).then((r) => {return r})
    console.log(isRegistered)
    if (isRegistered == true) {
      console.log("adentro")
      const docRef = doc(this.db, "Usuarios", this.auth.currentUser.uid)
      console.log(docRef)
      const docSnap = await getDoc(docRef)
      console.log(docSnap)
      const docSnapData = docSnap.data()
      console.log(docSnap.data())
      await updateProfile(this.auth.currentUser, {
        displayName: docSnapData.nombreUsuario,
        photoURL: docSnapData.fotoPerfilURL
      })
      return
    } 
    
    
    else {
      await setDoc(doc(this.db, "Usuarios", this.auth.currentUser.uid), {
        nombreUsuario: this.auth.currentUser.displayName,
        uid: this.auth.currentUser.uid,
        mail: this.auth.currentUser.email,
        type: "particular",
        direccion: "",
        localidad: "",
        municipio: "",
        provincia: "",
        descripcion: "",
        numeroCelular: "",
        numeroTelefono: ""
      })

      // BEGIN IMAGENES
      const imagePerfRef = ref(this.storage, `imagenesDefault/perfilDefault.jpg`)
      const urlPerf = await getDownloadURL(imagePerfRef)
      await updateProfile(this.auth.currentUser, {
        photoURL: urlPerf
      }).then(() => {
        console.log("se actualizo la foto de display")
      }).catch((error) => {
        console.log(error.message)
        console.log("hubo un errror actualizando la foto de display")
      });

      await updateDoc(doc(this.db, "Usuarios", this.auth.currentUser.uid), {
        fotoPerfilURL: urlPerf
      }).catch((error) => {
        console.log(error)
      })

      const imageFondRef = ref(this.storage, `imagenesDefault/fondoDefault.png`)
      const urlFondo = await getDownloadURL(imageFondRef)

      await updateDoc(doc(this.db, "Usuarios", this.auth.currentUser.uid), {
        fotoFondoURL: urlFondo
      }).catch((error) => {
        console.log(error)
      })
      // END IMAGENES
      return
    }


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
    try {
      const actionCodeSettings = {
        url: 'http://localhost:3000/',
        handleCodeInApp: true,
      };

      await sendEmailVerification(this.auth.currentUser, actionCodeSettings)
      console.log("se reenvio")
    } catch(err){
      console.log(err)
    }
  }





}

const firebase = new Firebase();
export default firebase;