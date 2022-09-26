import { collection, doc, onSnapshot, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import firebase, { FirebaseContext } from '../../firebase'
import styles from '../../styles/MisPublicaciones.module.css'

const MisPublicaciones = ({ usuario }) => {

    const [publicaciones, setPublicaciones] = useState([])

    useEffect(() => {
        console.log(publicaciones)
    }, [publicaciones])


    useEffect(() => {
        const queryFirebase = () => {
            const colRef = collection(firebase.db, "Publicaciones")

            const q = query(colRef, where("publicador", "==", `${usuario.uid}`))

            onSnapshot(q, (snapshot) => {
                let ps = []
                snapshot.docs.map(d => {
                    ps.push(d.data())
                })
                setPublicaciones(ps)
            })
        }

        queryFirebase()
    }, [])







    return (
        <div>
            <h2>Mis Publicaciones</h2>

            <div className={styles.publicaciones}>
                {
                    publicaciones.map(p => {
                        return (
                            <div className={styles.publicacion}>
                                <div className={styles.publicacion_div_img}>
                                    <img src={p.imagenes[0]} />
                                </div>

                                <div>
                                    <div className={styles.head}>
                                        <h3>
                                            {
                                                p.tipoPublicacion == "venta" ?
                                                (
                                                    "USD$" + p.precio
                                                ) :
                                                (
                                                    "ARS$" + p.precio
                                                )
                                            }
                                        </h3>

                                        <p>
                                            {
                                                p.expensas.length > 0 &&
                                                (
                                                    "Expensas: ARS$ " + p.expensas
                                                )
                                            }
                                            
                                        </p>

                                        <p>
                                            {
                                                p.tipoPublicacion == "venta" ?
                                                (
                                                    "Vende"
                                                ) :
                                                (
                                                    "Alquila"
                                                )

                                            }
                                        </p>

                                        <p>
                                            {
                                                p.tipoVivienda == "casa" ?
                                                (
                                                    "Casa"
                                                ) :
                                                (
                                                    "Departamento"
                                                )
                                            }
                                        </p>

                                        <p>Publicado: {Date(p.creado)}</p>
                                    </div>

                                    <div>
                                        <p>
                                            {p.provincia}, {" "}
                                            {p.municipio}, {" "}
                                            {p.localidad}, {" "}
                                            {p.codigoPostal}, {" "}
                                            {`${p.direccion} ${p.altura}`}
                                            {
                                                p.piso.length > 0 ?
                                                (
                                                    " Piso" + p.piso + 
                                                    " Depto" + p.numeroLetraDepto
                                                ) : 
                                                (
                                                    p.piso.length == 0 && p.numeroLetraDepto.length > 0 ?
                                                    (
                                                        " Depto" + p.numeroLetraDepto
                                                    ) : null
                                                )
                                            }
                                            
                                        </p>
                                    </div>

                                    <div className={styles.cantidades}>
                                        <p>Ambientes: {p.cantAmbientes}</p>
                                        <p>Baños: {p.cantBanos}</p>
                                        <p>Cocheras: {p.cantCocheras}</p>
                                        <p>Habitaciones: {p.cantCocheras}</p>
                                        <p>Mt<sup>2</sup> Totales: {p.mt2Totales}</p>
                                        <p>Mt<sup>2</sup> Utilizados: {p.mt2Utilizados}</p>
                                    </div>


                                </div>
                            </div>
                        )
                    })
                }
            </div>


        </div>
    )
}

export default MisPublicaciones