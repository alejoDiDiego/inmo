import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import React, { useEffect, useState, useContext } from 'react'
import firebase, { FirebaseContext } from '../../firebase'

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
        <div>
            <p>{v.estrellas} Estrellas</p>
            <p>{v.comentario}</p>
            <p>Publicado por {v.usuarioComentador.nombre}</p>
            <p>Publicado: {fecha.toLocaleDateString("es-ES")} {fecha.getHours()}:{fecha.getMinutes()}</p>
            {
                Object.keys(v.respuesta).length == 0 ? null :
                    <div>
                        <p>Respuesta del publicador: {v.respuesta.texto}</p>
                        <p>Publicado: {fechaRespuesta.toLocaleDateString("es-ES")} {fechaRespuesta.getHours()}:{fechaRespuesta.getMinutes()}</p>
                    </div>


            }

            {
                usuario.uid == u.uid ?
                    <div>
                        {
                            Object.keys(v.respuesta).length == 0 ?
                                <form onSubmit={(e) => handleResponder(e, v)}>
                                    <input value={respuesta} required onChange={(e) => setRespuesta(e.target.value)} />
                                    <input type="submit" value="Responder" />
                                </form>
                                :
                                <button onClick={() => handleEliminarRespuesta(v.usuarioComentador)}>Eliminar respuesta</button>
                        }
                    </div>
                    :
                    null
            }

            {
                v.usuarioComentador.uid == usuario.uid ?
                    <button onClick={() => handleEliminar()}>Eliminar comentario</button>
                    :
                    null
            }
        </div>
    )
}

export default Comentario