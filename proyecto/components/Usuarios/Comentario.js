import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import React, { useEffect, useState, useContext } from 'react'
import firebase, { FirebaseContext } from '../../firebase'
import styles from '../../styles/Comentario.module.css'

const Comentario = ({ v, u, setListaComentarios, usuario }) => {

    const [respuesta, setRespuesta] = useState("")

    const handleResponder = async (e, v) => {
        e.preventDefault()

        const docRef = doc(firebase.db, "Usuarios", u.uid)
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

        await updateDoc(doc(firebase.db, "Usuarios", u.uid), {
            valoraciones: vs
        })
        setListaComentarios(vs)
    }


    const handleEliminar = async () => {
        const docRef = doc(firebase.db, "Usuarios", u.uid)
        const docSnap = await getDoc(docRef)
        let vs = docSnap.data().valoraciones
        const filtro = vs.filter((v) => {
            return (
                v.usuarioComentador.uid != usuario.uid
            )
        })
        console.log(filtro)
        await updateDoc(doc(firebase.db, "Usuarios", u.uid), {
            valoraciones: filtro
        })
        setListaComentarios(filtro)


        const docRefPropio = doc(firebase.db, "Usuarios", usuario.uid)
        const docSnapPropio = await getDoc(docRefPropio)
        let mc = docSnapPropio.data().misComentarios
        console.log(mc)
        const filtro2 = mc.filter((m) => {
            return (
                m.id != u.uid
            )
        })
        console.log(filtro2)
        await updateDoc(doc(firebase.db, "Usuarios", usuario.uid), {
            misComentarios: filtro2
        })

        console.log("piola")
    }


    const handleEliminarRespuesta = async (c) => {
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


    let fecha = new Date(v.fecha)
    let fechaRespuesta = {}
    if (Object.keys(v.respuesta).length > 0) {
        fechaRespuesta = new Date(v.respuesta.fecha)
    }



    return (
        <div className={styles.valorationContainer}>
            <div className={styles.valoration}>
                <div className={styles.header}>
                    <h3>{v.usuarioComentador.nombre}</h3>
                    <p>{fecha.toLocaleDateString("es-ES")} {fecha.getHours()}:{fecha.getMinutes()}</p>
                    {
                        v.usuarioComentador.uid == usuario.uid ?
                            <button className={styles.delButton} onClick={() => handleEliminar()}>
                                <img className={styles.divImgSubmit} src='/delete.png'></img>
                            </button>

                            :
                            null
                    }
                </div>

                <div className={styles.stars}>
                    <h3>{v.estrellas}</h3>
                    <div>
                        <img className={styles.divImg2} src='/estrella.png'></img>
                    </div>
                </div>
                <div className={styles.commentBody}>
                    <h4>Comentario del usuario:</h4>
                    <p className={styles.responseText}>{v.comentario}</p>
                </div>
            </div>

            <div className={styles.response}>
                {
                    Object.keys(v.respuesta).length == 0 ? null :
                        <div>
                            <div className={styles.responseHeader}>
                                <h4>Respuesta del usuario</h4>
                                <p>{fechaRespuesta.toLocaleDateString("es-ES")} {fechaRespuesta.getHours()}:{fechaRespuesta.getMinutes()}</p>
                                {
                                usuario.uid == u.uid ?
                                ( 
                                    <button className={styles.delButton} onClick={() => handleEliminarRespuesta(v.usuarioComentador)}>
                                    <img className={styles.divImgSubmit} src='/delete.png'></img>
                                </button>
                                ):
                                (
                                    <></>
                                )
                                
                                
                            }

                            </div>
                            <p className={styles.responseText}> {v.respuesta.texto}</p>

                        </div>


                }

                {
                    usuario.uid == u.uid ?
                        <div>
                            {
                                Object.keys(v.respuesta).length == 0 ?
                                    <form onSubmit={(e) => handleResponder(e, v)}>
                                        <h4>Responder a esta valoracion:</h4>

                                        <div className={styles.responseForm}>
                                            <label className={`${styles.custom_field} ${styles.two}`}>
                                                <input value={respuesta} required onChange={(e) => setRespuesta(e.target.value)} />
                                            </label>
                                            <div>
                                                <button className={styles.responseButton} type="submit" value="Responder">
                                                    <img className={styles.divImgSubmit2} src='/arrowrotate.png'></img>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                    :
                                    <></>
                            }
                        </div>
                        :
                        null
                }
            </div>


        </div>
    )
}

export default Comentario