import { doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import firebase from '../../firebase'
import styles from "../../styles/PublicacionExtendida.module.css"
import { FirebaseContext } from '../../firebase'
import Comentario from './Comentario'

const PublicacionExtendida = ({ p, setExtendido, publicador }) => {


    const [comentario, setComentario] = useState("")

    const [listaComentarios, setListaComentarios] = useState([])

    const { usuario } = useContext(FirebaseContext)

    const [modal, setModal] = useState(false)


    // let puntajeEstrellas = 0

    // const queryFirebase = async () => {
    //     const docRef = doc(firebase.db, "Usuarios", p.publicador)
    //     const docSnap = await getDoc(docRef)
    //     docSnap.data().valoraciones.map(v => {
    //         puntajeEstrellas += v.estrellas
    //     })
    //     setPublicador(docSnap.data())

    // }

    useEffect(() => {
        setListaComentarios(p.comentarios)
        console.log(usuario.uid)
        console.log(p)
    }, [])


    const handlePreguntar = async (e) => {
        try {
            e.preventDefault()
            if (usuario == {}) {
                alert("Necesita una cuenta para poder publicar")
                return
            }

            if (comentario.length == 0) {
                alert("Escriba una pregunta")
                return
            }

            if (usuario.uid == publicador.uid) {
                alert("Usted hizo la publicacion")
                return
            }

            const docRef = doc(firebase.db, "Publicaciones", p.id)
            const docSnap = await getDoc(docRef)
            let cs = docSnap.data().comentarios
            let comentarioObj = {
                usuarioComentador: { uid: usuario.uid, nombre: usuario.displayName },
                fecha: Date.now(),
                comentario: comentario,
                respuesta: {}
            }
            cs.push(comentarioObj)
            await updateDoc(doc(firebase.db, "Publicaciones", p.id), {
                comentarios: cs
            })



            const docRefPropio = doc(firebase.db, "Usuarios", usuario.uid)
            const docSnapPropio = await getDoc(docRefPropio)
            let mc = docSnapPropio.data().misComentarios
            mc.push({
                tipo: "publicacion",
                id: p.id,
                idComentario: comentarioObj.fecha
            })
            await updateDoc(doc(firebase.db, "Usuarios", usuario.uid), {
                misComentarios: mc
            })
            setListaComentarios(cs)
            setComentario("")
        } catch (err) {
            console.log(err)
            alert("Hubo un error")
        }
    }



    // useEffect(() => {
    //     if (!publicador.hasOwnProperty("creado")) {
    //         queryFirebase()
    //     }
    // }, [publicador])




    return (
        <div className={styles.publicacion_extendida}>

            {
                modal == false ? null :
                    <div className={styles.modal}>
                        <div className={styles.modal_inside}>
                            <div className={styles.menu} onClick={() => setModal(!modal) }>
                                <div className={styles.bar}></div>
                                <div className={styles.bar}></div>
                                <div className={styles.bar}></div>
                            </div>
                        </div>
                    </div>
            }

            <div onClick={() => setModal(!modal)} className={styles.div_imgs}>

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
                <h2>Descripción:</h2>
                <p>{p.descripcion}</p>
            </div>

            <div className={styles.preguntas}>
                <h2>Preguntas:</h2>
                <div className={styles.preguntasContainer}>
                    {
                        listaComentarios.map((c, id) => {
                            return (
                                <Comentario
                                    key={id}
                                    comentario={c}
                                    usuario={usuario}
                                    p={p}
                                    setListaComentarios={setListaComentarios}
                                />
                            )
                        })
                    }
                </div>
                {
                    usuario.uid == publicador.uid ? null :
                        <form onSubmit={(e) => handlePreguntar(e)}>
                            <div className={styles.responseForm}>
                                <div className={styles.fieldDir}>
                                    <label className={`${styles.custom_field} ${styles.two}`}>
                                        <input maxLength={40} value={comentario} onChange={e => setComentario(e.target.value)} placeholder="Realiza una pregunta" />
                                    </label>
                                </div>
                                <div>
                                    <button className={styles.responseButton1} type="submit" value="Responder">
                                        <img className={styles.divImgSubmit} src='/arrowrotate.png'></img>
                                    </button>
                                </div>
                            </div>
                        </form>
                }

            </div>

        </div>
    )
}

export default PublicacionExtendida