import { collection, doc, onSnapshot, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import firebase, { FirebaseContext } from '../../firebase'
import styles from '../../styles/MisPublicaciones.module.css'
import Publicacion from './Publicacion'

const MisPublicaciones = ({ usuario }) => {

    const [publicaciones, setPublicaciones] = useState([])

    useEffect(() => {
        console.log(publicaciones)
    }, [publicaciones])


    useEffect(() => {
        queryFirebase()
    }, [])


    const queryFirebase = () => {
        const colRef = collection(firebase.db, "Publicaciones")

        const q = query(colRef, where("publicador", "==", `${usuario.uid}`))

        onSnapshot(q, (snapshot) => {
            let ps = []
            snapshot.docs.map(d => {
                ps.push(d.data())
            })
            setPublicaciones(ps)
        })
    }



    return (
        <div>
            <h2>Mis Publicaciones</h2>

            <div className={styles.publicaciones}>
                {
                    publicaciones.map(p => {

                        return (
                            <Publicacion
                                key={publicaciones.indexOf(p)}
                                p={p}
                                queryFirebase={queryFirebase}
                            />
                        )
                    })
                }
            </div>


        </div>
    )
}

export default MisPublicaciones