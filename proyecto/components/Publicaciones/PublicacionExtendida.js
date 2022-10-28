import { doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import firebase from '../../firebase'
import styles from "../../styles/PublicacionExtendida.module.css"
import { FirebaseContext } from '../../firebase'

const PublicacionExtendida = ({ p, setExtendido }) => {

    const [publicador, setPublicador] = useState({})

    const [pregunta, setPregunta] = useState("")

    const { usuario } = useContext(FirebaseContext)


    let puntajeEstrellas = 0

    const queryFirebase = async () => {
        const docRef = doc(firebase.db, "Usuarios", p.publicador)
        const docSnap = await getDoc(docRef)
        console.log(docSnap.data())
        docSnap.data().valoraciones.map(v => {
            puntajeEstrellas += v.estrellas
        })
        setPublicador(docSnap.data())

    }


    const handlePregunta = async () => {
        if(usuario == {}){
            alert("Necesita una cuenta para poder publicar")
            return
        }

        if(pregunta.length == 0){
            alert("Escriba una pregunta")
            return
        }

        const docRef = doc(firebase.db, "Publicaciones", p.id)
        const docSnap = await getDoc(docRef)
    }



    useEffect(() => {
        if(!publicador.hasOwnProperty("creado")) {
            queryFirebase()
        }
    }, [publicador])




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
                <h2>Descripcion:</h2>
                <p>{p.descripcion}</p>
            </div>

            <div className={styles.preguntas}>
                <h2>Preguntas:</h2>
                <div className={styles.preguntasContainer}>

                </div>
                <input value={pregunta} onChange={e => setPregunta(e.target.value)} placeholder='Escribe tu pregunta' />
                <button onClick={() => handlePregunta()}>Preguntar</button> 
            </div>
            <p onClick={() => {window.history.back(); setExtendido(false)}}>Cerrar</p>
        </div>
    )
}

export default PublicacionExtendida