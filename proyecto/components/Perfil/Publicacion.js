import React, { useEffect, useState } from 'react'
import styles from '../../styles/Publicacion.module.css'
import PublicacionExtendida from './PublicacionExtendida'
import { doc, deleteDoc } from "firebase/firestore";
import firebase, { FirebaseContext } from '../../firebase'
import { getStorage, listAll, ref, deleteObject } from "firebase/storage";
import Link from 'next/link';


const Publicacion = ({ p, queryFirebase }) => {


    const [imagen, setImagen] = useState(0)

    const [eliminar, setEliminar] = useState(false)
    const [cargandoEliminar, setCargandoEliminar] = useState(false)




    function formattedDate(p) {
        let d = new Date(p.creado)
        return d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
    }


    const handleEliminar = async () => {
        try {
            setCargandoEliminar(true)
            const refFolder = ref(firebase.storage, `publicaciones/${p.id}`)
            console.log(refFolder)
            const allItems = await listAll(refFolder)
            console.log(allItems)
            await Promise.all(
                allItems.items.map(async i => {
                    console.log(i)
                    await deleteObject(i)
                })
            )
            console.log("casi")
            await deleteDoc(doc(firebase.db, "Publicaciones", `${p.id}`))
            console.log("listo")
            queryFirebase()
            setCargandoEliminar()
        } catch (err) {
            console.log(err)
            setCargandoEliminar()
        }
    }







    return (
        <div className={styles.publicacion}>
            <div className={styles.publicacion_div_img}>

                {

                    <div className={styles.arrows}>
                        {
                            imagen > 0 ?
                                <img src='/arrow.png' onClick={() => setImagen(imagen - 1)} style={{ transform: "rotate(180deg)" }} className={styles.delete_icon} /> :
                                <div className={styles.fake}></div>
                        }

                        {
                            imagen + 1 != p.imagenes.length ?
                                <img src='/arrow.png' onClick={() => setImagen(imagen + 1)} className={styles.delete_icon} /> :
                                <div className={styles.fake}></div>
                        }


                    </div>

                }


                <img className={styles.img} src={p.imagenes[imagen]} />
            </div>




            <div>

                {
                    cargandoEliminar == false ?
                        eliminar == false ?
                            (
                                <div className={styles.div_buttons}>
                                    <Link href="/modificar-publicacion/[id]" as={`/modificar-publicacion/${p.id}`}><img src='/edit.png' className={styles.edit_icon} /></Link>
                                    <img src='/bin.png' onClick={() => { setEliminar(true) }} className={styles.delete_icon} />
                                </div>
                            ) :
                            (
                                <div className={styles.div_buttons}>
                                    <img src='/bin.png' onClick={() => { handleEliminar() }} className={styles.delete_icon} />
                                    <img src='/delete.png' onClick={() => { setEliminar(false) }} className={styles.delete_icon} />

                                    {/* https://www.flaticon.com/free-icon/bin_6033424?term=junk&page=1&position=40&page=1&position=40&related_id=6033424&origin=search# */}
                                </div>
                            )
                        :
                        <div className={styles.div_buttons}>
                            <p>Cargando...</p>
                        </div>
                }



                <div className={styles.head}>
                    <h3>
                        {
                            p.tipoPublicacion == "venta" ?
                                (
                                    "USD$" + p.precio
                                ) :
                                (
                                    "ARS$/mes" + p.precio
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

                    <p>Publicado: {formattedDate(p)}</p>
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


                <div>
                    <p>Descripcion:</p>
                    <p>{p.descripcion}</p>
                </div>

                <div>
                    <p>Comentarios: {p.comentarios.length}</p>
                </div>






            </div>
        </div>

    )





}

export default Publicacion