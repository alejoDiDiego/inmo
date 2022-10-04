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
            <div className={styles.div_imgs}>
                <img src={p.imagenes[0]} className={styles.img_principal} />
                {
                    p.imagenes.length > 1 &&
                    <div className={styles.img_secundarias}>
                        <img src={p.imagenes[1]} />
                        <img src={p.imagenes[2]} />
                    </div>
                }
            </div>

            <div className={styles.div_descripcion}>
                <p>{p.descripcion}</p>
            </div>
        </div>
    )
}

export default PublicacionExtendida