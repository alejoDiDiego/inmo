import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import firebase, { FirebaseContext } from '../../firebase'
import styles from '../../styles/MisPublicaciones.module.css'
import Publicacion from './Publicacion'

const MisPublicaciones = ({ publicaciones, info, setPublicaciones, queryFirebase }) => {



    useEffect(() => {
        console.log(publicaciones)
    }, [publicaciones])



    const router = useRouter()


    const redirect = () => {
        if (info.municipio == "" || info.numeroCelular == "" || info.provincia == "" || info.codigoPostal == "") {
            alert("Le falta completar informacion para poder publicar")
            return
        }
        router.push("/crear-publicacion/principal")
    }



    return (
        <div>
            <div className={styles.publicaciones}>
                {
                    publicaciones.length > 0 ?

                        publicaciones.map(p => {
                            return (
                                <Publicacion
                                    key={publicaciones.indexOf(p)}
                                    p={p}
                                    queryFirebase={queryFirebase}
                                />
                            )
                        })
                        :
                        (
                            <div>
                                <h3>No tienes ninguna publicacion activa.</h3>
                                <div className={styles.buttonConfirm} onClick={() => redirect()}>
                                    <div className={styles.buttonConfirm_back}></div>
                                    <div className={styles.buttonConfirm_content}><span>Crear publicación</span></div>
                                </div>
                            </div>
                        )
                }
            </div>


        </div>
    )
}

export default MisPublicaciones

