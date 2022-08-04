import app from 'firebase/app';

import firebaseConfig from './config';

class Firebase {
    constructor() {
        if (!app.getApps().length) {
            app.initializeApp(firebaseConfig);
        }
        this.auth = getAuth(app)
        auth.languageCode = 'es_419';
        auth.useDeviceLanguage();

        this.storage = getStorage(app)

        this.db = getFirestore(app)

        this.providerGoogle = new GoogleAuthProvider();
    }

    async registrar(email, password) {
        const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(email, password)
    }

    async registrarGoogle() {
        const nuevoUsuario = await signInWithPopup(this.auth, this.providerGoogle)
    }

    handleSignOut = () => {
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
}

const firebase = new Firebase();
export default firebase;