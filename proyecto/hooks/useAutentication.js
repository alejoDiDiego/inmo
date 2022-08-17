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
                const perfilRef = ref(firebase.storage, `usuarios/${usuario.email}/perfil`)
                const fondoRef = ref(firebase.storage, `usuarios/${usuario.email}/fondo`)
                const urlPerfil = ""
                const urlFondo = ""
                const func = async () => {
                    if (perfilRef == null) {
                        perfilRef = ref(firebase.storage, `imagenesDefault/perfilDefault.jpg`)
                    }
                    urlPerfil = await getDownloadURL(perfilRef)

                    if (fondoRef == null) {
                        fondoRef = ref(firebase.storage, `imagenesDefault/fondoDefault.png`)
                    }
                    urlFondo = await getDownloadURL(fondoRef)

                    return { urlPerfil, urlFondo }
                }

                const fotos = func()




                const check = async () => {
                    const docRef = doc(firebase.db, "Usuarios", usuario.email)
                    const docSnap = await getDoc(docRef)
                    return docSnap.data()
                    //Optimizar esto al cargarlo al localstorage en index en vez de repetir este proceso cada vez que se entre al perfil
                }


                const document = check()







                guardarUsuarioAutenticado({ usuario, fotos, document })
            } else {
                guardarUsuarioAutenticado({usuario : {}, fotos: {}, document: {}})
            }
        });
        return () => unsuscribe();
    }, [])

    return usuarioAutenticado;
}

export default useAutentication