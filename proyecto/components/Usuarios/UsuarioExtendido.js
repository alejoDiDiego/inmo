import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import firebase from '../../firebase'
import styles from "../../styles/UsuarioExtendido.module.css"
import Publicacion from '../Publicaciones/Publicacion'

const UsuarioExtendido = ({ u }) => {


    const [misPublicaciones, setMisPublicaciones] = useState(true)
    const [comentarios, setComentarios] = useState(false)
    const [misComentarios, setMisComentarios] = useState(false)


    const [publicaciones, setPublicaciones] = useState([])


    const queryFirebase = async () => {
        const colRef = collection(firebase.db, "Publicaciones")

        const q = query(colRef, where("publicador", "==", `${u.uid}`))

        const querySnapshot = await getDocs(q);
        let ps = []
        querySnapshot.forEach((doc) => {
            ps.push(doc.data())
        });
        setPublicaciones(ps)
        console.log(ps)
    }

    useEffect(() => {
        queryFirebase()
    }, [])





    return (
        <div className={styles.extendido}>
            <div>
                <p onClick={() => { setMisPublicaciones(true); setComentarios(false); setMisComentarios(false) }} className={misPublicaciones == true ? styles.h2 : null}>Publicaciones <span>{publicaciones.length}</span></p>
                <p onClick={() => { setMisPublicaciones(false); setComentarios(true); setMisComentarios(false) }} className={comentarios == true ? styles.h2 : null}>Valoraciones <span>{u.valoraciones.length}</span> </p>
                <p onClick={() => { setMisPublicaciones(false); setComentarios(false); setMisComentarios(true) }} className={misComentarios == true ? styles.h2 : null}>Tus Comentarios</p>
            </div>

            {
                publicaciones.map((p, i) => {
                    return (
                        <Publicacion p={p} key={i} />
                    )   
                })
            }
        </div>
    )
}

export default UsuarioExtendido