import React from 'react'
import Link from "next/link";
import Image from "next/image";
import styles from '../../styles/Body.module.css';


const Body = () => {
    return (
        <div className={styles.div}>
            <div className={styles.arriba}>

                <div className={styles.inside_arriba}>
                    <div className={styles.div_izquierda_arriba}>
                        
                        <div className={styles.div_inside_izquierda_arriba}>
                        <div className={styles.titleF}>
                        <p>Inmo, a un click de tu hogar</p>
                        </div>
                            <Link href='/'>
                                <div className={styles.square}>
                                    <div className={styles.image}>
                                        <img src='/home.png' alt='casa' />
                                    </div>
                                    <h3>Propiedades en venta</h3>
                                    <p>Encuentra tu hogar entre las publicaciones hechas por los usuarios</p>
                                </div>
                            </Link>


                            <div className={styles.div_square_chico}>
                                <Link href='/'>
                                    <div className={styles.square_chico}>
                                        <div className={styles.square_chico_txt}>
                                            <h3>Publicar</h3>
                                            <p>Publica tu casa sin cargo ya seas una inmobiliaria o un particular</p>
                                        </div>
                                        <div className={styles.image}>
                                            <img src='/discount-tag.png' />
                                        </div>
                                    </div>
                                </Link>
                                <Link href='/'>
                                    <div className={styles.square_chico}>
                                        <div className={styles.square_chico_txt}>
                                            <h3>En alquiler</h3>
                                            <p className='pInicio'>Contacta con arrendatarios y compara entre diferentes opciones</p>
                                        </div>
                                        <div className={styles.image}>
                                            <img src='/secret.png' />
                                        </div>
                                    </div>
                                </Link>

                            </div>
                        </div>
                    </div>

                    <div className={styles.div_derecha_arriba}>

                    </div>
                </div>

            </div>


            <div className={styles.squares}>
                <div className={styles.square_medio}>
                    <div className={styles.img_div}>
                        <img className={styles.img} src="InmoBusqueda.png" />
                    </div>

                    <p className={styles.parrafo}>Busqueda simple y resumida, resultados faciles de filtrar, todo al alcance del <span className={styles.span}>usuario.</span></p>
                </div>

                <div className={styles.square_medio}>
                    <div className={styles.img_div}>
                        <img className={styles.img} src="InmoRubik.png" />
                    </div>
                    <p className={styles.parrafo}>Simplicidad para la creacion de publicaciones, maximo <span className={styles.span}>alcance.</span></p>
                </div>

                <div className={styles.square_medio}>
                    <div className={styles.img_div}>
                        <img className={styles.img} src="InmoCuentas.png" />
                    </div>
                    <p className={styles.parrafo}>Incorporacion de cuentas inmobiliarias y empresariales, distincion <span className={styles.span}>instantanea</span></p>
                </div>

            </div>

            <div className={styles.mas_sobre}>

                <div className={styles.inside_mas_sobre}>
                    <div className={styles.div_izquierda}>

                    </div>

                    <div className={styles.div_derecha}>
                        <div className={styles.inside_div_derecha}>
                            <Link href='/mas-info/sobre-nosotros'>
                                <div className={styles.square}>

                                    <div className={styles.logo_nosotros}>
                                        <img className={styles.img_nosotros} src="sobrenosotros.png" />
                                    </div>

                                    <div className={styles.txt_nosotros}>
                                        <h3>Sobre Nosotros</h3>

                                        <p>Conoce mas sobre quienes son las personas que hacen de inmo una realidad</p>

                                    </div>

                                </div>
                            </Link>


                            <div className={styles.square}>

                                <div className={styles.logo_creditos}>
                                    <img className={styles.img_creditos} src="Creditos.png" />
                                </div>

                                <div className={styles.txt_creditos}>
                                    <h3>Creditos</h3>

                                    <p>Quienes fueron los que nos ayudaron con este proyecto.</p>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Body;