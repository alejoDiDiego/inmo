import React from 'react'
import styles from '../../styles/Options.module.css'
import Image from 'next/image'

const Options = () => {
    return (
        <div className={styles.options}>

            <div className={styles.inside_options}>

                <div className={styles.square}>
                    <div className={styles.inside_square}>
                        <div className={styles.img}>
                            <Image src="/venta_logo.png" height={113} width={130}/>
                        </div>
                        <h3>Casas en Venta</h3>
                        <p>Encuentra tu hogar entre las publicaciones hechas por los usuarios</p>
                    </div>
                </div>
                <div className={styles.blues}></div>

                <div className={styles.square}>
                    <div className={styles.inside_square}>
                        <div className={styles.img}>
                            <Image src="/alquiler_logo.png" height={113} width={150}/>
                        </div>
                        <h3>Alquileres</h3>
                        <p>Contacta con arrendatarios y compara entre diferentes opciones</p>
                    </div>
                </div>
                <div className={styles.blues}></div>
                <div className={styles.square}>
                    <div className={styles.inside_square}>
                        <div className={styles.img}>
                            <Image src="/publicar_logo.png" height={113} width={150}/>
                        </div>
                        <h3>Ventas</h3>
                        <p>Publica tu casa sin cargo ya seas una inmobiliaria o un particular</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Options
