import React from 'react'
import styles from '../../styles/Options.module.css'
import Image from 'next/image'

const Options = () => {
    return (
        <div className={styles.options}>

            <div className={styles.inside_options}>

                <div className={styles.square}>
                <div className={styles.inside_blue}></div>
                    <div className={styles.inside_square}>
                        <Image src="/optionsimg.png" height={100} width={225}/>
                        <h3>Casas en Venta</h3>
                        <p>Encuentra tu hogar entre las publicaciones hechas por los usuarios</p>
                    </div>
                </div>
                <div className={styles.blues}></div>

                <div className={styles.square}>
                    <div className={styles.inside_blue}></div>
                    <div className={styles.inside_square}>
                        <Image src="/optionsimg.png" height={100} width={225}/>
                        <h3>Alquileres</h3>
                        <p>Contacta con arrendatarios y compara entre diferentes opciones</p>
                    </div>
                </div>
                <div className={styles.blues}></div>
                <div className={styles.square}>
                    <div className={styles.inside_blue}></div>
                    <div className={styles.inside_square}>
                        <Image src="/optionsimg.png" height={100} width={225}/>
                        <h3>Ventas</h3>
                        <p>Publica tu casa sin cargo ya seas una inmobiliaria o un particular</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Options
