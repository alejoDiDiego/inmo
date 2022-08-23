import { async } from '@firebase/util'
import React, { useState, useEffect } from 'react'
import firebase from '../firebase'
import { getDownloadURL, ref } from 'firebase/storage'
import { doc, updateDoc, getFirestore, setDoc, getDoc } from "firebase/firestore";

const useAutentication = () => {
    const [usuarioAutenticado, guardarUsuarioAutenticado] = useState(null)

    useEffect(() => {
        const unsuscribe = firebase.auth.onAuthStateChanged(usuario => {
            if (usuario) {
                const check = async () => {
                    try {
                        const docRef = doc(firebase.db, "Usuarios", usuario.email)
                        const docSnap = await getDoc(docRef)
                        return docSnap.data()
                    } catch(err){
                        console.log(err)
                        console.log("a chekear")
                        setTimeout(() => {
                            check()
                        }, 2000)
                    }
                    //Optimizar esto al cargarlo al localstorage en index en vez de repetir este proceso cada vez que se entre al perfil
                }


                const document = check()



                guardarUsuarioAutenticado({ usuario, document })
            } else {
                guardarUsuarioAutenticado({ usuario: {}, document: {} })
            }
        });
        return () => unsuscribe();
    }, [])

    return usuarioAutenticado;
}

export default useAutentication