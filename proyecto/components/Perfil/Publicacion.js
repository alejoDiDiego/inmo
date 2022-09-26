import React, { useState } from 'react'
import styles from '../../styles/Publicacion.module.css'

const Publicacion = ({ p }) => {


    const [imagen, setImagen] = useState(0)




    function formattedDate(p) {
        let d = new Date(p.creado)
        return d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
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
                <div className={styles.div_buttons}>
                    <img src='/edit.png' onClick={() => { }} className={styles.edit_icon} />
                    <img src='/delete.png' onClick={() => { }} className={styles.delete_icon} />
                </div>


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


            </div>
        </div>
    )
}

export default Publicacion