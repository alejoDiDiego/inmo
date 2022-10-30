import React, { useEffect, useState } from 'react'
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import firebase, { FirebaseContext } from '../../firebase'
import Comentario from './Comentario'


const Comentarios = ({ usuario, info }) => {

    const [listaComentarios, setListaComentarios] = useState([])



    useEffect(() => {
        setListaComentarios(info.valoraciones)
    }, [info])








    if (listaComentarios.length > 0) {
        return (
            <div>
                {
                    listaComentarios.map((c, id) => {
                        
                        return (
                            <Comentario 
                                key={id}
                                c={c}
                                usuario={usuario}
                                listaComentarios={listaComentarios}
                                setListaComentarios={setListaComentarios}

                            />
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