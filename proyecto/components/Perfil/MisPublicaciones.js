import { collection, doc, onSnapshot, query, where, collectionGroup, getDocs } from 'firebase/firestore'
import Link from 'next/link'
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


    const queryFirebase = async () => {
        const colRef = collection(firebase.db, "Publicaciones")

        const q = query(colRef, where("publicador", "==", `${usuario.uid}`))

        const querySnapshot = await getDocs(q);
        let ps = []
        querySnapshot.forEach((doc) => {
            ps.push(doc.data())
        });
        setPublicaciones(ps)
        console.log(ps)
    }



    return (
        <div>
            <h2>Mis Publicaciones</h2>

            <div className={styles.publicaciones}>
                {
                    publicaciones.length > 0 ?

                        publicaciones.map(p => {
                            return (
                                <Publicacion
                                    key={publicaciones.indexOf(p)}
                                    p={p}
                                    queryFirebase={queryFirebase}
                                />
                            )
                        })
                        :
                        <div>
                            <p>Comienza a publicar</p>
                            <Link href="/crear-publicacion/principal"><button>Publicar</button></Link>
                            
                        </div>
                }
            </div>


        </div>
    )
}

export default MisPublicaciones