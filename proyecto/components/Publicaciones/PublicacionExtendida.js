import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import firebase from '../../firebase'
import styles from "../../styles/PublicacionExtendida.module.css"


const PublicacionExtendida = ({ p }) => {

    const [publicador, setPublicador] = useState({})


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
                <p>{p.descripcion}</p>
            </div>

            {
                !publicador.hasOwnProperty("creado") ? null :

                    (
                        <div className={styles.publicador}>
                            <img src={publicador.fotoPerfilURL} />
                            <div>
                                <p>{publicador.nombreUsuario}</p>
                                <p>{publicador.type}</p>
                                <p>{publicador.numeroCelular}</p>

                            </div>
                            {
                                publicador.numeroTelefono.length == 0 ? null :
                                    <p>{publicador.numeroTelefono}</p>
                            }

                            {
                                publicador.emailPublico == true &&
                                <p>{publicador.mail}</p>

                            }
                            {

                                publicador.valoraciones.length == 0 ?
                                    <p>0 Estrellas de 0 Valoraciones.</p>
                                    :
                                    <p>{puntajeEstrellas / publicador.valoraciones.length} Estrellas de {publicador.valoraciones.length} Valoraciones</p>
                            }


                        </div>
                    )
            }
        </div>
    )
}

export default PublicacionExtendida