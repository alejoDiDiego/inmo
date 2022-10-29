import React, { useEffect, useState } from 'react'
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import firebase, { FirebaseContext } from '../../firebase'


const Comentarios = ({ usuario, info }) => {

    const [listaComentarios, setListaComentarios] = useState([])

    const [respuesta, setRespuesta] = useState("")


    useEffect(() => {
        setListaComentarios(info.valoraciones)
    }, [info])


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
        } catch (err) { alert("Hubo un error") }
    }





    const handleEliminar = async (c) => {
        const docRef = doc(firebase.db, "Usuarios", usuario.uid)
        const docSnap = await getDoc(docRef)
        let vs = docSnap.data().valoraciones
        let newVs = []
        for(const v of vs){
            console.log(vs)
            console.log(v)
            if(v.usuarioComentador.uid == c.uid){
                v.respuesta = {}
            }
            newVs.push(v)
        }
        await updateDoc(doc(firebase.db, "Usuarios", usuario.uid), {
            valoraciones: newVs
        })
        setListaComentarios(newVs)

    }






    if (listaComentarios.length > 0) {
        return (
            <div>
                {
                    listaComentarios.map((c, id) => {
                        console.log(c)
                        let fecha = new Date(c.fecha)
                        let fechaRespuesta = {}
                        if (Object.keys(c.respuesta).length > 0) {
                            fechaRespuesta = new Date(c.respuesta.fecha)
                        }
                        console.log(fecha)
                        return (
                            <div key={id}>
                                <p>{c.comentario}</p>
                                <p>{c.estrellas}</p>
                                <p>Publicado: {fecha.toLocaleDateString("es-ES")} {fecha.getHours()}:{fecha.getMinutes()}</p>
                                <p>{c.usuarioComentador.nombre}</p>

                                {
                                    Object.keys(c.respuesta).length == 0 ?
                                        <form onSubmit={(e) => handleResponder(e, c)}>
                                            <input value={respuesta} required onChange={(e) => setRespuesta(e.target.value)} />
                                            <input type="submit" value="Responder" />
                                        </form>
                                        :
                                        <div>
                                            <p>Respuesta: {c.respuesta.texto}</p>
                                            <p>Publicado: {fechaRespuesta.toLocaleDateString("es-ES")} {fechaRespuesta.getHours()}:{fechaRespuesta.getMinutes()}</p>
                                            <button onClick={() => handleEliminar(c.usuarioComentador)}>Eliminar</button>
                                        </div>
                                }
                            </div>
                        )
                    })
                }
            </div>
        )
    } else {
        return (
            <div>
                No tiene ningun comentario
            </div>
        )
    }

}

export default Comentarios