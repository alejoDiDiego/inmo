import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import React, { useEffect, useState, useContext } from 'react'
import firebase, { FirebaseContext } from '../../firebase'
import styles from "../../styles/UsuarioExtendido.module.css"
import Publicacion from '../Publicaciones/Publicacion'
import Comentario from './Comentario'
import PublicacionUsuarioExtendido from './PublicacionUsuarioExtendido'


const UsuarioExtendido = ({ u }) => {

    const { usuario } = useContext(FirebaseContext)


    const [publicacionesMostrar, setPublicacionesMostrar] = useState(true)
    const [comentariosMostrar, setComentariosMostrar] = useState(false)

    const [usuariosComentadores, setUsuariosComentadores] = useState([])


    const [publicaciones, setPublicaciones] = useState([])


    const [estrella, setEstrella] = useState("")
    const [comentario, setComentario] = useState("")

    const [listaComentarios, setListaComentarios] = useState([])

    const [respuesta, setRespuesta] = useState("")

    useEffect(() => {
        console.log(u)
        console.log(u.valoraciones)
        setListaComentarios(u.valoraciones)
    }, [u.valoraciones])


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

    useEffect(() => {
        let uc = listaComentarios.map((v, id) => {
            return v.usuarioComentador.uid
        })
        setUsuariosComentadores(uc)
    }, [listaComentarios])


    const isNumber = e => {
        return e.target.value.replace(/\D/g, '');
    };


    const handleComentar = async (e) => {
        e.preventDefault()
        console.log(listaComentarios.length > 0)
        if (listaComentarios.length > 0) {
            console.log("entro?")
            const comento = listaComentarios.filter((v) => {
                return (
                    v.usuarioComentador.uid == usuario.uid
                )
            })
            console.log(comento)

            if (comento.length > 0) {
                alert("Ya ha comentado")
                return
            }
        }

        if (comentario == "" || estrella == "") return
        const docRef = doc(firebase.db, "Usuarios", u.uid)
        const docSnap = await getDoc(docRef)
        let vs = docSnap.data().valoraciones
        let valoracion = {
            usuarioComentador: { uid: usuario.uid, nombre: usuario.displayName },
            estrellas: estrella,
            fecha: Date.now(),
            comentario,
            respuesta: {}
        }
        vs.push(valoracion)
        await updateDoc(doc(firebase.db, "Usuarios", u.uid), {
            valoraciones: vs
        })



        const docRefPropio = doc(firebase.db, "Usuarios", usuario.uid)
        const docSnapPropio = await getDoc(docRefPropio)
        console.log(docSnapPropio.data())
        let mc = docSnapPropio.data().misComentarios
        mc.push({
            tipo: "usuario",
            id: u.uid
        })
        await updateDoc(doc(firebase.db, "Usuarios", usuario.uid), {
            misComentarios: mc
        })
        setListaComentarios(vs)
        console.log("piola")
    }












    return (
        <div className={styles.extendido}>

            <div className={styles.headers}>
                    <p onClick={() => { setPublicacionesMostrar(true); setComentariosMostrar(false)}} className={publicacionesMostrar == true ? styles.h2 : null}>Publicaciones <span>{publicaciones.length}</span></p>
                    <p onClick={() => { setPublicacionesMostrar(false); setComentariosMostrar(true)  }} className={comentariosMostrar == true ? styles.h2 : null}>Valoraciones <span>{listaComentarios.length}</span> </p>
                    
            </div>

            {
                publicacionesMostrar &&
                publicaciones.map((p, i) => {
                    return (
                        <PublicacionUsuarioExtendido p={p} key={i} />
                    )
                })
            }

            {
                comentariosMostrar &&
                <div>
                    {
                        usuario.uid != u.uid ?
                            usuariosComentadores.includes(usuario.uid) ?
                                null :
                                <form onSubmit={e => handleComentar(e)}>
                                    <input required value={estrella} placeholder="estrellas" max="5" maxLength="1" onChange={e => e.target.value > 5 ? null : setEstrella(isNumber(e))} />
                                    <input required value={comentario} placeholder="comentario" maxLength="200" onChange={e => setComentario(e.target.value)} />
                                    <input type="submit" />
                                </form>
                            : null
                    }

                    {
                        listaComentarios.length == 0 ?
                            <div>
                                No hay comentarios
                            </div> :
                            <div>
                                {
                                    listaComentarios.map((v, id) => {

                                        return (
                                            <Comentario
                                                key={id}
                                                v={v}
                                                setListaComentarios={setListaComentarios}
                                                usuario={usuario}
                                                u={u}
                                            />

                                        )
                                    })
                                }
                            </div>
                    }
                </div>
            }

        </div>
    )
}

export default UsuarioExtendido