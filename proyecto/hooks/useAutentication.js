import { async } from '@firebase/util'
import React, { useState, useEffect } from 'react'
import firebase from '../firebase'
import { getDownloadURL, ref } from 'firebase/storage'
import { doc, updateDoc, getFirestore, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from 'next/router'

const useAutentication = () => {

    const router = useRouter()
    const [usuarioAutenticado, guardarUsuarioAutenticado] = useState(null)

    useEffect(() => {
        const unsuscribe = firebase.auth.onAuthStateChanged(usuario => {
            if (usuario) {
                if (usuario.emailVerified == false) {
                    console.log("a")
                    router.push("/verificar")
                } else {
                    switch (router.pathname) {
                        case "/registro/principal":
                            console.log(router.pathname)
                            router.push("/")

                        case "/inicio-sesion/principal":
                            console.log(router.pathname)
                            router.push("/")

                        case "/verificar":
                            console.log(router.pathname)
                            router.push("/")
                    }
                }

                guardarUsuarioAutenticado(usuario)

            } else {
                switch (router.pathname) {
                    case "/registro/principal":
                        console.log(router.pathname)
                        router.push("/")

                    case "/inicio-sesion/principal":
                        console.log(router.pathname)
                        router.push("/")

                    case "/verificar":
                        console.log(router.pathname)
                        router.push("/")
                }




                guardarUsuarioAutenticado({})
            }
        });
        return () => unsuscribe();
    }, [])

    return usuarioAutenticado;
}

export default useAutentication