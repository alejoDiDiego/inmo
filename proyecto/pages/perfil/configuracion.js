import React, { useContext, useEffect, useState } from 'react'
import firebase, { FirebaseContext } from '../../firebase'
import Image from 'next/image'
import { getDownloadURL, ref } from 'firebase/storage'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { doc, updateDoc, getFirestore, setDoc, getDoc } from "firebase/firestore";

const configuracion = () => {


    const { usuario } = useContext(FirebaseContext)

    const [cargar, setCargar] = useState(false)
    const [error, setError] = useState(false)

    const [perfilFoto, setPerfilFoto] = useState("")
    const [fondoFoto, setFondoFoto] = useState("")

    const router = useRouter()


    useEffect(() => {
        const check = async () => {
            if (usuario) {
                await usuario
                const ls = JSON.parse(localStorage.getItem("fotosUsuario"))
                console.log(usuario)
                console.log(ls)
                if (usuario != null && ls != null) {
                    setPerfilFoto(ls.urlPerfil)
                    setFondoFoto(ls.urlFondo)
                    const docRef = doc(firebase.db, "Usuarios", usuario.email)
                    const docSnap = await getDoc(docRef)
                    console.log(docSnap.data())

                    setError(false)
                    setCargar(true)

                    //Optimizar esto al cargarlo al localstorage en index en vez de repetir este proceso cada vez que se entre al perfil

                } else {
                    console.log("error")
                    setError(true)
                }
            } else {
                setTimeout(() => {
                    setError(true)
                }, 3000)
                // agregar spinner
            }
        }


        check()



    }, [usuario])







    return (
        <div>
            <div>
                <label>Nombre</label>
                
            </div>
        </div>
    )
}

export default configuracion