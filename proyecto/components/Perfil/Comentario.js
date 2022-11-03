import React, { useEffect, useState } from 'react'
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import firebase, { FirebaseContext } from '../../firebase'
import styles from '../../styles/Comentario.module.css'

const Comentario = ({ id, c, setListaComentarios, listaComentarios, usuario }) => {

    const [respuesta, setRespuesta] = useState("")



    const handleResponder = async (e, v) => {
        try {
            e.preventDefault()

            const docRef = doc(firebase.db, "Usuarios", usuario.uid)
            const docSnap = await getDoc(docRef)
            let vs = docSnap.data().valoraciones
            vs.forEach(e => {
                if (e.usuarioComentador.uid == v.usuarioComentador.uid) {
                    e.respuesta = {
                        fecha: Date.now(),
                        texto: respuesta
                    }
                }
            });

            await updateDoc(doc(firebase.db, "Usuarios", usuario.uid), {
                valoraciones: vs
            })
            setListaComentarios(vs)
        } catch (err) { alert("Hubo un error"); console.log(err) }
    }





    const handleEliminar = async (c) => {
        const docRef = doc(firebase.db, "Usuarios", usuario.uid)
        const docSnap = await getDoc(docRef)
        let vs = docSnap.data().valoraciones
        let newVs = []
        for (const v of vs) {
            console.log(vs)
            console.log(v)
            if (v.usuarioComentador.uid == c.uid) {
                v.respuesta = {}
            }
            newVs.push(v)
        }
        await updateDoc(doc(firebase.db, "Usuarios", usuario.uid), {
            valoraciones: newVs
        })
        setListaComentarios(newVs)

    }

    console.log(c)
    let fecha = new Date(c.fecha)
    let fechaRespuesta = {}
    if (Object.keys(c.respuesta).length > 0) {
        fechaRespuesta = new Date(c.respuesta.fecha)
    }
    console.log(fecha)


    return (
        <div className={styles.valorationContainer} key={id}>


            <div className={styles.valoration}>
                <div className={styles.header}>
                    <h3>{c.usuarioComentador.nombre}</h3>
                    <p>{fecha.toLocaleDateString("es-ES")} {fecha.getHours()}:{fecha.getMinutes()}</p>
                </div>

                <div className={styles.stars}>
                    <h3>{c.estrellas}</h3>
                    <div >
                        <img className={styles.divImg} src='/estrella.png'></img>
                    </div>

                </div>
                <div className={styles.commentBody}>
                    <h4>Comentario del usuario:</h4>
                    <p className={styles.responseText}>{c.comentario}</p>
                </div>
            </div>


            <div className={styles.response}>
                {
                    Object.keys(c.respuesta).length == 0 ?
                        <form onSubmit={(e) => handleResponder(e, c)}>
                            <h4>Responder a esta valoracion:</h4>

                            <div className={styles.responseForm}>
                                <label className={`${styles.custom_field} ${styles.two}`}>
                                    <input value={respuesta} required onChange={(e) => setRespuesta(e.target.value)} />
                                </label>
                                <div>
                                    <button className={styles.responseButton} type="submit" value="Responder">
                                        <img className={styles.divImgSubmit} src='/arrowrotate.png'></img>
                                    </button>

                                </div>
                            </div>



                        </form>
                        :
                        <div>
                            <div className={styles.responseHeader}>
                                <h4>Tu respuesta</h4>
                                <p>{fechaRespuesta.toLocaleDateString("es-ES")} {fechaRespuesta.getHours()}:{fechaRespuesta.getMinutes()}</p>
                                <button className={styles.delButton} onClick={() => handleEliminar(c.usuarioComentador)}>
                                    <img className={styles.divImgSubmit} src='/delete.png'></img>
                                </button>
                            </div>
                            <p className={styles.responseText}> {c.respuesta.texto}</p>
                        </div>
                }
            </div>

        </div >
    )
}

export default Comentario