import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import React, { useEffect, useState, useContext } from 'react'
import firebase, { FirebaseContext } from '../../firebase'

const Comentario = ({ comentario, usuario, p, setListaComentarios }) => {




    const handleEliminar = async () => {
        try {
            const docRef = doc(firebase.db, "Publicaciones", p.id)
            const docSnap = await getDoc(docRef)
            let cs = docSnap.data().comentarios
            const filtro = cs.filter((v) => {
                return (
                    v.fecha != comentario.fecha
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






    let fecha = new Date(comentario.fecha)
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
            <button onClick={() => handleEliminar()}>Eliminar</button>
        </div>
    )
}

export default Comentario