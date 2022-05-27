import '../styles/globals.css'
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth} from "firebase/auth";



const firebaseConfig = {

  apiKey: "AIzaSyCnheK3k_qYzNkMjSqsI-IR3Cpv-J_A-DU",

  authDomain: "inmo-proyect.firebaseapp.com",

  projectId: "inmo-proyect",

  storageBucket: "inmo-proyect.appspot.com",

  messagingSenderId: "808798012448",

  appId: "1:808798012448:web:8f76818987dd5842c56845",

  measurementId: "G-TB696FC916"

};

//COMPONENTES FIREBASE MyApp.<nombre de la const> para llamarlos
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp


//UCHIHA alejo 21 del 5