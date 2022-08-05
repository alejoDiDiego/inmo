import React from 'react'
import Link from "next/link";
import Image from "next/image";
import styles from '../../styles/Body.module.css';


const Body = () => {
    return (
        <div className={styles.div}>
            <div className={styles.squares}>
                <div className={styles.busqueda}>
                    <div className={styles.img_div}>
                        <img className={styles.img} src="InmoBusqueda.png" />
                    </div>

                    <p className={styles.busqueda_parrafo}>Busqueda simple y resumida, resultados faciles de filtrar, todo al alcance del <span className={styles.span}>usuario.</span></p>
                </div>

                <div className={styles.rubik}>
                    <div className={styles.img_div}>
                        <img className={styles.img} src="InmoRubik.png" />
                    </div>
                    <p className={styles.rubik_parrafo}>Simplicidad para la creacion de publicaciones, maximo <span className={styles.span}>alcance.</span></p>
                </div>

                <div className={styles.cuentas}>
                    <div className={styles.img_div}>
                        <img className={styles.img} src="InmoCuentas.png" />
                    </div>
                    <p className={styles.cuentas_parrafo}>Incorporacion de cuentas inmobiliarias y empresariales, distincion <span className={styles.span}>instantanea</span></p>
                </div>

            </div>

            <div className={styles.mas_sobre}>

                <div className={styles.inside_mas_sobre}>
                    <div className={styles.div_izquierda}>

                    </div>

                    <div className={styles.div_derecha}>
                        <div className={styles.inside_div_derecha}>
                            <Link href='/'>
                                <div className={styles.square}>

                                </div>
                            </Link>


                            <div className={styles.square}>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Body;