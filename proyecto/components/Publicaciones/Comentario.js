import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import React, { useEffect, useState, useContext } from 'react'
import firebase, { FirebaseContext } from '../../firebase'

const Comentario = ({ comentario, usuario, p, setListaComentarios }) => {

    const [respuesta, setRespuesta] = useState("")


    const handleEliminar = async () => {
        try {
            const docRef = doc(firebase.db, "Publicaciones", p.id)
            const docSnap = await getDoc(docRef)
            let cs = docSnap.data().comentarios
            const filtro = cs.filter((c) => {
                return (
                    c.fecha != comentario.fecha
                )
            })
            console.log(filtro)
            await updateDoc(doc(firebase.db, "Publicaciones", p.id), {
                comentarios: filtro
            })
            setListaComentarios(filtro)


            const docRefPropio = doc(firebase.db, "Usuarios", usuario.uid)
            const docSnapPropio = await getDoc(docRefPropio)
            let mc = docSnapPropio.data().misComentarios
            console.log(mc)
            const filtro2 = mc.filter((m) => {

                return (
                    m.idComentario != comentario.fecha
                )
            })

            console.log(filtro2)
            await updateDoc(doc(firebase.db, "Usuarios", usuario.uid), {
                misComentarios: filtro2
            })


        } catch (err) {
            console.log(err)
            alert("Hubo un error")
        }
    }



    const handleResponder = async (e) => {
        try {
            e.preventDefault()

            const docRef = doc(firebase.db, "Publicaciones", p.id)
            const docSnap = await getDoc(docRef)
            let cs = docSnap.data().comentarios
            cs.forEach(e => {
                if (e.fecha == comentario.fecha) {
                    e.respuesta = {
                        fecha: Date.now(),
                        texto: respuesta
                    }
                }
            });

            await updateDoc(doc(firebase.db, "Publicaciones", p.id), {
                comentarios: cs
            })
            setListaComentarios(cs)
            setRespuesta("")
        } catch (err) { console.log(err) }
    }



    const handleEliminarRespuesta = async (c) => {
        const docRef = doc(firebase.db, "Publicaciones", p.id)
        const docSnap = await getDoc(docRef)
        let vs = docSnap.data().comentarios
        let newVs = []
        for (const v of vs) {
            console.log(vs)
            console.log(v)
            if (v.fecha == c.fecha) {
                v.respuesta = {}
            }
            newVs.push(v)
        }
        await updateDoc(doc(firebase.db, "Publicaciones", p.id), {
            comentarios: newVs
        })
        setListaComentarios(newVs)

    }






    let fecha = new Date(comentario.fecha)
    let fechaRespuesta = {}
    if (Object.keys(comentario.respuesta).length > 0) {
        fechaRespuesta = new Date(comentario.respuesta.fecha)
    }

    return (
        <div>
            <p>{comentario.comentario}</p>
            <p>Publicado por: {comentario.usuarioComentador.nombre}</p>
            <p>Publicado: {fecha.toLocaleDateString("es-ES")} {fecha.getHours()}:{fecha.getMinutes()}</p>
            {
                Object.keys(comentario.respuesta) == 0 ? null :
                    (
                        <div>

                        </div>
                    )
            }

            {
                comentario.usuarioComentador.uid == usuario.uid ?
                    <button onClick={() => handleEliminar()}>Eliminar</button>
                    : null
            }


            {
                p.publicador == usuario.uid ?
                    Object.keys(comentario.respuesta).length == 0 ?
                        (


                            <form onSubmit={(e) => handleResponder(e)}>
                                <input value={respuesta} required onChange={(e) => setRespuesta(e.target.value)} />
                                <input type="submit" value="Responder" />
                            </form>

                        )

                        :
                        <div>
                            <div>
                                <p>Respuesta del publicador: {comentario.respuesta.texto}</p>
                                <p>Publicado: {fechaRespuesta.toLocaleDateString("es-ES")} {fechaRespuesta.getHours()}:{fechaRespuesta.getMinutes()}</p>

                            </div>
                            <button onClick={() => handleEliminarRespuesta(comentario)}>Eliminar respuesta</button>
                        </div>
                    :
                    Object.keys(comentario.respuesta).length > 0 ?
                        <div>
                            <p>Respuesta del publicador: {comentario.respuesta.texto}</p>
                            <p>Publicado: {fechaRespuesta.toLocaleDateString("es-ES")} {fechaRespuesta.getHours()}:{fechaRespuesta.getMinutes()}</p>

                        </div>
                        : null
            }


        </div>
    )
}

export default Comentario