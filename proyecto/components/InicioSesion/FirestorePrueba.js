import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import MyApp from '../../pages/_app'

const db = getFirestore(MyApp.app)
const referencia = db.collection('Usuarios').doc('User')



await referencia.set({
    nombre: 'Franco lago',
    email: 'fran080j9@gmail.com'
})