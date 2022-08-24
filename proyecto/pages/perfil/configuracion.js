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



    return (
        <div>
            <div>
                <label>Nombre</label>
                
            </div>
        </div>
    )
}

export default configuracion