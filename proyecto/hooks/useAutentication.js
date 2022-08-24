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
                guardarUsuarioAutenticado(usuario)
                
            } else {
                guardarUsuarioAutenticado({})
            }
        });
        return () => unsuscribe();
    }, [])

    return usuarioAutenticado;
}

export default useAutentication