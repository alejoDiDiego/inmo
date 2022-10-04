import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect } from 'react'
import firebase from '../../firebase'
import styles from "../../styles/PublicacionExtendida.module.css"


const PublicacionExtendida = ({ p }) => {


    const queryFirebase = async () => {
        const docRef = doc(firebase.db, "Usuarios", p.publicador)
        const docSnap = await getDoc(docRef)
        console.log(docSnap.data())
    }

    useEffect(() => {
        queryFirebase()
    })



    return (
        <div className={styles.publicacion_extendida}>
            <div>

            </div>
        </div>
    )
}

export default PublicacionExtendida