  import { initializeApp } from 'firebase/app';
  import { getAuth} from "firebase/auth";
  import { getStorage} from "firebase/storage";
  import { getFirestore, collection, getDocs } from 'firebase/firestore'
  import "firebase/compat/firestore";
  import { GoogleAuthProvider } from "firebase/auth";
  
  
  
  

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


export {app, storage, auth, db, providerGoogle} 
